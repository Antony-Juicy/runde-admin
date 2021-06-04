<template>
  <div class="custom-list">
      <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
      ref="dataForm2"
    ></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd"
          >添加</el-button
        >
        <!-- <el-button type="warning" size="small" @click="importVisible = true"
          >导入</el-button
        > -->
        <el-button type="success" size="small" @click="handleDistribute"
          >批量分配</el-button
        >
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig.sync="pageConfig"
        fixedTwoRow
        :multiple="true"
        :tbodyHeight="595"
        :pageSizes="[10, 20, 30, 50, 100,200]"
        @pageChange="pageChange"
        @select="handelSelect"
        :emptyText="emptyText"
      >
        <template slot="followUpSituation" slot-scope="scope">
          <span class="visit-container" @click.stop="openDrawer(scope.row)">{{
            scope.row.followUpSituation || 0
          }}</span>
        </template>
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click="handleDistributeSigle(scope.row)"
            type="text"
            size="small"
            style="color: #67c23a"
            >分配</el-button
          >
        </template>
      </rd-table>
    </div>
    
    <!-- 分配 -->
    <rd-dialog
        :title="'分配'"
        :dialogVisible="distributeVisible"
        @handleClose="distributeVisible = false;"
        @submitForm="submitDistributeForm('dataForm3')"
      >
        <RdForm :formOptions="distributeFormOptions" formLabelWidth="150px" :rules="distributeRules" ref="dataForm3">
        </RdForm>
      </rd-dialog>

      <!-- 添加、编辑 -->
      <full-dialog
        v-model="addVisible"
        :title="addStatus?'添加':'编辑'"
        @change="addVisible = false"
      >
        <CreatChain v-if="addVisible" :chainId="editId" :addStatus="addStatus" @close="handleAddClose"/>
      </full-dialog>

      <!-- 导入 -->
      <rd-dialog
        :title="'导入'"
        :dialogVisible="importVisible"
        @handleClose="importVisible = false"
        @submitForm="submitImportForm('dataForm4')"
      >
        <el-form ref="dataForm4" :model="importForm" label-width="80px">
          <el-form-item label="文件" prop="excel">
            <uploadFile :file.sync="importForm.excel"/>
          </el-form-item>
        </el-form>
      </rd-dialog>

      <!-- 查看跟进情况 -->
      <full-dialog
        v-model="followVisible"
        :title="'跟进情况'"
        @change="followVisible = false"
      >
        <followInfo v-if="followVisible" :followId="followId"/>
      </full-dialog>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import CreatChain from "./creat-chain";
