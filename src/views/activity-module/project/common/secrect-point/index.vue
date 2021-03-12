<template>
  <div class="secrect-point">
      <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
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
          <el-button @click="uploadSubject(scope.row)" type="text" size="small" style="color: #ffa500"
            >上传题目</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleDetail(scope.row)" type="text" size="small" style="color: #ffa500"
            >查看题目详情</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handlePreview(scope.row)" type="text" size="small" style="color: #ffa500"
            >预览答案图片</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click="handleDelete(scope.row)"
            type="text"
            size="small"
            style="color: #ec5b56"
            >删除</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click="handleDelete2(scope.row)"
            type="text"
            size="small"
            style="color: #ec5b56"
            >删除题库</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleAnswer(scope.row)" type="text" size="small"
            >考后对答案</el-button
          >
        </template>
      </rd-table>
    </div>
    
    <!-- 添加 -->
    <rd-dialog
        :title="addStatus?'添加':'编辑'"
        :dialogVisible="addVisible"
        width="850px"
        @handleClose="addVisible = false"
        @submitForm="submitAddForm('dataForm3')"
      >
        <RdForm :formOptions="addFormOptions" formLabelWidth="140px" :rules="addRules" ref="dataForm3">
          <template slot="post">
            <el-button size="small" type="primary">上传海报</el-button>
          </template>
        </RdForm>
      </rd-dialog>

      <!-- 上传 -->
      <rd-dialog
        :title="'上传题目'"
        :dialogVisible="uploadVisible"
        @handleClose="uploadVisible = false"
        @submitForm="submitAddForm('dataForm4')"
      >
        <el-button type="primary">点击上传</el-button>
      </rd-dialog>

      <!-- 查看题目详情 -->
      <fullDialog
        v-model="detailVisible"
        title="查看题目详情"
        @change="detailVisible = false"
      >
        <subjectDetail
          ref="subjectDetail"
          :id="detailId"
          @close="detailVisible = false"
          @refresh="refresh"
          v-if="detailVisible"
        />
      </fullDialog>

      <!-- 预览答案图片 -->
      <rd-dialog
        :title="'预览答案图片'"
        :dialogVisible="previewVisible"
        :showFooter="false"
        @handleClose="previewVisible = false"
        @submitForm="submitAddForm('dataForm4')"
      >
        预览答案图片
      </rd-dialog>

      <!-- 考后对答案 -->
      <fullDialog
        v-model="answerVisible"
        title="考后对答案详情"
        @change="answerVisible = false"
      >
        <checkAnswer
          ref="checkAnswer"
          :id="detailId"
          @close="answerVisible = false"
          @refresh="refresh"
          v-if="answerVisible"
        />
      </fullDialog>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import fullDialog from "@/components/FullDialog";
