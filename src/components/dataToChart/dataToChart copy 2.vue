<template>
  <div>
    <div id="myChart"></div>
    <el-button @click="getData">开始绘图</el-button>
  </div>
</template>

<script>
export default {
  name: "dataToChart",
  data() {
    return {
      apiData: [],
      receiveValue: [],
      divice_id:"15",
      atrribute:"pitch3_ng5_DC",
      access_token:"b64fd70a745d44428578f215345d98fb.7280a1a6c5039457ba2e4c1cef61add1",
      url:"http://phmlearn.com/component/data/fengji",
      lineShow: false,
      Lineindex: 10,
      timer: 'timer'
    }
  },
  beforeDestroy() {
    // 设置定时器后需要删除
    if (this.timer !== 'timer') {
      clearInterval(this.timer)
      this.timer = 'timer'
    }
    // 在离开这个组件前清除图形对象
    // 如果设置了定时器离开组件前清除对象
    this.myChart.clear()
  },
  methods:{
    getData() {
      // 数据API
      var httpRequest = new XMLHttpRequest()
      // URL填写
      // 请求方法
      httpRequest.open('POST', this.url)
      // 请求头
      httpRequest.setRequestHeader(
          'Content-Type',
          'application/x-www-form-urlencoded'
      )
      var _this = this
      // 请求参数
      httpRequest.send(`divice_id=${this.divice_id}&atrribute=${this.atrribute}&access_token=${this.access_token}`)
      httpRequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          const result = JSON.parse(httpRequest.responseText)
          // 返回结果
          console.log(result)
          _this.receiveValue = result.data.data
          for (var i = 0; i < 8; i++) {
            _this.apiData.push(_this.randomData(i))
          }
          _this.startPushParam()
        }
      }
    },

    startPushParam() {
      this.timer = setInterval(this.handlerData, 1000)
    },

    handlerData() {
      for (var i = this.Lineindex; i < this.Lineindex + 1; i++) {
        this.apiData.shift()
        this.apiData.push(this.randomData(i))
      }
      this.Lineindex += 1
      this.drawLine()

    },

    randomData(i) {
      return {
        name: String(new Date()),
        value: [new Date(),this.receiveValue[i]]
      }
    },
    drawLine() {
      var option = {
        title: {
          text: '实时监控图',
          left: '1%'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            params = params[0];
            var date = params.value[0];
            return (
              date.getSeconds() +
              '/' +
              date.getMinutes() +
              '/' +
              date.getHours() +
              ' : ' +
              params.value[1]
            );
          },
          axisPointer: {
            animation: false
          }
        },
        grid: {
          left: '5%',
          right: '15%',
          bottom: '10%'
        },
        toolbox: {
          right: 10,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            start: 0,
            end: 100
          },
          {
            type: 'inside'
          }
        ],
        visualMap: {
          top: 50,
          right: 10,
          pieces: [
            {
              gt: -4,
              lte: -2,
              color: '#93CE07'
            },
            {
              gt: -2,
              lte: 0,
              color: '#FBDB0F'
            },
            {
              gt: 0,
              lte: 2,
              color: '#FC7D02'
            },
            {
              gt: 2,
              lte: 4,
              color: '#FD0100'
            },
            {
              gt: 4,
              color: '#AA069F'
            }
          ],
          outOfRange: {
            color: '#999'
          }
        },
        series: [
          {
            name: '监测数据',
            type: 'line',
            showSymbol: false,
            data: this.apiData,
            markLine: {
              silent: true,
              lineStyle: {
                color: '#333'
              },
              data: [
                { yAxis: -4 },
                { yAxis: -2 },
                { yAxis: 0 },
                { yAxis: 2 },
                { yAxis: 4 }
              ]
            }
          }
        ]
      };

      var instanceByDom = this.$echarts.getInstanceByDom(window.document.getElementById('myChart'));
      var myChart = instanceByDom === undefined ? this.$echarts.init(window.document.getElementById("myChart")) : instanceByDom;
      myChart.setOption(option);
      this.myChart = myChart;
      
      window.onresize = function () {
        myChart.resize();
      };
    }
  }
}
</script>

<style scoped>
#myChart {
  width: 100%;
  height: 500px;
  margin: 20px auto;
}

.el-button {
  margin: 10px;
}
</style>