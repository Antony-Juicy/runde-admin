<template>
  <div>
    <search-form :formOptions = "formOptions" :showNum="showNum" @onSearch = onSearch></search-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formOptions: [
        
        {
          prop: 'staffPhone',
          element: 'el-input',
          initValue: '',
          placeholder: '请输入手机号',
        },
        {
          prop: 'positionName',
          element: 'el-input',
          initValue: '',
          placeholder: '请输入职位',
        },
        {
          prop: 'idcard',
          element: 'el-input',
          initValue: '',
          placeholder: '请输入ID',
        },
        {
          prop: 'idcard2',
          element: 'el-input',
          initValue: '',
          placeholder: '请输入ID',
        },
        {
          prop: 'idcard3',
          element: 'el-input',
          initValue: '',
          placeholder: '请输入ID',
        },
        {
          prop: 'idcard4',
          element: 'el-input',
          initValue: '',
          placeholder: '请输入ID',
        },
        {
          prop: 'idcard5',
          element: 'el-input',
          initValue: '',
          placeholder: '请输入ID',
        },
        // {
        //   prop: 'idcard6',
        //   element: 'el-input',
        //   initValue: '',
        //   placeholder: '请输入ID',
        // },
        // {
        //   prop: 'staffName',
        //   element: 'el-date-picker',
        //   initValue: '',
        //   placeholder: '请输入姓名',
        // },
      ],
      showNum:7,
    }
  },
  methods: {
    onSearch(){
        
    }
  }
}
</script>
