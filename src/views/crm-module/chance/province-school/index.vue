<template>
  <div class="">
       <search-form
      :formOptions="formOptions"
      :showNum="6"
      @onSearch="onSearch"
    ></search-form>
  </div>
</template>

<script>

export default {
  name:"province-school",
  data(){
    return { // 搜索栏
      formOptions: [
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "学员姓名",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "学员手机",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "活动名",
        },
         {
          prop: "menuName",
          element: "el-select",
          placeholder: "学历",
          options: [
            {
              label: "博士",
              value: 0,
            },
            {
              label: "硕士",
              value: 1,
            },
          ],
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "机会状态",
          options: [
            {
              label: "博士",
              value: 0,
            },
            {
              label: "硕士",
              value: 1,
            },
          ],
        },
        {
           prop: 'time',
          element: 'el-date-picker',
          startPlaceholder: '进入公海时间(开始)',
          endPlaceholder: '进入公海时间(结束)',
          initWidth: true
        }
      ],
    }
  },
   methods: {
     onSearch() {},
  }
}
</script>

<style lang="scss" scoped>

</style>
