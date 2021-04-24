<template>
  <div class="project-manage">
    <search-form
      :formOptions="formOptions"
      :showNum="showNum"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container mt-15">
      <el-button type="primary" size="small" @click="handleAdd">
        +添加科目</el-button
      >
      <div class="mt-15">
        <rd-table
          :tableData="tableData"
          :tableKey="tableKey"
          :tbodyHeight="600"
          :pageConfig.sync="pageConfig"
          @pageChange="pageChange"
        >
          <template slot="edit" slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text" size="medium">
              编辑
            </el-button>
          </template>
        </rd-table>
      </div>
    </div>
    <!-- 添加弹窗 -->
    <rd-dialog
      :title="addStatus ? '添加科目' : '编辑科目'"
      :dialogVisible="addVisible"
      :showFooter="false"
      :width="'990px'"
      appendToBody
      @handleClose="addVisible = false"
    >
      <RdForm
        :formOptions="addFormOptions"
        formLabelWidth="140px"
        :rules="addRules"
        ref="dataForm3"
      >
        <template slot="endTime">
          <el-date-picker
            style="margin-right: 30px"
            v-model="basicInfo.endTime"
            type="datetime"
            placeholder="选择日期时间"
            @change="handleChange('endTime', basicInfo.endTime)"
            :picker-options="startDateDisabled"
          >
          </el-date-picker>
          <el-checkbox v-model="basicInfo.checked1" @change="handleCheck1"
            >技能考试</el-checkbox
          >
          <el-checkbox v-model="basicInfo.checked2" @change="handleCheck2"
            >理论二考</el-checkbox
          >
        </template>
        <template slot="secondEndTime" v-if="basicInfo.checked2">
          <div class="closeSecondTime">
            <span style="font-weight: bold">
              <i class="requireTag"></i>理论二考关课时间</span
            >
            <el-date-picker
              style="margin-left: 4px"
              @change="handleChange('secondEndTime', basicInfo.secondEndTime)"
              v-model="basicInfo.secondEndTime"
              type="datetime"
              placeholder="关闭课程时间"
              :picker-options="startDateDisabled"
            ></el-date-picker>
          </div>
        </template>
        <!-- <template slot="tectestTime">
          <el-date-picker
             v-if="basicInfo.checked1"
            style="margin-right: 30px"
            v-model="basicInfo.tectestTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间" 
            :picker-options="startDateDisabled"
          ></el-date-picker>
        </template>
          <template slot="secondtestTime" >
          <el-date-picker
            v-if="basicInfo.checked2"
            style="margin-right: 30px"
            v-model="basicInfo.secondtestTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间" 
            :picker-options="startDateDisabled"
          ></el-date-picker>

        </template> -->
      </RdForm>
      <div class="btn-wrapper" style="text-align: right; margin-top: 20px">
        <el-button
          type="primary"
          size="small"
          :loading="btnLoading"
          @click="submitAddForm('dataForm3')"
          v-prevent-re-click="2000"
          >添加</el-button
        >
      </div>
    </rd-dialog>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import Temp from "../../temp.vue";
