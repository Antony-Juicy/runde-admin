<template>
  <div class="comment">
    <el-row>
      <el-col :span="8">
        <el-switch v-model="value1" active-text="禁言设置"> </el-switch>
        <span class="tips"> (开启后全体禁言)</span>
      </el-col>
      <el-col :span="8">
        <el-switch v-model="value2" active-text="禁止图片"> </el-switch>
        <span class="tips"> (开启后全体不能发送图片)</span>
      </el-col>
      <el-col :span="8">
        <el-switch v-model="value3" active-text="聊天审核"> </el-switch>
        <span class="tips"> (开启后聊天内容需通过审核才能显示)</span>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="operate-table">
      <div class="title">审核列表</div>
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd"
          >批量通过</el-button
        >
        <el-button type="warning" size="small" @click="handleAdd"
          >批量不通过</el-button
        >
        <el-button type="info" size="small" @click="handleAdd"
          >批量删除</el-button
        >
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig="pageConfig"
        :multiple="true"
        fixedTwoRow
        @pageChange="pageChange"
        @select="handelSelect"
      >
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >通过</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click="handleDelete(scope.row)"
            type="text"
            size="small"
            style="color: #e6a23c"
            >不通过</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleEdit(scope.row)" type="text" size="small" style="color: #909399"
            >拉黑</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleEdit(scope.row)" type="text" size="small" style="color: #ec5b56"
            >禁言</el-button
          >
        </template>
      </rd-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "comment",
  data() {
    return {
      value1: true,
      value2: true,
      value3: true,
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
          name: "用户ID",
          value: "name",
        },
        {
          name: "用户昵称",
          value: "phone"
        },
        {
          name: "用户头像",
          value: "cutdown"
        },
        {
          name: "评论内容",
          value: "menuUrl",
        },
        {
          name: "评论时间",
          value: "visit"
        },
        {
          name: "状态",
          value: "menuOrder"
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 220
        }
      ],
      pageConfig: {
        totalCount: 100,
        currentPage: 1,
        pageSize: 10,
      },
      selectedData: [],
    };
  },
  methods: {
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
    handleAdd(){
      
    }
  },
};
</script>

<style lang="scss" scoped>
.comment {
    padding-left: 30px;
  .tips {
    font-size: 12px;
    line-height: 20px;
    color: #777;
  }
  .operate-table {
    .title {
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: bold;
       color: #409EFF;
    }
  }
}
</style>
