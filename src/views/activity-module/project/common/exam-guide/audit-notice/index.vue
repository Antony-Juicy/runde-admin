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
      </rd-table>
      <fullDialog v-model="addVisible" title="审核通知标题标题标题标题标题标题标题标题标题标题" @change="fullDialogChange">
        <div class="w-container" v-if="addVisible">
          <el-form ref="dataForm" :model="noticeForm" label-width="120px">
            <el-form-item label="项目" prop="project">
              <el-select v-model="noticeForm.project" clearable placeholder="请选择">
                <!-- <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="报考省份/学历" prop="province">
              <el-select v-model="noticeForm.province" clearable placeholder="请选择">
                <!-- <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="status">
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
                :prop="'ancillaryGoods.' + index + '.value'">
                <el-input v-model="domain.value1" placeholder="请输入活动跳转菜单名称"></el-input>
              </el-form-item>
              <el-form-item
                class="mtn"
                :label="'审核省份'"
                :prop="'ancillaryGoods.' + index + '.value'">
                <el-input v-model="domain.value2" placeholder="请输入活动跳转菜单名称"></el-input>
              </el-form-item>
              <el-form-item
                class="mtn"
                :label="'审核地点'"
                :prop="'ancillaryGoods.' + index + '.value'">
                <el-input v-model="domain.value3" placeholder="请输入活动跳转菜单名称"></el-input>
              </el-form-item>
              <el-form-item
                class="mtn"
                :label="'审核材料'"
                :prop="'ancillaryGoods.' + index + '.value'">
                <el-input type="textarea" v-model="domain.value4" placeholder="请输入活动跳转菜单名称"></el-input>
              </el-form-item>
              <el-form-item
                class="mtn"
                :label="'审核提醒'"
                :prop="'ancillaryGoods.' + index + '.value'">
                <el-input type="textarea" v-model="domain.value5" placeholder="请输入活动跳转菜单名称"></el-input>
              </el-form-item>
              <el-button style="margin-left: 20px;height:40px;" type="danger" size="small" @click.prevent="removeDomain(domain)">删除</el-button>
            </div>
            <el-form-item label="市报名通知">
              <el-button type="primary" size="small" @click="addDomain">点击添加市报名通知</el-button>
            </el-form-item>
            <div class="divList" v-for="(domain, index) in noticeForm.citySign" :key="index">
              <el-form-item
                class="mtn"
                :label="'审核时间'"
                :prop="'citySign.' + index + '.value'">
                <el-input v-model="domain.value1" placeholder="请输入活动跳转菜单名称"></el-input>
              </el-form-item>
              <el-form-item
                class="mtn"
                :label="'审核省份'"
                :prop="'citySign.' + index + '.value'">
                <el-input v-model="domain.value2" placeholder="请输入活动跳转菜单名称"></el-input>
              </el-form-item>
              <el-form-item
                class="mtn"
                :label="'审核地点'"
                :prop="'citySign.' + index + '.value'">
                <el-input v-model="domain.value3" placeholder="请输入活动跳转菜单名称"></el-input>
              </el-form-item>
              <el-form-item
                class="mtn"
                :label="'审核材料'"
                :prop="'citySign.' + index + '.value'">
                <el-input type="textarea" v-model="domain.value4" placeholder="请输入活动跳转菜单名称"></el-input>
              </el-form-item>
              <el-form-item
                class="mtn"
                :label="'审核提醒'"
                :prop="'citySign.' + index + '.value'">
                <el-input type="textarea" v-model="domain.value5" placeholder="请输入活动跳转菜单名称"></el-input>
              </el-form-item>
              <el-button style="margin-left: 50px;height:40px;" type="danger" size="small" @click.prevent="removeDomain(domain)">删除</el-button>
            </div>
          </el-form>
          <div class="btn-bottom">
            <el-button type="primary" @click="fullDialogChange(false)">返回</el-button>
            <el-button type="primary" :loading="btnLoading" >保存</el-button>
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
          prop: "menuName",
          element: "el-select",
          placeholder: "请选择项目",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "请选择报考省份",
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
          value: "staffName",
          width: 80
        },
        {
          name: "项目",
          value: "staffName",
        },
        {
          name: "报考省份id",
          value: "staffName"
        },
        {
          name: "审核通知详情json",
          value: "staffName",
        },
        {
          name: "排序",
          value: "staffName",
          width: 80
        },
        {
          name: "状态",
          value: "staffName"
        },
        {
          name: "创建时间",
          value: "posterCopySecond",
        },
        {
          name: "更新时间",
          value: "posterCopyThird",
        },
        {
          name: "操作",
          value: "staffName",
        }
      ],
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
      },

      loading: false,
      btnLoading: false,

      addStatus: true,
      addVisible: false,
      noticeForm: {
        project: '',
        province: '',
        status: '',
        ancillaryGoods: [
          {
            value1: '',
            value2: '',
            value3: '',
            value4: '',
            value5: ''
          }
        ],
        citySign: [
          {
            value1: '',
            value2: '',
            value3: '',
            value4: '',
            value5: ''
          }
        ],
      }
    }
  },
  mounted () {
    // this.getTableData()
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
    getTableData(){
      console.log('信息的页面')
    },
    pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    handleAdd(){
      this.addVisible = true;
      this.noticeForm.ancillaryGoods = []
      this.noticeForm.citySign = []
    },

    fullDialogChange(val){
      this.addVisible = val;
      // this.$refs[formName].resetFields();
    },

    removeDomain(item) {
      var index = this.noticeForm.ancillaryGoods.indexOf(item)
      if (index !== -1) {
        this.noticeForm.ancillaryGoods.splice(index, 1)
      }
    },
    addDomain() {
      this.noticeForm.ancillaryGoods.push({
        value: '',
        num: '',
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
        value: '',
        num: '',
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
    margin-bottom: 5px; 
  }
  .btn-bottom {
    width: 50%;
    margin-left: 7.5%;
  }
}
</style>
