<template>
  <div class="goods-list">
      <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
      ref="dataForm"
    ></search-form>
    <div class="clearfix">
      <div class="content-container" v-for="(item,index) in tableData" :key="index" :style="{float: index%2 == 0 ?'left':'right'}">
        <div class="class-item">
            <div class="content-left">
              <div class="title-container">
                <div class="title">{{item.className}}</div>
                <div><el-tag>{{item.classType}}</el-tag></div>
              </div>
              <div class="details">
                <el-tag type="info" size="small" style="margin-right:10px;color: #63656b;">执业药师</el-tag>
                <el-tag type="info" size="small" style="margin-right:10px;color: #63656b;">中药</el-tag>
                <el-tag type="info" size="small" style="margin-right:10px;color: #63656b;">执业药师</el-tag>
                <el-tag type="info" size="small" style="margin-right:10px;color: #63656b;">中药</el-tag>
              </div>
              <div class="content-bottom">
                <div class="year-text">服务年限{{item.serviceYear}}年</div>
              </div>
            </div>
            <div class="content-right">
              <div class="price"><span style="font-size:16px">￥</span>999.00</div>
              <div><el-button type="primary" size="small" @click="signUp(item)">报名</el-button></div>
            </div>
          </div>
        </div>
        <div class="fr" style="margin-bottom:20px">
          <el-pagination
            background
            @size-change="sizeChange"
            @current-change="pageChange"
            :current-page="pageConfig.currentPage"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="pageConfig.showCount"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageConfig.totalCount">
          </el-pagination>
        </div>
    </div>
    
    <!-- 报名弹窗 -->
    <full-dialog
        v-model="addVisible"
        :title="'报名信息'"
        hideTitle
        @change="addVisible = false"
      >
          <el-card shadow="never" class="card-container">
            <div class="card-title">学员信息</div>
            <el-form ref="stuForm" :model="stuForm" label-width="100px" size="small">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="查询学员信息">
                    <el-input v-model="stuForm.name" style="width: 280px;margin-right:10px;" placeholder="请输入学员身份证或手机号"></el-input>
                    <el-button type="primary">查询</el-button>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="8">
                  <el-form-item label="学员姓名">
                    <el-input v-model="stuForm.name" style="width: 200px" placeholder="请输入学员姓名"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="学员类型">
                    <el-select v-model="stuForm.name" style="width: 200px" placeholder="请选择学员类型"></el-select>
                  </el-form-item>
                </el-col> -->
              </el-row>
               <el-row>
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
                <el-col :span="8">
                  <el-form-item label="学年">
                    <el-select v-model="stuForm.name" style="width: 200px" placeholder="请选择学年"></el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="来源类型">
                    <el-select v-model="stuForm.name" style="width: 200px" placeholder="请选择来源类型"></el-select>
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
                  <el-form-item label="手机号">
                    <el-input v-model="stuForm.name" style="width: 200px" placeholder="请输入手机号"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="报考省份">
                    <el-select v-model="stuForm.name" style="width: 200px" placeholder="请选择报考省份"></el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                 <el-col :span="8">
                  <el-form-item label="省">
                    <el-select v-model="stuForm.name" style="width: 200px" placeholder="请选择省份"></el-select>
                  </el-form-item>
                </el-col>
                 <el-col :span="8">
                  <el-form-item label="市">
                    <el-select v-model="stuForm.name" style="width: 200px" placeholder="请选择市"></el-select>
                  </el-form-item>
                </el-col>
                 <el-col :span="8">
                  <el-form-item label="区/县">
                    <el-select v-model="stuForm.name" style="width: 200px" placeholder="请选择区/县"></el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="收件地址">
                    <span style="margin-right:6px;">xx省</span><span style="margin-right:6px;">xx市</span><span style="margin-right:6px;">xx区</span>
                    <el-input v-model="stuForm.name" style="width: 500px" placeholder="请输入收件地址（省市区数据请勿重复填写，否则无法正常邮寄）"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <p style="color: rgba(163, 0, 20, 0.96);font-size:14px;margin-top: 0;margin-left: 32px;">*省市区数据请勿重复填写，否则无法正常邮寄</p>
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
import Pagination from "@/components/Pagination";
import { scrollTo } from '@/utils/scroll-to';
export default {
  name:"goods-list",
  data(){
    return {
      addVisible: false,
      formOptions: [
        {
          prop: "status",
          element: "el-select",
          placeholder: "状态",
          options: []
        },
        {
          prop: "classBatch",
          element: "el-select",
          placeholder: "年份",
          options: []
        },
        {
          prop: "productId",
          element: "el-select",
          placeholder: "项目",
          options: [],
          events:{}
        },
        {
          prop: "subjectId",
          element: "el-select",
          placeholder: "科目",
          options: [],
          events:{}
        },
        {
          prop: "classTypeId",
          element: "el-select",
          placeholder: "班型",
          options: []
        },
         {
          prop: "classType",
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
        showCount: 10,
      },
      editId:"",
      visible: true,
      stuForm: {
        name:""
      },
      radio:""
    }
  },
  components:{
    RdForm,
    Pagination
  },
  mounted(){
    this.getTableData();
    this.getSelectList();
  },
   methods: {
     getSelectList(){
       this.$fetch("courseclass_classOrderlistJsonSearch").then(res => {
         const { classTypeList,productList,recentlyYear,statusList } = res.data;
         this.formOptions[0].options = statusList.map(item => ({
           label: item.value,
           value: item.key
         }));
         this.formOptions[1].options = recentlyYear.map(item => ({
           label: item,
           value: item
         }))
         this.formOptions[2].options = productList.map(item => ({
           label: item.productName,
           value: item.id
         }))
         this.formOptions[2].events = {
           change: this.productChange
         }
          this.formOptions[3].events = {
           change: this.subjectChange
         }
         this.formOptions[5].options = classTypeList.map(item => ({
           label: item.value,
           value: item.key
         }))
       })
     },
     onSearch(val){
       this.searchForm = {
        ...val
      };
      console.log(val,this.searchForm , 'val---')
      this.getTableData();
     },
     getTableData(params = {}) {
      this.$fetch("courseclass_classOrderlistJson", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
        token: "eyJhbGciOiJIUzI1NiIsIlR5cGUiOiJKd3QiLCJ0eXAiOiJKV1QifQ.eyJsb2dpblVzZXJJZCI6IjgiLCJwYXJ0bmVySWQiOjEsInR5cGUiOjAsImV4cCI6MTYwNzM5MDM4NCwidXNlcm5hbWUiOiJhZG1pbjAxIn0.GikWXxIa8BYLGvV12Yf2WBCywDnKpUDylKReR3TRuP8"
      }).then((res) => {
        this.tableData = res.data.list.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          return item;
        });
        this.pageConfig.totalCount = res.data.pager.totalRows;
      })
    },
    productChange(val){
      this.$fetch("courseclasstype_subjectList",{
        productId: val
      }).then(res => {
        let subjectArr = res.data.list.map(item => ({
          label: item.subjectName,
          value: item.id
        }));
        this.formOptions[3].options = subjectArr;
        this.formOptions[4].options = [];
        this.$refs.dataForm.setValue({
          subjectId: ""
        })
      })
    },
    subjectChange(val){
      this.$fetch("courseclasstype_classtypeList",{
        subjectId: val
      }).then(res => {
        if(!res.data.dataJson.list){
          return;
        }
        let classTypeArr = res.data.dataJson.list.map(item => ({
          label: item.className,
          value: item.id
        }));
        console.log(classTypeArr);
        this.formOptions[4].options = classTypeArr;
        this.$refs.dataForm.setValue({
          classTypeId: ""
        })
      })
    },
     pageChange(val) {
      this.pageConfig.currentPage = val;
      this.getTableData();
      scrollTo(0, 800);
    },
    sizeChange(val) {
      this.pageConfig.showCount = val;
      this.getTableData();
      scrollTo(0, 800);
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
  .content-container {
    
    padding: 5px;
    width: 49%;
    background-color: #fff;
    display: inline-block;
    margin-bottom: 24px;
    .class-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px;
      align-items: flex-end;
    }
    .content-left {
      .title-container {
        display: flex;
        align-items: center;
        .title {
            font-size: 22px;
            color: #333333;
            font-weight: bold;
            margin-right: 6px;
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
        .year-text {
          font-size: 14px;
          color: #333;
          margin-top: 16px;
        }
      }
    }
    .content-right {
      display: flex;
      .price {
        color: #EC5B56;
          font-weight: bold;
          font-size: 32px;
          margin-bottom: 8px;
          margin-right: 20px;
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
