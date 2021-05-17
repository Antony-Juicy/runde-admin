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
            :disabled="IsEditDisabled"
            size="small"
            placeholder="请选择"
            style="width: 300px"
            @change="changeSelect"
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
          :rules="[
            {
              required: true,
              message: '不能为空',
              trigger: 'blur',
            },
            {
              validator: this.checkData,
              trigger: 'blur',
            },
          ]"
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
          <el-checkbox v-show="showCheckbox" v-model="checked1"
            >技能考试</el-checkbox
          >
          <el-checkbox v-show="showCheckbox" v-model="checked2"
            >理论二考</el-checkbox
          >
        </el-form-item>
      </div>
      <div class="param-item" v-if="checked1 && showCheckbox">
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
      <div class="param-item" v-if="checked2 && showCheckbox">
        <el-form-item
          label="理论二考时间"
          prop="theoryTest2Start"
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
            v-model="dynamicValidateForm.theoryTest2Start"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          >
          </el-date-picker>
        </el-form-item>
      </div>
      <!--二考关闭时间-->
      <div class="param-item" v-if="checked2 && showCheckbox">
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
            <el-radio :label="true">正常</el-radio>
            <el-radio :label="false">暂停</el-radio>
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
              :value="item.label"
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
      showCheckbox: false,
      checked1: false,
      checked2: false,
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
        theoryTestEnd: "",
        skillTestStart: "",
        theoryTestClosingTime: "",
        theoryTest2ClosingTime: "",
        subjectStatus: "",
        theoryTest2Start: "",
        theoryTest2End: "",
      },
    };
  },
  components: {},
  props: {
    id: {
      //项目id
      type: [Number, String],
    },
    issuseId: {
      //科目id
      type: [Number, String],
    },
    addStatus: {
      type: Boolean,
    },
    tableData: {
      type: Array,
    },
    IsEditDisabled: {
      type: Boolean,
    },
  },
  created() {
    // 限制开始日期不能超过当前日期
    this.startDateDisabled.disabledDate = function (time) {
      return time.getTime() + 24 * 3600 * 1000 < Date.now();
    };
  },
  mounted() {
    if (this.addStatus == false) {
      this.getData();
    }
    this.getSelectList();
  },
  methods: {
    checkData(rule, value, callback) {
      if (value) {
        if (/[\u4E00-\u9FA5]/g.test(value)) {
          callback(new Error("不能为中文!"));
        } else {
          callback();
        }
      }
      callback();
    },
    changeSelect(val) {
      var name;
      this.productArr.map((item) => {
        if (item.value == val) {
          name = item.label;
        }
      });
      if (name == "医师") {
        this.showCheckbox = true;
      } else {
        this.showCheckbox = false;
        this.dynamicValidateForm.skillTestStart = "";
        this.dynamicValidateForm.theoryTest2Start = "";
      }
    },
    getSelectList() {
      this.$fetch("coursesubject_getProductList", {}).then((res) => {
        this.productArr = res.data.data.map((item) => ({
          label: item.productName,
          value: item.id,
        }));
        //项目
        res.data.data.map((item) => {
          if (item.id == this.id) {
            this.dynamicValidateForm.productName = item.productName;
            if (this.dynamicValidateForm.productName == "医师") {
              this.showCheckbox = true;
            } else {
              this.showCheckbox = false;
              this.dynamicValidateForm.skillTestStart = "";
              this.dynamicValidateForm.theoryTest2Start = "";
            }
          }
        });
        this.threeCategoriesArr = res.data.financeCode3.map((item) => ({
          label: item.value,
          value: item.key,
        }));
        console.log(" this.threeCategoriesArr", this.threeCategoriesArr);
      });
      // this.$refs.dataForm3.addInitValue();
    },
    partChange() {},
    // 添加
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dynamicValidateForm.theoryTestStart[0] = this.$common._formatDates3(
            this.dynamicValidateForm.theoryTestStart[0]
          );
          this.dynamicValidateForm.theoryTestStart[1] = this.$common._formatDates3(
            this.dynamicValidateForm.theoryTestStart[1]
          );
          this.dynamicValidateForm.theoryTest2ClosingTime = this.$common._formatDates3(
            this.dynamicValidateForm.theoryTest2ClosingTime
          );
          this.dynamicValidateForm.theoryTestClosingTime = this.$common._formatDates3(
            this.dynamicValidateForm.theoryTestClosingTime
          );
          let skillTestStart = this.$common._formatDates3(
            this.dynamicValidateForm.skillTestStart[0]
          );
          let skillTestEnd = this.$common._formatDates3(
            this.dynamicValidateForm.skillTestStart[1]
          );
          let theoryTestStart = this.$common._formatDates3(
            this.dynamicValidateForm.theoryTestStart[0]
          );
          let theoryTestEnd = this.$common._formatDates3(
            this.dynamicValidateForm.theoryTestStart[1]
          );

          let theoryTest2Start = this.$common._formatDates3(
            this.dynamicValidateForm.theoryTest2Start[0]
          );
          let theoryTest2End = this.$common._formatDates3(
            this.dynamicValidateForm.theoryTest2Start[1]
          );
          let financeCode3;
          let obj1 = this.threeCategoriesArr.find((item) => {
            return item.label == this.dynamicValidateForm.financeCodeName3;
          });

          financeCode3 = obj1 && obj1.value;
          let productId;
          let obj2 = this.productArr.find((item) => {
            return item.value == this.dynamicValidateForm.productName;
          });
          productId = obj2 && obj2.value;
          this.$fetch(
            this.addStatus ? "coursesubject_save" : "coursesubject_editJsp",
            {
              ...this.dynamicValidateForm,
              skillTestStart: this.checked1 ? skillTestStart : "",
              skillTestEnd: this.checked1 ? skillTestEnd : "",
              theoryTestStart,
              theoryTestEnd,
              theoryTest2Start: this.checked2 ? theoryTest2Start : "",
              theoryTest2End: this.checked2 ? theoryTest2End : "",
              financeCode3,
              productId: this.id ? this.id : productId,
              id: this.issuseId,
            }
          ).then((res) => {
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
    getData() {
      this.$fetch("coursesubject_goEdit", {
        id: this.issuseId,
      }).then((res) => {
        let skillTestStart =
          res.data.skillTestStart && res.data.skillTestEnd
            ? [
                new Date(this.$common._getNowYearDate(res.data.skillTestStart)),
                new Date(this.$common._getNowYearDate(res.data.skillTestEnd)),
              ]
            : "";
        let theoryTestStart =
          res.data.theoryTestStart && res.data.theoryTestEnd
            ? [
                new Date(
                  this.$common._getNowYearDate(res.data.theoryTestStart)
                ),
                new Date(this.$common._getNowYearDate(res.data.theoryTestEnd)),
              ]
            : "";
        let theoryTest2Start =
          res.data.theoryTest2Start && res.data.theoryTest2End
            ? [
                new Date(
                  this.$common._getNowYearDate(res.data.theoryTest2Start)
                ),
                new Date(this.$common._getNowYearDate(res.data.theoryTest2End)),
              ]
            : "";
        let theoryTest2ClosingTime = res.data.theoryTest2ClosingTime
          ? this.$common._getNowYearDate(res.data.theoryTest2ClosingTime)
          : "";
        let theoryTestClosingTime = res.data.theoryTestClosingTime
          ? this.$common._getNowYearDate(res.data.theoryTestClosingTime)
          : "";
        let obj = {
          ...res.data,
          theoryTestStart: theoryTestStart,
          theoryTest2Start: theoryTest2Start,
          skillTestStart: skillTestStart,
          theoryTest2ClosingTime: theoryTest2ClosingTime,
          theoryTestClosingTime: theoryTestClosingTime,
        };
        if (res.data.productId == 2) {
          this.showCheckbox = true;
          this.checked1 =
            res.data.skillTestStart && res.data.skillTestEnd ? true : false;
          this.checked2 =
            res.data.theoryTest2Start && res.data.theoryTest2End ? true : false;
        } else {
          this.showCheckbox = false;
          this.checked1 = false;
          this.checked2 = false;
        }
        this.dynamicValidateForm = obj;
      });
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
