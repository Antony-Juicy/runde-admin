<template>
  <div class="daily-work">
      <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
      ref="dataForm2"
    ></search-form>
    <div class="w-container">
      <!-- <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd"
          >添加</el-button
        >
      </div> -->
      <div class="complete-top">
            <div class="complete-title">完成情况</div>
            <div class="complete-dimension">
              <div :class="{'dimension-item':true, 'current-item': currentItem == 'DAY'}"  @click="clickTab('DAY')">今日</div>
              <div :class="{'dimension-item':true, 'current-item': currentItem == 'WEEK'}"  @click="clickTab('WEEK')">本周</div>
              <div :class="{'dimension-item':true, 'current-item': currentItem == 'MONTH'}"  @click="clickTab('MONTH')">本月</div>
              <div :class="{'dimension-item':true, 'current-item': currentItem == 'YEAR'}"  @click="clickTab('YEAR')">全年</div>
            </div>
      </div>
      <el-divider></el-divider>
      <div style="text-align: right;margin-bottom:20px">
          <el-radio-group v-model="radio1" size="small" @change="clickRadio">
            <el-radio-button label="PROVINCIAL_SCHOOL">省校</el-radio-button>
            <el-radio-button label="BRANCH_SCHOOL">分校</el-radio-button>
            <el-radio-button label="PERSON">个人</el-radio-button>
            </el-radio-group>
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig.sync="pageConfig"
        :border="false"
        fixedTwoRow
        @pageChange="pageChange"
         @sortChange="handelSortChange"
        :emptyText="emptyText"
      >
        <template slot="provincialSchool" slot-scope="scope">
            <div class="rank-index"><span :class="{'rank-index-left':true,'rank-index-top': Number(scope.row.ranking) < 3 }">{{scope.row.ranking}}</span><span>{{scope.row.provincialSchool}}</span></div>
        </template>
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >查看记录</el-button
          >
          <!-- <el-divider direction="vertical"></el-divider>
          <el-button
            @click="handleDelete(scope.row)"
            type="text"
            size="small"
            style="color: #ec5b56"
            >删除</el-button
          > -->
        </template>
      </rd-table>
    </div>
    

      
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
export default {
  name:"daily-work",
  data(){
    return {
      currentItem:'WEEK',
        radio1:'PROVINCIAL_SCHOOL',
      formOptions: [
         {
          prop: "organizationId",
          element: "el-select",
          placeholder: "所属组织",
          options: [],
          events: {},
          filterable: true
        },
        {
          prop: "provincialSchoolId",
          element: "el-select",
          placeholder: "所属校区",
          options: [],
          events: {},
          filterable: true
        },
        {
          prop: "branchSchoolId",
          element: "el-select",
          placeholder: "所属分校",
          options: [],
          events: {},
          filterable: true
        },
         {
          prop: "followUpUserId",
          element: "el-select",
          placeholder: "跟进老师",
          options: [],
          filterable: true
        },
      ],
      searchForm:{},
      emptyText:"暂无数据",
      tableData:[
         {
          id: 1,
          // provincialSchool: "飞翔的荷兰人3",
          cutdown: 1608897351706,
          visit: 2,
          phone: "15692026183",
          // ranking: 1,
        },
      ],
      tableKey: [
        {
          name: "校区",
          value: "provincialSchool",
          operate: true,
          width: 200
        },
        {
          name: "分校",
          value: "branchSchool",
        },
        {
          name: "个人",
          value: "userName",
        },
        {
          name: "任务总量",
          value: "totalTaskCount",
           sortable: 'custom',
        },
        {
          name: "逾期任务",
          value: "overdueCount",
           sortable: 'custom',
        },
        {
          name: "完成数量",
          value: "totalCompleteCount",
           sortable: 'custom',
        },
        {
          name: "待完成数量",
          value: "unfinishedCount",
           sortable: 'custom',
        },
        {
          name: "完成比例",
          value: "percentage",
           sortable: 'custom',
        },
      ],
       pageConfig: {
        totalCount: 0,
        pageNum: 1,
        pageSize: 10,
      },
      addVisible: false,
      addStatus: true,
      editId:"",
      organizationArr: [],
      provincialSchoolArr:[],
      branchSchoolArr: [],
      followUpUserArr: [],
      orderForm:{}
    }
  },
  components:{
    RdForm
  },
  props: {
      mode: {
          type: String
      }
  },
  mounted(){
      this.getSelectList();
      this.getTableData();
  },
   methods: {
     handelSortChange(val){
      console.log(val,'valll')
      let sortBy;
      if(val.order == "descending"){
        sortBy = 'DESC'
      }else if(val.order == "ascending"){
        sortBy = 'ASC'
      }else {
        sortBy = null
      }
      if(sortBy){
        this.orderForm = {
          sortBy,
          sortField: val.prop
        };
      }else {
        this.orderForm = {};
      }
      this.getTableData(this.orderForm);
    },
     clickTab(index){
       this.currentItem = index;
       this.getTableData();
     },
     clickRadio(){
       this.getTableData();
     },
       getSelectList(){
       this.$fetch("chain_getCampusList",{
         parentId: 0
       }).then(res => {
         this.organizationArr = res.data.map(item => ({
           label: item.campusName,
           value: item.campusId
         }));
         this.formOptions[0].options = this.organizationArr;
         this.formOptions[0].events = {
           change: this.organizationChange
         }
       })
     },
     organizationChange(val){
       this.$fetch("chain_getCampusList",{
         parentId: val
       }).then(res => {
         this.provincialSchoolArr = res.data.map(item => ({
           label: item.campusName,
           value: item.campusId
         }));
         this.formOptions[1].options = this.provincialSchoolArr;
         this.formOptions[1].events = {
           change: this.provincialSchoolChange
         }
        //  清除下级的数据和值
          this.$refs.dataForm2.setValue({
              provincialSchoolId:'',
              branchSchoolId:'',
          })
       })
     },
     provincialSchoolChange(val){
      this.$fetch("chain_getCampusList",{
         parentId: val
       }).then(res => {
         this.branchSchoolArr = res.data.map(item => ({
           label: item.campusName,
           value: item.campusId
         }));
         this.formOptions[2].options = this.branchSchoolArr;
         this.formOptions[2].events = {
           change: this.branchSchoolChange
         }
         //  清除下级的数据和值
          this.$refs.dataForm2.setValue({
              branchSchoolId:'',
          })
       })
     },
      branchSchoolChange(val,userId){
        return new Promise(resolve => {
          this.$fetch("chain_getUserListByCampusId",{
            campusId: val
          }).then(res => {
            this.followUpUserArr = res.data.map(item => ({
              label: item.name,
              value: item.userId
            }));
            this.formOptions[3].options = this.followUpUserArr;
            //  清除下级的数据和值
              this.$refs.dataForm2.setValue({
                  followUpUserId: '',
              })
              resolve();
          })
        })
     },
     onSearch(val){
       this.searchForm = {
        ...val
      };
      console.log(val,this.searchForm , 'val---')
      this.getTableData();
     },
     getTableData(params={}){
       this.$fetch("chain_getGroupStatisticsRankingData", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
        dateType: this.currentItem,
        dataType: this.radio1
        }).then((res) => {
          this.tableData = res.data.records.map((item) => {
            item.createAt = this.$common._formatDates(item.createAt);
            item.updateAt = this.$common._formatDates(item.updateAt);
            item.completeStatus = this.statusOptions.find(ele => (ele.value == item.completeStatus)).label;
            return item;
          });
          this.pageConfig.totalCount = res.data.totalCount;
        })
     },
     pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.pageNum = val.page;
      this.pageConfig.pageSize = val.limit;
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
    handleDelete(row) {
      let info = '';
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$fetch("projectType_delete", {
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
.daily-work {
    .pane-item {
        text-align: center;
        padding-top: 10px;
        .pane-item-top {
            color: #333333;
            font-size: 18px;
            .pre-icon {
                display: inline-block;
                width: 14px;
                height: 14px;
                border-radius: 50%;
                background-color: #307FF1;
                margin-right: 8px;
            }
        }
        .pane-item-bottom {
            color: #3F91F7;
            font-size: 26px;
        }
    }

    .rank-index {
          width: 120px;
          text-align: center;
          display: flex;
          align-items: center;
          .rank-index-left {
            display: inline-block;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background-color: #A7ADB4;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            margin-right: 5px;
          }
          .rank-index-top {
            background-color: #408AFF;
          }
        }

    .complete-top {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      .complete-title {
        color: #333;
        font-size: 18px;
        font-weight: bold;
      }
      .complete-dimension {
        display: flex;
        margin-right: 20px;
        .dimension-item {
          cursor: pointer;
          margin-right: 28px;
        }
        .current-item {
          color: #409eff;
        }
      }
    }
}
</style>
