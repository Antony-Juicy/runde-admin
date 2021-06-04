<template>
  <div class="goods-list">
    <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
      ref="dataForm"
    ></search-form>

    <div class="clearfix">
      <div class="empty_box" v-if="tableData && tableData.length == 0">
        <img src="@/assets/empty-image.png" alt="" class="img-empty" />
        <p>暂无数据</p>
      </div>
      <template v-if="tableData && tableData.length > 0">
        <div class="content-wrap">
          <div class="container-wrap">
            <div
              class="content-container"
              v-for="(item, index) in tableData"
              :key="index"
              :style="{ float: index % 2 == 0 ? 'left' : 'right' }"
            >
              <div class="class-item">
                <div class="content-left">
                  <div class="title-container">
                    <div class="title">{{ item.className }}</div>
                    <div>
                      <el-tag>{{ item.classType }}</el-tag>
                    </div>
                  </div>
                  <div class="details">
                    <el-tag
                      v-if="item.productName"
                      type="info"
                      size="small"
                      style="margin-right: 10px; color: #63656b"
                      >{{ item.productName }}</el-tag
                    >
                    <el-tag
                      v-if="item.subjectName"
                      type="info"
                      size="small"
                      style="margin-right: 10px; color: #63656b"
                      >{{ item.subjectName }}</el-tag
                    >
                    <el-tag
                      v-if="item.protocolType"
                      type="info"
                      size="small"
                      style="margin-right: 10px; color: #63656b"
                      >{{ item.protocolType }}</el-tag
                    >
                    <el-tag
                      v-if="item.refundType"
                      type="info"
                      size="small"
                      style="margin-right: 10px; color: #63656b"
                      >{{ item.refundType }}</el-tag
                    >
                    <el-tag
                      v-if="item.classBatch"
                      type="info"
                      size="small"
                      style="margin-right: 10px; color: #63656b"
                      >{{ item.classBatch }}学年</el-tag
                    >
                  </div>
                  <div class="content-bottom">
                    <div class="campus-name">
                      <i class="el-icon-location-outline"></i
                      >{{ item.campusName }}
                    </div>
                    <div class="year-text">
                      服务年限{{ item.serviceYear }}年
                    </div>
                  </div>
                </div>
                <div class="content-right">
                  <div class="price">
                    <span style="font-size: 16px">￥</span>{{ item.totalFee }}
                  </div>
                  <div v-if="item.status == '正常'">
                    <el-button type="primary" size="small" @click="signUp(item)"
                      >报名</el-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="el-pagination-box" style="margin-bottom: 20px">
            <el-pagination
              background
              @size-change="sizeChange"
              @current-change="pageChange"
              :current-page="pageConfig.currentPage"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="pageConfig.showCount"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageConfig.totalCount"
            >
            </el-pagination>
          </div>
        </div>
      </template>
    </div>

    <!-- 报名弹窗 -->
    <full-dialog
      v-model="addVisible"
      :title="'报名信息'"
      hideTitle
      @change="handleClose()"
    >
      <el-card shadow="never" class="card-container">
        <div class="card-title">学员信息</div>
        <el-form
          ref="stuForm"
          :model="stuForm"
          label-width="110px"
          size="small"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="身份证"
                prop="cardId"
                :rules="[
                  {
                    required: true,
                    message: '请输入正确的身份证号',
                    trigger: 'blur',
                  },
                  {
                    validator: validator2,
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input
                  v-model="stuForm.cardId"
                  style="width: 280px; margin-right: 10px"
                  :maxlength="18"
                  @focus="handleFocus"
                  @blur="handleCheckInfo"
                  :disabled="disabled"
                  placeholder="请输入学员身份证"
                ></el-input>
                <!-- <el-button type="primary" @click="handleCheckInfo"
                  >查询</el-button
                > -->
                <el-button
                  type="primary"
                  :disabled="clickdisabled"
                  @click="handleResetInfo"
                  >重置</el-button
                >
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
                  <el-form-item label="学员姓名">
                    <el-input v-model="stuForm.name" style="width: 200px" placeholder="请输入学员姓名"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="学员类型">
                    <el-select v-model="stuForm.name" style="width: 200px" placeholder="请选择学员类型"></el-select>
                  </el-form-item>
                </el-col> -->
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="学员姓名"
                prop="studentName"
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'blur',
                }"
              >
                <el-input
                  v-model="stuForm.studentName"
                  style="width: 200px"
                  placeholder="请输入学员姓名"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="学员类型"
                prop="studentType"
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'change',
                }"
              >
                <el-select
                  @change="changeSelect"
                  v-model="stuForm.studentType"
                  style="width: 200px"
                  disabled
                  placeholder="请选择学员类型"
                >
                  <el-option
                    :label="item.label"
                    :value="item.value"
                    v-for="(item, index) in studentTypeList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="学年"
                prop="classBatch"
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'change',
                }"
              >
                <el-select
                  v-model="stuForm.classBatch"
                  style="width: 200px"
                  placeholder="请选择学年"
                >
                  <el-option
                    :label="item.label"
                    :value="item.value"
                    v-for="(item, index) in recentlyYearList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="来源类型"
                prop="saleSource"
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'change',
                }"
              >
                <el-select
                  v-model="stuForm.saleSource"
                  style="width: 200px"
                  placeholder="请选择来源类型"
                  @change="saleSourceChange"
                >
                  <el-option
                    :label="item.label"
                    :value="item.value"
                    v-for="(item, index) in saleSourceList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="来源名称"
                prop="mediatorName"
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'blur',
                }"
              >
                <el-input
                  v-model="stuForm.mediatorName"
                  style="width: 200px"
                  placeholder="请输入来源名称"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="学历"
                prop="education"
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'change',
                }"
              >
                <el-select
                  v-model="stuForm.education"
                  style="width: 200px"
                  placeholder="请选择学历"
                >
                  <el-option
                    :label="item.label"
                    :value="item.value"
                    v-for="(item, index) in eduList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <!-- <el-col :span="8">
              <el-form-item
                label="身份证"
                prop="cardId"
                :rules="[
                  {
                    required: true,
                    message: '不能为空',
                    trigger: 'blur',
                  },
                  {
                    validator: validator2,
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input
                  v-model="stuForm.cardId"
                  style="width: 200px"
                  :maxlength="18"
                  placeholder="请输入身份证"
                ></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :span="8">
              <el-form-item
                label="手机号"
                prop="phone"
                :rules="[
                  {
                    required: true,
                    message: '不能为空',
                    trigger: 'blur',
                  },
                  {
                    validator: validator,
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input
                  v-model="stuForm.phone"
                  :maxlength="11"
                  style="width: 200px"
                  placeholder="请输入手机号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                v-show="itemData.productName == '健康管理师'"
                label="报考省份"
                prop="provinceName"
                :rules="{
                  required: itemData.productName == '健康管理师' ? true : false,
                  message: '不能为空',
                  trigger: 'change',
                }"
              >
                <el-select
                  v-model="stuForm.provinceName"
                  style="width: 200px"
                  placeholder="请选择报考省份"
                >
                  <el-option
                    :label="item.label"
                    :value="item.value"
                    v-for="(item, index) in healthCourseProvinceList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="性别"
                prop="gender"
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'change',
                }"
              >
                <el-select
                  v-model="stuForm.gender"
                  style="width: 200px"
                  placeholder="请选择性别"
                >
                  <el-option
                    :label="item.label"
                    :value="item.value"
                    v-for="(item, index) in genderList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="省"
                prop="provincinitValue"
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'change',
                }"
              >
                <el-select
                  v-model="stuForm.provincinitValue"
                  style="width: 200px"
                  placeholder="请选择省份"
                  @change="choseProvince"
                >
                  <el-option
                    :label="item.value"
                    :value="item.id"
                    v-for="(item, index) in provinceList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="市"
                prop="cityinitValue"
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'change',
                }"
              >
                <el-select
                  v-model="stuForm.cityinitValue"
                  style="width: 200px"
                  placeholder="请选择市"
                  @change="choseCity"
                >
                  <el-option
                    :label="item.value"
                    :value="item.id"
                    v-for="(item, index) in cityList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="区/县"
                prop="countyinitValue"
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'change',
                }"
              >
                <el-select
                  v-model="stuForm.countyinitValue"
                  style="width: 200px"
                  placeholder="请选择区/县"
                  @change="choseCounty"
                >
                  <el-option
                    :label="item.value"
                    :value="item.id"
                    v-for="(item, index) in countyList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="收件地址"
                prop="address"
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'blur',
                }"
              >
                <span
                  style="margin-right: 6px"
                  v-text="
                    stuForm.provincinitValue ? stuForm.provincinitValue : '省'
                  "
                ></span
                ><span
                  style="margin-right: 6px"
                  v-text="stuForm.cityinitValue ? stuForm.cityinitValue : '市'"
                ></span
                ><span
                  style="margin-right: 6px"
                  v-text="
                    stuForm.countyinitValue ? stuForm.countyinitValue : '区'
                  "
                ></span>
                <el-input
                  v-model="stuForm.address"
                  style="width: 500px"
                  placeholder="请输入收件地址（省市区数据请勿重复填写，否则无法正常邮寄）"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <p
            style="
              color: rgba(163, 0, 20, 0.96);
              font-size: 14px;
              margin-top: 0;
              margin-left: 32px;
            "
          >
            *省市区数据请勿重复填写，否则无法正常邮寄
          </p>
        </el-form>
      </el-card>

      <el-card shadow="never" class="card-container">
        <div class="card-title">课程列表</div>
        <el-form
          ref="stuForm2"
          :model="stuForm2"
          label-width="100px"
          size="small"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="校区"
                prop="campusName"
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'change',
                }"
              >
                <el-select
                  disabled
                  v-model="stuForm2.campusName"
                  style="width: 200px"
                  placeholder="请选择校区"
                >
                  <el-option
                    :label="item.label"
                    :value="item.value"
                    v-for="(item, index) in campusList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="班次"
                prop="classType"
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'change',
                }"
              >
                <el-select
                  disabled
                  v-model="stuForm2.classType"
                  style="width: 200px"
                  placeholder="请选择班次"
                >
                  <el-option
                    :label="item.label"
                    :value="item.value"
                    v-for="(item, index) in classTypeList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item
              label="课程"
              prop="courses"
              :rules="{
                required: true,
                message: '不能为空',
                trigger: 'change',
              }"
            >
              <el-checkbox-group
                v-model="stuForm2.courses"
                @change="changeCheckbox"
              >
                <el-checkbox
                  v-for="course in courseInfoList"
                  :key="course.vaule"
                  :label="course.label"
                  :value="course.value"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="优惠券" prop="couponId">
                <el-select
                  v-model="stuForm2.couponId"
                  style="width: 200px"
                  placeholder="请选择优惠券"
                  clearable
                  @clear="clearCoupon"
                  @change="changeCoupon"
                >
                  <el-option
                    :label="item.couponName"
                    :value="item.id"
                    v-for="item in couponList"
                    :key="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="优惠金额"
                prop="faceValue"
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'change',
                }"
              >
                <el-input
                  readonly
                  v-model="stuForm2.faceValue"
                  style="width: 200px"
                  placeholder="优惠金额"
                >
                  <!-- <el-option
                    :label="item.label"
                    :value="item.value"
                    v-for="(item, index) in showInfoArr"
                    :key="index"
                  ></el-option> -->
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="应收"
                prop="realPrice"
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'change',
                }"
              >
                <el-input
                  readonly
                  v-model="stuForm2.realPrice"
                  style="width: 200px"
                  placeholder="请选择课程信息"
                >
                  <el-option
                    :label="item.label"
                    :value="item.value"
                    v-for="(item, index) in showInfoArr"
                    :key="index"
                  ></el-option>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>

      <el-card shadow="never" class="card-container">
        <div class="card-title">服务信息</div>
        <el-form
          ref="stuForm3"
          :model="stuForm3"
          label-width="100px"
          size="small"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="招生老师"
                prop="enrollId"
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'change',
                }"
              >
                <el-select
                  v-model="stuForm3.enrollId"
                  style="width: 200px"
                  filterable
                  placeholder="请选择招生老师"
                >
                  <el-option
                    :label="item.label"
                    :value="item.value"
                    v-for="(item, index) in staffInfoList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="班主任"
                prop="classTeacherId"
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'change',
                }"
              >
                <el-select
                  v-model="stuForm3.classTeacherId"
                  style="width: 200px"
                  filterable
                  placeholder="请选择班主任"
                >
                  <el-option
                    :label="item.label"
                    :value="item.value"
                    v-for="(item, index) in eduStaffList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="代理人" prop="agent">
                <el-select
                  v-model="stuForm3.agent"
                  style="width: 200px"
                  placeholder="请选择代理人"
                >
                  <el-option
                    :label="item.label"
                    :value="item.value"
                    v-for="(item, index) in proxyInfoList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item
                label="市场老师"
                prop="staffId"
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'change',
                }"
              >
                <el-select
                  v-model="stuForm3.staffId"
                  style="width: 200px"
                  filterable
                  placeholder="请选择市场老师"
                >
                  <el-option
                    :label="item.label"
                    :value="item.value"
                    v-for="(item, index) in marketStaffList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="教务老师"
                prop="eduUserId"
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'change',
                }"
              >
                <el-select
                  v-model="stuForm3.eduUserId"
                  style="width: 200px"
                  filterable
                  placeholder="请选择教务老师"
                >
                  <el-option
                    :label="item.label"
                    :value="item.value"
                    v-for="(item, index) in eduStaffList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>

      <el-card shadow="never" class="card-container">
        <div class="card-title">其他</div>
        <el-form
          ref="stuForm4"
          :model="stuForm4"
          label-width="100px"
          size="small"
        >
          <el-row>
            <el-form-item label="备注" prop="remark">
              <el-input
                type="textarea"
                rows="3"
                v-model="stuForm4.remark"
                placeholder="请输入备注内容"
              ></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </el-card>

      <div class="btn-wrapper" style="text-align: right">
        <el-button
          type="primary"
          :disabled="clickdisabled"
          @click="submitAddForm()"
          >提交</el-button
        >
      </div>
    </full-dialog>
  </div>
