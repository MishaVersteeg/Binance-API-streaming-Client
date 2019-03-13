
<template>
  <div>
    <v-container>
      <v-card class="ml-2 mr-2">
        <v-layout row wrap>
          <v-flex xs3 md3>
            <h2 class="ml-4 mt-4">{{tickData.lastPrice}}</h2>
            <p class="mt-4 ml-4">{{dataStore.selectedSymbol}}</p>
          </v-flex>

          <v-flex xs3 class="hidden-sm-and-down">
            <p class="mt-4">{{dataStore.tickData[dataStore.selectedSymbol].volume}}</p>
            <p class="mt-4">{{"volume"}}</p>
          </v-flex>

          <v-flex xs3 class="hidden-sm-and-down">
            <p class="mt-4">{{dataStore.tickData[dataStore.selectedSymbol].highPrice}}</p>
            <p class="mt-4">{{"high price 24h"}}</p>
          </v-flex>

          <v-flex xs3 class="hidden-sm-and-down">
            <p class="mt-4">{{dataStore.tickData[dataStore.selectedSymbol].lowPrice}}</p>
            <p class="mt-4">{{"low price 24h"}}</p>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex xs6 lg2>
            <v-select
              class="ml-2"
              :items="intervalCandles"
              label="candle interval"
              v-model="selectedCandleInterval"
            ></v-select>
          </v-flex>

          <v-flex xs6 lg2>
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
        <v-flex xs12 md6>
          <v-card class="mr-2 ml-2 mb-4">
            <Candles/>
          </v-card>
        </v-flex>

        <v-flex xs12 md6>
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
      tickdata: {},
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
  watch: {
    selectedCandleInterval() {
      dataStore.updateCandleInterval(this.selectedCandleInterval);
    },
    selectedLineInterval() {
      dataStore.updateLineInterval(this.selectedLineInterval);
    }
  },
  computed: {
    tickData() {
      return dataStore.tickData[dataStore.selectedSymbol];
      tickdata = dataStore.tickData;
    }
  }
};
</script>

<style scoped>
h2 {
  line-height: 0;
}
</style>