<template>
  <div class="branch-school">
    <search-form :formOptions="formOptions" @onSearch="onSearch"></search-form>
  </div>
</template>

<script>
let id = 0;
export default {
  name: "branch-school",
  data() {
    return {
      formOptions: [
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "员工状态",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "跟进老师",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "机会状态",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "姓名",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "手机",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "省份",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "城市",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "地址",
        },
         {
          prop: "menuName",
          element: "el-input",
          placeholder: "注册人",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "学历",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "来源",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "组织架构",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "呼叫状态",
        },
         {
          prop: "menuName",
          element: "el-select",
          placeholder: "跟进次数",
        },
        // 课程
        {
          prop: "abc",
          element: "el-cascader",
          placeholder: "课程",
          props:{ 
              checkStrictly: true,
               lazy: true,
                lazyLoad (node, resolve) {
            const { level } = node;
            setTimeout(() => {
              const nodes = Array.from({ length: level + 1 })
                .map(item => ({
                  value: ++id,
                  label: `选项${id}`,
                  leaf: level >= 2
                }));
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              resolve(nodes);
            }, 1000);
          }
           },
           initWidth: true
        },
        // 时间
        {
           prop: 'time',
          element: 'el-date-picker',
          startPlaceholder: '最近跟进时间(开始)',
          endPlaceholder: '最近跟进时间(结束)',
          initWidth: true
        },
        {
           prop: 'time',
          element: 'el-date-picker',
          startPlaceholder: '创建时间(开始)',
          endPlaceholder: '创建时间(结束)',
          initWidth: true
        },
        {
           prop: 'time',
          element: 'el-date-picker',
          startPlaceholder: '进入公海时间(开始)',
          endPlaceholder: '进入公海时间(结束)',
          initWidth: true
        }
      ],
    };
  },
  methods: {
    onSearch() {},
  },
};
</script>

<style lang="scss" scoped>
.branch-school {
}
</style>
