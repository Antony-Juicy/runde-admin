<template>
  <div class="first-step">
    <el-form
      :inline="true"
      ref="dataForm"
      :model="basicInfo"
      class="demo-form-inline"
    >
      <el-form-item
        label="项目："
        label-width="90px"
        prop="productName"
        :rules="{
          required: true,
          message: '不能为空',
          trigger: 'change',
        }"
      >
        <el-select
          style="width: 280px"
          v-model="basicInfo.productName"
          placeholder="请选择"
          size="small"
          :disabled="IsDisabled"
          @change="handleChange"
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
      <el-form-item
        label="科目："
        label-width="78px"
        prop="subjectName"
        :rules="{
          required: true,
          message: '不能为空',
          trigger: 'change',
        }"
      >
        <el-select
          style="width: 280px"
          v-model="basicInfo.subjectName"
          :disabled="IsDisabled"
          placeholder="请选择"
          size="small"
          @change="handleSubjectSelect"
        >
          <el-option
            v-for="item in subjecttArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        style="width: 100%"
        label="班型名称："
        prop="className"
        :rules="nameRulers"
      >
        <el-input
          v-model="basicInfo.className"
          :disabled="IsDisabled"
          size="small"
          style="width: 500px"
        ></el-input>
      </el-form-item>
      <el-form-item
        style="width: 100%"
        label="班型年份："
        prop="classTypeBatch"
        :rules="{
          required: true,
          message: '不能为空',
          trigger: 'change',
        }"
      >
        <el-select
          style="width: 500px"
          v-model="basicInfo.classTypeBatch"
          :disabled="IsDisabled"
          placeholder="请选择"
          size="small"
        >
          <el-option
            v-for="item in yearArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        style="align-items: center; display: flex; flex: 1; height: 100%"
        label="班型类型："
        prop="classType"
        :rules="{
          required: true,
          message: '不能为空',
          trigger: 'change',
        }"
      >
        <el-radio-group v-model="basicInfo.classType">
          <el-radio
            :disabled="IsDisabled"
            v-for="item in classTypeArr"
            :label="item.value"
            :key="item.value"
            >{{ item.label }}
          </el-radio>
          <!-- <el-radio :label="2">直播</el-radio>
          <el-radio :label="3">面授</el-radio>
          <el-radio :label="4">证书</el-radio>
          <el-radio :label="5">公开课</el-radio> -->
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="provinceShow"
        label="省："
        label-width="90px"
        prop="provinceIds"
        :rules="{
          required: true,
          message: '不能为空',
          trigger: 'change',
        }"
      >
        <el-select
          v-model="basicInfo.provinceIds"
          multiple
          placeholder="请选择"
          size="small"
        >
          <el-option
            v-for="item in provinceArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        style="align-items: center; display: flex; flex: 1; height: 100%"
        label="班型分组："
        prop="classtypeGroupName"
        :rules="{
          required: courseGroupArr.length > 0 ? true : false,
          message: courseGroupArr.length > 0 ? '不能为空' : '',
          trigger: 'change',
        }"
      >
        <el-radio-group
          v-model="basicInfo.classtypeGroupName"
          @change="partChange(basicInfo.classtypeGroupName, courseGroupArr)"
        >
          <el-radio
            v-for="item in courseGroupArr"
            :label="item.label"
            :key="item.value"
            >{{ item.label }}
          </el-radio>
          <!-- <el-radio :label="2">非高端班</el-radio>
          <el-radio :label="3">定制班</el-radio> -->
        </el-radio-group>
      </el-form-item>
      <el-form-item
        style="align-items: center; display: flex; flex: 1; height: 100%"
        label="服务年限："
        prop="serviceYear"
        :rules="{
          required: true,
          message: '不能为空',
          trigger: 'change',
        }"
      >
        <el-radio-group v-model="basicInfo.serviceYear">
          <el-radio
            v-for="item in serviceYearArr"
            :label="item.value"
            :disabled="IsDisabled"
            :key="item.value"
            >{{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        style="align-items: center; display: flex; flex: 1; height: 100%"
        label="协议类型："
        prop="protocolType"
        :rules="{
          required: true,
          message: '不能为空',
          trigger: 'change',
        }"
      >
        <el-radio-group v-model="basicInfo.protocolType">
          <el-radio
            v-for="item in protocolTypeArr"
            :label="item.value"
            :disabled="IsDisabled"
            :key="item.value"
            >{{ item.label }}
          </el-radio>
          <!-- <el-radio :label="1">协议班</el-radio>
          <el-radio :label="2">非协议班</el-radio> -->
        </el-radio-group>
      </el-form-item>
      <el-form-item
        style="align-items: center; display: flex; flex: 1; height: 100%"
        label="退费类型："
        prop="refundType"
        :rules="{
          required: true,
          message: '不能为空',
          trigger: 'change',
        }"
      >
        <el-radio-group v-model="basicInfo.refundType">
          <el-radio
            v-for="item in refundTypeArr"
            :label="item.value"
            :disabled="IsDisabled"
            :key="item.value"
            >{{ item.label }}
          </el-radio>
          <!-- <el-radio :label="1">退费</el-radio>
          <el-radio :label="2">不退费</el-radio> -->
        </el-radio-group>
      </el-form-item>
      <el-form-item
        style="align-items: center; display: flex; flex: 1; height: 100%"
        label="状态："
        label-width="90px"
        prop="status"
        :rules="{
          required: true,
          message: '不能为空',
          trigger: 'change',
        }"
      >
        <el-radio-group v-model="basicInfo.status">
          <!-- <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">暂停</el-radio> -->
          <el-radio
            v-for="item in statusArr"
            :label="item.value"
            :key="item.value"
            >{{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "add-class",
  data() {
    return {
      provinceShow: false,
      subjecttArr: [], //科目
      courseGroupArr: [], //班型分组
      currentProductId: "",
      // projectArr: [
      //   {
      //     value: "选项1",
      //     label: "1",
      //   },
      //   {
      //     value: "选项2",
      //     label: "2",
      //   },
      //   {
      //     value: "选项3",
      //     label: "3",
      //   },
      //   {
      //     value: "选项4",
      //     label: "4",
      //   },
      //   {
      //     value: "选项5",
      //     label: "5",
      //   },
      // ],
      basicInfo: {
        productName: "",
        productId: "",
        subjectName: "",
        subjectId: "",
        className: "",
        classTypeBatch: "", //班型年份
        classType: "", //班型類型
        classtypeGroupName: "", //班型分组名称
        classtypeGroupId: "",
        serviceYear: "", //服务年限
        refundType: "", //退费类型
        protocolType: "",
        status: "",
        provinceIds: "",
      },
      nameRulers: [
        { required: true, message: "请输入", trigger: "blur" },
        { max: 20, message: "命名，字数上限不超过20字", trigger: "blur" },
      ],
    };
  },
  props: {
    opportunityIds: {
      type: String,
      default: "",
    },
    provinceArr: {
      //省份
      type: Array,
    },
    projectArr: {
      //项目
      type: Array,
    },
    yearArr: {
      //班型年份
      type: Array,
    },
    classTypeArr: {
      //班型类型
      type: Array,
    },
    // classtypeGroupArr: {
    //   //班型分组
    //   type: Array,
    // },
    serviceYearArr: {
      //服务年限
      type: Array,
    },
    protocolTypeArr: {
      //协议类型
      type: Array,
    },
    refundTypeArr: {
      //退费类型
      type: Array,
    },
    statusArr: {
      //状态
      type: Array,
    },
    IsDisabled: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // this.getData();
  },
  methods: {
    handleSubjectSelect(val) {
      // courseclasstype_courseList
      this.basicInfo.subjectId = val;
      this.$emit("changeSubArr", this.subjecttArr);
      this.$fetch("courseclasstype_courseList", {
        productId: this.currentProductId,
        subjectId: val,
      }).then((res) => {
        // this.subjecttArr = res.data.list.map((item) => ({
        //   label: item.subjectName,
        //   value: item.id,
        // }));
        let courseList =
          res.data &&
          res.data.list.map((item) => ({
            label: item.courseName,
            value: item.id,
          }));
        this.$emit("getCourseListFunc", courseList);
      });
    },
    partChange(val, arr) {
      arr.map((item) => {
        if (item.label == val) {
          this.basicInfo.classtypeGroupId = item.value;
        }
      });
    },
    handleChange(val) {
      let productName;
      this.projectArr.map((el) => {
        if (el.value == val) {
          productName = el.label;
        }
      });
      if (productName == "健康管理师") {
        this.provinceShow = true;
      } else {
        this.provinceShow = false;
      }
      console.log("val== productName", val, productName);
      //  获取科目下拉
      this.basicInfo.subjectName = ""; //置空科目
      this.subjecttArr = []; //置空科目
      this.basicInfo.productId = val;
      this.currentProductId = val;
      this.$emit("message", val);
      this.$fetch("courseclasstype_subjectList", { productId: val }).then(
        (res) => {
          this.subjecttArr = res.data.list.map((item) => ({
            label: item.subjectName,
            value: item.id,
          }));
          this.basicInfo.subjectName = "";
        }
      );
      //获取班型分組
      this.$fetch("courseclasstype_courseClasstypeGroupList", {
        productId: val,
      }).then((res) => {
        this.courseGroupArr = res.data.map((item) => ({
          label: item.classtypeGroupName,
          value: item.id,
        }));
        // this.$emit("geteGroupListFunc", res.dataJson.list);
      });

      //获取班型阶段
      this.$fetch("courseclasstype_courseClasstypeStageGroup", {
        productId: val,
      }).then((res) => {
        let data =
          res.data &&
          res.data.map((item) => ({
            label: item.stageGroupName,
            value: item.id,
          }));
        this.$emit("getStageListFunc", data);
      });
    },
    getData(params = {}) {},
  },
};
</script>

<style lang="scss" scoped>
</style>