export default {
  name: "project-manage",
  components: {
    RdForm,
    Temp,
  },
  data() {
    return {
      startDateDisabled: {},
      addVisible: false,
      addStatus: true,
      btnLoading: false,
      showNum: 2,
      searchForm: {},
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },
      formOptions: [
        {
          prop: "project",
          element: "el-select",
          placeholder: "请选择项目",
        },
        {
          prop: "projectType",
          element: "el-select",
          placeholder: "请选择类型",
        },
      ],
      tableData: [
        {
          id: 1,
          subjectName: "医师",
          tectestTime: "/",
          testTime: "10-30",
          endTime: "11-30",
          status: "正常",
          creatTime: "2021-2.-1 09：32",
        },
      ],
      tableKey: [
        { name: "id", value: "id" },
        { name: "科目名", value: "subjectName" },
        { name: "所属项目", value: "project" },
        { name: "技能考试时间", value: "tectestTime" },
        { name: "理论考试时间", value: "testTime" },
        { name: "理论考试关课时间", value: "endTime" },
        { name: "理论二考时间", value: "secondtestTime" },
        { name: "理论二考关课时间", value: "secondEndTime" },
        { name: "状态", value: "status" },
        { name: "创建时间", value: "creatTime" },

        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 140,
          fixed: "right",
        },
      ],
      addFormOptions: [
        {
          prop: "project",
          element: "el-select",
          placeholder: "请选择",
          label: "项目",
          options: [
            {
              label: "收费",
              value: "Charge",
            },
            {
              label: "免费",
              value: "Free",
            },
          ],
        },
        {
          prop: "subjectName",
          element: "el-input",
          placeholder: "请输入",
          label: "科目名称",
        },
        {
          prop: "subjectNumber",
          element: "el-input",
          placeholder: "请输入",
          label: "科目编号",
        },
        {
          prop: "testTime",
          element: "el-date-picker",
          startPlaceholder: "开始时间",
          endPlaceholder: "结束时间",
          label: "理论考试时间",
        },
        {
          prop: "endTime",
          element: "el-date-picker",
          startPlaceholder: "开始时间",
          endPlaceholder: "结束时间",
          label: "理论考试关课时间",
          operate: true,
        },
        // {
        //   prop: "tectestTime",
        //   element: "el-date-picker",
        //   startPlaceholder: "开始时间",
        //   endPlaceholder: "结束时间",
        //   label: "技能考试时间",
        //   // operate: true,
        // },
        // {
        //   prop: "secondtestTime",
        //   element: "el-date-picker",
        //   startPlaceholder: "开始时间",
        //   endPlaceholder: "结束时间",
        //   label: "理论二考时间",
        //   // operate: true,
        // },
        {
          prop: "secondEndTime",
          element: "el-date-picker",
          startPlaceholder: "开始时间",
          endPlaceholder: "结束时间",
          // label: "理论二考关课时间",
          operate: true,
        },
        {
          prop: "status",
          element: "el-radio",
          placeholder: "请选择状态",
          label: "状态：",
          options: [
            {
              label: "正常",
              value: "Open",
            },
            {
              label: "暂停",
              value: "Close",
            },
          ],
          initValue: "Open",
        },
        {
          prop: "threeCategories",
          element: "el-select",
          placeholder: "请选择",
          label: "三级类目",
          options: [
            {
              label: "收费",
              value: "Charge",
            },
            {
              label: "免费",
              value: "Free",
            },
          ],
        },
      ],
      addRules: {
        project: [{ required: true, message: "请选择", trigger: "change" }],
        subjectName: [{ required: true, message: "请输入", trigger: "blur" }],
        subjectNumber: [{ required: true, message: "请输入", trigger: "blur" }],
        testTime: [{ required: true, message: "请选择", trigger: "change" }],
        endTime: [{ required: true, message: "请选择", trigger: "change" }],
        tectestTime: [
          { required: true, message: "请选择技能考试时间", trigger: "change" },
        ],
        secondtestTime: [
          { required: true, message: "请选择理论二考时间", trigger: "change" },
        ],
        secondEndTime: [
          {
            required: true,
            message: "请选择理论二考关课时间",
            trigger: "change",
          },
        ],
        status: [{ required: true, message: "请选择", trigger: "change" }],
        threeCategories: [
          { required: true, message: "请选择", trigger: "change" },
        ],
      },
      basicInfo: {
        endTime: "",
        checked1: false,
        checked2: false,
        tectestTime: "",
        secondtestTime: "",
        secondEndTime: "",
      },
    };
  },
  created() {
    // 限制开始日期不能超过当前日期
    this.startDateDisabled.disabledDate = function (time) {
      return time.getTime() + 24 * 3600 * 1000 < Date.now();
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    handleCheck1(val) {
      console.log(val);

      if (val) {
        //选中
        if (!this.addRules.tectestTime) {
          this.addRules.tectestTime = [
            {
              required: true,
              message: "请选择技能考试时间1",
              trigger: "change",
            },
          ];
        }

        console.log("hghgh addRules===", this.addRules);
        this.addFormOptions.forEach((item, index) => {
          if (item.prop == "endTime") {
            var idex = index + 1;
            if (this.addFormOptions[idex].prop != "tectestTime") {
              this.addFormOptions.splice(idex, 0, {
                prop: "tectestTime",
                element: "el-date-picker",
                startPlaceholder: "开始时间",
                endPlaceholder: "结束时间",
                label: "技能考试时间",
              }); //
            }
          }
        });
      } else {
        //不选
        if (
          this.addRules.tectestTime &&
          this.addRules.tectestTime.length != 0
        ) {
          delete this.addRules.tectestTime;
        }
        this.addFormOptions = this.addFormOptions.filter((item, index) => {
          return item.prop != "tectestTime";
        });
      }
    },
    handleCheck2(val) {
      console.log(val);
      // secondtestTime
      if (val) {
        //选中
        // if (!this.addRules.secondtestTime) {
        //   this.addRules.secondtestTime = [
        //     { required: true, message: "请选择 secondtestTime", trigger: "change" },
        //   ];
        // }
        // if (!this.addRules.secondEndTime) {
        //   this.addRules.secondEndTime = [
        //     { required: true, message: "请选择 secondEndTime", trigger: "change" },
        //   ];
        // }
        this.addFormOptions.forEach((item, index) => {
          if (item.prop == "endTime") {
            var idex = this.basicInfo.checked1 ? index + 2 : index + 1;
            if (this.addFormOptions[idex].prop != "secondtestTime") {
              this.addFormOptions.splice(idex, 0, {
                prop: "secondtestTime",
                element: "el-date-picker",
                startPlaceholder: "开始时间",
                endPlaceholder: "结束时间",
                label: "理论二考时间",
                // operate: true,
              }); //
            }
          }
        });
      } else {
        //不选 
        // if (
        //   this.addRules.secondtestTime &&
        //   this.addRules.secondtestTime.length != 0
        // ) {
        //   delete this.addRules.secondtestTime;
        // }
        // if (
        //   this.addRules.secondEndTime &&
        //   this.addRules.secondEndTime.length != 0
        // ) {
        //   delete this.addRules.secondEndTime;
        // }
        this.addFormOptions = this.addFormOptions.filter((item, index) => {
          return item.prop != "secondtestTime";
        });
      }
    },
    handleChange(soltName, val) {
      this.$refs.dataForm3.setValue({
        [soltName]: val,
      });
      setTimeout(() => {
        this.$refs["dataForm3"].validateField([soltName], (errorMessage) => {
          console.log(errorMessage, "errorMessage");
        });
      }, 0);
    },
    handleEdit(data) {
      //TODO
      console.log(77555);
      this.addStatus = false;
      this.addVisible = true;
      //TODO
      this.$fetch("secretexamsubject_goEdit", {
        id: data.id,
      }).then((res) => {
        this.addFormOptions.forEach((item) => {
          // if (item.prop != "describe") {
          //   item.initValue = data[item.prop];
          // }
          // item.initValue = res.data.pd[item.prop];
        });
        this.$refs.dataForm3.addInitValue();
        console.log(this.addFormOptions, "this.addFormOptions---");
      });
    },
    submitAddForm(formName) {
      if (this.basicInfo.checked2 == false) {
        //不选
        if (
          this.addRules.secondEndTime &&
          this.addRules.secondEndTime.length != 0
        ) {
          delete this.addRules.secondEndTime;
        }
        if (
          this.addRules.secondtestTime &&
          this.addRules.secondtestTime.length != 0
        ) {
          delete this.addRules.secondtestTime;
        }
      } else {
        if (!this.addRules.secondEndTime) {
          this.addRules.secondEndTime = [
            { required: true, message: "请选择", trigger: "change" },
          ];
        }
        if (!this.addRules.secondtestTime) {
          this.addRules.secondtestTime = [
            {
              required: true,
              message: "请选择 secondtestTime",
              trigger: "change",
            },
          ];
        }
      }
      //TODO
      this.$refs[formName].validate((valid, formData) => {
        if (valid) {
          console.log(formData, "添加");
          //TODO
          // if (!this.basicInfo.endTime) {
          //   this.$message.error("请选择理论考试关课时间");
          //   return;
          // }
          this.$fetch(
            this.addStatus
              ? "secretexamsubject_add"
              : "secretexamsubject_editJsp",
            {
              ...formData,
              time: "",
              startTime: formData.time ? formData.time[0] : "",
              endTime: formData.time ? formData.time[1] : "",
              id: this.addStatus ? "" : this.editId,
            }
          ).then((res) => {
            this.$message.success("操作成功");
            this.distributeVisible = false;
            this.getTableData();
          });
        }
      });
    },
    handleAdd() {
      this.addVisible = true;
      this.addStatus = true;
    },
    onSearch(val) {
      this.searchForm = {
        ...val,
      };
      this.getTableData();
    },
    getTableData(params = {}) {
      // this.$fetch("posterinfo_listJson", {
      //   ...this.pageConfig,
      //   ...this.searchForm,
      //   ...params,
      // }).then((res) => {
      //   this.tableData = res.data.data.map((item) => {
      //     item.creatTime = this.$common._formatDates(item.createAt);
      //     return item;
      //   });
      //   this.pageConfig.totalCount = res.data.count;
      // });
    },
    pageChange(val) {
      console.log(val, "pagechange");
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
  },
};
</script>

<style lang="scss" scoped>
.closeSecondTime {
  margin-left: -130px !important;
  .requireTag {
    &::before {
      display: inline-block;
      content: "*";
      color: #f56c6c;
      margin-right: 4px;
    }
  }
}
</style>
