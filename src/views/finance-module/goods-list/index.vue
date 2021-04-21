<template>
  <div class="goods-list">
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
        :show-header="false"
        :border="false"
        @pageChange="pageChange"
        :emptyText="emptyText"
      >
        <template slot="content" slot-scope="scope">
          <div class="content">
            <div class="content-left">
              <div class="title-container">
                <div class="title">2021高端协议班（面授）</div>
                <div><el-tag>面授班</el-tag></div>
              </div>
              <div class="details">执业药师    |    中药    |    协议班   |    退费    |    2021学年</div>
              <div>
                <div>汕头（广东校区）</div>
                <div>￥999.00</div>
                <div>服务年限2年</div>
              </div>
            </div>
            <div class="content-right">
              <div>￥999.00</div>
              <div><el-button type="primary" size="small">报名</el-button></div>
            </div>
          </div>
        </template>
      </rd-table>
    </div>

  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
export default {
  name:"goods-list",
  data(){
    return {
      formOptions: [
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "状态",
          options: []
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "年份",
          options: []
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "校区",
          options: []
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "项目",
          options: []
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "科目",
          options: []
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "班型",
          options: []
        },
         {
          prop: "menuName",
          element: "el-select",
          placeholder: "班型类型",
          options: []
        },
      ],
      searchForm:{},
      emptyText:"暂无数据",
      tableData: [{}],
      tableKey:[
        {
          name: "内容",
          value: "content",
          operate: true,
        }
      ],
       pageConfig: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
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
      addStatus: true,
      editId:""
    }
  },
  components:{
    RdForm
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
      this.addStatus = true;
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
      this.addFormOptions.forEach(item => {
           item.initValue = data[item.prop];
      })
      setTimeout(() => {
        this.$refs.dataForm3.addInitValue();
      }, 0);
      this.editId = data.id;
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
.goods-list {
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    .content-left {
      .title-container {
        display: flex;
        align-items: center;
        .title {
            font-size: 18px;
            color: #333333;
            font-weight: bold;
        }
      }
      .details {
        line-height: 28px;
      }
    }
  }
}
</style>
