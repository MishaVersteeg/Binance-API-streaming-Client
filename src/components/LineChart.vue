
<template>
  <div id="chart">
    <apexchart 
    type="area" 
    height="350" 
    :options="chartOptions" 
    :series="series"
    :key="updateChart"
    />
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { dataStore } from "../dataStore";
import { bus } from "../main";
import Vue from "vue";

Vue.component("apexchart", VueApexCharts);

export default {
  data: function() {
    return {
      updateChart: 0,
      series: [{ data: dataStore.graphData }],
      chartOptions: {
        chart: {
          stacked: false,
          zoom: {
            type: "x",
            enabled: true
          },
          toolbar: {
            autoSelected: "zoom"
          }
        },
        plotOptions: {
          line: {
            curve: "smooth"
          }
        },
        dataLabels: {
          enabled: false
        },

        markers: {
          size: 0,
          style: "full"
        },
        //colors: ['#0165fc'],
        title: {
          align: "left",
          style: {
            color: "#a5aaa0"
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0,
            opacityTo: 0,
            stops: [0, 90, 100]
          }
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function(val) {
              return (val / 1000000).toFixed(0);
            }
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
          labels: {
            style: {
              color: "#a5aaa0"
            }
          }
        }
      }
    };
  },
  mounted() {
    bus.$on("renderGraph", data => {
      (this.updateChart += 1), (this.series = [{ data: dataStore.graphData }]);
      this.chartOptions.title.text =
        dataStore.selectedSymbol + " - " + dataStore.selectedLineInterval;
      this.chartOptions.yaxis.max = data[0];
      this.chartOptions.yaxis.min = data[1];
    });
  }
};
</script>

<style scoped>
</style>