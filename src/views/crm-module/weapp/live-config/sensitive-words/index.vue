<template>
  <div class="sensitiveword-container">
    <div class="w-container">
      聊天敏感词
      <el-switch v-model.trim ="sensitiveList.sensitiveStatus" active-color="#409EFF" inactive-color="#ff4949"></el-switch>
      <span style="font-size: 12px;">开启后包含敏感词的聊天内容只有发送者本人可见</span>
    </div>
    <search-form :formOptions="formOptions" @onSearch="onSearch"></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small">添加敏感词</el-button>
        <el-button type="primary" size="small">批量导入</el-button>
        <el-button type="primary" size="small">批量导入删除</el-button>
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :pageConfig="pageConfig"
        @select="handleSelect"
        @pageChange="pageChange">
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleDelete(scope.row)" type="text" size="small" style="color: #ec5b56" >删除</el-button>
        </template>
      </rd-table>
    </div>
  </div>
</template>

<script>

export default {
  name:"sensitive-words",
  data(){
    return {
      searchForm: {},
      formOptions: [
        { prop: 'sensitiveWord', element: 'el-input', placeholder: '请输入关键词' }
      ],
      tableData: [
        {
          sensitiveWord: "傻X",
        }
      ],
      tableKey: [
        { name: '敏感词',value: 'sensitiveWord' },
        { name: '操作',value: 'edit',operate: true }
      ],
      sensitiveList: {
        sensitiveStatus: ""
      },
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,
    }
  },
   methods: {
    onSearch(val) {
      this.searchForm = {...val};
      console.log(val,this.searchForm , 'val---')
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    pageChange(val) {
      console.log(val,'pagechange')
    },
    handleEdit() {
      console.log(666)
    },
    handleDelete() {
      console.log(777)
    }
  }
}
</script>

<style lang="scss" scoped>
.sensitivewords-container {
  /deep/ {
    .search-box-wrapper {
      padding-top: 0px;
    }
  }
  .btn-wrapper {
    margin-bottom: 8px;
  }
}
</style>