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
        :filterColumn="filterColumn"
        :pageConfig.sync="pageConfig"
        @pageChange="pageChange"
      >
        <template slot="classtypeContent" slot-scope="scope">
          {{ scope.row.classtypeContent }}<br />
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
          <el-button @click="handleSet(scope.row, 1)" type="text" size="small"
            >设置网课编码</el-button
          >

          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleSet(scope.row, 2)" type="text" size="small"
            >设置直播编码</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleSet(scope.row, 3)" type="text" size="small"
            >设置音频编码</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleSet(scope.row, 4)" type="text" size="small"
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

      <div class="class-step1 class-moudle" v-show="active == 0">
        <firstStep ref="dataForm1"></firstStep>
      </div>

      <div class="class-step2 class-moudle" v-show="active == 1">
        <el-form
          ref="dataForm2"
          :model="basicInfo"
          :rules="rules"
          label-width="120px"
        >
          <!-- start -->
          <div class="">
            <div class="row-item">
              <span class="sumPriceRow" style="">学费价格：</span>
              <div class="right-block">
                <div class="param-item">
                  <el-form-item
                    label="总学费"
                    label-width="80px"
                    prop="sumPrice"
                    :rules="{
                      required: true,
                      message: '不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <el-input
                      v-model="basicInfo.sumPrice"
                      size="small"
                      style="width: 300px"
                    ></el-input>
                    <span style="margin-left: 10px">元</span>
                  </el-form-item>
                </div>

                <div class="param-item">
                  <el-form-item
                    label="中药一"
                    label-width="80px"
                    prop="price1"
                    :rules="{
                      required: true,
                      message: '不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <el-input
                      v-model="basicInfo.price1"
                      size="small"
                      style="width: 300px"
                    ></el-input>
                    <!-- <span>元</span> -->
                    <el-checkbox class="ml10" v-model="basicInfo.checked1"
                      >计算业绩</el-checkbox
                    >
                  </el-form-item>
                </div>

                <div class="param-item">
                  <el-form-item
                    label="中药二"
                    label-width="80px"
                    prop="price2"
                    :rules="{
                      required: true,
                      message: '不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <el-input
                      v-model="basicInfo.price2"
                      size="small"
                      style="width: 300px"
                    ></el-input>
                    <el-checkbox class="ml10" v-model="basicInfo.checked2"
                      >计算业绩</el-checkbox
                    >
                  </el-form-item>
                </div>

                <div class="param-item">
                  <el-form-item
                    label="中药综合"
                    label-width="80px"
                    prop="price3"
                    :rules="{
                      required: true,
                      message: '不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <el-input
                      v-model="basicInfo.price3"
                      size="small"
                      style="width: 300px"
                    ></el-input>
                    <el-checkbox class="ml10" v-model="basicInfo.checked3"
                      >计算业绩</el-checkbox
                    >
                  </el-form-item>
                </div>

                <div class="param-item">
                  <el-form-item
                    label="中药综合"
                    label-width="80px"
                    prop="price4"
                    :rules="{
                      required: true,
                      message: '不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <el-input
                      v-model="basicInfo.price4"
                      size="small"
                      style="width: 300px"
                    ></el-input>
                    <el-checkbox class="ml10" v-model="basicInfo.checked4"
                      >计算业绩</el-checkbox
                    >
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>
          <!-- end -->
          <el-row :gutter="20">
            <el-form-item label="退费规则：" prop="refundRulers">
              <el-select
                v-model="basicInfo.refundRulers"
                placeholder="请选择退费规则"
                size="small"
                style="width: 400px"
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
              <el-form-item label="不可退金额：" prop="cost" inline="true">
                <el-row :gutter="12">
                  <el-col :span="12">
                    <el-input
                      v-model="basicInfo.cost"
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
              <el-form-item
                label="通过扣除费用："
                prop="deductingFees"
                inline="true"
              >
                <el-row :gutter="12">
                  <el-col :span="12">
                    <el-input
                      v-model="basicInfo.deductingFees"
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

          <el-form-item
            label="班型内容："
            prop="classtypeContent"
            :inline="true"
          >
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
      </div>

      <div class="class-step3 class-moudle" v-show="active == 2">
        <RdForm
          :formOptions="step3FormOptions"
          :rules="step3Rules"
          ref="dataForm3"
          formLabelWidth="180px"
        >
          <template slot="campusVisible" slot-scope="scope">
            <el-form-item label="校区可见" prop="campusVisible">
              <el-select
                v-model="basicInfo2.campusVisible"
                placeholder="请选择"
                :multiple='true'
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
      </div>

      <!-- 按钮 -->
      <div class="btn-wrapper btn-wrap">
        <el-button
          class="el-btn"
          type="primary"
          size="small"
          @click="handlePre()"
          v-if="active != 0"
          >上一步</el-button
        >
        <el-button
          class="el-btn"
          type="primary"
          size="small"
          v-text="active == 2 ? '提交' : '下一步'"
          @click="handleNext(`dataForm${active + 1}`)"
        ></el-button>
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
        @refresh="getTableData"
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

    <!-- 添加设置网课编码弹窗 -->
    <fullDialog
      v-model="setVisible1"
      title="设置网课编码"
      @change="setVisible1 = false"
    >
      <netClass
        ref="netClass"
        @close="setVisible1 = false"
        v-if="setVisible1"
        @refresh="getTableData"
      />
    </fullDialog>

    <!-- 添加设置直播编码弹窗 -->
    <fullDialog
      v-model="setVisible2"
      title="设置直播编码"
      @change="setVisible2 = false"
    >
      <liveClass
        ref="liveClass"
        @close="setVisible2 = false"
        v-if="setVisible2"
        @refresh="getTableData"
      />
    </fullDialog>
    <!-- 添加设置音频编码弹窗 -->
    <fullDialog
      v-model="setVisible3"
      title="设置音频编码"
      @change="setVisible3 = false"
    >
      <videoClass
        ref="videoClass"
        @close="setVisible3 = false"
        v-if="setVisible3"
        @refresh="getTableData"
      />
    </fullDialog>

    <!-- 添加设置配送图书弹窗 -->
    <fullDialog
      v-model="setVisible4"
      title="设置配送图书"
      @change="setVisible4 = false"
    >
      <distribeClass
        ref="videoClass"
        @close="setVisible4 = false"
        v-if="setVisible4"
        @refresh="getTableData"
      />
    </fullDialog>
  </div>
