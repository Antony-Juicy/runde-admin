<template>
  <div class="physician-act">
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
        <el-radio-group v-model="activePoint" size="small" @change="activePointChange">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button label="one">一期站点</el-radio-button>
          <el-radio-button label="two">二期站点</el-radio-button>
        </el-radio-group>
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig.sync="pageConfig"
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
           <el-divider direction="vertical"></el-divider>
           <el-button @click="handleEdit(scope.row)" type="text" size="small"  style="color: #ffa500"
            >考前大爆料</el-button
          >
          <el-divider direction="vertical"></el-divider>
           <el-button @click="handleDetail(scope.row)" type="text" size="small"
            >考后对答案</el-button
          >
        </template>
      </rd-table>
    </div>
    
    <!-- 添加 -->
    <rd-dialog
        :title="addStatus?'添加':'编辑'"
        :dialogVisible="addVisible"
        @handleClose="addVisible = false"
        @submitForm="submitAddForm('dataForm3')"
      >
        <RdForm :formOptions="addFormOptions" formLabelWidth="120px" :rules="addRules" ref="dataForm3">
          <template slot="post">
            <el-button size="small" type="primary">上传</el-button>
          </template>
        </RdForm>
      </rd-dialog>

       <fullDialog
        v-model="answerVisible"
        title="考后对答案详情"
        @change="answerVisible = false"
      >
        <checkAnswer
          ref="checkAnswer"
          :id="detailId"
          :detailData="detailData"
          @close="answerVisible = false"
          @refresh="getTableData"
          v-if="answerVisible"
        />
      </fullDialog>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import checkAnswer from './checkAnswer';
