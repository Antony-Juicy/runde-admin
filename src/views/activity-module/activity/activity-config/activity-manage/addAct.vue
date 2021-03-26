<template>
  <div class="add-act">
    <RdForm
      :formOptions="addFormOptions"
      :inline="true"
      :rules="addRules"
      ref="dataForm3"
    >
      <template slot="param">
        <el-button type="primary" size="small" @click="addDomain"
          >点击添加参数</el-button
        >
      </template>
    </RdForm>
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic"
      inline
    >
      <template v-for="(domain, index) in dynamicValidateForm.domains">
        <el-form-item
          :label="'参数名称' + index"
          :key="domain.key"
          :prop="'domains.' + index + '.paramName'"
          :rules="{
            required: true,
            message: '参数名称不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="domain.paramName" size="small" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item
          :label="'参数值' + index"
          :key="domain.key + '2'"
          :prop="'domains.' + index + '.paramVal'"
          :rules="{
            required: true,
            message: '参数值不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="domain.paramVal" size="small" style="width: 300px"></el-input>
        </el-form-item>
        <el-button :key="domain.key + '3'" @click.prevent="removeDomain(domain)" 
        type="danger" size="small" style="margin-top:5px"
          >删除</el-button
        >

      </template>

    </el-form>
    <div class="btn-wrapper">
      <el-button
        type="primary"
        size="small"
        :loading="btnLoading"
        @click="handleAdd"
        v-prevent-re-click="2000"
        >保存</el-button
      >
      <el-button size="small" @click="handleClose('dataForm3')">取消</el-button>
    </div>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
export default {
  name: "temp",
  data() {
    return {
      addFormOptions: [
        {
          prop: "activityName",
          element: "el-input",
          placeholder: "请输入活动名称",
          label: "活动名称",
        },
        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "活动时间(开始)",
          endPlaceholder: "活动时间(结束)",
          initWidth: true,
          label: "活动时间",
          //   clearable: false
        },
        {
          prop: "fieldOne",
          element: "el-input",
          placeholder: "请输入字段一名称",
          label: "字段一名称",
        },
        {
          prop: "fieldTwo",
          element: "el-input",
          placeholder: "请输入字段二名称",
          label: "字段二名称",
        },
        {
          prop: "appId",
          element: "el-select",
          placeholder: "微信公众号",
          label: "微信公众号",
          options: [
          ],
        },
        {
          prop: "invitationType",
          element: "el-select",
          placeholder: "邀请码类型",
          label: "邀请码类型",
          options: [
          ],
        },
        {
          prop: "status",
          element: "el-select",
          placeholder: "请选择",
          label: "活动状态",
          options: [
          ],
        },
        {
          prop: "productType",
          element: "el-select",
          placeholder: "请选择",
          label: "项目类型",
          options: [
          ],
        },
        {
          prop: "attentionStatus",
          element: "el-select",
          placeholder: "请选择",
          label: "是否强制关注",
          options: [
          ],
        },
        {
          prop: "shareStatus",
          element: "el-select",
          placeholder: "请选择",
          label: "是否强制分享",
          options: [
          ],
        },
        {
          prop: "hideStatus",
          element: "el-select",
          placeholder: "请选择",
          label: "是否隐藏",
          options: [
          ],
        },
        {
          prop: "activityDesc",
          element: "el-input",
          placeholder: "请输入",
          label: "活动描述",
          type: "textarea",
          rows: 3,
        },
        {
          prop: "param",
          element: "el-input",
          placeholder: "请选择",
          label: "参数",
          operate: true,
        },
      ],
      addRules: {
        updateReason: [
          { required: true, message: "请输入修改事由", trigger: "blur" },
        ],
      },
      btnLoading: false,
      dynamicValidateForm: {
        domains: [
          {
            paramName: "",
            paramVal: "",
          },
        ],
      },
    };
  },
  components: {
    RdForm,
  },
  methods: {
    handleClose(formName) {
      this.$refs[formName].resetFields();
      this.$emit("close");
    },
    handleAdd() {
      this.$refs.dataForm3.validate((val, data) => {
        if (val) {
          console.log(data, "data");
          this.$refs.dynamicValidateForm.validate((valid) => {
            if (valid) {
              console.log(this.dynamicValidateForm,'99')
            } else {
              console.log("error submit!!");
              return false;
            }
          });
        }
      });
    },

    // 动态添加
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.dynamicValidateForm,'99')
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        paramName: "",
        paramVal: "",
        key: Date.now(),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.add-act {
  max-width: 1235px;
  .btn-wrapper {
    margin-left: 760px;
    margin-top: 50px;
  }
}
</style>
