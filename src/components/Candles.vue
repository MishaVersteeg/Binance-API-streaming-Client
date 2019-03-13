
<template dark>
  <div>
    <apexchart
      type="candlestick"
      height="350"
      :options="chartOptions"
      :series="series"
      :key="updateChart"
    />
  </div>
</template>


<script>
import VueApexCharts from "vue-apexcharts";
import LineChart from "./LineChart";
import { dataStore } from "../dataStore";
import { bus } from "../main";
import Vue from "vue";

Vue.component("apexchart", VueApexCharts);

export default {
  components: {
    LineChart
  },
  data: function() {
    return {
      updateChart: 0,
      candles: [],
      chartOptions: {
        title: {
          text: "",
          align: "left",
          style: {
            color: "#a5aaa0"
          }
        },
        xaxis: {
          type: "datetime",
          labels: {
            style: {
              colors: "#a5aaa0"
            }
          }
        },
        yaxis: {
          decimalsInFloat: 6,
          labels: {
            style: {
              color: "#a5aaa0"
            }
          },
          forceNiceScale: true,
          min: 0.034,
          max: 0.0346,

          title: {
            style: {
              color: "#a5aaa0"
            }
          }
        },
        tooltip: {
          enabled: false
        }
      },
      series: [{ data: dataStore.candles }]
    };
  },
  mounted() {
    bus.$on("renderCandles", data => {
      this.updateChart += 1;
      this.series = [{ data: dataStore.candles }];
      this.chartOptions.title.text = dataStore.selectedSymbol + " - " + dataStore.selectedCandleInterval;
      this.chartOptions.yaxis.max = data[0];
      this.chartOptions.yaxis.min = data[1];
    });
  }
};
</script>

<style scoped>
</style>