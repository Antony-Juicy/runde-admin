<template>
  <div class="send-coupon">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="130px"
      class="demo-ruleForm"
    >
      <el-form-item label="选择优惠券" prop="couponId">
        <el-select v-model="ruleForm.couponId" placeholder="请选择优惠券" size="small" @change="selectChange">
          <el-option :label="item.couponName" :value="item.couponId" :key="item.couponId" v-for="item in couponList"></el-option>
        </el-select>
        <div class="details" v-show="currentCoupon.couponType">
            <p>创建时间：{{currentCoupon.createAt}}</p>
            <p>优惠券类型：{{currentCoupon.couponType | typeFilter}}</p>
            <p>面额：{{currentCoupon.denomination}}</p>
            <!-- <p>使用条件：{{currentCoupon.condition}}</p> -->
        </div>
      </el-form-item>
      <el-form-item label="派发数量" prop="distributeCount">
        <el-input-number v-model="ruleForm.distributeCount" size="small" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="预定派发时间" prop="distributeDate">
        <el-date-picker
            v-model="ruleForm.distributeDate"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
      </el-form-item>
      <el-form-item>
        <div style="text-align: right">
            <el-button @click="resetForm('ruleForm')" size="small">取消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')" size="small"
            >发送优惠券</el-button
            >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "send-coupon",
  data() {
    return {
         ruleForm: {
          distributeCount: '',
          couponId: '',
          distributeDate:''
        },
        rules: {
          couponId: [
            { required: true, message: '请选择优惠券', trigger: 'blur' },
          ],
          distributeCount: [
            { required: true, message: '请输入派发数量', trigger: 'blur' }
          ],
          distributeDate: [
            { required: true, message: '请选择日期', trigger: 'blur' }
          ]
        },
        couponList:[
        ],
        currentCoupon: {}
    };
  },
  props: {
    liveId: {
      type: Number,
    },
  },
  filters: {
    typeFilter(val){
      switch(val){
        case "InstantDecrease":
          return '立减优惠';
        case "FullDiscount":
          return '满减券';
        case "Discount":
          return '折扣优惠'
      }
    },
  },
  mounted(){
    this.$fetch("live_get_coupon_list",{
      liveId: this.liveId
    }).then(res => {
      this.couponList = res.data;
    })
  },
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm,'submit')
            this.$fetch("live_coupon_add",{
              ...this.ruleForm,
              distributeDate: this.$common._formatDates2(this.ruleForm.distributeDate),
              liveId: this.liveId
            }).then(res => {
              this.$message.success('操作成功')
               this.$emit('close')
               this.$emit('refresh')
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$emit('close')
      },
      selectChange(val){
          console.log(val,'valll')
          this.currentCoupon = this.couponList.find(item => val == item.couponId)

      }
  },
};
</script>

<style lang="scss" scoped>
.send-coupon {
    .details {
        p {
            line-height: 20px;
                margin-bottom: 5px;
        }
    }
    /deep/ {
        .el-form-item {
            margin-bottom: 15px;
        }
    }
}
</style>
