<template>
  <div class="invitecount-container">
    <search-form :formOptions = "formOptions" :showNum="showNum" @onSearch = onSearch></search-form>
    <div class="w-container">
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :pageConfig.sync="pageConfig"
        @select="handleSelect"
        @pageChange="pageChange">
      </rd-table>
    </div>
  </div>
</template>

<script>

export default {
  name:"invite-count",
  data(){
    return {
      showNum: 6,
      searchForm: {},
      formOptions: [
        { prop: 'provincialSchoolName', element: 'el-input', placeholder: '校区名称' },
        { prop: 'branchSchoolName', element: 'el-input', placeholder: '分校名称' },
        { prop: 'teacherName', element: 'el-input', placeholder: '推广老师' },
        { prop: 'liveName', element: 'el-input', placeholder: '直播名称' }
      ],
      tableData: [
        {
          provincialSchoolName: "广东校区",
          branchSchoolName: "广州校区",
          teacherName: "王伯伯",
          inviteeName: "张三",
          inviteePhone: 13800138000,
          liveName: "2021药师终极包过班"
        }
      ],
      tableKey: [
        { name: '校区',value: 'provincialSchoolName' },
        { name: '分校',value: 'branchSchoolName' },
        { name: '推广老师',value: 'teacherName' },
        { name: '被邀请人',value: 'inviteeName' },
        { name: '被邀请人手机',value: 'inviteePhone' },
        { name: '邀请直播名称',value: 'liveName' }
      ],
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,
    }
  },
  mounted () {
    this.getTableData()
  },
  methods: {
    onSearch(val) {
      this.searchForm = {...val};
      this.pageConfig.pageNum = 1;
      this.getTableData();
      console.log(val,this.searchForm , 'val---')
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    getTableData(params) {
      const loading = this.$loading({
        lock: true,
        target: ".el-table",
      });
      this.$fetch(
        "invite_count_list",
        params || {
          ...this.pageConfig,
          ...this.searchForm
        }
      ).then((res) => {
        this.tableData = res.data.records;
        this.pageConfig.totalCount = res.data.totalCount;
        setTimeout(() => {
          loading.close();
        }, 200);
      });
    },
    pageChange(val) {
      console.log(val,'pagechange')
      this.getTableData({
        pageNum: (val && val.page) || 1,
        pageSize: (val && val.limit) || 10,
      });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
