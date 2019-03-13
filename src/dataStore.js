import axios from "axios";
import Vue from "vue";
import { bus } from './main';
import { timingSafeEqual } from "crypto";

setInterval(function () {
  if (dataStore.serverTime) {
    dataStore.serverTime += 1000
    bus.$emit('serverTime', dataStore.serverTime)
  }
}, 1000);

// const CORS_PROXY_URL = 'https://cors-anywhere.herokuapp.com/'
const CORS_PROXY_URL = 'https://api.codetabs.com/v1/proxy?quest='
const BINANCE_API_URL = 'https://api.binance.com/api/v1/'


export const dataStore = new Vue({
  data: function () {
    return {
      darkTheme: false,
      symbolsGetRequest: [],
      getRequestLoaded: false,
      selectedSymbol: 'BTCUSDT',
      selectedCandleInterval: '1m',
      selectedLineInterval: '1m',
      tickData: {},
      bannerTickData: {},
      candleStream: {},
      candleStreamArr: [],
      candles: [],
      candleHighest: 0,
      candleLowest: 10000,
      graphHighest: 0,
      graphLowest: 10000,
      graphData: [],
      serverTime: 0,
      tickSocket: '',
      candleSocket: '',
      graphSocket: ''
    }
  },

  created() {
    this.loadSymbols()
    this.openTickerStream()
    this.getServerTime()
  },

  methods: {

    getServerTime() {
      this.callApi('/time', data => this.serverTime = data.serverTime)
    },

    loadSymbols() {
      this.callApi('exchangeInfo', data => this.symbolsGetRequest = data.symbols)
    },

    callApi(param, callback) {
      axios.get(CORS_PROXY_URL + BINANCE_API_URL + param).then(
        response => callback(response.data)
      )
    },

    getVisuals(symbol) {
      this.selectedSymbol = symbol;
      this.loadCandleData();
      this.loadLineData();
    },

    updateCandleInterval(interval) {
      this.selectedCandleInterval = interval;
      this.loadCandleData();
    },

    updateLineInterval(interval) {
      this.selectedLineInterval = interval;
      this.loadLineData();
    },

    openTickerStream() {
      let ws = new WebSocket(`wss://stream.binance.com:9443/ws/!ticker@arr`);
    
      ws.onmessage = msgevent => {
        let tickerData = JSON.parse(msgevent.data)
    
        tickerData.forEach(symbolTickData => {
          let symbol = symbolTickData.s;
          let prevTickData = this.tickData[symbol] || {}
    
          Vue.set(this.tickData, symbol, {
            symbol: symbol,
            lastPrice: symbolTickData.c,
            prevLastPrice: prevTickData.lastPrice,
            openPrice: symbolTickData.o,
            highPrice: symbolTickData.h,
            lowPrice: symbolTickData.l,
            volume: symbolTickData.v
          })
        })
      }
    },

    // loadTickData() {
    //   try { this.tickSocket.close() } catch (err) { console.log(err) };

    //   //this.bannerTickData = {}

    //   this.tickSocket = new WebSocket(`wss://stream.binance.com:9443/ws/${this.selectedSymbol.toLowerCase()}@ticker`);

    //   this.tickSocket.onmessage = msgevent => {
    //     let rawTickData = JSON.parse(msgevent.data)

    //     this.bannerTickData = Object.assign({}, this.bannerTickData, {
    //       lastPrice: rawTickData.c,
    //       priceChange: rawTickData.P,
    //       tradedBaseVolume: rawTickData.v
    //     })

    //   }
    // },

    loadCandleData() {

      try { this.candleSocket.close() } catch (err) { console.log(err) };

      this.candles = new Array;
      this.candleHighest = 0;
      this.candleLowest = 10000

      this.callApi(encodeURIComponent(`klines?symbol=${this.selectedSymbol}&interval=${this.selectedCandleInterval}&limit=80`), data => {
        let rawData = data;

        for (let i = 0; i < rawData.length; i++) {
          for (let ii = 0; ii < rawData[i].length; ii++) {
            let t = parseFloat(rawData[i][ii]);
            rawData[i][ii] = t
          }
        }

        rawData.forEach(e => {
          this.candles.push([e[0], [e[1], e[2], e[3], e[4]]])

          if (e[2] > this.candleHighest) { this.candleHighest = e[2] }
          if (e[3] < this.candleLowest) { this.candleLowest = e[3] }
        })

        // open new websocket candle stream:
        this.candleSocket = new WebSocket(`wss://stream.binance.com:9443/ws/${this.selectedSymbol.toLowerCase()}@kline_${this.selectedCandleInterval}`);

        this.candleSocket.onmessage = msgevent => {
          rawData = JSON.parse(msgevent.data, function (key, value) { return value })

          this.candleStream = [rawData.k.t, [rawData.k.o, rawData.k.h, rawData.k.l, rawData.k.c]];

          if (this.candleStream[0] != this.candles[this.candles.length - 1][0]) {
            this.candles.shift()
            this.candles.push(this.candleStream)
          } else { this.candles.pop(); this.candles.push(this.candleStream); }
        }

        //computing xaxis range:
        bus.$emit('renderCandles', [this.candleHighest, this.candleLowest])
      })
    },

    loadLineData() {

      try { this.graphSocket.close() } catch (err) { console.log(err) };

      this.graphData = new Array;
      this.graphHighest = 0;
      this.graphLowest = 10000

      this.callApi(encodeURIComponent(`klines?symbol=${this.selectedSymbol}&interval=${this.selectedLineInterval}&limit=80`), data => {
        let rawLineData = data;


        for (let i = 0; i < rawLineData.length; i++) {
          for (let ii = 0; ii < rawLineData[i].length; ii++) {
            let t = parseFloat(rawLineData[i][ii]);
            rawLineData[i][ii] = t
          }
        }

        rawLineData.forEach(e => {
          this.graphData.push([e[0], e[1]])

          if (e[2] > this.graphHighest) { this.graphHighest = e[2] }
          if (e[3] < this.graphLowest) { this.graphLowest = e[3] }
        })

        this.graphSocket = new WebSocket(`wss://stream.binance.com:9443/ws/${this.selectedSymbol.toLowerCase()}@kline_${this.selectedLineInterval}`);

        this.graphSocket.onmessage = msgevent => {
          rawLineData = JSON.parse(msgevent.data, function (key, value) { return value })

          this.graphData.push([rawLineData.k.t, rawLineData.k.o])
        }

        bus.$emit('renderGraph', [this.graphHighest, this.graphLowest])

      })
    }
  }
})


