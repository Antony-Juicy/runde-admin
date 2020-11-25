<template>
  <div>
    公告搜索栏控件
    <search-form :formOptions = "formOptions" :btnItems = "btnItems"></search-form>
  </div>
</template>

<script>
import searchForm from './searchForm';
export default {
  components: { searchForm },
  data () {
    return {
      formOptions : [
        // {
        //   可添加任意elementui组件支持的属性: 如label,prop...
        //   label: '', // label文字
        //   prop: '', // 字段名
        //   element: 'el-input', // 指定elementui组件,如el-input
        //   initValue: '', // 字段初始值
        //   placeholder: '', // elementui组件属性
        //   rules: [{ required: true, message: '必填项', trigger: 'blur' }], // elementui组件属性
        //   events: { 
        //     elementui组件方法: 如input
        //     input (val) {
        //       console.log(val)
        //     },
        //   }
        // },
        {
          label: '用户名',
          prop: 'username',
          element: 'el-input',
          initValue: '阿黄',
          placeholder: '请输入用户名',
          rules: [{ required: true, message: '必填项', trigger: 'blur' }],
          events: {
            input (val) {
              console.log(val)
            },
          }
        },
        {
          label: '密码',
          prop: 'password',
          element: 'el-input',
          initValue: '',
          placeholder: '请输入密码',
          rules: [{ required: true, message: '必填项', trigger: 'blur' }],
          events: {
            input (val) {
              console.log(val)
            },
          }
        },
        {
          label: '分类',
          prop: 'classNames',
          element: 'el-select',
          initValue: '',
          placeholder: '请选择分类',
          // rules: [{ required: true, message: '必填项', trigger: 'blur' }],
          events: {
            input (val) {
              console.log(val)
            },
          }
        },
        {
          label: '日期',
          prop: 'date',
          element: 'el-date-picker',
          initValue: '',
          placeholder: '请选择日期',
          // rules: [{ required: true, message: '必填项', trigger: 'blur' }],
          events: {
            input (val) {
              console.log(val)
            },
          }
        }
      ],
      btnItems: "search, export, reset" // 配置可操作按钮显示,如：search=搜索,export=导出,reset=重置
    }
  }
}
</script>

<style>

</style>