<template>
  <div class="goods-list">
    <div class="goods-item" v-for="(item,index) in tableData" :key="index">
      <div class="goods-item-left">
        <div class="pic">
           <el-image
                    style="width: 130px; height: 100px"
                    :src="item.goodsThumbnail"
                    fit="cover"></el-image>
        </div>
        <div class="content">
          <div class="title">{{item.goodsName}}</div>
          <div class="tags">
            <el-tag size="small" v-for="(ele,i) in item.goodsLabels" :key="i">{{ele}}</el-tag>
          </div>
          <div class="price">￥ {{item.goodsPrices}}</div>
        </div>
      </div>
      <div class="operate">
        <el-button type="danger" round size="mini" @click="handelDelete(item.liveGoodsId)">删除</el-button>
      </div>
    </div>

    <Pagination
      :total="pageConfig.totalCount"
      :page.sync="pageConfig.currentPage"
      :limit.sync="pageConfig.pageSize"
      @pagination="pageChange"
    />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
export default {
  name: "goods-list",
  data() {
    return {
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      value1: true,
      value2: true,
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      tableData:[]
    };
  },
  components: {
    Pagination,
  },
  props: {
    liveId: {
      type: Number,
    },
  },
  mounted(){
      this.getTableData();
  },
  methods: {
    pageChange(val) {
      console.log(val, "pagechange");
      this.pageConfig.pageNum = val.page;
      this.pageConfig.pageSize = val.limit;
      this.getTableData();
    },
    getTableData(params = {}) {
      const loading = this.$loading({
        lock: true,
        target: ".goods-list .el-table",
      });
      this.$fetch("live_get_live_goods_list", {
        ...this.pageConfig,
        ...params,
        liveId: this.liveId
      }).then((res) => {
        this.tableData = res.data.records;
        this.pageConfig.totalCount = res.data.totalCount;
        // this.pageConfig.totalCount = 2;
        setTimeout(() => {
          loading.close();
        }, 200);
      });
    },
    handelDelete(id){
         let info = '商品';
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$fetch("live_goods_delete", {
            liveGoodsId: id
          }).then((res) => {
            if (res) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              setTimeout(() => {
                this.getTableData();
              }, 50);
            }
          });
        })
        .catch(() => {});
    }
  },
};
</script>

<style lang="scss" scoped>
.goods-list {
  .goods-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
    padding-right: 20px;
    .goods-item-left {
      display: flex;
      .pic {
        margin-right: 25px;
      }
      .content {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }
    /deep/ {
      .el-switch__label--right {
        margin-left: 2px;
      }
      .el-switch__label {
        font-size: 12px;
      }
      .el-switch__label.is-active {
        color: #303133;
      }
    }
  }
}
</style>
