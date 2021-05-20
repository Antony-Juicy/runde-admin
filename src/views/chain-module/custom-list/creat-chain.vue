<template>
  <div class="creat-chain">
      <rd-form :formOptions="addFormOptions" formLabelWidth="180px" :rules="addRules" ref="dataForm3">
          <template slot="address">
            <searchMap/>
          </template>
      </rd-form>
      <div style="text-align:right">
        <el-button type="primary" size="small" @click="submitAddForm('dataForm3')">提交</el-button>
      </div>
  </div>
</template>

<script>
import searchMap from "./search-map";
export default {
  name:"creat-chain",
  data(){
    return {
      addFormOptions: [
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入客户名称",
          label: "名称"
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请选择跟进人",
          label: "当前跟进人(选填)"
        },
        {
          prop: "address",
          element: "el-input",
          placeholder: "请输入详细地址",
          label: "地址",
          operate: true
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "请选择药店类型",
          label: "药店类型",
          options: []
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入员工数量",
          label: "员工数量"
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入意向客户数量",
          label: "意向客户"
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "请选择合作等级",
          label: "合作等级",
          options: []
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入学员数量",
          label: "学员数量"
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入企业负责人",
          label: "企业负责人"
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入手机号码",
          label: "手机号码"
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入协会关系",
          label: "协会关系"
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "请选择",
          label: "是否全员使用药店大学平台"
        },
      ],
      addRules: {

      }
    }
  },
  components: {
      searchMap
  },
   methods: {
     submitAddForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
        }
          
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.creat-chain {
    width: 70%;
    margin: 0 auto;
}
</style>
