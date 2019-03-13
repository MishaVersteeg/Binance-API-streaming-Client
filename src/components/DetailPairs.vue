<template>
  <v-layout>
    <v-flex xs8 offset-xs2 mt-4>
      <v-data-table :headers="headers" :items="tableRows" rows-per-page-text="10">
        <template v-slot:items="props">
          <td @click="seeDetails(props.item.symbol)" id="table">{{ props.item.symbol }}</td>
          <td
            @click="seeDetails(props.item.symbol)"
            :style="{color: getColor(props.item)}"
            id="lastPrice"
          >{{ props.item.lastPrice }}</td>
          <td @click="seeDetails(props.item.symbol)" id="table">{{ props.item.openPrice }}</td>
          <td @click="seeDetails(props.item.symbol)" id="table">{{ props.item.highPrice }}</td>
          <td @click="seeDetails(props.item.symbol)" id="table">{{ props.item.lowPrice }}</td>
          <td @click="seeDetails(props.item.symbol)" id="table">{{ props.item.volume }}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import { dataStore } from "../dataStore";
import visual from "./Visual";

const selectedSymbol = {
  template: "props"
};

export default {
  components: {
    visual
  },
  data() {
    return {
      dataStore: dataStore,
      showTable: true,
      showDeatils: false,

      color: { color: "#ffffff" },
      headers: [
        {
          text: "Symbol",
          align: "left",
          sortable: true,
          value: "name"
        },
        { text: "Last price", value: "lastPrice" },
        { text: "Open price", value: "openPrice" },
        { text: "24h high", value: "highPrice" },
        { text: "24h low", value: "lowPrice" },
        { text: "24h volume", value: "volume" }
      ]
    }
  },
  methods: {
    getColor(tickData) {
      if (tickData.lastPrice > tickData.prevLastPrice) {
        return "#58a04d"
      }
      if (tickData.lastPrice < tickData.prevLastPrice) {
        return "#b71c1c"
      }
    },
    seeDetails(symbol) {
      this.$router.push({ path: "./home/visual/" })
      dataStore.getVisuals(symbol);
      console.log(symbol);
    }
  },

  computed: {
    tableRows: function() {
      return Object.values(this.dataStore.tickData)
    }
  }
};
</script>

<style scoped>
#lastPrice {
  text-decoration: none
}

#table {
  text-decoration: none;
  color: "#a5aaa0"
}

td:hover {
  cursor: pointer
}
</style>

