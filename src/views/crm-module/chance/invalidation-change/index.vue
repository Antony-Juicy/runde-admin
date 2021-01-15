<template>
  <div class="Invalidationchange_container">
    <search-form :formOptions = "formOptions" :showNum="showNum" @onSearch = onSearch></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="openDetect">质检</el-button>
        <!-- <el-button size="small" @click="openDrawer">抽屉1</el-button> -->
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :multiple="true"
        :pageConfig="pageConfig"
        @select="handleSelect"
        @pageChange="pageChange"
      >
      </rd-table>
      <rd-dialog
        :title="detectStatus ? '质检' : '质检详情'"
        :dialogVisible="detectVisible"
        :width="widthNew"
        @handleClose="closeDetect('dataForm')"
        @submitForm="submitForm('dataForm')"
      >
        <el-form ref="dataForm" :model="detectForm" label-width="100px">
          <el-form-item label="机会失效">
            <el-radio-group v-model="detectForm.resource">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="失效原因" v-if="detectForm.resource !== 1 " prop="region">
            <el-select v-model="detectForm.region" placeholder="请选择失效原因">
              <el-option label="无法核实" value="0"></el-option>
              <el-option label="无法联系" value="1"></el-option>
              <el-option label="否认咨询" value="2"></el-option>
              <el-option label="已报名" value="3"></el-option>
              <el-option label="公司内部人员" value="4"></el-option>
              <el-option label="已从支线成交" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="质检详情" prop="detail">
            <el-input
              v-model.trim="detectForm.detail"
              autocomplete="off"
              type="textarea"
              placeholder="请输入详情"
            />
          </el-form-item>
        </el-form>
      </rd-dialog>
      <rd-drawer :dialogVisible="dialogVisible" :size="drawerSize" @handleClose="closeDrawer()"></rd-drawer>
    </div>
  </div>
</template>

<script>
import rdDrawer from '@/components/RdDrawer';
export default {
  name:'invalidation-change',
  components: {
    rdDrawer
  },
  data () {
    return {
      showNum: 6,
      searchForm: {},
      formOptions: [
        {
          prop: 'studentName',
          element: 'el-input',
          initValue: '',
          placeholder: '请输入学员姓名',
        },
        {
          prop: 'phone',
          element: 'el-input',
          initValue: '',
          placeholder: '请输入学员手机',
        },
        {
          prop: 'project',
          element: 'el-select',
          initValue: '',
          placeholder: '请选择项目',
        },
        {
          prop: 'eduBackground',
          element: 'el-select',
          initValue: '',
          placeholder: '请选择学历',
        },
        {
          prop: 'invalidReason',
          element: 'el-select',
          initValue: '',
          placeholder: '请选择失效原因',
        },
        {
          prop: 'zjstatus',
          element: 'el-select',
          initValue: '',
          placeholder: '请选择是否质检',
        },
        {
          prop: 'marketName',
          element: 'el-input',
          initValue: '',
          placeholder: '请输入归属销售',
        },
        {
          prop: 'campusName',
          element: 'el-select',
          initValue: '',
          placeholder: '请选择组织架构',
        },
        {
          prop: 'updateAt',
          element: 'el-date-picker',
          startPlaceholder: "失效时间(开始)",
          endPlaceholder: "失效时间(结束)"
        }
      ],
      tableData: [],
      tableKey: [
        { name: '机会ID',value: 'id',sortable: true ,width: 100},
        { name: '姓名',value: 'studentName' },
        { name: '手机号码',value: 'phone',width: 100 },
        { name: '跟进次数',value: 'feedbackCount' },
        { name: '创建时间',value: 'createAt',width:132 },
        { name: '失效时间',value: 'updateAt',width:132 },
        { name: '失效原因',value: 'invalidReason' },
        { name: '备注',value: 'remark' },
        { name: '机会状态',value: 'status' },
        { name: '归属销售',value: 'marketName' },
        { name: '分校/战队',value: 'campusName',width:132 },
        { name: '质检状态',value: 'zjstatus' },
      ],
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,

      // 质检弹窗参数
      widthNew: "600px",
      detectVisible: false,
      detectStatus: true, // 状态：true 质检 false 质检详情
      detectForm: {
        resource: 0,
        region: '',
        detail: ''
      },


      // 回访抽屉参数
      dialogVisible: false,
      drawerSize: '50%'
    }
  },
  mounted(){
    this.getTableData();
  },
  methods: {
    onSearch(val) {
      this.searchForm = {...val};
      this.getTableData();
      console.log(val,this.searchForm , 'val---')
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },

    // 质检
    openDetect() {
      this.detectVisible = true;
    },
    closeDetect(formName) {
      this.detectVisible = false;
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      console.log(this.detectForm, 666);
      this.closeDetect("dataForm")
    },

    // 抽屉
    openDrawer(rows) {
      this.dialogVisible = true;
      console.log(this.dialogVisible, 666)
    },
    closeDrawer(formName) {
      this.dialogVisible = false;
      // this.$refs[formName].resetFields();
    },

    getTableData(params = {}) {
      const loading = this.$loading({
        lock: true,
        target: ".el-table",
      });
      this.$fetch("chance_invalid_list", {
        invalidStatus:"Invalid",
        // stayModule:"Lost",
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          item.phone = item.phone&&this.$common.hidePhone(item.phone);
          return item;
        });
        this.pageConfig.totalCount = res.data.count;
        setTimeout(() => {
          loading.close();
        }, 200);
      });
    },
  }
}
</script>

<style lang='scss' scoped>
.Invalidationchange_container {
  .btn-wrapper {
    margin-bottom: 8px;
  }
}
</style>