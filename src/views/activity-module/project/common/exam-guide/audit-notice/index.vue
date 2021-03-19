<template>
  <div class="specialty-container">
    <search-form :formOptions="formOptions" :showNum="7" @onSearch="onSearch"></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd">添加</el-button>
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :pageConfig.sync="pageConfig"
        @select="handleSelect"
        @pageChange="pageChange">
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleDelete(scope.row)" type="text" size="small" style="color: #ec5b56">删除</el-button>
        </template>
      </rd-table> 
      <fullDialog v-model="addVisible" :title="addStatus?'添加':'编辑'" @change="fullDialogChange">
        <div class="w-container" v-if="addVisible">
          <el-form ref="dataForm" :model="noticeForm" label-width="120px">
            <el-form-item 
              label="项目" 
              prop="productName" 
              :rules="[
                  { required: true, message: '请选择', trigger: 'blur' },
                ]">
              <el-select v-model="noticeForm.productName" clearable placeholder="请选择">
                <el-option v-for="item in productList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item 
              label="报考省份/学历" 
              prop="examProvinceId"
              :rules="[
                  { required: true, message: '请选择', trigger: 'blur' },
                ]">
              <el-select v-model="noticeForm.examProvinceId" clearable placeholder="请选择">
                <el-option v-for="item in productList2" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item 
              label="状态" 
              prop="status"
              :rules="[
                  { required: true, message: '请选择', trigger: 'blur' },
                ]">
              <el-radio v-model.trim="noticeForm.status" label="Open">开放</el-radio>
              <el-radio v-model.trim="noticeForm.status" label="Close">未开放</el-radio>
            </el-form-item>
            <el-form-item label="省报名通知">
              <el-button type="primary" size="small" @click="addDomain">点击添加省报名通知</el-button>
            </el-form-item>
            <div class="divList" v-for="(domain, index) in noticeForm.ancillaryGoods" :key="index">
              <el-form-item
                class="mtn"
                :label="'审核时间'"
                :prop="`ancillaryGoods.${index}.provinceCheckTime`"
                :rules="[
                  { required: true, message: '请输入', trigger: 'blur' },
                ]">
                <el-input size="small" v-model="domain.provinceCheckTime" placeholder="请输入活动跳转菜单名称"></el-input>
              </el-form-item>
              <el-form-item
                class="mtn"
                :label="'审核省份'"
                :prop="`ancillaryGoods.${index}.provinceCheckProvince`"
                :rules="[
                  { required: true, message: '请输入', trigger: 'blur' },
                ]">
                <el-input size="small" v-model="domain.provinceCheckProvince" placeholder="请输入活动跳转菜单名称"></el-input>
              </el-form-item>
              <el-form-item
                class="mtn"
                :label="'审核地点'"
                :prop="`ancillaryGoods.${index}.provinceCheckAddress`"
                :rules="[
                  { required: true, message: '请输入', trigger: 'blur' },
                ]">
                <el-input size="small" v-model="domain.provinceCheckAddress" placeholder="请输入活动跳转菜单名称"></el-input>
              </el-form-item>
              <el-form-item
                class="mtn"
                :label="'审核材料'"
                :prop="`ancillaryGoods.${index}.provinceCheckMaterials`"
                :rules="[
                  { required: true, message: '请输入', trigger: 'blur' },
                ]">
                <el-input size="small" type="textarea" v-model="domain.provinceCheckMaterials" placeholder="请输入活动跳转菜单名称"></el-input>
              </el-form-item>
              <el-form-item
                class="mtn"
                :label="'审核提醒'"
                :prop="`ancillaryGoods.${index}.provinceCheckNotification`"
                :rules="[
                  { required: true, message: '请输入', trigger: 'blur' },
                ]">
                <el-input size="small" type="textarea" v-model="domain.provinceCheckNotification" placeholder="请输入活动跳转菜单名称"></el-input>
              </el-form-item>
              <el-button style="margin-left: 20px;height:40px;" type="danger" size="small" @click.prevent="removeDomain(domain)">删除</el-button>
            </div>
            <el-form-item label="市报名通知">
              <el-button type="primary" size="small" @click="addCityDomain">点击添加市报名通知</el-button>
            </el-form-item>
            <div class="divList" v-for="(domain, index) in noticeForm.citySign" :key="'city'+index">
              <el-form-item
                class="mtn"
                :label="'审核时间'"
                :prop="'citySign.' + index + '.cityCheckTime'"
                :rules="[
                  { required: true, message: '请输入', trigger: 'blur' },
                ]">
                <el-input size="small" v-model="domain.cityCheckTime" placeholder="请输入活动跳转菜单名称"></el-input>
              </el-form-item>
              <el-form-item
                class="mtn"
                :label="'审核省份'"
                :prop="'citySign.' + index + '.cityCheckCity'"
                :rules="[
                  { required: true, message: '请输入', trigger: 'blur' },
                ]">
                <el-input size="small" v-model="domain.cityCheckCity" placeholder="请输入活动跳转菜单名称"></el-input>
              </el-form-item>
              <el-form-item
                class="mtn"
                :label="'审核地点'"
                :prop="'citySign.' + index + '.cityCheckAddress'"
                :rules="[
                  { required: true, message: '请输入', trigger: 'blur' },
                ]">
                <el-input size="small" v-model="domain.cityCheckAddress" placeholder="请输入活动跳转菜单名称"></el-input>
              </el-form-item>
              <el-form-item
                class="mtn"
                :label="'审核材料'"
                :prop="'citySign.' + index + '.cityCheckMaterials'"
                :rules="[
                  { required: true, message: '请输入', trigger: 'blur' },
                ]">
                <el-input size="small" type="textarea" v-model="domain.cityCheckMaterials" placeholder="请输入活动跳转菜单名称"></el-input>
              </el-form-item>
              <el-form-item
                class="mtn"
                :label="'审核提醒'"
                :prop="'citySign.' + index + '.cityCheckNotification'"
                :rules="[
                  { required: true, message: '请输入', trigger: 'blur' },
                ]">
                <el-input size="small" type="textarea" v-model="domain.cityCheckNotification" placeholder="请输入活动跳转菜单名称"></el-input>
              </el-form-item>
              <el-button style="margin-left: 50px;height:40px;" type="danger" size="small" @click.prevent="removeCityDomain(domain)">删除</el-button>
            </div>
          </el-form>
          <div class="btn-bottom">
            <el-button type="primary" @click="fullDialogChange(false)">返回</el-button>
            <el-button type="primary" :loading="btnLoading" @click="submitAdd('dataForm')">保存</el-button>
          </div>
        </div>
      </fullDialog>
    </div>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import fullDialog from '@/components/FullDialog';
