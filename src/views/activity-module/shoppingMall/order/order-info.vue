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
        @pageChange="pageChange"
        :emptyText="emptyText"
      >
        <template slot="name" slot-scope="scope">
            <p>姓名：{{scope.row.name}}</p>
            <p>微信昵称：{{scope.row.nickName}}</p>
            <p>电话号码：{{scope.row.phone}}</p>
            <p>区域：{{scope.row.area}}</p>
            <p>详细地址：{{scope.row.area}}{{scope.row.address}}</p>
        </template>
        <template slot="goodsName" slot-scope="scope">
          <p>商品名称：{{scope.row.goodsName}}</p>
            <p>科目：{{scope.row.subjectName}}</p>
            <p>编码：{{scope.row.code}}</p>
            <p>支付金额：{{scope.row.payPrice}}</p>
            <p>支付时间：{{scope.row.createAt}}</p>
        </template>
        <template slot="staffName" slot-scope="scope">
          <p>润德老师姓名：{{scope.row.staffName}}</p>
            <p>分校：{{scope.row.campusName}}</p>
        </template>
        <template slot="payType" slot-scope="scope">
          <p>支付类型：{{scope.row.payType}}</p>
            <p>订单来源：{{scope.row.orderSource}}</p>
        </template>
        <template slot="expressStatus" slot-scope="scope">
          <template v-if="scope.row.expressStatus == '未快递'">
            <p>快递状态：<span style="color: red">{{scope.row.expressStatus}}</span></p>
          </template>
          <template v-if="scope.row.expressStatus == '已快递' || scope.row.expressStatus == '已签收'">
            <p>快递状态：<span style="color: green">{{scope.row.expressStatus}}</span></p>
            <p>快递单号：{{scope.row.expressNo}}</p>
          </template>
           <template v-if="scope.row.expressStatus == '待发货'">
            <p>快递状态：<span style="color: blue">{{scope.row.expressStatus}}</span></p>
          </template>
        </template>
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
           options: []
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
          options: [],
          filterable: true
        },
        {
          prop: "createAt",
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
          operate: true
        },
        {
          name: "商品信息",
          value: "goodsName",
          operate: true
        },
        {
          name: "老师信息",
          value: "staffName",
          operate: true
        },
        {
          name: "订单状态",
          value: "payType",
          operate: true
        },
        {
          name: "快递信息",
          value: "expressStatus",
          operate: true
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
    this.getSelectList();
  },
   methods: {
     onSearch(val){
       this.searchForm = {
        ...val,
        createAt: val.createAt?val.createAt.join('~'):""
      };
      console.log(val,this.searchForm , 'val---')
      this.getTableData();
     },
     getTableData(params = {}){
       this.$fetch("cmsmobilegoodspaylog_listJsp", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        this.tableData = res.data.varList.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          item.startTime = this.$common._formatDates(item.startTime);
          item.endTime = this.$common._formatDates(item.endTime);
          item.phone = this.$common.hidePhone(item.phone);
          return item;
        });;
        this.pageConfig.totalCount = res.data.page.totalResult;
        this.formOptions[8].options = res.data.staffInfoList.map(item => ({
          label: item.staffName,
          value: item.id
        }))
      })
     },
     getSelectList(){
       this.$fetch("cmsmobilegoodspaylog_getPayTypeList").then(res => {
          this.formOptions[0].options = res.data.map(item => ({
            label: item.value,
            value: item.key
          }))
       })
       this.$fetch("cmsmobilegoodspaylog_getExpressStatus").then(res => {
         this.formOptions[6].options = res.data.map(item => ({
            label: item.value,
            value: item.key
          }))
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
