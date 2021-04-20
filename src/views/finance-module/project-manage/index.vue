<template>
  <div class="project-manage">
    <search-form
      :formOptions="formOptions"
      :showNum="showNum"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container mt-15">
      <el-button type="primary" size="small" @click="handleAdd">
        +添加项目</el-button
      >
      <div class="mt-15">
        <rd-table
          :tableData="tableData"
          :tableKey="tableKey"
          :tbodyHeight="600"
          :pageConfig.sync="pageConfig"
          @pageChange="pageChange"
        >
          <template slot="edit" slot-scope="scope">
            <el-button @click="handleEdit()" type="text" size="medium">
              编辑
            </el-button>
          </template>
        </rd-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "project-manage",
  data() {
    return {
      showNum: 2,
      searchForm: {},
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },
      formOptions: [
        {
          prop: "project",
          element: "el-select",
          placeholder: "请选择项目",
        },
        {
          prop: "projectType",
          element: "el-select",
          placeholder: "请选择类型",
        },
      ],
      tableData: [
        {
          id: 1,
          projectName: "医师",
          tecTime: "/",
          TheoryTestTime: "10-30",
          closeTime: "11-30",
          status: "正常",
          creatTime: "2021-2.-1 09：32",
        },
      ],
      tableKey: [
        { name: "id", value: "id" },
        { name: "项目名", value: "projectName" },
        { name: "技能考试时间", value: "tecTime" },
        { name: "理论考试时间", value: "TheoryTestTime" },
        { name: "关课时间", value: "closeTime" },
        { name: "状态", value: "status" },
        { name: "创建时间", value: "creatTime" },

        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 140,
          fixed: "right",
        },
      ],
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    onSearch(val) {
      this.searchForm = {
        ...val,
      };
      this.getTableData();
    },
    getTableData(params = {}) {
      // this.$fetch("posterinfo_listJson", {
      //   ...this.pageConfig,
      //   ...this.searchForm,
      //   ...params,
      // }).then((res) => {
      //   this.tableData = res.data.data.map((item) => {
      //     item.creatTime = this.$common._formatDates(item.createAt);

      //     return item;
      //   });
      //   this.pageConfig.totalCount = res.data.count;
      // });
    },
    handleAdd() {
      console.log(77);
    },
    handleEdit() {},
    pageChange(val) {
      console.log(val, "pagechange");
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
