<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          >{{ item&&item.meta&&item.meta.title }}</span
        >
        <span v-else class="no-redirect">{{ item&&item.meta&&item.meta.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from "path-to-regexp";
import { mapState } from "vuex";
//递归实现,找到子级的所有父级节点，返回数组
//@leafId  为你要查找的id，
//@nodes   为原始Json数据
//@path    供递归使用，不要赋值
function findPathByLeafId(leafId, nodes, path) {
  if (path === undefined) {
    path = [];
  }
  for (var i = 0; i < nodes.length; i++) {
    var tmpPath = path.concat();
    tmpPath.push(nodes[i]);
    if (leafId == nodes[i].id) {
      return tmpPath;
    }
    if (nodes[i].children) {
      var findResult = findPathByLeafId(leafId, nodes[i].children, tmpPath);
      if (findResult) {
        return findResult;
      }
    }
  }
}
export default {
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  computed: {
    ...mapState({
      permission_addRoutes: (state) => state.permission.addRoutes,
    }),
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      const matched = this.$route.matched.filter(
        (item) => item&&item.meta && item.meta.title
      );
      const initLevelList = matched.filter(
        (item) => item&&item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
      this.levelList = findPathByLeafId(
        initLevelList[0]&&initLevelList[0].meta&&initLevelList[0].meta.id,
        this.permission_addRoutes
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 22px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
