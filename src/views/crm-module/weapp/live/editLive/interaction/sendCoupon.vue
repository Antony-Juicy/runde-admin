<template>
  <div class="send-coupon">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="130px"
      class="demo-ruleForm"
    >
      <el-form-item label="选择优惠券" prop="coupon">
        <el-select v-model="ruleForm.coupon" placeholder="请选择优惠券" size="small" @change="selectChange">
          <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in couponList"></el-option>
        </el-select>
        <div class="details" v-show="currentCoupon.createTime">
            <p>创建时间：{{currentCoupon.createTime}}</p>
            <p>优惠券类型：{{currentCoupon.type}}</p>
            <p>面额：{{currentCoupon.money}}</p>
            <p>使用条件：{{currentCoupon.condition}}</p>
        </div>
      </el-form-item>
      <el-form-item label="派发数量" prop="name">
        <el-input-number v-model="ruleForm.name" size="small"></el-input-number>
      </el-form-item>
      <el-form-item label="预定派发时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.date1"
              style="width: 100%"
              size="small"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="1">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker
              placeholder="选择时间"
              v-model="ruleForm.date2"
              style="width: 100%"
              size="small"
            ></el-time-picker>
          </el-form-item>
        </el-col>
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
          name: '',
          coupon: '',
          date1: '',
          date2: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          ],
          coupon: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ]
        },
        couponList:[
            {
                id:1,
                name:'优惠券一',
                createTime: '2020.12.12 15:30',
                type:'立减优惠券/折扣优惠券',
                money:'5元/7.5折',
                condition:'满100元'
            },
            {
                id:2,
                name:'优惠券二',
                createTime: '2020.12.12 15:30',
                type:'折扣优惠券',
                money:'5元/7.5折',
                condition:'满200元'
            },
            {
                id:3,
                name:'优惠券三',
                createTime: '2021.12.12 15:30',
                type:'立减优惠券/折扣优惠券',
                money:'5元/7.5折',
                condition:'满300元'
            }
        ],
        currentCoupon: {}
    };
  },
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
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
          this.currentCoupon = this.couponList.find(item => val == item.id)
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
