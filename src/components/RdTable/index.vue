<template>
  <div class="table-wrapper">
    <div class="filter-bar" v-if="filterColumn">
      <el-popover
        placement="bottom"
        width="150"
        trigger="click">
          <el-checkbox v-for="item in tableKey" :label="item.value" :key="item.value" v-model="item.show" @change="checkboxChange">{{item.name}}</el-checkbox>
        <el-button slot="reference" size="small"><i class="el-icon-finished" style="font-size: 14px"></i></el-button>
      </el-popover>
    </div>
    <el-table
      :data="tableData"
      v-loading="loading"
      :class="{'twoRowContainer': fixedTwoRow}"
      border
      @selection-change="handleSelectionChange"
      @sort-change="handelSortChange"
    >
      <div slot="empty">
        <img src="@/assets/empty-image.png" alt="" class="img-empty">
        <p>{{emptyText}}</p>
      </div>
      <el-table-column v-if="multiple" type="selection" width="55">
      </el-table-column>
      <template v-for="(item, key) in checkColumn">
        <el-table-column
          v-if="!item.operate && !item.showTooltip"
          :key="key"
          :fixed="item.fixed"
          :sortable="item.sortable"
          :prop="item.value"
          :label="item.name"
          :width="item.width"
        ></el-table-column>

        <el-table-column
          v-else-if="item.showTooltip"
          :fixed="item.fixed"
          :sortable="item.sortable"
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
          :fixed="item.fixed"
          :sortable="item.sortable"
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
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
  name: "RdTable",
  props: {
    //   表格的数据源
    tableData: {
      type: Array,
      default: () => [],
    },
    // 表格的配置等
    /**
     * sortable 排序 'custom' | true | false
     * fixed  固定列  'left' | 'right
     * width  列宽    (Number)
     * operate 自定义模板
     * showTooltip 是否出现悬浮窗 true | false
     */
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
    },
    // 没有数据的时候显示的内容
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    // 是否显示筛选列按钮
    filterColumn: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Pagination,
  },
  data() {
    return {
       checkAll: false,
        checkedCities: [],
        cities: cityOptions,
        isIndeterminate: true,
        tableKeyData:[]
    };
  },
  created(){
    this.tableKey.forEach(item => {
      item.show = true;
    })
    this.tableKeyData = this.tableKey;
  },
  computed:{
    checkColumn(){
      return this.tableKeyData.filter(item => item.show)
    }
  },
  methods: {
    checkboxChange(val){
      this.tableKeyData = JSON.parse(JSON.stringify(this.tableKey));
    },
    handleSelectionChange(rows) {
      this.$emit("select", rows);
    },
    pageChange(val){
      this.$emit("pageChange",val);
    },
    handelSortChange(data){
      this.$emit("sortChange", data);
    },
    handleCheckedCitiesChange(val){
      console.log(val,'valll')
    }
  },
};
</script>

<style scoped lang="scss">
.table-wrapper {
  position: relative;
  .filter-bar {
    position: absolute;
    right: 0;
    top: -48px;
  }
}
.img-empty {
  width: 260px;
  height: 260px;
  margin-top: 20px;
}
.twoRowContainer {
  /deep/ {
    .el-table__body td {
       height: 71px;
    }
  }
}
/deep/ {
  .el-checkbox {
    display: block;
    margin-bottom: 6px;
  }
  .el-table {
    .el-table__body-wrapper {
      // min-height: 50vh;
      .el-table__empty-block {
        height: 100%;
      }
    }
    .el-table__header {
      th {
        background-color: #FAFAFA;
        color: #333333;
        font-weight: 600;
        height: 50px;
      }
    }
    .el-table__body {
      height: 100%;
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
