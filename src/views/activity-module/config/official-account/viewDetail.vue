<template>
  <div class="post-manage">
      <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd"
          >推送消息</el-button
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
        <template slot="wechatId" slot-scope="scope">
          公众号ID：{{scope.row.wechatId}}<br>
          公众号appId：{{scope.row.appId}}<br>
          公众号secretkey：{{scope.row.secretKey}}<br>
        </template>
        <template slot="fromUserName" slot-scope="scope">
          用户openId：{{scope.row.fromUserName}}<br>
          用户昵称：{{scope.row.nickName}}<br>
          性别：{{scope.row.sex}}<br>
          省/市/区：{{scope.row.province}}{{scope.row.city}}{{scope.row.country}}<br>
        </template>
        <template slot="headimgurl" slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.headimgurl"
            fit="cover"
          >
           </el-image>
        </template>
        <template slot="orderSource" slot-scope="scope">
           老师来源：{{scope.row.orderSource}}<br>
           <template v-if="scope.row.orderSource == '润德老师'">
              老师姓名：{{scope.row.staffName}}<br>
              电话号码：{{scope.row.staffPhone}}<br>
              校区名称：{{scope.row.campusName}}<br>
           </template>
           <template v-if="scope.row.orderSource == '加盟商'">
              老师姓名：{{scope.row.allyName}}<br>
           </template>
        </template>
        <template slot="event" slot-scope="scope">
          <template v-if="scope.row.event == 'subscribe'">
              <span style="color: green">关注事件</span>
           </template>
           <template v-if="scope.row.event == 'unsubscribe'">
              <span style="color: red">取消关注事件</span>
           </template>
           <template v-if="scope.row.event == 'SCAN'">
              <span style="color: purple">扫描事件</span>
           </template>
        </template>
        <template slot="msgType" slot-scope="scope">
          消息类别：{{scope.row.msgType}}<br>
          场景值信息：{{scope.row.eventKey}}<br>
          回调信息：{{scope.row.callBackResult}}<br>
        </template>
        <template slot="cmsCode" slot-scope="scope">
          九块九活动code：{{scope.row.cmsCode}}<br>
          营销活动activityId：{{scope.row.activityId}}<br>
        </template>
        <template slot="edit" slot-scope="scope">
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
        :title="'推送消息'"
        :dialogVisible="addVisible"
        appendToBody
        @handleClose="addVisible = false"
        @submitForm="submitAddForm('dataForm3')"
      >
        <RdForm :formOptions="addFormOptions" formLabelWidth="120px" :rules="addRules" ref="dataForm3">
          <template slot="post">
            <el-button size="small" type="primary">上传</el-button>
          </template>
        </RdForm>
      </rd-dialog>

  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
export default {
  name:"post-manage",
  data(){
    return {
      formOptions: [
        {
          prop: "bindType",
          element: "el-select",
          placeholder: "绑定类型",
          options: []
        },
        {
          prop: "event",
          element: "el-select",
          placeholder: "事件类型",
          options: [
            {
              label: "关注事件",
              value: "subscribe"
            },
            {
              label: "取消关注",
              value: "unsubscribe"
            },
            {
              label: "扫描事件",
              value: "SCAN"
            },
          ]
        },
        {
          prop: "cmsCode",
          element: "el-select",
          placeholder: "cms类型",
          options: []
        },
        {
          prop: "activityId",
          element: "el-select",
          placeholder: "营销类型",
          options: [],
          filterable: true
        },
        {
          prop: "orderSource",
          element: "el-select",
          placeholder: "员工类型",
          options: []
        },
        {
          prop: "allyName",
          element: "el-input",
          placeholder: "加盟商老师",
        },
        {
          prop: "staffName",
          element: "el-input",
          placeholder: "润德老师",
        },
      ],
      searchForm:{},
      emptyText:"暂无数据",
      tableData:[
        //  {
        //   id: 1,
        //   name: "飞翔的荷兰人3",
        //   cutdown: 1608897351706,
        //   visit: 2,
        //   phone: "15692026183",
        // },
      ],
      tableKey: [
        {
          name: "序号",
          value: "id",
          fixed: "left",
          width: 80
        },
        {
          name: "公众号信息",
          value: "wechatId",
          operate: true
        },
        {
          name: "用户信息",
          value: "fromUserName",
          operate: true
        },
        {
          name: "用户头像",
          value: "headimgurl",
          operate: true
        },
        {
          name: "老师信息",
          value: "orderSource",
          operate: true
        },
        {
          name: "事件名称",
          value: "event",
          operate: true
        },
        {
          name: "场景值信息",
          value: "msgType",
          operate: true
        },
        {
          name: "绑定类型",
          value: "bindType",
        },
        {
          name: "绑定信息",
          value: "cmsCode",
          operate: true
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
        pageSize: 10,
      },
      addVisible: false,
      addFormOptions: [
          
        {
          prop: "bindType",
          element: "el-select",
          placeholder: "请选择",
          label: "绑定类型",
          options: []
        },
        {
          prop: "cmsCode",
          element: "el-select",
          placeholder: "请选择",
          label: "cms活动类型",
          options: []
        },
        {
          prop: "activityId",
          element: "el-select",
          placeholder: "请选择",
          label: "营销活动类型",
          options: []
        },
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
  props: {
    wechatId: {
      type: Number | String
    }
  },
  mounted(){
    this.getTableData();
    this.getSelectList();
  },
   methods: {
     onSearch(val){
       this.searchForm = {
        ...val
      };
      console.log(val,this.searchForm , 'val---')
      this.getTableData();
     },
     getSelectList(){
       this.$fetch("wechatstaffqrcode_getActivityDataList").then(res => {
         let arr = res.data.map(item => ({
           label: item.activityName,
           value: item.id
         }))
         this.formOptions[3].options = arr;
         this.addFormOptions[2].options = arr;
       })
       this.$fetch("wechatstaffqrcode_getBindTypeList").then(res => {
         let arr = res.data.map(item => ({
           label: item.value,
           value: item.key
         }))
         this.formOptions[0].options = arr;
         this.addFormOptions[0].options = arr;
       })
       this.$fetch("wechatstaffqrcode_getOrderSourceList").then(res => {
         let arr = res.data.map(item => ({
           label: item.value,
           value: item.key
         }))
         this.formOptions[4].options = arr;
       })
       this.$fetch("wechatstaffqrcode_getUrlCodeDataList").then(res => {
         let arr = res.data.map(item => ({
           label: item.goodsName,
           value: item.code
         }))
         this.formOptions[2].options = arr;
         this.addFormOptions[1].options = arr;
       })
     },
     getTableData(params = {}){
       this.$fetch("wechatstaffqrcode_listJsp", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
        wechatId: this.wechatId
      }).then((res) => {
        this.tableData = res.data.varList.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.phone = this.$common.hidePhone(item.phone);
          
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
    },
    submitAddForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
          this.$confirm(
        `确认需要给绑定的学员推送消息吗？`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "success",
        }
      )
        .then(async () => {
          this.$fetch("wechatstaffqrcode_sendMessageInfo",{
            wechatId: this.wechatId,
            ...formData
          }).then(res => {
              this.$message.success('操作成功')
              this.addVisible = false;
              this.getTableData();
          })
        })
        .catch(() => {});
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
          const res = await this.$fetch("wechatstaffqrcode_deleteJsp", {
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
.post-manage {

}
</style>
