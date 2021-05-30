<template>
  <div class="creat-chain">
      <el-steps :active="activeStep" finish-status="success">
        <el-step title="选择连锁类型"></el-step>
        <el-step title="填写基础信息"></el-step>
        <el-step title="提交保存"></el-step>
      </el-steps>
      <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
      <!-- 选择连锁类型 -->
      <div v-show="activeStep == 0" style="margin-top: 50px;">
        <el-form ref="ruleForm" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="连锁类型" prop="chainType">
            <el-select v-model="form.chainType">
              <el-option :label="item.label" :value="item.value" v-for="item in chainTypeArr" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <div style="text-align:right">
            
            <el-button type="primary" @click="submitType('ruleForm')" size="small">下一步</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>

      <!-- 填写基础信息 -->
      <div v-show="activeStep == 1">
        <rd-form :formOptions="addFormOptions" formLabelWidth="180px" :rules="addRules" ref="dataForm3" >
          <template slot="followUpUserId">
              <el-select
                v-model="followValue"
                filterable
                remote
                placeholder="请输入用户名"
                :remote-method="followSelect"
                :loading="loading"
                size="small">
                <el-option
                  v-for="item in followOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </template>
          <template slot="address">
            <searchMap @poiPicked="poiPicked" :addressCoordinates="addressCoordinates" :detailAddress="detailAddress"/>
          </template>
        </rd-form>
        <div style="text-align:right">
          <el-button @click="goBack" size="small">上一步</el-button>
          <el-button type="primary" size="small" @click="submitAddForm('dataForm3')">提交</el-button>
        </div>
      </div>
      
  </div>
</template>

<script>
import searchMap from "./search-map";
import Common from "@/utils/common";
let validateStoreCount = (rule, value, callback) => {
        if(value == undefined || value == ''){
            callback();
        }else if ( parseFloat(value).toString() == "NaN") {
            callback(new Error('请输入数字'));
        } else if(Number(value) < 10){
          callback(new Error('门店数量不能少于10'));
        }else{
            callback();
        }
    }
