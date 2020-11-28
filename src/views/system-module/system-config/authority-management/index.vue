<template>
  <div class="authority-wrapper">
    <rd-tree
      :data="data"
      :defaultProps="defaultProps"
      @node-click="handleNodeClick"
    >
    </rd-tree>
  </div>
</template>

<script>
import RdTree from '@/components/RdTree'
export default {
  inject: ["reload"],
  components: {
    RdTree
  },
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
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  },
  mounted(){
  }
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