export default {
  name:"audit-notice",
  components:{
    RdForm,
    fullDialog
  },
  data(){
    return {
      formOptions: [
        {
          prop: "productName",
          element: "el-select",
          placeholder: "请选择项目",
          options: []
        },
        {
          prop: "examProvinceId",
          element: "el-select",
          placeholder: "请选择报考省份",
          options: []
        }
      ],
      searchForm: {},
      emptyText: "暂无数据",
      fixedTwoRow: true,
      tableData: [
        
      ],
      tableKey: [
        {
          name: "主键id",
          value: "id",
          width: 80
        },
        {
          name: "项目",
          value: "productName1",
           width: 140
        },
        {
          name: "报考省份id",
          value: "examProvinceId",
          width: 50
        },
        {
          name: "审核通知详情json",
          value: "detail",
          showTooltip: true
        },
        {
          name: "排序",
          value: "orderValue",
          width: 50
        },
        {
          name: "状态",
          value: "status",
          width: 80
        },
        {
          name: "创建时间",
          value: "createAt",
          width: 140
        },
        {
          name: "更新时间",
          value: "updateAt",
           width: 140
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
        showCount: 10,
      },

      loading: false,
      btnLoading: false,

      addStatus: true,
      addVisible: false,
      noticeForm: {
        status: '',
        productName:'',
        examProvinceId:'',
        ancillaryGoods: [
          {
            provinceCheckTime: '',
            provinceCheckProvince: '',
            provinceCheckAddress: '',
            provinceCheckMaterials: '',
            provinceCheckNotification: ''
          }
        ],
        citySign: [
          {
            cityCheckTime: '',
            cityCheckCity: '',
            cityCheckAddress: '',
            cityCheckMaterials: '',
            cityCheckNotification: ''
          }
        ],
        
      },
      productList: [],
        productList2: [],
        editId:""
    }
  },
  mounted () {
    this.getTableData()
  },
  methods: {
    onSearch(val){
       this.searchForm = {
        ...val
      };
      this.pageConfig.pageNum = 1;
      this.getTableData();
      console.log(val,this.searchForm , 'val---')
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    getTableData(params = {}) {
      this.$fetch("cmsexamchecknotification_listJsp", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        this.tableData = res.data.varList.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          let obj1 = res.data.productList.find(ele => ele.key == item.productName);
          item.productName1 = obj1&&obj1.value;
          item.provinceType1 = item.provinceType == "province" ? "省份" : "学历";
          return item;
        });

        this.productList = res.data.productList.map(item => ({
          label: item.value,
          value: item.key
        }));
        this.provinceList = res.data.provinceList.map(item => ({
          label: item.provinceName,
          value: item.id
        }));
        this.pageConfig.totalCount = res.data.page.totalResult;

        this.productList2 = res.data.provinceList.map(item => {
           let obj1 = res.data.productList.find(ele => ele.key == item.productName);
          return {
          label: `${item.provinceName}(${obj1&&obj1.value})`,
          value: item.id
        }
        });
        // 给添加弹窗的下拉赋值
        // this.addFormOptions[0].options = this.productList;
        // 给搜索栏下拉赋值
        this.formOptions[0].options = this.productList;
        this.formOptions[1].options = this.provinceList;

      });
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
      this.noticeForm.ancillaryGoods = []
      this.noticeForm.citySign = []
    },

    handleEdit(data){
      this.addStatus = false;
      this.addVisible = true;
      this.editId = data.id;
      this.$fetch("cmsexamchecknotification_goEdit",{
        id: data.id
      }).then(res => {
        const { province, city, pd } = res.data;
        if(province){
          if(province instanceof Array) {
            this.noticeForm.ancillaryGoods = province
          }else {
            this.noticeForm.ancillaryGoods = [province]
          }
        }else {
          this.noticeForm.ancillaryGoods = []
        }

        if(city){
          if(city instanceof Array) {
            this.noticeForm.citySign = city
          }else {
            this.noticeForm.citySign = [city]
          }
        }else {
          this.noticeForm.citySign = []
        }
        // this.noticeForm.ancillaryGoods = province;
        // this.noticeForm.citySign = city;
        this.noticeForm.productName = pd.productName;
        this.noticeForm.examProvinceId = pd.examProvinceId;
        this.noticeForm.status = pd.status;
      })
    },

    fullDialogChange(val){
      this.addVisible = val;
      this.$refs["dataForm"].resetFields();
    },

    removeDomain(item) {
      var index = this.noticeForm.ancillaryGoods.indexOf(item)
      if (index !== -1) {
        this.noticeForm.ancillaryGoods.splice(index, 1)
      }
    },
    addDomain() {
      this.noticeForm.ancillaryGoods.push({
            provinceCheckTime: '',
            provinceCheckProvince: '',
            provinceCheckAddress: '',
            provinceCheckMaterials: '',
            provinceCheckNotification: ''
          });
    },
    removeCityDomain(item) {
      var index = this.noticeForm.citySign.indexOf(item)
      if (index !== -1) {
        this.noticeForm.citySign.splice(index, 1)
      }
    },
    addCityDomain() {
      this.noticeForm.citySign.push({
            cityCheckTime: '',
            cityCheckCity: '',
            cityCheckAddress: '',
            cityCheckMaterials: '',
            cityCheckNotification: ''
          });
    },
    handleDelete(row) {
      let info = '项';
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$fetch("cmsexamchecknotification_deleteJsp", {
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
    submitAdd(formName){
      
      this.$refs[formName].validate((valid) => {
        console.log(this.noticeForm,'noticeForm')
          if (valid) {
            
            const {productName,examProvinceId,status,ancillaryGoods,citySign} = this.noticeForm;
            let data = {
              productName,
              examProvinceId,
              status,
              provinceCheckList: ancillaryGoods,
              cityCheckList: citySign,
              id:this.addStatus?"": this.editId
            }
            
            console.log(data,'data---')
            this.$fetch(this.addStatus?"cmsexamchecknotification_save":"cmsexamchecknotification_editJsp",data).then(res => {
              this.$message.success("操作成功")
              setTimeout(() => {
                this.addVisible = false;
                this.$refs["dataForm"].resetFields();
                this.getTableData();
              }, 50);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.specialty-container {
  /deep/ {
    .el-form-item {
      // margin-bottom: 0; 
    }
    .el-form-item__content {
      width: 400px;
    }
  }
  .divList {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
  .mtn {
    // margin-bottom: 5px; 
  }
  .btn-bottom {
    width: 50%;
    margin-left: 74.5%;
  }
}
</style>
