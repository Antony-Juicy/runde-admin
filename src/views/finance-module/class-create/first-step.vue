<template>
  <div class="first-step">
    <el-form
      :inline="true"
      ref="dataForm"
      :model="basicInfo"
      class="demo-form-inline"
    >
      <el-form-item
        label="项目"
        prop="projectName"
        :rules="{
          required: true,
          message: '不能为空',
          trigger: 'change',
        }"
      >
        <el-select
          style="width: 280px"
          v-model="basicInfo.projectName"
          placeholder="请选择"
          size="small"
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
        label="科目"
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
          placeholder="请选择"
          size="small"
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
        label="班型名称"
        prop="classTypeName"
        :rules="nameRulers"
      >
        <el-input
          v-model="basicInfo.classTypeName"
          size="small"
          style="width: 500px"
        ></el-input>
      </el-form-item>
      <el-form-item
        style="width: 100%"
        label="班型年份"
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
        label="班型类型"
        prop="classTypeId"
        :rules="{
          required: true,
          message: '不能为空',
          trigger: 'change',
        }"
      >
        <el-radio-group v-model="basicInfo.classTypeId" @change="partChange">
          <el-radio
            v-for="item in classTypeArr"
            :label="item.label"
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
        style="align-items: center; display: flex; flex: 1; height: 100%"
        label="班型分组"
        label-width="160px"
        prop="classTypeGroup"
        :rules="{
          required: true,
          message: '不能为空',
          trigger: 'change',
        }"
      >
        <el-radio-group v-model="basicInfo.classTypeGroup" @change="partChange">
          <el-radio
            v-for="item in classtypeGroupArr"
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
        label="服务年限"
        prop="serviceYear"
        :rules="{
          required: true,
          message: '不能为空',
          trigger: 'change',
        }"
      >
        <el-radio-group v-model="basicInfo.serviceYear" @change="partChange">
          <el-radio
            v-for="item in serviceYearArr"
            :label="item.label"
            :key="item.value"
            >{{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        style="align-items: center; display: flex; flex: 1; height: 100%"
        label="协议类型"
        prop="protocolTypeId"
        :rules="{
          required: true,
          message: '不能为空',
          trigger: 'change',
        }"
      >
        <el-radio-group v-model="basicInfo.protocolTypeId" @change="partChange">
          <el-radio
            v-for="item in protocolTypeArr"
            :label="item.label"
            :key="item.value"
            >{{ item.label }}
          </el-radio>
          <!-- <el-radio :label="1">协议班</el-radio>
          <el-radio :label="2">非协议班</el-radio> -->
        </el-radio-group>
      </el-form-item>
      <el-form-item
        style="align-items: center; display: flex; flex: 1; height: 100%"
        label="退费类型"
        prop="refundTypeId"
        :rules="{
          required: true,
          message: '不能为空',
          trigger: 'change',
        }"
      >
        <el-radio-group v-model="basicInfo.refundTypeId" @change="partChange">
          <el-radio
            v-for="item in refundTypeArr"
            :label="item.label"
            :key="item.value"
            >{{ item.label }}
          </el-radio>
          <!-- <el-radio :label="1">退费</el-radio>
          <el-radio :label="2">不退费</el-radio> -->
        </el-radio-group>
      </el-form-item>

      <el-form-item
        style="align-items: center; display: flex; flex: 1; height: 100%"
        label="状态"
        prop="status"
        :rules="{
          required: true,
          message: '不能为空',
          trigger: 'change',
        }"
      >
        <el-radio-group v-model="basicInfo.status" @change="partChange">
          <!-- <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">暂停</el-radio> -->
          <el-radio
            v-for="item in statusArr"
            :label="item.label"
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
      subjecttArr: [], //科目
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
        projectName: "",
        subjectName: "",
        classTypeName: "",
        classTypeBatch: "",
        classTypeId: "",
        classTypeGroup: "",
        serviceYear: "",
        refundTypeId: "",
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
    classtypeGroupArr: {
      //班型分组
      type: Array,
    },
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
  },
  mounted() {
    // this.getData();
  },
  methods: {
    partChange() {},
    handleChange(val) {
      console.log("val==", val);

      //  获取科目下拉
      this.$fetch("courseclasstype_subjectList", { productId: val }).then(
        (res) => {
          this.subjecttArr = res.data.list.map((item) => ({
            label: item.subjectName,
            value: item.id,
          }));
        }
      );
      //获取班型分組
      this.$fetch("courseclasstype_courseClasstypeGroupList", {
        productId: val,
      }).then((res) => {
        console.log("data2222222", res.data);
       
      });
    },
    getData(params = {}) {},
  },
};
</script>

<style lang="scss" scoped>
</style>
