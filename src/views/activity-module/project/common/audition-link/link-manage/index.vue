<template>
  <div class="post-manage">
      <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" icon="el-icon-download" @click="handleAdd"
          >打包</el-button
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
      formOptions: [
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "APP名称",
          options: [
            {
              label:"考药狮",
              value: "1"
            },
            {
              label:"考医狮",
              value: "2"
            },
            {
              label:"考护狮",
              value: "3"
            }
          ]
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "手机号码",
        }
      ],
      searchForm:{},
      emptyText:"暂无数据",
      tableData:[
         {
          id: 1,
          name: "飞翔的荷兰人3",
          cutdown: 1608897351706,
          visit: 2,
          phone: "15692026183",
        },
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
          value: "staffName",
        },
        {
          name: "openId",
          value: "goodsName",
        },
        {
          name: "用户Id",
          value: "activityName",
        },
        {
          name: "手机号码",
          value: "posterName",
        },
        {
          name: "用户名称",
          value: "posterPic",
        },
        {
          name: "老师营销id",
          value: "posterCopyFirst",
        },
        {
          name: "创建时间",
          value: "posterCopySecond",
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
        pageSize: 10,
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

    },
    evaluationDetail(data){
      this.evaluteVisible = true;
    },
    writeDetail(data){
      this.writeVisible = true;
    },
  }
}
</script>

<style lang="scss" scoped>
.post-manage {

}
</style>
