<template class="cardABox">
  <div class="cardAItem">
    <!-- Card卡片：将信息聚合在卡片容器中展示。 -->
    <!-- Card 组件包括header和body部分，header部分需要有显式具名 slot 分发，同时也是可选的。 -->
    <el-card v-for="form in apiData" :key="form.type" class="box-card">
      <div slot="header" class="clearfix">
        <!-- Icon 图标：提供了一套常用的图标集合。直接通过设置类名为 el-icon-iconName 来使用即可。 -->
        <i class="el-icon-s-order" style="color: #0a76a4;margin-right: 1%" />
        <span>{{form.type}}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="handler(form)">操作按钮</el-button>
      </div>
      <div class="text item">
        <!-- Descriptions 描述列表，列表形式展示多个字段。 -->
        <el-descriptions :column="1">
          <template v-for="(col, index) in form.details">
            <el-descriptions-item
                v-if="col.display"
                :key="index"
                :label="col.label"
                :span="col.span"
            >{{ col.value }}
            </el-descriptions-item>
          </template></el-descriptions></div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'CardA',
  data() {
    return {
      apiData: [
        {
          type: '故障类型1', details:
              [
                {
                  label: '描述1',
                  value: '值1',
                  span: 1,
                  display: true
                },
                {
                  label: '描述2',
                  value: '值2',
                  span: 1,
                  display: true
                },
                {
                  label: '描述3',
                  value: '值3',
                  span: 1,
                  display: true
                },
                {
                  label: '描述4',
                  value: '值4',
                  span: 2,
                  display: false
                },
                {
                  label: '描述5',
                  value: '值5',
                  span: 2,
                  display: true
                }
              ]
        }, {
          type: '故障类型2', details:
              [
                {
                  label: '描述1',
                  value: '值1',
                  span: 1,
                  display: true
                },
                {
                  label: '描述2',
                  value: '值2',
                  span: 1,
                  display: true
                },
                {
                  label: '描述3',
                  value: '值3',
                  span: 1,
                  display: true
                },
                {
                  label: '描述4',
                  value: '值4',
                  span: 2,
                  display: false
                },
                {
                  label: '描述5',
                  value: '值5',
                  span: 2,
                  display: true
                }
              ]
        }
      ]
    }
  },
  methods: {
    handler(item) {
      this.$message('操作')
      console.log(item)
    }
  }
}
</script>

<style scoped>
.cardABox {
  width: 100%;
  text-align: center;
}
.cardAItem {
  width: 100%;
  margin-top: 3%;
}
.box-card {
  width: 100%;
  margin-bottom: 2%;
  border-radius: 3%;
}
.text {
  font-size: 10%;
  margin: 3%;
}
.item {
  margin-bottom: 4%;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
