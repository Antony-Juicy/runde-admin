<template>
  <div class="class-create">
    <search-form
      :formOptions="formOptions"
      :showNum="showNum"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container mt-15">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd">
          +创建班型</el-button
        >
      </div>

      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading" 
        :tbodyHeight="600"
        :filterColumn="true"
        :pageConfig.sync="pageConfig"
        @pageChange="pageChange"
      >
        <template slot="value10" slot-scope="scope">
          {{ scope.row.value10 }}<br />
          <el-button
            type="text"
            style="height: 40px"
            id="closeSearchBtn"
            @click="goDetails"
          >
            查看详情
          </el-button>
        </template>
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">
            编辑
          </el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleDelete(scope.row)" type="text" size="small"
            >设置网课编码</el-button
          >

          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleDelete(scope.row)" type="text" size="small"
            >设置图书编码</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleDelete(scope.row)" type="text" size="small"
            >设置配送图书</el-button
          >
        </template>
      </rd-table>
    </div>
    <!-- 添加弹窗 -->
    <fullDialog
      class="full-dialog-wrap"
      v-model="addVisible"
      :title="addStatus ? '添加班型内容' : '编辑班型内容'"
      @change="handleClose('dataForm1')"
    >
      <div class="steps-box">
        <el-steps :active="active" finish-status="success">
          <el-step title="填写班型基本信息"></el-step>
          <el-step title="配置班型内容"></el-step>
          <el-step title="配置其他权限"></el-step>
        </el-steps>
      </div>

      <div class="class-step1 class-moudle" v-if="active == 0">
        <RdForm
          :formOptions="addFormOptions"
          :rules="addRules"
          ref="dataForm1"
          formLabelWidth="120px"
        >
          <template slot="project" slot-scope="scope">
            <el-row style="margin-left: -120px">
              <el-col :span="12">
                <el-form-item label="项目：" prop="project" inline="true">
                  <el-select
                    v-model="basicInfo.project"
                    placeholder="请选择"
                    size="small"
                  >
                    <el-option
                      v-for="item in projectArr"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="科目：" prop="subject" inline="true">
                  <el-select
                    v-model="basicInfo.subject"
                    placeholder="请选择"
                    size="small"
                  >
                    <el-option
                      v-for="item in projectArr"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
        </RdForm>

        <div class="btn-wrapper btn-wrap">
          <el-button
            class="el-btn"
            type="primary"
            size="small"
            :loading="btnLoading"
            @click="handleNext"
            v-prevent-re-click="2000"
            >下一步</el-button
          >
        </div>
      </div>

      <div class="class-step2 class-moudle" v-if="active == 1">
        <el-form
          ref="dataForm2"
          :model="basicInfo"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="学费价格：">
            <el-row :gutter="6" class="mb20">
              <el-col :span="3">总学费</el-col>
              <el-col :span="5">
                <el-input
                  v-model="basicInfo.sumPrice"
                  placeholder="请输入内容"
                ></el-input>
              </el-col>
              <el-col :span="8">元</el-col>
            </el-row>
            <el-row :gutter="20" class="mb20">
              <el-col :span="3">中药一</el-col>
              <el-col :span="8">
                <el-input
                  v-model="basicInfo.price1"
                  placeholder="请输入价格"
                ></el-input>
              </el-col>
              <el-col :span="3">
                <el-checkbox v-model="basicInfo.checked1">计算业绩</el-checkbox>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="mb20">
              <el-col :span="3">中药二</el-col>
              <el-col :span="8">
                <el-input
                  v-model="basicInfo.price1"
                  placeholder="请输入价格"
                ></el-input>
              </el-col>
              <el-col :span="3">
                <el-checkbox v-model="basicInfo.checked2">计算业绩</el-checkbox>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="mb20">
              <el-col :span="3">中药综合</el-col>
              <el-col :span="8">
                <el-input
                  v-model="basicInfo.price1"
                  placeholder="请输入价格"
                ></el-input>
              </el-col>
              <el-col :span="3">
                <el-checkbox v-model="basicInfo.checked3">计算业绩</el-checkbox>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="3">中药法规</el-col>
              <el-col :span="8">
                <el-input
                  v-model="basicInfo.price1"
                  placeholder="请输入价格"
                ></el-input>
              </el-col>
              <el-col :span="3">
                <el-checkbox v-model="basicInfo.checked4">计算业绩</el-checkbox>
              </el-col>
            </el-row>
          </el-form-item>
          <el-row :gutter="20">
            <el-form-item label="退费规则：" prop="refundType">
              <el-select
                v-model="basicInfo.refundType"
                placeholder="请选择退费规则"
                size="small"
              >
                <el-option
                  v-for="item in projectArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="成本费用：" prop="value14" inline="true">
                <el-row :gutter="12">
                  <el-col :span="12">
                    <el-input
                      v-model="basicInfo.value14"
                      placeholder="请输入价格"
                      size="small"
                    >
                    </el-input
                  ></el-col>
                  <el-col :span="4">/科</el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="通过扣除费用：" prop="value15" inline="true">
                <el-row :gutter="12">
                  <el-col :span="12">
                    <el-input
                      v-model="basicInfo.value15"
                      placeholder="请输入价格"
                      size="small"
                    >
                    </el-input>
                  </el-col>
                  <el-col :span="4">/科</el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="班型内容：" prop="value10" :inline="true">
            <div>
              <el-button
                @click="handleAddContent()"
                type="primary"
                size="small"
              >
                +添加内容
              </el-button>
            </div>
            <div class="mt20">
              <rd-table
                :tableData="basicInfo.tableData"
                :tableKey="basicInfo.tableKey"
                :pageConfig.sync="basicInfo.pageConfig"
                :tbodyHeight="600"
                fixedTwoRow
                @pageChange="handlePageChange"
                :emptyText="basicInfo.emptyText"
              >
                <template slot="edit" slot-scope="scope">
                  <el-button @click="handleDelete()" type="text" size="medium">
                    删除
                  </el-button>
                </template>
              </rd-table>
            </div>
          </el-form-item>
        </el-form>

        <div class="btn-wrapper btn-wrap">
          <el-button
            class="el-btn"
            type="primary"
            size="small"
            @click="handlePre('step2')"
            v-prevent-re-click="2000"
            >上一步</el-button
          >
          <el-button
            class="el-btn"
            type="primary"
            size="small"
            @click="handleNext('step2')"
            v-prevent-re-click="2000"
            >下一步</el-button
          >
        </div>
      </div>

      <div class="class-step3 class-moudle" v-if="active == 2">
        <RdForm
          :formOptions="step3FormOptions"
          :rules="step3Rules"
          ref="dataForm1"
          formLabelWidth="160px"
        >
          <template slot="campusVisible" slot-scope="scope">
            <el-form-item label="校区可见" prop="campusVisible">
              <el-select
                v-model="basicInfo.campusVisible"
                placeholder="请选择"
                multiple
              >
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="item in campusArr"
                  :key="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </template>
        </RdForm>

        <div class="btn-wrapper btn-wrap">
          <el-button
            class="el-btn"
            type="primary"
            size="small"
            @click="handlePre('step3')"
            v-prevent-re-click="2000"
            >上一步</el-button
          >
          <el-button
            class="el-btn"
            type="primary"
            size="small"
            @click="handleNext('step3')"
            v-prevent-re-click="2000"
            >提交</el-button
          >
        </div>
      </div>
    </fullDialog>
    <!-- 添加内容弹窗 -->
    <rd-dialog
      :title="'添加班型内容'"
      :dialogVisible="distributeVisible"
      :showFooter="false"
      :width="'990px'"
      @handleClose="distributeVisible = false"
    >
      <addClass
        :opportunityIds="opportunityIds"
        @refresh="getAddClassTableData"
        @close="distributeVisible = false"
        v-if="distributeVisible"
      />
      <div class="btn-wrapper" style="text-align: right; margin-top: 20px">
        <el-button size="small" @click="distributeVisible = false"
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
    </rd-dialog>
    <!-- 添加查看详情弹窗 -->
    <fullDialog
      v-model="detailVisible"
      title="金牌通关班"
      @change="detailVisible = false"
    >
      <rd-table
        :tableData="detailTableData"
        :tableKey="detailTableKey"
        :tbodyHeight="600"
      >
      </rd-table>
    </fullDialog>
  </div>
