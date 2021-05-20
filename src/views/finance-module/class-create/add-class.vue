<template>
  <div class="add-class">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="">
        <el-select
          v-model="formInline.productName"
          placeholder="项目"
          filterable
          size="small"
          @change="handleChangeProduct"
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
      :autoScroll="false"
      @pageChange="pageChange"
      @select="handleSelect"
    >
      <template slot="staffPhone" slot-scope="scope">
        {{ $common.hidePhone(scope.row.staffPhone) }}
      </template>
    </rd-table>
    <div class="btn-wrapper" style="text-align: right; margin-top: 20px">
      <el-button size="small" @click="handleClose"
        >取消</el-button
      >
      <el-button
        type="primary"
        size="small"
        :loading="btnLoading"
        @click="handleAddClass"
        v-prevent-re-click="2000"
        >添加</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "add-class",
  data() {
    return {
      productId:this.selectProductId,
      btnLoading: false,
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
    selectProductId: {
      type: [Number, String],
    },
    // currentProductId: {
    //   type: String || Number,
    // },
  },
  async created() {
    console.log("classTypeArr", this.classTypeArr);
    console.log("projectArr", this.projectArr);
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
  computed:{
  //  productId: {
  //     set(val) {
  //       this.$emit("sendVal", val); // 表示将子组件改变的值传递给父组件
  //     },
  //     get() {
  //       return this.selectProductId; // 表示获取父组件的值
  //     },
  //   },
  },
  methods: {
    handleClose(){
       this.$emit("closeTableData");
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
      this.selectTableData = rows;
    },
    handleChangeProduct(val){
           console.log(val, "rows val---");
           this.productId = val;
    },
    handleAddClass() {
      //添加
      this.$emit("addTableData", this.selectTableData);
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
        productId: this.productId,
      }).then((res) => {
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
