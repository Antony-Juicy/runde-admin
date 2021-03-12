<template>
  <div class="look-picture">
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
        fixedTwoRow
        @pageChange="pageChange"
        :emptyText="emptyText"
      >
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleUpload(scope.row)" type="text" size="small" style="color: #ffa500"
            >上传题目</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleDetail(scope.row)" type="text" size="small" style="color: #ffa500"
            >查看题目详情</el-button
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

      <!-- 上传 -->
      <rd-dialog
        :title="'上传题目'"
        :dialogVisible="importVisible"
        @handleClose="importVisible = false"
        @submitForm="submitImportForm()"
      >
        <el-upload
            class="upload-demo"
            action="#"
            :before-remove="beforeRemove"
            :limit="1"
            :on-exceed="handleExceed"
            :on-change="handleChange"
            :file-list="fileList"
            :before-upload="beforeAvatarUpload"
            :auto-upload="false"
            accept=".xls, .xlsx"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
      </rd-dialog>

      <!-- 题目详情 -->
      <el-drawer
          :visible.sync="detailVisible"
          title="题目详情"
          size="50%"
        >
          <subjectDetail
            ref="subjectDetail"
            @close="detailVisible = false"
            :id="drawerId"
          />
      </el-drawer>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import Fetch from '@/utils/fetch';
import subjectDetail from "@/views/activity-module/project/common/audition-link/audition-subject/subjectDetail";
import chanceSelect from '@/utils/chance-select'
export default {
  name:"look-picture",
  data(){
    return {
      importFile:"",
      fileList:[],
      importVisible: false,
      formOptions: [
        {
          prop: "oneProductType",
          element: "el-select",
          placeholder: "一级项目类型",
          options: [
          ]
        },
        {
          prop: "productType",
          element: "el-select",
          placeholder: "二级项目类型",
          options: [
          ]
        },
        {
          prop: "medicineType",
          element: "el-select",
          placeholder: "中西药",
          options: [
            {
              label:"中药",
              value:"Chinese"
            },
            {
              label:"西药",
              value:"Western"
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
          name: "ID主键",
          value: "id",
          fixed: "left",
          width: 80
        },
        {
          name: "一级项目",
          value: "oneProductTypeId",
        },
        {
          name: "二级项目",
          value: "productTypeId",
        },
        {
          name: "中西药",
          value: "medicineTypeId",
        },
        {
          name: "题目描述",
          value: "descript",
        },
        {
          name: "数据状态",
          value: "status",
        },
        {
          name: "排序",
          value: "orderValue",
          width: 80
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
          width: 160,
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
          prop: "oneProductType",
          element: "el-select",
          placeholder: "请选择",
          label: "一级项目类型",
          options: [
          ],
        },
        {
          prop: "productType",
          element: "el-select",
          placeholder: "请选择",
          label: "二级项目类型",
          options: [
          ],
        },
         {
          prop: "medicineType",
          element: "el-select",
          placeholder: "请选择",
          label: "中西药",
          options: [
            {
              label:"中药",
              value:"Chinese"
            },
            {
              label:"西药",
              value:"Western"
            }
          ],
        },
        {
          prop: "descript",
          element: "el-input",
          placeholder: "请输入",
          label: "题目描述",
          type:"textarea",
          rows: 1
        },
         {
          prop: "orderValue",
          element: "el-input-number",
          placeholder: "请输入",
          label: "排序"
        }
      ],
      addRules:{
        oneProductType: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        productType: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        medicineType: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        descript: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        orderValue: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
      },
      addStatus: true,
      detailVisible: false,
      editId:"",
      drawerId:""
    }
  },
  components:{
    RdForm,
    subjectDetail
  },
  mounted(){
    this.getTableData();
    this.getSelectList();
  },
   methods: {
     async getSelectList(){
       const res1 = await this.$fetch("lookpicture_getProductTypeList");
       const res2 = await this.$fetch("lookpicture_getProductList");
       this.formOptions[0].options = res1.data.map(item => ({
         label: item.value,
         value: item.key
       }))
       this.formOptions[1].options = res2.data.map(item => ({
         label: item.value,
         value: item.key
       }))
       this.addFormOptions[0].options = res1.data.map(item => ({
         label: item.value,
         value: item.key
       }))
       this.addFormOptions[1].options = res2.data.map(item => ({
         label: item.value,
         value: item.key
       }))
     },
     onSearch(val){
       this.searchForm = {
        ...val
      };
      console.log(val,this.searchForm , 'val---')
      this.getTableData();
     },
     getTableData(params = {}){
       this.$fetch("lookpicture_list", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        this.tableData = res.data.varList.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          let obj1 = res.data.productType.find(ele => (ele.key == item.oneProductType));
          let obj2 = res.data.ProductList.find(ele => (ele.key == item.productType));
          item.oneProductTypeId = obj1 && obj1.value;
          item.productTypeId = obj2 && obj2.value;
          item.medicineTypeId = item.medicineType == "Western" ? "西药" : "中药";
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
      this.addFormOptions.forEach(item => {
        item.initValue = "";
      })
      setTimeout(() => {
        this.$refs.dataForm3.addInitValue();
      }, 0);
      this.addVisible = true;
    },
    submitAddForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
          if(this.addStatus){
            // 新增
            this.$fetch("lookpicture_add",formData).then(res => {
              this.$message.success("操作成功")
              this.addVisible = false;
              this.getTableData();
            })
          }else {
            // 编辑
            this.$fetch("lookpicture_edit",{
              ...formData,
              id: this.editId
            }).then(res => {
              this.$message.success("操作成功")
              this.addVisible = false;
              this.getTableData();
            })
          }
          
        }
          
      });
    },
    handleEdit(data){
      this.addStatus = false;
      this.addFormOptions.forEach(item => {
        item.initValue = data[item.prop];
      })
      setTimeout(() => {
        this.$refs.dataForm3.addInitValue();
      }, 0);
      this.addVisible = true;
      this.editId = data.id;
    },
    handleDelete(row) {
      let info = '项';
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$fetch("lookpicture_delete", {
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
    handleDetail(data){
      this.detailVisible = true;
      this.drawerId = data.id;
    },
    submitImportForm(){
      if(!this.importFile){
            this.$message.warning("请上传文件");
            return;
          }
          let obj = new FormData();
          obj.append("excel", this.importFile);
          obj.append("id", 14);
          this.$fetch("lookpicture_import", obj).then((res) => {
            if(res.code == 200){
              this.$message.success("操作成功")
              this.getTableData();
              this.importVisible = false;
            }
          });
    },
    handleUpload(){
      this.importVisible = true;
    },
    // 上传文件
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleChange(file, fileList) {
      this.importFile = file.raw;
    },
     // 导入上传之前的文件格式校验
    beforeAvatarUpload(file) {
      console.log(file)
      let testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
      const extension = testmsg === 'xls'
      const extension2 = testmsg === 'xlsx'
      // const isLt2M = file.size / 1024 / 1024 < 10
      if(!extension && !extension2) {
          this.$message({
              message: '上传文件只能是 xls、xlsx格式!',
              type: 'warning'
          });
      }
      // if(!isLt2M) {
      //     this.$message({
      //         message: '上传文件大小不能超过 10MB!',
      //         type: 'warning'
      //     });
      // }
      // return extension || extension2 && isLt2M
      return extension || extension2
    },
    downloadTemp(){
      window.location.href = "/temp/kanyaoshitu.xlsx"
    }
  }
}
</script>

<style lang="scss" scoped>
.look-picture {

}
</style>
