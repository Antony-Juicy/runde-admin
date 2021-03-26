<template>
  <div class="post-manage">
      <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" icon="el-icon-download" @click="handleExport"
          >打包</el-button
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
        <template slot="evaluation" slot-scope="scope">
          <el-button @click="evaluationDetail(scope.row)" icon="el-icon-edit" type="text" size="small"
            >测评详情</el-button
          >
        </template>
        <template slot="write" slot-scope="scope">
          <el-button @click="writeDetail(scope.row)" icon="el-icon-edit" type="text" size="small"
            >做题详情</el-button
          >
        </template>
      </rd-table>
    </div>
    
    <!-- 测评详情 -->
    <fullDialog
        v-model="evaluteVisible"
        title="用户测评记录"
        @change="evaluteVisible = false"
      >
        <evaluteRecord
          ref="evaluteRecord"
          @close="evaluteVisible = false"
          v-if="evaluteVisible"
          :linkUserId="linkUserId"
        />
    </fullDialog>

      <!-- 做题详情 -->
    <fullDialog
        v-model="writeVisible"
        title="做题记录详情"
        @change="writeVisible = false"
      >
        <writeRecord
          ref="writeRecord"
          @close="writeVisible = false"
          v-if="writeVisible"
          :linkUserId="linkUserId2"
        />
      </fullDialog>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import fullDialog from "@/components/FullDialog";
import evaluteRecord from "./evaluteRecord";
import writeRecord from "./writeRecord";
export default {
  name:"link-manage",
  data(){
    return {
      linkUserId:"",
      linkUserId2:"",
      formOptions: [
        {
          prop: "appName",
          element: "el-select",
          placeholder: "APP名称",
          options: [
          ]
        },
        {
          prop: "phone",
          element: "el-input",
          placeholder: "手机号码",
        }
      ],
      searchForm:{},
      emptyText:"暂无数据",
      tableData:[
      ],
      tableKey: [
        {
          name: "ID",
          value: "id",
          fixed: "left",
          width: 80
        },
        {
          name: "APP名称",
          value: "appName",
        },
        {
          name: "openId",
          value: "openId",
        },
        {
          name: "用户Id",
          value: "userId",
        },
        {
          name: "手机号码",
          value: "phone",
        },
        {
          name: "用户名称",
          value: "userName",
        },
        {
          name: "老师营销id",
          value: "teacherId",
        },
        {
          name: "创建时间",
          value: "createAt",
        },
        {
          name: "用户测评记录",
          value: "evaluation",
          operate: true,
        },
         {
          name: "用户做题记录",
          value: "write",
          operate: true,
        },
      ],
       pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },
      evaluteVisible: false,
      writeVisible: false
    }
  },
  components:{
    RdForm,
    fullDialog,
    evaluteRecord,
    writeRecord
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
       this.$fetch("auditionLink_listJsp", {
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

        let appNameList = res.data.appNameList.map(item => ({
          label: item.value,
          value: item.key
        }))

        this.formOptions[0].options = appNameList;
      })
     },
     pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    handleExport(){
      this.$fetch("auditionLink_export",{
        ...this.searchForm
      })
    },
    evaluationDetail(data){
      this.evaluteVisible = true;
      this.linkUserId = data.id;
    },
    writeDetail(data){
      this.writeVisible = true;
      this.linkUserId2 = data.id;
    },
  }
}
</script>

<style lang="scss" scoped>
.post-manage {

}
</style>
