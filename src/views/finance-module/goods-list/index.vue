<template>
  <div class="goods-list">
    <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
      ref="dataForm"
    ></search-form>
    <div class="clearfix">
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
              <div class="year-text">服务年限{{ item.serviceYear }}年</div>
            </div>
          </div>
          <div class="content-right">
            <div class="price">
              <span style="font-size: 16px">￥</span>{{ item.totalFee }}
            </div>
            <div>
              <el-button type="primary" size="small" @click="signUp(item)"
                >报名</el-button
              >
            </div>
          </div>
        </div>
      </div>
      <div class="fr" style="margin-bottom: 20px">
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

    <!-- 报名弹窗 -->
    <full-dialog
      v-model="addVisible"
      :title="'报名信息'"
      hideTitle
      @change="addVisible = false"
    >
      <el-card shadow="never" class="card-container">
        <div class="card-title">学员信息</div>
        <el-form
          ref="stuForm"
          :model="stuForm"
          label-width="100px"
          size="small"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="查询学员信息">
                <el-input
                  v-model="stuForm.cardId"
                  style="width: 280px; margin-right: 10px"
                  placeholder="请输入学员身份证或手机号"
                ></el-input>
                <el-button type="primary" @click="handleCheckInfo"
                  >查询</el-button
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
              <el-form-item label="学员姓名">
                <el-input
                  v-model="stuForm.studentName"
                  style="width: 200px"
                  placeholder="请输入学员姓名"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="学员类型">
                <el-select
                  @change="changeSelect"
                  v-model="stuForm.studentType"
                  style="width: 200px"
                  placeholder="请选择学员类型"
                >
                  <el-option
                    :label="item.label"
                    :value="item.label"
                    v-for="(item, index) in studentTypeList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="学年">
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
              <el-form-item label="来源类型">
                <el-select
                  v-model="stuForm.saleSourceType"
                  style="width: 200px"
                  placeholder="请选择来源类型"
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
              <el-form-item label="来源名称">
                <el-input
                  v-model="stuForm.saleSource"
                  style="width: 200px"
                  placeholder="请输入来源名称"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="学历">
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
            <el-col :span="8">
              <el-form-item label="身份证">
                <el-input
                  v-model="stuForm.cardId"
                  style="width: 200px"
                  placeholder="请输入身份证"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号">
                <el-input
                  v-model="stuForm.phone"
                  style="width: 200px"
                  placeholder="请输入手机号"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别">
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
              <el-form-item label="省">
                <el-select
                  v-model="stuForm.provinceId"
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
              <el-form-item label="市">
                <el-select
                  v-model="stuForm.cityId"
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
              <el-form-item label="区/县">
                <el-select
                  v-model="stuForm.countyId"
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
              <el-form-item label="收件地址">
                <span style="margin-right: 6px">xx省</span
                ><span style="margin-right: 6px">xx市</span
                ><span style="margin-right: 6px">xx区</span>
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
          ref="stuForm"
          :model="stuForm"
          label-width="100px"
          size="small"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="校区">
                <el-select
                  disabled
                  v-model="stuForm.campusName"
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
              <el-form-item label="班次">
                <el-select
                  disabled
                  v-model="stuForm.classType"
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
            <el-form-item label="课程">
              <!-- <el-checkbox-group v-model="stuForm.courses"> -->
              <el-checkbox
                v-for="(course, index) in courseInfoList"
                @change="changeCheckbox(index, course)"
                :key="course.vaule"
                :label="course.vaule"
                >{{ course.label }}</el-checkbox
              >
              <!-- <el-checkbox :label="6">中药二</el-checkbox>
                <el-checkbox :label="9">中药综合</el-checkbox> 
                <el-checkbox :label="10">中药法规</el-checkbox> -->
              <!-- </el-checkbox-group> -->
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="8">
              <!-- yy: {{ couponList }} -->
              <el-form-item label="优惠券">
                <el-select
                  v-model="stuForm.couponId"
                  style="width: 200px"
                  placeholder="请选择优惠券"
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
              <el-form-item label="优惠金额">
                <el-input
                  readonly
                  v-model="stuForm.faceValue"
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
              <el-form-item label="应收">
                <el-input
                  readonly
                  v-model="stuForm.realPrice"
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
          ref="stuForm"
          :model="stuForm"
          label-width="100px"
          size="small"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="招生老师">
                <el-select
                  v-model="stuForm.enrollId"
                  style="width: 200px"
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
              <el-form-item label="班主任">
                <el-select
                  v-model="stuForm.classTeacherId"
                  style="width: 200px"
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
              <el-form-item label="代理人">
                <el-select
                  v-model="stuForm.agent"
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
              <el-form-item label="市场老师">
                <el-select
                  v-model="stuForm.staffId"
                  style="width: 200px"
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
              <el-form-item label="教务老师">
                <el-select
                  v-model="stuForm.eduUserId"
                  style="width: 200px"
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
          ref="stuForm"
          :model="stuForm"
          label-width="100px"
          size="small"
        >
          <el-row>
            <el-form-item label="备注">
              <el-input
                type="textarea"
                rows="3"
                v-model="stuForm.remark"
                placeholder="请输入备注内容"
              ></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </el-card>

      <div class="btn-wrapper" style="text-align: right">
        <el-button type="primary">提交</el-button>
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
export default {
  name: "goods-list",
  data() {
    return {
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
        },
        {
          prop: "classTypeId",
          element: "el-select",
          placeholder: "班型",
          options: [],
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
        cardId: "",
        studentName: "",
        studentType: "",
        classBatch: "",
        saleSourceType: "",
        saleSource: "",
        education: "",
        cardId: "13570911549",
        phone: "",
        gender: "",
        provincId: "",
        cityId: "",
        countyId: "",
        address: "",
        campusName: "",
        classType: "",
        campusId: "",
        classId: "",
        courses: [],
        courseNum: 0,
        courseNames: "",
        couponId: "",
        faceValue: "",
        realPrice: "",
        enrollId: "",
        classTeacherId: "",
        eduUserId: "",
        remark: "",
      },
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
          this.getCounpList();
        }
      },
      immediate: true,
      // deep: true
    },
    "stuForm.courseNum": {
      handler(newName, oldName) {
        console.log("obj.a changed courseNum", newName, oldName);
        if (oldName != undefined) {
          if (!this.stuForm.studentType) {
            this.$message.warning("请先选择课程");
            return;
          }
          this.getCounpList();
        }
      },
      immediate: true,
      // deep: true
    },
  },
  methods: {
    changeSelect() {
      this.stuForm.couponId = ""; //置空优惠券
    },
    getCounpList() {
      //优惠券
      let { campusId, classTypeId, productId, subjectId } = this.itemData;
      // if (!this.stuForm.studentType) {
      //   this.$message.warning("请先选择学员类型");
      //   return;
      // }
      // if (this.stuForm.courseNum == 0) {
      //   this.$message.warning("请先选择课程");
      //   return;
      // }
      this.couponList = [];
      this.$fetch("coupontemplateversiontwo_availableCoupon", {
        campusId,
        classTypeId,
        productId,
        subjectId,
        courseNames: this.stuForm.courseNames,
        courseNum: this.stuForm.courseNum,
        classId: this.stuForm.classId,
        studentType: this.stuForm.studentType,
        totalPrice: this.stuForm.realPrice ? this.stuForm.realPrice : 0,
      }).then((res) => {
        this.couponList = res.data.dataJson.list;
      });
    },
    choseProvince(e) {
      //选省
      this.stuForm.cityId = ""; //重置市区
      this.stuForm.countyId = ""; //重置区县
      this.cityList = [];
      this.countyList = [];
      for (var index2 in this.provinceList) {
        if (e == this.provinceList[index2].id) {
          let shi, pname;
          shi = this.provinceList[index2].children;
          pname = this.provinceList[index2].value;
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
      this.stuForm.countyId = ""; //重置区县
      this.countyList = [];
      for (var index3 in this.cityList) {
        console.log("this.cityList[index3].id", this.cityList[index3].id, e);
        if (e == this.cityList[index3].id) {
          this.qu1 = this.cityList[index3].children;
          this.cname = this.cityList[index3].value;
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
      console.log(e, "e--------------333333", e, this.stuForm.countyId);
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
    handleCheckInfo() {
      this.$fetch("studentcampus_basisIdCardAndPhoneGetInfo", {
        idCardAndPhone: this.stuForm.cardId,
      }).then((res) => {
        //TODO 校验
        console.log(
          "res--------------->coupontemplateversiontwo_availableCoupon",
          res,
          res.data
        );
      });
    },
    sum(arr) {
      return eval(arr.join("+"));
    },
    changeCheckbox(index, item) {
      this.stuForm.couponId = ""; //置空优惠券
      item.checked == 0
        ? (this.courseInfoList[index].checked = 1)
        : (this.courseInfoList[index].checked = 0);
      this.stuForm.courses = this.courseInfoList
        .filter((item) => item.checked)
        .map((item) => {
          return item.label;
        });
      let priceArr = this.courseInfoList
        .filter((item) => item.checked)
        .map((item) => {
          return item.price;
        });
      this.stuForm.courseNames = this.stuForm.courses.toString();
      this.stuForm.courseNum = this.stuForm.courses.length;
      this.stuForm.realPrice =
        priceArr && priceArr.length > 0 ? this.sum(priceArr) : 0;
      console.log("this.sum(priceArr)", this.stuForm.realPrice);
      // let { campusId, classTypeId, productId, subjectId } = this.itemData;
      // this.$fetch("coupontemplateversiontwo_availableCoupon", {
      //   campusId,
      //   classTypeId,
      //   productId,
      //   subjectId,
      //   courseNames: this.stuForm.courseNames,
      //   courseNum: this.stuForm.courseNum,
      //   classId: this.stuForm.classId,
      //   studentType: this.stuForm.studentType,
      // }).then((res) => {
      //   console.log("res--------------->", res, res.data);
      // });
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
        };
        this.formOptions[3].events = {
          change: this.subjectChange,
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
      this.getTableData();
    },
    getTableData(params = {}) {
      this.$fetch("courseclass_classOrderlistJson", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
        token:
          "eyJhbGciOiJIUzI1NiIsIlR5cGUiOiJKd3QiLCJ0eXAiOiJKV1QifQ.eyJsb2dpblVzZXJJZCI6IjgiLCJwYXJ0bmVySWQiOjEsInR5cGUiOjAsImV4cCI6MTYwNzM5MDM4NCwidXNlcm5hbWUiOiJhZG1pbjAxIn0.GikWXxIa8BYLGvV12Yf2WBCywDnKpUDylKReR3TRuP8",
      }).then((res) => {
        this.tableData = res.data.list.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          return item;
        });
        this.pageConfig.totalCount = res.data.pager.totalRows;
      });
    },
    productChange(val) {
      this.$fetch("courseclasstype_subjectList", {
        productId: val,
      }).then((res) => {
        let subjectArr = res.data.list.map((item) => ({
          label: item.subjectName,
          value: item.id,
        }));
        this.formOptions[3].options = subjectArr;
        this.formOptions[4].options = [];
        this.$refs.dataForm.setValue({
          subjectId: "",
        });
      });
    },
    subjectChange(val) {
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
    submitAddForm(formName) {
      this.$refs[formName].validate((valid, formData) => {
        if (valid) {
          console.log(formData, "提交");
        }
      });
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
      console.log("data--2223", data);
      this.stuForm.campusName = data.campusName;
      this.stuForm.classType = data.className;
      this.stuForm.campusId = data.campusId;
      this.stuForm.classId = data.id;
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

<style lang="scss" scoped>
.goods-list {
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
        .year-text {
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
        margin-bottom: 8px;
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
