/**
 * 搜索栏公共组件
 */
<template>
  <div class="search-form-box">
    <div :class="{'search-box-wrapper': !showAll, 'search-box-wrapper2': showAll}">
      <el-form id="searchBox" :model="formData" ref="formRef" :inline="true">
        <template v-for="(item, index) in formOptions">
          <template v-if="index < showItem">
            <el-form-item
              :key="newKeys[index]"
              :prop="item.prop"
              :label="item.label ? item.label + '：' : ''"
              :rules="item.rules">
              <formItem v-model="formData[item.prop]" :itemOptions="item" />
            </el-form-item>
          </template>
        </template>
      </el-form>

      <!-- 提交按钮 -->
      <div class="btn-box">
        <el-button v-if="btnItems.includes('search')" size="mini" type="primary" class="btn-search" @click="onSearch" v-prevent-re-click="1000">搜索</el-button>
        <el-button v-if="btnItems.includes('reset')" size="mini" type="default" class="btn-reset" @click="onReset">重置</el-button>
        <el-button v-if="formOptions.length > showNum " type="text" style="margin-left:10px;height:40px;" id="closeSearchBtn" @click="closeSearch">
          {{word}}
          <i :class="showAll ? 'el-icon-arrow-up ': 'el-icon-arrow-down'"></i>
        </el-button>
      </div>
    </div>

    
  </div>
</template>

<script>
import formItem from "./formItem";
// import tools from '@/utils/tools'
import {createUniqueString} from "./tools";

export default {
  components: { formItem },
  props: {
    /**
     * 表单配置
     * 示例：
     * [{
     *   label: '用户名', // label文字
     *   prop: 'username', // 字段名
     *   element: 'el-input', // 指定elementui组件
     *   initValue: '阿黄', // 字段初始值
     *   placeholder: '请输入用户名', // elementui组件属性
     *   rules: [{ required: true, message: '必填项', trigger: 'blur' }], // elementui组件属性
     *   events: { // elementui组件方法
     *     input (val) {
     *       console.log(val)
     *     },
     *     ...... // 可添加任意elementui组件支持的方法
     *   }
     *   ...... // 可添加任意elementui组件支持的属性
     * }]
     */
    formOptions: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    // 接受可提交按钮选项，多个用逗号分隔（search, export, reset）
    btnItems: {
      type: String,
      default() {
        return "search, reset";
      },
    },
    showNum: {
      type: Number,
      default(){
        return 7; //默认展示搜索
      }
    }
  },

  data() {
    return {
      showAll: true,//是否展开全部
      formData: {},
      showItem: 7
    };
  },


  created() {
    this.addInitValue();
    this.showItem = this.showNum;
  },

  mounted() {
    // 展开收起搜索
    this.$nextTick(function() {
      this.closeSearch();
    });
    if(this.formOptions.length < 6){
      document.querySelector('#searchBox').style.width = 262 * this.formOptions.length + 'px'; 
    }
  },

  methods: {
    // 校验
    onValidate(callback) {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          callback();
        }
      });
    },
    // 搜索
    onSearch() {
      this.onValidate(() => {
        this.$emit("onSearch", this.formData);
      });
    },
    // 导出
    onExport() {
      this.onValidate(() => {
        this.$emit("onExport", this.formData);
      });
    },
    onReset() {
      this.$refs.formRef.resetFields();
    },
    // 添加初始值
    addInitValue() {
      const obj = {};
      this.formOptions.forEach((v) => {
        if (v.initValue !== undefined) {
          obj[v.prop] = v.initValue;
        }
      });
      this.formData = obj;
    },
    // 收起搜索事件
    closeSearch() {
      this.showAll = !this.showAll;
      if(this.showAll) {
        // 展开
        this.showItem = this.formOptions.length;
        setTimeout(() => {
        let formItemDoms = document.querySelectorAll('.el-form-item');
        for(let i=0; i< formItemDoms.length; i++){
          console.log(formItemDoms[i].contains(document.querySelector('.el-date-editor')),888)
          formItemDoms[i].style.width = `calc(${100/this.showNum}% - 22px)`
        }
        }, 0);
      }else {
        this.showItem = this.showNum;
      }
    }
  },

  computed: {
    newKeys() {
      return this.formOptions.map((v) => {
        return createUniqueString()
      });
    },
    word: function() {
      if (this.showAll == false) {
        //对文字进行处理
        return "展开";
      } else {
        return "收起";
      }
    }
  }

};
</script>

<style lang='less' scoped>
#searchBox {
  // margin-bottom: 10px;
  overflow: hidden;
}
.search-form-box {
  display: flex;
  margin-bottom: 15px;
  .search-box-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #fff;
    padding: 15px;
     #searchBox {
      width: calc(100% - 180px);
      
      display: flex;
      .el-form-item {
        flex: 1;
        max-width: 250px;
          /deep/.el-form-item__content {
          width: 100%;
        }
      }
      
    }
  }
  .search-box-wrapper2 {
    background-color: #fff;
    padding: 15px;
    width: 100%;
    #searchBox {
      .el-form-item {
        max-width: 250px;
        /deep/.el-form-item__content {
          width: 100%;
        }
      }
    }
  }
  .btn-box {
    display: flex;
    justify-content: flex-start;
    // padding-top: 5px;
    float: right;
    align-items: center;
    // margin-right: 20px;
    button {
      height: 28px;
    }
  }
  .el-form {
    /deep/ .el-form-item__label {
      width: 120px;
      padding-right: 0;
    }
    .el-form-item {
      margin-right: 12px;
      margin-bottom: 0;

      &.is-error {
        margin-bottom: 22px;
      }
    }
    // el-input宽度
    /deep/ .form-item {
      > .el-input:not(.el-date-editor) {
        width: 100%;
      }
    }
    /deep/ .el-input-number {
      width: 100%;
    }
    /deep/ .el-select {
      width: 100%;
    }
    /deep/ .el-date-picker {
      // width: 240px;
    }
    /deep/ .el-range-separator {
      padding: 0;
    }
    /deep/ .el-cascader {
      width: 240px;
    }
  }
}


</style>