import fullDialog from "@/components/FullDialog";
export default {
  name:"physician-act",
  data(){
    return {
      answerVisible: false,
      detailId:"",
      formOptions: [
        {
          prop: "siteName",
          element: "el-input",
          placeholder: "站点名称",
        },
        {
          prop: "focusStatus",
          element: "el-select",
          placeholder: "是否关注",
          options:[
            {
              label:"关注",
              value: "Alreadyattention"
            },
            {
              label:"不关注",
              value: "Notattention"
            }
          ]        
        }
      ],
      searchForm:{},
      emptyText:"暂无数据",
      tableData:[
      ],
      tableKey: [
        {
          name: "项目名称",
          value: "productName",
          fixed: "left",
          width: 80
        },
        {
          name: "科目名称",
          value: "subjectName",
        },
        {
          name: "站点名称",
          value: "siteName",
        },
        {
          name: "站点别名",
          value: "siteNick",
        },
        {
          name: "是否关注",
          value: "focusStatus",
        },
        {
          name: "状态",
          value: "status",
        },
        {
          name: "初始人数",
          value: "baseNum",
        },
        {
          name: "考前参与人数",
          value: "participantsNum",
        },
        {
          name: "考后参与人数",
          value: "participantsAfterNum",
        },
        {
          name: "押中题数",
          value: "custodyNum",
        },
        {
          name: "考后更新题数",
          value: "examAfterNum",
        },
        {
          name: "考前总题数",
          value: "totalExercisesNum",
        },
        {
          name: "排序",
          value: "orderValue",
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
          width: 200,
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
          prop: "productName",
          element: "el-input",
          placeholder: "请输入",
          label: "项目名称",
          readonly: true,
          initValue:"执业药师"
        },
        {
          prop: "subjectName",
          element: "el-select",
          placeholder: "请选择",
          label: "科目名称",
          options: [
          ],
        },
        {
          prop: "type",
          element: "el-select",
          placeholder: "请选择",
          label: "活动期数",
          options: [
            {
              label:"一期",
              value:"one"
            },
            {
              label:"二期",
              value:"two"
            },
          ],
        },
        {
          prop: "siteName",
          element: "el-input",
          placeholder: "请输入",
          label: "站点名称",
        },
        {
          prop: "siteNick",
          element: "el-input",
          placeholder: "输入格式：第XX站点",
          label: "站点别名",
        },
        {
          prop: "focusStatus",
          element: "el-select",
          placeholder: "请选择",
          label: "是否关注公众号",
          options: [
            {
              label:"关注",
              value:"Alreadyattention"
            },
            {
              label:"不关注",
              value:"Notattention"
            },
          ],
        },
        {
          prop: "status",
          element: "el-select",
          placeholder: "请选择",
          label: "是否上架",
          options: [
            {
              label: "上架",
              value:"YES"
            },
            {
              label: "下架",
              value:"NO"
            },
          ],
        },
        {
          prop: "baseNum",
          element: "el-input",
          placeholder: "请输入",
          label: "初始人数",
        },
        {
          prop: "totalExercisesNum",
          element: "el-input",
          placeholder: "请输入",
          label: "考前题目数量",
        },
        {
          prop: "examAfterNum",
          element: "el-input",
          placeholder: "请输入",
          label: "考后题目更新数量",
        },
        {
          prop: "orderValue",
          element: "el-input",
          placeholder: "请输入",
          label: "排序",
        },
        
      ],
      addRules:{
        productName: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        subjectName: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        siteName: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        siteNick: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        focusStatus: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        status: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        examAfterNum: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
      },
      addStatus: true,
      activePoint: "",
      editId:"",
      detailData:{},
      productId:""
    }
  },
  components:{
    RdForm,
    checkAnswer,
    fullDialog
  },
  mounted(){
    this.getTableData();

    this.$fetch("practicingexamsite_goAdd").then(res => {
        this.productId = res.data.productId;
        this.addFormOptions[1].options = res.data.subjectNameArr.map(item => ({
          label: item,
          value: item
        }))
      })
  },
   methods: {
     onSearch(val){
       this.searchForm = {
        ...val
      };
      console.log(val,this.searchForm , 'val---')
      this.getTableData();
     },
     getTableData(params = {}){
       this.$fetch("practicingexamsite_listJsp", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        this.tableData = res.data.varList.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          item.status = item.status == "YES" ? "上架" : "下架"
          return item;
        });;
        this.pageConfig.totalCount = res.data.page.totalResult;
      })
     },
     pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    handleAdd(){
      this.addStatus = true;
      this.addVisible = true;
      this.addFormOptions.forEach(item => {
        if(item.prop != "productName"){
          item.initValue = "";
        }
      })
      setTimeout(() => {
        this.$refs.dataForm3.addInitValue();
      }, 0);
    },
    submitAddForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
          this.$fetch(this.addStatus?"practicingexamsite_save":"practicingexamsite_editJsp",{
            ...formData,
            id: this.addStatus?"":this.editId,
            productId: this.productId
          }).then(res => {
            this.$message.success("操作成功")
            this.getTableData()
            this.addVisible = false;
          })
        }
          
      });
    },
    handleEdit(data){
      this.addStatus = false;
      this.addVisible = true;
      this.editId = data.id;
      this.$fetch("practicingexamsite_goEdit",{
        id: data.id
      }).then(res => {
        this.addFormOptions.forEach(item => {
          item.initValue = res.data.pd[item.prop];
        })
        setTimeout(() => {
          this.$refs.dataForm3.addInitValue();
        }, 0);
      })
      
    },
    handleDelete(row) {
      let info = '项';
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$fetch("practicingexamsite_deleteJsp", {
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
    activePointChange(val){
      this.pageConfig.currentPage = 1;
      this.pageConfig.showCount = 10;
      this.getTableData({
        type: val
      })
    },
    handleDetail(data){
      this.detailId = data.id;
      this.answerVisible = true;
      this.detailData = data;
    }
  }
}
</script>

<style lang="scss" scoped>
.physician-act {
  .btn-wrapper {
    display: flex;
    justify-content: space-between;
  }
}
</style>