</template>
<script>
import RdForm from "@/components/RdForm";
import Pagination from "@/components/Pagination";
import { scrollTo } from "@/utils/scroll-to";
import Axios from "axios";
import testData from "./area.json";
import Common from "@/utils/common";
export default {
  name: "goods-list",
  data() {
    return {
      disabled: false,
      clickdisabled: false,
      validator: Common._validatorPhone,
      validator2: Common._isCardNo,
      testData: "",
      addVisible: false,
      formOptions: [
        {
          prop: "status",
          element: "el-select",
          placeholder: "状态",
          options: [],
        },
        {
          prop: "classBatch",
          element: "el-select",
          placeholder: "年份",
          options: [],
        },
        {
          prop: "productId",
          element: "el-select",
          placeholder: "项目",
          options: [],
          events: {},
        },
        {
          prop: "subjectId",
          element: "el-select",
          placeholder: "科目",
          options: [],
          events: {},
          disabled: false,
        },
        {
          prop: "classTypeId",
          element: "el-select",
          placeholder: "班型",
          options: [],
          filterable: true,
          disabled: false,
        },
        {
          prop: "classType",
          element: "el-select",
          placeholder: "班型类型",
          options: [],
        },
      ],
      couponList: [], //优惠券
      studentTypeList: [], //学员类型
      recentlyYearList: [], //学年
      saleSourceList: [], //来源类型
      eduList: [], //学历
      genderList: [], //性别
      healthCourseProvinceList: [], //报考省份
      eduStaffList: [], //教务老师,班主任
      marketStaffList: [], //市场老师
      staffInfoList: [], //招生老师
      proxyInfoList: [], //代理人
      courseInfoList: [], //课程
      campusList: [], //校区
      classTypeList: [], //班次
      provinceList: [],
      cityList: [],
      countyList: [],
      showInfoArr: [
        {
          label: "是",
          value: "YES",
        },
        {
          label: "否",
          value1: "NO",
        },
      ],
      searchForm: {},
      emptyText: "暂无数据",
      tableData: [{}, {}, {}, {}, {}, {}, {}, {}],
      tableKey: [
        {
          name: "内容",
          value: "content",
          operate: true,
        },
      ],
      pageConfig: {
        totalCount: 10,
        currentPage: 1,
        showCount: 10,
      },
      editId: "",
      visible: true,
      itemData: "",
      stuForm: {
        idCardAndPhone: "",
        studentName: "",
        studentType: "New",
        classBatch: "",
        saleSource: "",
        mediatorName: "",
        education: "",
        cardId: "",
        provinceName: "",
        phone: "",
        gender: "",
        provincId: "",
        cityId: "",
        countyId: "",
        provinc: "",
        city: "",
        county: "",
        provincinitValue: "",
        cityinitValue: "",
        countyinitValue: "",
        address: "",
        studentId: "",
      },
      stuForm2: {
        campusName: "",
        classType: "",
        campusId: "",
        classId: "",
        courses: [],
        courseNum: 0,
        courseNames: "",
        couponId: "",
        faceValue: 0,
        realPrice: "",
        toTalPrice: "",
      },
      stuForm3: {
        enrollId: "",
        classTeacherId: "",
        eduUserId: "",
        staffId: "",
        agent: "",
      },
      stuForm4: {
        remark: "",
      },
      stuFormForm1Valid: false, //表单1校验
      stuFormForm2Valid: false, //表单2校验
      stuFormForm3Valid: false, //表单3校验
      stuFormForm4Valid: false, //表单4校验
      radio: "",
    };
  },
  components: {
    RdForm,
    Pagination,
  },
  created() {
    // this.testData = testData;
    this.getdata();
  },
  mounted() {
    this.getTableData();
    this.getSelectList();
  },
  watch: {
    "stuForm.studentType": {
      handler(newName, oldName) {
        console.log("obj.a changed", newName, oldName);
        if (oldName != undefined) {
          this.$nextTick(() => {
            // this.getCounpList();
          });
        }
      },
      immediate: true,
      // deep: true
    },
    "stuForm2.courseNum": {
      handler(newName, oldName) {
        console.log("obj.a changed courseNum", newName, oldName);
        if (oldName != undefined) {
          // if (!this.stuForm.studentType) {
          //   this.$message.warning("请先选择学员类型");
          //   return;
          // }
          this.$nextTick(() => {
            this.getCounpList();
          });
        }
        if (newName == 0) {
          this.stuForm2.realPrice = 0;
        }
      },
      immediate: true,
      // deep: true
    },
    courseInfoList: {
      handler(newName, oldName) {
        if (oldName && oldName.length > 0) {
          console.log("oldNameoldName", oldName);
          //清除校验
          this.$nextTick(() => {
            this.$refs.stuForm2.clearValidate("courses");
          });
        }
      },
      immediate: true,
    },
  },
  methods: {
    handleClose() {
      this.addVisible = false;
      this.disabled = false;
      this.$refs.stuForm.resetFields();
      this.$refs.stuForm2.resetFields();
      this.stuForm2.campusName = this.itemData.campusName;
      this.stuForm2.classType = this.itemData.className;
      this.stuForm.classBatch = this.itemData.classBatch;
      this.$refs.stuForm3.resetFields();
      this.$refs.stuForm4.resetFields();
    },
    clearCoupon() {
      this.stuForm2.faceValue = 0;
      this.stuForm2.realPrice = this.stuForm2.toTalPrice;
    },
    changeCoupon(e) {
      //选择优惠券
      this.couponList.map((el) => {
        if (e == el.id) {
          switch (el.couponType) {
            case "折扣优惠":
              this.stuForm2.faceValue =
                (Number(this.stuForm2.toTalPrice) *
                  (100 - Number(el.couponRate))) /
                100;
              this.stuForm2.realPrice =
                Number(this.stuForm2.toTalPrice) *
                (Number(el.couponRate) / 100);
              return;
            case "满减优惠":
              if (Number(this.stuForm2.toTalPrice) < el.fullPrice) {
                this.$message.warning("未到达满减优惠条件！");
                this.stuForm2.faceValue = 0;
                return;
              }
              // 总价-(Math.floor(总价/1000))*400
              this.stuForm2.realPrice =
                Number(this.stuForm2.toTalPrice) -
                Math.floor(Number(this.stuForm2.toTalPrice) / el.fullPrice) *
                  el.faceValue;
              this.stuForm2.faceValue =
                Math.floor(Number(this.stuForm2.toTalPrice) / el.fullPrice) *
                el.faceValue;
              return;
            case "普通优惠":
              this.stuForm2.realPrice =
                Number(this.stuForm2.toTalPrice) - el.faceValue;
              this.stuForm2.faceValue = el.faceValue;
              return;
            case "梯度优惠":
              let money = JSON.parse(el.gradientInfo).filter((el) => {
                if (el.key == this.stuForm2.courseNum) {
                  return el.value;
                }
              })[0].value;
              this.stuForm2.realPrice =
                Number(this.stuForm2.toTalPrice) - Number(money);
              this.stuForm2.faceValue = Number(money);
              return;
          }
        }
      });
    },
    saleSourceChange(val) {
      //来源类型更变
      if (val && this.stuForm2.courses.length > 0) {
        this.getCounpList();
        this.stuForm2.couponId = ""; //置空优惠券
        this.clearCoupon(); //清空优惠金额
      }
    },
    changeSelect() {
      //选择学员类型
      this.stuForm2.couponId = ""; //置空优惠券
      // this.stuForm2.realPrice = ""; //应收
      // this.stuForm2.faceValue = ""; //优惠金额
    },
    getCounpList() {
      //优惠券
      let { campusId, classTypeId, productId, subjectId } = this.itemData;
      this.couponList = [];
      this.$fetch("coupontemplateversiontwo_availableCoupon", {
        campusId,
        classTypeId,
        productId,
        subjectId,
        courseNames: this.stuForm2.courseNames,
        courseNum: this.stuForm2.courseNum,
        classId: this.stuForm2.classId,
        studentType: this.stuForm.studentType == "New" ? "新学员" : "老学员",
        totalPrice: this.stuForm2.toTalPrice ? this.stuForm2.toTalPrice : 0,
      }).then((res) => {
        this.couponList = res.data.dataJson.list;
      });
    },
    choseProvince(e) {
      //选省
      this.stuForm.provincId = e;
      this.stuForm.cityinitValue = ""; //重置市区
      this.stuForm.countyinitValue = ""; //重置区县
      this.cityList = [];
      this.countyList = [];
      for (var index2 in this.provinceList) {
        if (e == this.provinceList[index2].id) {
          let shi, pname;
          shi = this.provinceList[index2].children;
          pname = this.provinceList[index2].value;
          this.stuForm.provincinitValue = pname; //省
          console.log("citem,cIndexshi,pname", shi, pname);
          for (let pitem in shi) {
            this.cityList.push({
              id: shi[pitem].val,
              value: pitem,
              children: shi[pitem].items,
            });
          }
        }
      }
    },
    choseCity(e) {
      //选市
      this.stuForm.cityId = e;
      this.stuForm.countyinitValue = ""; //重置区县
      this.countyList = [];
      for (var index3 in this.cityList) {
        if (e == this.cityList[index3].id) {
          this.qu1 = this.cityList[index3].children;
          this.cname = this.cityList[index3].value;
          this.stuForm.cityinitValue = this.cname; //市
          console.log("cname,qu1", this.qu1, this.cname);
          for (let citem in this.qu1) {
            this.countyList.push({
              id: this.qu1[citem],
              value: citem,
              children: [],
            });
          }
        }
      }
    },
    choseCounty(e) {
      // 选区
      this.stuForm.countyId = e;
      for (var index4 in this.countyList) {
        if (e == this.countyList[index4].id) {
          let quname = this.countyList[index4].value;
          this.stuForm.countyinitValue = quname; //区
          console.log("cname,qu1 quname", quname);
        }
      }
    },
    getdata() {
      Axios.get("https://rdimg.rundejy.com/data/common/address/address.json")
        .then((res) => {
          this.testData = res.data;
          for (let item in this.testData) {
            this.provinceList.push({
              id: this.testData[item].val,
              value: item,
              children: this.testData[item].items,
            });
          }

          console.log("provinceList", this.provinceList);
        })
        .catch((err) => {
          console.log("testData err", err);
        });
    },
    handleResetInfo() {
      //重置
      this.disabled = false;
      this.$refs.stuForm.resetFields();
      this.$refs.stuForm2.resetFields();
      this.stuForm2.campusName = this.itemData.campusName;
      this.stuForm2.classType = this.itemData.className;
      this.stuForm.classBatch = this.itemData.classBatch;
      this.cityList = []; //重置市
      this.countyList = []; //重置区
      this.stuForm2.couponId = ""; //置空优惠券
      this.stuForm2.realPrice = 0; //清空应收金额
      this.stuForm2.faceValue = 0; //清空优惠金额
      this.couponList = [];
    },
    open(studentCampusModel) {
      this.$alert(
        ` 
        <h3>经系统查询，该学员为老学员，个人信息如下：</h3>
        <div>
        <p><span>姓名：</span> <span>${studentCampusModel.studentName}</span></p> 
          <p> <span>手机号：</span> <span>${studentCampusModel.phone}</span> </p>
           <p>  <span>身份证号：</span> <span>${studentCampusModel.cardId}</span> </p>
        </div>
        <div style="margin-top:40px;font-size:16px;font-weight:500;">
        是否自动填充学员信息？
        </div>
        `,
        "学员查询结果",
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "是",
          cancelButtonText: "否",
          showCancelButton: true,
          customClass: "elmgs_confirm-box",
          confirmButtonClass: "confirmButtonClass",
          cancelButtonClass: "cancelButtonClass",
        }
      )
        .then(() => {
          //老学员
          this.$message({
            type: "success",
            message: "填充学员信息成功",
          });
          this.disabled = true;
          for (var key in studentCampusModel) {
            if (this.stuForm[key] != undefined) {
              this.stuForm[key] = studentCampusModel[key];
            }
          }
          this.stuForm["provincinitValue"] = studentCampusModel["provinc"];
          this.stuForm["cityinitValue"] = studentCampusModel["city"];
          this.stuForm["countyinitValue"] = studentCampusModel["county"];
          this.choseProvince(this.stuForm.provincId);
          this.choseCity(this.stuForm.cityId);
          this.choseCounty(this.stuForm.countyId);
          console.log("countycountycounty1111", this.stuForm);
          this.stuForm.studentType = "Old";

          this.$nextTick(() => {
            //清除校验
            for (let key in this.stuForm) {
              if (this.stuForm[key] !== "") {
                this.$refs.stuForm.clearValidate(`${key}`);
              }
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消填充学员信息",
          });
          this.stuForm.studentType = "New";
          this.$refs.stuForm.resetFields();
          this.$refs.stuForm2.resetFields();
          this.stuForm2.campusName = this.itemData.campusName;
          this.stuForm2.classType = this.itemData.className;
          this.stuForm.classBatch = this.itemData.classBatch;
          this.$refs.stuForm3.resetFields();
          this.$refs.stuForm4.resetFields();
        });
    },
    handleFocus() {
      this.clickdisabled = true;
    },
    handleCheckInfo() {
      this.clickdisabled = false;
      this.$refs.stuForm.validateField("cardId", (errMsg) => {
        if (errMsg) {
          console.log("校验失败");
        } else {
          //校验通过
          this.$fetch("studentcampus_basisIdCardAndPhoneGetInfo", {
            idCardAndPhone: this.stuForm.cardId,
          }).then((res) => {
            //根据身份证或手机查询学员信息
            if (res.data.studentCampusModel) {
              //老学员
              this.open(res.data.studentCampusModel);
              // return;
              // for (var key in res.data.studentCampusModel) {
              //   if (this.stuForm[key] != undefined) {
              //     this.stuForm[key] = res.data.studentCampusModel[key];
              //   }
              // }
              // this.stuForm["provincinitValue"] =
              //   res.data.studentCampusModel["provinc"];
              // this.stuForm["cityinitValue"] =
              //   res.data.studentCampusModel["city"];
              // this.stuForm["countyinitValue"] =
              //   res.data.studentCampusModel["county"];
              // console.log("countycountycounty1111", this.stuForm);
              // this.stuForm.studentType = "Old";
            } else {
              //新学员
              this.stuForm.studentType = "New";
              // this.$refs.stuForm.resetFields();
              // this.$refs.stuForm2.resetFields();
              // this.stuForm2.campusName = this.itemData.campusName;
              // this.stuForm2.classType = this.itemData.className;
              // this.stuForm.classBatch = this.itemData.classBatch;
              // this.$refs.stuForm3.resetFields();
              // this.$refs.stuForm4.resetFields();
            }
          });
        }
      });
    },
    sum(arr) {
      return eval(arr.join("+"));
    },
    changeCheckbox(val) {
      if (!this.stuForm.studentType) {
        this.$message.warning("请先选择学员类型");
        // this.$refs.stuForm2.clearValidate("courses");
        this.stuForm2.courses = [];
        return;
      }
      if (!this.stuForm.saleSource) {
        this.$message.warning("请先选择来源类型");
        // this.$refs.stuForm2.clearValidate("courses");
        this.stuForm2.courses = [];
        return;
      }
      this.stuForm2.couponId = ""; //置空优惠券
      this.stuForm2.faceValue = 0;
      this.stuForm2.courses = val;
      let arr = this.courseInfoList.filter((el) => val.indexOf(el.label) != -1);
      let priceArr = arr.map((item) => {
        return item.price;
      });
      this.stuForm2.courseNames = this.stuForm2.courses.toString();
      this.stuForm2.courseNum = this.stuForm2.courses.length;
      this.stuForm2.toTalPrice =
        priceArr && priceArr.length > 0 ? this.sum(priceArr) : 0;
      console.log(
        "this.sum(priceArr)",
        this.stuForm2,
        this.stuForm2.toTalPrice
      );
      this.stuForm2.realPrice = this.stuForm2.toTalPrice;
      // this.stuForm2.realPrice = "";
      // this.stuForm2.faceValue = "";
    },
    getSelectList() {
      this.$fetch("courseclass_classOrderlistJsonSearch").then((res) => {
        const {
          classTypeList,
          productList,
          recentlyYear,
          statusList,
        } = res.data;
        this.formOptions[0].options = statusList.map((item) => ({
          label: item.value,
          value: item.key,
        }));
        this.formOptions[1].options = recentlyYear.map((item) => ({
          label: item,
          value: item,
        }));
        this.formOptions[2].options = productList.map((item) => ({
          label: item.productName,
          value: item.id,
        }));
        this.formOptions[2].events = {
          change: this.productChange,
          clear: this.clearProductFn,
        };

        this.formOptions[3].events = {
          change: this.subjectChange,
          clear: this.clearSubjectFn,
        };
        this.formOptions[5].options = classTypeList.map((item) => ({
          label: item.value,
          value: item.key,
        }));
      });
    },
    onSearch(val) {
      this.searchForm = {
        ...val,
      };
      console.log(val, this.searchForm, "val---");
      this.pageConfig.currentPage = 1;
      this.getTableData();
    },
    getTableData(params = {}) {
      this.$fetch("courseclass_classOrderlistJson", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        this.tableData = res.data.list.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          return item;
        });
        this.pageConfig.totalCount = res.data.pager.totalRows;
      });
    },
    clearProductFn() {
      this.formOptions[3].options = []; //清除科目的下拉
      //清除科目选中
      this.$refs.dataForm.setValue({
        subjectId: "",
      });
      this.formOptions[4].options = []; //清除班型类型的下拉
      //清除班型类型选中
      this.$refs.dataForm.setValue({
        classTypeId: "",
      });
    },
    clearSubjectFn() {
      this.formOptions[4].options = []; //清除班型类型的下拉
      //清除班型类型选中
      this.$refs.dataForm.setValue({
        classTypeId: "",
      });
    },
    productChange(val) {
      // this.formOptions[3].disabled = false;
      if (val) {
        //有选中项目才请求科目
        this.$fetch("courseclasstype_subjectList", {
          productId: val,
        })
          .then((res) => {
            let subjectArr = res.data.list.map((item) => ({
              label: item.subjectName,
              value: item.id,
            }));
            this.formOptions[3].options = subjectArr;
            this.formOptions[4].options = [];
            this.$refs.dataForm.setValue({
              subjectId: "",
            });
            this.$refs.dataForm.setValue({
              classTypeId: "",
            });
          })
          .catch((err) => {
            //没数据的时候
            this.clearProductFn();
          });
      }
    },
    subjectChange(val) {
      // this.formOptions[4].disabled = false;
      if (val) {
        //有选中科目才请求
        this.$fetch("courseclasstype_classtypeList", {
          subjectId: val,
        }).then((res) => {
          if (!res.data.dataJson.list) {
            return;
          }
          let classTypeArr = res.data.dataJson.list.map((item) => ({
            label: item.className,
            value: item.id,
          }));
          console.log(classTypeArr);
          this.formOptions[4].options = classTypeArr;
          this.$refs.dataForm.setValue({
            classTypeId: "",
          });
        });
      }
    },
    pageChange(val) {
      this.pageConfig.currentPage = val;
      this.getTableData();
      scrollTo(0, 800);
    },
    sizeChange(val) {
      this.pageConfig.showCount = val;
      this.getTableData();
      scrollTo(0, 800);
    },
    handleAdd() {
      this.addStatus = true;
      this.addVisible = true;
    },
    submitAddForm() {
      this.$refs["stuForm"].validate((valid) => {
        //第一个表单ref="stuForm"
        if (valid) {
          this.stuFormForm1Valid = true;
        }
      });
      this.$refs["stuForm2"].validate((valid) => {
        //第2个表单ref="stuForm2"
        if (valid) {
          this.stuFormForm2Valid = true;
        }
      });
      this.$refs["stuForm3"].validate((valid) => {
        //第3个表单ref="stuForm3"
        if (valid) {
          this.stuFormForm3Valid = true;
        }
      });
      if (
        this.stuFormForm1Valid &&
        this.stuFormForm2Valid &&
        this.stuFormForm3Valid
      ) {
        //当这三个表单都通过
        let classTeacherName, couponName, eduUserName, enrollName, staffName;
        this.provinceList.filter((el) => {
          if (this.stuForm.provincId == el.id) {
            this.stuForm.provinc = el.value;
          }
        });
        this.cityList.filter((el) => {
          if (this.stuForm.cityId == el.id) {
            this.stuForm.city = el.value;
          }
        });
        this.countyList.filter((el) => {
          if (this.stuForm.countyId == el.id) {
            this.stuForm.county = el.value;
          }
        });
        this.eduStaffList.filter((el) => {
          if (this.stuForm3.classTeacherId == el.value) {
            classTeacherName = el.label;
          }
        });
        this.couponList.filter((el) => {
          if (this.stuForm2.couponId == el.value) {
            couponName = el.label;
          }
        });
        this.eduStaffList.filter((el) => {
          if (this.stuForm3.eduUserId == el.value) {
            eduUserName = el.label;
          }
        });
        this.staffInfoList.filter((el) => {
          if (this.stuForm3.enrollId == el.value) {
            enrollName = el.label;
          }
        });
        this.marketStaffList.filter((el) => {
          if (this.stuForm.staffId == el.value) {
            staffName = el.label;
          }
        });
        this.couponList.filter((el) => {
          if (this.stuForm2.couponId == el.id) {
            couponName = el.couponName;
          }
        });
        console.log("this.stuForm-------------------", this.stuForm);
        this.$fetch("orderinfo_saveProduct", {
          ...this.stuForm,
          ...this.stuForm2,
          ...this.stuForm3,
          ...this.stuForm4,
          provinc: this.stuForm.provinc,
          city: this.stuForm.city,
          county: this.stuForm.county,
          classTeacherName,
          couponName,
          eduUserName,
          enrollName,
          staffName,
          courses: JSON.stringify(this.stuForm2.courses),
          serviceYear: this.itemData.serviceYear,
          idCardAndPhone: this.stuForm.idCardAndPhone,
        }).then((res) => {
          this.$message.success("操作成功");
          this.addVisible = false;
          this.$refs.stuForm.resetFields();
          this.$refs.stuForm2.resetFields();
          this.stuForm2.campusName = this.itemData.campusName;
          this.stuForm2.classType = this.itemData.className;
          this.stuForm.classBatch = this.itemData.classBatch;
          this.$refs.stuForm3.resetFields();
          this.$refs.stuForm4.resetFields();
          this.getTableData();
        });
      }
    },
    handleEdit(data) {
      this.addStatus = false;
      this.addVisible = true;
      this.addFormOptions.forEach((item) => {
        item.initValue = data[item.prop];
      });
      setTimeout(() => {
        this.$refs.dataForm3.addInitValue();
      }, 0);
      this.editId = data.id;
    },
    signUp(data) {
      this.addVisible = true;
      this.itemData = data;
      this.stuForm.classBatch = data.classBatch;
      this.stuForm2.campusName = data.campusName;
      this.stuForm2.classType = data.className;
      this.stuForm2.campusId = data.campusId;
      this.stuForm2.classId = data.id;
      this.$fetch("orderinfo_goProductAdd", {
        classId: data.id,
      }).then((res) => {
        //学员类型
        (this.studentTypeList = res.data.studentTypeList.map((item) => ({
          label: item.value,
          value: item.key,
        }))),
          //学年
          (this.recentlyYearList = res.data.recentlyYearList.map((item) => ({
            label: item,
            value: item,
          }))),
          //来源类型
          (this.saleSourceList = res.data.saleSourceList.map((item) => ({
            label: item.value,
            value: item.key,
          }))),
          //学历
          (this.eduList = res.data.eduList.map((item) => ({
            label: item.value,
            value: item.key,
          }))),
          //性别
          (this.genderList = res.data.genderList.map((item) => ({
            label: item.value,
            value: item.key,
          }))),
          (this.healthCourseProvinceList =
            res.data.healthCourseProvinceList &&
            JSON.parse(res.data.healthCourseProvinceList).length > 0
              ? JSON.parse(res.data.healthCourseProvinceList).map((item) => ({
                  label: item.provinceName,
                  value: item.provinceId,
                }))
              : []),
          //教务老师,班主任
          (this.eduStaffList = res.data.eduStaffList.map((item) => ({
            label: item.staffName,
            value: item.id,
          }))),
          //市场老师
          (this.marketStaffList = res.data.marketStaffList.map((item) => ({
            label: item.staffName,
            value: item.id,
          }))),
          //招生老师
          (this.staffInfoList = res.data.staffInfoList.map((item) => ({
            label: item.staffName,
            value: item.id,
          }))),
          //代理人
          (this.proxyInfoList = res.data.proxyInfoList.map((item) => ({
            label: item.proxyName,
            value: item.id,
          })));
        //课程
        this.courseInfoList = res.data.courseInfoList.map((item) => ({
          label: item.courseName,
          value: item.id,
          checked: 0,
          price: item.price,
          courseId: item.courseId,
        }));
      });
    },
  },
};
</script>
<style  lang="scss" >
.elmgs_confirm-box {
  width: 500px;
  padding: 10px 0;
  .el-message-box__btns {
    width: 40%;
    margin: 0 auto 10px;
    .confirmButtonClass {
      float: right !important;
    }
    .confirmButtonClass {
      float: left !important;
    }
  }
  .el-message-box__title {
    text-align: center;
    & > span {
      display: inline-block;
    }
  }

  .el-message-box__headerbtn {
    font-size: 24px !important;
  }
}
</style>
<style lang="scss" scoped>
.goods-list {
  .empty_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff;
    color: #909399;
  }
  .el-form-item {
    margin-bottom: 26px;
  }
  .content-wrap {
    display: flex;
    flex-direction: column;
    .el-pagination-box {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  }
  .content-container {
    padding: 5px;
    width: 49%;
    background-color: #fff;
    display: inline-block;
    margin-bottom: 24px;
    .class-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px;
      align-items: flex-end;
    }
    .content-left {
      .title-container {
        display: flex;
        align-items: center;
        .title {
          font-size: 22px;
          color: #333333;
          font-weight: bold;
          margin-right: 6px;
        }
      }
      .details {
        line-height: 44px;
      }
      .content-bottom {
        display: flex;
        .price {
          color: red;
          font-weight: bold;
          margin: 0 14px;
          font-size: 14px;
        }
        .campus-name {
          margin-right: 30px;
        }
        .year-text,
        .campus-name {
          font-size: 14px;
          color: #333;
          margin-top: 16px;
        }
      }
    }
    .content-right {
      display: flex;
      .price {
        color: #ec5b56;
        font-weight: bold;
        font-size: 32px;
        // margin-bottom: 8px;
        margin-right: 20px;
      }
    }
  }

  .card-container {
    margin-bottom: 20px;
    .card-title {
      font-size: 17px;
      font-weight: 600;
      color: #333333;
      line-height: 45px;
    }
  }
}
</style>
