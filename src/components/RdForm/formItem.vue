/**
 * 表单匹配项
 */
<template>
  <div class='form-item'>
    <el-input
      v-if="isInput"
      v-model.trim="currentVal"
      v-bind="bindProps"
      v-on="bindEvents"
      :type="itemOptions.type"
      :rows="itemOptions.rows || 2"
      :disabled="itemOptions.disabled"
      size="small">
    </el-input>


    <template v-if="isRadio">
      <template  v-for="item in itemOptions.options">
        <el-radio
          :key="item.value"
          :label="item.value"
          v-model.trim="currentVal"
            v-bind="bindProps"
            v-on="bindEvents"
          :disabled="itemOptions.disabled">
          {{item.label}}
        </el-radio>
        <span class="radio-tips" :key="item.label" v-if="item.tips">({{item.tips}})</span>
      </template>
      
    </template>
    
    <el-input-number
      v-if="isInputNumber"
      v-model.trim="currentVal"
      v-bind="bindProps"
      v-on="bindEvents"
      :disabled="itemOptions.disabled"
      :controls-position="itemOptions['controls-position'] || 'right'"
      size="small">
    </el-input-number>

    <el-select
      v-if="isSelect"
      v-model="currentVal"
      v-bind="bindProps"
      v-on="bindEvents"
      size="small"
      :multiple="itemOptions.multiple"
      :filterable="itemOptions.filterable"
      :disabled="itemOptions.disabled"
      @focus="setMinWidth"
      style="width:100%"
      clearable>
      <el-option
        v-for="item in itemOptions.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :style="{'min-width': minWidth + 2 + 'px'}">
      </el-option>
    </el-select>

    <!-- datetimerange/daterange -->
    <el-date-picker
      v-if="isDatePickerDateRange"
      v-model="currentVal"
      v-bind="bindProps"
      v-on="bindEvents"
      :type="itemOptions.type || 'datetimerange'"
      size="small"
      clearable
      :picker-options="pickerOptionsRange"
       :start-placeholder="itemOptions.startPlaceholder"
      range-separator="至"
      :end-placeholder="itemOptions.endPlaceholder"
      :default-time="['00:00:00', '23:59:59']"
      value-format="yyyy-MM-dd HH:mm:ss">
    </el-date-picker>

    <!-- monthrange -->
    <el-date-picker
      v-if="isDatePickerMonthRange"
      v-model="currentVal"
      v-bind="bindProps"
      v-on="bindEvents"
      type="monthrange"
      size="small"
      clearable
      :picker-options="pickerOptionsRangeMonth"
      :start-placeholder="itemOptions.startPlaceholder"
      range-separator="至"
      :end-placeholder="itemOptions.endPlaceholder"
      value-format="yyyy-MM">
    </el-date-picker>

    <!-- others -->
    <el-date-picker
      v-if="isDatePickerOthers"
      v-model="currentVal"
      v-bind="bindProps"
      v-on="bindEvents"
      :type="itemOptions.type"
       :start-placeholder="itemOptions.startPlaceholder"
      range-separator="至"
      :end-placeholder="itemOptions.endPlaceholder"
      size="small"
      clearable
      placeholder="请选择日期">
    </el-date-picker>

    <el-cascader
      v-if="isCascader"
      v-model="currentVal"
      v-bind="bindProps"
      v-on="bindEvents"
      size="small"
      :props="itemOptions.props"
      clearable>
    </el-cascader>
  </div>
</template>

<script>
// import tools from '@/utils/tools';
import {pickerOptionsRange, pickerOptionsRangeMonth} from './tools';

export default {
  inheritAttrs: false,
  components: {},
  props: {
    value: {},
    itemOptions: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  data () {
    return {
      pickerOptionsRange: pickerOptionsRange,
      pickerOptionsRangeMonth: pickerOptionsRangeMonth,
      minWidth:""
    }
  },

  created () {},

  mounted () {},

  methods: {
    setMinWidth (val) {
        this.minWidth = val.srcElement.clientWidth
    }
  },

  computed: {
    // 双向绑定数据值
    currentVal: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    // 绑定属性
    bindProps () {
      let obj = { ...this.itemOptions }
      // 移除冗余属性
      delete obj.label
      delete obj.prop
      delete obj.element
      delete obj.initValue
      delete obj.rules
      delete obj.events
      if (obj.element === 'el-select') {
        delete obj.options
      }
      return obj
    },
    // 绑定方法
    bindEvents () {
      return this.itemOptions.events || {}
    },
    // el-input 普通输入框
    isInput () {
      return this.itemOptions.element === 'el-input'
    },
    // el-input-number 数字输入框
    isInputNumber () {
      return this.itemOptions.element === 'el-input-number'
    },
    // el-select 下拉框
    isSelect () {
      return this.itemOptions.element === 'el-select'
    },
    // el-date-picker (type: datetimerange/daterange)
    isDatePickerDateRange () {
      const isDatePicker = this.itemOptions.element === 'el-date-picker'
      const isDateRange = !this.itemOptions.type ||
        this.itemOptions.type === 'datetimerange' ||
        this.itemOptions.type === 'daterange'
      return isDatePicker && isDateRange
    },
    // el-date-picker (type: monthrange)
    isDatePickerMonthRange () {
      const isDatePicker = this.itemOptions.element === 'el-date-picker'
      const isMonthRange = this.itemOptions.type === 'monthrange'
      return isDatePicker && isMonthRange
    },
    //  el-date-picker (type: other)
    isDatePickerOthers () {
      const isDatePicker = this.itemOptions.element === 'el-date-picker'
      return isDatePicker && !this.isDatePickerDateRange && !this.isDatePickerMonthRange
    },
    // el-cascader 级联选择器
    isCascader () {
      return this.itemOptions.element === 'el-cascader'
    },
    isRadio(){
       return this.itemOptions.element === 'el-radio'
    }
  },

}
</script>

<style lang='less' scoped>
//一些elmentui全局样式的修改
// el-input-number (controls-position="right")
.el-input-number.is-controls-right {
  .el-input-number__decrease {
    display: none;
  }
  .el-input-number__increase {
    display: none;
    top: 2px; // fix style bug
  }
  &:hover {
    .el-input-number__decrease {
      display: inline-block;
    }
    .el-input-number__increase {
      display: inline-block;
    }
  }
  .el-input__inner {
    text-align: left;
    padding-left: 5px;
    padding-right: 40px;
  }
}

// el-date-picker datetimerange
.el-date-editor.el-date-editor--datetimerange {
  .el-range-separator {
    width: 24px;
    color: #999;
    padding: 0;
  }
  .el-range__icon {
    margin-left: 0;
  }
  &.el-input__inner {
    vertical-align: middle;
    padding: 3px 5px;
  }
  &.el-range-editor--medium {
    width: 380px;

    .el-range-separator {
      line-height: 30px;
    }
  }
  &.el-range-editor--mini {
    width: 330px;

    .el-range-separator {
      line-height: 22px;
    }
  }
}

// el-date-picker  not datetimerange
.el-date-editor {
  .el-input__prefix {
    left: 0;
    top: 1px;
  }
  .el-input__suffix {
    right: 0;
    top: 1px;
  }
  .el-input__inner {
    padding: 0 25px;
  }
  &.el-input--mini {
    width: 175px;
  }
  &.el-input--medium {
    width: 195px;
  }
}

// input padding
.el-input__inner {
  padding: 0 5px;
}

.radio-tips {
  font-size: 12px;
  color: #777;
  margin-left: -6px;
}
</style>

