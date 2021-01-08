<template>
  <div class="whitewords-container">
    <div class="w-container">
      聊天白名单词
      <el-switch v-model.trim ="whiteList.whiteStatus" active-color="#409EFF" inactive-color="#ff4949"></el-switch>
      <span style="font-size: 12px;">开启后包含白名单词的聊天内容自动通过审核</span>
    </div>
    <search-form :formOptions="formOptions" @onSearch="onSearch"></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small">添加白名单词</el-button>
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
  name:"white-words",
  data(){
    return {
      searchForm: {},
      formOptions: [
        { prop: 'whiteWord', element: 'el-input', placeholder: '请输入关键词' }
      ],
      tableData: [
        {
          whiteWord: "欢迎欢迎欢迎",
        }
      ],
      tableKey: [
        { name: '白名单词',value: 'whiteWord' },
        { name: '操作',value: 'edit',operate: true }
      ],
      whiteList: {
        whiteStatus: ""
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
.whitewords-container {
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