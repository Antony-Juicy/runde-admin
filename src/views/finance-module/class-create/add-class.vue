<template>
  <div class="add-class">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="">
        <el-select
          v-model="formInline.productName"
          placeholder="项目"
          filterable
          size="small"
        >
          <el-option
            :label="item.label"
            :key="item.value"
            :value="item.value"
            v-for="item in projectArr"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <!-- <el-select
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
        </el-select> -->
        <el-input
          v-model.trim="formInline.contentName"
          placeholder="请输入内容名称"
          size="small"
        />
      </el-form-item>
      <el-form-item label="">
        <el-select
          v-model="formInline.contentType"
          placeholder="类型"
          filterable
          size="small"
        >
          <el-option
            :label="item.label"
            :key="item.value"
            :value="item.value"
            v-for="item in classTypeArr"
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
      currentProductId: "",
      nameArr: [],
      campusArr: [],
      formInline: {},
      tableData: [],
      tableKey: [
        {
          name: "ID",
          value: "id",
          sortable: true,
        },
        {
          name: "所属项目",
          value: "productName",
        },
        {
          name: "内容名称",
          value: "contentName",
        },
        {
          name: "类型",
          value: "contentType",
        },

        {
          name: "学费/元",
          value: "contentPrice",
        },
        {
          name: "录播情况",
          value: "playback",
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
      default: "",
    },
    projectArr: {
      //项目
      type: Array,
    },

    classTypeArr: {
      //班型类型
      type: Array,
    },
    // currentProductId: {
    //   type: String || Number,
    // },
  },
  async created() {
    console.log("classTypeArr", this.classTypeArr);
    await this.currentProductIdConfig();
    // this.$fetch("courseProductContent_listJsp").then((res) => {
    //   console.log("哈哈哈", res);
    //   let staffOptions = JSON.parse(res.msg).map((item) => ({
    //     label: item.staffName,
    //     value: item.id,
    //   }));
    //   this.nameArr = staffOptions;
    // });
    // this.$fetch("chance_config_campusList").then((res) => {
    //   let campusOptions = res.data.data.map((item) => ({
    //     label: item.campusName,
    //     value: item.id,
    //   }));
    //   this.campusArr = campusOptions;
    // });

    this.getTableData();
  },
  methods: {
    currentProductIdConfig() {
      return new Promise((resolve) => {
        this.$Bus.$on("currentProductIdConfig", (data) => {
          this.currentProductId = data;
          console.log(
            "currentProductIdcurrentProductId---",
            this.currentProductId
          );
          resolve();
        });
      });
    },
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
      //获取项目内容
      this.$fetch("courseProductContent_listJsp", {
        ...this.pageConfig,
        ...this.formInline,
        productId: this.currentProductId,
      }).then((res) => {
        console.log(
          "打印有意义",
          this.currentProductId,
          "打印有意义1",
          res.data
        );
        this.tableData = res.data.list.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.playback = item.playback == true ? "有录播" : "无";
          return item;
        });
        this.pageConfig.totalCount = res.data.pager.totalRows;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.add-class {
}
</style>
