<template>
  <div class="add-goods">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="">
        <el-select
          v-model="formInline.region"
          placeholder="选择项目"
          size="small"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-input
          v-model="formInline.user"
          placeholder="请输入商品名称"
          size="small"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" size="small"
          >搜索</el-button
        >
      </el-form-item>
    </el-form>
    <div class="content">
        <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig="pageConfig"
        :multiple="true"
        :show-header="false"
        :border="false"
        @pageChange="pageChange"
        @select="handelSelect"
      >
        <template slot="name" slot-scope="scope">
            <!-- {{scope.row.phone}} -->
            <div class="goods-item-left">
              <div class="pic">
                <el-image
                    style="width: 150px; height: 100px"
                    :src="url"></el-image>
            </div>
            <div class="table-content">
                <div class="title">{{scope.row.phone}}</div>
                <div class="tags">
                    <el-tag size="small">标签一</el-tag>
                    <el-tag type="success" size="small">标签二</el-tag>
                    <el-tag type="info" size="small">标签三</el-tag>
                </div>
                <div class="price">2999</div>
            </div>
          </div>
        </template>
      </rd-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "add-goods",
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
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
      ],
      tableKey: [
        {
          name: "姓名",
          value: "name",
          operate: true
        }
      ],
      pageConfig: {
        totalCount: 100,
        currentPage: 1,
        pageSize: 10,
      },
       url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
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
    },
    handelSelect(val) {
      console.log(val, "valll");
      this.selectedData = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.add-goods {
  margin-bottom: -20px;
    .content {
        border-top: 1px solid #dcdfe6;
        border-bottom: 1px solid #dcdfe6;
        padding-top: 20px;
        padding-bottom: 20px;
        min-height: 180px;
        max-height: calc(81vh - 200px);
        overflow: auto;
        &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      box-shadow   : inset 0 0 5px #d0d1d3;
      background   : #d0d1d3;
    }
        .goods-item-left {
            display: flex;
            .pic {
                margin-right: 25px;
            }
            .table-content {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
            }
        }
        // /deep/ {
        //     .el-table td {
        //         border: none;
        //     }
        //     .el-table::before {
        //         display: none;
        //     }
        // }
    }
}
</style>
