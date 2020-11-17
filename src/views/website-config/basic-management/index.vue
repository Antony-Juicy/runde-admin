<template>
    <div>
        <el-form :inline="true" :model="setParams" class="demo-form-inline">
            <el-form-item label="倒计时设置">
                <el-select v-model="setParams.productName" @change="getProductTime" placeholder="科目" >
                    <el-option :label="item.name" :value="item.name" v-for="(item,itemI) in productList" :key="itemI"></el-option>
                </el-select>
            </el-form-item>
                <el-date-picker
                v-model="setParams.examTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
                </el-date-picker>
            <el-form-item >
                <el-button  class="m_l20" type="primary" @click="onSubmit">保存修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        setParams: {
            productName: '',
            examTime: ''
        },
        productList: [
            {name: '执业药师'},{name: '健康管理师'},{name: '护(士)师资格'},{name: '执业医师'},{name: '学历提升'},{name: '确有专长'},{name: '职称药师'},
            {name: '药店大学'},{name: '小儿推拿'}
        ]
      }
    },
    mounted() {
    },
    methods: {
        onSubmit() {
            if(this.setParams.productName && this.setParams.examTime) {
                this.$store.dispatch('website-config/setExaminationTime', this.setParams)
                this.$message({
                    message: '倒计时设置修改已生效',
                    type: 'success'
                });
            }else {
                this.$message({
                    message: '请输入全部必填项再保存',
                    type: 'warning'
                });
            }
            
        },
        async getProductTime(str) {
            let getAllConfig = await this.$store.dispatch('website-config/getExaminationTimeAll', {productName: str})
            this.setParams = {
                productName: str,
                examTime: getAllConfig.data.examTime
            }
        }
    }
  }
</script>
<style lang="scss">
.m_l20 {
    margin-left: 15px;
}
</style>