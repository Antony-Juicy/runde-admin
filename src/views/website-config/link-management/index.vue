<template>
  <div>
    <el-alert type="success" :closable="false" description="跳转链接如果是站内的请前往页面管理获取对应路径,如果是站外则必须以http://或者https://开头的形式。"></el-alert>
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
        treeParentKey: "menuParentId",
        treeLevelKey: "menuLevel",
        // isTree: true,
        url: {
          get: "website-config/getFriendMenuPage",
          add: "website-config/addNavMenu",
          set: "website-config/setNavMenu"
        },
        hasDelete: false,
        // hasEdit: false,
        // hasNew: false,
        columns: [
          // { prop: "id", label: "id", width: "70px" },
          { prop: "menuName", label: "链接名称", width: "150px" },
          { prop: "menuOrder", label: "排序", width: "120px" },
          { prop: "menuTarget", label: "跳转地址" }
        ],
        form: [
          {
            type: "input-number",
            id: "menuOrder",
            label: "排序",
            rules: [
              {
                required: true,
                message: "请输入排序",
                trigger: "blur"
                // transform: v => v
              }
            ],
            el: { placeholder: "请输入排序", "controls-position": "right" }
          },
          {
            type: "input",
            id: "menuName",
            label: "链接名称",
            rules: [
              {
                required: true,
                message: "请输入链接名称",
                trigger: "blur",
                transform: v => v && v.trim()
              }
            ],
            el: { placeholder: "请输入链接名称" }
          },
          {
            type: "input",
            id: "menuTarget",
            label: "跳转地址",
            el: { placeholder: "" }
          }
        ],
        extraButtons: [
          {
            type: "danger",
            text: "删除",
            async atClick(row) {
              _this
                .$confirm("此操作将删除该菜单, 是否继续?", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "danger"
                })
                .then(async () => {
                  let res = await _this.$store.dispatch(
                    "website-config/delNavMenu",
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
        extraBody: {
          menuLevel: -1
        },
        dataPath: "list",
        totalPath: "count",
        tableAttrs: {
          emptyText: "暂无数据"
        },
        expandAll: true,
        // hasOperation: false,
        paginationLayout: "sizes,prev, pager, next, jumper"
      },
      rules: {}
    };
  },
  methods: {}
};
</script>

