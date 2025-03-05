<template class="cardBBox">
  <div class="cardBItem">
    <!-- Card卡片：将信息聚合在卡片容器中展示。 -->
    <!-- Card 组件包括header和body部分，header部分需要有显式具名 slot 分发，同时也是可选的。 -->
    <el-card v-for="(item, index) in summaryData" :key="item.state" class="card-B">
      <div slot="header" class="clearfix" align="center">
        <span>{{ item.state }}</span>
      </div>
      <div class="text item">
        <!-- Descriptions 描述列表，列表形式展示多个字段。 -->
        <!-- direction	排列的方向 -->
        <!-- colon	是否显示冒号 -->
        <!-- contentStyle	自定义内容样式 -->
        <!-- labelStyle	自定义标签样式 -->
        <el-descriptions
            :column="3"
            direction="vertical"
            :colon="false"
            :content-style="rowCenter"
            :label-style="rowCenter"
        >
          <template v-for="(col, index) in item.digital">
            <el-descriptions-item
                v-if="col.display"
                :key="index"
                :label="col.label"
                :span="col.span"
            >
              <span
                  style="font-size: x-large;"
                  :style="{'color': col.color && col.value > 0 ? col.color : 'black'}"
                  @click="showDetails(col)"
              >
                {{ col.value }}
              </span>
            </el-descriptions-item>
          </template>
        </el-descriptions>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Test3',
  data() {
    return {
      rowCenter: {
        'text-align': 'center'
      },
      summaryData: [
        {
          state: '监控',
          digital: [
            {
              label: '总数',
              value: 136,
              span: 1,
              display: true
            },
            {
              label: '异常',
              value: 0,
              span: 1,
              display: true,
              color: 'red'
            },
            {
              label: '告警',
              value: 3,
              span: 1,
              display: true,
              color: 'red'
            }
          ]
        },
        {
          state: '工单',
          digital: [
            {
              label: '待处理',
              value: 3,
              span: 1,
              display: true
            },
            {
              label: '待接单',
              value: 1,
              span: 1,
              display: true,
              color: '#FFCC00'
            },
            {
              label: '我发起',
              value: 7,
              span: 1,
              display: true
            }
          ]
        }
      ]
    }
  },

  created() {

  },

  mounted() {

  },

  methods: {
    showDetails(item) {
      this.$message('查看详情')
      console.log(item)
    }
  }
}
</script>

<style scoped>
.cardBBox {
  width: 100%;
  text-align: center;
}
.cardBItem {
  width: 100%;
  margin-top: 3%;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.card-B{
  width: 100%;
  margin-bottom: 3%;
  border-radius: 3%;
}
.text {
  font-size: 10%;
  margin: 3%;
}
.item {
  margin-bottom: 4%;
}
</style>
