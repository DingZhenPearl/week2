<template>
  <div id="app">
    <!-- 主内容区域，根据当前激活的标签显示不同组件 -->
    <div class="content-area">
      <basic v-if="currentTab === 'basic'"></basic>
      <charts v-if="currentTab === 'charts'"></charts>
    </div>
    
    <!-- 底部导航栏 -->
    <tab-bar @tab-change="handleTabChange"></tab-bar>
  </div>
</template>

<script>
// import DataToChart from './components/Charts.vue'
//  import DataToChart from './components/Basic.vue'

// import DataToChart from './components/dataToChart/dataToChart copy 2.vue'
// import DataToChart from './components/chartComp/DashBoardChartA.vue'
import tabBar from './components/tabBar/tabBar.vue'
import basic from './components/Basic.vue'
import charts from './components/Charts.vue'


export default {
  name: 'App',
  components: {
    tabBar,
    basic,
    charts  
  },
  data() {
    return {
      currentTab: 'basic' // 默认显示设备管理页面
    }
  },
  methods: {
    handleTabChange(tabValue) {
      console.log('切换到页面:', tabValue);
      this.currentTab = tabValue;
    }
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

.content-area {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 60px; /* 为底部导航留出空间 */
}

body {
  margin: 0;
  padding: 0;
}
</style>
