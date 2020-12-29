<template>
  <div class="order-list">
    <div class="left-wrapper">
      <search-form
      :formOptions="formOptions"
      :showNum="6"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig="pageConfig"
        :filterColumn="true"
        :multiple="true"
        fixedTwoRow
        highlight-current-row
        @pageChange="pageChange"
        @select="handelSelect"
        @currentChange="currentChange"
      >
        <!-- 手机号 -->
        <template slot="phone" slot-scope="scope">
          {{ $common.hidePhone(scope.row.phone) }}
        </template>
        <!-- 回访 -->
        <template slot="visit" slot-scope="scope">
          <span class="visit-container" @click="drawerVisible = true">{{
            scope.row.visit || 0
          }}</span>
        </template>
      </rd-table>
      <!-- 回访抽屉 -->
      <rd-drawer
        :dialogVisible="drawerVisible"
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
          >
            <el-form-item label="机会来源" prop="nextTime">
              <el-input
                v-model.trim="basicInfo.nextTime"
                autocomplete="off"
                placeholder="请输入"
                size="small"
              />
            </el-form-item>
            <el-form-item label="活动名称" prop="detail">
              <el-input
                v-model.trim="basicInfo.detail"
                autocomplete="off"
                placeholder="请输入"
                size="small"
              />
            </el-form-item>
            <el-row :gutter="5">
              <el-col :span="12">
                <el-form-item label="注册人" prop="detail">
                  <el-input
                    v-model.trim="basicInfo.detail"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12"
                ><el-form-item label="赛道" prop="detail">
                  <el-input
                    v-model.trim="basicInfo.detail"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  /> </el-form-item
              ></el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="12">
                <el-form-item label="学员姓名" prop="detail">
                  <el-input
                    v-model.trim="basicInfo.detail"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12"
                ><el-form-item label="性别" prop="detail">
                  <el-input
                    v-model.trim="basicInfo.detail"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  /> </el-form-item
              ></el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="12">
                <el-form-item label="学历" prop="detail">
                  <el-input
                    v-model.trim="basicInfo.detail"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12"
                ><el-form-item label="咨询项目" prop="detail">
                  <el-input
                    v-model.trim="basicInfo.detail"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  /> </el-form-item
              ></el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="12">
                <el-form-item label="咨询科目" prop="detail">
                  <el-input
                    v-model.trim="basicInfo.detail"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12"
                ><el-form-item label="咨询课程" prop="detail">
                  <el-input
                    v-model.trim="basicInfo.detail"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  /> </el-form-item
              ></el-col>
            </el-row>
            <el-form-item label="咨询班型" prop="detail">
                  <el-input
                    v-model.trim="basicInfo.detail"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  /> </el-form-item
              >
            <el-form-item>
              <el-button
                type="primary"
                size="small"
                @click="submitForm('dataForm2')"
                class="fr"
                >确定</el-button
              >
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
          prop: "type",
          element: "el-select",
          placeholder: "查看类型",
          options: [
            {
              label: "我成单的",
              value: 0,
            },
            {
              label: "我管理的（分校/战队）",
              value: 1,
            },
          ],
          initValue: 0,
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "项目",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "学员姓名",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "学员手机",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "学历",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "归属销售",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "校区",
          multiple: true,
          filterable: true,
          options: [
            {
              label: "我成单的",
              value: 0,
            },
            {
              label: "我管理的（分校/战队）",
              value: 1,
            },
          ],
        },
        // 时间
        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "成交日期(开始)",
          endPlaceholder: "成交日期(结束)",
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
          name: "姓名",
          value: "name",
        },
        {
          name: "手机号",
          value: "phone",
          operate: true,
        },
        {
          name: "回收倒计时",
          value: "cutdown",
          operate: true,
          width: 155,
        },
        {
          name: "机会来源",
          value: "menuUrl",
        },
        {
          name: "回访",
          value: "visit",
          operate: true,
          width: 60,
        },
        {
          name: "最近回访",
          value: "menuOrder",
          // width: 100
        },
        {
          name: "下次回访",
          value: "description1",
        },
        {
          name: "跟进状态",
          value: "description2",
        },
        {
          name: "创建时间",
          value: "description3",
        },
        {
          name: "呼叫状态",
          value: "description4",
        },
      ],
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
      },
      // 回访抽屉参数
      drawerVisible: false,
      drawerSize: "50%",

      // 基本资料
      formLabelWidth: "80px",
      statusArr: [],
      basicInfo: {
        status: "",
        nextTime: "",
        detail: "",
      },
      rules: {
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
        nextTime: [
          { required: true, message: "请选择下次联系时间", trigger: "blur" },
        ],
        detail: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
      }
    };
  },
  methods: {
    onSearch() {},
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
    handelSelect(val) {
      console.log(val, "valll");
      this.selectedData = val;
    },
    getCutdown() {
      this.newArr = this.tableData.map((item) => {
        if (item.cutdown) {
          item.newCutdown = this.$common.showtime(item.cutdown);
        }
        return item;
      });
    },
    currentChange(val) {
      this.$emit("currentChange", val);
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
        &:nth-child(9),
        &:nth-child(10) {
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
