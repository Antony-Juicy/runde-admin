<template>
  <div class="edit-subject">
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="140px"
      class="demo-dynamic"
      inline
    >
      <div class="param-item">
        <el-form-item
          label="项目"
          prop="productName"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'change',
          }"
        >
          <!--<div class="param-label">項目</div>-->
          <!--<span style="margin-right: 5px;font-weight:bold">:</span>-->
          <el-select
            v-model="dynamicValidateForm.productName"
            size="small"
            placeholder="请选择"
            style="width: 300px"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in productArr"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="param-item">
        <el-form-item
          label="科目"
          prop="subjectName"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <el-input
            v-model="dynamicValidateForm.subjectName"
            size="small"
            style="width: 300px"
          ></el-input>
        </el-form-item>
      </div>
      <div class="param-item">
        <el-form-item
          label="科目编号"
          prop="subjectNumber"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <!--<div class="param-label">科目</div>-->
          <!--<span style="margin-right: 5px;font-weight:bold">:</span>-->
          <el-input
            v-model="dynamicValidateForm.subjectNumber"
            size="small"
            style="width: 300px"
          ></el-input>
        </el-form-item>
      </div>
      <div class="param-item">
        <el-form-item
          label="理论考试时间"
          prop="theoryTestStart"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <!--<div class="param-label" style="line-height: 68px">理论考试时间</div>-->
          <!--<span style="margin-right: 5px;font-weight:bold">:</span>-->
          <el-date-picker
            size="small"
            v-model="dynamicValidateForm.theoryTestStart"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          >
          </el-date-picker>
        </el-form-item>
      </div>
      <div class="param-item">
        <el-form-item
          label="理论考试关课时间"
          prop="theoryTestClosingTime"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <el-date-picker
            style="margin-right: 30px"
            v-model="dynamicValidateForm.theoryTestClosingTime"
            type="datetime"
            placeholder="选择日期时间"
            :picker-options="startDateDisabled"
          >
          </el-date-picker>
          <el-checkbox v-model="dynamicValidateForm.checked1"
            >技能考试</el-checkbox
          >
          <el-checkbox v-model="dynamicValidateForm.checked2"
            >理论二考</el-checkbox
          >
        </el-form-item>
      </div>
      <div class="param-item" v-if="dynamicValidateForm.checked1">
        <el-form-item
          label="技能考试"
          prop="skillTestStart"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <!--<div class="param-label" style="line-height: 68px">技能考试</div>-->
          <!--<span style="margin-right: 5px;font-weight:bold">:</span>-->
          <el-date-picker
            size="small"
            v-model="dynamicValidateForm.skillTestStart"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          >
          </el-date-picker>
        </el-form-item>
      </div>
      <!--二考-->
      <div class="param-item" v-if="dynamicValidateForm.checked2">
        <el-form-item
          label="理论二考时间"
          prop="secondtestTime"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <!--<div class="param-label" style="line-height: 68px">技能考试</div>-->
          <!--<span style="margin-right: 5px;font-weight:bold">:</span>-->
          <el-date-picker
            size="small"
            v-model="dynamicValidateForm.secondtestTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          >
          </el-date-picker>
        </el-form-item>
      </div>
      <!--二考关闭时间-->
      <div class="param-item" v-if="dynamicValidateForm.checked2">
        <el-form-item
          label="理论二考关考时间"
          prop="theoryTest2ClosingTime"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <!--<div class="param-label" style="line-height: 68px">技能考试</div>-->
          <!--<span style="margin-right: 5px;font-weight:bold">:</span>-->
          <el-date-picker
            size="small"
            v-model="dynamicValidateForm.theoryTest2ClosingTime"
            type="datetime"
            placeholder="选择日期时间"
            :picker-options="startDateDisabled"
          >
          </el-date-picker>
        </el-form-item>
      </div>
      <div class="param-item">
        <el-form-item
          style="align-items: center; display: flex; flex: 1; height: 100%"
          label="状态"
          prop="subjectStatus"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <el-radio-group
            v-model="dynamicValidateForm.subjectStatus"
            @change="partChange"
          >
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">暂停</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <div class="param-item">
        <el-form-item
          label="三级类目"
          prop="financeCodeName3"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'change',
          }"
        >
          <!--<div class="param-label">項目</div>-->
          <!--<span style="margin-right: 5px;font-weight:bold">:</span>-->
          <el-select
            v-model="dynamicValidateForm.financeCodeName3"
            size="small"
            placeholder="请选择"
            style="width: 300px"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in threeCategoriesArr"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="btn-wrapper">
        <!--<el-button size="small" @click="resetForm('dynamicValidateForm')"-->
        <!--&gt;取消</el-button-->
        <!--&gt;-->
        <el-button
          type="primary"
          size="small"
          @click="submitForm('dynamicValidateForm')"
          >保存</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "edit-subject",
  data() {
    return {
      startDateDisabled: {},
      productArr: [],
      threeCategoriesArr: [],
      dynamicValidateForm: {
        // option: [
        //   {
        //     name: "",
        //     value: "",
        //     image: ""
        //   },
        // ],
        productName: "",
        subjectNumber: "",
        subjectName: "",
        theoryTestStart: "",
        skillTestStart: "",
        theoryTestClosingTime: "",
        secondtestTime: "",
        subjectStatus: "",
      },
    };
  },
  components: {},
  props: {
    id: {
      type: Number || String,
    },
    issuseId: {
      type: Number || String,
      default:0
    },
  },
  created() {
    console.log('issueID',this.issuseId)
    // 限制开始日期不能超过当前日期
    this.startDateDisabled.disabledDate = function (time) {
      return time.getTime() + 24 * 3600 * 1000 < Date.now();
    };
  },
  mounted() {
    this.getData();
    this.getSelectList();
  },
  methods: {
    getSelectList() {
      this.$fetch("coursesubject_getProductList", {}).then((res) => {
        console.log("list====？",res.data.data);
       this.productArr = res.data.data.map((item) => ({
          label: item.productName,
          value: item.id,
        }));
        this.threeCategoriesArr = res.data.financeCode3.map((item) => ({
          label: item.value,
          value: item.key,
        }));
      });
      // this.$refs.dataForm3.addInitValue();
    },
    partChange() {},
    // 动态添加
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
   
          this.dynamicValidateForm.theoryTestStart[0] =  this.$common._formatDates(this.dynamicValidateForm.theoryTestStart[0])
          this.dynamicValidateForm.theoryTestStart[1] =  this.$common._formatDates(this.dynamicValidateForm.theoryTestStart[1])
          this.dynamicValidateForm.theoryTestClosingTime =  this.$common._formatDates(this.dynamicValidateForm.theoryTestClosingTime)
          let skillTestStart = this.$common._formatDates(this.dynamicValidateForm.theoryTestStart[0]);
          let skillTestEnd = this.$common._formatDates(this.dynamicValidateForm.theoryTestStart[1]);
          console.log(this.dynamicValidateForm, "99",   this.dynamicValidateForm.theoryTestStart[0] );
          // let newObj = Object.assign(this.dynamicValidateForm,{})
          this.$fetch("coursesubject_save", {
            ...this.dynamicValidateForm,
            skillTestStart,
            skillTestEnd,
            id: this.id,
          }).then((res) => {
            this.$message.success("操作成功");
            this.$emit("close");
            this.$emit("refresh");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    removeDomain(item) {
      var index = this.dynamicValidateForm.option.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.option.splice(index, 1);
      }
    },
    addDomain() {
      console.log("datenNow===", Date.now());
      this.dynamicValidateForm.option.push({
        name: "",
        value: "",
        image: "",
        key: Date.now(),
      });
    },
    getData() {
      // this.$fetch("lookpicture_goEditDetails",{
      //   id: this.id,
      //   issuseId: this.issuseId
      // }).then(res => {
      //   let { issuseId,issue,issuesType } = res.data.pd;
      //   this.dynamicValidateForm = {
      //     option: [...issue.option],
      //     issuseId,
      //     issuesType,
      //     issuse: issue.issuse,
      //     imageIssuse: issue.imageIssuse,
      //     textAnalysis: issue.textAnalysis,
      //     imageAnalysis: issue.imageAnalysis,
      //     answer: issue.answer
      //   }
      // })
    },
  },
};
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
    margin-bottom: 20px;
  }
  .param-label {
    width: 60px;
    display: inline-block;
    text-align: right;
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
