<template>
  <div class="add-goods">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="">
        <!-- <el-select
          v-model="formInline.typeId"
          placeholder="选择项目"
          size="small"
        >
          <el-option :label="item.label" :value="item.value" v-for="item in productList" :key="item.value"></el-option>
        </el-select> -->
        <el-cascader
          style="width:100%;"
          v-model.trim="formInline.typeId"
          :options="productList"
          :props="{ checkStrictly: true }"
          placeholder="选择项目"
          clearable>
        </el-cascader>
      </el-form-item>
      <el-form-item label="">
        <el-input
          v-model="formInline.goodsName"
          placeholder="请输入商品名称"
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
        :pageConfig.sync="pageConfig"
        :multiple="true"
        :show-header="false"
        :border="false"
        :emptyText="emptyText"
        @pageChange="pageChange"
        @select="handelSelect"
      >
        <template slot="name" slot-scope="scope">
            <!-- {{scope.row.phone}} -->
            <div class="goods-item-left">
              <div class="pic">
                <el-image
                    style="width: 130px; height: 100px"
                    :src="scope.row.goodsThumbnail"
                    fit="cover"></el-image>
            </div>
            <div class="table-content">
                <div class="title">{{scope.row.goodsName}}</div>
                <div class="tags">
                    <el-tag size="small" v-for="(item,index) in scope.row.goodsLabels || []" :key="index">{{item}}</el-tag>
                </div>
                <div class="price">￥ {{scope.row.goodsPrices}}</div>
            </div>
          </div>
        </template>
      </rd-table>
    </div>
    <div class="add-goods-btn clearfix">
        <el-button type="primary" size="small" @click="handelSubmit">添加到直播间</el-button>
        <el-button size="small" @click="handelCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "add-goods",
  data() {
    return {
      emptyText:"暂无数据",
      formInline: {
        goodsName: "",
        typeId: "",
      },
       tableData: [
      ],
      tableKey: [
        {
          name: "姓名",
          value: "name",
          operate: true
        }
      ],
      pageConfig: {
        totalCount: 0,
        pageNum: 1,
        pageSize: 10,
      },
      productList:[],
      selectedData:[]
    };
  },
  props: {
    liveId: {
      type: Number,
    },
    refreshFlag:{
      type: Number
    }
  },
  watch:{
    refreshFlag(newVal,oldVal){
      if(newVal>oldVal){
        this.getTableData();
      }
    }
  },
  mounted(){
    this.$fetch("projectType_select").then(res => {
      // this.productList = res.data.map(item => ({
      //   label: item.typeName,
      //   value: item.typeId
      // }))
      this.productList = this.$common.getTypeTree(res.data)
    })
    this.getTableData();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      this.getTableData();
    },
    pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.pageNum = val.page;
      this.pageConfig.pageSize = val.limit;
      this.getTableData();
    },
    handelSelect(val) {
      console.log(val, "valll");
      this.selectedData = val;
    },
    getTableData(params = {}) {
      console.log(this.formInline.typeId,'this.formInline.typeId----1')
      if(this.formInline.typeId.constructor == Array) {
        this.formInline.typeId = this.formInline.typeId.pop()
      }
      console.log(this.formInline.typeId,'this.formInline.typeId----2')
      this.$fetch("live_get_live_add_goods_list", {
        ...this.pageConfig,
        ...this.formInline,
        ...params,
        liveId: this.liveId
      }).then((res) => {
        this.tableData = res.data.records;
        this.pageConfig.totalCount = res.data.totalCount;
      })
    },
    handelCancel(){
      this.$emit("close")
    },
    handelSubmit(){
      if(!this.selectedData.length){
        this.$message.warning("请选择商品")
        return
      }
      this.$fetch("live_batch_add_related",{
        goodsIds: JSON.stringify(this.selectedData.map(item=>(item.goodsId))),
        liveId: this.liveId
      }).then(res=>{
        if(res.code == 200){
          this.$message.success("添加成功")
          this.$emit("close")
          this.$emit("refresh")
        }
      }).catch(err=>{
        console.log(err)
      })
    }
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
    .add-goods-btn {
      /deep/ {
        .el-button {
          float: right;
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .el-button--primary {
          margin-left: 10px;
        }
      }
    }
}
</style>
