<template>
  <div class="comment-container">
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
        <el-button type="primary" size="small" @click="handleAdd">批量导入</el-button>
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :pageConfig="pageConfig"
        @select="handleSelect"
        @pageChange="pageChange">
        <template slot="giftImage" slot-scope="scope">
          <img :src="scope.row.giftImage" style="width:80px;height:80px;" alt="">
        </template>
        <template slot="giftStatus" slot-scope="scope">
          <span>{{ scope.row.giftStatus | giftStatusFilter }}</span>
        </template>
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleDelete(scope.row)" type="text" size="small" style="color: #ec5b56">删除</el-button>
        </template>
      </rd-table>
    </div>
  </div>
</template>

<script>

export default {
  name:"comment",
  data(){
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.comment-container {

}
</style>
