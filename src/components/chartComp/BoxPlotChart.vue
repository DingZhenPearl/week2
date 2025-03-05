<template class="boxPlotChart">
  <div id="myChart" />
</template>
<script>
// 官网 https://echarts.apache.org/examples/zh/editor.html?c=boxplot-light-velocity
export default {
  name: 'BoxPlotChart',
  // 数据域
  data() {
    return {
      chartData: [[850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960], [960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790, 810, 880, 880, 830, 800, 790, 760, 800], [880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910, 850, 870, 840, 840, 850, 840, 840, 840], [890, 810, 810, 820, 800, 770, 760, 740, 750, 760, 910, 920, 890, 860, 880, 720, 840, 850, 850, 780], [890, 840, 780, 810, 760, 810, 790, 810, 820, 850, 870, 870, 810, 740, 810, 940, 950, 800, 810, 870]]

    }
  },
  // 钩子函数
  mounted() {

    setTimeout(() => {
      // 该方法必须放在方法域中的最后一个
      this.drawLine();
    }, 10)
  },
  // 方法区
  methods: {
    // 方法域中的其他方法

    drawLine() {
      var option = {
        //设置图标标题
        title: [
          {
            text: '盒须图',
            left: 'center'
          },
          {
            text: 'upper: Q3 + 1.5 * IQR \nlower: Q1 - 1.5 * IQR', // IQR = Q3 - Q1
            // 全图默认背景
            borderColor: '#999',
            borderWidth: 1,
            textStyle: {
              fontWeight: 'normal',
              fontSize: 14,
              lineHeight: 20
            },
            left: '10%',
            top: '90%'
          }
        ],
        // 使用 dataset 管理数据
        dataset: [
          {
            source: this.chartData
          },
          // transform`配置表示此dataset的数据，来自于此transform转换的结果。
          {
            transform: {
              type: 'boxplot',
              // 筛选条件
              config: { itemNameFormatter: '组 {value}' }
            }
          },
          {
            fromDatasetIndex: 1,
            fromTransformResult: 1 // 异常值索引起始
          }
        ],
        //图标提示框组件
        tooltip: {
          //触发方式
          trigger: 'item',
          axisPointer: {
            type: 'shadow'
          }
        },
        //网格配置 grid可以控制线性图 柱状图 图表大小
        grid: {
          //设置 上下左右距离dom容器距离 控制图标大小
          left: '10%',
          right: '10%',
          bottom: '15%'
        },
        //设置x轴配置
        xAxis: {
          //type: category显示类目
          type: 'category',
          //是否让线条与坐标轴之间有缝隙
          boundaryGap: true,
          nameGap: 30,
          splitArea: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        //设置y轴配置
        yAxis: {
          type: 'value',
          name: '单位',
          splitArea: {
            show: true
          }
        },
        // 图表系列配置，决定图表数据怎样显示（柱状、折线、、、等）
        series: [
          {
            //数据线条名称
            name: 'boxplot',
            //数据线条类型 此处为boxplot
            type: 'boxplot',
            datasetIndex: 1
          },
          {
            name: 'outlier',
            type: 'scatter',
            datasetIndex: 2
          }
        ]
      }
      // 基于准备好的dom，初始化echarts实例
      var instanceByDom = this.$echarts.getInstanceByDom(window.document.getElementById('myChart'))
      var myChart = instanceByDom === undefined ? this.$echarts.init(window.document.getElementById("myChart")) : instanceByDom
      // 将echarts实例内的对象清空，再重新注入
      myChart.clear()
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
.boxPlotChart {
  width: 100%;
  text-align: center;
}

#myChart {
  width: 100%;
  height: 500px;
}
</style>
