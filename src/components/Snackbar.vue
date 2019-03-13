<template>
  <v-card>
    <v-snackbar v-model="snackbar" :top="y" :timeout="1500">{{ text }}</v-snackbar>
  </v-card>
</template>


<script>
import { bus } from "../main";

export default {
  name: "Snackbar",

  data() {
    return {
      snackbar: false,
      y: "top",
      text: ""
    };
  },
  mounted() {
    bus.$on("Snackbar", data => {
      this.snackbar = true;
      this.text = data;
    });
  }
};
</script>

<style scoped>
</style>