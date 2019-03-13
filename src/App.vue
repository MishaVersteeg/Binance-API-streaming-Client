<template>
  <v-app :dark="darkTheme">
    <v-toolbar>
    
      
      <img src="./assets/vue.png" class="mr-3 hidden-sm-and-down" height="30">
      <img>
      
      <img src="./assets/binance.png" class="hidden-sm-and-down" height="30">
      <img>

      <v-toolbar-title class="headline text-uppercase mr-4">
        <span>Vue</span>
        <span class="font-weight-light"> | binance</span>
      </v-toolbar-title>

      <router-link class="ml-4 hidden-sm-and-down" id="buttons" to="/">
        <v-btn flat>
          <v-icon class="mr-2">home</v-icon>
          <span>home</span>
        </v-btn>
      </router-link>

      <router-link class="hidden-sm-and-down" id="buttons" to="/settings">
        <v-btn flat>
          <v-icon class="mr-2">settings</v-icon>
          <span>settings</span>
        </v-btn>
      </router-link>

      <router-link class="hidden-sm-and-down" id="buttons" to="/about">
        <v-btn flat>
          <v-icon class="mr-2">help</v-icon>
          <span>about</span>
        </v-btn>
      </router-link>

      <v-spacer></v-spacer>

      <div>
        <v-btn flat @click="toggleTheme">
          <v-icon>invert_colors</v-icon>
        </v-btn>
      </div>

      <div class="mt-3 hidden-sm-and-down">
        <p>server time:</p>
        <p>{{serverTime}}</p>
      </div>

      <v-btn flat class="mt-1 hidden-sm-and-down" href="https://github.com/MishaVersteeg/Vue_BinanceClient">
        <img src="./assets/github.png" height="25">
        <img>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer class="pa-3 caption">
      <v-spacer></v-spacer>
      <div>Misha Versteeg | {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
import { dataStore } from "./dataStore";
import Home from "./views/Home";
import Settings from "./views/Settings";
import About from "./views/About";
import { bus } from "./main";

export default {
  name: "App",
  components: {
    Home,
    About,
    Settings
  },
  data() {
    return {
      drawer: true,
      serverTime: "retreiving time",
      darkTheme: true,
  }
  },
  methods: {
    toggleTheme() {
      this.darkTheme = !this.darkTheme;
    }
  },

  mounted() {
    bus.$on("serverTime", data => {
      this.serverTime = new Date(data).toLocaleTimeString("en-US");
    });
  }
};
</script>

<style>
#buttons {
  text-decoration: none;
}
p {
  line-height: 0;
}
</style>

