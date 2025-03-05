<template>
  <div id="app">
    <data-to-chart></data-to-chart>
  </div>
</template>

<script>
// import DataToChart from './components/Charts.vue'
//  import DataToChart from './components/Basic.vue'

import DataToChart from './components/dataToChart/dataToChart copy 2.vue'
// import DataToChart from './components/chartComp/DashBoardChartA.vue'
// import tabBar from './components/tabBar/tabBar.vue'
// import basic from './components/Basic.vue'
// import charts from './components/Charts.vue'


export default {
  name: 'App',
  components: {
    DataToChart
  },
  data() {
    return {
      
    }
  },
  methods: {
   
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

</style>
