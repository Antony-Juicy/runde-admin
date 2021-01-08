<template>
  <div class="goodscoupon-container">
    <search-form :formOptions="formOptions" :showNum="7" @onSearch="onSearch"></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd">添加优惠券</el-button>
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :multiple="true"
        :pageConfig="pageConfig"
        @select="handleSelect"
        @pageChange="pageChange">
      </rd-table>
      <rd-dialog
        :title="couponStatus ? '添加优惠券' : '编辑优惠券'"
        :dialogVisible="couponVisible"
        :width="widthNew"
        @handleClose="closeCoupon('dataForm')"
        @submitForm="submitForm('dataForm')">
        <el-form ref="dataForm" :model="couponForm" label-width="100px">
          <el-form-item label="优惠券类型" prop="couponType">
            <el-select v-model="couponForm.couponType" placeholder="请选择/立减优惠/折扣优惠/满减优惠">
              <el-option label="立减优惠" value="1"></el-option>
              <el-option label="折扣优惠" value="2"></el-option>
              <el-option label="满减优惠" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="优惠券名称" prop="couponName">
            <el-input v-model.trim="couponForm.couponName" autocomplete="off" placeholder="请输入优惠券名称" />
          </el-form-item>
          <el-form-item label="面额" prop="couponMz">
            <el-input v-model.trim="couponForm.couponMz" autocomplete="off" placeholder="请输入面额" />
          </el-form-item>
          <el-form-item label="使用条件" prop="condition" v-if="couponForm.couponType == 1">
            <el-input v-model.trim="couponForm.condition" autocomplete="off" placeholder="" style="width:49%;">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="使用条件" prop="condition" v-if="couponForm.couponType == 2">
            <el-input v-model.trim="couponForm.condition" autocomplete="off" placeholder="" style="width:49%;">
              <template slot="append">折</template>
            </el-input>
          </el-form-item>
          <el-form-item label="使用条件" prop="condition" v-if="couponForm.couponType == 3">
            <el-input v-model.trim="couponForm.condition" autocomplete="off" placeholder="" style="width:49%;">
              <template slot="prepend">满</template>
              <template slot="append">元</template>
            </el-input>
            <el-input v-model.trim="couponForm.condition" autocomplete="off" placeholder="" style="width:50%;">
              <template slot="prepend">减</template>
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="状态" prop="couponType">
            <el-select v-model="couponForm.couponsxjStatus" placeholder="请选择/上架/下架">
              <el-option label="上架" value="0"></el-option>
              <el-option label="下架" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </rd-dialog>
    </div>
  </div>
</template>

<script>

export default {
  name:"goods-coupon",
  data(){
    return {
      showNum: 6,
      searchForm: {},
      formOptions: [
        { prop: 'couponName', element: 'el-input', placeholder: '请输入优惠券名称' },
        { prop: 'couponType', element: 'el-select', placeholder: '请输入优惠券类型' },
        { prop: 'status', element: 'el-select', placeholder: '请选择状态' }
      ],
      tableData: [],
      tableKey: [
        { name: '优惠券名称',value: 'couponName' },
        { name: '面值',value: 'couponmz' },
        { name: '优惠券类型',value: 'couponType' },
        { name: '状态',value: 'status' },
        { name: '操作',value: 'edit',operate: true,width: 120 }
      ],
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,
      
      // 弹窗
      widthNew: "600px",
      couponVisible: false,
      couponStatus: true,
      couponForm: {
        couponType: '',
        couponName: '',
        couponMz: '',
        condition: '',
        couponsxjStatus: ''
      },
    }
  },
  methods: {
    onSearch(val) {
      this.searchForm = {...val};
      console.log(val,this.searchForm , 'val---')
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    pageChange(val) {
      console.log(val,'pagechange')
    },
    
    // 弹窗
    handleAdd() {
      console.log(9999)
      this.couponVisible = true;
    },
    closeCoupon(formName) {
      this.couponVisible = false;
      // this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      console.log(this.couponForm, 666);
      this.closeCoupon("dataForm")
    }
  }
}
</script>

<style lang="scss" scoped>
.goodscoupon-container {

}
</style>
