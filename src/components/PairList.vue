<template>
  <div>
    <div v-for="value in pairs" :key="value" @click="changePair(value)">
      <h2>{{value}}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "PairList",
  data: function() {
    return {
      pairs: [
        "XRP/BTC",
        "BTT/BNB",
        "XRP/BNB",
        "ENJ/BNB",
        "TUSD/BNB",
        "EOS/BNB",
        "TRX/BNB"
      ]
    };
  },

  mounted() {},

  methods: {
    changePair: function(value) {
      this.$root.$emit("changePair", value);
    }
  }
};
</script>

<style scoped>
h2:hover {
  cursor: pointer;
}
</style>
