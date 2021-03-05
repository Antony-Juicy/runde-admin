<template>
  <div class="branch-school">
    <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleReceive"
          >领取</el-button
        >
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
        :filterColumn="true"
        :multiple="true"
        fixedTwoRow
        highlight-current-row
        @pageChange="pageChange"
        @select="handelSelect"
      >
        <!-- 跟进次数 -->
        <template slot="phone" slot-scope="scope">
          {{ $common.hidePhone(scope.row.phone) }}
        </template>
        <template slot="visit" slot-scope="scope">
          <span class="visit-container" @click.stop="openDrawer(scope.row)">{{
            scope.row.visit || 0
          }}</span>
        </template>
      </rd-table>
    </div>
    <!-- 回访抽屉 -->
    <!-- <template v-if="drawerVisible"> -->
      <rd-drawer
        :dialogVisible="drawerVisible"
        :id="drawerId"
        :phone="drawerPhone"
        :title="drawerTitle"
        @handleClose="drawerVisible = false"
      ></rd-drawer>
    <!-- </template> -->

    <!-- 分配弹窗 -->
    <rd-dialog
      :title="'分配机会'"
      :dialogVisible="distributeVisible"
      :showFooter="false"
      :width="'990px'"
      @handleClose="distributeVisible = false"
    >
      <distribution :opportunityIds="opportunityIds" @close="distributeVisible = false" v-if="distributeVisible"/>
    </rd-dialog>
  </div>
</template>

