<template>
  <div class="tree-container">
    <el-tree
      :indent="0"
      :data="data"
      :props="defaultProps"
      @node-click="handleNodeClick"
    >
       <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            Append
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                  children: [
                    {
                      label: "四级级 1-1-1",
                      children: [
                        {
                          label: "五级级 1-1-1",
                        },
                      ],
                    },
                  ],
                },
                {
                  label: "三级 1-1-12",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      }
  },
};
</script>


<style lang="scss" scoped>
.tree-container /deep/ {
  .el-tree {
    .el-tree-node__expand-icon.el-icon-caret-right {
      &::before {
        content: url(https://rdimg.rundejy.com/web/runde_console/static/new_test_more.png) !important;
      }
      &.is-leaf {
        &::before {
          content: "" !important;
        }
      }
      &.expanded {
        transform: none !important;
        &::before {
          content: url(https://rdimg.rundejy.com/web/runde_console/static/new_test_less.png) !important;
        }
      }
    }
  }

  .el-tree > .el-tree-node:after {
    border-top: none;
  }

  .el-tree-node {
    position: relative;
    padding-left: 16px;
  }

  .el-tree-node__children {
    padding-left: 16px;
  }

  .el-tree-node :last-child:before {
    height: 38px;
  }

  .el-tree > .el-tree-node:before {
    border-left: none;
  }

  .el-tree-node:before {
    content: "";
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
  }

  .el-tree-node:after {
    content: "";
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
  }

  .el-tree-node:before {
    border-left: 1px solid #e3e3e3;
    bottom: 0px;
    height: 100%;
    top: -26px;
    width: 1px;
  }

  .el-tree-node:after {
    border-top: 1px solid #e3e3e3;
    height: 20px;
    top: 12px;
    width: 24px;
  }
}
</style>