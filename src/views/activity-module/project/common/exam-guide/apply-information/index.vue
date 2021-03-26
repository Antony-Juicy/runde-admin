<template>
  <div class="information-container">
    <search-form :formOptions="formOptions" :showNum="7" @onSearch="onSearch"></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd">添加</el-button>
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :pageConfig.sync="pageConfig"
        @select="handleSelect"
        @pageChange="pageChange">
          <template slot="edit" slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button @click="handleDelete(scope.row)" type="text" size="small" style="color: #ec5b56">删除</el-button>
          </template>
      </rd-table>
      <rd-dialog
        :title="addStatus?'添加报考信息':'编辑报考信息'"
        :dialogVisible="addVisible"
        @handleClose="addVisible = false"
        @submitForm="submitAddForm('dataForm3')">
        <RdForm :formOptions="addFormOptions" formLabelWidth="120px" :rules="addRules" ref="dataForm3"></RdForm>
      </rd-dialog>
    </div>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
export default {
  name:"apply-information",
  components:{
    RdForm
  },
  data(){
    return {
      formOptions: [
        {
          prop: "productName",
          element: "el-select",
          placeholder: "请选择项目",
          options: []
        },
        {
          prop: "status",
          element: "el-select",
          placeholder: "请选择开放状态",
          options:[
             {
               label: "开放",
               value:"Open"
             },
             {
               label: "未开放",
               value:"Close"
             }
           ]
        }
      ],
      searchForm: {},
      emptyText: "暂无数据",
      fixedTwoRow: true,
      tableData: [
        
      ],
      tableKey: [
        {
          name: "主键id",
          value: "id",
          fixed: "left",
          width: 80
        },
        {
          name: "项目",
          value: "productName1",
        },
        {
          name: "报考信息",
          value: "detail",
        },
        {
          name: "排序",
          value: "orderValue",
          width: 60
        },
        {
          name: "状态",
          value: "status",
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
          operate: true,
          width: 140,
          fixed: "right"
        },
      ],
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },

      loading: false,

      addStatus: true,
      addVisible: false,
      addFormOptions: [
        {
          prop: "productName",
          element: "el-select",
          placeholder: "请选择项目",
          label: "项目",
          options: [
            
          ],
        },
        {
          prop: "detail",
          element: "el-input",
          placeholder: "请输入报考信息",
          label: "报考信息"
        },
        {
          prop: "orderValue",
          element: "el-input",
          placeholder: "请输入排序",
          label: "排序"
        },
        {
          prop: "status",
          element: "el-select",
          placeholder: "请选择状态",
          label: "状态",
          options: [
            {
               label: "已开放",
               value:"Open"
             },
             {
               label: "未开放",
               value:"Close"
             }
          ],
        },
      ],
      addRules: {
        productName: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        detail: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        orderValue: [
          { required: true, message: "请输入", trigger: "blur" },
          { type: 'number', message: '必须为数字值', trigger: 'blur' },
        ],
        status: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
      },
      editId:""
    }
  },
  mounted () {
    this.getTableData()
  },
  methods: {
    onSearch(val){
       this.searchForm = {
        ...val
      };
      this.pageConfig.pageNum = 1;
      this.getTableData();
      console.log(val,this.searchForm , 'val---')
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    getTableData(params = {}) {
      this.$fetch("cmsexamguideinfo_listJsp", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        this.tableData = res.data.varList.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          let obj1 = res.data.productList.find(ele => ele.key == item.productName);
          item.productName1 = obj1&&obj1.value;
          item.provinceType1 = item.provinceType == "province" ? "省份" : "学历";
          return item;
        });

        this.productList = res.data.productList.map(item => ({
          label: item.value,
          value: item.key
        }));
        this.pageConfig.totalCount = res.data.page.totalResult;

        // 给添加弹窗的下拉赋值
        this.addFormOptions[0].options = this.productList;
        // 给搜索栏下拉赋值
        this.formOptions[0].options = this.productList;
        console.log(this.formOptions,'this.formOptions--')


      });
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
        item.initValue = "";
      })
      setTimeout(() => {
        this.$refs.dataForm3.addInitValue();
      }, 0);
    },
    submitAddForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
          this.$fetch(this.addStatus?"cmsexamguideinfo_save":"cmsexamguideinfo_editJsp",{
            ...formData,
            id: this.addStatus?"":this.editId
          }).then(res => {
            this.$message.success("操作成功")
            this.addVisible = false;
            this.getTableData();
          })
          
        }
          
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
    },
    handleDelete(row) {
      let info = '项';
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {

          this.$fetch("cmsexamguideinfo_deleteJsp", {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.information-container {
  
}
</style>
