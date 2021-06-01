<template>
  <div class="seckill">
      <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd"
          >添加</el-button
        >
        <!-- <el-button type="primary" size="small" @click="handleCode"
          >活动编码</el-button
        >
        <el-button type="primary" size="small" @click="handleGoodsName"
          >商品名称</el-button
        > -->
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig.sync="pageConfig"
        @pageChange="pageChange"
        :emptyText="emptyText"
      >
        <template slot="url" slot-scope="scope">
          <div class="link-wrapper">
            <p>活动链接:{{scope.row.url}}</p>
            <p>活动编码:<el-button type="text" @click="handleCode(scope.row)">{{scope.row.code}}</el-button></p>
            <p>商品名称:<el-button type="text" @click="handleGoodsName(scope.row)">{{scope.row.goodsName}}</el-button></p>
            <p>商品标题:{{scope.row.goodsTitle}}</p>
            <p>项目名称:{{scope.row.productName}}</p>
            <p>商品售价:{{scope.row.salePrice}}</p>
            <p>红包优惠金额:{{scope.row.redPackageMoney}}</p>
            <p>分享优惠金额:{{scope.row.shareDiscountMoney}}</p>
            <p>限时秒杀时间(秒):{{scope.row.killTime}}</p>
            <p>科目标签:{{scope.row.subjectLabel}}</p>
            <p>评论标签:{{scope.row.evaluationLabel}}</p>
            <p>状态:{{scope.row.status}}</p>
            <p>是否隐藏:{{scope.row.hideStatus?"隐藏":"不隐藏"}}</p>
            <p>是否推送给考药狮:{{scope.row.pushStatus?"不推送":"推送"}}</p>
          </div>
        </template>
        <template slot="picUrlOne" slot-scope="scope">
          <el-image 
            v-for="(item,index) in scope.row.picUrlOne"
             :key="index"
            style="width: 100px; height: 100px"
            :src="item.url"
            fit="cover"></el-image>
        </template>
        <template slot="picUrlTwo" slot-scope="scope">
          <el-image 
          v-if="scope.row.picUrlTwo"
          style="width: 100px; height: 100px"
            :src="scope.row.picUrlTwo"
            fit="cover"></el-image>
        </template>
        <template slot="picUrlThree" slot-scope="scope">
          <el-image 
          v-if="scope.row.picUrlThree"
          style="width: 100px; height: 100px"
            :src="scope.row.picUrlThree"
            fit="cover"></el-image>
        </template>
        <template slot="time" slot-scope="scope">
             <div style="line-height:10px">
               <p>开始时间：{{scope.row.startTime}}</p>
               <p>结束时间：{{scope.row.endTime}}</p>
             </div>
        </template>
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <!-- <el-divider direction="vertical"></el-divider>
          <el-button @click="handleDetail(scope.row)" type="text" size="small" style="color: #ffa500"
            >查看评论详情</el-button
          > -->
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click="handleDelete(scope.row)"
            type="text"
            size="small"
            style="color: #ec5b56"
            >删除</el-button
          >
        </template>
      </rd-table>
    </div>
    
    <!-- 添加 -->
    <full-dialog
        v-model="addVisible"
        :title="addStatus?'添加':'编辑'"
        @change="handleClose('dataForm3')"
      >
        <RdForm :inline="true" :formOptions="addFormOptions" formLabelWidth="130px" :rules="addRules" ref="dataForm3">
        </RdForm>
        <!-- 添加科目 -->
        <el-form inline class="add-subject-container" label-width="130px" size="small" :model="dynamicValidateForm" ref="dynamicValidateForm" >
               <el-form-item
                  label="添加科目"
                >
                 <el-button @click="addDomain" type="primary" size="small">新增</el-button>
                </el-form-item>
                <br>
              <template v-for="(domain, index) in dynamicValidateForm.domains">
                <el-form-item
                  :label="'科目名称' + (index + 1)"
                  :key="domain.key"
                  :prop="'domains.' + index + '.skipKeyName'"
                  :rules="{
                    required: true, message: '域名不能为空', trigger: 'blur'
                  }"
                >
                  <el-input v-model="domain.skipKeyName"></el-input>
                </el-form-item>
                 <el-form-item
                  :label="'科目名称' + (index + 1)"
                  :key="domain.key"
                  :prop="'domains.' + index + '.subjectId'"
                  :rules="{
                    required: true, message: '域名不能为空', trigger: 'blur'
                  }"
                >
                  <el-input v-model="domain.subjectId"></el-input>
                </el-form-item>
                 <el-form-item
                  :label="'书籍' + (index + 1)"
                  :key="domain.key"
                  :prop="'domains.' + index + '.books'"
                  :rules="{
                    required: true, message: '域名不能为空', trigger: 'blur'
                  }"
                >
                  <el-input v-model="domain.books"></el-input>
                </el-form-item>
                
                <el-button size="small" @click.prevent="removeDomain(domain)" :key="domain.key">删除</el-button>
              </template>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
                  <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
                </el-form-item>
          </el-form>
          <!-- 轮播图上传 -->
          <el-form inline class="add-subject-container" label-width="130px" size="small" :model="picForm" ref="picForm" >
              <el-form-item
                  label="轮播图上传"
                >
                 <el-button @click="addPic" type="primary" size="small">新增</el-button>
                 <el-button @click="resetPicForm('picForm')" type="danger">全部删除</el-button>
                </el-form-item>
                <br>
              <el-form-item
                  v-for="(img, index) in picForm.img"
                  :label="'图片' + (index + 1)"
                  :key="img.key"
                  :prop="'img.' + index + '.url'"
                >
                  <!-- <el-input v-model="img.url"></el-input>
                   -->
                   <Upload-oss
                      :objConfig="{module: 'activity'}"
                      :src.sync="img.url"
                    />
                   <el-button size="mini" class="del-btn" @click.prevent="removePic(img)" :key="img.key"><i class="el-icon-delete"></i></el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitPicForm('picForm')">提交</el-button>
                </el-form-item>
          </el-form>
          <!-- 商品详情图片，缩略图，分享内容 -->
          <el-form class="add-subject-container" label-width="130px" size="small" :model="picForm" ref="picForm" >
              <el-form-item
                  label="商品详情图片"
                >
                  <Upload-oss
                      :objConfig="{module: 'activity'}"
                      :src.sync="picUrlTwo"
                    />
                </el-form-item>
                <el-form-item
                  label="商品缩略图"
                >
                  <Upload-oss
                      :objConfig="{module: 'activity'}"
                      :src.sync="picUrlThree"
                    />
                </el-form-item>
                <el-form-item
                  label="分享内容"
                >
                  <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="分享标题@/摘要@/分享图片链接,请按此格式输入"
                    v-model="remark"
                    style="width: 600px">
                  </el-input>
                </el-form-item>
          </el-form>
          <div class="btn-container">
            <el-button type="primary" size="small" @click="submitAddForm('dataForm3')">保存</el-button>
            <el-button size="small">取消</el-button>
          </div>
      </full-dialog>

      <!-- 活动编码 -->
      <full-dialog
        v-model="codeVisible"
        :title="currentGoodsName + '活动统计'"
        @change="codeVisible = false"
      >
        <statistics :data="statisticsData" v-if="codeVisible"/>
      </full-dialog>

      <!-- 商品名称 -->
      <full-dialog
        v-model="goodsNameVisible"
        :title="currentGoodsName"
        @change="goodsNameVisible = false"
      >
        <goodsName :data="statisticsData" v-if="goodsNameVisible"/>
      </full-dialog>

  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import UploadOss from "@/components/UploadOss";
