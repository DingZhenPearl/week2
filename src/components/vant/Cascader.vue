<template class="cascaderBox">
  <div class="cascaderItem">
    <!-- 表单中的输入框组件。-->
    <!-- is-link	是否展示右侧箭头并开启点击反馈-->
    <!-- readonly	是否只读-->
    <van-field
        v-model="fieldValue"
        is-link
        readonly
        label="地区"
        placeholder="请选择所在地区"
        @click="show = true"
    />
    <!-- 弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示。 -->
    <!-- 级联选择框，用于多层级数据的选择，典型场景为省市区选择。 -->
    <!-- title	顶部标题 -->
    <!-- options	可选项数据源 -->
    <!-- close	点击关闭图标时触发 -->
    <!-- finish	全部选项选择完成后触发 -->
    <!-- change	选中项变化时触发 -->
    <van-popup v-model="show" round position="bottom">
      <van-cascader
          v-model="cascaderValue"
          title="请选择所在地区"
          :options="options"
          @close="show = false"
          @finish="onFinish"
          @change="getChange"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "Cascader",
  data() {
    return {
      show: false,
      fieldValue: '',
      cascaderValue: '',
      // 选项列表，children 代表子选项，支持多级嵌套
      options: [
        {
          text: '海淀区',
          value: '330000',
          children: [
              {text: '西土城路', value: '330100',children:[
                  {text: '北京邮电大学', value: '320101'},
                ]},
              {text: '学院南路', value: '330101',children:[
                  {text: '北京理工大学', value: '320102'},
                  {text: '北京航空航天大学', value: '320103'}
                ]},

          ],
        },
        {
          text: '昌平区',
          value: '320000',
          children: [
              {text: '沙河', value: '320101'},
              {text: '沙河高教园', value: '320102'}
          ],
        },
      ],
    }
  },
  methods: {
    onFinish({selectedOptions}) {
      console.log(selectedOptions)
      this.fieldValue = selectedOptions.map((option) => option.text).join('/');
    },
    getChange({value, selectedOptions}){
      console.log(value)
      console.log(selectedOptions)
    }
  }
}
</script>

<style scoped>
.cascaderBox{
  width: 100%;
}
.cascaderitem{
  width: 100%;
}
</style>