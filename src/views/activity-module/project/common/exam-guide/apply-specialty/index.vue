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
        <RdForm :formOptions="addFormOptions" formLabelWidth="140px" :rules="addRules" ref="dataForm3">
          <template slot="productName">
            <el-select v-model="productName" placeholder="请选择" @change="productNameChange">
              <el-option
                v-for="item in productNameArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
          <template slot="parentId">
            <el-select v-model="parentId" placeholder="请选择" @change="parentIdChange">
              <el-option
                v-for="item in parentIdArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
          <template slot="twoParentId">
            <el-select v-model="twoParentId" placeholder="请选择">
              <el-option
                v-for="item in twoParentIdArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </RdForm>
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
          operate: true,
          // options: [{
          //   lable: 1,
          //   value:"1"
          // }],
          initValue: "1"
        },
        {
          prop: "parentId",
          element: "el-select",
          placeholder: "请选择",
          label: "一级分类",
           operate: true,
        },
        {
          prop: "twoParentId",
          element: "el-select",
          placeholder: "请选择",
          label: "二级分类",
           operate: true,
        },
        {
          prop: "professionName",
          element: "el-input",
          placeholder: "请输入专业名称",
          label: "专业名称"
        },
        {
          prop: "needWorkYear",
          element: "el-select",
          placeholder: "请选择",
          label: "工作年限",
          options: [
            {
              label: "1",
              value: 1,
            },
            {
              label: "2",
              value: 2,
            },
            {
              label: "3",
              value: 3,
            },
            {
              label: "4",
              value: 4,
            },
            {
              label: "5",
              value: 5,
            },
            {
              label: "6",
              value: 6,
            },
            {
              label: "7",
              value: 7,
            },
            {
              label: "8",
              value: 8,
            }
          ],
        },
        {
          prop: "zlysStatus",
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
          prop: "zyysStatus",
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
          prop: "orderValue",
          element: "el-input-number",
          placeholder: "请输入排序",
          label: "排序"
        },
        {
          prop: "status",
          element: "el-select",
          placeholder: "请选择",
          label: "开放状态",
          options: [
            {
              label: "开放",
              value: "Open",
            },
            {
              label: "未开放",
              value: "Close",
            }
          ],
        },
      ],
      addRules: {
        productName: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        professionName: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        orderValue: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
      },
      editId:"",
      // 新增编辑弹窗的下拉
      productName:"",
      productNameArr:[],
      parentId:"",
      parentIdArr: [],
      twoParentId:"",
      twoParentIdArr: []
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
          let obj1 = res.data.productList.find(ele => ele.key == item.productName);
          item.productName1 = obj1&&obj1.value;
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
        this.productNameArr = this.productList;
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
      this.resetForm();
    },
    submitAddForm(formName){
      if(!this.productName){
        this.$message.error("请选择项目")
        return
      }
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
          this.$fetch(this.addStatus?"cmsexamprofession_save":"cmsexamprofession_editJsp",{
            ...formData,
            id: this.addStatus?"":this.editId,
            productName: this.productName,
            parentId: this.parentId,
            twoParentId: this.twoParentId,
            parentName: this.parentIdArr.find(item => (item.value == this.parentId)).label,
            twoParentIdName: this.twoParentIdArr.find(item => (item.value == this.twoParentId)).label,
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
      this.$fetch("cmsexamprofession_goEdit",{
        id: data.id
      }).then(res => {
        this.addFormOptions.forEach(item => {
          item.initValue = res.data.pd[item.prop];
        })
        setTimeout(() => {
          this.$refs.dataForm3.addInitValue();
        }, 0);
        this.productName = data.productName;
        this.productNameChange(this.productName,res.data.oneParentId);
        this.parentIdChange(res.data.oneParentId,res.data.twoParentId);
      })
      
      
      
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
    },
    productNameChange(data,val){
      this.$fetch("cmsexamprofession_getOneLinkage",{
        productName: data
      }).then(res => {
        this.parentIdArr = res.data.list?res.data.list.map(item => ({
          label: item.professionName,
          value: item.id
        })):[]
        if(val) {
          this.parentId = val;
          console.log(this.parentId,'this.parentId---')
        }
      })
    },
    parentIdChange(data,val){
      this.$fetch("cmsexamprofession_linkage",{
        productName: this.productName,
        parentId: data
      }).then(res => {
        console.log(res.data,'res.data--')
        this.twoParentIdArr = res.data.list?res.data.list.map(item => ({
          label: item.professionName,
          value: item.id
        })):[]
        if(val){
          this.twoParentId = val;
          console.log(this.twoParentId,'this.twoParentId---')
        }
      })
    },
    resetForm(){
      this.productName = "";
      this.parentId = "";
      this.twoParentId = "";
      this.parentIdArr = [];
      this.twoParentIdArr = [];
      this.addFormOptions.forEach(item => {
        item.initValue = "";
      })
      this.addFormOptions[0].initValue = 0;
      setTimeout(() => {
        this.$refs.dataForm3.addInitValue();
      }, 0);
    }
  }
}
</script>

<style lang="scss" scoped>
.specialty-container {
  
}
</style>
