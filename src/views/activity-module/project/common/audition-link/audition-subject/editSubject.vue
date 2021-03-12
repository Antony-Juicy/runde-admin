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
           <el-input v-model="dynamicValidateForm.issuseId" readonly size="small" style="width: 300px"></el-input>
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
           <el-input v-model="dynamicValidateForm.issuesType" readonly size="small" style="width: 300px"></el-input>
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
           <el-input v-model="dynamicValidateForm.issuse" size="small" style="width: 300px" type="textarea" rows="3"></el-input>
        </el-form-item>
         <el-form-item
        >
          <Upload-oss
              :objConfig="{module: 'activity'}"
              :src.sync="dynamicValidateForm.imageIssuse"
            />
        </el-form-item>
      </div>
      <div class="param-item" v-for="(domain, index) in dynamicValidateForm.option" :key="domain.key">
        <el-form-item
          :prop="'option.' + index + '.name'"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="domain.name" size="small" style="width: 60px"></el-input>
          <span style="font-weight:bold">:</span>
        </el-form-item>
        <el-form-item
          :prop="'option.' + index + '.value'"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="domain.value" size="small" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item
          :prop="'option.' + index + '.image'"
        >
          <Upload-oss
              :objConfig="{module: 'activity'}"
              :src.sync="domain.image"
            />
        </el-form-item>
        <el-button :key="domain.key + '4'" @click.prevent="removeDomain(domain)"  v-if="index != 0"
        type="danger" size="small"
          >删除</el-button
        >
         <el-button type="primary" size="small" @click="addDomain" v-if="index == dynamicValidateForm.option.length-1"
          >添加选项</el-button
        >
      </div>
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
           <el-input v-model="dynamicValidateForm.textAnalysis" size="small" style="width: 300px" type="textarea" rows="3"></el-input>
        </el-form-item>
         <el-form-item
        >
          <Upload-oss
              :objConfig="{module: 'activity'}"
              :src.sync="dynamicValidateForm.imageAnalysis"
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
           <el-input v-model="dynamicValidateForm.answer" size="small" style="width: 300px"></el-input>
        </el-form-item>
      </div>
      <div class="btn-wrapper">
        <el-button size="small" @click="resetForm('dynamicValidateForm')"
          >取消</el-button
        >
        <el-button type="primary" size="small" @click="submitForm('dynamicValidateForm')"
          >保存</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import UploadOss from "@/components/UploadOss";
export default {
  name:"edit-subject",
  data(){
    return {
       dynamicValidateForm: {
        option: [
          {
            name: "",
            value: "",
            image: ""
          },
        ],
        issuseId:"",
        issuesType:"",
        issuse:"",
        imageIssuse:"",
        textAnalysis:"",
        imageAnalysis:"",
        answer:""
      },
    }
  },
  components: {
    UploadOss
  },
  props:{
    id: {
      type: Number || String
    },
    issuseId: {
      type: Number || String
    }
  },
  mounted(){
    this.getData();
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
      var index = this.dynamicValidateForm.option.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.option.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.option.push({
        name: "",
        value: "",
        image: "",
        key: Date.now(),
      });
    },
    getData(){
      this.$fetch("lookpicture_goEditDetails",{
        id: this.id,
        issuseId: this.issuseId
      }).then(res => {
        let { issuseId,issue,issuesType } = res.data.pd;
        this.dynamicValidateForm = {
          option: [...issue.option],
          issuseId,
          issuesType,
          issuse: issue.issuse,
          imageIssuse: issue.imageIssuse,
          textAnalysis: issue.textAnalysis,
          imageAnalysis: issue.imageAnalysis,
          answer: issue.answer
        }
      })
    } 
  }
}
</script>

<style lang="scss" scoped>
.edit-subject {
  padding-left: 20px;
  max-height: calc(92vh - 71px - 63px);
  overflow: auto;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow: inset 0 0 5px #d0d1d3;
    background: #d0d1d3;
  }
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
  .btn-wrapper {
    text-align: right;
    margin-bottom: 0;
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