<script>
let id = 0;
import Fetch from "@/utils/fetch";
import rdDrawer from "@/components/RdDrawer";
import distribution from "./distribution";
export default {
  name: "branch-school",
  data() {
    return {
      drawerTitle: "",
      drawerId: "",
      drawerPhone: "",
      formOptions: [
        {
          prop: "marketStaffId",
          element: "el-cascader",
          placeholder: "跟进老师",
          props: {
            lazy: true,
            lazyLoad(node, resolve) {
              const { level } = node;
              if (level == 0) {
                const nodes = [
                  {
                    label: "正常",
                    value: "Normal",
                    leaf: level >= 1,
                  },
                  {
                    label: "离职",
                    value: "Stop",
                    leaf: level >= 1,
                  },
                ];
                resolve(nodes);
              } else {
                Fetch("chance_staff_list", {
                  staffStatus: node.value,
                }).then((res) => {
                  let staffOptions = JSON.parse(res.msg).map((item) => ({
                    label: item.staffName,
                    value: item.id,
                    leaf: level >= 1,
                  }));
                  resolve(staffOptions);
                });
              }
            },
          },
          initWidth: true,
          showAllLevels: false,
          filterable: true,
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
          element: "el-input",
          placeholder: "地址",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "注册人",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "学历",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "来源",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "组织架构",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "呼叫状态",
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
          props: {
            checkStrictly: true,
            lazy: true,
            lazyLoad(node, resolve) {
              const { level } = node;
              setTimeout(() => {
                const nodes = Array.from({ length: level + 1 }).map((item) => ({
                  value: ++id,
                  label: `选项${id}`,
                  leaf: level >= 2,
                }));
                // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                resolve(nodes);
              }, 1000);
            },
          },
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
        {
          id: 1,
          name: "飞翔的荷兰人3",
          cutdown: 1608897351706,
          visit: 2,
          phone: "15692026183",
        },
        {
          id: 2,
          name: "飞翔的荷兰人2",
          cutdown: new Date().getTime(),
          phone: "17092026183",
        },
        { id: 3, name: "飞翔的荷兰人1", phone: "18892026183" },
      ],
      tableKey: [
        {
          name: "机会ID",
          value: "id",
        },
        {
          name: "姓名",
          value: "studentName",
        },
        {
          name: "手机号",
          value: "phone",
          operate: true,
        },
        {
          name: "学历",
          value: "eduBackground",
        },
        {
          name: "咨询项目",
          value: "enquireProductNameOne",
        },
        {
          name: "咨询科目",
          value: "enquireSubjectNameOne",
        },
        {
          name: "咨询班型",
          value: "enquireClassOne",
        },
        {
          name: "跟进次数",
          value: "visit",
          operate: true,
          width: 60,
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
          name: "跟进时间",
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
          name: "呼叫状态",
          value: "callStatus",
        },
      ],
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },
      selectedData: [],
      drawerVisible: false,
      // 分配机会
      distributeVisible: false,
      distributeFormOptions: [
        {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择校区",
          label: "选择校区",
          options: [
            {
              label: "博士",
              value: "0",
            },
            {
              label: "硕士",
              value: 1,
            },
          ],
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入姓名",
          label: "姓名",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入手机号",
          label: "手机号",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "销售来源",
          label: "销售来源",
          options: [
            {
              label: "博士",
              value: 0,
            },
            {
              label: "硕士",
              value: 1,
            },
          ],
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "跟进老师",
          label: "跟进老师",
          options: [
            {
              label: "博士",
              value: 0,
            },
            {
              label: "硕士",
              value: 1,
            },
          ],
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入地址",
          label: "地址",
        },
        {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入备注",
          label: "备注",
          type: "textarea",
          rows: 2,
        },
      ],
      distributeRules: {
        updateReason: [
          { required: true, message: "请输入修改事由", trigger: "blur" },
        ],
      },
      searchForm: {},
      opportunityIds:""
    };
  },
  mounted() {
    this.getTableData();
    this.getSelectList();
  },
  components: {
    rdDrawer,
    distribution,
  },
  methods: {
    handleReceive() {
      if (!this.selectedData.length) {
        this.$message.warning("请勾选要领取的机会！");
        return;
      }
      this.$fetch("chance_campus_receive", {
        ids: this.selectedData.map((item) => item.idStr).join(","),
      }).then((res) => {
        if (res.code == 200) {
          this.$message.success("操作成功");
          this.getTableData();
        }
      });
    },
    openDrawer(data) {
      this.drawerId = data.id;
      this.drawerPhone = data.phone;
      this.drawerTitle = data.studentName || "";
      this.drawerVisible = true;
    },
    handleAdd() {},
    onSearch(val) {
      if (val.product && val.product.length > 0) {
        this.searchForm = {
          ...val,
          enquireProductIdOne: val.product[0],
          enquireSubjectIdOne: val.product[1],
          enquireCourseIdOne: val.product[2],
          createAt: val.createAt ? val.createAt.join(" ~ ") : "",
          updateAt: val.updateAt ? val.updateAt.join(" ~ ") : "",
          campusPoolTime: val.campusPoolTime
            ? val.campusPoolTime.join(" ~ ")
            : "",
          marketStaffId: val.marketStaffId && val.marketStaffId[1],
        };
      } else {
        this.searchForm = {
          ...val,
          createAt: val.createAt ? val.createAt.join(" ~ ") : "",
          updateAt: val.updateAt ? val.updateAt.join(" ~ ") : "",
          campusPoolTime: val.campusPoolTime
            ? val.campusPoolTime.join(" ~ ")
            : "",
          marketStaffId: val.marketStaffId && val.marketStaffId[1],
        };
      }

      this.getTableData();
    },
    pageChange(val) {
      console.log(val, "pagechange");
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    handelSelect(val) {
      console.log(val, "valll");
      this.selectedData = val;
    },
    submitDistributeForm(formName) {
      this.$refs[formName].validate((valid, formData) => {
        if (valid) {
          console.log(formData, "提交");
        }
      });
    },
    handleDistribute() {
      if (!this.selectedData.length) {
        this.$message.warning("请勾选要分配的机会！");
        return;
      }
      this.opportunityIds = this.selectedData.map(item=>(item.idStr)).join(",")
      this.distributeVisible = true;
    },
    getTableData(params = {}) {
      this.$fetch("chance_campus_list", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
        // token: "123",
      }).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          item.campusPoolTime = this.$common._formatDates(item.campusPoolTime);
          item.recentFeedbackTime = this.$common._formatDates(item.recentFeedbackTime);
          // item.phone = this.$common.hidePhone(item.phone);
          item.enquireClassOne =
            item.enquireClassOne &&
            item.enquireClassOne.map((item) => item.name).join(",");
          return item;
        });
        this.pageConfig.totalCount = res.data.count;
      });
    },
    getSelectList() {
      Promise.all(
        [
          this.$fetch("chance_source_list"),
          this.$fetch("chance_edu_list"),
          this.$fetch("chance_status_list"),
          this.$fetch("chance_config_campusList"),
          this.$fetch("chance_call_status"),
        ].map((p) => {
          return p.catch((error) => error);
        })
      ).then((result) => {
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
        let campusOptions = result[3].data.data.map((item) => ({
          label: item.campusName,
          value: item.id,
        }));
        let callStatusOptions = result[4].data.map((item) => ({
          label: item.value,
          value: item.key,
        }));
        let numsOptions = [];
        for (let i = 0; i < 8; i++) {
          numsOptions.push({
            label: i,
            value: i,
          });
        }
        this.formOptions = [
          {
            prop: "marketStaffId",
            element: "el-cascader",
            placeholder: "跟进老师",
            props: {
              lazy: true,
              lazyLoad(node, resolve) {
                const { level } = node;
                if (level == 0) {
                  const nodes = [
                    {
                      label: "正常",
                      value: "Normal",
                      leaf: level >= 1,
                    },
                    {
                      label: "离职",
                      value: "Stop",
                      leaf: level >= 1,
                    },
                  ];
                  resolve(nodes);
                } else if (level == 1) {
                  Fetch("chance_getStaffListByStatus", {
                    staffStatus: node.value,
                  })
                    .then((res) => {
                      let staffOptions = res.data.map((item) => ({
                        label: item.staffName,
                        value: item.id,
                        leaf: level >= 1,
                      }));
                      resolve(staffOptions);
                    })
                    .catch((err) => {
                      console.log(err, "err--");
                      resolve([]);
                    });
                } else {
                  resolve([]);
                }
              },
            },
            initWidth: true,
            showAllLevels: false,
            filterable: true,
          },
          {
            prop: "status",
            element: "el-select",
            placeholder: "机会状态",
            options: statusOptions,
          },
          {
            prop: "studentName",
            element: "el-input",
            placeholder: "姓名",
          },
          {
            prop: "phone",
            element: "el-input",
            placeholder: "手机",
          },
          {
            prop: "phoneProvince",
            element: "el-input",
            placeholder: "省份",
          },
          {
            prop: "phoneCity",
            element: "el-input",
            placeholder: "城市",
          },
          {
            prop: "address",
            element: "el-input",
            placeholder: "地址",
          },
          {
            prop: "createStaffName",
            element: "el-input",
            placeholder: "注册人",
          },
          {
            prop: "eduBackground",
            element: "el-select",
            placeholder: "学历",
            options: eduOptions,
          },
          {
            prop: "saleSource",
            element: "el-select",
            placeholder: "来源",
            options: sourceOptions,
          },
          {
            prop: "campusId",
            element: "el-select",
            placeholder: "组织架构",
            options: campusOptions,
            filterable: true,
          },
          {
            prop: "callStatus",
            element: "el-select",
            placeholder: "呼叫状态",
            options: callStatusOptions,
          },
          {
            prop: "feedbackCount",
            element: "el-select",
            placeholder: "跟进次数",
            options: numsOptions,
          },
          // 课程
          {
            prop: "product",
            element: "el-cascader",
            placeholder: "咨询项目/科目/课程",
            props: {
              checkStrictly: true,
              lazy: true,
              lazyLoad: (node, resolve) => {
                console.log(node, "node");
                const { level } = node;
                if (level == 0) {
                  Fetch("chance_product_list").then((res) => {
                    let data = JSON.parse(res.msg);
                    let nodes = data.map((item) => ({
                      value: item.id,
                      label: item.productName,
                      leaf: level >= 2,
                    }));
                    resolve(nodes);
                  });
                } else if (level == 1) {
                  Fetch("chance_subject_list", {
                    enquireProductIdOne: node.data.value,
                  }).then((res) => {
                    let nodes;
                    if (res.msg == "没有相关数据") {
                      nodes = [];
                    } else {
                      let data = res.data;
                      nodes = data.map((item) => ({
                        value: item.id,
                        label: item.subjectName,
                        leaf: level >= 2,
                      }));
                    }
                    resolve(nodes);
                  });
                } else if (level == 2) {
                  Fetch("chance_course_list", {
                    subjectIdOne: node.data.value,
                  }).then((res) => {
                    let nodes;
                    if (res.msg == "没有相关数据") {
                      nodes = [];
                    } else {
                      let data = JSON.parse(res.msg);
                      nodes = data.map((item) => ({
                        value: item.id,
                        label: item.courseName,
                        leaf: level >= 2,
                      }));
                    }
                    resolve(nodes);
                  });
                } else {
                  resolve([]);
                }
              },
            },
            initWidth: true,
          },
          // 时间
          {
            prop: "updateAt",
            element: "el-date-picker",
            startPlaceholder: "最近跟进时间(开始)",
            endPlaceholder: "最近跟进时间(结束)",
            initWidth: true,
          },
          {
            prop: "createAt",
            element: "el-date-picker",
            startPlaceholder: "创建时间(开始)",
            endPlaceholder: "创建时间(结束)",
            initWidth: true,
          },
          {
            prop: "campusPoolTime",
            element: "el-date-picker",
            startPlaceholder: "进入公海时间(开始)",
            endPlaceholder: "进入公海时间(结束)",
            initWidth: true,
          },
        ];
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.branch-school {
}
</style>
