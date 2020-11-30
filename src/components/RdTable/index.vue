<template>
  <div class="table-wrapper">
    <el-table
      :data="tableData"
      v-loading="loading"
      :class="{'twoRowContainer': fixedTwoRow}"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="multiple" type="selection" width="55">
      </el-table-column>
      <template v-for="(item, key) in tableKey">
        <el-table-column
          v-if="!item.operate && !item.showTooltip"
          :key="key"
          :prop="item.value"
          :label="item.name"
          :width="item.width"
        ></el-table-column>

        <el-table-column
          v-else-if="item.showTooltip"
          :key="key"
          :prop="item.value"
          :label="item.name"
          :width="item.width"
        >
          <template slot-scope="scope">
            <el-tooltip placement="top" popper-class="tooltip-wrapper" effect="light">
              <div slot="content">{{scope.row[item.value]}}</div>
              <div>{{scope.row.remark}}</div>
            </el-tooltip>
          </template>
        </el-table-column>

        <!-- 自定义 -->
        <el-table-column
          v-else
          :key="key"
          :prop="item.value"
          :label="item.name"
          :width="item.width"
        >
          <template slot-scope="scope">
            <slot
              :name="item.value"
              :$index="scope.$index"
              :row="scope.row"
            ></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <template v-if="pageConfig && pageConfig.totalCount">
      <pagination
        :total="pageConfig.totalCount"
        :page.sync="pageConfig.pageNum"
        :limit.sync="pageConfig.pageSize"
        @pagination="pageChange"
      />
    </template>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
export default {
  name: "RdTable",
  props: {
    //   表格的数据源
    tableData: {
      type: Array,
      default: () => [],
    },
    // 表格的配置等
    tableKey: {
      type: Array,
      default: () => [],
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false,
    },
    // 分页配置
    pageConfig: {
      type: Object,
      default: () => {},
    },
    // loading
    loading: {
      type: Boolean,
      default: false,
    },
    // 固定两行的高度，超出隐藏
    fixedTwoRow: {
      type:Boolean,
      default: false
    }
  },
  components: {
    Pagination,
  },
  data() {
    return {
    };
  },
  methods: {
    handleSelectionChange(rows) {
      this.$emit("select", rows);
    },
    pageChange(val){
      this.$emit("pageChange",val);
    }
  },
};
</script>

<style scoped lang="scss">
.twoRowContainer {
  /deep/ {
    .el-table__body td {
       height: 71px;
    }
  }
}
/deep/ {
  .el-table {
    .el-table__header {
      th {
        background-color: #FAFAFA;
        color: #333333;
        font-weight: 600;
        height: 50px;
      }
    }
    .el-table__body {
      td {
        color: #333333;
        font-weight: 400;
       
        .cell {
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
      }
    }
  }
  .tooltip-wrapper {
    max-width: 400px;
  }
}
</style>