</template>

<script>
import fullDialog from "@/components/FullDialog";
import RdForm from "@/components/RdForm";
import addClass from "./add-class";
export default {
  name: "class-create",
  components: {
    fullDialog,
    RdForm,
    addClass,
  },
  data() {
    return {
      btnLoading: false,
      detailVisible: false,
      active: 0,
      showNum: 5,
      formOptions: [
        {
          prop: "classTypeName",
          element: "el-input",
          placeholder: "请输入班型名称",
        },
        { prop: "project", element: "el-select", placeholder: "请选择项目" },
        { prop: "subject", element: "el-select", placeholder: "请选择科目" },
        { prop: "status", element: "el-select", placeholder: "请选择状态" },
        { prop: "year", element: "el-select", placeholder: "请选择年份" },
        {
          prop: "protocolTypeId",
          element: "el-select",
          placeholder: "请选择协议类型",
        },
        {
          prop: "refundTypeId",
          element: "el-select",
          placeholder: "请选择退费类型",
        },
        { prop: "refundRulers", element: "el-select", placeholder: "请选择退费规则" },
        {
          prop: "serviceTime",
          element: "el-select",
          placeholder: "请选择服务年限",
        },
        {
          prop: "classGroupNumber",
          element: "el-select",
          placeholder: "请选择班型分组",
        },
      ],
      tableData: [
        {
          id: 1,
          classTypeName: "啊哈哈",
        },
      ],
      tableKey: [
        { name: "ID", value: "id" },
        { name: "班型名称", value: "classTypeName" },
        { name: "年份", value: "year" },
        { name: "项目", value: "project" },
        { name: "科目", value: "subject" },
        { name: "班型类型", value: "classTypeId" },
        { name: "协议类型", value: "protocolTypeId" },
        { name: "退费类型", value: "refundTypeId" },
        { name: "退费规则", value: "refundRulers" },
        { name: "课程", value: "course" },
        { name: "班型内容", value: "classtypeContent", operate: true },
        { name: "学费/元", value: " tuitionFees" },
        { name: "服务年限", value: "serviceTime" },
        { name: "成本费用/元", value: " cost" },
        { name: "通过扣除费用", value: "deductingFees" },
        { name: "班型分组", value: "classTypeGroup" },
        { name: "班型阶段", value: "classStage" },
        { name: "班群服务类型", value: "serviceType" },
        { name: "班群人数", value: "classGroupNumber" },
        { name: "状态", value: "status" },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 140,
          fixed: "right",
        },
      ],
      emptyText: "暂无数据",
      pageConfig: {
        totalCount: 0,
        pageNum: 1,
        showCount: 10,
      },
      loading: false,
      addVisible: false,
      addStatus: true,
      addFormOptions: [
        {
          prop: "project",
          element: "el-input",
          placeholder: "项目",
          operate: true,
        },
        {
          prop: "className",
          element: "el-input",
          placeholder: "请输入班型名称",
          label: "班型名称：",
        },
        {
          prop: "classYear",
          element: "el-select",
          placeholder: "班型年份",
          label: "班型年份:",
        },
        {
          prop: "classType",
          element: "el-radio",
          placeholder: "请选择类型",
          label: "班型类型：",
          options: [
            {
              label: "网课",
              value: "1",
            },
            {
              label: "直播",
              value: "2",
            },
            {
              label: "面授",
              value: "3",
            },
            {
              label: "证书",
              value: "4",
            },
            {
              label: "公开课",
              value: "5",
            },
          ],
          initValue: "0",
        },
        {
          prop: "classGroup",
          element: "el-radio",
          placeholder: "请选择类型",
          label: "班型分组：",
          options: [
            {
              label: "高端班",
              value: "1",
            },
            {
              label: "非高端班",
              value: "2",
            },
            {
              label: "定制班",
              value: "3",
            },
          ],
          initValue: "0",
        },
        {
          prop: "serviceYear",
          element: "el-radio",
          placeholder: "请选择类型",
          label: "服务年限：",
          options: [
            {
              label: "1年",
              value: "1",
            },
            {
              label: "2年",
              value: "2",
            },
            {
              label: "3年",
              value: "3",
            },
            {
              label: "4年",
              value: "4",
            },
          ],
          initValue: "0",
        },
        {
          prop: "protocolType",
          element: "el-radio",
          placeholder: "请选择协议类型",
          label: "协议类型：",
          options: [
            {
              label: "协议班",
              value: "Open",
            },
            {
              label: "非协议班",
              value: "Close",
            },
          ],
          initValue: "Open",
        },
        {
          prop: "refundType",
          element: "el-radio",
          placeholder: "请选择退费类型",
          label: "退费类型：",
          options: [
            {
              label: "退费",
              value: "Open",
            },
            {
              label: "不退费",
              value: "Close",
            },
          ],
          initValue: "Open",
        },
        {
          prop: "status",
          element: "el-radio",
          placeholder: "请选择状态",
          label: "状态：",
          options: [
            {
              label: "正常",
              value: "Open",
            },
            {
              label: "暂停",
              value: "Close",
            },
          ],
          initValue: "Open",
        },
      ],
      addRules: {},
      basicInfo: {
        project: "",
        subject: "",
        sumPrice: "",
        price1: "",
        checked1: "",
        checked2: "",
        checked3: "",
        checked4: "",
        value1: "",
        value2: "",
        value3: "",
        value4: "",
        status: "",
        nextTime: "",
        detail: "",
        refundType: "",
        value14: "",
        value15: "",
        tableData: [
          {
            id: 1,
            value2: "啊哈哈11",
            value3: 1995,
            value4: 1995,
            value5: 1995,
            value6: 1995,
            value7: 1995,
            value8: 1995,
            value9: 1995,
            value10: 1995,
            value11: 1995,
            value12: 1995,
            value13: 1995,
            value14: 1995,
            value15: 1995,
          },
        ],
        tableKey: [
          { name: "id", value: "id" },
          { name: "所属项目", value: "value2" },
          { name: "内容名称", value: "value3" },
          { name: "类型", value: "value4" },
          { name: "核算规则", value: "value5" },
          { name: "学费/元", value: "value6" },
          { name: "录播情况", value: "value7" },

          {
            name: "操作",
            value: "edit",
            operate: true,
            width: 140,
            fixed: "right",
          },
        ],
        emptyText: "暂无数据",
        pageConfig: {
          totalCount: 0,
          pageNum: 1,
          showCount: 10,
        },
      },
      rules: {
        project: [{ message: "请选择项目", trigger: "blur" }],
        subject: [{ message: "请选择科目", trigger: "blur" }],
      },
      projectArr: [
        {
          value: "选项1",
          label: "1",
        },
        {
          value: "选项2",
          label: "2",
        },
        {
          value: "选项3",
          label: "3",
        },
        {
          value: "选项4",
          label: "4",
        },
        {
          value: "选项5",
          label: "5",
        },
      ],
      step3FormOptions: [
        {
          prop: "WeeklyPermissions",
          element: "el-radio",
          placeholder: "请选择考药狮周测权限",
          label: "考药狮周测权限：",
          options: [
            {
              label: "有权限",
              value: "Open",
            },
            {
              label: "无权限",
              value: "Close",
            },
          ],
          initValue: "Open",
        },
        {
          prop: "exchange",
          element: "el-radio",
          placeholder: "请选择电商是否可兑换",
          label: "电商是否可兑换",
          options: [
            {
              label: "是",
              value: "Open",
            },
            {
              label: "否",
              value: "Close",
            },
          ],
          initValue: "Open",
        },
        {
          prop: "testAuthority",
          element: "el-radio",
          placeholder: "请选择考药狮模拟测试权限",
          label: "考药狮模拟测试权限：",
          options: [
            {
              label: "有权限",
              value: "Open",
            },
            {
              label: "无权限",
              value: "Close",
            },
          ],
          initValue: "Open",
        },
        {
          prop: "studyAuthority",
          element: "el-radio",
          placeholder: "请选择考药狮自习室权限",
          label: "考药狮自习室权限：",
          options: [
            {
              label: "有权限",
              value: "Open",
            },
            {
              label: "无权限",
              value: "Close",
            },
          ],
          initValue: "Open",
        },
        {
          prop: "ClassTypeService",
          element: "el-select",
          placeholder: "班型服务",
          label: "班型服务：",
        },
        {
          prop: "ClassGroupSize",
          element: "el-input",
          placeholder: "班级群人数",
          label: "班级群人数：",
        },
        {
          prop: "campusVisible",
          element: "el-cascader",
          placeholder: "校区可见",
          initWidth: true,
          label: "校区可见：",
        },
        {
          prop: "RevenueCategory1",
          element: "el-select",
          placeholder: "营收一级类目",
          label: "营收一级类目：",
        },
        {
          prop: "secondaryCategory",
          element: "el-select",
          placeholder: "二级类目",
          label: "二级类目：",
        },
        {
          prop: "ThirdCategory",
          element: "el-select",
          placeholder: "三级类目",
          label: "三级类目",
        },
        {
          prop: "ClassType",
          element: "el-select",
          placeholder: "班型",
          label: "班型：",
        },
      ],
      step3Rules: {
        campusVisible: [
          { required: false, message: "请选择", trigger: "blur" },
        ],
      },
      campusArr: [],
      distributeVisible: false,
      opportunityIds: "",
      detailTableData: [
        {
          id: 1,
          year: "啊哈哈11",
          subProject: 1995,
          contentName: 1995,
          type: 1995,
          SingleCourseFee: 1995,
          courseStage: 1995,
          accountingRules: 1995,
          recordedCase: 1995,
          StartTime: 1995,
          creatTime: 1995,
          status: 1995,
        },
      ],
      detailTableKey: [
        { name: "id", value: "id" },
        { name: "年份", value: "year" },
        { name: "所属项目", value: "subProject" },
        { name: "内容名称", value: "contentName" },
        { name: "类型", value: "type" },
        { name: "单科学费/元", value: "SingleCourseFee" },
        { name: "课程阶段", value: "courseStage" },
        { name: "核算规则", value: "accountingRules" },
        { name: "录播情况", value: "recordedCase" },
        { name: "授课开始时间", value: "StartTime" },
        { name: "创建时间", value: "creatTime" },
        { name: "状态", value: "status" },
      ],
    };
  },
  mounted() {
    this.getAddClassTableData();
  },
  methods: {
    goDetails() {
      this.detailVisible = true;
    },
    getAddClassTableData(params = {}) {
      // this.$fetch("chance_campus_list", {
      //   ...this.pageConfig,
      //   ...this.searchForm,
      //   ...params,
      // }).then((res) => {
      //   this.tableData = res.data.data.map((item) => {
      //     item.createAt = this.$common._formatDates(item.createAt);
      //     item.updateAt = this.$common._formatDates(item.updateAt);
      //     item.campusPoolTime = this.$common._formatDates(item.campusPoolTime);
      //     item.recentFeedbackTime = this.$common._formatDates(item.recentFeedbackTime);
      //     // item.phone = this.$common.hidePhone(item.phone);
      //     item.enquireClassOne =
      //       item.enquireClassOne &&
      //       item.enquireClassOne.map((item) => item.name).join(",");
      //     return item;
      //   });
      //   this.pageConfig.totalCount = res.data.count;
      // });
    },
    handleAddClass() {
      console.log(77);
    },
    handleAddContent() {
      console.log("handleAddContent--");
      this.distributeVisible = true;
    },
    handleAdd() {
      this.addVisible = true;
    },
    onSearch(val) {
      this.searchForm = { ...val };
      this.pageConfig.pageNum = 1;
      this.getTableData();
      console.log(val, this.searchForm, "val---");
      this.getTableData();
    },
    pageChange(val) {
      console.log(val, "pagechange");
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    handlePageChange() {},
    getTableData(params = {}) {
      // TODO
      return new Promise((resolve, reject) => {
        // this.$fetch("", {
        //   ...this.pageConfig,
        //   ...this.searchForm,
        //   ...params,
        // }).then((res) => {
        //   this.tableData = res.data.records;
        //   this.pageConfig.totalCount = res.data.totalCount;
        //   resolve();
        // });
      });
    },
    handleEdit(data) {
      this.addStatus = false;
      this.addVisible = true;
      // TODO 编辑
    },
    handleDelete(row) {
      let info = "";
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //   const res = await this.$fetch("projectType_delete", {
          //     typeId: row.typeId,
          //     loginUserId,
          //   }).then((res) => {
          //     if (res) {
          //       this.$message({
          //         message: "删除成功",
          //         type: "success",
          //       });
          //       setTimeout(() => {
          //         this.getTableData();
          //       }, 50);
          //     }
          //   });
        })
        .catch(() => {});
    },
    handleClose(formName) {
      this.active = 0;
      // this.$refs[formName].onReset();
      this.addVisible = false;
      //   this.dynamicValidateForm.domains = [];
    },
    handlePre() {
      this.active--;
    },
    handleNext() {
      this.active++;
      console.log("active", this.active);
    },
  },
};
</script>

<style lang="scss" scoped>
.class-create {
  .steps-box {
    width: 80%;
    margin: 0 auto;
  }
  .class-moudle {
    width: 60%;
    margin: 40px auto 0;
  }

  .mt20 {
    margin-top: 20px;
  }
  .mb20 {
    margin-bottom: 20px;
  }
  .el-btn {
    margin-right: 20px;
  }
  .btn-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
}
</style>
