<template className="clusterChart">
  <div id="myChart"/>
</template>

<script>
// 官网 https://echarts.apache.org/examples/zh/editor.html?c=scatter-clustering
export default {
  name: 'ClusterChart',
  data() {
    return {
      apiData: [[3.275154, 2.957587], [-3.344465, 2.603513], [0.355083, -3.376585], [1.852435, 3.547351], [-2.078973, 2.552013], [-0.993756, -0.884433], [2.682252, 4.007573], [-3.087776, 2.878713], [-1.565978, -1.256985], [2.441611, 0.444826], [-0.659487, 3.111284], [-0.459601, -2.618005], [2.17768, 2.387793], [-2.920969, 2.917485], [-0.028814, -4.168078], [3.625746, 2.119041], [-3.912363, 1.325108], [-0.551694, -2.814223], [2.855808, 3.483301], [-3.594448, 2.856651], [0.421993, -2.372646], [1.650821, 3.407572], [-2.082902, 3.384412], [-0.718809, -2.492514], [4.513623, 3.841029], [-4.822011, 4.607049], [-0.656297, -1.449872], [1.919901, 4.439368], [-3.287749, 3.918836], [-1.576936, -2.977622], [3.598143, 1.97597], [-3.977329, 4.900932], [-1.79108, -2.184517], [3.914654, 3.559303], [-1.910108, 4.166946], [-1.226597, -3.317889], [1.148946, 3.345138], [-2.113864, 3.548172], [0.845762, -3.589788], [2.629062, 3.535831], [-1.640717, 2.990517], [-1.881012, -2.485405], [4.606999, 3.510312], [-4.366462, 4.023316], [0.765015, -3.00127], [3.121904, 2.173988], [-4.025139, 4.65231], [-0.559558, -3.840539], [4.376754, 4.863579], [-1.874308, 4.032237], [-0.089337, -3.026809], [3.997787, 2.518662], [-3.082978, 2.884822], [0.845235, -3.454465], [1.327224, 3.358778], [-2.889949, 3.596178], [-0.966018, -2.839827], [2.960769, 3.079555], [-3.275518, 1.577068], [0.639276, -3.41284]],
      CLUSTER_COUNT: 6,
      DIENSIION_CLUSTER_INDEX: 2,
      pieces: [],
      COLOR_ALL: ['#37A2DA', '#e06343', '#37a354', '#b55dba', '#b5bd48', '#8378EA', '#96BFFF']

    }
  },
  // 钩子函数
  mounted() {

    setTimeout(()=> {
      this.handlerData()
    },10)

  },
  // 方法区
  methods: {
    // 方法域中的其他方法

    handlerData() {
      // 聚类准备
      for (let i = 0; i < this.CLUSTER_COUNT; i++) {
        this.pieces.push({
          value: i,
          label: 'cluster ' + i,
          color: this.COLOR_ALL[i]
        })
      }
      // 该方法必须放在方法域中的最后一个
      this.drawLine()
    },

    // 该方法必须放在方法域中的最后一个
    drawLine() {


      var option = {
        // 使用 dataset 管理数据
        dataset: [
          {
            source: this.apiData
          },
          // transform`配置表示此dataset的数据，来自于此transform转换的结果。
          {
            transform: {
              type: 'ecStat:clustering',
              // print: true,
              // 筛选条件
              config: {
                clusterCount: this.CLUSTER_COUNT,
                outputType: 'single',
                outputClusterIndexDimension: this.DIENSIION_CLUSTER_INDEX
              }
            }
          }
        ],
        //图标提示框组件
        tooltip: {
          position: 'top'
        },
        // 将数据映射到视觉元素（视觉通道）。
        visualMap: {
          type: 'piecewise',
          top: 'middle',
          min: 0,
          max: this.CLUSTER_COUNT,
          left: 10,
          splitNumber: this.CLUSTER_COUNT,
          dimension: this.DIENSIION_CLUSTER_INDEX,
          pieces: this.pieces
        },
        //网格配置 grid可以控制线性图 柱状图 图表大小
        grid: {
          left: 120
        },
        xAxis: {},
        yAxis: {},
        // 图表系列配置，决定图表数据怎样显示（柱状、折线、、、等）
        series: {
          type: 'scatter',
          encode: {tooltip: [0, 1]},
          symbolSize: 15,
          itemStyle: {
            borderColor: '#555'
          },
          datasetIndex: 1
        }
      }
      // 引入所需组件
      this.$echarts.registerTransform(this.ecStat.transform.clustering)
      // 基于准备好的dom，初始化echarts实例
      var instanceByDom = this.$echarts.getInstanceByDom(window.document.getElementById('myChart'))
      var myChart = instanceByDom === undefined ? this.$echarts.init(window.document.getElementById("myChart")) : instanceByDom
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
      // resetSize
      window.onresize = function () {
        myChart.resize();
      };

    }
  }
}
</script>

<style scoped>
.clusterChart {
  width: 100%;
  text-align: center;
}

#myChart {
  width: 100%;
  height: 400px;
}
</style>
