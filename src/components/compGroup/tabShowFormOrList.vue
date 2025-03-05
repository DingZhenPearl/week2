<template>
  <div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="展示表单" name="first">展示表单</el-tab-pane>
        <el-tab-pane label="展示列表" name="second">展示列表</el-tab-pane>
      </el-tabs>
    </div>
    <div class="formItem" v-show="isFirst">
      <!-- h3是用来控制字体标识的标签，用h1到h5来表示不同字体大小-->
      <h3 style="text-align: center;font-size: 25px">表单标题</h3>
      <!-- el-form是调用了element-ui这一三方库的form组件 -->
      <!-- ref是某一元素的别名，:model为双向数据绑定，:rules是绑定表单规则，prop用来绑定数据键值对中的键名 -->
      <el-form ref="form" :model="form" :rules="rules" label-position="left" style="text-align: center">
        <!-- el-form-item为el-form组件中的某一个子元素 -->
        <el-form-item label="内容一" prop="param1">
          <el-input v-model="form.param1" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="内容二" prop="param2">
          <el-input v-model="form.param2" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="listItem" v-show="isSecond">
      <el-descriptions title="列表模板" border :column="3">
        <!--label表示标签文本；span表示列的数量，用span来调节行列关系，column规定了一行descriptions-item的数量-->
        <el-descriptions-item label="标签1" span="3">{{listForm.param1}}</el-descriptions-item>
        <el-descriptions-item label="标签2">{{listForm.param2}}</el-descriptions-item>
        <el-descriptions-item label="标签3">{{listForm.param3}}</el-descriptions-item>
        <el-descriptions-item label="标签4">{{param4}}</el-descriptions-item>
        <el-descriptions-item label="标签5" span="2">内容五</el-descriptions-item>
        <el-descriptions-item label="标签6">内容六</el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabShowDifChart",
  data() {
    return {
      activeName: '展示表单',
      isFirst: false,
      isSecond: false,
      form: {
        param1: "",
        param2:"",
      },
      listForm:{
        param1: '内容一',
        param2: '内容二',
        param3: '内容三',
      },
      param4:'内容四',
      rules:{
        param1: [
          { required: true, message: '请输入内容一', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.name === "first") {
        this.isFirst = true
        this.isSecond = false
      } else if (tab.name === "second") {
        this.isFirst = false
        this.isSecond = true
      }
    },
  }

}
</script>

<style scoped>
.formItem{
  width: 100%;
  text-align: center;
}
.listItem {
  width: 100%;
}
</style>