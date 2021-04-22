<template>
  <div class="goods-list">
      <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
      <!-- <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd"
          >添加</el-button
        >
      </div> -->
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig.sync="pageConfig"
        :show-header="false"
        :border="false"
        @pageChange="pageChange"
        :emptyText="emptyText"
      >
        <template slot="content" slot-scope="scope">
          <div class="content">
            <div class="content-left">
              <div class="title-container">
                <div class="title">2021高端协议班（面授）</div>
                <div><el-tag>面授班</el-tag></div>
              </div>
              <div class="details">执业药师    |    中药    |    协议班   |    退费    |    2021学年</div>
              <div class="content-bottom">
                <div><i class="el-icon-location-outline" style="color:#409eff;font-size: 16px"></i>汕头（广东校区）</div>
                <div class="price">￥999.00</div>
                <div>服务年限2年</div>
              </div>
            </div>
            <div class="content-right">
              <div class="price">￥999.00</div>
              <div><el-button type="primary" size="small" @click="signUp(scope.row)">报名</el-button></div>
            </div>
          </div>
        </template>
      </rd-table>
    </div>
    
    <!-- 报名弹窗 -->
    <full-dialog
        v-model="addVisible"
        :title="'报名信息'"
        @change="addVisible = false"
      >
          <el-card shadow="never" class="card-container">
            <div class="card-title">学员信息</div>
            <el-form ref="stuForm" :model="stuForm" label-width="100px" size="small">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="查询学员信息">
                    <el-input v-model="stuForm.name" style="width: 200px" placeholder="请输入学员身份证"></el-input>
                    <el-button type="primary">查询</el-button>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="学员姓名">
                    <el-input v-model="stuForm.name" style="width: 200px" placeholder="请输入学员姓名"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="学员类型">
                    <el-select v-model="stuForm.name" style="width: 200px" placeholder="请选择学员类型"></el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="来源类型">
                    <el-input v-model="stuForm.name" style="width: 200px" placeholder="请选择来源类型"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="来源名称">
                    <el-input v-model="stuForm.name" style="width: 200px" placeholder="请输入来源名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="学历">
                    <el-select v-model="stuForm.name" style="width: 200px" placeholder="请选择学历"></el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="身份证">
                    <el-input v-model="stuForm.name" style="width: 200px" placeholder="请输入身份证"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="学年">
                    <el-select v-model="stuForm.name" style="width: 200px" placeholder="请选择学年"></el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-card>

          <el-card shadow="never" class="card-container">
            <div class="card-title">课程列表</div>
            <el-form ref="stuForm" :model="stuForm" label-width="100px" size="small">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="校区">
                    <el-select v-model="stuForm.name" style="width: 200px" placeholder="请选择校区"></el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="班次">
                    <el-select v-model="stuForm.name" style="width: 200px" placeholder="请选择班次"></el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="课程">
                    <el-radio-group v-model="radio">
                      <el-radio :label="3">中药一</el-radio>
                      <el-radio :label="6">中药二</el-radio>
                      <el-radio :label="9">中药综合</el-radio>
                      <el-radio :label="10">中药法规</el-radio>
                    </el-radio-group>
                </el-form-item>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="优惠券">
                    <el-input v-model="stuForm.name" style="width: 200px" placeholder="请选择优惠券"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="优惠金额">
                    <el-select v-model="stuForm.name" style="width: 200px" placeholder="请选择优惠金额"></el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="应收">
                    <el-input v-model="stuForm.name" style="width: 200px" placeholder="请选择课程信息"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-card>

          <el-card shadow="never" class="card-container">
            <div class="card-title">服务信息</div>
            <el-form ref="stuForm" :model="stuForm" label-width="100px" size="small">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="招生老师">
                    <el-select v-model="stuForm.name" style="width: 200px" placeholder="请选择招生老师"></el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="班主任">
                    <el-select v-model="stuForm.name" style="width: 200px" placeholder="请选择班主任"></el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="代理人">
                    <el-select v-model="stuForm.name" style="width: 200px" placeholder="请选择代理人"></el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="市场老师">
                    <el-select v-model="stuForm.name" style="width: 200px" placeholder="请选择市场老师"></el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="教务老师">
                    <el-select v-model="stuForm.name" style="width: 200px" placeholder="请选择教务老师"></el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-card>

          <el-card shadow="never" class="card-container">
            <div class="card-title">其他</div>
            <el-form ref="stuForm" :model="stuForm" label-width="100px" size="small">
              <el-row>
                  <el-form-item label="备注">
                    <el-input type="textarea" rows="3" v-model="stuForm.name" placeholder="请输入备注内容"></el-input>
                  </el-form-item>
              </el-row>
            </el-form>
          </el-card>

          <div class="btn-wrapper" style="text-align:right">
            <el-button type="primary">提交</el-button>
          </div>

      </full-dialog>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
export default {
  name:"goods-list",
  data(){
    return {
      addVisible: false,
      formOptions: [
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "状态",
          options: []
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "年份",
          options: []
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "校区",
          options: []
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "项目",
          options: []
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "科目",
          options: []
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "班型",
          options: []
        },
         {
          prop: "menuName",
          element: "el-select",
          placeholder: "班型类型",
          options: []
        },
      ],
      searchForm:{},
      emptyText:"暂无数据",
      tableData: [{},{},{},{},{},{},{},{}],
      tableKey:[
        {
          name: "内容",
          value: "content",
          operate: true,
        }
      ],
       pageConfig: {
        totalCount: 10,
        currentPage: 1,
        pageSize: 10,
      },
      editId:"",
      visible: true,
      stuForm: {
        name:""
      }
    }
  },
  components:{
    RdForm
  },
   methods: {
     onSearch(val){
       this.searchForm = {
        ...val
      };
      console.log(val,this.searchForm , 'val---')
      this.getTableData();
     },
     getTableData(){

     },
     pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    handleAdd(){
      this.addStatus = true;
      this.addVisible = true;
    },
    submitAddForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
        }
          
      });
    },
    handleEdit(data){
      this.addStatus = false;
      this.addVisible = true;
      this.addFormOptions.forEach(item => {
           item.initValue = data[item.prop];
      })
      setTimeout(() => {
        this.$refs.dataForm3.addInitValue();
      }, 0);
      this.editId = data.id;
    },
    signUp(data){
      this.addVisible = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-list {
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border-bottom: 1px solid #dcdfe6;
    .content-left {
      .title-container {
        display: flex;
        align-items: center;
        .title {
            font-size: 18px;
            color: #333333;
            font-weight: bold;
        }
      }
      .details {
        line-height: 44px;
      }
      .content-bottom {
        display: flex;
        .price {
          color: red;
          font-weight: bold;
          margin: 0 14px;
          font-size: 14px;
        }
      }
    }
    .content-right {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      .price {
        color: red;
          font-weight: bold;
          font-size: 24px;
          margin-bottom: 8px;
      }
    }
  }
  
  .card-container {
    margin-bottom: 20px;
    .card-title {
      font-size: 17px;
      font-weight: 600;
      color: #333333;
      line-height: 45px;
    }
  }
}
</style>
