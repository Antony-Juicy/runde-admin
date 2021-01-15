<template>
  <div class="assignchange_container">
    <div class="w-container">
      <el-tabs v-model="activeName" @tab-click="handleClick" >
        <el-tab-pane label="手机外呼" name="one">
          <search-form :formOptions = "formOptions" :showNum="showNum" @onSearch = onSearch></search-form>
            <div class="btn-wrapper">
              <el-radio-group v-model="radio1" @change="handleTabClick">
                <el-radio-button label="0">全部</el-radio-button>
                <el-radio-button label="1">呼出</el-radio-button>
                <el-radio-button label="2">呼入</el-radio-button>
                <el-radio-button label="3">呼出未接</el-radio-button>
                <el-radio-button label="4">呼入未接</el-radio-button>
              </el-radio-group>
            </div>
            <rd-table
              :tableData="tableData"
              :tableKey="tableKey"
              :loading="loading"
              :fixedTwoRow="fixedTwoRow"
              :pageConfig="pageConfig"
              @select="handleSelect"
              @pageChange="pageChange"
            >
              <template slot="edit" slot-scope="scope">
                <el-button @click="handleEdit(scope.row)" type="text" size="small"
                  >编辑</el-button
                >
                <el-divider direction="vertical"></el-divider>
                <el-button
                  @click="handleAuthority(scope.row)"
                  type="text"
                  size="small"
                  style="color: #ec5b56"
                  >配置权限</el-button
                >
              </template>
            </rd-table>
        </el-tab-pane>
        <el-tab-pane label="在线外呼（总部）" name="two">
          <online-incall></online-incall>
        </el-tab-pane>
        <el-tab-pane label="在线外呼（分校）" name="three">
          <online-outcall></online-outcall>
        </el-tab-pane>
        <el-tab-pane label="AI呼叫" name="four">
          <ai-call></ai-call>
        </el-tab-pane>
        <el-tab-pane label="一键回呼" name="five">
          <akey-call></akey-call>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import onlineIncall from './online-incall';
import onlineOutcall from './online-outcall';
import aiCall from './ai-call';
import akeyCall from './akey-call';
export default {
  name:'call-records',
  components: {
    onlineIncall,
    onlineOutcall,
    aiCall,
    akeyCall
  },
  data () {
    return {
      showNum: 6,
      searchForm: {},
      formOptions: [
        { prop: 'staff_name', element: 'el-select', initValue: '', placeholder: '招生老师' },
        { prop: 'contact_name', element: 'el-input', initValue: '', placeholder: '通话人姓名' },
        { prop: 'campus_name', element: 'el-select', initValue: '', placeholder: '校区名（所属组织）' },
        { prop: 'contact_phone', element: 'el-input', initValue: '', placeholder: '通话人号码' },
        { prop: 'data_type', element: 'el-select', initValue: '', placeholder: '通话类型' },
        { prop: 'createAt', element: 'el-date-picker', initValue: '', element: "el-date-picker",
          startPlaceholder: "通话时间(开始)",
          endPlaceholder: "通话时间(结束)", initWidth: true}
      ],
      tableData: [],
      tableKey: [
        { name: '通话类型',value: 'type' },
        { name: '通话类型',value: 'data_type' },
        { name: '通话人名称',value: 'contact_name' },
        { name: '通话人号码',value: 'contact_phone' },
        { name: '通话时长(单位秒)',value: 'duration', operate: true,sortable: true },
        { name: '招生老师',value: 'staff_name' },
        { name: '校区名',value: 'campus_name' },
        { name: '接通时间',value: 'start_time' },
        { name: '结束时间',value: 'end_time' },
        { name: '录音',value: '10' },
      ],
      emptyText: '暂无数据，请选择相应的组织架构',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 100,
        currentPage: 1,
        showCount: 10,
      },
      loading: false,

      //
      activeName: 'two',
      radio1: 0
    }
  },
  mounted(){
    this.getTableData();
  },
  methods: {
    onSearch(val) {
      this.searchForm = {...val};
      console.log(val,this.searchForm , 'val---')
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
    
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    // 点击权限组的分类
    handleTabClick(data){
      console.log(data,99966)
      // this.pageConfig.currentPage = 1;
      // this.getTableData();
    },
    getTableData(params = {}) {
      const loading = this.$loading({
        lock: true,
        target: ".el-table",
      });
      this.$fetch("chance_call_phone", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
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
.assignchange_container {
  .btn-wrapper {
    margin-bottom: 8px;
  }
}
</style>