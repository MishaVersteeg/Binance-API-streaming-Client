
<template>
  <div>
    <v-container>
      <v-card>
        <v-layout row wrap>
          <v-flex xs6 md4>
       
              
              <h2 class="ml-4 mt-4" :style="{color: getColor()}" >{{dataStore.tickData.lastPrice}}</h2>
              <p class="mt-4 ml-4">{{dataStore.selectedSymbol}}</p>

          </v-flex>

          <v-flex xs3>
            <v-select
              class="ml-2"
              :items="intervalCandles"
              label="candle interval"
              v-model="selectedCandleInterval"
            ></v-select>
          </v-flex>

           <v-flex xs3>
              <v-select
                class="ml-2"
                :items="resolutionLine"
                label="time resolution line chart"
                v-model="selectedLineInterval"
              ></v-select>
            </v-flex>
        </v-layout>
      </v-card>
    </v-container>


    <v-container>
                <v-layout row wrap justify-center>
        <v-flex  xs12 md5>
          <v-card class="mr-2 ml-2 mb-4">
            <Candles/>
          </v-card>
        </v-flex>

        <v-flex  xs12 md5>
          <v-card class="ml-2 mr-2">
            <LineChart/>
          </v-card>
        </v-flex>
                </v-layout>

    </v-container>


  </div>
</template>


<script>
import VueApexCharts from "vue-apexcharts";
import LineChart from "./LineChart";
import Candles from "./Candles";
import { dataStore } from "../dataStore";
import { bus } from "../main";
import Vue from "vue";

Vue.component("apexchart", VueApexCharts);

export default {
  components: {
    LineChart,
    Candles
  },
  data: function() {
    return {
      dataStore: dataStore,
      intervalCandles: [
        "1m",
        "3m",
        "5m",
        "15m",
        "30m",
        "1h",
        "2h",
        "4h",
        "6h",
        "8h",
        "12h",
        "1d",
        "3d",
        "1w",
        "1M"
      ],
      resolutionLine: [
        "1m",
        "3m",
        "5m",
        "15m",
        "30m",
        "1h",
        "2h",
        "4h",
        "6h",
        "8h",
        "12h",
        "1d",
        "3d",
        "1w",
        "1M"
      ],
      selectedCandleInterval: "1m",
      selectedLineInterval: "1m"
    };
  },
  methods: {
          getColor(tickData) {
          if (dataStore.tickData.lastPrice > dataStore.tickData.prevLastPrice) {
            return '#58a04d'
          }
          if (dataStore.tickData.lastPrice < dataStore.tickData.prevLastPrice) {
            return '#b71c1c'
          }
       
      },

  },
  watch: {
    selectedCandleInterval() {
      dataStore.updateCandleInterval(this.selectedCandleInterval);
    },
    selectedLineInterval() {
      dataStore.updateLineInterval(this.selectedLineInterval);
    }
  }

};
</script>

<style scoped>
h2 {
  line-height: 0;
}
</style>