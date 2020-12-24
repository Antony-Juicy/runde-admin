<template>
  <div class="callrecordscount_container">
    <div class="w-container">
      <el-row :gutter="5">
        <el-col :span="4">
          <el-select v-model="campusName" filterable placeholder="请选择部门">
            <el-option
              v-for="item in campusNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="callType" filterable placeholder="请选择呼叫方式" @change="selectOne">
            <el-option
              v-for="item in callOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div class="mt-15 w-container">
      <div class="card-wrapper">
        <el-row :gutter="12">
          <el-col :span="4">
            <el-card shadow="hover">
              <div class="call-total">
                <div class="call-title">机会持有总数(个)</div>
                <div class="call-content">0</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover">
              <div class="call-total">
                <div class="call-title">今日有效呼叫数(个)</div>
                <div class="call-content">0</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover">
              <div class="call-total">
                <div class="call-title">今日呼叫数(个)</div>
                <div class="call-content">0</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover">
              <div class="call-total">
                <div class="call-title">未接通(个)</div>
                <div class="call-content">0</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover">
              <div class="call-total">
                <div class="call-title">呼叫总时长(s)</div>
                <div class="call-content">0</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover">
              <div class="call-total">
                <div class="call-title">平均时长(s)</div>
                <div class="call-content">0</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="mt-15 w-container">
      <search-form :formOptions = "formOptions" @onSearch = onSearch></search-form>
      <el-button type="primary" size="small" @click="openChanceNum">详情弹窗</el-button>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :pageConfig="pageConfig"
        :tbodyHeight="600"
        @select="handleSelect"
        @pageChange="pageChange"
      >
        <template slot="opportunityNum" slot-scope="scope">
          <el-button @click="handleNumbel(scope.row)" type="default" size="small">{{scope.row.opportunityNum}}</el-button>
        </template>
      </rd-table>
      <rd-dialog
        :title="chanceStatus ? '的机会详情' : ''"
        :dialogVisible="chanceVisible"
        :width="widthNew"
        @handleClose="closeChanceNum('dataForm')"
        @submitForm="submitForm('dataForm')">
        <search-form :formOptions = "formChanceOptions" @onSearch = onSearch></search-form>
        <el-button size="small" @click="openDrawer">抽屉</el-button>
        <rd-table
          :tableData="tableChanceData"
          :tableKey="tableChanceKey"
          :loading="loading"
          :fixedTwoRow="fixedTwoRow"
          :pageConfig="pageConfig"
          :filterColumn="true"
          :tbodyHeight="600"
          @select="handleSelect"
          @pageChange="pageChange">
        </rd-table>
      </rd-dialog>
      <rd-drawer :dialogVisible="drawerVisible" :size="drawerSize" @handleClose="closeDrawer()"></rd-drawer>
    </div>
  </div>
</template>

