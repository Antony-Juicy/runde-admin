<template>
  <div class="class-manage">
    <search-form
      :formOptions="formOptions"
      :showNum="showNum"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd">
          +添加班型内容
        </el-button>
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig.sync="pageConfig"
        :tbodyHeight="600"
        fixedTwoRow
        @pageChange="pageChange"
        :emptyText="emptyText"
      >
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">
            编辑
          </el-button>
          <el-button
            @click="changeTable(scope.row.buttonVisible, scope.$index)"
            type="text"
            size="small"
            style="color: #ec5b56"
            v-if="scope.row.buttonVisible"
            >启用</el-button
          >
          <el-button
            @click="changeTable(scope.row.buttonVisible, scope.$index)"
            type="text"
            size="small"
            style="color: #ec5b56"
            v-else
            >暂停</el-button
          >
        </template>
      </rd-table>
    </div>
    <!-- 添加活动 -->
    <fullDialog
      class="full-dialog-wrap"
      v-model="addVisible"
      :title="addStatus ? '添加班型内容' : '编辑班型内容'"
      @change="handleClose('dataForm3')"
    >
      <div>
        <RdForm
          :formOptions="addFormOptions"
          :rules="addRules"
          ref="dataForm3"
          formLabelWidth="120px"
        >
          <template slot="stage">
            <el-checkbox-group v-model="checkList"  @change="handleCheckedChange('stage',checkList)">
              <el-checkbox label="基础阶段"></el-checkbox>
              <el-checkbox label="强化阶段"></el-checkbox>
              <el-checkbox label="冲刺阶段"></el-checkbox>
            </el-checkbox-group>
          </template>
        </RdForm>

        <div class="btn-wrapper btn-wrap">
          <el-button
            class="el-btn"
            type="primary"
            size="small"
            :loading="btnLoading"
            @click="handleSubmit('dataForm3')"
            v-prevent-re-click="2000"
            >保存</el-button
          >
        </div>
      </div>
    </fullDialog>
  </div>
</template>

