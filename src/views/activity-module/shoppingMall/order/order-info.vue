<template>
  <div class="post-manage">
      <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
      <!-- <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd"
          >添加</el-button
        >
      </div> -->
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig.sync="pageConfig"
        :tbodyHeight="600"
        fixedTwoRow
        @pageChange="pageChange"
        :emptyText="emptyText"
      >
      </rd-table>
    </div>
    
  </div>
</template>

<script>
export default {
  name:"post-manage",
  data(){
    return {
      formOptions: [
        {
          prop: "payType",
          element: "el-select",
          placeholder: "支付类型",
          options: []
        },
        {
          prop: "code",
          element: "el-input",
          placeholder: "活动编码",
        },
        {
          prop: "phone",
          element: "el-input",
          placeholder: "电话号码",
        },
        {
          prop: "goodsName",
          element: "el-input",
          placeholder: "商品名称",
        },
        {
          prop: "name",
          element: "el-input",
          placeholder: "学员名称",
        },
        {
          prop: "nickName",
          element: "el-input",
          placeholder: "微信昵称",
        },
        {
          prop: "expressStatus",
          element: "el-select",
          placeholder: "快递状态",
        },
        {
          prop: "area",
          element: "el-input",
          placeholder: "地址区域",
        },
         {
          prop: "staffId",
          element: "el-select",
          placeholder: "老师名称",
          options: []
        },
        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "支付时间(开始)",
          endPlaceholder: "支付时间(结束)",
          initWidth: true,
        },
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
          name: "学员信息",
          value: "name",
        },
        {
          name: "商品信息",
          value: "goodsName",
        },
        {
          name: "老师信息",
          value: "staffName",
        },
        {
          name: "订单状态",
          value: "payType",
        },
        {
          name: "快递信息",
          value: "expressStatus",
        }
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
          element: "el-input",
          placeholder: "请输入名称",
          label: "名称"
        },
        {
          prop: "post",
          element: "el-input",
          placeholder: "",
          label: "上传",
          operate: true,
          initValue: 0
        },
        {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择",
          label: "所属九块九包邮",
          options: [
            {
              label: "博士",
              value: "0",
            },
            {
              label: "硕士",
              value: 1,
            },
          ],
        },
        {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择",
          label: "所属活动",
          options: [
            {
              label: "博士",
              value: "0",
            },
            {
              label: "硕士",
              value: 1,
            },
          ],
        },
        {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "分享分案一",
          type:"textarea",
          rows: 2
        },
         {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "分享分案二",
          type:"textarea",
          rows: 2
        },
         {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "分享分案三",
          type:"textarea",
          rows: 2
        },
         {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "分享分案四",
          type:"textarea",
          rows: 2
        },
           {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "分享分案五",
          type:"textarea",
          rows: 2
        }
      ],
      addRules:{
        updateReason: [
          { required: true, message: "请输入修改事由", trigger: "blur" },
        ]
      },
      addStatus: true
    }
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
       this.$fetch("cmsactivityinfo_listJsp", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        this.tableData = res.data.varList.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          item.startTime = this.$common._formatDates(item.startTime);
          item.endTime = this.$common._formatDates(item.endTime);
          
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
      let info = '';
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
    }
  }
}
</script>

<style lang="scss" scoped>
.post-manage {

}
</style>
