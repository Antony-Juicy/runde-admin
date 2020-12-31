<template>
  <div class="distribution">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onSubmit"
          >查询</el-button
        >
        <!-- <el-button type="warning" size="small" @click="onSubmit"
          >分配</el-button
        > -->
      </el-form-item>
    </el-form>
    <rd-table
      :tableData="tableData"
      :tableKey="tableKey"
      :pageConfig="pageConfig"
      highlight-current-row
      @pageChange="pageChange"
    >
      <template slot="phone" slot-scope="scope">
        {{$common.hidePhone(scope.row.phone)}}
      </template>
      <template slot="edit" slot-scope="scope">
        <el-button @click="handleEdit(scope.row)" type="text" 
          >分配</el-button
        >
      </template>
    </rd-table>
  </div>
</template>

<script>
export default {
  name: "distribution",
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
        tableData: [
        { id: 1, name: "飞翔的荷兰人3", cutdown: 1608897351706, visit: 2,phone:'15692026183' },
        { id: 2, name: "飞翔的荷兰人2",cutdown: new Date().getTime(),phone:'17092026183'  },
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
      ],
      tableKey: [
        {
          name: "ID",
          value: "name",
        },
         {
          name: "姓名",
          value: "name"
        },
        {
          name: "职位",
          value: "cutdown"
        },
        {
          name: "手机号码",
          value: "phone",
          operate: true
        },
        {
          name: "性别",
          value: "visit",
          width: 60,
        },
        {
          name: "机会持有数量",
          value: "menuOrder"
        },
        {
          name: "状态",
          value: "description1",
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 100
        }
      ],
      pageConfig: {
        totalCount: 100,
        currentPage: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
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
    }
  },
};
</script>

<style lang="scss" scoped>
.distribution {
}
</style>
