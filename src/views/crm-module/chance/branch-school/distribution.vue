<template>
  <div class="distribution">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="">
        <el-select v-model="formInline.campusId" placeholder="校区" filterable>
          <el-option
            :label="item.label"
            :key="item.value"
            :value="item.value"
            v-for="item in campusArr"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="formInline.id" placeholder="姓名" filterable>
          <el-option
            :label="item.label"
            :key="item.value"
            :value="item.value"
            v-for="item in nameArr"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onSubmit"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <rd-table
      :tableData="tableData"
      :tableKey="tableKey"
      :pageConfig="pageConfig"
      highlight-current-row
      @pageChange="pageChange"
    >
      <template slot="staffPhone" slot-scope="scope">
        {{ $common.hidePhone(scope.row.staffPhone) }}
      </template>
      <template slot="edit" slot-scope="scope">
        <el-button @click="handleEdit(scope.row)" type="text">分配</el-button>
      </template>
    </rd-table>
  </div>
</template>

<script>
export default {
  name: "distribution",
  data() {
    return {
      nameArr: [],
      campusArr: [],
      formInline: {
        campusId: "",
        id: "",
      },
      tableData: [
      ],
      tableKey: [
        {
          name: "ID",
          value: "name",
          sortable: true
        },
        {
          name: "姓名",
          value: "staffName",
        },
        {
          name: "职位",
          value: "positionName",
        },
        {
          name: "手机号码",
          value: "staffPhone",
          operate: true,
        },
        {
          name: "性别",
          value: "gender",
          width: 60,
        },
        {
          name: "机会持有数量",
          value: "opportunityNum",
        },
        {
          name: "状态",
          value: "status",
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 100,
        },
      ],
      pageConfig: {
        totalCount: 100,
        currentPage: 1,
        pageSize: 10,
      },
    };
  },
  mounted() {
    this.$fetch("chance_staff_list").then((res) => {
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
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    pageChange(val) {
      // this.pageConfig.currentPage = val.page;
      // this.pageConfig.pageSize = val.limit;
      // console.log(this.searchForm,'this.searchForm--')
      // this.getTableData({
      //   currentPage: (val && val.page) || 1,
      //   pageSize: (val && val.limit) || 10,
      //   loginUserId,
      //   ...this.searchForm,
      //   parentId: this.parentId
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.distribution {
}
</style>
