
<template>
  <div class="rd-form-box">
    <div>
       <el-form
        ref="formRef"
        :model="formData"
        :label-width="formLabelWidth"
        :rules="rules"
        :inline="inline"
      >
        <template v-for="(item, index) in formOptions">
            <el-form-item
              :key="index"
              :prop="item.prop"
              :label="item.label ? item.label : ''"
              :rules="item.rules"
              :class="{'oneRow':item.oneRow}"
              v-if="!item.hide"
            >
              <formItem v-model="formData[item.prop]" :itemOptions="item" v-if="!item.operate"/>
              <div v-else>
                 <slot
                  :name="item.prop"
                  :data="formData[item.prop]"
                ></slot>
              </div>
            </el-form-item>
        </template>
      </el-form>
    </div>
  </div>
</template>

<script>
import formItem from "./formItem";
// import tools from '@/utils/tools'
import { createUniqueString } from "./tools";

export default {
  components: { formItem },
  props: {
    /**
     * 表单配置
     * 示例：
     * [{
     *   label: '用户名', // label文字
     *   prop: 'username', // 字段名
     *   element: 'el-input', // 指定elementui组件
     *   initValue: '阿黄', // 字段初始值
     *   placeholder: '请输入用户名', // elementui组件属性
     *   rules: [{ required: true, message: '必填项', trigger: 'blur' }], // elementui组件属性
     *   events: { // elementui组件方法
     *     input (val) {
     *       console.log(val)
     *     },
     *     ...... // 可添加任意elementui组件支持的方法
     *   }
     *   ...... // 可添加任意elementui组件支持的属性
     * }]
     */
    formOptions: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    formLabelWidth:{
      type: String,
      default: '100px'
    },
    rules:{
      type: Object,
      default: {}
    },
    inline:{
      type: Boolean ,
      default: false
    },
    changeInitValue: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      showAll: true, //是否展开全部
      formData: {},
      showItem: 6,
      boxId: 'searchBox_' + new Date().getTime()
    };
  },
  created(){
    this.addInitValue();
  },

  watch: {
    changeInitValue(val){
      this.addInitValue();
    }
  },
  
  methods: {
    // 校验单个表单
    validateField(props,callback){
      this.$refs.formRef.validateField(props,callback&&callback())
    },
    // 校验
    validate(callback) {
      this.$refs.formRef.validate((valid) => {
          callback(valid, this.formData);
      });
    },
    // 搜索
    onSearch() {
      this.validate(() => {
        this.$emit("onSearch", this.formData);
      });
    },
    //这个能把表单所有值清空为undefined
    onReset() {
      const obj = {};
      this.formOptions.forEach((v) => {
          // obj[v.prop] = undefined;

          if(v.element == 'el-checkbox'){
             v.initValue = [];
             obj[v.prop] = [];
          }else {
             v.initValue = undefined;
             obj[v.prop] = undefined;
          }
      });
      this.formData = obj;
      this.$emit('onReset')
    },

    // 重置表单,注意 重置不了已经设置过的初始值
    resetFields(){
      this.$refs.formRef.resetFields();
    },

    // 添加初始值
    addInitValue() {
      const obj = {};
      this.formOptions.forEach((v) => {
        if (v.initValue !== undefined) {
          obj[v.prop] = v.initValue;
        }
        if(v.multiple && !v.initValue){
           obj[v.prop] = [];
        }
      });
      this.formData = obj;
    },
    clearValidate(params=""){
     //清除校验
       this.$refs.formRef.clearValidate(params);
    },
    // 给表单的任意一个赋值
    setValue(obj){
      this.formData = {
        ...this.formData,
        ...obj
      }
    }
  },
  computed: {
    newKeys() {
      return this.formOptions.map((v) => {
        return createUniqueString();
      });
    },
    word: function () {
      if (this.showAll == false) {
        //对文字进行处理
        return "展开";
      } else {
        return "收起";
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.rd-form-box {
  padding-right: 20px;
  /deep/ {
    .el-form--inline {
      .el-form-item {
          width: 40%;
          &.oneRow {
             width: 100%;
             input,textarea {
              width: 170%;
            }
          }
          .el-form-item__content {
            width: 300px;
          }
          .el-select-dropdown__empty {
            width: 300px;
          }
          .el-date-editor .el-range-separator {
            width: 9%;
          }
          .el-date-editor--datetimerange.el-input__inner {
            width: 300px;
          }
          
        }
    }
    
  }
}

</style>
