<template>
  <div class="check-answer">
      <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
    <div class="btn-wrapper">
        <div>
          <el-button type="primary" size="small" @click="handleAdd"
            >添加</el-button
          >
          <el-button type="warning" size="small" @click="handleImport"
            >导入题目</el-button
          >
        </div>
        <el-radio-group v-model="activePoint" size="small" @change="activePointChange">
          <el-radio-button label="Pass">审核通过</el-radio-button>
          <el-radio-button label="Audit">待审核</el-radio-button>
          <el-radio-button label="NoPass">审核不通过</el-radio-button>
        </el-radio-group>
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
        <template slot="content" slot-scope="scope">
          <div v-html="scope.row.content"></div>
        </template>
        <template slot="answer" slot-scope="scope">
          <div v-html="scope.row.answer"></div>
        </template>
        <template slot="custodyAnswer" slot-scope="scope">
          <div v-html="scope.row.custodyAnswer"></div>
        </template>
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
            >下架</el-button
          >
        </template>
      </rd-table>

      <rd-dialog
        :title="addStatus?'添加':'编辑'"
        :dialogVisible="addVisible"
        :top="'4vh'"
        width="1125px"
        @handleClose="addVisible = false"
        @submitForm="submitAddForm('dataForm3')"
        append-to-body
      >
        <RdForm :formOptions="addFormOptions" :rules="addRules" ref="dataForm3" class="add-box">
          <template slot="content">
            <RdEditor placeholder="编辑题目内容" height="400px" module="activity" :quillContent="content" @change="changeEditor" />
        </template>
        <template slot="answer">
            <RdEditor placeholder="编辑题目答案" height="400px" module="activity" :quillContent="answer" @change="changeEditor2" />
        </template>
        <template slot="custodyAnswer">
            <RdEditor placeholder="编辑押题对比" height="400px" module="activity" :quillContent="custodyAnswer" @change="changeEditor3" />
        </template>
        </RdForm>
      </rd-dialog>

      <!-- 导入题目 -->
      <uploadFileDialog 
        :importVisible.sync="uploadVisible" 
        :importData="detailData"
        fileParamName="file"
        append-to-body
        url="practicingexamsite_importItem" 
        @refresh="getTableData"/>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import RdEditor from "@/components/RdEditor";
import uploadFileDialog from './uploadFileDialog';
export default {
  name:"temp",
  data(){
    return {
      uploadVisible: false,
      importId: "",
      formOptions: [
        {
          prop: "serialNum",
          element: "el-input",
          placeholder: "请输入题号",
        }
      ],
      searchForm: {},
      tableData:[
      ],
      tableKey: [
        {
          name: "ID",
          value: "id",
          width: 60
        },
        {
          name: "站点名称",
          value: "siteName",
        },
        {
          name: "题目序号",
          value: "serialNum",
        },
        {
          name: "点赞数量",
          value: "agreeNum",
        },
        {
          name: "点赞基数",
          value: "agreeBase",
        },
         {
          name: "审核状态",
          value: "auditStatus",
        },
        {
          name: "题目内容",
          value: "content",
          operate: true
        },
        {
          name: "题目答案",
          value: "answer",
          operate: true
        },
        {
          name: "押题对比",
          value: "custodyAnswer",
          operate: true
        },
         {
          name: "联系方式",
          value: "",
        },
        {
          name: "奖励金额",
          value: "",
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
          prop: "serialNum",
          element: "el-input",
          placeholder: "请输入题目序号",
          label: "题目序号"
        },
         {
          prop: "agreeBase",
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
        },
          {
          prop: "answer",
          element: "el-input",
          placeholder: "",
          label: "题目答案",
          operate: true
        },
          {
          prop: "custodyAnswer",
          element: "el-input",
          placeholder: "",
          label: "押题对比",
          operate: true
        },
      ],
      addRules:{
        updateReason: [
          { required: true, message: "请输入修改事由", trigger: "blur" },
        ]
      },
      addStatus: true,
      content: "",
      answer: "",
      custodyAnswer: "",
      activePoint: "Pass",
      editId: ""
    }
  },
  components:{
    RdForm,
    RdEditor,
    uploadFileDialog
  },
  props: {
    id: {
      type: Number | String
    },
    detailData: {
      type: Object
    },
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
      this.$fetch("practicingexamsite_custodyListJsp", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
        auditStatus: this.activePoint,
        siteId:this.detailData.id,
        siteName:this.detailData.siteName,
        type:this.detailData.type
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
        this.editId = data.id;
        this.addFormOptions.forEach(item => {
          item.initValue = data[item.prop];
        })
        setTimeout(() => {
          this.$refs.dataForm3.addInitValue();
        }, 0);
        setTimeout(() => {
        this.$refs.dataForm3.$el.scrollTop =0;
      }, 10);
        this.content = data.content;
        console.log(this.content,'this.content---')
        this.answer = data.answer;
        this.custodyAnswer = data.custodyAnswer;
      },
      submitAddForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
          this.$fetch(this.addStatus?"practicingexamsite_custodySave":"practicingexamsite_editCustodyJsp",{
            ...formData,
            content: this.content,
            answer: this.answer,
            custodyAnswer: this.custodyAnswer,
            siteId:this.detailData.id,
            siteName:this.detailData.siteName,
            type:this.detailData.type,
            id: this.addStatus?"": this.editId
          }).then(res => {
            this.$message.success("操作成功")
            this.addVisible = false;
            this.getTableData();
          })
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
      this.addFormOptions.forEach(item => {
          item.initValue = "";
        })
        setTimeout(() => {
          this.$refs.dataForm3.addInitValue();
        }, 0);
      setTimeout(() => {
        this.$refs.dataForm3.$el.scrollTop =0;
      }, 10);
      this.content = "";
      this.answer = "";
      this.custodyAnswer = "";
    },
    changeEditor(val) {
      this.content = val;
    },
    changeEditor2(val) {
      this.answer = val;
    },
    changeEditor3(val) {
      this.custodyAnswer = val;
    },
    activePointChange(val){
      this.pageConfig.currentPage = 1;
      this.pageConfig.showCount = 10;
      this.getTableData({
        auditStatus: val
      })
    },
    handleImport(row){
      this.uploadVisible = true;
      this.importId = row.id;
    }
  }
}
</script>

<style lang="scss" scoped>
.check-answer {
  .btn-wrapper {
    display: flex;
    justify-content: space-between;
  }
  
}
.add-box {
        max-height: 71vh;
        overflow: auto;
  }
</style>
