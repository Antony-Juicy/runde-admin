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
        fixedTwoRow
        @pageChange="pageChange"
        :emptyText="emptyText"
      >
        <template slot="courseStartTime" slot-scope="scope">
          {{ scope.row.courseStartTime }} ~ {{ scope.row.courseEndTime }}
        </template>
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">
            编辑
          </el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click="changeTable(scope.row)"
            type="text"
            size="small"
            style="color: #ec5b56"
            >{{
              scope.row.status_text == "Normal" ? "暂停" : "启用"
            }}</el-button
          >
          <!-- <el-button
            @click="changeTable(scope.row.buttonVisible, scope.$index)"
            type="text"
            size="small"
            style="color: #ec5b56"
            v-else
            >暂停</el-button
          > -->
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
      <div v-if="addVisible">
        <RdForm
          :formOptions="addFormOptions"
          :rules="addRules"
          ref="dataForm3"
          formLabelWidth="120px"
        >
          <!-- <template slot="stage">
            <el-checkbox-group v-model="checkList"  @change="handleCheckedChange('stage',checkList)">
              <el-checkbox label="基础阶段"></el-checkbox>
              <el-checkbox label="强化阶段"></el-checkbox>
              <el-checkbox label="冲刺阶段"></el-checkbox>
            </el-checkbox-group>
          </template> -->
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
          prop: "contentName",
          element: "el-input",
          placeholder: "班型内容名称",
        },
        {
          prop: "productId",
          element: "el-select",
          placeholder: "项目",
          options: [],
        },
        {
          prop: "contentType",
          element: "el-select",
          placeholder: "类型",
          options: [
            {
              label: "网课",
              value: "NetClass",
            },
            {
              label: "直播",
              value: "Live",
            },
            {
              label: "面授",
              value: "FaceTo",
            },
            {
              label: "证书",
              value: "Certificate",
            },
            {
              label: "公开课",
              value: "OpenClass",
            },
          ],
        },
        {
          prop: "accountingRules",
          element: "el-select",
          placeholder: "核算规则",
          options: [],
        },
        {
          prop: "status",
          element: "el-select",
          placeholder: "请选择状态",
          options: [
            {
              label: "正常",
              value: "Normal",
            },
            {
              label: "暂停",
              value: "Stop",
            },
          ],
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
          value: "contentYear",
          width: 80,
        },
        {
          name: "所属项目",
          value: "productName",
          // width: 80,
        },
        {
          name: "内容名称",
          value: "contentName",
        },
        {
          name: "类型",
          value: "contentType",
          // width: 80,
        },
        {
          name: "课程编码",
          value: "liveCode",
        },
        {
          name: "单科学费/元",
          value: "contentPrice",
          // width: 80,
        },
        {
          name: "课程阶段",
          value: "stageGroupName",
          // width: 80,
        },
        {
          name: "核算规则",
          value: "accountingRules",
        },
        {
          name: "录播情况",
          value: "playbackCn",
          width: 80,
        },
        {
          name: "授课起止时间",
          value: "courseStartTime",
          operate: true,
          width: 180,
        },
        {
          name: "创建时间",
          value: "createAt",
        },
        {
          name: "状态",
          value: "status",
          width: 80,
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
          prop: "productId",
          element: "el-select",
          placeholder: "所属项目",
          label: "所属项目:",
          options: [],
          events: {},
          disabled: false,
        },
        {
          prop: "contentYear",
          element: "el-select",
          placeholder: "请选择年份",
          label: "年份:",
          options: [],
          disabled: false,
        },
        {
          prop: "contentName",
          element: "el-input",
          placeholder: "请输入班型内容名称",
          label: "班型内容名称：",
        },
        {
          prop: "contentType",
          element: "el-radio",
          placeholder: "请选择类型",
          label: "类型：",
          options: [
            {
              label: "网课",
              value: "NetClass",
            },
            {
              label: "直播",
              value: "Live",
            },
            {
              label: "面授",
              value: "FaceTo",
            },
            {
              label: "证书",
              value: "Certificate",
            },
            {
              label: "公开课",
              value: "OpenClass",
            },
          ],
          events: {
            change: this.changecourseCode,
          },
          disabled: false,
        },
        {
          prop: "liveCode",
          element: "el-input",
          placeholder: "请输入课程编码",
          label: "课程编码：",
          hide: true,
        },
        {
          prop: "contentPrice",
          element: "el-input-number",
          placeholder: "请输入具体金额",
          label: "学费金额：",
          min: 0,
        },
        {
          prop: "accountingRules",
          element: "el-select",
          placeholder: "核算规则",
          label: "核算规则：",
          options: [],
          disabled: false,
        },
        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "开始日期",
          endPlaceholder: "结束日期",
          initWidth: true,
          label: "授课起止时间：",
          disabled: false,
          //   clearable: false
        },
        {
          prop: "playback",
          element: "el-radio",
          placeholder: "请选择",
          label: "录播情况：",
          options: [
            {
              label: "有录播",
              value: true,
            },
            {
              label: "无",
              value: false,
            },
          ],
        },
        {
          prop: "stageGroupId",
          element: "el-checkbox",
          placeholder: "",
          label: "学习阶段：",
          // operate: true,
          initValue: [],
          options: [
            // {
            //   label: "基础阶段",
            //   value: "基础"
            // }
            // {
            //   value: "基础",
            //   show: true,
            //   name: "基础",
            // },
            // {
            //   value: "基础",
            //   show: true,
            //   name: "基础",
            // },
            // {
            //   value: "基础",
            //   show: true,
            //   name: "基础",
            // },
          ],
        },
        {
          prop: "status",
          element: "el-radio",
          placeholder: "请选择显示状态",
          label: "状态：",
          options: [
            {
              label: "正常",
              value: "Normal",
            },
            {
              label: "暂停",
              value: "Stop",
            },
          ],
        },
      ],
      addRules: {
        contentYear: [{ required: true, message: "请输入", trigger: "change" }],
        productId: [{ required: true, message: "请选择", trigger: "change" }],
        contentName: [{ required: true, message: "请输入", trigger: "blur" }],
        liveCode: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: this.checkData, trigger: "blur" },
        ],
        contentType: [{ required: true, message: "请选择", trigger: "change" }],
        contentPrice: [{ required: true, message: "请输入", trigger: "blur" }],
        accountingRules: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        time: [{ required: true, message: "请选择", trigger: "change" }],
        playback: [{ required: true, message: "请选择", trigger: "change" }],
        stageGroupId: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        status: [{ required: true, message: "请选择", trigger: "change" }],
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
      stageArr: [],
      productArr: [],
      editId: "",
    };
  },
  mounted() {
    this.getTableData();
    this.getProductList();
    this.getRulesList();
    // this.getClassTypeList()
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
    changecourseCode(val) {
      if (val == "Live") {
        this.addFormOptions[4].hide = false;
      } else {
        this.addFormOptions[4].hide = true;
      }
    },
    handleCheckedChange(soltName, val) {
      console.log("hahh", val);
      this.$refs.dataForm3.setValue({
        [soltName]: val,
      });
      setTimeout(() => {
        this.$refs["dataForm3"].validateField([soltName], (errorMessage) => {
          console.log(errorMessage, "errorMessage");
        });
      }, 0);
    },

    getProductList() {
      this.$fetch("courseProductContent_getProductList").then((res) => {
        this.productArr = res.data.data.map((item) => ({
          label: item.productName,
          value: item.id,
        }));
        this.addFormOptions[0].options = this.productArr;
        this.formOptions[1].options = this.productArr;
        this.addFormOptions[0].events = {
          change: this.productChange,
        };
      });
    },

    productChange(val) {
      return new Promise((resolve) => {
        this.$fetch("courseProductContent_stageGroupList", {
          productId: val,
        }).then((res) => {
          this.stageArr = res.dataJson.list
            ? res.dataJson.list.map((item) => ({
                label: item.id,
                value: item.stageGroupName,
              }))
            : [];
          this.addFormOptions[9].options = this.stageArr;
          this.$refs.dataForm3.setValue({
            stageGroupId: [],
          });
          this.$nextTick(() => {
            this.$refs.dataForm3.clearValidate("stageGroupId");
          });
          resolve();
        });
      });
    },
    getRulesList() {
      return new Promise((resolve) => {
        this.$fetch("courseProductContent_goAccountingRulesSelects").then(
          (res) => {
            const { protocolTypeList, recentlyYear } = res.data;
            this.rulesArr = protocolTypeList
              ? protocolTypeList.map((item) => ({
                  label: item.value,
                  value: item.key,
                }))
              : [];
            this.addFormOptions[6].options = this.rulesArr;
            this.addFormOptions[1].options = recentlyYear.map((item) => ({
              label: item,
              value: item,
            }));
            this.formOptions[3].options = this.rulesArr;
            resolve();
          }
        );
      });
    },

    // getClassTypeList(){
    //   this.$fetch("courseProductContent_stageGroupList").then((res) => {
    //     this.addFormOptions[7].options = res.dataJson.list&&res.dataJson.list.map(item => ({
    //       label: item.id,
    //       value: item.stageGroupName
    //     }))
    //   });
    // },

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
      // this.$refs[formName] && this.$refs[formName].resetFields();
      // this.checkList = [];
      this.addVisible = false;
      //   this.dynamicValidateForm.domains = [];
    },
    handleSubmit(formName) {
      // TODO 保存
      this.$refs[formName].validate((valid, formData) => {
        if (valid) {
          console.log(formData, "提交 11");
          const { time, stageGroupId, productId, accountingRules } = formData;
          let stageGroupName = [],
            productName,
            accountingRules_text;
          stageGroupId.forEach((item) => {
            let obj = this.stageArr.find((ele) => item == ele.label);
            if (obj) {
              stageGroupName.push(obj.value);
            }
          });
          productName = this.productArr.find((ele) => productId == ele.value)
            .label;
          accountingRules_text =
            accountingRules == "LineAverage" ? "直线分摊" : "授课结束当月确认";
          this.$fetch(
            this.addStatus
              ? "courseProductContent_save"
              : "courseProductContent_edit",
            {
              ...formData,
              time: "",
              courseStartTime: time ? time[0] : "",
              courseEndTime: time ? time[1] : "",
              stageGroupId: stageGroupId.join(","),
              stageGroupName: stageGroupName.join(","),
              productName,
              id: this.addStatus ? "" : this.editId,
              accountingRules_text,
            }
          ).then((res) => {
            this.$message.success("操作成功");
            this.addVisible = false;
            this.getTableData();
          });
        }
      });
    },
    onSearch(val) {
      this.searchForm = { ...val };
      console.log(val, this.searchForm, "val---");
      this.getTableData();
    },
    handleAdd() {
      this.addStatus = true;
      this.addVisible = true;
      //课程编码
      this.addFormOptions[4].hide = true;
      // 可编辑状态
      this.changeDisableStats(false);
    },
    getTableData(params = {}) {
      // posterinfo_listJson
      this.$fetch("courseProductContent_listJsp", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        this.tableData = res.data.list.map((item) => {
          item.playbackCn = item.playback ? "有" : "无";
          if (!item.liveCode) {
            item.liveCode = "无";
          }
          item.createAt = this.$common._formatDates(item.createAt);
          item.courseStartTime = this.$common._formatDates(
            item.courseStartTime
          );
          item.courseEndTime = this.$common._formatDates(item.courseEndTime);
          return item;
        });
        this.pageConfig.totalCount = res.data.pager.totalRows;
      });
    },
    pageChange(val) {
      console.log(val, "pagechange");
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    async handleEdit(data) {
      this.addStatus = false;
      this.addVisible = true;
      console.log(data, "falsefalsefalsefalsefalse");
      if (data.contentType_text == "Live") {
        //直播编码
        this.addFormOptions[4].hide = false;
      } else {
        this.addFormOptions[4].hide = true;
      }
      // 先获取学习阶段下拉
      await this.productChange(data.productId);
      setTimeout(() => {
        this.$refs.dataForm3.setValue({
          ...data,
          contentType: data.contentType_text,
          time: [new Date(data.courseStartTime), new Date(data.courseEndTime)],
          status: data.status_text,
          stageGroupId: String(data.stageGroupId)
            .split(",")
            .map((item) => Number(item)),
          accountingRules: data.accountingRules_text,
          accountingRules_text: data.accountingRules,
          liveCode: data.liveCode == "无" ? "" : data.liveCode,
        });
      }, 0);
      //某些不可编辑
      this.changeDisableStats(true);
      this.editId = data.id;
      //TODO 编辑
    },
    changeDisableStats(bol) {
      this.addFormOptions[0].disabled = bol;
      this.addFormOptions[1].disabled = bol;
      this.addFormOptions[6].disabled = bol;
      this.addFormOptions[7].disabled = bol;
      this.addFormOptions[3].disabled = bol;
    },
    changeTable(data) {
      this.$fetch("courseProductContent_udpateStatus", {
        status: data.status_text == "Normal" ? "Stop" : "Normal",
        id: data.id,
      }).then((res) => {
        this.$message.success("操作成功");
        this.getTableData();
      });
      // this.tableData[index].buttonVisible = !buttonVisible;
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
