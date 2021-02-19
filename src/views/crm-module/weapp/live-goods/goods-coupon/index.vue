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
        :pageConfig.sync="pageConfig"
        @select="handleSelect"
        @pageChange="pageChange">
        <template slot="couponType" slot-scope="scope">
          <span>{{ scope.row.couponType | couponTypeFilter }}</span>
        </template>
        <template slot="couponStatus" slot-scope="scope">
          <span>{{ scope.row.couponStatus | couponStatusFilter }}</span>
        </template>
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleDelete(scope.row)" type="text" size="small" style="color: #ec5b56">删除</el-button>
        </template>
      </rd-table>
      <rd-dialog
        :title="couponStatusVisible ? '添加优惠券' : '编辑优惠券'"
        :dialogVisible="couponVisible"
        :width="widthNew"
        @handleClose="closeCoupon('dataForm')"
        @submitForm="submitForm('dataForm')">
        <el-form ref="dataForm" :model="couponForm" :rules="rules" label-width="100px">
          <el-form-item label="优惠券名称" prop="couponName">
            <el-input v-model.trim="couponForm.couponName" autocomplete="off" placeholder="请输入优惠券名称" />
          </el-form-item>
          <el-form-item label="优惠券类型" prop="couponType">
            <el-select v-model="couponForm.couponType" :disabled="couponStatusVisible ? false : true" placeholder="请选择/立减优惠/折扣优惠/满减优惠">
              <el-option label="立减优惠" value="InstantDecrease"></el-option>
              <el-option label="折扣优惠" value="Discount"></el-option>
              <el-option label="满减优惠" value="FullDiscount"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="立减面额" prop="minus" v-if="couponForm.couponType == 'InstantDecrease' ">
            <el-input v-model.trim="couponForm.minus" type="number" autocomplete="off" placeholder="请输入">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="折扣面额" prop="discount" v-if="couponForm.couponType == 'Discount' ">
            <el-input-number v-model.trim="couponForm.discount" controls-position="right" type="number" autocomplete="off" :max="10" :min="0" placeholder="请输入">
            </el-input-number>
            <span class="number-title">折</span>
          </el-form-item>
          <el-row :gutter="24">
            <el-col :span="14">
              <el-form-item label="满减面额" prop="condition" v-if="couponForm.couponType == 'FullDiscount' ">
                <el-input v-model.trim="couponForm.condition" autocomplete="off" placeholder="">
                  <template slot="prepend">满</template>
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="" prop="denomination" v-if="couponForm.couponType == 'FullDiscount' " label-width="1px">
                <el-input v-model.trim="couponForm.denomination" autocomplete="off" placeholder="">
                  <template slot="prepend">减</template>
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="状态" prop="couponStatus">
            <el-select v-model="couponForm.couponStatus" placeholder="请选择/上架/下架">
              <el-option label="上架" value="Open"></el-option>
              <el-option label="下架" value="Close"></el-option>
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
        { 
          prop: 'couponType',
          element: 'el-select',
          placeholder: '请输入优惠券类型',
          options: [
            {
              label: "立减优惠",
              value: "InstantDecrease",
            },
            {
              label: "折扣优惠",
              value: "Discount",
            },
            {
              label: "满减优惠",
              value: "FullDiscount"
            }
          ],
        },
        { 
          prop: 'couponStatus',
          element: 'el-select',
          placeholder: '请选择状态',
          options: [
            {
              label: "上架",
              value: "Open",
            },
            {
              label: "下架",
              value: "Close",
            },
          ],
        }
      ],
      tableData: [
        {
          couponName: "测试优惠券",
          couponType: "立减优惠",
          denomination: "5元",
          couponStatus: "上架"
        }
      ],
      tableKey: [
        { name: '优惠券名称',value: 'couponName' },
        { name: '优惠券类型',value: 'couponType',operate: true },
        { name: '面值',value: 'denomination' },
        { name: '状态',value: 'couponStatus',operate: true },
        { name: '操作',value: 'edit',operate: true,width: 120 }
      ],
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      currentPageInfo: null,
      loading: false,
      
      // 弹窗
      widthNew: "600px",
      couponVisible: false,
      couponStatusVisible: true,
      couponForm: {
        couponName: '',
        couponType: '',
        denomination: '',
        condition: 0,
        couponStatus: '',
        discount:'',
        minus:''
      },
      rules: {
        couponName: [
          { required: true, message: "请输入优惠券名称", trigger: "blur" },
          {  max: 25, message: '长度不多于25个字符', trigger: 'blur' }
        ],
        couponType: [
          { required: true, message: "请选择优惠券类型", trigger: "blur" }
        ],
        denomination: [
          { required: true, message: "请输入面额", trigger: "blur" },
        ],discount: [
          { required: true, message: "请输入面额", trigger: "blur" },
        ],minus: [
          { required: true, message: "请输入面额", trigger: "blur" },
        ],
        condition: [
          { required: true, message: "请输入减免金额", trigger: "blur" },
        ],
        couponStatus: [
          { required: true, message: "请选择状态", trigger: "blur" }
        ]
      }
    }
  },
  mounted () {
    this.getTableData();
  },
  methods: {
    onSearch(val) {
      this.searchForm = {...val};
      this.pageConfig.pageNum = 1;
      this.getTableData();
      console.log(val,this.searchForm , 'val---')
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    getTableData(params) {
      const loading = this.$loading({
        lock: true,
        target: ".el-table",
      });
      this.$fetch(
        "coupon_list",
        params || {
          loginUserId: this.$common.getUserId(),
          ...this.pageConfig,
          ...this.searchForm
        }
      ).then((res) => {
        this.tableData = res.data.records;
        this.pageConfig.totalCount = res.data.totalCount;
        setTimeout(() => {
          loading.close();
        }, 200);
      });
    },
    pageChange(val) {
      console.log(val,'pagechange')
      // this.currentPageInfo = val;
      this.pageConfig.pageNum = val.page;
      this.pageConfig.pageSize = val.limit;
      loginUserId: this.$common.getUserId()
      this.getTableData();
    },
    
    // 新增
    handleAdd() {
      console.log(9999)
      this.couponVisible = true;
      this.couponStatusVisible = true;
      // for (const key in this.couponForm) {
      //   this.couponForm[key] = "";
      // }
    },
    // 编辑
    handleEdit(row) {
      this.couponVisible = true;
      this.couponStatusVisible = false;
      console.log(row,996)
      this.$fetch(
        "coupon_getList",
        {
          loginUserId: this.$common.getUserId(),
          couponId: row.couponId
        }
      ).then((res) => {
        console.log(res, 998877665544332211)
        this.couponForm = res.data
      });
    },
    // 删除
    handleDelete(row) {
      let info = row.couponName;
      this.$confirm(`此操作将删除${info}优惠券, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$fetch("coupon_delete", {
            couponId: row.couponId,
            loginUserId: this.$common.getUserId(),
          }).then((res) => {
            if (res) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              setTimeout(() => {
                this.getTableData();
              }, 50);
            }
          });
        })
        .catch(() => {});
    },
    closeCoupon(formName) {
      this.couponVisible = false;
      this.$refs[formName].resetFields();
      this.couponForm.denomination = '';
      this.couponForm.condition = 0;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          console.log(this.couponForm,'this.couponForm',Number(this.couponForm.condition),Number(this.couponForm.denomination),
          this.$common.isNumber((this.couponForm.condition)),
          this.$common.isNumber((this.couponForm.denomination)))
          if(this.couponForm.couponType == 'FullDiscount'){
             if(!this.$common.isNumber((this.couponForm.condition))){
              this.$message.error("请输入正确的满减金额")
              return
            }
            if(!this.$common.isNumber((this.couponForm.denomination))){
              this.$message.error("请输入正确的满减金额")
              return
            }
            if( Number(this.couponForm.condition) < Number(this.couponForm.denomination)){
              this.$message.error("减去金额不能多于满足金额")
              return
            }
          }else if(this.couponForm.couponType == 'InstantDecrease'){
            this.couponForm.denomination = this.couponForm.minus;
          }else if(this.couponForm.couponType == 'Discount'){
            this.couponForm.denomination = this.couponForm.discount;
          }
         
          if(this.couponStatusVisible) {
            // 新增
            this.$fetch("coupon_add", {
              ...this.couponForm,
              loginUserId: this.$common.getUserId()
            }).then((res) => {
              this.$message({
                message: "提交成功",
                type: "success",
              });
              this.getTableData();
              this.closeCoupon("dataForm");
            });
          } else {
            // 编辑
            this.$fetch("coupon_update", {
              ...this.couponForm,
              loginUserId: this.$common.getUserId()
            }).then((res) => {
              this.$message({
                message: "编辑成功",
                type: "success",
              });
              this.getTableData();
              this.closeCoupon("dataForm");
            });
          }
        }
      });
    }
  },
  filters: {
    couponTypeFilter(status){
      switch(status){
        case "InstantDecrease":
          return '立减优惠';
        case "Discount":
          return '折扣优惠';
        case "FullDiscount":
          return '满减优惠';
        default:
          return '';
      }
    },
    couponStatusFilter(status){
      switch(status){
        case "Open":
          return '上架';
        case "Close":
          return '下架';
        default:
          return '';
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.goodscoupon-container {

}
</style>
