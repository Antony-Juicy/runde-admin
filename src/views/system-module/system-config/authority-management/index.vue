<template>
  <div class="authority-wrapper">
   <div class="tree-wrapper">
      <rd-tree
      :data="data"
      :defaultProps="defaultProps"
      @node-click="handleNodeClick"
    >
    </rd-tree>
   </div>
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
</style>