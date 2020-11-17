<template>
  <div>
    <el-data-table v-bind="recoveryTableData"></el-data-table>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  data() {
    const _this = this;
    return {
      recoveryTableData: {
        idkey: "id",
        idName: "id",
        url: {
          get: "website-config/getTdkPage",
          add: "website-config/addTdk",
          set: "website-config/setTdk"
        },
        hasDelete: false,
        // hasEdit: false,
        // hasNew: false,
        columns: [
          { prop: "id", label: "id", width: "70px" },
          { prop: "pageName", label: "名称", width: "150px" },
          { prop: "title", label: "标题" },
          { prop: "path", label: "路径" },
          { prop: "remark", label: "备注" }
        ],
        hasSearch: true,
        searchForm: [
          {
            el: { placeholder: "请输入页面名称" },
            label: "页面名称",
            id: "pageName",
            type: "input"
          },
          {
            el: { placeholder: "请输入标题" },
            label: "标题",
            id: "title",
            type: "input"
          },
          {
            el: { placeholder: "请输入路径" },
            label: "路径",
            id: "path",
            type: "input"
          },
        ],
        form: [
          {
            type: "input",
            id: "pageName",
            label: "页面名称",
            rules: [
              {
                required: true,
                message: "请输入页面名称",
                trigger: "blur",
                transform: v => v && v.trim()
              }
            ],
            el: { placeholder: "请输入页面名称" }
          },
          {
            type: "input",
            id: "title",
            label: "页面标题",
            rules: [
              {
                required: true,
                message: "该项为必填项",
                trigger: "blur",
                transform: v => v && v.trim()
              }
            ],
            el: { placeholder: "未填写则使用默认" }
          },
          {
            type: "input",
            id: "path",
            label: "路径",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "description",
            label: "描述",
            el: { placeholder: "未填写则使用默认", type: "textarea" }
          },
          {
            type: "input",
            id: "keywords",
            label: "关键词",
            el: { placeholder: "未填写则使用默认", type: "textarea" }
          },
          {
            type: "input",
            id: "remark",
            label: "备注",
            el: { placeholder: "未填写则使用默认" }
          }
        ],
        extraButtons: [
          {
            type: "danger",
            text: "删除",
            async atClick(row) {
              _this
                .$confirm("此操作将删除该页面, 是否继续?", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "danger"
                })
                .then(async () => {
                  let res = await _this.$store.dispatch(
                    "website-config/delTdk",
                    {
                      id: row.id
                    }
                  );
                  _this.$message({
                    message: "删除成功",
                    type: "success"
                  });
                  _this.reload();
                })
                .catch(() => {});
              resolve(false);
            }
          }
        ],
        dataPath: "list",
        totalPath: "count",
        tableAttrs: {
          emptyText: "暂无数据"
        },
        // hasOperation: false,
        paginationLayout: "sizes,prev, pager, next, jumper"
      },
      rules: {}
    };
  },
  methods: {}
};
</script>

