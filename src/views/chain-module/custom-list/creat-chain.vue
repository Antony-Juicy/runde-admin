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
          <template slot="address">
            <searchMap @poiPicked="poiPicked"/>
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
export default {
  name:"creat-chain",
  data(){
    return {
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
          prop: "followUpUserId",
          element: "el-input",
          placeholder: "请选择跟进人",
          label: "当前跟进人"
        },
         {
          prop: "dockingPeople",
          element: "el-input",
          placeholder: "请输入",
          label: "对接人"
        },
         {
          prop: "nextVisitDate",
          element: "el-date-picker",
          placeholder: "请选择",
          label: "首次跟进截止时间",
          type: "datetime"
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
              label: "CHAIRMAN",
              value: "CHAIRMAN"
            },
             {
              label: "DIRECTOR",
              value: "DIRECTOR"
            },
             {
              label: "MINISTER",
              value: "MINISTER"
            },
             {
              label: "SUPERVISOR",
              value: "SUPERVISOR"
            },
             {
              label: "COMMISSIONER",
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
          prop: "studentCount",
          element: "el-input",
          placeholder: "请输入学员数量",
          label: "学员数量"
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
          ]
        },
            {
          prop: "wechatGroupMemberCount",
          element: "el-input",
          placeholder: "请输入",
          label: "微信群人数"
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
              label: "EDUCATION",
              value:"EDUCATION"
            },
            {
              label: "PHARMACIST",
              value:"PHARMACIST"
            },
            {
              label: "PHYSICIAN",
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
        nextVisitDate: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        dockingPeoplePhone: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        dockingPeopleJobRank: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        // address: [
        //   { required: true, message: "请输入", trigger: "blur" },
        // ],
        scaleRanking: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        storeCount: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        employeeCount: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
         cooperationLevel: [
          { required: true, message: "请选择", trigger: "change" },
        ],
         studentCount: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
         phoneCount: [
          { required: true, message: "请输入", trigger: "blur" },
        ]
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
      currentAddressData: {}
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
    }
  },
  components: {
      searchMap
  },
  mounted(){
    console.log(this.chainId,'chainid')
    this.getSelectList();
    this.getInfo(this.chainId);
    this.setCurrentPoint();
  },
   methods: {
     setCurrentPoint(){
       
     },
     poiPicked(val){
       console.log(val,'valll')
       this.currentAddressData = val;
       if(val.entr_location){
         let location = JSON.parse(JSON.stringify(val.entr_location));
         this.currentAddressData.lat = location.lat;
         this.currentAddressData.lng = location.lng;
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
          this.addFormOptions.forEach(item => {
           item.initValue = res.data[item.prop];
          })
          setTimeout(() => {
            this.$refs.dataForm3.addInitValue();
          }, 0);

          // 地址定位
  
      })
     },
     getSelectList(){
       this.$fetch("chain_getChainTypeList").then(res => {
         this.chainTypeArr = res.data.map(item => ({
           label: item.chainTypeName,
           value: item.chainTypeValue
         }))
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
     submitAddForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
          if(!this.currentAddressData.lat){
            this.$message.error("请对地图进行搜索选点定位")
            return;
          }
          const { lat,lng,address,name,pname,cityname,adname } = this.currentAddressData;
          this.$fetch("chain_add",{
            ...formData,
            address,
            addressCoordinates: [lng,lat].join(","),
            detailAddress: pname+cityname+adname+address,
            province:pname,
            city: cityname,
            county:adname,
            chainType: this.form.chainType,
            nextVisitDate: this.$common._formatDates2(formData.nextVisitDate)
          }).then(res => {
            this.$message.success("操作成功")
            
          })
        }
          
      });
    },
    next() {
        if (this.activeStep++ > 1) this.activeStep = 0;
    }
  }
}
</script>

<style lang="scss" scoped>
.creat-chain {
    width: 75%;
    margin: 0 auto;
}
</style>
