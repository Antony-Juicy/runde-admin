<template>
  <div class="specialty-container">
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
        :title="addStatus?'添加报考专业':'编辑报考专业'"
        :dialogVisible="addVisible"
        @handleClose="addVisible = false"
        @submitForm="submitAddForm('dataForm3')">
        <RdForm :formOptions="addFormOptions" formLabelWidth="140px" :rules="addRules" ref="dataForm3"></RdForm>
      </rd-dialog>
    </div>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
export default {
  name:"apply-specialty",
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
          prop: "professionName",
          element: "el-input",
          placeholder: "请输入专业名称",
        },
        {
          prop: "level",
          element: "el-select",
          placeholder: "级别",
          options: [
            {
              label: "1",
              value: "1"
            },
            {
              label: "2",
              value: "2"
            },
            {
              label: "3",
              value: "3"
            },
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
          fixed:"left",
          width: 80
        },
        {
          name: "项目",
          value: "productName1",
        },
        {
          name: "父id",
          value: "parentId",
          width: 80
        },
        {
          name: "上级名称",
          value: "parentName",
        },
        {
          name: "专业名称",
          value: "professionName",
        },
        {
          name: "报考所需年限",
          value: "needWorkYear",
        },
        {
          name: "级别",
          value: "level",
          width: 80
        },
        {
          name: "排序",
          value: "orderValue",
          width: 80
        },
        {
          name: "是否能报考助理医师",
          value: "zlysStatus1",
        },
        {
          name: "是否能报考执业医师",
          value: "zyysStatus1",
        },
        {
          name: "创建时间",
          value: "createAt",
        },
        {
          name: "更新时间",
          value: "createAt",
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
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择",
          label: "一级分类"
        },
        {
          prop: "menuName3",
          element: "el-select",
          placeholder: "请选择",
          label: "二级分类"
        },
        {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入专业名称",
          label: "专业名称"
        },
        {
          prop: "menuName3",
          element: "el-select",
          placeholder: "请选择",
          label: "工作年限",
          options: [
            {
              label: "1",
              value: 0,
            },
            {
              label: "2",
              value: 1,
            },
            {
              label: "3",
              value: 2,
            },
            {
              label: "4",
              value: 3,
            },
            {
              label: "5",
              value: 4,
            },
            {
              label: "6",
              value: 5,
            },
            {
              label: "7",
              value: 6,
            },
            {
              label: "8",
              value: 7,
            }
          ],
        },
        {
          prop: "menuName3",
          element: "el-select",
          placeholder: "请选择",
          label: "是否能报助理医师",
          options: [
            {
              label: "是",
              value: 0,
            },
            {
              label: "否",
              value: 1,
            }
          ],
        },
        {
          prop: "menuName3",
          element: "el-select",
          placeholder: "请选择",
          label: "是否能报执业医师",
          options: [
            {
              label: "是",
              value: 0,
            },
            {
              label: "否",
              value: 1,
            }
          ],
        },
        {
          prop: "menuName3",
          element: "el-input-number",
          placeholder: "请输入排序",
          label: "排序"
        },
        {
          prop: "menuName3",
          element: "el-select",
          placeholder: "请选择",
          label: "开放状态",
          options: [
            {
              label: "已开放",
              value: 0,
            },
            {
              label: "未开放",
              value: 1,
            }
          ],
        },
      ],
      addRules: {},
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
      this.$fetch("cmsexamprofession_listJsp", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        this.tableData = res.data.varList.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          item.productName1 = res.data.productList.find(ele => ele.key == item.productName).value;
          item.zlysStatus1 = item.zlysStatus == 0 ? "是" :  (item.zlysStatus == 1 ?"否": "")
          item.zyysStatus1 = item.zyysStatus == 0 ? "是" :  (item.zyysStatus == 1 ?"否": "")
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
          this.$fetch(this.addStatus?"cmsexamprofession_save":"cmsexamprofession_editJsp",{
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
          this.$fetch("cmsexamprofession_deleteJsp", {
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
.specialty-container {
  
}
</style>
