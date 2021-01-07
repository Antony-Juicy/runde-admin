<template>
  <div class="goods-list">
      <div class="goods-item" v-for="item in 6" :key="item">
          <div class="goods-item-left">
              <div class="pic">
                <el-image
                    style="width: 150px; height: 100px"
                    :src="url"></el-image>
            </div>
            <div class="content">
                <div class="title">商品名称商品名称商品名称商品名称商品名称商品</div>
                <div class="tags">
                    <el-tag size="small">标签一</el-tag>
                    <el-tag type="success" size="small">标签二</el-tag>
                    <el-tag type="info" size="small">标签三</el-tag>
                </div>
                <div class="price">2999</div>
            </div>
          </div>
          <div class="operate">
              <!-- <el-switch
                v-model="value1"
                active-text="设为爆品"
                :width="35">
                </el-switch>
                <el-divider direction="vertical"></el-divider>
                <el-switch
                v-model="value2"
                active-text="标记讲解"
                active-color="#13ce66"
                :width="35">
                </el-switch>
                <el-divider direction="vertical"></el-divider> -->
                <el-button type="danger" round size="mini">删除</el-button>
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
  name:"goods-list",
  data(){
    return {
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        value1:true,
        value2:true,
        pageConfig: {
            totalCount: 100,
            pageNum: 1,
            pageSize: 10,
        }
    }
  },
  components:{
      Pagination
  },
   methods: {
       pageChange(val) {
        console.log(val,'pagechange')
        }
  }
}
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
