<template>
  <div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="第一个图" name="first">第一个图</el-tab-pane>
        <el-tab-pane label="第二个图" name="second">第二个图</el-tab-pane>
      </el-tabs>
    </div>
    <div id="myFirstChart" v-show="isFirst"></div>
    <div id="mySecondChart" v-show="isSecond"></div>
  </div>
</template>

<script>
export default {
  name: "tabShowDifChart",
  data() {
    return {
      activeName: 'first',
      isFirst: false,
      isSecond: false,
      apiData: [1, 2, 3, 4, 5],
      label: [1, 2, 3, 4, 5]
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.name === "first") {
        this.isFirst = true
        this.isSecond = false
        // 得先在DOM中构建一个id为myFirstChart的div，并且为其规定长宽，再将图形对象注入到图形实例中
        setTimeout(() => {
          this.drawFirstLine()
        },10)
      } else if (tab.name === "second") {
        this.isFirst = false
        this.isSecond = true
        setTimeout(() => {
          this.drawSecondLine()
        },10)
      }
    },
    drawFirstLine() {
      // 基于准备好的dom，初始化echarts实例

      // 指定图表的配置项和数据
      var option = {
        //设置图标标题
        title: {text: '在Vue中使用echarts-pieChart'},
        // 图表系列配置，决定图表数据怎样显示（柱状、折线、、、等）
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            data: [
              {value: 235, name: '参数一'},
              {value: 274, name: '参数二'},
              {value: 310, name: '参数三'},
              {value: 335, name: '参数四'},
              {value: 400, name: '参数五'}
            ],
            roseType: 'angle',
            itemStyle: {
              normal: {
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      var instanceByDom = this.$echarts.getInstanceByDom(window.document.getElementById('myFirstChart'))
      var myChart = instanceByDom === undefined ? this.$echarts.init(window.document.getElementById("myFirstChart")) : instanceByDom
      // var myChart = this.$echarts.init(window.document.getElementById("myChart"))
      myChart.clear()
      myChart.setOption(option)
      window.onresize = function () {
        myChart.resize();
      };
    },
    drawSecondLine(){
      var option = {
        //网格配置 grid可以控制线性图 柱状图 图表大小
        grid: {
          left: '1%',
          containLabel: true
        },
        //设置图标标题
        title: {text: '数值'},
        //图标提示框组件
        tooltip: {
          position: function (pos, params, dom, rect, size) {
            // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
            var obj = {top: 60};
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
            return obj;
          }
        },
        //设置x轴配置
        xAxis: {
          data: this.label
        },
        yAxis: {},
        // 图表系列配置，决定图表数据怎样显示（柱状、折线、、、等）
        series: [{
          name: '参数值',
          type: 'line',
          data: this.apiData
        }]
      }
      // 基于准备好的dom，初始化echarts实例
      var instanceByDom = this.$echarts.getInstanceByDom(window.document.getElementById('mySecondChart'))
      var myChart = instanceByDom === undefined ? this.$echarts.init(window.document.getElementById("mySecondChart")) : instanceByDom
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
#myFirstChart {
  width: 100%;
  height: 400px
}
#mySecondChart {
  width: 100%;
  height: 400px
}
</style>