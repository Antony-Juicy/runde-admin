<template>
  <div class="registrantlist_container">
    <search-form
      :formOptions="formOptions"
      :showNum="showNum"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :pageConfig="pageConfig"
        :filterColumn="true"
        :tbodyHeight="600"
        @select="handleSelect"
        @pageChange="pageChange"
      >
      </rd-table>
    </div>
  </div>
</template>

<script>
import searchForm from "@/components/Searchform";
export default {
  name: "registrant-list",
  components: {
    searchForm,
  },
  data() {
    return {
      showNum: 6,
      searchForm: {},
      formOptions: [
        {
          prop: "studentName",
          element: "el-input",
          initValue: "",
          placeholder: "请输入学员姓名",
        },
        {
          prop: "phone",
          element: "el-input",
          initValue: "",
          placeholder: "请输入学员手机",
        },
        {
          prop: "project",
          element: "el-select",
          initValue: "",
          placeholder: "请选择机会来源",
        },
        {
          prop: "phone",
          element: "el-select",
          initValue: "",
          placeholder: "请选择学历",
        },
        {
          prop: "invalidStatus",
          element: "el-select",
          initValue: "",
          placeholder: "请选择根据状态",
        },
        {
          prop: "saleSource",
          element: "el-select",
          initValue: "",
          placeholder: "请选择机会状态",
        },
        {
          prop: "marketName",
          element: "el-select",
          initValue: "",
          placeholder: "归属销售",
        },
        {
          prop: "enquireProductNameOne",
          element: "el-select",
          initValue: "",
          placeholder: "请选择咨询项目",
        },
        {
          prop: "enquireSubjectNameOne",
          element: "el-select",
          initValue: "",
          placeholder: "请先选择咨询项目",
        },
        {
          prop: "phone",
          element: "el-select",
          initValue: "",
          placeholder: "请先选择咨询课目",
        },
        {
          prop: "phone",
          element: "el-select",
          initValue: "",
          placeholder: "选择查询排列方法",
        },
      ],
      tableData: [],
      tableKey: [
        { name: "机会ID", value: "id", width: 80 },
        { name: "姓名", value: "studentName" },
        { name: "手机号", value: "phone" },
        { name: "回访", value: "feedbackCount", width: 50 },
        { name: "咨询项目", value: "enquireProductNameOne" },
        { name: "咨询科目", value: "enquireSubjectNameOne" },
        { name: "咨询班型", value: "enquireClassOne" },
        { name: "创建时间", value: "createAt" },
        { name: "注册人", value: "createStaffName" },
        { name: "机会截止", value: "recoveryTime" },
        {
          name: "最近跟进时间",
          value: "recentFeedbackTime",
          operate: true,
          width: 110,
        },
        { name: "跟进状态", value: "status" },
        { name: "机会状态", value: "invalidStatus" },
        { name: "机会状态", value: "saleSource" },
        { name: "归属销售", value: "marketName" },
        { name: "分校/战队", value: "campusName" },
      ],
      emptyText: "暂无数据",
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 100,
        currentPage: 1,
        showCount: 10,
      },
      loading: false,
    };
  },
  mounted() {
    this.getTableData();
    this.getSelectList();
  },
  methods: {
    onSearch(val) {
      this.searchForm = { ...val };
      console.log(val, this.searchForm, "val---");
      this.getTableData();
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    pageChange(val) {
      console.log(val, "pagechange");
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    getTableData(params = {}) {
      const loading = this.$loading({
        lock: true,
        target: ".el-table",
      });
      this.$fetch("chance_registrant_list", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.recoveryTime =
            item.recoveryTime && this.$common._formatDates(item.recoveryTime);
          if (item.enquireClassOne) {
            item.enquireClassOne = item.enquireClassOne
              .map((item) => item.name)
              .join(",");
          } else {
            item.enquireClassOne = "";
          }
          return item;
        });
        this.pageConfig.totalCount = res.data.count;
        setTimeout(() => {
          loading.close();
        }, 200);
      });
    },
    getSelectList() {
      Promise.all([
        this.$fetch("chance_source_list"),
        this.$fetch("chance_edu_list"),
        this.$fetch("chance_status_list"),
        this.$fetch("chance_trail_list"),
        this.$fetch("chance_staff_list")
      ].map((p) => {
        return p.catch(error => error)
    }))
        .then((result) => {
          let sourceOptions = result[0].data.map((item) => ({
            label: item.value,
            value: item.key,
          }));
          let eduOptions = result[1].data.map((item) => ({
            label: item.value,
            value: item.key,
          }));
          let statusOptions = result[2].data.map((item) => ({
            label: item.value,
            value: item.key,
          }));
          let trailOptions = result[3].data.map((item) => ({
            label: item.value,
            value: item.key,
          }));
          let staffOptions = JSON.parse(result[4].msg).map((item) => ({
            label: item.staffName,
            value: item.id,
          }));
         let orderOptions = [
           {
             label: "按照创建时间正序查询",
             value: "按照创建时间正序查询"
           },
           {
             label: "按照创建时间逆序查询",
             value: "按照创建时间逆序查询"
           },
           {
             label: "按照回收时间正序查询",
             value: "按照回收时间正序查询"
           },
           {
             label: "按照回收时间逆序查询",
             value: "按照回收时间逆序查询"
           },
           {
             label: "按照最近回访时间正序查询",
             value: "按照最近回访时间正序查询"
           },
           {
             label: "按照最近回访时间逆序查询",
             value: "按照最近回访时间逆序查询"
           },
           {
             label: "按照分配时间正序查询",
             value: "按照分配时间正序查询"
           },
           {
             label: "按照分配时间逆序查询",
             value: "按照分配时间逆序查询"
           },
         ];
          this.formOptions = [
            {
              prop: "studentName",
              element: "el-input",
              initValue: "",
              placeholder: "请输入学员姓名",
            },
            {
              prop: "phone",
              element: "el-input",
              initValue: "",
              placeholder: "请输入学员手机",
            },
            {
              prop: "saleSource",
              element: "el-select",
              initValue: "",
              placeholder: "请选择机会来源",
              options: sourceOptions,
            },
            {
              prop: "eduBackground",
              element: "el-select",
              initValue: "",
              placeholder: "请选择学历",
              options: eduOptions,
            },
            {
              prop: "status",
              element: "el-select",
              initValue: "",
              placeholder: "请选择跟进状态",
              options: statusOptions,
            },
            {
              prop: "invalidStatus",
              element: "el-select",
              initValue: "",
              placeholder: "请选择机会状态",
              options: trailOptions
            },
            {
              prop: "marketStaffId",
              element: "el-select",
              initValue: "",
              placeholder: "归属销售",
              options: staffOptions,
              filterable: true
            },
            {
              prop: "enquireProductIdOne",
              element: "el-select",
              initValue: "",
              placeholder: "请选择咨询项目",
            },
            {
              prop: "enquireSubjectIdOne",
              element: "el-select",
              initValue: "",
              placeholder: "请先选择咨询项目",
            },
            {
              prop: "enquireCourseIdOne",
              element: "el-select",
              initValue: "",
              placeholder: "请先选择咨询科目",
            },
            {
              prop: "ordeParams",
              element: "el-select",
              initValue: "",
              placeholder: "选择查询排列方法",
              options: orderOptions
            },
            // 课程
        {
          prop: "abc",
          element: "el-cascader",
          placeholder: "请选择咨询项目/科目",
          props: {
            checkStrictly: true,
            lazy: true,
            lazyLoad:(node, resolve)=> {
              console.log(node,'node')
              const { level } = node;
              // setTimeout(() => {
              //   let nodes = [{
              //     value: 1,
              //     label: `选项${1}`,
              //     leaf: level >= 2,
              //   }]
              //   // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              //   resolve(nodes);
              // }, 1000);
              if(level == 0){
                this.$fetch("chance_product_list").then(res => {
                  let data = JSON.parse(res.msg);
                  let nodes = data.map(item =>({
                    value: item.id,
                    label: item.productName,
                    leaf: level >= 2,
                  }));
                  resolve(nodes);
                })
              }else if(level == 1){
                 this.$fetch("chance_subject_list",{
                   enquireProductIdOne: node.data.value
                 }).then(res => {
                   let nodes;
                   if(res.msg == "没有相关数据"){
                     nodes = [];
                   }else {
                     let data = res.data;
                    nodes = data.map(item =>({
                      value: item.id,
                      label: item.subjectName,
                      leaf: level >= 2,
                    }));
                   }
                  resolve(nodes);
                })
              }else if(level == 2){
                 this.$fetch("chance_course_list",{
                   subjectIdOne: node.data.value
                 }).then(res => {
                   let nodes;
                   if(res.msg == "没有相关数据"){
                     nodes = [];
                   }else {
                     let data =JSON.parse(res.msg);
                    nodes = data.map(item =>({
                      value: item.id,
                      label: item.courseName,
                      leaf: level >= 2,
                    }));
                   }
                  resolve(nodes);
                })
              }
            },
          },
          initWidth: true,
        },
          ];
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang='scss' scoped>
.registrantlist_container {
  .w-container {
    padding-top: 50px;
  }
}
</style>