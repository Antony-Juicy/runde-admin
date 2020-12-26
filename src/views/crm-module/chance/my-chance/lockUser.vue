<template>
  <div class="private-customers">
    <search-form
      :formOptions="formOptions"
      :showNum="6"
      @onSearch="onSearch"
    ></search-form>
    <el-divider></el-divider>
    锁定客户
    <div class="btn-wrapper">
      <el-button type="success" size="small" @click="handleAdd">成单</el-button>
      <el-button type="warning" size="small" @click="handleAdd">释放</el-button>
      <el-button type="danger" size="small" @click="handleAdd">失效</el-button>
      <el-button size="small" @click="handleAdd">延长锁定</el-button>
    </div>
    <rd-table
      :tableData="tableData"
      :tableKey="tableKey"
      :pageConfig="pageConfig"
      :filterColumn="true"
      :multiple="true"
      fixedTwoRow
      highlight-current-row
      @pageChange="pageChange"
      @select="handelSelect"
    >
    <!-- 手机号 -->
      <template slot="phone" slot-scope="scope">
        {{$common.hidePhone(scope.row.phone)}}
      </template>
      <!-- 倒计时 -->
      <template slot="cutdown" slot-scope="scope">
        <span style="color: red">{{ newArr[scope.$index].newCutdown }}</span>
      </template>
      <!-- 回访 -->
      <template slot="visit" slot-scope="scope">
        <span class="visit-container" @click="drawerVisible = true">{{
          scope.row.visit || 0
        }}</span>
      </template>
      <template slot="edit" slot-scope="scope">
        <el-button @click="handleEdit(scope.row)" type="text" size="small"
          >编辑</el-button
        >
        <el-divider direction="vertical"></el-divider>
        <el-button
          @click="handleDelete(scope.row)"
          type="text"
          size="small"
          style="color: #ec5b56"
          >删除</el-button
        >
      </template>
    </rd-table>
    <!-- 回访抽屉 -->
    <rd-drawer
      :dialogVisible="drawerVisible"
      :size="drawerSize"
      @handleClose="drawerVisible = false"
    ></rd-drawer>
  </div>
</template>

<script>
let id = 0;
import rdDrawer from "@/components/RdDrawer";
export default {
  name: "temp",
  data() {
    return {
      // 搜索栏
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
          prop: "menuName",
          element: "el-select",
          placeholder: "机会来源",
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
          placeholder: "查询排序方法",
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
          placeholder: "呼叫状态",
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
          prop: "abc",
          element: "el-cascader",
          placeholder: "项目",
        
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
           }
        },
      ],
      tableData: [
        { id: 1, name: "飞翔的荷兰人3", cutdown: 1608897351706, visit: 2 },
        { id: 2, cutdown: new Date().getTime() },
        { id: 3 },
      ],
      tableKey: [
        {
          name: "姓名",
          value: "name",
        },
        {
          name: "手机号",
          value: "phone",
          operate: true
        },
         {
          name: "创建时间",
          value: "menuName",
        },
         {
          name: "分配时间",
          value: "menuName",
        },
         {
          name: "锁定次数",
          value: "menuName",
        },
        {
          name: "回收倒计时",
          value: "cutdown",
          operate: true,
          width: 155,
        },
        {
          name: "机会来源",
          value: "menuUrl",
        },
        {
          name: "回访",
          value: "visit",
          operate: true,
          width: 60,
        },
        {
          name: "最近回访",
          value: "menuOrder",
          // width: 100
        },
        {
          name: "下次回访",
          value: "description1",
        },
        {
          name: "跟进状态",
          value: "description2",
        }
      ],
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
      },
      newArr: [], //倒计时的数组
      // 回访抽屉参数
      drawerVisible: false,
      drawerSize: "50%",
    };
  },
  components: {
    rdDrawer,
  },
  mounted() {
    this.getCutdown();
    setInterval(() => {
      this.getCutdown();
    }, 1000);
  },
  methods: {
    onSearch() {},
    handleAdd() {},
    pageChange(val) {
      // this.pageConfig.currentPage = val.page;
      // this.pageConfig.pageSize = val.limit;
      // console.log(this.searchForm,'this.searchForm--')
      // this.getTableData({
      //   currentPage: (val && val.page) || 1,
      //   pageSize: (val && val.limit) || 10,
      //   loginUserId,
      //   ...this.searchForm,
      //   parentId: this.parentId
      // });
    },
    handelSelect(val) {
      console.log(val, "valll");
      this.selectedData = val;
    },
    getCutdown() {
      this.newArr = this.tableData.map((item) => {
        if (item.cutdown) {
          item.newCutdown = this.$common.showtime(item.cutdown);
        }
        return item;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.private-customers {
  .search-form-box {
    margin: -15px -15px 0 -15px;
  }
  .btn-wrapper {
    margin-bottom: 15px;
  }
  .visit-container {
    display: inline-block;
    padding: 5px;
    border: 1px solid #dcdfe6;
    line-height: 9px;
    border-radius: 2px;
    color: #606266;
    cursor: pointer;
  }
}
</style>
