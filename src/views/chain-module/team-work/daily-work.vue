<template>
  <div class="daily-work">
      <el-breadcrumb separator="/" v-if="currentChain && (currentIndex == 1 )" style="margin-bottom: 20px">
        <el-breadcrumb-item><a href="javascript:;" @click="goBack(0)">{{chaintitle}}</a></el-breadcrumb-item>
        <el-breadcrumb-item ><a href="javascript:;" @click="goBack(1)">{{currentChain}}</a></el-breadcrumb-item>
      </el-breadcrumb>
       <div v-show="currentIndex == 0">
        <el-row :gutter="12" v-if="mode != 'overdue'">
          <el-col :span="4">
            <el-card shadow="hover">
              <div class="pane-item">
                <div class="pane-item-top"><span class="pre-icon"></span>任务总量</div>
                <el-divider></el-divider>
                <div class="pane-item-bottom">{{synopsisData.totalCount}}个任务</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover">
              <div class="pane-item">
                <div class="pane-item-top"><span class="pre-icon" style="background-color:#67C23A"></span>正常完成</div>
                <el-divider></el-divider>
                <div class="pane-item-bottom">{{synopsisData.completeCount}}个任务</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover">
              <div class="pane-item">
                <div class="pane-item-top"><span class="pre-icon" style="background-color:#909399"></span>逾期完成</div>
                <el-divider></el-divider>
                <div class="pane-item-bottom">{{synopsisData.overdueCompleteCount}}个任务</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover">
              <div class="pane-item">
                <div class="pane-item-top"><span class="pre-icon" style="background-color:#BF6DC5"></span>正常待完成</div>
                <el-divider></el-divider>
                <div class="pane-item-bottom">{{synopsisData.unfinishedCount}}个任务</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover">
              <div class="pane-item">
                <div class="pane-item-top"><span class="pre-icon" style="background-color:#E6A23C"></span>逾期待完成</div>
                <el-divider></el-divider>
                <div class="pane-item-bottom">{{synopsisData.overdueUnfinishedCount}}个任务</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover">
              <div class="pane-item">
                <div class="pane-item-top"><span class="pre-icon"></span>完成率</div>
                <el-divider></el-divider>
                <div class="pane-item-bottom">{{synopsisData.completePercentage}}%</div>
              </div>
            </el-card>
          </el-col>

        </el-row>
        <search-form
        :formOptions="formOptions"
        :showNum="7"
        @onSearch="onSearch"
        ref="dataForm2"
        :btnItems="btnItems"
        ></search-form>
        <div class="w-container">
          <!-- <div class="btn-wrapper">
            <el-button type="primary" size="small" @click="handleAdd"
              >添加</el-button
            >
          </div> -->
          <div style="text-align: right;margin-bottom:20px" v-if="mode != 'overdue'">
              <el-radio-group v-model="radio1" size="small" @change="radioChange">
                <el-radio-button :label="item.value" v-for="(item,index) in statusOptions" :key="index">{{item.label}}</el-radio-button>
                <!-- <el-radio-button label="已完成"></el-radio-button>
                <el-radio-button label="待完成"></el-radio-button>
                <el-radio-button label="逾期"></el-radio-button>
                <el-radio-button label="逾期完成"></el-radio-button> -->
                </el-radio-group>
          </div>
          <rd-table
            :tableData="tableData"
            :tableKey="tableKey"
            :pageConfig.sync="pageConfig"
            :pageSizes="[10, 20, 30, 50, 100,200]"
            fixedTwoRow
            @pageChange="pageChange"
            :emptyText="emptyText"
          >
            <template slot="edit" slot-scope="scope">
              <el-button @click="openDrawer(scope.row)" type="text" size="small"
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

       <div v-show="currentIndex == 1">
         <followInfo :followId="followId"/>
       </div>

      <!-- 查看跟进情况 -->
      <!-- <full-dialog
        v-model="followVisible"
        :title="'跟进情况'"
        @change="followVisible = false"
      >
        <followInfo v-if="followVisible" :followId="followId"/>
      </full-dialog> -->
      
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import followInfo from '../custom-list/follow-info';
export default {
  name:"daily-work",
  data(){
    return {
      btnItems:"search",
      followVisible: false,
      followId:'',
      synopsisData:{},
        radio1:'',
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
          name: "飞翔的荷兰人3",
          cutdown: 1608897351706,
          visit: 2,
          phone: "15692026183",
        },
      ],
      tableKey: [
        {
          name: "连锁名称",
          value: "chainName",
        },
        {
          name: "所属集团",
          value: "membershipGroup",
        },
        {
          name: "对接人",
          value: "dockingPeople",
        },
        {
          name: "跟进人",
          value: "followUpUser",
        },
        {
          name: "拜访时间",
          value: "endVisitTime",
        },
        {
          name: "状态",
          value: "completeStatus",
        },
        {
          name: "截止时间",
          value: "deadline",
        },
        {
          name: "下次回访时间",
          value: "nextVisitDate",
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
        pageNum: 1,
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
      editId:"",
      organizationArr: [],
      provincialSchoolArr:[],
      branchSchoolArr: [],
      followUpUserArr: [],
      statusOptions: [
          {
            label: '全部',
            value: ''
          },
          {
            label: '已完成',
            value: 'COMPLETED'
          },
          {
            label: '待完成',
            value: 'UNFINISHED'
          },
          {
            label: '逾期',
            value: 'OVERDUE'
          },
          {
            label: '逾期完成',
            value: 'OVERDUE_COMPLETE'
          },
        ],
        currentIndex: 0,
        chaintitle:'< 返回',
        currentChain:''

    }
  },
  components:{
    RdForm,
    followInfo
  },
  props: {
      mode: {
          type: String
      }
  },
  mounted(){
      this.getSelectList();
      this.getSynopsis();
      this.getTableData();

       this.getDefault();//获取该账号可以看到的数据
  },
   methods: {
     goBack(index){
      this.currentIndex = index;
    },
     radioChange(){
       this.getTableData();
     },
      getTableData(params = {}) {
        let url;
        if(this.mode == 'day'){
         url = "chain_getGroupStatisticsTodayData";
       }else if(this.mode == 'week'){
         url = "chain_getGroupStatisticsWeekData";
       }else if(this.mode == 'overdue'){
         url = "chain_getGroupStatisticsOverdueData";
       }
        this.$fetch(url, {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
        completeStatus: this.radio1
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
     getSynopsis(){
       let url;
       if(this.mode == 'day'){
         url = "chain_getVisitStatisticsTodaySynopsis";
       }else if(this.mode == 'week'){
         url = "chain_getVisitStatisticsWeekSynopsis";
       }else if(this.mode == 'overdue'){
         return;
       }
       this.$fetch(url).then(res => {
        this.synopsisData = res.data;
       })
       
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
     getDefault(){
       this.$fetch("chain_getGroupStatisticsDefaultOption").then(async res => {
        //  this.defaultData = res.data;
        const { updateOrganization,updateProvincialSchool,updateBranchSchool,dataType,organization,organizationId,provincialSchool,provincialSchoolId,branchSchool,branchSchoolId } = res.data;
         this.formOptions[0].disabled = !updateOrganization;
         this.formOptions[1].disabled = !updateProvincialSchool;
         this.formOptions[2].disabled = !updateBranchSchool;
         this.currentRankItem = dataType;
         if(dataType == 'PROVINCIAL_SCHOOL'){
           this.btnItems = "search, reset";
         }
        //  给选项赋值
        if(organizationId){
           this.formOptions[0].options = [
             {
               label: organization,
               value: organizationId
             }
           ]
           this.$refs.dataForm2.setValue({
             organizationId
          })
          await this.organizationChange(organizationId);
          if(provincialSchoolId){
            this.formOptions[1].options = [
              {
                label: provincialSchool,
                value: provincialSchoolId
              }
            ]
            this.$refs.dataForm2.setValue({
              provincialSchoolId
            })
            await this.provincialSchoolChange(provincialSchoolId);
            if(branchSchoolId){
              this.formOptions[2].options = [
                {
                  label: branchSchool,
                  value: branchSchoolId
                }
              ]
              this.$refs.dataForm2.setValue({
                branchSchoolId
              })
              this.branchSchoolChange(branchSchoolId);
            }
          }
        }
       })
     },
      organizationChange(val){
         if(!val){
          return;
        }
       return new Promise(resolve => {
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
            resolve();
        })
       })
     },
     provincialSchoolChange(val){
        if(!val){
          return;
        }
      return new Promise(resolve => {
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
            resolve();
        })
      })
     },
      branchSchoolChange(val,userId){
         if(!val){
          return;
        }
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
    },
    openDrawer(data){
      this.followVisible = true;
      this.followId = data.chainId;
      this.currentIndex = 1;
      this.currentChain = data.chainName;
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
}
</style>