</template>

<script>
import fullDialog from "@/components/FullDialog";
import RdForm from "@/components/RdForm";
import addClass from "./add-class";
import netClass from "./net-class";
import liveClass from "./live-class";
import videoClass from "./video-class";
import distribeClass from "./distribe-class";
import firstStep from "./first-step";
export default {
  name: "class-create",
  components: {
    fullDialog,
    RdForm,
    addClass,
    netClass,
    liveClass,
    videoClass,
    distribeClass,
    firstStep,
  },
  data() {
    return {
      filterColumn: ["classTypeGroup", "serviceType", "classGroupSize"],
      btnLoading: false,
      detailVisible: false,
      setVisible1: false,
      setVisible2: false,
      setVisible3: false,
      setVisible4: false,
      active: 2,
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
        { prop: "classYear", element: "el-select", placeholder: "请选择年份" },
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
        {
          prop: "refundRulers",
          element: "el-select",
          placeholder: "请选择退费规则",
        },
        {
          prop: "serviceYear",
          element: "el-select",
          placeholder: "请选择服务年限",
        },
        {
          prop: "classTypeGroup",
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
        { name: "年份", value: "classYear" },
        { name: "项目", value: "project" },
        { name: "科目", value: "subject" },
        { name: "班型类型", value: "classTypeId" },
        { name: "协议类型", value: "protocolTypeId" },
        { name: "退费类型", value: "refundTypeId" },
        { name: "退费规则", value: "refundRulers" },
        { name: "课程", value: "course" },
        { name: "班型内容", value: "classtypeContent", operate: true },
        { name: "学费/元", value: " tuitionFees" },
        { name: "服务年限", value: "serviceYear" },
        { name: "不可退金额/元", value: " cost" },
        { name: "通过扣除费用", value: "deductingFees" },
        { name: "班型分组", value: "classTypeGroup" },
        { name: "班型阶段", value: "classStage" },
        { name: "班群服务类型", value: "serviceType" },
        { name: "班群人数", value: "classGroupSize" },
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
      addRules: {
        // project: [
        //   { required: true, message: "请选择project", trigger: "change" },
        // ],
        // subject: [
        //   { required: true, message: "请选择subject", trigger: "change" },
        // ],
        // classTypeName: [
        //   { required: true, message: "请输入", trigger: "blur" },
        //   { max: 20, message: "命名，字数上限不超过20字", trigger: "blur" },
        // ],
        // classYear: [{ required: true, message: "请选择", trigger: "blur" }],
        // classTypeId: [{ required: true, message: "请选择", trigger: "change" }],
        // classTypeGroup: [
        //   { required: true, message: "请选择", trigger: "change" },
        // ],
        // serviceYear: [{ required: true, message: "请选择", trigger: "change" }],
        // protocolTypeId: [
        //   { required: true, message: "请选择", trigger: "change" },
        // ],
        // refundTypeId: [
        //   { required: true, message: "请选择", trigger: "change" },
        // ],
        // status: [{ required: true, message: "请选择", trigger: "change" }],
      },
      basicInfo2: {
        campusVisible: "",
      },
      basicInfo: {
        sumPrice: "",
        price1: "",
        price2: "",
        price3: "",
        price4: "",
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
        refundRulers: "",
        cost: "",
        deductingFees: "",
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
        sumPrice: [
          { required: true, message: "请输入", trigger: "blur" },
          { type: "number", message: "学费必须为数字值" },
        ],
        refundRulers: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        cost: [{ required: true, message: "请输入", trigger: "blur" }],
        deductingFees: [{ required: true, message: "请输入", trigger: "blur" }],
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
          prop: "serviceType",
          element: "el-select",
          placeholder: "班型服务",
          label: "班型服务：",
          options: [
            {
              label: "1",
              value: "1",
            },
          ],
        },
        {
          prop: "classGroupSize",
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
          options: [
            {
              value: 1,
              label: "东南",
              children: [
                {
                  value: 2,
                  label: "上海",
                  children: [
                    { value: 3, label: "普陀" },
                    { value: 4, label: "黄埔" },
                    { value: 5, label: "徐汇" },
                  ],
                },
                {
                  value: 7,
                  label: "江苏",
                  children: [
                    { value: 8, label: "南京" },
                    { value: 9, label: "苏州" },
                    { value: 10, label: "无锡" },
                  ],
                },
                {
                  value: 12,
                  label: "浙江",
                  children: [
                    { value: 13, label: "杭州" },
                    { value: 14, label: "宁波" },
                    { value: 15, label: "嘉兴" },
                  ],
                },
              ],
            },
            {
              value: 17,
              label: "西北",
              children: [
                {
                  value: 18,
                  label: "陕西",
                  children: [
                    { value: 19, label: "西安" },
                    { value: 20, label: "延安" },
                  ],
                },
                {
                  value: 21,
                  label: "新疆维吾尔族自治区",
                  children: [
                    { value: 22, label: "乌鲁木齐" },
                    { value: 23, label: "克拉玛依" },
                  ],
                },
              ],
            },
          ],
        },
        {
          prop: "RevenueCategory1",
          element: "el-select",
          placeholder: "营收一级类目",
          label: "营收一级类目：",
          options: [
            {
              label: "1",
              value: "1",
            },
          ],
        },
        {
          prop: "secondaryCategory",
          element: "el-select",
          placeholder: "二级类目",
          label: "二级类目：",
          options: [
            {
              label: "1",
              value: "1",
            },
          ],
        },
        {
          prop: "ThirdCategory",
          element: "el-select",
          placeholder: "三级类目",
          label: "三级类目",
          options: [
            {
              label: "1",
              value: "1",
            },
          ],
        },
        {
          prop: "ClassType",
          element: "el-select",
          placeholder: "班型",
          label: "班型：",
          options: [
            {
              label: "1",
              value: "1",
            },
          ],
        },
      ],
      step3Rules: {
        WeeklyPermissions: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        exchange: [{ required: true, message: "请选择", trigger: "change" }],
        testAuthority: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        studyAuthority: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        serviceType: [{ required: true, message: "请选择", trigger: "change" }],
        classGroupSize: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        campusVisible: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        RevenueCategory1: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        secondaryCategory: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        ThirdCategory: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        ClassType: [{ required: true, message: "请选择", trigger: "change" }],
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
    this.getTableData();
  },
  methods: {
    // handleChange(soltName, val) {
    //   console.log("jjjj");
    //   this.$refs.dataForm1.setValue({
    //     [soltName]: val,
    //   });
    //   setTimeout(() => {
    //     this.$refs["dataForm1"].validateField([soltName], (errorMessage) => {
    //       console.log(errorMessage, "errorMessage");
    //     });
    //   }, 0);
    // },
    handleSet(row, index) {
      //设置配送图书
      this[`setVisible${index}`] = true;
    },
    loadSalaryCfg() {},
    goDetails() {
      this.detailVisible = true;
    },
    // getAddClassTableData(params = {}) {
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
    // },
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
    handleDelete() {
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
    handleNext(formName) {
      console.log("active", this.active, "formName", formName);
      if (this.active == 2) {
        //step3
        if (this.addStatus == false) {
          //编辑
          this.$refs[formName].validate((valid, formData) => {
            if (valid) {
              this.$confirm(`确认提交吗？`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "success",
              }).then(async () => {
                //TODO
                this.$fetch("wechatstaffqrcode_sendMessageInfo", {
                  ...formData,
                })
                  .then((res) => {
                    this.$message.success("操作成功");
                    this.addVisible = false;
                    this.active = 0;
                    this.loadSalaryCfg();
                  })
                  .catch(() => {});
              });
            }
          });
        } else {
          //添加
          this.$refs[formName].validate((valid, formData) => {
            if (valid) {
              this.$confirm(`确认提交吗？`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "success",
              }).then(async () => {
                //TODO
                this.$fetch("wechatstaffqrcode_sendMessageInfo", {
                  ...formData,
                })
                  .then((res) => {
                    this.$message.success("操作成功");
                    this.addVisible = false;
                    this.active = 0;
                    this.loadSalaryCfg();
                  })
                  .catch(() => {});
              });
            }
          });
        }
      } else {
        console.log("formName====", formName);
        let dataForm;
        if (formName == "dataForm1") {
          dataForm = this.$refs.dataForm1.$refs.dataForm;
        } else {
          dataForm = this.$refs[formName];
        }
        dataForm.validate((valid, formData) => {
          console.log("formData + formData", valid, formData);
          if (valid) {
            this.active++;
            //TODO
            // this.$fetch("wechatstaffqrcode_sendMessageInfo", {
            //   ...formData,
            // })
            //   .then((res) => {
            //     this.$message.success("操作成功");
            //     this.addVisible = false;
            //     this.active = 0;
            //     this.loadSalaryCfg();
            //   })
            //   .catch(() => {});
          } else {
            console.log("nononno---");
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.class-create {
  .row-item {
    display: flex;
    font-size: 14px;
    align-items: flex-start;
    .sumPriceRow {
      margin-left: 30px;
      display: inline-block;
      padding-top: 10px;
    }
    .ml10 {
      margin-left: 10px;
    }
  }
  .param-item {
    display: flex;
    align-items: center;
    // margin-bottom: 20px;
  }
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
