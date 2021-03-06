<template>
  <div class="table-wrapper">
    <div class="filter-bar" v-if="filterColumn">
      <el-popover placement="bottom" width="150" trigger="click">
        <el-checkbox
          v-for="item in tableKey"
          :label="item.value"
          :key="item.value"
          v-model="item.show"
          @change="checkboxChange"
          >{{ item.name }}</el-checkbox
        >
        <el-button slot="reference" size="small"
          ><i class="el-icon-finished" style="font-size: 14px"></i
        ></el-button>
      </el-popover>
    </div>
    <el-table
      :data="tableData"
      v-loading="loading"
      :ref="tableName"
      :class="{ twoRowContainer: fixedTwoRow, noBorder: !border }"
      :max-height="tbodyHeight"
      :show-header="showHeader"
      :border="border"
      :highlight-current-row="highlightCurrentRow"
      :row-key="rowKey"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
      @sort-change="handelSortChange"
    >
      <div slot="empty" :style="{opacity: endLoading}">
        <img v-show="this.isImage" src="@/assets/empty-image.png" alt="" class="img-empty" />
        <p>{{ endText }}</p>
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
            <el-tooltip
              placement="top"
              popper-class="tooltip-wrapper"
              effect="light"
            >
              <div slot="content">{{ scope.row[item.value] }}</div>
              <div>{{ scope.row[item.value] }}</div>
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
        :page.sync="currentPage"
        :limit.sync="pageConfig.pageSize"
        :pager-count="pagerCount"
        :autoScroll="autoScroll"
        :pageSizes="pageSizes"
        @pagination="pageChange"
      />
    </template>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { mapState } from "vuex";
import store from '@/store';
const cityOptions = ["上海", "北京", "广州", "深圳"];
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
    rowKey: {
      type: String,
      default: 'id'
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
      type: Boolean,
      default: false,
    },
    // 表格无数据默认图
    isImage: {
      type: Boolean,
      default: true
    },
    // 没有数据的时候显示的内容
    emptyText: {
      type: String,
      default: "暂无数据",
    },
    // 是否显示筛选列按钮,如果传入数组，默认隐藏该列
    filterColumn: {
      type: Boolean | Array,
      default: false,
    },
    // 固定表头时，设置表体的高度
    tbodyHeight: {
      type: Number | String,
      default: "100%",
    },
    // 点击是否高亮
    highlightCurrentRow: {
      type: Boolean,
      default: false,
    },
    // table的ref命名
    tableName: {
      type: String,
      default: "myTable",
    },
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: true,
    },
    // 是否显示边框
    border: {
      type: Boolean,
      default: true,
    },
    // 最大页码按钮数
     pagerCount:{
      type: Number,
      default: 7
    },
    // 翻页是否滚动顶部
    autoScroll: {
      type: Boolean,
      default: true
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
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
      tableKeyData: [],
    };
  },
  created() {
    if(this.filterColumn instanceof Array && this.filterColumn.length){
      this.tableKey.forEach((item) => {
        let target = this.filterColumn.find(ele => ele == item.value);
        item.show = !target;
      });
    }else {
      this.tableKey.forEach((item) => {
        item.show = true;
      });
    }
    
    this.tableKeyData = this.tableKey;
    store.dispatch("user/setTableText", this.emptyText)
  },
  computed: {
    ...mapState({
      endLoading: (state) => state.user.endLoading,
      endText: (state) => state.user.endText,
    }),
    checkColumn() {
      return this.tableKeyData.filter((item) => item.show);
    },
    currentPage: {
      get() {
        return this.pageConfig.currentPage || this.pageConfig.pageNum
      },
      set(val){
        return this.pageConfig.currentPage?this.$emit('update:pageConfig', {
          ...this.pageConfig,
          currentPage: val
        }):this.$emit('update:pageConfig', {
          ...this.pageConfig,
          pageNum: val
        })
      }
    }
  },
  watch: {
    // endLoading(newVal){
    //   console.log(newVal,'endLoading-------------')
    // },
    emptyText(newVal){
      store.dispatch("user/setTableText", newVal)
    }
  },
  methods: {
    checkboxChange(val) {
      this.tableKeyData = JSON.parse(JSON.stringify(this.tableKey));
    },
    handleSelectionChange(rows) {
      this.$emit("select", rows);
    },
    pageChange(val) {
      this.$emit("pageChange", val);
    },
    handelSortChange(data) {
      this.$emit("sortChange", data);
    },
    handleCheckedCitiesChange(val) {
      console.log(val, "valll");
    },
    handleCurrentChange(data) {
      this.$emit("currentChange", data);
    },
    toggleRowSelection() {
      return this.$refs[this.tableName].toggleRowSelection;
    },
  },
};
</script>

<style scoped lang="scss">
.table-wrapper {
  position: relative;
  .filter-bar {
    position: absolute;
    right: 0;
    top: -40px;
  }
}
.img-empty {
  width: 260px;
  height: 260px;
  margin-top: 20px;
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
        background-color: #fafafa;
        color: #333333;
        font-weight: 600;
        height: 43px;
      }
    }
    .el-table__body {
      height: 100%;
      td {
        color: #333333;
        font-weight: 400;
      }
    }
  }
  .el-table td,
  .el-table th {
    padding: 3px 0;
  }
  .tooltip-wrapper {
    max-width: 400px;
  }
}

// 设置固定高度，固定两行
.twoRowContainer {
  /deep/ {
    .el-table__body td {
      height: 55px;
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

// 没有边框
.noBorder {
  &::before {
    display: none;
  }
  /deep/ {
    .el-table__body td,
    .el-table__header th {
      border: none;
      background-color: #fff;
    }
  }
}
</style>