export default {
  name:"creat-chain",
  data(){
    return {
      loading: false,
      followValue:"",
      followOptions:[],
      addressCoordinates:"",
      detailAddress:"",
      activeStep: 0,
      addFormOptions: [
        {
          prop: "chainName",
          element: "el-input",
          placeholder: "请输入客户名称",
          label: "名称"
        },
         {
          prop: "membershipGroup",
          element: "el-input",
          placeholder: "请输入",
          label: "所属集团"
        },
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
          label: "跟进人",
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
         {
          prop: "dockingPeople",
          element: "el-input",
          placeholder: "请输入",
          label: "对接人"
        },
        {
          prop: "dockingPeoplePhone",
          element: "el-input",
          placeholder: "请输入",
          label: "联系方式"
        },
         {
          prop: "dockingPeopleJobRank",
          element: "el-select",
          placeholder: "请选择",
          label: "职务等级",
          options: [
            {
              label: "董事长",
              value: "CHAIRMAN"
            },
             {
              label: "总监",
              value: "DIRECTOR"
            },
             {
              label: "部长",
              value: "MINISTER"
            },
             {
              label: "主管",
              value: "SUPERVISOR"
            },
             {
              label: "专员",
              value: "COMMISSIONER"
            },
          ]
        },
        {
          prop: "address",
          element: "el-input",
          placeholder: "请输入详细地址",
          label: "地址",
          operate: true,
          initvalue: 0
        },
        {
          prop: "scaleRanking",
          element: "el-input",
          placeholder: "请输入",
          label: "规模排名",
        },
        {
          prop: "storeCount",
          element: "el-input",
          placeholder: "请输入",
          label: "门店数量",
        },
        {
          prop: "employeeCount",
          element: "el-input",
          placeholder: "请输入员工数量",
          label: "员工数量"
        },
        {
          prop: "cooperationLevel",
          element: "el-select",
          placeholder: "请选择合作等级",
          label: "合作等级",
          options: [
            {
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
            },
          ]
        },
         {
          prop: "signAgreement",
          element: "el-select",
          placeholder: "请选择",
          label: "是否签订协议",
          options: [
            {
              label:"是",
              value: true
            },
            {
              label:"否",
              value:false
            }
          ]
        },
        {
          prop: "pharmacistsStudentCount",
          element: "el-input",
          placeholder: "请输入",
          label: "药师学员数量"
        },
         {
          prop: "educationStudentCount",
          element: "el-input",
          placeholder: "请输入",
          label: "学历学员数量"
        },
          {
          prop: "pharmacistsCount",
          element: "el-input",
          placeholder: "请输入",
          label: "现有药师数量"
        },
            {
          prop: "examsCount",
          element: "el-input",
          placeholder: "请输入",
          label: "预计考试人数"
        },
          {
          prop: "createGroup",
          element: "el-select",
          placeholder: "请选择",
          label: "是否建群",
          options: [
            {
              label:"是",
              value: true
            },
            {
              label:"否",
              value:false
            }
          ],
          events: {}
        },
            {
          prop: "wechatGroupMemberCount",
          element: "el-input",
          placeholder: "请输入",
          label: "微信群人数",
          hide: true
        },
            {
          prop: "phoneCount",
          element: "el-input",
          placeholder: "请输入",
          label: "获取电话数量"
        },
            {
          prop: "publicClassType",
          element: "el-select",
          placeholder: "请选择",
          label: "公开课类型",
          options: [
            {
              label: "学历",
              value:"EDUCATION"
            },
            {
              label: "药师",
              value:"PHARMACIST"
            },
            {
              label: "医师",
              value:"PHYSICIAN"
            },
          ]
        },

        {
          prop: "enterprisePrincipal",
          element: "el-input",
          placeholder: "请输入企业负责人",
          label: "企业负责人"
        },
        {
          prop: "enterprisePrincipalPhone",
          element: "el-input",
          placeholder: "请输入手机号码",
          label: "手机号码"
        },
        {
          prop: "associationRelations",
          element: "el-input",
          placeholder: "请输入协会关系",
          label: "协会关系"
        },
        {
          prop: "usePharmacyUniversity",
          element: "el-select",
          placeholder: "请选择",
          label: "是否全员使用药店大学平台",
          options: [
            {
              label:"是",
              value: true
            },
            {
              label:"否",
              value:false
            }
          ]
        },
      ],
      addRules: {
        chainName: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        membershipGroup: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        dockingPeople: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        // nextVisitDate: [
        //   { required: true, message: "请选择", trigger: "change" },
        // ],
        dockingPeoplePhone: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: Common._validatorPhone, trigger: "blur" },
        ],
        dockingPeopleJobRank: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        address: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        scaleRanking: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: Common._validatorNonnegative,  trigger: "blur" },
        ],
        storeCount: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: validateStoreCount, trigger: "blur" },
        ],
        employeeCount: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: Common._validatorNonnegative,  trigger: "blur" },
        ],
         cooperationLevel: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        //  studentCount: [
        //   { required: true, message: "请输入", trigger: "blur" },
        // ],
         phoneCount: [
          { required: true, message: "请输入", trigger: "blur" },
          { validator: Common._validatorNonnegative,  trigger: "blur" },
        ],
        pharmacistsStudentCount: [
          { validator: Common._validatorNonnegative,  trigger: "blur" },
        ],
        educationStudentCount: [
          { validator: Common._validatorNonnegative,  trigger: "blur" },
        ],
        pharmacistsCount: [
          { validator: Common._validatorNonnegative,  trigger: "blur" },
        ],
        examsCount: [
          { validator: Common._validatorNonnegative,  trigger: "blur" },
        ],
        wechatGroupMemberCount: [
          { validator: Common._validatorNonnegative,  trigger: "blur" },
        ],
        enterprisePrincipalPhone: [
          { validator: Common._validatorPhone2, message: "手机格式错误", trigger: "blur" },
        ],
      },
      form: {
        chainType: "CHAIN_CUSTOMER"
      },
      rules: {
         chainType: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
      },
      chainTypeArr: [],
      currentData: {},
      currentAddressData: {},
      organizationArr: [],
      provincialSchoolArr: [],
      branchSchoolArr: [],
      followUpUserArr: [],
    }
  },
  props: {
    chainId: {
      type: String | Number,
      default: ""
    },
    addStatus: {
      type: Boolean
    }
  },
  watch: {
    chainId(newVal){
      console.log(newVal,'newval')
      this.getInfo(newVal);
    },
    addStatus(newVal){
      console.log(newVal,'addStatus----')
      
    }
  },
  components: {
      searchMap
  },
  mounted(){
    console.log(this.chainId,'chainid')
    this.getSelectList();
    this.getInfo(this.chainId);
    this.checkAddStatus();
  },
   methods: {
     checkAddStatus(){
       if(this.addStatus){
         //新增
        this.addFormOptions[2].disabled = false;
        this.addFormOptions[3].disabled = false;
        this.addFormOptions[4].disabled = false;
        this.addFormOptions[5].disabled = false;
        this.addFormOptions[6].disabled = false;
      }else {
        // 编辑 禁用组织、校区、分校、跟进人
        this.addFormOptions[2].disabled = true;
        this.addFormOptions[3].disabled = true;
        this.addFormOptions[4].disabled = true;
        this.addFormOptions[5].disabled = true;
        this.addFormOptions[6].disabled = true;
      }
     },
     followSelect(query){
       if (query !== '') {
         this.loading = true;
         this.$fetch("chain_getUserListByStaffName",{
           staffName: query
         }).then(res => {
           this.followOptions = res.data.map(item => ({
             label: item.name,
             value: item.userId
           }))
           this.loading = false;
         })
       }else {
         this.options = [];
       }
     },
     poiPicked(val){
       console.log(val,'valll')
       this.currentAddressData = val;
       if(val.location){
         let location = JSON.parse(JSON.stringify(val.location));
         this.currentAddressData.lat = location.lat;
         this.currentAddressData.lng = location.lng;
         this.$refs.dataForm3.setValue({
          address: val.address
          });
          setTimeout(() => {
            this.$refs['dataForm3'].validateField("address");
          }, 0);
       } 
       
     },
     getInfo(id){
       if(this.addStatus){
         return;
       }
       this.$fetch("chain_getUpdateInfo",{
        chainInfoId: id
      }).then(res => {
          this.currentData = res.data;
          // 下拉赋值
          this.addFormOptions[3].options = [{
            label: this.currentData.provincialSchool,
            value: this.currentData.provincialSchoolId
          }]
          this.addFormOptions[4].options = [{
            label: this.currentData.branchSchool,
            value: this.currentData.branchSchoolId
          }]
           this.addFormOptions[5].options = [{
            label: this.currentData.followUpUser,
            value: this.currentData.followUpUserId
          }]
          this.addFormOptions.forEach(item => {
           item.initValue = res.data[item.prop];
          })
          setTimeout(() => {
            this.$refs.dataForm3.addInitValue();
          }, 0);

          // 地址定位
          this.addressCoordinates = this.currentData.addressCoordinates;
          this.detailAddress = this.currentData.detailAddress;
          this.setPoinit(res.data);
      })
     },
     setPoinit(val){
       console.log(val,'valll---')
       const { addressCoordinates,address,detailAddress,province, city,county,name} = val;
        this.currentAddressData = {
          lat : addressCoordinates.split(",")[1],
          lng : addressCoordinates.split(",")[0],
          address,
          detailAddress,
          pname:province,
          cityname:city,
          adname:county,
          name
        }
     },
     getSelectList(){
       this.$fetch("chain_getChainTypeList").then(res => {
         this.chainTypeArr = res.data.map(item => ({
           label: item.chainTypeName,
           value: item.chainTypeValue
         }))
       });
       this.$fetch("chain_getCampusList",{
         parentId: 0
       }).then(res => {
         this.organizationArr = res.data.map(item => ({
           label: item.campusName,
           value: item.campusId
         }));
         this.addFormOptions[2].options = this.organizationArr;
         this.addFormOptions[2].events = {
           change: this.organizationChange
         }
         this.addFormOptions[20].events = {
           change: this.creatGroupChange
         }
       })
     },
     creatGroupChange(val){
       if(val){
         this.addFormOptions[21].hide = false;
       }else {
         this.addFormOptions[21].hide = true;
       }
     },
      organizationChange(val){
       this.$fetch("chain_getCampusList",{
         parentId: val
       }).then(res => {
         this.provincialSchoolArr = res.data.map(item => ({
           label: item.campusName,
           value: item.campusId
         }));
         this.addFormOptions[3].options = this.provincialSchoolArr;
         this.addFormOptions[3].events = {
           change: this.provincialSchoolChange
         }
        //  清除下级的数据和值
          this.$refs.dataForm3.setValue({
              provincialSchoolId:'',
              branchSchoolId:'',
              followUpUserId:'',
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
         this.addFormOptions[4].options = this.branchSchoolArr;
         this.addFormOptions[4].events = {
           change: this.branchSchoolChange
         }
         //  清除下级的数据和值
          this.$refs.dataForm3.setValue({
              branchSchoolId:'',
              followUpUserId:'',
          })
       })
     },
      branchSchoolChange(val){
        this.$fetch("chain_getUserListByCampusId",{
         campusId: val
       }).then(res => {
         this.followUpUserArr = res.data.map(item => ({
           label: item.name,
           value: item.userId
         }));
         this.addFormOptions[5].options = this.followUpUserArr;
         //  清除下级的数据和值
          this.$refs.dataForm3.setValue({
              followUpUserId:'',
          })
       })
     },
     goBack(){
       this.activeStep--;
     },
     submitType(formName){
       this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.activeStep++;
          } else {
            console.log('error submit!!');
            return false;
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
     submitAddForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
          if(!this.currentAddressData.lat){
            this.$message.error("请对地图进行搜索选点定位")
            return;
          }
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
          const { lat,lng,address,name,pname,cityname,adname,detailAddress } = this.currentAddressData;
          console.log(this.currentAddressData,'this.currentAddressData------')
          this.$fetch(this.addStatus?"chain_add":"chain_update",{
            ...formData,
            address,
            addressCoordinates: [lng,lat].join(","),
            detailAddress: detailAddress ? detailAddress : (pname+cityname+adname+address+(name || '')),
            province:pname,
            city: cityname,
            county:adname,
            chainType: this.form.chainType,
            nextVisitDate: this.$common._formatDates2(formData.nextVisitDate),
            chainId: this.addStatus?"":this.chainId,
            organization,
            provincialSchool,
            branchSchool,
            followUpUser
          }).then(res => {
            this.$message.success("操作成功");
            this.$emit("close");
          })
        }else {
          this.$message.error("请完善信息")
        }
          
      });
    },
    next() {
        if (this.activeStep++ > 1) this.activeStep = 0;
    },
  }
}
</script>

<style lang="scss" scoped>
.creat-chain {
    width: 75%;
    margin: 0 auto;
}
</style>
