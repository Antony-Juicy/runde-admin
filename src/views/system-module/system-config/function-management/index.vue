<template>
  <div class="container">
    <div class="center_l">
      
    </div>
    <div class="center_r">
      <div class="center_r_top">
        <el-button type="primary" style="margin: 0 20px 20px;">一键同步权限</el-button>
        已选：经营管理中心/广东校区/茂名分校/医学1战队/战队长 、 经营管理中心/广东校区/茂名分校/医学2战队/战队长
      </div>
      <div class="center_r_bottom">
        <el-radio-group v-model="radio" size="medium">
          <el-radio-button label="销售" ></el-radio-button>
          <el-radio-button label="财务"></el-radio-button>
          <el-radio-button label="教学"></el-radio-button>
          <el-radio-button label="系统"></el-radio-button>
          <el-radio-button label="OA"></el-radio-button>
          <el-radio-button label="加盟"></el-radio-button>
          <el-radio-button label="CMS"></el-radio-button>
          <el-radio-button label="电商"></el-radio-button>
          <el-radio-button label="学历"></el-radio-button>            
        </el-radio-group>

        <el-table :data="tableData" border style="margin-top:20px;width: 100%">
          <el-table-column label="URL菜单权限" width="200">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="复选框 A"></el-checkbox>
            </el-checkbox-group>
          </el-table-column>
          <el-table-column prop="name" label="操作按钮权限" >
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
  data () {
    return {
      radio: '财务',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
      }, {
        date: '2016-05-04',
        name: '王小虎',
      }, {
        date: '2016-05-01',
        name: '王小虎',
      }, {
        date: '2016-05-03',
        name: '王小虎',
      }],
      checkList: ['复选框 A'],
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
}
</script>

<style lang='less' scoped>
.container {
  display: flex;
  .center_l {
    width: 30%;
    // height: 300px;
    background-color: pink;
  }
  .center_r {
    width: 100%;
    margin-left: 10px;
    .center_r_bottom {
      height: 600px;
      padding: 20px;
      // background-color: pink;
      border: 1px solid #ccc;
    }
  }
}
</style>