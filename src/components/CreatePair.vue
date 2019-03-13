<template>
<div>

    <Snackbar/>
    <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-actions>
          <v-btn flat @click="loadSymbols" >load symbols</v-btn>
        </v-card-actions>

        <v-flex xs12 sm6 d-flex>
        <v-select
          label="base asset"
          v-bind:items="uniqueBaseAssets"
          v-model="selectedBaseAsset">
        </v-select>
        </v-flex>

        <v-flex xs12 sm6 d-flex>
        <v-select
          label="quote asset"
          v-bind:items="matchQuoteAssets"
          v-model="selectedQuoteAsset">
        </v-select>
        </v-flex>

        <v-card-actions>
          <v-btn flat @click="addPair" >add pair</v-btn>
        </v-card-actions>

        <v-card-actions>
          <ul id="activeSymbols">
            <li v-for="items in activeSymbols" :key="items">
            {{items}}
          </li>
        </ul>
        </v-card-actions>

      </v-card>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
import Snackbar from './Snackbar.vue'
import {bus} from '../main';
import {dataStore} from '../dataStore';

export default {
  name: "CreatePair",
  components: {
    Snackbar
  },

  data: function() {
    return {
      dataStore: dataStore,
      getRequestLoaded: dataStore.getRequestLoaded,
      activeSymbols: dataStore.activeSymbols,
      //uniqueBaseAssets: [],
      baseAssets: [],
      quoteAssets: [],
      selectedBaseAsset: '',
      selectedQuoteAsset: '',
    }
  },

  watch: {
    getRequestLoaded() {
      this.loadSymbols();
    }
  },

  computed: {
    matchQuoteAssets: function() {
      return this.dataStore.symbolsGetRequest.filter(
        symbolData => this.selectedBaseAsset == symbolData.baseAsset
      ).map(
        symbolData => symbolData.quoteAsset
      ) 
    },
    uniqueBaseAssets() {
      return [... new Set(this.dataStore.symbolsGetRequest.map(s => s.baseAsset))];
    }
  },

  methods: {
    loadSymbols() { 
      //this.uniqueBaseAssets = [... new Set(this.dataStore.symbolsGetRequest.map(s => s.baseAsset))];
      
      this.dataStore.symbolsGetRequest.forEach( s => {
        this.baseAssets.push(s['baseAsset'])
        this.quoteAssets.push(s['quoteAsset'])
      })
    },

    addPair() {
      if (this.activeSymbols.lastIndexOf(this.selectedBaseAsset+this.selectedQuoteAsset) > -1) {
        bus.$emit('Snackbar', 'this pair is already in your list')
      } else {
      this.activeSymbols.push(this.selectedBaseAsset+this.selectedQuoteAsset)
      }    
    }
  } 
}

</script>

<style scoped>

ul {
   list-style-type: none;
}
</style>
