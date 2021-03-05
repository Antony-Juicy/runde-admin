<template>
  <div class="edit-subject">
      <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic"
      inline
    >
      <template v-for="(domain, index) in dynamicValidateForm.domains">
        <el-form-item
          :key="domain.key"
          :prop="'domains.' + index + '.paramName'"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="domain.paramName" size="small" style="width: 60px"></el-input>
          <span style="font-weight:bold">:</span>
        </el-form-item>
        <el-form-item
          :key="domain.key + '2'"
          :prop="'domains.' + index + '.paramVal'"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="domain.paramVal" size="small" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item
          :key="domain.key + '3'"
          :prop="'domains.' + index + '.paramImg'"
        >
          <!-- <el-input v-model="domain.paramImg" size="small" style="width: 300px"></el-input> -->
          domain.paramImg:{{domain.paramImg}}
          <Upload-oss
              :objConfig="{module: 'activity'}"
              :src.sync="domain.paramImg"
            />
        </el-form-item>
        <el-button :key="domain.key + '4'" @click.prevent="removeDomain(domain)" 
        type="danger" size="small" style="margin-top:5px"
          >删除</el-button
        >
        <br :key="domain.key + '5'"/>

      </template>
       <div class="btn-wrapper">
         <el-button type="primary" size="small" @click="addDomain"
          >点击添加参数</el-button
        >
       </div>
      <div class="btn-wrapper">
        <el-button type="primary" @click="submitForm('dynamicValidateForm')"
          >提交</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import UploadOss from "@/components/UploadOss2";
export default {
  name:"edit-subject",
  data(){
    return {
       dynamicValidateForm: {
        domains: [
          {
            paramName: "",
            paramVal: "",
            paramImg: ""
          },
        ],
      },
    }
  },
  components: {
    UploadOss
  },
   methods: {
     // 动态添加
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.dynamicValidateForm,'99')
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
     resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        paramName: "",
        paramVal: "",
        paramImg: "",
        key: Date.now(),
      });
    } 
  }
}
</script>

<style lang="scss" scoped>
.edit-subject {

}
</style>
