<template>
  <div class="edit-subject">
      <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic"
      inline
    >
      <div class="param-item">
        <el-form-item
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <div class="param-label">排序</div>
          <span style="margin-right: 5px;font-weight:bold">:</span>
           <el-input v-model="dynamicValidateForm.name" size="small" style="width: 300px"></el-input>
        </el-form-item>
      </div>
      <div class="param-item">
        <el-form-item
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <div class="param-label">试题类型</div>
          <span style="margin-right: 5px;font-weight:bold">:</span>
           <el-input v-model="dynamicValidateForm.name" size="small" style="width: 300px"></el-input>
        </el-form-item>
      </div>
      <div class="param-item">
        <el-form-item
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <div class="param-label" style="line-height: 68px">题目内容</div>
          <span style="margin-right: 5px;font-weight:bold">:</span>
           <el-input v-model="dynamicValidateForm.name" size="small" style="width: 300px" type="textarea" rows="3"></el-input>
        </el-form-item>
         <el-form-item
        >
          <Upload-oss
              :objConfig="{module: 'activity'}"
              :src.sync="dynamicValidateForm.paramImg"
            />
        </el-form-item>
      </div>
      <div class="param-item" v-for="(domain, index) in dynamicValidateForm.domains" :key="domain.key">
        <el-form-item
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
          :prop="'domains.' + index + '.paramImg'"
        >
          <Upload-oss
              :objConfig="{module: 'activity'}"
              :src.sync="domain.paramImg"
            />
        </el-form-item>
        <el-button :key="domain.key + '4'" @click.prevent="removeDomain(domain)" 
        type="danger" size="small"
          >删除</el-button
        >
         <el-button type="primary" size="small" @click="addDomain" v-if="index == dynamicValidateForm.domains.length-1"
          >添加选项</el-button
        >
      </div>
       <!-- <div class="btn-wrapper">
         <el-button type="primary" size="small" @click="addDomain"
          >点击添加选项</el-button
        >
       </div> -->
       <div class="param-item">
        <el-form-item
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <div class="param-label" style="line-height: 68px">答案解释</div>
          <span style="margin-right: 5px;font-weight:bold">:</span>
           <el-input v-model="dynamicValidateForm.name" size="small" style="width: 300px" type="textarea" rows="3"></el-input>
        </el-form-item>
         <el-form-item
        >
          <Upload-oss
              :objConfig="{module: 'activity'}"
              :src.sync="dynamicValidateForm.paramImg"
            />
        </el-form-item>
      </div>
      <div class="param-item">
        <el-form-item
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <div class="param-label">正确答案</div>
          <span style="margin-right: 5px;font-weight:bold">:</span>
           <el-input v-model="dynamicValidateForm.name" size="small" style="width: 300px"></el-input>
        </el-form-item>
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
        name:""
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
  padding-left: 20px;
  .param-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .param-label {
    width: 60px;
    display:inline-block;
    text-align:right;
  }
  /deep/ {
    .img180 {
      width: 80px;
      height: 80px;
    }
    .el-form-item {
      margin-bottom: 0;
    }
    .el-form-item__content {
      line-height: normal;
    }
  }
}
</style>
