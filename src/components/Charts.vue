<template>
  <div class="charts-container">
    <div class="tabs-header">
      <div 
        v-for="(tab, index) in tabs" 
        :key="index" 
        :class="['tab-item', { active: activeTab === tab.name }]"
        @click="changeTab(tab.name)">
        {{ tab.label }}
      </div>
    </div>
    
    <div class="charts-content">
      <!-- 根据activeTab动态渲染对应的图表组件 -->
      <dashboard-chart-a 
        v-if="activeTab === 'chartA'" 
        @chart-data="handleChartData"
        @chart-click="handleChartClick">
      </dashboard-chart-a>
      
      <dashboard-chart-b 
        v-else-if="activeTab === 'chartB'"
        @chart-data="handleChartData"
        @chart-click="handleChartClick">
      </dashboard-chart-b>
      
      <dashboard-chart-c 
        v-else-if="activeTab === 'chartC'"
        @chart-data="handleChartData"
        @chart-click="handleChartClick">
      </dashboard-chart-c>
      
      <dashboard-chart-d 
        v-else-if="activeTab === 'chartD'"
        @chart-data="handleChartData"
        @chart-click="handleChartClick">
      </dashboard-chart-d>
    </div>
    
    <!-- 显示从子组件接收的数据 -->
    <div class="data-preview" v-if="currentChartData">
      <h3>当前图表数据</h3>
      <el-card>
        <pre>{{ JSON.stringify(currentChartData, null, 2) }}</pre>
      </el-card>
    </div>
  </div>
</template>

<script>
import DashboardChartA from './chartComp/DashBoardChartA.vue'  // 修正路径
import DashboardChartB from './chartComp/DashBoardChartB.vue'  // 修正路径
import DashboardChartC from './chartComp/DashBoardChartC.vue'  // 修正路径
import DashboardChartD from './chartComp/DashBoardChartD.vue'  // 修正路径

export default {
  name: 'charts',
  components: {
    DashboardChartA,
    DashboardChartB,
    DashboardChartC,
    DashboardChartD
  },
  data() {
    return {
      activeTab: 'chartA',
      tabs: [
        { name: 'chartA', label: '仪表盘A' },
        { name: 'chartB', label: '仪表盘B' },
        { name: 'chartC', label: '仪表盘C' },
        { name: 'chartD', label: '仪表盘D' }
      ],
      currentChartData: null
    }
  },
  methods: {
    changeTab(tabName) {
      this.activeTab = tabName
    },
    handleChartData(data) {
      console.log('收到子组件图表数据:', data)
      this.currentChartData = data
    },
    handleChartClick(params) {
      console.log('图表点击事件:', params)
      // 处理来自图表的点击事件
    }
  }
}
</script>

<style scoped>
.charts-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.tabs-header {
  display: flex;
  border-bottom: 1px solid #dcdfe6;
  margin-bottom: 20px;
}

.tab-item {
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-item.active {
  color: #409eff;
  border-bottom: 2px solid #409eff;
}

.charts-content {
  min-height: 400px;
  margin-bottom: 20px;
}

.data-preview {
  margin-top: 20px;
  text-align: left;
}
</style>