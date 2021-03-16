<template>
  <div class="primary-line">
    <search-form
      :formOptions="newFormOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
    <div class="main-wrapper">
      <div class="btn-wrapper">
        <el-button type="warning" size="small" @click="handleDistribute"
          >分配</el-button
        >
        <el-button type="info" size="small" @click="handleAdd"
          >AI呼叫</el-button
        >
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig.sync="pageConfig"
        :multiple="true"
        fixedTwoRow
        highlight-current-row
        @pageChange="pageChange"
        @select="handelSelect"
      >
      <template slot="phone" slot-scope="scope">
           {{$common.hidePhone(scope.row.phone)}}
        </template>
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click="handleDelete(scope.row)"
            type="text"
            size="small"
            style="color: #ec5b56"
            >删除</el-button
          >
        </template>
      </rd-table>

      <!-- 分配弹窗 -->
       <rd-dialog
        :title="'分配机会'"
        :dialogVisible="distributeVisible"
        :showFooter="false"
        :width="'400px'"
        @handleClose="distributeVisible = false"
      >
      <template v-if="distributeVisible">
        <el-select v-model="campusValue" placeholder="请选择" filterable>
          <el-option
            v-for="item in campusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </template>
        <div class="btn">
          <el-button size="small" type="warning" @click="distributeSubmit">分配</el-button>
        </div>
      </rd-dialog>
    </div>
  </div>
</template>

<script>
let id = 0;
export default {
  name: "temp2",
  data() {
    return {
      opportunityIds:"",
      newFormOptions: [
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "跟进老师",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "注册人",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "机会状态",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "姓名",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "手机",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "省份",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "城市",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "学历",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "机会来源",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "组织架构",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "跟进次数",
        },
        // 课程
        {
          prop: "abc",
          element: "el-cascader",
          placeholder: "课程",
          initWidth: true,
        },
        // 时间
        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "最近跟进时间(开始)",
          endPlaceholder: "最近跟进时间(结束)",
          initWidth: true,
        },
        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "创建时间(开始)",
          endPlaceholder: "创建时间(结束)",
          initWidth: true,
        },
        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "进入公海时间(开始)",
          endPlaceholder: "进入公海时间(结束)",
          initWidth: true,
        },
      ],
       tableData: [
      ],
      tableKey: [
          {
          name: "ID",
          value: "id",
          width: 80
        },
        {
          name: "姓名",
          value: "studentName",
        },
         {
          name: "手机号码",
          value: "phone",
          operate: true
        },
        {
          name: "学历",
          value: "eduBackground"
        },
        {
          name: "咨询项目",
          value: "enquireProductNameOne",
        },
        {
          name: "咨询科目",
          value: "enquireSubjectNameOne"
        },
        {
          name: "咨询班型",
          value: "enquireClassOne"
        },
        {
          name: "跟进次数",
          value: "feedbackCount",
        },
        {
          name: "跟进状态",
          value: "status",
        },
        {
          name: "跟进老师",
          value: "marketName",
        },
        {
          name: "最近跟进",
          value: "recentFeedbackTime",
        },
        {
          name: "创建时间",
          value: "createAt",
        },
        {
          name: "进入公海时间",
          value: "campusPoolTime",
        },
        {
          name: "机会来源",
          value: "saleSource",
        },
        {
          name: "分校/战队",
          value: "campusName",
        },
        {
          name: "省份",
          value: "phoneProvince",
        },
         {
          name: "城市",
          value: "phoneCity",
        },
         {
          name: "地址",
          value: "address",
        },
         {
          name: "赛道",
          value: "opportunityCampusNature",
        },
      ],
      pageConfig: {
        totalCount: 0,
       currentPage: 1,
        showCount: 10,
      },
      selectedData:[],
      distributeVisible: false,
      campusOptions: [],
        campusValue: '',
        searchForm: {}
    };
  },
  props:{
    formOptions: {
      type: Array,
      default:()=>[]
    }
  },
  watch:{
    formOptions(newVal){
      console.log(newVal,'newww')
      this.newFormOptions = newVal;
      this.campusOptions = this.newFormOptions[9].options;
    }
  },
   mounted() {
    this.getTableData();
  },
  methods: {
    distributeSubmit(){
      if(!this.campusValue){
        this.$message.warning("请选择校区")
        return;
      }
      let campusName = this.campusOptions.find(item => (item.value == this.campusValue)).label;
      this.$fetch("chance_province_distribute",{
        campusId: this.campusValue,
        opportunityIds: this.opportunityIds,
        campusName
      }).then(res => {
        if(res.code == 200){
          this.$message.success("操作成功")
          this.distributeVisible = false;
        }
      })
    },
    handleAdd(){

    },
    onSearch(val) {
      if (val.product && val.product.length > 0) {
        this.searchForm = {
          ...val,
          enquireProductIdOne: val.product[0],
          enquireSubjectIdOne: val.product[1],
          enquireCourseIdOne: val.product[2],
          createAt: val.createAt ? val.createAt.join("~") : "",
          updateAt: val.updateAt ? val.updateAt.join("~") : "",
          campusPoolTime: val.campusPoolTime
            ? val.campusPoolTime.join("~")
            : "",
        };
      } else {
        this.searchForm = {
          ...val,
          createAt: val.createAt ? val.createAt.join("~") : "",
          updateAt: val.updateAt ? val.updateAt.join("~") : "",
          campusPoolTime: val.campusPoolTime
            ? val.campusPoolTime.join("~")
            : "",
        };
      }

      this.getTableData();
    },
     pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    handelSelect(val) {
      console.log(val, "valll");
      this.selectedData = val;
    },
    handleDistribute(){
      if (!this.selectedData.length) {
        this.$message.warning("请勾选要分配的机会！");
        return;
      }
      this.opportunityIds = this.selectedData.map(item=>(item.idStr)).join(",");
      this.distributeVisible = true;
    },
    getTableData(params = {}) {
      this.$fetch("chance_province_list", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
        // token:"123",
        opportunityCampusNature: "OffLine",
      }).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          item.recentFeedbackTime = this.$common._formatDates(item.recentFeedbackTime);
          item.campusPoolTime = this.$common._formatDates(item.campusPoolTime);
          item.enquireClassOne = item.enquireClassOne && item.enquireClassOne.map(item=>(item.name)).join(",");
          return item;
        });
        this.pageConfig.totalCount = res.data.count;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.primary-line {
    .main-wrapper {
        padding: 0 15px;
    }
    .search-form-box {
        // border-bottom: 1px solid #E4E7ED;
    }
    .btn {
      text-align: right;
      margin-top: 20px;
    }
}
</style>
