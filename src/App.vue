<template>
  <div id="app">
    <data-to-chart></data-to-chart>
  </div>
</template>

<script>
import DataToChart from './components/dataToChart/dataToChart copy 2.vue'
// import DataToChart from './components/chartComp/DashBoardChartA.vue'

export default {
  name: 'App',
  components: {
    DataToChart
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