<script>
import fullDialog from "@/components/FullDialog";
import RdForm from "@/components/RdForm";
export default {
  name: "class-manage",
  components: {
    fullDialog,
    RdForm,
  },
  data() {
    return {
      showNum: 5,
      formOptions: [
        {
          prop: "className",
          element: "el-input",
          placeholder: "请输入班型名称",
        },
        {
          prop: "projectName",
          element: "el-select",
          placeholder: "请选择项目",
          options: [],
        },
        {
          prop: "elType",
          element: "el-select",
          placeholder: "请选择类型",
          options: [],
        },
        {
          prop: "classTime",
          element: "el-select",
          placeholder: "请选择确认时点",
          options: [],
        },
        {
          prop: "status",
          element: "el-select",
          placeholder: "请选择状态",
          options: [],
        },
      ],
      addVisible: false,
      addStatus: true,
      form: {},
      emptyText: "暂无数据",
      tableData: [
        // {
        //   id: 1,
        //   name: "啊哈哈",
        //   year: 1995,
        //   type: 2,
        //   money: "454",
        //   stage: "基础阶段",
        //   rules: "直线分摊",
        //   video: "有录播",
        //   classTime: 1995,
        //   createTime: 2,
        //   status: "正常",
        //   buttonVisible: true,
        // },
      ],
      tableKey: [
        {
          name: "ID",
          value: "id",
          fixed: "left",
          width: 80,
        },
        {
          name: "年份",
          value: "year",
        },
          {
          name: "所属项目",
          value: "belongSubject",
        },
        {
          name: "内容名称",
          value: "name",
        },
        {
          name: "类型",
          value: "type",
        },
        {
          name: "单科学费/元",
          value: "money",
        },
        {
          name: "课程阶段",
          value: "stage",
        },
        {
          name: "核算规则",
          value: "rules",
        },
        {
          name: "录播情况",
          value: "video",
        },
        {
          name: "授课起止时间",
          value: "classTime",
        },
        {
          name: "创建时间",
          value: "createTime",
        },
        {
          name: "状态",
          value: "status",
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 140,
          fixed: "right",
        },
      ],
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },
      addFormOptions: [
        {
          prop: "projectName",
          element: "el-select",
          placeholder: "所属项目",
          label: "所属项目:",
          options: [],
        },
        {
          prop: "className",
          element: "el-input",
          placeholder: "请输入班型内容名称",
          label: "班型内容名称：",
        },
        {
          prop: "elType",
          element: "el-radio",
          placeholder: "请选择类型",
          label: "类型：",
          options: [
            {
              label: "网课",
              value: "Open",
            },
            {
              label: "直播",
              value: "Close",
            },
            {
              label: "面授",
              value: "Hidden",
            },
          ],
          initValue: "Open",
        },
        {
          prop: "eduAmount",
          element: "el-input",
          placeholder: "请输入具体金额",
          label: "学费金额：",
        },
        {
          prop: "computedRules",
          element: "el-select",
          placeholder: "核算规则",
          label: "核算规则：",
          options: [],
        },
        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "开始日期",
          endPlaceholder: "结束日期",
          initWidth: true,
          label: "授课起止时间：",
          //   clearable: false
        },
        {
          prop: "videoStatus",
          element: "el-radio",
          placeholder: "请选择",
          label: "录播情况：",
          options: [
            {
              label: "有录播",
              value: "Open",
            },
            {
              label: "无",
              value: "Close",
            },
          ],
          initValue: "Open",
        },
        {
          prop: "stage",
          element: "el-input",
          placeholder: "",
          label: "学习阶段：",
          operate: true,
          initValue: 0,
          tableKey: [
            {
              value: "基础",
              show: true,
              name: "基础",
            },
            {
              value: "基础",
              show: true,
              name: "基础",
            },
            {
              value: "基础",
              show: true,
              name: "基础",
            },
          ],
        },
        {
          prop: "courseStatus",
          element: "el-radio",
          placeholder: "请选择显示状态",
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
      ],
      addRules: {
        projectName: [{ required: true, message: "请选择", trigger: "change" }],
        className: [{ required: true, message: "请输入", trigger: "blur" }],
        elType: [{ required: true, message: "请选择", trigger: "change" }],
        eduAmount: [{ required: true, message: "请输入", trigger: "blur" }],
        computedRules: [{ required: true, message: "请选择", trigger: "change" }],
        time: [{ required: true, message: "请选择", trigger: "change" }],
        videoStatus: [{ required: true, message: "请选择", trigger: "change" }],
        stage: [{ required: true, message: "请选择", trigger: "change" }],  
        courseStatus: [{ required: true, message: "请选择", trigger: "change" }],
      },
      btnLoading: false,
      dynamicValidateForm: {
        domains: [
          // {
          //   paramName: "",
          //   paramVal: "",
          // },
        ],
      },
      // 多选：学习阶段 所属项目 核算规则
      checkList: [],
      subjectArr: [],
      rulesArr: [],
    };
  },
  mounted(){
    this.getTableData()
  },
  methods: {
    handleCheckedChange(soltName, val) {
      console.log('hahh',val)
      this.$refs.dataForm3.setValue({
        [soltName]: val,
      });
      setTimeout(() => {
        this.$refs["dataForm3"].validateField([soltName], (errorMessage) => {
          console.log(errorMessage, "errorMessage");
        });
      }, 0);
    },

    getMulInfo(selIds, arr) {
      if (!selIds) {
        return [];
      }
      //选中的id selIds， 整个下拉，
      const currentArr = [];
      selIds.forEach((item) => {
        let name = arr.find((ele) => ele.value == item).label;
        currentArr.push({
          name,
          val: item,
        });
      });
      return currentArr;
    },
    handleClose(formName) {
      this.$refs[formName] && this.$refs[formName].onReset();
      this.checkList = [];
      this.addVisible = false;
      //   this.dynamicValidateForm.domains = [];
    },
    handleSubmit(formName) {
      // TODO 保存
      this.$refs[formName].validate((valid, formData) => {
      //   if (valid) {
      //     console.log(formData, "提交 11");
      //     const {time, projectName, computedRules } = formData;
      //     let belongSubject = this.getMulInfo(projectName, this.subjectArr);
      //     let rulesInfo = this.getMulInfo(computedRules, this.rulesArr);
  
      //     this.$fetch(
      //       this.addStatus
      //         ? "coupontemplateversiontwo_save"
      //         : "coupontemplateversiontwo_editJsp",
      //       {
      //         ...formData,
      //         time: "",
      //         startTime: time ? time[0] : "",
      //         endTime: time ? time[1] : "",
      //         projectName: projectName && projectName.join(","),
      //         computedRules: computedRules && computedRules.join(","),
      //         belongSubject:JSON.stringify(belongSubject),
      //         rulesInfo:JSON.stringify(rulesInfo),
              
      //       }
      //     ).then((res) => {
      //       this.$message.success("操作成功");
      //       this.addVisible = false;
      //       this.getTableData();
      //     });
      //   }
      });
    },
    onSearch(val) {
      this.searchForm = { ...val };
      console.log(val, this.searchForm, "val---");
      this.getTableData();
    },
    handleAdd() {
      this.addVisible = true;
    },
    getTableData(params = {}) {
      // posterinfo_listJson
      this.$fetch("courseProductContent_listJsp", { 
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        console.log("res0000", res.data.data);
      });

          this.$fetch("getProductList", { 

        ...params,
      }).then((res) => {
        console.log("res00001", res.data.data);
      });
    },
    pageChange(val) {
      console.log(val, "pagechange");
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    handleEdit(data) {
      this.addStatus = false;
      this.addVisible = true;
      //TODO 编辑
    },
    changeTable(buttonVisible, index) {
      this.tableData[index].buttonVisible = !buttonVisible;
    },
    handleDelete(row) {
      let info = "";
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //   const res = await this.$fetch("projectType_delete", {
          //     typeId: row.typeId,
          //     loginUserId,
          //   }).then((res) => {
          //     if (res) {
          //       this.$message({
          //         message: "删除成功",
          //         type: "success",
          //       });
          //       setTimeout(() => {
          //         this.getTableData();
          //       }, 50);
          //     }
          //   });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.class-manage {
  .full-dialog-wrap {
    width: 60%;
    margin: 0 auto;
  }
  /deep/.full-dialog-container {
    .content {
      width: 60%;
      margin: 0 auto;
    }
  }
  .btn-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
}
</style>
