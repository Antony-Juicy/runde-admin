<template>
  <div class="tree-container">
    <el-tree
      :indent="0"
      :data="data"
      :props="defaultProps"
      @node-click="handleNodeClick"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span :class="{'greenNode': data.type == 1 ,'redNode': data.type == 2 }">{{ node.label }}</span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  props: {
      data: {
          type: Array,
          default: () => []
      },
      defaultProps: {
           type: Object,
          default: () => ({
        children: "children",
        label: "label",
      })
      }
  },
  data() {
    return {
     
    };
  },
  methods: {
    handleNodeClick(data) {
      this.$emit('nodeClick',data)
    }
  }
};
</script>


<style lang="scss" scoped>
.custom-tree-node {
  font-size: 14px;
}
.greenNode {
  color: #67C23A;
}
.redNode {
  color: #EC5B56;
}
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