<template>
  <div class="check-answer">
      <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
    <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd"
          >添加</el-button
        >
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
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click="handleDelete(scope.row)"
            type="text"
            size="small"
            style="color: #ec5b56"
            >删除</el-button
          >
        </template>
      </rd-table>

      <rd-dialog
        :title="addStatus?'添加':'编辑'"
        :dialogVisible="addVisible"
        width="1125px"
        @handleClose="addVisible = false"
        @submitForm="submitAddForm('dataForm3')"
        append-to-body
      >
        <RdForm :formOptions="addFormOptions" :rules="addRules" ref="dataForm3">
          <template slot="content">
            <RdEditor placeholder="编辑题目内容" height="400px" module="activity" @change="changeEditor" />
        </template>
        </RdForm>
      </rd-dialog>

  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import RdEditor from "@/components/RdEditor";
export default {
  name:"temp",
  data(){
    return {
      formOptions: [
        {
          prop: "serialNum",
          element: "el-input",
          placeholder: "请输入题号",
        }
      ],
      searchForm: {},
      tableData:[
        {name: 123}
      ],
      tableKey: [
        {
          name: "ID",
          value: "id",
          width: 60
        },
        {
          name: "考试科目ID",
          value: "examSubjectId",
        },
        {
          name: "题目序号",
          value: "serialNum",
        },
        {
          name: "点赞基数",
          value: "agreeBase",
        },
        {
          name: "课程名称",
          value: "courseName",
        },
        {
          name: "题目内容",
          value: "content",
        },
        {
          name: "题目答案",
          value: "answer",
        },
        {
          name: "押题对比",
          value: "custodyAnswer",
        },
        {
          name: "创建时间",
          value: "createAt",
        },
        {
          name: "更新时间",
          value: "updateAt",
        },
        {
          name: "操作",
          value: "edit",
          operate: true
        }
      ],
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },
      emptyText:"暂无数据",
      addVisible: false,
      addFormOptions:[
        {
          prop: "roleName",
          element: "el-input",
          placeholder: "请输入题目序号",
          label: "题目序号"
        },
         {
          prop: "roleName",
          element: "el-input",
          placeholder: "请输入点赞基数",
          label: "点赞基数"
        },
          {
          prop: "content",
          element: "el-input",
          placeholder: "",
          label: "题目内容",
          operate: true
        }
      ],
      addRules:{
        updateReason: [
          { required: true, message: "请输入修改事由", trigger: "blur" },
        ]
      },
      addStatus: true,
      liveDetail: ""
    }
  },
  components:{
    RdForm,
    RdEditor
  },
  props: {
    id: {
      type: Number | String
    }
  },
  mounted(){
    this.getTableData();
  },
   methods: {
      onSearch(val) {
        this.searchForm = {
          ...val
        };
        this.getTableData();
      },
      pageChange(val) {
        console.log(val,'pagechange')
        this.pageConfig.currentPage = val.page;
        this.pageConfig.showCount = val.limit;
        this.getTableData();
      },
      getTableData(params = {}) {
      this.$fetch("practicingExamSiteItem_list", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
        examSubjectId: this.id
      }).then((res) => {
        this.tableData = res.data.varList.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          return item;
        });

      });
    },
      handleEdit(data){
        this.addStatus = false;
        this.addVisible = true;
      },
      submitAddForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
        }
          
      });
    },
    handleDelete(row) {
      let info = '题目';
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$fetch("practicingExamSiteItem_delete", {
            id: row.id
          }).then((res) => {
            if (res) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              setTimeout(() => {
                this.getTableData();
              }, 50);
            }
          });
        })
        .catch(() => {});
    },
    handleAdd(){
      this.addStatus = true;
      this.addVisible = true;
    },
    changeEditor(val) {
      this.liveDetail = val;
    },
  }
}
</script>

<style lang="scss" scoped>
.check-answer {

}
</style>
