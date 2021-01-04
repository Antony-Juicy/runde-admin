<template>
  <div class="live-container">
    <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd"
          >创建直播</el-button
        >
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig="pageConfig"
        fixedTwoRow
        highlight-current-row
        @pageChange="pageChange"
      >
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >管理</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleEdit(scope.row)" type="text" size="small" style="color: #ffa500"
            >链接</el-button
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

      <!-- 添加 -->
      <fullDialog v-model="addVisible" title="创建直播" @change="addVisible = false">
           <addLive/>
      </fullDialog>
    </div>
  </div>
</template>

<script>
import fullDialog from '@/components/FullDialog';
import addLive from './addLive';
export default {
  name: "live",
  data() {
    return {
      formOptions: [
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入直播名称",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入直播id",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "项目类型",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "收费类型",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "直播模式",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "直播状态",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "显示状态",
        },
      ],
      tableData: [
        {
          id: 1,
          name: "飞翔的荷兰人3",
          cutdown: 1608897351706,
          visit: 2,
          phone: "15692026183",
        },
        {
          id: 2,
          name: "飞翔的荷兰人2",
          cutdown: new Date().getTime(),
          phone: "17092026183",
        },
        { id: 3, name: "飞翔的荷兰人1", phone: "18892026183" },
      ],
      tableKey: [
        {
          name: "直播id",
          value: "name",
        },
        {
          name: "直播展示图",
          value: "phone",
          operate: true,
        },
        {
          name: "项目类型",
          value: "cutdown"
        },
        {
          name: "直播名称",
          value: "menuUrl",
        },
        {
          name: "收费类型",
          value: "visit"
        },
        {
          name: "直播状态",
          value: "menuOrder"
        },
        {
          name: "显示状态",
          value: "description1",
        },
        {
          name: "开始时间",
          value: "description2",
        },
        {
          name: "直播模式",
          value: "description3",
        },
        {
          name: "浏览量",
          value: "description3",
        },
        {
          name: "操作",
          value: "edit",
          operate: true
        },
      ],
      pageConfig: {
        totalCount: 100,
        currentPage: 1,
        pageSize: 10,
      },
      // 添加弹窗
      addVisible: false
    };
  },
  components:{
    fullDialog,
    addLive
  },
  methods: {
    onSearch() {},
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
    handleAdd() {
      this.addVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.live-container {
  /deep/ {
    .el-form-item__content {
      width: 400px;
    }
  }
}
</style>
