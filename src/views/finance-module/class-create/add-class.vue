<template>
  <div class="add-class">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="">
        <el-select
          v-model="formInline.campusId"
          placeholder="项目"
          filterable
          size="small"
        >
          <el-option
            :label="item.label"
            :key="item.value"
            :value="item.value"
            v-for="item in campusArr"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-select
          v-model="formInline.id"
          placeholder="请输入内容姓名"
          filterable
          size="small"
        >
          <el-option
            :label="item.label"
            :key="item.value"
            :value="item.value"
            v-for="item in nameArr"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-select
          v-model="formInline.staffPhone"
          placeholder="类型"
          filterable
          size="small"
        >
          <el-option
            :label="item.label"
            :key="item.value"
            :value="item.value"
            v-for="item in campusArr"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onSubmit"
          >搜索</el-button
        >
      </el-form-item>
    </el-form>
    <rd-table
      :tableData="tableData"
      :tableKey="tableKey"
      :pageConfig.sync="pageConfig"
      highlight-current-row
      :multiple="true"
      @pageChange="pageChange"
    >
      <template slot="staffPhone" slot-scope="scope">
        {{ $common.hidePhone(scope.row.staffPhone) }}
      </template>
    </rd-table>
  </div>
</template>

<script>
export default {
  name: "add-class",
  data() {
    return {
      nameArr: [],
      campusArr: [],
      formInline: {
        campusId: "",
        id: "",
      },
      tableData: [],
      tableKey: [
        {
          name: "ID",
          value: "id",
          sortable: true,
        },
        {
          name: "所属项目",
          value: "staffName",
        },
        {
          name: "内容名称",
          value: "positionName",
        },
        {
          name: "类型",
          value: "staffPhone",
          operate: true,
        },

        {
          name: "学费/元",
          value: "opportunityNum",
        },
        {
          name: "状态",
          value: "status",
        },
      ],
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },
    };
  },
  props: {
    opportunityIds: {
      type: String,
      default: 0,
    },
  },
  mounted() {
    this.$fetch("chance_staff_list").then((res) => {
      console.log("哈哈哈", res);
      let staffOptions = JSON.parse(res.msg).map((item) => ({
        label: item.staffName,
        value: item.id,
      }));
      this.nameArr = staffOptions;
    });
    this.$fetch("chance_config_campusList").then((res) => {
      let campusOptions = res.data.data.map((item) => ({
        label: item.campusName,
        value: item.id,
      }));
      this.campusArr = campusOptions;
    });

    this.getTableData();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      this.getTableData();
    },
    pageChange(val) {
      console.log(val, "pagechange");
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    getTableData(params = {}) {
      this.$fetch("chance_distrube_list", {
        ...this.pageConfig,
        ...this.formInline,
        ...params,
      }).then((res) => {
        this.tableData = res.data.data;
        this.pageConfig.totalCount = res.data.count;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.add-class {
}
</style>
