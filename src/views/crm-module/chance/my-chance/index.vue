<template>
  <div class="my-chance-container">
    <div class="top-total w-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="私海客户" name="first"></el-tab-pane>
        <el-tab-pane label="公海客户" name="second"></el-tab-pane>
        <el-tab-pane label="锁定客户" name="third"></el-tab-pane>
      </el-tabs>
      <div class="card-wrapper">
        <el-row :gutter="12">
          <el-col :span="4" v-for="item in 5" :key="item">
            <el-card shadow="hover">
              <div class="call-total">
                <div class="call-title">今日有效呼叫</div>
                <div class="call-content">0</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-select v-model="chanceValue" placeholder="请选择">
              <el-option
                v-for="item in chanceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="main mt-15">
      <div class="main-left w-container">
        <search-form
          :formOptions="formOptions"
          @onSearch="onSearch"
        ></search-form>
         <rd-table
            :tableData="tableData"
            :tableKey="tableKey"
            :pageConfig="pageConfig"
            :filterColumn="true"
            @pageChange="pageChange"
          >
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
      </div>
      <div class="main-right w-container">
        456
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-chance",
  data() {
    return {
      activeName: "first",
      chanceValue: "0",
      chanceOptions: [
        {
          value: "0",
          label: "全部",
        },
        {
          value: "1",
          label: "手机外呼",
        },
        {
          value: "2",
          label: "在线外呼（总部）",
        },
        {
          value: "3",
          label: "在线外呼（总部）",
        },
      ],
       // 搜索栏
      formOptions: [
        {
          prop: "menuName",
          element: "el-input",
          initValue: "",
          placeholder: "请输入名称",
        }
      ],
      tableData: [
      ],
      tableKey: [
        {
          name: "ID",
          value: "id",
          width: 80
        },
        {
          name: "名称",
          value: "menuName"
        },
        {
          name: "类型",
          value: "menuType",
          operate: true,
        },
        {
          name: "路径",
          value: "menuUrl",
          showTooltip: false,
          operate: true,
        },
        {
          name: "状态",
          value: "status",
          operate: true
        },
        {
          name: "排序",
          value: "menuOrder",
          // width: 100
        },
        {
          name: "备注",
          value: "description",
          showTooltip: true
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 120
        },
      ],
       pageConfig: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSearch(){

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

<style lang='scss' scoped>
.my-chance-container {
  .top-total {
    padding-top: 6px;
    .card-wrapper {
      display: flex;
      & > div {
        flex: 1;
      }
      .call-total {
        .call-title {
          font-size: 12px;
          color: #999;
        }
        .call-content {
          font-size: 30px;
          font-weight: 300;
          color: #ff5722;
        }
      }
      /deep/ {
        .el-card__body {
          background-color: #f8f8f8;
          border: none;
        }
      }
    }
  }
  .main {
    display: flex;
    .main-left {
      flex: 1;
      margin-right: 15px;
      .search-form-box {
        margin-left: -15px;
      }
      .table-wrapper {
        margin-top: -15px;
      }
    }
    .main-right {
      width: 25%;
    }
  }
}
</style>