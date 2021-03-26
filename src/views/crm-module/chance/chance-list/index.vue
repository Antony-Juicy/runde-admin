<template>
  <div class="chancelist_container">
    <search-form :formOptions = "formOptions" :showNum="showNum" @onSearch = onSearch></search-form>
    <div class="w-container">
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :pageConfig.sync="pageConfig"
        :filterColumn="true"
        :tbodyHeight="650"
        @select="handleSelect"
        @pageChange="pageChange"
      >
         <template slot="feedbackCount" slot-scope="scope">
            <span class="visit-container" @click.stop="openDrawer(scope.row)">{{
              scope.row.feedbackCount || 0
            }}</span>
          </template>
          <!-- 手机号 -->
          <template slot="phone" slot-scope="scope">
            {{ $common.hidePhone(scope.row.phone) }}
          </template>
      </rd-table>
    </div>

    <!-- 回访抽屉 -->
    <rd-drawer
      :dialogVisible="drawerVisible"
      :id="drawerId"
      :phone="drawerPhone"
       :title="drawerTitle"
      @handleClose="drawerVisible = false"
    ></rd-drawer>
  </div>
</template>

<script>
import Fetch from '@/utils/fetch';
import rdDrawer from "@/components/RdDrawer";
import chanceSelect from '@/utils/chance-select';
export default {
  name:'chance-list',
  components: {
    rdDrawer
  },
  data () {
    return {
      drawerVisible:false,
      drawerId:"",
      drawerPhone:"",
      drawerTitle:"",
      showNum: 6,
      searchForm: {},
      formOptions: [
        { prop: 'name', element: 'el-select', initValue: '', placeholder: '停留模块' },
        { prop: 'phone', element: 'el-select', initValue: '', placeholder: '机会类型' },
        { prop: 'studentName', element: 'el-input', initValue: '', placeholder: '学员姓名' },
        { prop: 'phone', element: 'el-input', initValue: '', placeholder: '学员手机' },
        { prop: 'labelInfoName', element: 'el-input', initValue: '', placeholder: '活动名' },
        { prop: 'campusName', element: 'el-input', initValue: '', placeholder: '校区名', },
        { prop: 'marketName', element: 'el-select', initValue: '', placeholder: '跟进老师' },
        { prop: 'phone', element: 'el-input', initValue: '', placeholder: '省份' },
        { prop: 'phone', element: 'el-input', initValue: '', placeholder: '城市' },
        { prop: 'phone', element: 'el-input', initValue: '', placeholder: '地址' },
        { prop: 'product', element: 'el-select', initValue: '', placeholder: '咨询项目/科目/课程' },
        { prop: 'phone', element: 'el-select', initValue: '', placeholder: '客户分类' },
        { prop: 'phone', element: 'el-select', initValue: '', placeholder: '销售来源' },
        { prop: 'eduBackground', element: 'el-select', initValue: '', placeholder: '学历' },
        { prop: 'invalidStatus', element: 'el-select', initValue: '', placeholder: '机会状态' },
        { prop: 'phone', element: 'el-select', initValue: '', placeholder: '归属人' },
        { prop: 'createAt', element: 'el-date-picker', initValue: '', startPlaceholder: "创建时间(开始)",
          endPlaceholder: "创建时间(结束)"},
      ],
      tableData: [],
      tableKey: [
        { name: '机会ID',value: 'id',fixed: "left" ,width: 80},
        { name: '姓名',value: 'studentName',fixed: "left" },
        { name: '手机号',value: 'phone',width:100 ,operate: true},
        { name: '校区名',value: 'campusName',width:100 },
        { name: '机会截止',value: 'recoveryTime',width:132 },
        { name: '回访',value: 'feedbackCount',width:50,operate: true },
        { name: '微信',value: 'wechat' },
        { name: '性别',value: 'gender' },
        { name: '跟进老师',value: 'marketName' },
        { name: '学历',value: 'eduBackground' },
        { name: '咨询项目',value: 'enquireProductNameOne' },
        { name: '咨询科目',value: 'enquireSubjectNameOne' },
        { name: '咨询课程',value: 'enquireCourseNameOne' },
        { name: '咨询班型',value: 'enquireClassOne' },
        { name: '意向内容',value: 'intention' },
        { name: '机会来源',value: 'saleSource' },
        { name: '活动名称',value: 'labelInfoName' },
        { name: '备注',value: 'remark' },
        { name: '最近回访内容',value: 'recentFeedbackContent'},
        { name: '最近回访时间',value: 'recentFeedbackTime',width:132 },
        { name: '下次回访时间',value: 'nextDate',width:132 },
        { name: '分配时间',value: 'allotTime',width:132 },
        { name: '状态',value: 'invalidStatus' },
        { name: '跟进状态',value: 'status' },
        { name: '创建时间',value: 'createAt',width:132 },
        { name: '赛道',value: 'opportunityCampusNature',fixed: "right" },
      ],
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },
      loading: false,
    }
  },
  mounted(){
    this.getTableData();
    this.getSelectList();
  },
  methods: {
    openDrawer(data){
      this.drawerId = data.idStr;
      this.drawerPhone = data.phone;
      this.drawerTitle = data.studentName || "";
      this.drawerVisible = true;
    },
    onSearch(val) {
      if(val.product&&val.product.length>0){
        this.searchForm = {
          ...val,
          enquireProductIdOne: val.product[0],
          enquireSubjectIdOne: val.product[1],
          enquireCourseIdOne: val.product[2],
          createAt: val.createAt?val.createAt.join('~'):""
        };
      }else {
        this.searchForm = {
          ...val,
          createAt: val.createAt?val.createAt.join('~'):""
        }
      }
      this.getTableData();
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
    getTableData(params = {}) {
      this.$fetch("chance_list", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.recoveryTime = item.recoveryTime&&this.$common._formatDates(item.recoveryTime);
          item.recentFeedbackTime = item.recentFeedbackTime&&this.$common._formatDates(item.recentFeedbackTime);
          item.nextDate = item.nextDate&&this.$common._formatDates(item.nextDate);
          item.allotTime = item.allotTime&&this.$common._formatDates(item.allotTime);
          if(item.enquireClassOne){
            item.enquireClassOne = item.enquireClassOne.map(ele=>(ele.name)).join(",")
          }
          return item;
        });
        this.pageConfig.totalCount = res.data.count;
      });
    },
    getSelectList(){
      Promise.all([
        this.$fetch("chance_staff_list"),
        this.$fetch("chance_customer_list"),
        this.$fetch("chance_source_list"),
        this.$fetch("chance_edu_list"),
        this.$fetch("chance_trail_list"),
      ].map((p) => {
        return p.catch(error => error)
    })).then(result => {
        let staffOptions = JSON.parse(result[0].msg).map((item) => ({
            label: item.staffName,
            value: item.id,
        }));
        let customerOptinos = result[1].data.map((item) => ({
            label: item.value,
            value: item.key,
          }));
          let sourceOptions = result[2].data.map((item) => ({
            label: item.value,
            value: item.key,
          }));
           let eduOptions = result[3].data.map((item) => ({
            label: item.value,
            value: item.key,
          }));
           let trailOptions = result[4].data.map((item) => ({
            label: item.value,
            value: item.key,
          }));
          let moduleOptions = [
            {
              label: "我的机会-私海客户",
              value: "Private"
            },
            {
              label: "我的机会-公海客户",
              value: "Public"
            },
            {
              label: "机会公海（分校/战队）",
              value: "Campus"
            },
            {
              label: "机会公海（省校/部长）",
              value: "Province"
            },
            {
              label: "支线公海（省校/部长）",
              value: "Company"
            },
            {
              label: "失效机会",
              value: "Lost"
            },
            {
              label: "成交机会",
              value: "Clinch"
            },
            {
              label: "锁定机会",
              value: "Locked"
            }
          ]
          let chanceTypeOptions = [
            {
              label: '电商数据',
              value: 'OnlineData'
            },
            {
              label: '非电商数据',
              value: 'NoOnlineData'
            }
          ]
        this.formOptions = [
        { prop: 'stayModule', element: 'el-select', initValue: '', placeholder: '停留模块',options: moduleOptions },
        { prop: 'opportunityType', element: 'el-select', initValue: '', placeholder: '机会类型',options: chanceTypeOptions },
        { prop: 'studentName', element: 'el-input', initValue: '', placeholder: '学员姓名' },
        { prop: 'phone', element: 'el-input', initValue: '', placeholder: '学员手机' },
        { prop: 'labelInfoName', element: 'el-input', initValue: '', placeholder: '活动名' },
        { prop: 'campusName', element: 'el-input', initValue: '', placeholder: '校区名', },
        { prop: 'marketStaffId', element: 'el-select', initValue: '', placeholder: '跟进老师', options: staffOptions,filterable: true },
        { prop: 'phoneProvince', element: 'el-input', initValue: '', placeholder: '省份' },
        { prop: 'phoneCity', element: 'el-input', initValue: '', placeholder: '城市' },
        { prop: 'address', element: 'el-input', initValue: '', placeholder: '地址' },
        chanceSelect.getProjectCascader({
            prop: "product",
            placeholder: "咨询项目/科目/课程"
        }),
        { prop: 'customerLevel', element: 'el-select', initValue: '', placeholder: '客户分类',options: customerOptinos },
        { prop: 'saleSource', element: 'el-select', initValue: '', placeholder: '销售来源',options: sourceOptions },
        { prop: 'eduBackground', element: 'el-select', initValue: '', placeholder: '学历',options: eduOptions },
        { prop: 'status', element: 'el-select', initValue: '', placeholder: '机会状态',options: trailOptions },
        { prop: 'createStaffId', element: 'el-select', initValue: '', placeholder: '归属人' ,options: staffOptions,filterable: true},
        { prop: 'createAt', element: 'el-date-picker', initValue: '', startPlaceholder: "创建时间(开始)",
          endPlaceholder: "创建时间(结束)"},
      ]
      })
      .catch((err) => {
          console.log(err);
        });
    }
  }
}
</script>

<style lang='scss' scoped>
.chancelist_container {
  .w-container {
    padding-top: 50px;
  }
}
</style>