<script>
import searchForm from '@/components/Searchform';
import rdDrawer from '@/components/RdDrawer';
export default {
  name:'callrecords-count',
  components: {
    searchForm,
    rdDrawer
  },
  data () {
    return {
      campusName: '',
      campusNameOptions: [],
      callType: '0',
      callOptions: [
        { value: "0", label: "全部" },
        { value: "1", label: "手机外呼" },
        { value: "2", label: "在线外呼（总部）" },
        { value: "3", label: "在线外呼（分校）" },
        { value: "4", label: "一键回呼" }
      ],
      showNum: 4,
      searchForm: {},
      formOptions: [
        { prop: 'campus_name', element: 'el-input', initValue: '', placeholder: '请输入姓名' },
        { prop: 'campus_name', element: 'el-input', initValue: '', placeholder: '请输入职位' },
        { prop: 'campus_name', element: 'el-input', initValue: '', placeholder: '请输入手机号码' },
      ],
      tableData: [],
      tableKey: [
        { name: 'ID',value: 'id' },
        { name: '姓名',value: 'staffName' },
        { name: '职位',value: 'positionName' },
        { name: '分校',value: 'campusName' },
        { name: '手机号码',value: 'staffPhone' },
        { name: '机会持有数量',value: 'opportunityNum' },
        { name: '状态',value: 'status',operate: true,width: 120 }
      ],
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,

      // 机会持有数量弹窗参数
      widthNew: '90%',
      chanceStatus: true,
      chanceVisible: false,
      formChanceOptions: [
        { prop: 'chanceType', element: 'el-select', initValue: '', placeholder: '机会类型' },
        { prop: 'studentName', element: 'el-input', initValue: '', placeholder: '学生姓名' },
        { prop: 'studentPhone', element: 'el-input', initValue: '', placeholder: '学生手机' },
        { prop: 'labelInfoName', element: 'el-input', initValue: '', placeholder: '活动名称' },
        { prop: 'enquireProductNameOne', element: 'el-select', initValue: '', placeholder: '请选择咨询项目' },
        { prop: 'enquireSubjectNameOne', element: 'el-select', initValue: '', placeholder: '请先选择咨询项目' },
        { prop: 'customerClassify', element: 'el-select', initValue: '', placeholder: '客户分类' },
        { prop: 'saleSource', element: 'el-select', initValue: '', placeholder: '销售来源' },
        { prop: 'eduBackground', element: 'el-select', initValue: '', placeholder: '学历' },
        { prop: 'status', element: 'el-select', initValue: '', placeholder: '机会状态' } 
      ],
      tableChanceData: [],
      tableChanceKey:[
        { name: '机会ID',value: 'id',operate: true,fixed: "left" },
        { name: '姓名',value: 'studentName',operate: true,fixed: "left" },
        { name: '手机号',value: 'phone' },
        { name: '校区名',value: 'campusName' },
        { name: '机会截止',value: 'recoveryTime' },
        { name: '回访',value: 'feedbackCount' },
        { name: '微信',value: 'wechat' },
        { name: '性别',value: 'gender' },
        { name: '跟进老师',value: 'marketName' },
        { name: '学历',value: 'eduBackground' },
        { name: '咨询项目',value: 'enquireProductNameOne' },
        { name: '咨询科目',value: 'enquireSubjectNameOne' },
        { name: '咨询班型',value: 'enquireClassOne' },
        { name: '意向内容',value: 'intention' },
        { name: '客户等级',value: 'customerLevel' },
        { name: '机会来源',value: 'saleSource' },
        { name: '活动名称',value: 'labelInfoName' },
        { name: '备注',value: 'remark' },
        { name: '最近回访内容',value: 'recentFeedbackContent',operate: true,width: 120 },
        { name: '最近回访时间',value: 'recentFeedbackTime',operate: true,width: 120 },
        { name: '下次回访时间',value: 'nextFeedBackTime',operate: true,width: 120 },
        { name: '分配时间',value: 'allotTime' },
        { name: '状态',value: 'invalidStatus' },
        { name: '跟进状态',value: 'status' },
        { name: '创建时间',value: 'createAt' },
        { name: '赛道',value: 'opportunityCampusNature',operate: true,fixed: "right" },
      ],
      
      // 回访抽屉参数
      drawerVisible: false,
      drawerSize: '50%'
    }
  },
  methods: {
    selectOne(value) {
      console.log(value, 888)
    },
    onSearch(val) {
      this.searchForm = {...val};
      console.log(val,this.searchForm , 'val---')
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    pageChange(val) {
      console.log(val,'pagechange')
    },
    handleNumbel() {
      console.log(6666)
    },

    // 机会拥有数量详情
    openChanceNum() {
      this.chanceVisible = true;
    },
    closeChanceNum(formName) {
      this.chanceVisible = false;
    },
    submitForm() {
      console.log(666);
      this.closeChanceNum("dataForm")
    },

    // 抽屉
    openDrawer(rows) {
      this.drawerVisible = true;
      console.log(this.drawerVisible, 666)
    },
    closeDrawer(formName) {
      this.drawerVisible = false;
      // this.$refs[formName].resetFields();
    },
  }
}
</script>

<style lang="scss" scoped>
.callrecordscount_container {
  .card-wrapper {
    display: flex;
    & > div {
      flex: 1;
    }
    .call-total {
      .call-title {
        font-size: 12px;
        color: #999;
      }
      .call-content {
        font-size: 30px;
        font-weight: 300;
        color: #ff5722;
      }
    }
    /deep/ {
      .el-card__body {
        background-color: #f8f8f8;
        border: none;
      }
      
    }
  }
  /deep/ {
    .el-dialog {
      .el-dialog__header {
        padding: 23px 23px 10px 23px;
      }
      .el-dialog__body {
        padding: 10px 20px;
        .search-box-wrapper {
          padding: 0;
        }
      }
    }
  }
}
</style>