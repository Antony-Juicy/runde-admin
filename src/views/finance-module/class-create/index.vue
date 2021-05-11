<template>
  <div class="class-create">
    <search-form
      :formOptions="formOptions"
      :showNum="showNum"
      ref="searchForm"
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
        :filterColumn="filterColumn"
        :pageConfig.sync="pageConfig"
        @pageChange="pageChange"
      >
        <template slot="courses" slot-scope="scope">
          <span v-for="item in scope.row.courses" :key="item.courseId">
            {{ item.courseName }}
          </span>
        </template>
        <template slot="className" slot-scope="scope">
          <el-button type="text" @click="handleClassName(scope.row)">{{
            scope.row.className
          }}</el-button>
        </template>
        <template slot="contentName" slot-scope="scope">
          {{ scope.row.contentName }}<br />
          <el-button
            type="text"
            style="height: 40px"
            id="closeSearchBtn"
            @click="goDetails(scope.row)"
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
      @change="handleClose()"
    >
      <div class="steps-box">
        <el-steps :active="active" finish-status="success">
          <el-step title="填写班型基本信息"></el-step>
          <el-step title="配置班型内容"></el-step>
          <el-step title="配置其他权限"></el-step>
        </el-steps>
      </div>

      <div class="class-step1 class-moudle" v-show="active == 0">
        <firstStep
          :yearArr="yearArr"
          :classTypeArr="classTypeArr"
          :protocolTypeArr="protocolTypeArr"
          :refundTypeArr="refundTypeArr"
          :serviceYearArr="serviceYearArr"
          :statusArr="statusArr"
          :projectArr="projectArr"
          @changeSubArr="changeSubArr"
          @message="initProductIdFn"
          ref="dataForm1"
          @getStageListFunc="getStageListFunc"
          @getCourseListFunc="getCourseListFunc"
          :IsDisabled="IsDisabled"
        ></firstStep>
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
            <el-row :gutter="20" v-if="basicInfo.courseStageArr.length > 0">
              <el-form-item
                label="班型阶段："
                prop="classTypeStage"
                :rules="{
                  required: basicInfo.courseStageArr.length > 0 ? true : false,
                  message: '不能为空',
                  trigger: 'change',
                }"
              >
                <el-checkbox-group
                  v-model="basicInfo.classTypeStage"
                  @change="handleCheckedStageChange"
                >
                  <el-checkbox
                    v-for="(item, i) in basicInfo.courseStageArr"
                    :key="i"
                    :label="item.label"
                    :value="item.value"
                  ></el-checkbox>
                </el-checkbox-group>
                <!-- <el-select
                  v-model="basicInfo.classTypeStage"
                  placeholder="请选择班型阶段"
                  size="small"
                  style="width: 400px"
                >
                  <el-option
                    v-for="item in projectArr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  > -->
                <!-- </el-option>
                </el-select> -->
              </el-form-item>
            </el-row>
            <div class="row-item">
              <span class="sumPriceRow" style="">学费价格：</span>
              <div class="right-block">
                <div class="param-item">
                  <el-form-item
                    label="总学费"
                    label-width="80px"
                    prop="totalFee"
                    :rules="{
                      required: false,
                      message: '不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <el-input
                      readonly
                      v-model="totalPrice"
                      size="small"
                      style="width: 300px"
                    ></el-input>
                    <span style="margin-left: 10px">元</span>
                  </el-form-item>
                </div>
                <template v-if="courseList.length > 0">
                  <div
                    class="param-item"
                    v-for="(item, index) in courseList"
                    :key="item.value"
                  >
                    <el-form-item
                      :prop="'courses.' + index + '.coursePrice'"
                      label-width="0"
                      :rules="{
                        required: basicInfo.courses[index].checked
                          ? true
                          : false,
                        message: '请输入价格',
                        trigger: 'blur',
                      }"
                    >
                      <el-checkbox
                        v-model="basicInfo.courses[index].checked"
                        :label="item.label"
                      ></el-checkbox>

                      <el-input
                        v-model="basicInfo.courses[index].coursePrice"
                        size="small"
                        placeholder="请输入价格"
                        style="width: 200px; margin-left: 20px"
                      ></el-input>

                      <el-switch
                        active-text="计算业绩"
                        style="margin-left: 20px"
                        v-model="basicInfo.courses[index].isperformance"
                        active-color="#13ce66"
                        inactive-color="#dcdfe6"
                        @change="
                          handleSwitchChange(
                            basicInfo.courses[index].isperformance
                          )
                        "
                      >
                      </el-switch>
                    </el-form-item>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <!-- end -->
          <el-row :gutter="20">
            <el-form-item
              label="退费规则："
              prop="refundRules"
              :rules="{
                required: true,
                message: '不能为空',
                trigger: 'change',
              }"
            >
              <el-select
                v-model="basicInfo.refundRules"
                :disabled="IsDisabled"
                placeholder="请选择退费规则"
                size="small"
                style="width: 400px"
              >
                <el-option
                  v-for="item in refundRulesionArr"
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
              <el-form-item
                v-if="
                  basicInfo.refundRules == 'NOPASSREFUNDFULL' ||
                  basicInfo.refundRules == 'NOPASSREFUNDDEDUCT' ||
                  basicInfo.refundRules == 'YISHIONEANDTWO'
                "
                label="不可退金额："
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'change',
                }"
                prop="norefundFee"
                inline="true"
              >
                <el-row :gutter="12">
                  <el-col :span="12">
                    <el-input
                      v-model="basicInfo.norefundFee"
                      :readonly="IsDisabled"
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
                v-if="basicInfo.refundRules == 'PASSREFUNDDEDUCT'"
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'change',
                }"
                label="通过扣除费用："
                prop="passDeductFee"
                inline="true"
              >
                <el-row :gutter="12">
                  <el-col :span="12">
                    <el-input
                      v-model="basicInfo.passDeductFee"
                      placeholder="请输入价格"
                      :readonly="IsDisabled"
                      size="small"
                    >
                    </el-input>
                  </el-col>
                  <el-col :span="4">/科</el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- {{ basicInfo.tableData }} -->
          <el-form-item label="班型内容：" prop="contentName" :inline="true">
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
                emptyText="暂无数据"
              >
                <template slot="edit" slot-scope="scope">
                  <el-button
                    @click="handleDelete(scope.row)"
                    type="text"
                    size="medium"
                  >
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
          :multiple="true"
        >
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
        :selectProductId="selectProductId"
        :classTypeArr="classTypeArr"
        :projectArr="projectArr"
        :opportunityIds="opportunityIds"
        @refresh="getTableData"
        @addTableData="addTableDataFn"
        @close="distributeVisible = false"
        v-if="distributeVisible"
        :currentProductId="currentProductId"
      />
    </rd-dialog>
    <!-- 添加查看详情弹窗 -->
    <fullDialog
      v-model="detailVisible"
      :title="title"
      @change="detailVisible = false"
    >
      <rd-table
        :tableData="detailTableData"
        :tableKey="detailTableKey"
        :tbodyHeight="600"
        :emptyText="emptyText"
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

    <!-- 班型名称的弹窗 -->
    <fullDialog
      v-model="setVisible5"
      :title="currentClassName"
      @change="setVisible5 = false"
    >
      <classDetail
        ref="videoClass"
        :title="currentClassName"
        :classTypeId="classTypeId"
        :classTypeName="classTypeName"
        :productId="classProductId"
        @close="setVisible5 = false"
        @openDetails='openDetails' 
        v-if="setVisible5"
        @refresh="getTableData"
      />
    </fullDialog>

    <!-- 班次详情的弹窗 -->
    <fullDialog
      v-model="detailsVisible"
      :title="titleName"
      @change="closeFn"
    >
      <Details
        @close="closeFn"
        v-if="detailsVisible"
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
import classDetail from "./class-detail";
import Details from "./class-detail/details.vue";
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
    classDetail,
    Details
  },
  provide() {
    return {
      template: this,
    };
  },
  data() {
    return {
      classTypeName:"",
      classTypeId:"",
      classProductId:"",
      detailsVisible: false,
      titleName:'j88',
      IsDisabled: false,
      editId: "",
      currentClassName: "",
      selectProductId: "",
      subjecttArr: [], //科目
      courseGroupArr: [], //班型分组
      // courseStageArr: [], //班型阶段
      // courseStageList: [],
      courseList: [], //课程
      refundRulesionArr: [], //退费规则
      currentProductId: "",
      filterColumn: ["classtypeGroupName", "crowdType", "crowdNum"],
      detailVisible: false,
      setVisible1: false,
      setVisible2: false,
      setVisible3: false,
      setVisible4: false,
      setVisible5: false,
      active: 0,
      showNum: 5,
      formOptions: [
        {
          prop: "className",
          element: "el-input",
          placeholder: "请输入班型名称",
        },
        {
          prop: "productName",
          element: "el-select",
          placeholder: "请选择项目",
          options: [],
          events: {},
        },
        {
          prop: "subjectName",
          element: "el-select",
          placeholder: "请选择科目",
          options: [],
        },
        {
          prop: "status",
          element: "el-select",
          placeholder: "请选择状态",
          options: [
            {
              label: "正常",
              value: 1,
            },
            {
              label: "暂停",
              value: 0,
            },
          ],
        },
        {
          prop: "classType",
          element: "el-select",
          placeholder: "请选择班型类型",
          options: [],
        },
        {
          prop: "classTypeBatch",
          element: "el-select",
          placeholder: "请选择年份",
          options: [],
        },
        {
          prop: "protocolType",
          element: "el-select",
          placeholder: "请选择协议类型",
          options: [],
        },
        {
          prop: "refundTypeId",
          element: "el-select",
          placeholder: "请选择退费类型",
          options: [],
        },
        {
          prop: "refundRules",
          element: "el-select",
          placeholder: "请选择退费规则",
          options: [],
        },
        {
          prop: "serviceYear",
          element: "el-select",
          placeholder: "请选择服务年限",
          options: [],
        },
        {
          prop: "classtypeGroupName",
          element: "el-select",
          placeholder: "请选择班型分组",
          options: [],
        },
      ],
      tableData: [],
      tableKey: [
        { name: "ID", value: "id" },
        { name: "班型名称", value: "className", operate: true },
        { name: "年份", value: "classTypeBatch" },
        { name: "项目", value: "productName" },
        { name: "科目", value: "subjectName" },
        { name: "班型类型", value: "classType" },
        { name: "协议类型", value: "protocolType" },
        { name: "退费类型", value: "refundType" },
        { name: "退费规则", value: "refundRules" },
        { name: "课程", value: "courses", operate: true },
        { name: "班型内容", value: "contentName", operate: true },
        { name: "学费/元", value: "totalFee" },
        { name: "服务年限", value: "serviceYear" },
        { name: "不可退金额/元", value: "norefundFee" },
        { name: "通过扣除费用", value: "passDeductFee" },
        { name: "班型分组", value: "classtypeGroupName" },
        { name: "班型阶段", value: "classTypeStage" },
        { name: "班群服务类型", value: "crowdType" },
        { name: "班群人数", value: "crowdNum" },
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
        // className: [
        //   { required: true, message: "请输入", trigger: "blur" },
        //   { max: 20, message: "命名，字数上限不超过20字", trigger: "blur" },
        // ],
        // classTypeBatch: [{ required: true, message: "请选择", trigger: "blur" }],
        // classType: [{ required: true, message: "请选择", trigger: "change" }],
        // classtypeGroupName: [
        //   { required: true, message: "请选择", trigger: "change" },
        // ],
        // serviceYear: [{ required: true, message: "请选择", trigger: "change" }],
        // protocolType: [
        //   { required: true, message: "请选择", trigger: "change" },
        // ],
        // refundTypeId: [
        //   { required: true, message: "请选择", trigger: "change" },
        // ],
        // status: [{ required: true, message: "请选择", trigger: "change" }],
      },
      // basicInfo2: {
      //   campusVisible: "",
      // },
      basicInfo: {
        courseContentId: [], //班型内容
        courses: [], //课程json数据
        courseStageArr: [], //班型阶段
        classTypeStage: [], //班型阶段名称
        stageGroupName: [], //stageGroupName，班型阶段名称
        stageGroupId: [], //班型阶段id
        totalFee: "", //总学费
        refundRules: "", //退费规则
        norefundFee: "", //不退费金额
        passDeductFee: "", //通过扣除费用
        tableData: [],
        tableKey: [
          { name: "id", value: "id" },
          { name: "所属项目", value: "productName" },
          { name: "内容名称", value: "contentName" },
          { name: "类型", value: "contentType" },
          { name: "核算规则", value: "accountingRules" },
          { name: "学费/元", value: "contentPrice" },
          { name: "录播情况", value: "playback" },

          {
            name: "操作",
            value: "edit",
            operate: true,
            width: 140,
            fixed: "right",
          },
        ],
        pageConfig: {
          totalCount: 0,
          pageNum: 1,
          showCount: 10,
        },
      },
      rules: {
        // sumPrice: [
        //   { required: true, message: "请输入", trigger: "blur" },
        //   { type: "number", message: "学费必须为数字值" },
        // ],
        // refundRules: [{ required: true, message: "请选择", trigger: "change" }],
        // norefundFee: [{ required: true, message: "请输入", trigger: "blur" }],
        // passDeductFee: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      weekPermissionListArr: [], //考药师周测权限
      statusListArr: [], //考药狮自习室权限
      simulationListArr: [], //考药狮模拟测试权限
      projectArr: [], //项目
      yearArr: [], //班型年份
      classTypeArr: [], //班型类型
      // classtypeGroupArr: [], //班型分组
      serviceYearArr: [], //服务年限
      protocolTypeArr: [], //协议类型
      refundTypeArr: [], //退费类型
      statusArr: [], //状态
      step3FormOptions: [
        {
          prop: "weekPermission",
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
          prop: "exchangeable",
          element: "el-radio",
          placeholder: "请选择电商是否可兑换",
          label: "电商是否可兑换",
          options: [
            {
              label: "是",
              value: true,
            },
            {
              label: "否",
              value: false,
            },
          ],
          initValue: "",
        },
        {
          prop: "simulationTestPermission",
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
          prop: "studyPower",
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
          prop: "crowdType",
          element: "el-select",
          placeholder: "班型服务",
          label: "班型服务：",
          options: [
            {
              label: "1",
              value: "1",
            },
          ],
          initValue: "",
        },
        {
          prop: "crowdNum",
          element: "el-input",
          placeholder: "班级群人数",
          label: "班级群人数：",
        },
        {
          prop: "campusVisible",
          element: "el-cascader",
          placeholder: "校区可见",
          initWidth: true,
          multiple: true,
          label: "校区可见：",
          options: [],
          events: {},
          // initValue: [[10], [11]],
        },
        // {
        //   prop: "campusVisible",
        //   element: "el-select",
        //   placeholder: "校区可见",
        //   initWidth: true,
        //   multiple: true,
        //   label: "校区可见：",
        //   options: [],
        //   events: {},
        //   initValue: [37],
        // },
        {
          prop: "financeCodeName1",
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
          prop: "financeCodeName2",
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
          prop: "financeCodeName3",
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
          prop: "financeCodeName4",
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
        weekPermission: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        exchangeable: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        simulationTestPermission: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        studyPower: [{ required: true, message: "请选择", trigger: "change" }],
        crowdType: [{ required: true, message: "请选择", trigger: "change" }],
        crowdNum: [{ required: true, message: "请输入", trigger: "blur" }],
        campusVisible: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        financeCodeName1: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        financeCodeName2: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        financeCodeName3: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        ClassType: [{ required: true, message: "请选择", trigger: "change" }],
      },
      campusArr: [],
      campusIds: [], //校区id [{name:汕头分校(广东校区),val:10}]
      distributeVisible: false,
      opportunityIds: "",
      detailTableData: [],
      detailTableKey: [
        { name: "id", value: "id" },
        { name: "年份", value: "classTypeBatch" },
        { name: "所属项目", value: "productName" },
        { name: "内容名称", value: "contentName" },
        { name: "类型", value: "contentType" },
        { name: "单科学费/元", value: "contentPrice" },
        { name: "课程阶段", value: "stageGroupName" },
        { name: "核算规则", value: "accountingRules" },
        { name: "录播情况", value: "playback" },
        { name: "授课开始时间", value: "courseStartTime" },
        { name: "创建时间", value: "createAt" },
        { name: "状态", value: "status" },
      ],
      title: "",
    };
  },
  computed: {
    totalPrice() {
      let totalPrice = 0;
      this.basicInfo.courses.map((item) => {
        if (item.checked) {
          totalPrice += item.coursePrice - 0;
        }
      });
      this.basicInfo.totalFee = totalPrice;
      return totalPrice;
    },
  },
  mounted() {
    this.getSelectList();
    this.getTableData();
  },
  methods: {
    // geteGroupListFunc(data) {//获取班型分組
    //   this.courseGroupArr = data;
    // },
    closeFn(){
           this.setVisible5 = true;
      this.detailsVisible = false;
    },
    openDetails(data){
      this.setVisible5 = false;
      this.detailsVisible = true;
       this.titleName = data.campusName;
    },
    turnTwoArr(arr, size) {
      // arr是一维数组 size是二维数组包含几条数据
      var arr2 = [];
      for (var i = 0; i < arr.length; i = i + size) {
        arr2.push(arr.slice(i, i + size));
      }
      return arr2; // 新的二维数组
    },
    changeSubArr(data) {
      this.subjecttArr = data;
    },
    reduceDimension(arr) {
      //二维数组转为一维数组
      var reduced = [];
      for (var i = 0; i < arr.length; i++) {
        reduced = reduced.concat(arr[i]);
      }
      return reduced;
    },
    campusChange(val) {
      let newArr = [];
      if (val && val.length > 0) {
        newArr = this.reduceDimension(val);
      }
      this.campusIds = this.campusArr.filter((el) => {
        return newArr.indexOf(el.val) != -1;
      });
    },
    addTableDataFn(data) {
      this.distributeVisible = false;
      if (data && data.length > 0) {
        if (this.basicInfo.tableData && this.basicInfo.tableData.length > 0) {
          let idArr = this.basicInfo.tableData.map((item) => {
            return item.id;
          });

          let arr = data.filter((el) => idArr.indexOf(el.id) == -1);
          this.basicInfo.tableData = this.basicInfo.tableData.concat(arr);
          // this.basicInfo.courseContentId =
        } else {
          this.basicInfo.tableData = this.basicInfo.tableData.concat(data);
        }
      }
    },
    initProductIdFn(data) {
      this.selectProductId = data;
    },
    handleSwitchChange(val) {},
    handleCheckedStageChange(val) {
      this.basicInfo.stageGroupName = val;
      let arr = this.basicInfo.courseStageArr.filter(
        (el) => val.indexOf(el.label) != -1
      );
      this.basicInfo.stageGroupId = arr.map((item) => {
        return item.value;
      });
    },
    getStageListFunc(data) {
      //获取班型阶段
      this.basicInfo.courseStageArr = data;
    },
    getCourseListFunc(data) {
      //获取课程
      this.courseList = data;
      this.basicInfo.courses = data.map((item) => ({
        courseName: item.label,
        checked: false,
        coursePrice: "",
        isperformance: false,
        courseId: item.value,
      }));
    },
    getSelectList() {
      //获取最近前5年的数组
      this.serviceYearArr = this.yearArr = this.formOptions[5].options = this.formOptions[9].options = this.$common
        .addYearArr()
        .map((item) => ({
          label: item,
          value: item,
        }));

      this.$fetch("courseclasstype_goSearch").then((res) => {
        this.projectArr = this.formOptions[1].options = res.data.productList.map(
          (item) => ({
            label: item.productName,
            value: item.id,
          })
        );
        console.log("projectArr-==", this.projectArr);
        this.formOptions[1].events = {
          change: this.productChange,
        };
        // 状态
        this.statusArr = this.formOptions[3].options = res.data.statusList.map(
          (item) => ({
            label: item.value,
            value: item.key,
          })
        );
        //协议类型
        this.protocolTypeArr = this.formOptions[6].options = res.data.protocolTypeList.map(
          (item) => ({
            label: item.value,
            value: item.key,
          })
        );
        //班型类型
        this.classTypeArr = this.formOptions[4].options = res.data.classTypeList.map(
          (item) => ({
            label: item.value,
            value: item.key,
          })
        );
        //请选择退费规则
        this.formOptions[8].options = res.data.refundRulesionList.map(
          (item) => ({
            label: item.value,
            value: item.key,
          })
        );
        //班型分组
        this.classtypeGroupArr = this.formOptions[10].options = res.data.classTypeGroupList.map(
          (item) => ({
            label: item.classtypeGroupName,
            value: item.id,
          })
        );
        // 退费类型
        this.refundTypeArr = this.formOptions[7].options = res.data.refundTypeList.map(
          (item) => ({
            label: item.value,
            value: item.key,
          })
        );
      });

      this.$fetch("courseclasstype_goAddWindows").then((res) => {
        console.log("goAddWindows 111", res.data);
        this.refundRulesionArr = res.data.refundRulesionList.map((item) => ({
          label: item.value,
          value: item.key,
        }));
        //考药师周测权限
        this.step3FormOptions[0].options = res.data.weekPermissionList.map(
          (item) => ({
            label: item.value,
            value: item.key,
          })
        );
        //考药狮模拟测试权限
        this.step3FormOptions[2].options = res.data.simulationTestPermissionList.map(
          (item) => ({
            label: item.value,
            value: item.key,
          })
        );
        //考药狮自习室权限
        this.step3FormOptions[3].options = res.data.studyPowerList.map(
          (item) => ({
            label: item.value,
            value: item.key,
          })
        );
        //班型服务 crowdTypeList
        this.step3FormOptions[4].options = res.data.crowdTypeList.map(
          (item) => ({
            label: item.value,
            value: item.key,
          })
        );
        //校区可见 parentCampusName
        this.step3FormOptions[6].options = res.data.campusList.map((item) => ({
          label: item.parentCampusName
            ? item.campusName + "(" + item.parentCampusName + ")"
            : item.campusName,
          value: item.id,
          parentId: item.parentId,
        }));

        //校区id
        this.campusArr = res.data.campusList.map((item) => ({
          name: item.parentCampusName
            ? item.campusName + "(" + item.parentCampusName + ")"
            : item.campusName,
          val: item.id,
        }));
        this.step3FormOptions[6].events = {
          change: this.campusChange,
        };
        //一级类目
        this.step3FormOptions[7].options = res.data.financeCode1List.map(
          (item) => ({
            label: item.value,
            value: item.key,
          })
        );
        //二级类目
        this.step3FormOptions[8].options = res.data.financeCode2List.map(
          (item) => ({
            label: item.value,
            value: item.key,
          })
        );
        //三级类目
        this.step3FormOptions[9].options = res.data.financeCode3List.map(
          (item) => ({
            label: item.value,
            value: item.key,
          })
        );
        // 班型
        this.step3FormOptions[10].options = res.data.financeCode4List.map(
          (item) => ({
            label: item.value,
            value: item.key,
          })
        );
      });
    },
    productChange(val) {
      this.currentProductId = val;
      //  获取科目下拉
      // let productId = this.formOptions[1].options.find((item) => {
      //   if (val == item.value) {
      //     return item.productId;
      //   }
      // });
      // { productId, id: val }
      this.$fetch("courseclasstype_subjectList", { productId: val }).then(
        (res) => {
          this.subjecttArr = this.formOptions[2].options = res.data.list.map(
            (item) => ({
              label: item.subjectName,
              value: item.id,
            })
          );
          console.log("iiii", this.formOptions[1].initValue, val);
          this.formOptions[2].initValue = "";
          this.formOptions[1].initValue = val;
          this.$refs.searchForm.addInitValue();
        }
      );
    },
    handleSet(row, index) {
      //设置配送图书
      this[`setVisible${index}`] = true;
    },
    loadSalaryCfg() {},
    goDetails(data) {
      //查看班型详情内容
      this.title = data.className;
      this.detailVisible = true;
      console.log("data", data);
      let { id } = data;
      this.$fetch("courseclasstype_contentDetails", {
        classTypeId: id,
      }).then((res) => {
        // detailTableData
        console.log("data  res.data.list", res.data.list);
        this.detailTableData = res.data.list.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.courseStartTime = this.$common._formatDates(
            item.courseStartTime
          );
          item.playback = item.playback ? "有录播" : "无录播";
          item.status = item.status == "Normal" ? "正常" : "暂停";
          console.log("data item", item);
          return item;
        });
      });
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
        this.$fetch("courseclasstype_listJson", {
          ...this.pageConfig,
          ...this.searchForm,
          ...params,
        }).then((res) => {
          this.tableData = res.data.list;
          this.pageConfig.totalCount = res.data.pager.totalRows;
          resolve();
        });
      });
    },
    handleEdit(data) {
      this.IsDisabled = true;
      this.addStatus = false;
      this.addVisible = true;
      this.editId = data.id;
      this.step3FormOptions[7].disabled = this.IsDisabled;
      this.step3FormOptions[8].disabled = this.IsDisabled;
      this.step3FormOptions[9].disabled = this.IsDisabled;
      this.step3FormOptions[10].disabled = this.IsDisabled;
      this.$fetch("courseclasstype_getclassType", {
        classTypeId: this.editId,
      }).then((res) => {
        for (var key in this.$refs.dataForm1.basicInfo) {
          this.$refs.dataForm1.basicInfo[key] = res.data.data.model[key];
        }

        //班型分组
        this.$refs.dataForm1.courseGroupArr = res.data.courseClassTypeGroup.map(
          (item) => ({
            label: item.classtypeGroupName,
            value: item.id,
          })
        );
        // 班型阶段
        this.basicInfo.courseStageArr = res.data.courseClassTypeStageGroup.map(
          (item) => ({
            label: item.stageGroupName,
            value: item.serialVersionUID,
          })
        );
        this.basicInfo.classTypeStage = res.data.data.model.stageGroupName.split(
          ","
        );
        this.courseList = res.data.courseInfo.map((item) => ({
          label: item.courseName,
          value: item.courseId,
        }));
        this.campusIds = res.data.data.model.campusIds;
        for (var key in this.basicInfo) {
          if (
            key != "pageConfig" &&
            key != "tableKey" &&
            key != "tableData" &&
            key != "courseStageArr" &&
            key != "classTypeStage"
          ) {
            if (key == "courses") {
              console.log(6666, res.data.data.model["courses"]);
              let arr = JSON.parse(res.data.data.model["courses"]);
              arr.map((el) => {
                el.checked = true;
              });

              if (arr.length < this.courseList.length) {
                this.courseList.map((item, i) => {
                  if (i >= arr.length) {
                    arr.push({
                      courseName: item.label,
                      checked: false,
                      coursePrice: "",
                      isperformance: false,
                      courseId: item.value,
                    });
                  }
                });
              }
              this.basicInfo["courses"] = arr;
            } else if (key == "courseContentId") {
              //班型内容
              let accountingRulesArr = [];
              let arr = res.data.data.model.courseContentIdList.map((item) => {
                item.id = item.contentId;
                item.playback = item.playback == true ? "有录播" : "无录播";
                console.log("accountingRules", item.accountingRules);
                res.data.accountingRulesList.map(el=>{
                  if(el.key == item.accountingRules){
                     item.accountingRules = el.value
                  }
                })
                  res.data.contentTypeList.map(el=>{
                  if(el.key == item.contentType){
                     item.contentType = el.value
                  }
                })
                return item;
              });
              this.basicInfo.tableData = arr;
      
            } else {
              this.basicInfo[key] = res.data.data.model[key];
            }
          }
        }

        this.step3FormOptions.forEach((item) => {
          if (item.prop == "campusVisible") {
            //校区可见
            let arr = [];
            res.data.data.model["campusIds"].map((item) => {
              arr.push(item.val);
            });
            item.initValue = this.turnTwoArr(arr, 1);
          } else {
            item.initValue = res.data.data.model[item.prop];
          }
        });
        this.$refs.dataForm3.addInitValue();
      });
    },
    handleDelete(row) {
      let info = "";
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          this.basicInfo.tableData = this.basicInfo.tableData.filter(
            (el) => row.id != el.id
          );
        })
        .catch(() => {});
    },
    handleClose(formName) {
      this.active = 0;
      this.$refs.dataForm3.onReset();
      this.$refs.dataForm2.resetFields();
      this.$refs.dataForm1.$refs.dataForm.resetFields();
      this.addVisible = false;
      this.IsDisabled = false;
      this.step3FormOptions[7].disabled = this.IsDisabled;
      this.step3FormOptions[8].disabled = this.IsDisabled;
      this.step3FormOptions[9].disabled = this.IsDisabled;
      this.step3FormOptions[10].disabled = this.IsDisabled;
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
              let financeCode1, financeCode2, financeCode3, financeCode4;
              let obj1 = this.step3FormOptions[7].options.find(
                (item) => item.value == formData.financeCodeName1
              );
              financeCode1 = obj1 && obj1.value;

              let obj2 = this.step3FormOptions[8].options.find(
                (item) => item.value == formData.financeCodeName2
              );
              financeCode2 = obj2 && obj2.value;

              let obj3 = this.step3FormOptions[9].options.find(
                (item) => item.value == formData.financeCodeName3
              );
              financeCode3 = obj3 && obj3.value;

              let obj4 = this.step3FormOptions[10].options.find(
                (item) => item.value == formData.financeCodeName4
              );
              financeCode4 = obj4 && obj4.value;
              this.$confirm(`确认提交吗？`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "success",
              }).then(async () => {
                let {
                  courseContentId,
                  courses,
                  stageGroupName,
                  stageGroupId,
                  totalFee,
                  refundRules,
                  norefundFee,
                  passDeductFee,
                } = this.basicInfo;
                let courses2 = courses.filter((el) => {
                  if (el.checked) {
                    return delete el.checked;
                  }
                });
                console.log("courses2", courses2);
                let {
                  productName,
                  subjectName,
                } = this.$refs.dataForm1.basicInfo;
                this.projectArr.map((item) => {
                  if (item.value == productName) {
                    productName = item.label;
                  }
                });
                this.subjecttArr.map((item) => {
                  if (item.value == subjectName) {
                    subjectName = item.label;
                  }
                });
                stageGroupName = stageGroupName.toString();
                stageGroupId = stageGroupId.toString();
                let paramas = {
                  ...formData,
                  financeCode1,
                  financeCode2,
                  financeCode3,
                  financeCode4,
                  courseContentId: JSON.stringify(courseContentId),
                  courses: JSON.stringify(courses2),
                  stageGroupName: stageGroupName,
                  stageGroupId: stageGroupId,
                  totalFee,
                  refundRules,
                  norefundFee,
                  passDeductFee,
                  ...this.$refs.dataForm1.basicInfo,
                  productName,
                  subjectName,
                };

                //保存修改
                this.$fetch("courseclasstype_edit", {
                  ...formData,
                  financeCode1,
                  financeCode2,
                  financeCode3,
                  financeCode4,
                  campusIds: JSON.stringify(this.campusIds),
                  ...paramas,
                  id: this.editId,
                })
                  .then((res) => {
                    this.$message.success("操作成功");
                    this.addVisible = false;
                    this.IsDisabled = false;
                    this.step3FormOptions[7].disabled = this.IsDisabled;
                    this.step3FormOptions[8].disabled = this.IsDisabled;
                    this.step3FormOptions[9].disabled = this.IsDisabled;
                    this.step3FormOptions[10].disabled = this.IsDisabled;
                    this.active = 0;
                    this.loadSalaryCfg();
                  })
                  .catch((error) => {});
              });
            }
          });
        } else {
          //添加
          this.$refs[formName].validate((valid, formData) => {
            if (valid) {
              let financeCode1, financeCode2, financeCode3, financeCode4;
              let obj1 = this.step3FormOptions[7].options.find(
                (item) => item.value == formData.financeCodeName1
              );
              financeCode1 = obj1 && obj1.value;

              let obj2 = this.step3FormOptions[8].options.find(
                (item) => item.value == formData.financeCodeName2
              );
              financeCode2 = obj2 && obj2.value;

              let obj3 = this.step3FormOptions[9].options.find(
                (item) => item.value == formData.financeCodeName3
              );
              financeCode3 = obj3 && obj3.value;

              let obj4 = this.step3FormOptions[10].options.find(
                (item) => item.value == formData.financeCodeName4
              );
              financeCode4 = obj4 && obj4.value;

              this.$confirm(`确认提交吗？`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "success",
              }).then(async () => {
                let {
                  courseContentId,
                  courses,
                  stageGroupName,
                  stageGroupId,
                  totalFee,
                  refundRules,
                  norefundFee,
                  passDeductFee,
                } = this.basicInfo;
                let courses2 = courses.filter((el) => {
                  if (el.checked) {
                    return delete el.checked;
                  }
                });
                console.log("courses2", courses2);
                let {
                  productName,
                  subjectName,
                } = this.$refs.dataForm1.basicInfo;
                this.projectArr.map((item) => {
                  if (item.value == productName) {
                    productName = item.label;
                  }
                });
                this.subjecttArr.map((item) => {
                  if (item.value == subjectName) {
                    subjectName = item.label;
                  }
                });
                stageGroupName = stageGroupName.toString();
                stageGroupId = stageGroupId.toString();
                let paramas = {
                  ...formData,
                  financeCode1,
                  financeCode2,
                  financeCode3,
                  financeCode4,
                  courseContentId: JSON.stringify(courseContentId),
                  courses: JSON.stringify(courses2),
                  stageGroupName: stageGroupName,
                  stageGroupId: stageGroupId,
                  totalFee,
                  refundRules,
                  norefundFee,
                  passDeductFee,
                  ...this.$refs.dataForm1.basicInfo,
                  productName,
                  subjectName,
                };

                this.$fetch("courseclasstype_save", {
                  ...formData,
                  financeCode1,
                  financeCode2,
                  financeCode3,
                  financeCode4,
                  campusIds: JSON.stringify(this.campusIds),
                  ...paramas,
                })
                  .then((res) => {
                    this.$message.success("操作成功");
                    this.addVisible = false;
                    this.active = 0;
                    this.loadSalaryCfg();
                  })
                  .catch((error) => {});
              });
            }
          });
        }
      } else {
        this.basicInfo.courseContentId = this.basicInfo.tableData.map(
          (item) => ({
            name: item.contentName,
            val: item.id,
          })
        );
        let dataForm;
        if (formName == "dataForm1") {
          dataForm = this.$refs.dataForm1.$refs.dataForm;
        } else {
          dataForm = this.$refs[formName];
        }
        dataForm.validate((valid, formData) => {
          if (valid) {
            this.active++;
          } else {
            console.log("nononno---");
          }
        });
      }
    },
    handleClassName(data) {
      this.setVisible5 = true;
      this.currentClassName = data.className;
      this.classTypeId = data.id;
      this.classTypeName = data.className;
      this.classProductId = data.productId;
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