import uploadFile from "@/components/Activity/uploadFile";
import followInfo from './follow-info';
import axios from 'axios';
export default {
  name:"custom-list",
  data(){
    return {
      followId:"",
      followVisible:false,
      loading: false,
      followValue:"",
      followOptions:[],
      importForm:{
        excel:""
      },
      importVisible: false,
      formOptions: [
        {
          prop: "chainName",
          element: "el-input",
          placeholder: "客户名称"
        },
        {
          prop: "distribution",
          element: "el-select",
          placeholder: "是否分配",
          options: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ]
        },
        {
          prop: "cooperationLevel",
          element: "el-select",
          placeholder: "合作等级",
          options: [{
              label:"S级",
              value:"S"
            },
            {
              label:"A级",
              value:"A"
            },
            {
              label:"B级",
              value:"B"
            },
            {
              label:"C级",
              value:"C"
            },]
        },
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
        {
          prop: "province",
          element: "el-select",
          placeholder: "请选择省",
          options: [],
          events: {},
          filterable: true
        },
        {
          prop: "city",
          element: "el-select",
          placeholder: "请选择市",
          options: [],
          events: {},
          filterable: true
        },
        {
          prop: "county",
          element: "el-select",
          placeholder: "请选择区",
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
          name: "规模排名",
          value: "scaleRanking",
        },
        {
          name: "门店数量",
          value: "storeCount",
        },
        {
          name: "员工数量",
          value: "employeeCount",
        },
        {
          name: "是否签订协议",
          value: "signAgreement",
        },
        {
          name: "合作等级",
          value: "cooperationLevel",
        },
        {
          name: "药师学员数量",
          value: "pharmacistsStudentCount",
        },
        {
          name: "学历学员数量",
          value: "educationStudentCount",
        },
        {
          name: "跟进情况",
          value: "followUpSituation",
          operate: true
        },
        {
          name: "省校",
          value: "provincialSchool",
        },
        {
          name: "分校",
          value: "branchSchool",
        },
        {
          name: "跟进人",
          value: "followUpUser",
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
      distributeVisible:false,
      distributeFormOptions:[
        {
          prop: "organizationId",
          element: "el-select",
          placeholder: "请选择",
          label: "所属组织",
          options: [
          ],
          events:{},
          filterable:true,
          disabled: false
        },
        {
          prop: "provincialSchoolId",
          element: "el-select",
          placeholder: "请选择",
          label: "所属校区",
          options: [
          ],
          events:{},
          filterable:true,
          disabled: false
        },
        {
          prop: "branchSchoolId",
          element: "el-select",
          placeholder: "请选择",
          label: "所属分校",
          options: [
          ],
          events:{},
          filterable:true,
          disabled: false
        },
        {
          prop: "followUpUserId",
          element: "el-select",
          placeholder: "请选择",
          label: "跟进老师",
          options: [
          ],
          filterable:true,
          disabled: false
        },
        {
          prop: "nextVisitDate",
          element: "el-date-picker",
          placeholder: "请选择",
          label: "首次跟进截止时间",
          type: "datetime",
          disabled: false
        },
      ],
      distributeRules:{
        organizationId: [
          { required: true, message: "请选择", trigger: "change" },
        ]
      },
      distributeId:"",
      addStatus: true,
      editId:"",
      selectedData:"",
      organizationArr: [],
      provincialSchoolArr: [],
      branchSchoolArr: [],
      followUpUserArr: [],
      distributeStatus: 1, //1单选 2多选
    }
  },
  components:{
    RdForm,
    CreatChain,
    uploadFile,
    followInfo
  },
  mounted(){
    this.getTableData();
    this.getSelectList();

    // 获取省市区下拉
    // this.getAddress();
  },
   methods: {
     getAddress(){
       axios.get('https://rdimg.rundejy.com/data/common/address/address.json').then(res => {

       })
     },
     followSelect(query){
       if (query !== '') {
         this.loading = true;
         this.$fetch("chain_getUserListByStaffName",{
           staffName: query
         }).then(res => {
           this.followUpUserArr = res.data.map(item => ({
             label: item.name,
             value: item.userId
           }));
           this.followOptions = this.followUpUserArr;
           this.loading = false;
         })
       }else {
         this.options = [];
       }
     },
     getSelectList(){
       this.$fetch("chain_getCampusList",{
         parentId: 0
       }).then(res => {
         this.organizationArr = res.data.map(item => ({
           label: item.campusName,
           value: item.campusId
         }));
         this.distributeFormOptions[0].options = this.organizationArr;
         this.distributeFormOptions[0].events = {
           change: this.organizationChange
         }
         this.formOptions[3].options = this.organizationArr;
         this.formOptions[3].events = {
           change: this.organizationChange2
         }
       })
     },
    setFormValue(prop,val){
       let obj = {};
       obj[prop] = val;
       this.$refs.dataForm3.setValue(obj);
          setTimeout(() => {
            this.$refs['dataForm3'].validateField(prop);
          }, 0);
     },
     organizationChange(val,schoolId){
       if(!val){
         return;
       }
       this.$fetch("chain_getCampusList",{
         parentId: val
       }).then(res => {
        return new Promise(resolve => {
          this.provincialSchoolArr = res.data.map(item => ({
            label: item.campusName,
            value: item.campusId
          }));
          this.distributeFormOptions[1].options = this.provincialSchoolArr;
          this.distributeFormOptions[1].events = {
            change: this.provincialSchoolChange
          }
          //  清除下级的数据和值
          if(!schoolId){
            this.$refs.dataForm3.setValue({
                provincialSchoolId: '',
                branchSchoolId:'',
                followUpUserId:'',
            })
          }
            
          //  赋值必传值，进行校验
            this.setFormValue("organizationId",val);

            resolve();
        })
        })
     },
      organizationChange2(val){
        if(!val){
         return;
       }
       this.$fetch("chain_getCampusList",{
         parentId: val
       }).then(res => {
         let provincialSchoolArr = res.data.map(item => ({
           label: item.campusName,
           value: item.campusId
         }));
         this.formOptions[4].options = provincialSchoolArr;
         this.formOptions[4].events = {
           change: this.provincialSchoolChange2
         }
        //  清除下级的数据和值
          this.$refs.dataForm2.setValue({
              provincialSchoolId:'',
              branchSchoolId:'',
              followUpUserId:'',
          })
       })
     },
     provincialSchoolChange(val,branchId){
      return new Promise(resolve => {
        if(!val){
         return;
       }
        this.$fetch("chain_getCampusList",{
          parentId: val
        }).then(res => {
          this.branchSchoolArr = res.data.map(item => ({
            label: item.campusName,
            value: item.campusId
          }));
          this.distributeFormOptions[2].options = this.branchSchoolArr;
          this.distributeFormOptions[2].events = {
            change: this.branchSchoolChange
          }
          //  清除下级的数据和值
          if(!branchId){
            this.$refs.dataForm3.setValue({
                branchSchoolId:  '',
                followUpUserId:'',
            })
          }
            

            resolve();
        })
      })
     },
      provincialSchoolChange2(val){
        if(!val){
         return;
       }
      this.$fetch("chain_getCampusList",{
         parentId: val
       }).then(res => {
         this.branchSchoolArr = res.data.map(item => ({
           label: item.campusName,
           value: item.campusId
         }));
         this.formOptions[5].options = this.branchSchoolArr;
         this.formOptions[5].events = {
           change: this.branchSchoolChange2
         }
         //  清除下级的数据和值
          this.$refs.dataForm2.setValue({
              branchSchoolId:'',
              followUpUserId:'',
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
            this.distributeFormOptions[3].options = this.followUpUserArr;
            //  清除下级的数据和值
            if(!userId){
              this.$refs.dataForm3.setValue({
                  followUpUserId: '',
              })
            }
              

              resolve();
          })
        })
     },
     branchSchoolChange2(val){
       if(!val){
         return;
       }
        this.$fetch("chain_getUserListByCampusId",{
         campusId: val
       }).then(res => {
         this.followUpUserArr = res.data.map(item => ({
           label: item.name,
           value: item.userId
         }));
         this.formOptions[6].options = this.followUpUserArr;
         //  清除下级的数据和值
          this.$refs.dataForm2.setValue({
              followUpUserId:'',
          })
       })
     },
     handleAddClose(){
       this.addVisible = false;
       this.getTableData();
     },
     onSearch(val){
       this.searchForm = {
        ...val
      };
      console.log(val,this.searchForm , 'val---')
      this.getTableData();
     },
     getTableData(params = {}) {
      this.$fetch("chain_pageList", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
        chainType:"CHAIN_CUSTOMER"
      }).then((res) => {
        this.tableData = res.data.records.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          item.signAgreement = item.signAgreement?'是':'否';
          return item;
        });
        this.pageConfig.totalCount = res.data.totalCount;
      })
    },
     pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.pageNum = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    handleAdd(){
      this.addStatus = true;
      this.addVisible = true;
    },
    submitDistributeForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
          if(formData.followUpUserId && !formData.nextVisitDate){
            this.$message.warning("请选择首次跟进截止时间")
            return;
          }else if(!formData.followUpUserId && formData.nextVisitDate){
            this.$message.warning("请输入跟进老师")
            return;
          }
          let organization = this.getSelValue(this.organizationArr,formData.organizationId);
          let provincialSchool = this.getSelValue(this.provincialSchoolArr,formData.provincialSchoolId);
          let branchSchool = this.getSelValue(this.branchSchoolArr,formData.branchSchoolId);
          let followUpUser = this.getSelValue(this.followUpUserArr,formData.followUpUserId);
          let chainIds = this.distributeStatus == 1? this.distributeId : this.selectedData.map(item => (item.chainId)).join(",");
          this.$fetch("chain_chainAllocating",{
            ...formData,
            nextVisitDate: this.$common._formatDates2(formData.nextVisitDate),
            chainIds,
            organization,
            provincialSchool,
            branchSchool,
            followUpUser
          }).then(res => {
            this.$message.success('操作成功')
            this.distributeVisible = false;
            this.getTableData()
          })
        }
          
      });
    },
    getSelValue(arr,value){
      let obj = arr.find(item => (item.value == value));
      if(obj){
        return obj.label;
      }else {
        return '';
      }
    },
    handleEdit(data){
      this.addStatus = false;
      this.addVisible = true; 
      this.editId = data.chainId;
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
            id: row.chainId
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
    handelSelect(val) {
      this.selectedData = val;
    },
    handleDistribute(){
      if(!this.selectedData.length){
        this.$message.warning("请选择数据")
        return;
      }
      this.distributeVisible = true;
      this.distributeStatus = 2;
      this.getDistributeInfo(this.selectedData.map(item => (item.chainId)).join(","));
    },
    submitImportForm(){
      if(!this.importForm.excel){
        this.$message.warning("请上传文件")
        return
      }
      let obj = new FormData();
      obj.append("file",this.importForm.excel)
      this.$fetch("chain_importChainByExcel",obj).then(res => {
        this.$message.success("操作成功")
        this.getTableData()
        this.importVisible = false
      })
    },
    handleDistributeSigle(data){
      this.distributeId = data.chainId;
      this.distributeVisible = true;
      this.distributeStatus = 1;
      this.getDistributeInfo(data.chainId);
    },
    getDistributeInfo(chainIds){
      this.$fetch("chain_getChainAllocatingInfo",{
        chainIds
      }).then(async res => {
        const { 
          organizationId,provincialSchoolId,branchSchoolId,followUpUserId,nextVisitDate,
          updateOrganization,updateProvincialSchool,updateBranchSchool,updateFollowUpUser,updateNextVisitDate
        } = res.data;
        Promise.all([organizationId&&this.organizationChange(organizationId,provincialSchoolId),
        provincialSchoolId&&this.provincialSchoolChange(provincialSchoolId,branchSchoolId),
        branchSchoolId&&this.branchSchoolChange(branchSchoolId,followUpUserId)]).then(res => {
            this.$refs.dataForm3.setValue({
              organizationId,provincialSchoolId,branchSchoolId,followUpUserId,nextVisitDate
            })
        })
        
        // 判断是否禁用
        this.distributeFormOptions[0].disabled = !updateOrganization;
        this.distributeFormOptions[1].disabled = !updateProvincialSchool;
        this.distributeFormOptions[2].disabled = !updateBranchSchool;
        this.distributeFormOptions[3].disabled = !updateFollowUpUser;
        this.distributeFormOptions[4].disabled = !updateNextVisitDate;
      })
    },
    openDrawer(data){
      this.followVisible = true;
      this.followId = data.chainId;
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-list {
  .visit-container {
    display: inline-block;
    padding: 5px;
    border: 1px solid #dcdfe6;
    line-height: 9px;
    border-radius: 2px;
    color: #606266;
    cursor: pointer;
  }
}
</style>