import statistics from "./statistics";
import goodsName from "./goodsName";
import { scrollTo } from '@/utils/scroll-to'
export default {
  name:"seckill",
  data(){
    return {
      currentGoodsName:"",
      picUrlTwo:"",
      picUrlThree:"",
      remark:"",
      dynamicValidateForm: {
          domains: [],
        },
        picForm: {
          img: []
        },
      codeVisible: false,
      goodsNameVisible: false,
      statisticsData:{},
      formOptions: [
        {
          prop: "goodsName",
          element: "el-input",
          placeholder: "商品名称",
        },
        {
          prop: "code",
          element: "el-input",
          placeholder: "活动编码",
        },
        {
          prop: "productId",
          element: "el-select",
          placeholder: "项目名称",
          options:[]
        },
        {
          prop: "status",
          element: "el-select",
          placeholder: "状态",
          options:[
            {
              value:"Normal",
              label:"正常"
            },
            {
              value:"Stop",
              label:"暂停"
            }
          ]
        },
      ],
      searchForm:{},
      emptyText:"暂无数据",
      tableData:[
        // {code:1,goodsName: 2}
      ],
      tableKey: [
        {
          name: "ID主键",
          value: "id",
          fixed: "left",
          width: 80
        },
        {
          name: "活动链接",
          value: "url",
          operate: true,
          
        },
        {
          name: "轮播图",
          value: "picUrlOne",
          operate: true,
          width: 240
        },
        {
          name: "商品详情图片",
          value: "picUrlTwo",
          operate: true,
          width: 120
        },
        {
          name: "商品缩略图",
          value: "picUrlThree",
          operate: true,
          width: 120
        },
        {
          name: "活动时间",
          value: "time",
          operate: true,
          width: 220
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 140,
          fixed: "right"
        },
      ],
       pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },
      addVisible: false,
      addFormOptions: [
          
        {
          prop: "url",
          element: "el-input",
          placeholder: "请输入",
          label: "活动链接",
          oneRow: true
        },
         {
          prop: "goodsName",
          element: "el-input",
          placeholder: "请输入",
          label: "商品名称"
        },
         {
          prop: "goodsTitle",
          element: "el-input",
          placeholder: "请输入",
          label: "商品标题"
        },
         {
          prop: "salePrice",
          element: "el-input",
          placeholder: "请输入",
          label: "商品售价"
        },
        {
          prop: "status",
          element: "el-select",
          placeholder: "请选择",
          label: "活动状态",
          options: [
            {
              value:"Normal",
              label:"正常"
            },
            {
              value:"Stop",
              label:"暂停"
            }
          ],
        },
        {
          prop: "time",
          element: "el-date-picker",
          placeholder: "请选择",
          label: "活动时间",
          startPlaceholder: "活动时间(开始)",
          endPlaceholder: "活动时间(结束)",
          initWidth: true,
        },
        {
          prop: "productId",
          element: "el-select",
          placeholder: "请选择",
          label: "项目名称",
          options: [
          ],
          events: {
            
          }
        },
        {
          prop: "redPackageMoney",
          element: "el-input",
          placeholder: "请输入",
          label: "红包优惠金额"
        },
        {
          prop: "shareDiscountMoney",
          element: "el-input",
          placeholder: "请输入",
          label: "分享优惠金额"
        },
        {
          prop: "killTime",
          element: "el-input",
          placeholder: "请输入",
          label: "限时秒杀时间"
        },
        {
          prop: "wechatId",
          element: "el-select",
          placeholder: "请选择",
          label: "微信公众号",
          options: [
          ],
        },
        {
          prop: "initialNum",
          element: "el-input",
          placeholder: "请输入",
          label: "已购数量初始值"
        },
         {
          prop: "hideStatus",
          element: "el-select",
          placeholder: "请选择",
          label: "是否隐藏",
          options: [
            {
              label:"不隐藏",
              value: false
            },
            {
              label:"隐藏",
              value: true
            }
          ],
        },
         {
          prop: "pushStatus",
          element: "el-select",
          placeholder: "请选择",
          label: "是否推送到考药狮",
          options: [
            {
              label:"推送",
              value: false
            },
            {
              label:"不推送",
              value: true
            }
          ],
        },
         {
          prop: "campusId",
          element: "el-select",
          placeholder: "请选择",
          label: "校区",
          options: [
          ],
        },
        {
          prop: "productTitle",
          element: "el-input",
          placeholder: "请输入",
          label: "项目标题"
        },
        {
          prop: "subjectLabel",
          element: "el-input",
          placeholder: "请输入科目标签,多个使用,分隔",
          label: "科目标签"
        },
        {
          prop: "evaluationLabel",
          element: "el-input",
          placeholder: "请输入评论标签,多个使用,分隔",
          label: "评论标签"
        },
      
      ],
      addRules:{
        updateReason: [
          { required: true, message: "请输入修改事由", trigger: "blur" },
        ]
      },
      addStatus: true,
      detailVisible: false,
      currentProductId: "",
      subjectArr: []
    }
  },
  components:{
    RdForm,
    UploadOss,
    statistics,
    goodsName
  },
   mounted(){
    this.getTableData();
    this.getProductList();
    this.getWeChatList();
    this.getCampusList();
  },
   methods: {
     onSearch(val){
       this.searchForm = {
        ...val
      };
      console.log(val,this.searchForm , 'val---')
      this.getTableData();
     },
     getTableData(params = {}){
       this.$fetch("mobilegoodsurl_listNewJsp", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        this.tableData = res.data.varList.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          item.startTime = this.$common._formatDates(item.startTime);
          item.endTime = this.$common._formatDates(item.endTime);
          return item;
        });
        this.addFormOptions[6].events = {
          change: this.productChange
        };
        this.pageConfig.totalCount = res.data.page.totalResult;
      })
     },
     getProductList(){
       this.$fetch("mobilegoodsurl_getProductList").then(res => {
         let productArr =  res.data.map(item => ({
          label: item.productName,
          value: item.id
        }));
        this.formOptions[2].options = productArr;
        this.addFormOptions[6].options = productArr;
       })
     },
     getWeChatList(){
       this.$fetch("mobilegoodsurl_getWeChatList").then(res => {
         let wetChatArr = res.data.map(item =>( {
          label: item.appName,
          value: item.appId
        }))
        this.addFormOptions[10].options = wetChatArr;
       })
     },
     getCampusList(){
       this.$fetch("mobilegoodsurl_getCampusList").then(res => {
         this.addFormOptions[14].options = res.data.map(item => ({
          label: item.campusName,
          value: item.id
        }));
       })
     },

     pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    handleAdd(){
      scrollTo(0, 800);
      this.addVisible = true;
      this.addStatus = true;
      // this.$fetch("mobilegoodsurl_goAddNew").then(res => {
        
        
      // })
    },
    submitAddForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
        }
          
      });
    },
    handleEdit(data){
      scrollTo(0, 800);
      this.addStatus = false;
      this.addVisible = true;
    },
    handleDelete(row) {
      let info = '';
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$fetch("projectType_delete", {
            typeId: row.typeId,
            loginUserId,
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
    handleDetail(data){
        this.detailVisible = true;
    },
    handleClose(formName) {
      this.$refs[formName].onReset();
      this.addVisible = false;
    },
    handleCode(data){
      this.codeVisible = true;
      this.currentGoodsName = data.goodsName;
      const { code, startTime, endTime, goodsName } = data;
      this.statisticsData = {
        code, startTime, endTime, goodsName 
      }
    },
    handleGoodsName(data){
      this.currentGoodsName = data.goodsName;
      this.goodsNameVisible = true;
      const { code, startTime, endTime, goodsName } = data;
       this.statisticsData = {
        code, startTime, endTime, goodsName 
      }
    },
    productChange(val){
       this.currentProductId = val;
      //  获取科目下拉
      // this.$fetch("mobilegoodsurl_subjectList",{productId: val}).then(res)
      this.subjectArr = [
        {
          label: "护士资格",
          value: 6
        }
      ]
    },
    handleAddSubject(){
      if(!this.currentProductId){
        this.$message.error("请选择项目")
        return 
      }
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.dynamicValidateForm)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        let index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        if(!this.currentProductId){
        this.$message.error("请选择项目")
        return 
      }
        this.dynamicValidateForm.domains.push({
          books: '',
          skipKeyName: '',
          subjectId: '',
          key: Date.now()
        });
      },
      addPic(){
        this.picForm.img.push({
          url:"",
          key: Date.now()
        });
      },
      removePic(item){
        let index = this.picForm.img.indexOf(item)
        if (index !== -1) {
          this.picForm.img.splice(index, 1)
        }
      },
      submitPicForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.picForm,'resetPicForm')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetPicForm(formName) {
        this.$refs[formName].resetFields();
      },
  }
}
</script>

<style lang="scss" scoped>
.seckill {
  .link-wrapper {
    line-height: 10px;
    p {
      line-height: 15px;
    }
    /deep/ {
      .el-button {
        padding: 0;
      }
    }
  }
  .del-btn {
    top: 0;
    position: absolute;
    z-index: 9;
    right: 0;
    padding: 6px;
  }
  .btn-container {
    text-align: right;
    width: 800px;
    margin-top: 40px;
  }
  /deep/ .add-subject-container {
     
      .el-form--inline .el-form-item {
        width: 100%;
      }
  }
}
</style>
