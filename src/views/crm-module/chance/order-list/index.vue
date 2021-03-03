<template>
  <div class="order-list">
    <div class="left-wrapper">
      <search-form
        :formOptions="formOptions"
        :showNum="5"
        @onSearch="onSearch"
      ></search-form>
      <div class="w-container">
        <rd-table
          :tableData="tableData"
          :tableKey="tableKey"
          :pageConfig.sync="pageConfig"
          :filterColumn="true"
          fixedTwoRow
          highlight-current-row
          @pageChange="pageChange"
          @currentChange="currentChange"
        >
          <!-- 手机号 -->
          <template slot="phone" slot-scope="scope">
            {{ $common.hidePhone(scope.row.phone) }}
          </template>
          <!-- 回访 -->
          <template slot="visit" slot-scope="scope">
            <span class="visit-container" @click.stop="openDrawer(scope.row)">{{
              scope.row.feedbackCount || 0
            }}</span>
          </template>
        </rd-table>
        <!-- 回访抽屉 -->
          <rd-drawer
            :dialogVisible="drawerVisible"
            :id="drawerId"
            :phone="drawerPhone"
            title="信息"
            :size="drawerSize"
            @handleClose="drawerVisible = false"
          ></rd-drawer>
      </div>
    </div>
    <div class="right-wrapper w-container">
      <div class="contact-title">
        <span>基本资料</span>
      </div>
      <el-form
        ref="dataForm2"
        :model="basicInfo"
        :rules="rules"
        :label-width="formLabelWidth"
        label-suffix=":"
      >
        <el-form-item label="机会来源" prop="nextTime">
          {{ selectedData.saleSource }}
        </el-form-item>
        <el-form-item label="活动名称" prop="detail">
          {{ selectedData.labelInfoName }}
        </el-form-item>
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="注册人" prop="detail">
              {{ selectedData.createStaffName }}
            </el-form-item>
          </el-col>
          <el-col :span="12"
            ><el-form-item label="赛道" prop="detail">
              {{ selectedData.studentName }}
            </el-form-item></el-col
          >
        </el-row>
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="学员姓名" prop="detail">
              {{ selectedData.studentName }}
            </el-form-item>
          </el-col>
          <el-col :span="12"
            >
            <el-form-item label="学历" prop="detail">
              {{ selectedData.eduBackground }}
            </el-form-item>
            </el-col
          >
        </el-row>
        <el-row :gutter="5">
          <el-col :span="12"
            ><el-form-item label="咨询项目" prop="detail">
              {{ selectedData.enquireProductNameOne }}
            </el-form-item></el-col
          >
          <el-col :span="12">
            <el-form-item label="咨询科目" prop="detail">
              {{ selectedData.enquireSubjectNameOne }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="咨询班型" prop="detail">
              {{
                selectedData.enquireClassOne
              }}
            </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import rdDrawer from "@/components/RdDrawer";
export default {
  name: "order-list",
  components: {
    rdDrawer,
  },
  data() {
    return {
      formOptions: [
        {
          prop: "dataQueryType",
          element: "el-select",
          placeholder: "查看类型",
          options: [
            {
              label: "我成单的",
              value: 'myQuery',
            },
            {
              label: "我管理的（分校/战队）",
              value: "campusQuery",
            },
          ],
        },
        {
          prop: "enquireProductIdOne",
          element: "el-select",
          placeholder: "项目",
        },
        {
          prop: "studentName",
          element: "el-input",
          placeholder: "学员姓名",
        },
        {
          prop: "phone",
          element: "el-input",
          placeholder: "学员手机",
        },
        {
          prop: "eduBackground",
          element: "el-select",
          placeholder: "学历",
        },
        {
          prop: "marketName",
          element: "el-input",
          placeholder: "归属销售",
        },
        {
          prop: "campusId",
          element: "el-select",
          placeholder: "校区"
        },
        // 时间
        {
          prop: "updateAt",
          element: "el-date-picker",
          startPlaceholder: "成交日期(开始)",
          endPlaceholder: "成交日期(结束)",
          initWidth: true,
        },
      ],
      tableData: [],
      tableKey: [
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
          name: "成交时间",
          value: "updateAt",
        },
        {
          name: "回访",
          value: "visit",
          operate: true,
          width: 60,
        },
        {
          name: "报读项目",
          value: "enquireProductNameOne",
        },
        {
          name: "报读科目",
          value: "enquireSubjectNameOne",
        },
        {
          name: "报读班型",
          value: "enquireClassOne",
        },
        {
          name: "机会状态",
          value: "invalidStatus",
        },
        {
          name: "注册人",
          value: "createStaffName",
        },
        {
          name: "归属销售",
          value: "marketName",
        },
        {
          name: "校区/部门",
          value: "campusName",
        },
      ],
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },
      // 回访抽屉参数
      drawerVisible: false,
      drawerSize: "50%",

      // 基本资料
      formLabelWidth: "85px",
      statusArr: [],
      basicInfo: {
        status: "",
        nextTime: "",
        detail: "",
      },
      rules: {
        // status: [{ required: true, message: "请选择状态", trigger: "blur" }],
        // nextTime: [
        //   { required: true, message: "请选择下次联系时间", trigger: "blur" },
        // ],
        // detail: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      searchForm: {},
      selectedData: {},
      drawerId:"",
      drawerPhone:"",
    };
  },
  mounted() {
    this.getSelectList();
    this.getTableData();
  },
  methods: {
    onSearch(val) {
      this.searchForm = { 
        ...val,
        updateAt: val.updateAt?val.updateAt.join(' ~ '):""
       };
      console.log(val, this.searchForm, "val---");
      this.getTableData();
    },
    pageChange(val) {
      console.log(val, "pagechange");
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    currentChange(val) {
      this.$emit("currentChange", val);
      this.selectedData = val;
      console.log(val, "valll");
    },
    getSelectList() {
      Promise.all(
        [
          this.$fetch("chance_edu_list"),
          this.$fetch("chance_config_campusList"),
          this.$fetch("chance_product_list"),
        ].map((p) => {
          return p.catch((error) => error);
        })
      ).then((result) => {
        let eduOptions = result[0].data.map((item) => ({
          label: item.value,
          value: item.key,
        }));
        let campusOptions = result[1].data.data.map((item) => ({
          label: item.campusName,
          value: item.id,
        }));
        let productOptions = JSON.parse(result[2].msg).map((item) => ({
          label: item.productName,
          value: item.id,
        }));
        this.formOptions = [
          {
            prop: "dataQueryType",
            element: "el-select",
            placeholder: "查看类型",
            options: [
              {
                label: "我成单的",
                value: 'myQuery',
              },
              {
                label: "我管理的（分校/战队）",
                value: "campusQuery",
              },
            ],
          },
          {
            prop: "enquireProductIdOne",
            element: "el-select",
            placeholder: "项目",
            options: productOptions,
          },
          {
            prop: "studentName",
            element: "el-input",
            placeholder: "学员姓名",
          },
          {
            prop: "phone",
            element: "el-input",
            placeholder: "学员手机",
          },
          {
            prop: "eduBackground",
            element: "el-select",
            placeholder: "学历",
            options: eduOptions,
          },
          {
            prop: "marketName",
            element: "el-input",
            placeholder: "归属销售",
          },
          {
            prop: "campusId",
            element: "el-select",
            placeholder: "校区",
            multiple: true,
            filterable: true,
            options: campusOptions,
          },
          // 时间
          {
            prop: "updateAt",
            element: "el-date-picker",
            startPlaceholder: "成交日期(开始)",
            endPlaceholder: "成交日期(结束)",
            initWidth: true,
          },
        ];
      });
    },
    getTableData(params = {}) {
      this.$fetch("chance_order_list", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
        // stayModule:"Private"
        // dataQueryType: 'campusQuery'
      }).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          item.enquireClassOne = item.enquireClassOne&&item.enquireClassOne
            .map((item) => item.name)
            .join(",");
          return item;
        });
        this.pageConfig.totalCount = res.data.count;
      });
    },
     openDrawer(data){
       console.log(data,'data---  ')
      this.drawerId = data.id;
      this.drawerPhone = data.phone;
      console.log(this.drawerPhone,'99')
      this.drawerVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.order-list {
  display: flex;
  .left-wrapper {
    width: calc(100% - 26% - 15px);
    margin-right: 15px;
    background: #fff;
  }
  .right-wrapper {
    width: 26%;
    .contact-title {
      line-height: 30px;
      border-bottom: 1px solid #eee;
      margin-bottom: 10px;
      font-size: 14px;
      font-weight: 600;
    }
  }
  /deep/ {
    .current-row {
      td {
        &:nth-child(2),
        &:nth-child(4),
        &:nth-child(9),
        &:nth-child(10),
        &:nth-child(11),
        &:nth-child(12) {
          color: red;
        }
      }
    }
    .el-form-item {
      margin-bottom: 13px;
    }
    .el-form-item__error {
      line-height: 0.5;
    }
  }
}
</style>
