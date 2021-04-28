<template>
  <div class="subject-manage">
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
    <!--添加彈窗-->
    <rd-dialog
      :title="addStatus ? '添加科目' : '编辑科目'"
      :dialogVisible="editVisible"
      :width="'700px'"
      :showFooter="false"
      top="5vh"
      append-to-body
      @handleClose="editVisible = false"
      @submitForm="submitAddForm('dataForm3')"
    >
      <editSubject :id="id" :issuseId="issuseId" v-if="editVisible" @close="editVisible = false" @refresh="refresh"/>
    </rd-dialog>

  </div>
</template>

<script>
  import RdForm from "@/components/RdForm";
  import editSubject from './editSubject';
  export default {
    name: "project-manage",
    components: {
      RdForm,
      editSubject
    },
    props:{
      id: {
        type: Number || String,
        default:1
      }
    },
    data() {
      return {
        startDateDisabled: {},
        editVisible: false,
        issuseId:"",
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
          { name: "id", value: "issuseId" },
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
      refresh(){
        this.getTableData();
      },
   
   
      handleEdit(data) {
        //TODO
        console.log(77555);
        this.addStatus = false;
        this.editVisible = true;
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
        //TODO
        this.$refs[formName].validate((valid, formData) => {
          if (valid) {
            console.log(formData, "添加");
     
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
        this.editVisible = true;
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
