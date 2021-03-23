<template>
  <div class="post-manage">
      <!-- <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form> -->
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
          <template slot="appName">
            <el-select v-model="appName" placeholder="请选择" @change="appNameChange">
              <el-option :label="item.label" :value="item.value" :key="item.value" v-for="item in appNameArr" ></el-option>
            </el-select>
          </template>
          <template slot="productType">
            <el-select v-model="productType" placeholder="请选择">
              <el-option :label="item.label" :value="item.value" :key="item.value" v-for="item in productTypeArr"></el-option>
            </el-select>
          </template>
          <template slot="classImgUrl">
            <Upload-oss
             :objConfig="{module: 'activity', project: 'icon_'}"
              :src.sync="classImgUrl"
            />
          </template>
        </RdForm>
      </rd-dialog>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import UploadOss from "@/components/UploadOss";
export default {
  name:"class-type",
  data(){
    return {
      classImgUrl:"",
      appName:"",
      productType:"",
      appNameArr:[],
      productTypeArr:[],
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
          name: "APP名称",
          value: "appName",
        },
        {
          name: "考药狮项目id",
          value: "productId",
        },
        {
          name: "考药狮项目名称",
          value: "productName",
        },
        {
          name: "班型名称",
          value: "className",
        },
        {
          name: "班型编码",
          value: "classCode",
        },
        {
          name: "班型图片",
          value: "classImgUrl",
        },
        {
          name: "通过率",
          value: "passRate",
        },
        {
          name: "参与计划人数",
          value: "count",
        },
        {
          name: "虚拟参与计划人数",
          value: "virtualCount",
        },
        {
          name: "数据状态",
          value: "status",
        },
         {
          name: "排序",
          value: "orderValue",
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
      addVisible: false,
      addFormOptions: [
          
        {
          prop: "appName",
          element: "el-select",
          placeholder: "请选择",
          label: "APP名称",
          operate: true
        },
        {
          prop: "productType",
          element: "el-select",
          placeholder: "请选择",
          label: "项目名称",
          operate: true
        },
        {
          prop: "className",
          element: "el-input",
          placeholder: "请输入",
          label: "班型名称"
        },
        {
          prop: "classPrice",
          element: "el-input",
          placeholder: "请输入",
          label: "班型价格"
        },
        {
          prop: "classCode",
          element: "el-input",
          placeholder: "请输入",
          label: "班型编码"
        },
        {
          prop: "classImgUrl",
          element: "el-input",
          placeholder: "",
          label: "活动图片url",
          operate: true,
          initValue: 0
        },
         {
          prop: "passRate",
          element: "el-input",
          placeholder: "请输入",
          label: "班型通过率"
        },
         {
          prop: "virtualCount",
          element: "el-input",
          placeholder: "请输入",
          label: "虚拟参加人数"
        },
         {
          prop: "orderValue",
          element: "el-input",
          placeholder: "请输入",
          label: "排序值"
        }
      ],
      addRules:{
        updateReason: [
          { required: true, message: "请输入修改事由", trigger: "blur" },
        ]
      },
      addStatus: true,
      editId:""
    }
  },
  components:{
    RdForm,
    UploadOss
  },
  mounted(){
    this.getTableData();
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
       this.$fetch("auditionclass_listJsp", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        this.tableData = res.data.varList.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          return item;
        });;
        this.pageConfig.totalCount = res.data.page.totalResult;
        this.appNameArr = [
          {
            label:"考药狮",
            value:"KaoYaoShi"
          },
          {
            label:"考医狮",
            value:"KaoYiShi"
          },
          {
            label:"考护狮",
            value:"KaoHuShi"
          },
        ]
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
      // 初始化
      this.addFormOptions.forEach(item => {
          item.initValue = "";
      })
       setTimeout(() => {
          this.$refs.dataForm3.addInitValue();
        }, 0);
      this.appName = "";
      this.productType = "";
      this.classImgUrl = "";
    },
    submitAddForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
          let productObj = this.productTypeArr.find(item => (item.value == this.productType));
            let productTypeName = (productObj && productObj.label) || '';
            this.$fetch(this.addStatus?"auditionclass_save":"auditionclass_editJsp",{
              ...formData,
              appName :this.appName, 
               productType: productTypeName?`${this.productType}/${productTypeName}`: ``,
               classImgUrl: this.classImgUrl,
               id: this.addStatus?"": this.editId
            }).then(res => {
              this.$message.success("操作成功")
              this.getTableData();
              this.addVisible = false;
            })
        }
          
      });
    },
    handleEdit(data){
      this.addStatus = false;
      this.addVisible = true;
      this.addFormOptions.forEach(item => {
          item.initValue = data[item.prop];
      })
       setTimeout(() => {
          this.$refs.dataForm3.addInitValue();
        }, 0);
      this.appName = data.appName_text;
      this.appNameChange(data.appName_text, data.productId)
      this.editId = data.id;
      this.classImgUrl = data.classImgUrl;
    },
    handleDelete(row) {
      let info = '项';
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$fetch("auditionclass_deleteJsp", {
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
    appNameChange(data,val){
      this.productType = "";
      // 获取项目名称下拉
      this.$fetch("auditionitemsubject_getProductName",{
        appName: data
      }).then(res => {
        this.productTypeArr = res.data.map(item => ({
          label: item.typeName,
          value: item.id
        }))
        if(val){
          this.productType = val;
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.post-manage {

}
</style>