import subjectDetail from './subjectDetail';
import checkAnswer from './checkAnswer';
export default {
  name:"secrect-point",
  data(){
    return {
      formOptions: [
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "活动名称",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "项目名称",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "科目名称",
        }
      ],
      searchForm:{},
      emptyText:"暂无数据",
      tableData:[
         {
          id: 1,
          name: "飞翔的荷兰人3",
          cutdown: 1608897351706,
          visit: 2,
          phone: "15692026183",
        },
      ],
      tableKey: [
        {
          name: "ID主键",
          value: "id",
          fixed: "left",
          width: 80
        },
        {
          name: "活动名称",
          value: "staffName",
        },
        {
          name: "项目名称",
          value: "goodsName",
        },
        {
          name: "科目名称",
          value: "activityName",
        },
        {
          name: "课程名称",
          value: "posterName",
        },
        {
          name: "科目单元",
          value: "posterPic",
        },
        {
          name: "项目科目和课程ID",
          value: "posterCopyFirst",
        },
        {
          name: "科目启动时间",
          value: "posterCopySecond",
        },
        {
          name: "科目结束时间",
          value: "posterCopyThird",
        },
        {
          name: "是否关注",
          value: "posterCopyFourth",
        },
        {
          name: "题库版本号",
          value: "posterCopyFifth",
        },
        {
          name: "总题数",
          value: "createAt",
        },
        {
          name: "压中的题数",
          value: "updateAt",
        },
           {
          name: "视频答案",
          value: "updateAt",
        },
           {
          name: "数据状态",
          value: "updateAt",
        },
           {
          name: "排序",
          value: "updateAt",
        },
           {
          name: "创建时间",
          value: "updateAt",
        },
           {
          name: "更新时间",
          value: "updateAt",
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 330,
          fixed: "right"
        },
      ],
       pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },
      addVisible: false,
      addFormOptions: [
          
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "请选择",
          label: "活动名称",
          options: [
          ]
        },
        {
          prop: "post",
          element: "el-input",
          placeholder: "请输入",
          label: "项目名称"
        },
        {
          prop: "roleName",
          element: "el-select",
          placeholder: "请输入",
          label: "科目名称"
        },
        {
          prop: "roleName",
          element: "el-select",
          placeholder: "请输入",
          label: "课程名称"
        },
        {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择",
          label: "科目单元",
          options: [
          ]
        },
        {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请使用逗号隔开",
          label: "项目科目和课程ID",
        },
         {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "科目启动时间",
          endPlaceholder: "科目结束时间",
          initWidth: true,
          label: "科目起止时间"
        },
         {
           prop: "roleName",
          element: "el-select",
          placeholder: "请选择",
          label: "是否关注公众号",
          options: [
             {
              label:"关注",
              value: "Alreadyattention"
            },
            {
              label:"不关注",
              value: "Notattention"
            }
          ]
        },
         {
           prop: "roleName",
          element: "el-select",
          placeholder: "请选择",
          label: "是否强制分享",
          options: [
             {
              label:"关注",
              value: "Alreadyattention"
            },
            {
              label:"不关注",
              value: "Notattention"
            }
          ]
        },
        {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "总题数"
        },
         {
          prop: "menuName3",
          element: "el-input",
          placeholder: '请按此格式录入["http://qnyimg.kaoyaoshi.net/zhongyaomiyakaodian198186.png","http://qnyimg.kaoyaoshi.net/zhongyaomiyakaodian198187.png"]',
          label: "答案图片",
          type:"textarea",
          rows: 2
        },
        {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "压中的题数"
        },
         {
          prop: "menuName3",
          element: "el-input",
          placeholder: '请按此格式录入["http://qnyimg.kaoyaoshi.net/zhongyaomiyakaodian198186.png","http://qnyimg.kaoyaoshi.net/zhongyaomiyakaodian198187.png"]',
          label: "压中的题目答案图片",
          type:"textarea",
          rows: 2
        },
         {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "视频答案",
          type:"textarea",
          rows: 2
        },
         {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "排序"
        },
      ],
      addRules:{
        updateReason: [
          { required: true, message: "请输入修改事由", trigger: "blur" },
        ]
      },
      addStatus: true,
      uploadVisible: false,
      detailVisible: false,
      previewVisible: false,
      answerVisible: false
    }
  },
  components:{
    RdForm,
    fullDialog,
    subjectDetail,
    checkAnswer
  },
   methods: {
     onSearch(val){
       this.searchForm = {
        ...val
      };
      console.log(val,this.searchForm , 'val---')
      this.getTableData();
     },
     getTableData(){

     },
     pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    handleAdd(){
      this.addVisible = true;
    },
    submitAddForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
        }
          
      });
    },
    handleEdit(data){
      this.addStatus = false;
      this.addVisible = true;
    },
    handleDelete(row) {
      let info = '项';
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$fetch("projectType_delete", {
            typeId: row.typeId,
            loginUserId,
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
    handleDelete2(row) {
      let info = '项';
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$fetch("projectType_delete", {
            typeId: row.typeId,
            loginUserId,
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
    uploadSubject(data){
      this.uploadVisible = true;
    },
    handleDetail(data){
      this.detailVisible = true;
    },
    handlePreview(data){
      this.previewVisible = true;
    },
    handleAnswer(data){
      this.answerVisible = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.secrect-point {

}
</style>
