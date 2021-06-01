<template>
  <div class="goodsName">
      <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleDownLoad"
          >导出</el-button
        >
        <el-button type="primary" size="small" @click="handleSync100"
          >同步到快递100</el-button
        >
        <el-button type="primary" size="small" @click="handleAddOld" icon="el-icon-plus"
          >添加订单(旧)</el-button
        >
        <el-button type="warning" size="small" @click="handleAddNew" icon="el-icon-plus"
          >添加订单(新)</el-button
        >
        <el-button type="warning" size="small" @click="handleBatchSync"
          >批量同步到金蝶</el-button
        >
      </div>
      <rd-table
        :multiple="true"
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig.sync="pageConfig"
        @pageChange="pageChange"
        :emptyText="emptyText"
        @select="handelSelect"
      >
        <template slot="name" slot-scope="scope">
          姓名：{{scope.row.name}}<br>
          微信昵称：{{scope.row.nickName}}<br>
          <!-- 电话号码：<p class="hiddenMan" id="aphone{{scope.row.id}"  onclick="showHidePhoneNum({{scope.row.id}, {{scope.row.phone})" >${fn:substring(var.phone, 0, 3)}****${fn:substring(var.phone, 7,11)}</p><br> -->
          地区：{{scope.row.area}}<br>
          详细地址：{{scope.row.address}}<br>
        </template>
         <template slot="goodsName" slot-scope="scope">
           商品名称：{{scope.row.goodsName}}<br>
            科目：{{scope.row.subjectName}}<br>
            编码：{{scope.row.code}}<br>
            商品数量：{{scope.row.number}}<br>
            支付金额：{{scope.row.payPrice}}<br>
            支付单号：{{scope.row.payOrderId}}<br>
            <!-- 支付时间：<fmt:formatDate value='{{scope.row.createAt}' pattern='yyyy-MM-dd HH:mm:ss'/><br> -->
        </template>
        <template slot="staffName" slot-scope="scope">
          润德老师姓名：{{scope.row.staffName}}<br>
          分校：{{scope.row.campusName}}<br>
        </template>
        <template slot="payType" slot-scope="scope">
           支付类型：{{scope.row.payType}}<br>
          订单来源：{{scope.row.orderSource}}<br>
          支付状态：{{scope.row.payStatus}}<br>
          发送短信状态：{{scope.row.messageStatus}}<br>
        </template>
        <template slot="expressStatus" slot-scope="scope">
          <span style="color: red" v-if="scope.row.expressStatus == '未快递' || scope.row.expressStatus == '缺少库存' || scope.row.expressStatus == '等待补偿'">
            {{scope.row.expressStatus}}
          </span>
          <span style="color: green" v-if="scope.row.expressStatus == '已快递' || scope.row.expressStatus == '已签收'">
            {{scope.row.expressStatus}}
          </span>
          <span style="color: blue" v-if="scope.row.expressStatus == '待发货'">
            {{scope.row.expressStatus}}
          </span>
        </template>
        <template slot="books" slot-scope="scope">
          <template v-if="scope.row.books">
            <template v-for="(item,index) in scope.row.books">
              图书{{index+1}}名称：{{item.bookName}}<br :key="index">
              图书{{index+1}}编码：{{item.bookSn}}<br :key="index">
            </template>
          </template>
        </template>
        <template slot="importKingdee" slot-scope="scope">
          <span :style="{color: scope.row.importKingdee?'green':'red'}">
            {{scope.row.importKingdee?'已同步':'未同步'}}
          </span>
        </template>
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >修改地址</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click="handleKdgj(scope.row)"
            type="text"
            size="small"
            style="color: #ffa500"
            >导入快递管家</el-button
          >
        </template>
      </rd-table>
    </div>
    
    <!-- 添加 -->
    <rd-dialog
        :title="'修改地址'"
        :dialogVisible="addVisible"
        appendToBody
        @handleClose="addVisible = false"
        @submitForm="submitAddForm('dataForm3')"
      >
        <RdForm :formOptions="addFormOptions" formLabelWidth="120px" :rules="addRules" ref="dataForm3">
          <template slot="post">
            <el-button size="small" type="primary">上传</el-button>
          </template>
        </RdForm>
      </rd-dialog>

      <!-- <full-dialog
        v-model="addVisible"
        :title="addStatus?'添加':'编辑'"
        @change="addVisible = false"
      >
        <RdForm :formOptions="addFormOptions" formLabelWidth="120px" :rules="addRules" ref="dataForm3">
          <template slot="post">
            <el-button size="small" type="primary">上传</el-button>
          </template>
        </RdForm>
      </full-dialog> -->
      <!-- 导出 -->
    <rd-dialog
        :title="'选择导出的列'"
        submitText="导出"
        appendToBody
        :dialogVisible="downLoadVisible"
        @handleClose="downLoadVisible = false"
        @submitForm="submitExportForm('dataForm3')"
      >
         <el-transfer v-model="exportValue" :data="exportData"></el-transfer>
      </rd-dialog>

    <!-- 添加旧订单 -->
      <rd-dialog
        :title="'添加'"
        :dialogVisible="addOldVisible"
        appendToBody
        @handleClose="addOldVisible = false"
        @submitForm="submitAddOldForm('dataForm4')"
      >
        <RdForm :formOptions="addOldFormOptions" :rules="addOldRules" ref="dataForm4">
        </RdForm>
      </rd-dialog>

      <!-- 添加新订单 -->
      <rd-dialog
        :title="'添加'"
        :dialogVisible="addNewVisible"
        appendToBody
        @handleClose="addNewVisible = false"
        @submitForm="submitAddNewForm('dataForm5')"
      >
        <RdForm :formOptions="addNewFormOptions" :rules="addNewRules" ref="dataForm5">
        </RdForm>
      </rd-dialog>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
export default {
  name:"goodsName",
  data(){
    return {
      exportData: [
      ],
      columnData:[],
      exportValue: [],
      downLoadVisible: false,
      formOptions: [
        {
          prop: "name",
          element: "el-input",
          placeholder: "学员姓名",
        },
        {
          prop: "phone",
          element: "el-input",
          placeholder: "电话号码",
        },
        {
          prop: "address",
          element: "el-input",
          placeholder: "邮寄地址",
        },
         {
          prop: "staffName",
          element: "el-input",
          placeholder: "老师姓名",
        },
        {
          prop: "campusName",
          element: "el-input",
          placeholder: "校区名称",
        },
        {
          prop: "provinceCampusName",
          element: "el-input",
          placeholder: "省级分校",
        },
         {
          prop: "classCity",
          element: "el-input",
          placeholder: "开课城市",
        },
        {
          prop: "classNum",
          element: "el-input",
          placeholder: "报名期数",
        },
        {
          prop: "subjectName",
          element: "el-input",
          placeholder: "科目名称",
        },
         {
          prop: "payType",
          element: "el-select",
          placeholder: "支付类型",
          options: []
        },
        {
          prop: "expressStatus",
          element: "el-select",
          placeholder: "快递状态",
          options: []
        },
        {
          prop: "orderSource",
          element: "el-select",
          placeholder: "订单来源",
          options: []
        },
         {
          prop: "messageStatus",
          element: "el-select",
          placeholder: "短信状态",
          options: []
        },
        {
          prop: "payOrderId",
          element: "el-select",
          placeholder: "支付单号",
          options: []
        },
        {
          prop: "importKingdee",
          element: "el-select",
          placeholder: "金蝶状态",
          options: []
        },
        // {
        //   prop: "isProxy",
        //   element: "el-select",
        //   placeholder: "是否停发",
        //   options: []
        // },
        {
          prop: "createAt",
          element: "el-date-picker",
          startPlaceholder: "支付时间(开始)",
          endPlaceholder: "支付时间(结束)",
          initWidth: true,
        }
      ],
      searchForm:{},
      emptyText:"暂无数据",
      tableData:[
         {
          id: 1,
          name: "飞翔的荷兰人3",
          cutdown: 1608897351706,
          visit: 2,
          phone: "15692026183",
        },
      ],
      tableKey: [
        {
          name: "ID",
          value: "id",
          fixed: "left",
          width: 80
        },
        {
          name: "学员信息",
          value: "name",
          operate: true
        },
        {
          name: "商品信息",
          value: "goodsName",
          operate: true
        },
        {
          name: "老师信息",
          value: "staffName",
          operate: true
        },
        {
          name: "订单状态",
          value: "payType",
          operate: true
        },
        {
          name: "快递状态",
          value: "expressStatus",
          operate: true,
          width: 80
        },
        {
          name: "商品明细",
          value: "books",
          operate: true
        },
        {
          name: "金蝶状态",
          value: "importKingdee",
          operate: true,
          width: 80
        },
        //  {
        //   name: "是否停发",
        //   value: "isProxy",
        //   width: 80
        // },
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
        pageSize: 10,
      },
      addVisible: false,
      addFormOptions: [
        {
          prop: "name",
          element: "el-input",
          placeholder: "请输入",
          label: "学员姓名"
        },
        {
          prop: "phone",
          element: "el-input",
          placeholder: "请输入",
          label: "电话号码"
        },
        {
          prop: "subjectName",
          element: "el-input",
          placeholder: "请输入",
          label: "科目"
        },
        {
          prop: "address",
          element: "el-input",
          placeholder: "请输入",
          label: "地址",
          type:"textarea",
          rows: 5
        }
      ],
      addRules:{
        updateReason: [
          { required: true, message: "请输入修改事由", trigger: "blur" },
        ]
      },
      addStatus: true,
      editId:"",
      selectedData:[],
      addOldVisible: false,
      addNewVisible: false,
      addOldRules:{},
      addNewRules:{},
      addOldFormOptions: [
        {
          prop: "name",
          element: "el-input",
          placeholder: "请输入",
          label: "学员姓名"
        },
        {
          prop: "phone",
          element: "el-input",
          placeholder: "请输入",
          label: "电话号码"
        },
        {
          prop: "payOrderId",
          element: "el-input",
          placeholder: "请输入",
          label: "第三方支付订单号"
        },
        {
          prop: "area",
          element: "el-input",
          placeholder: "请输入",
          label: "省市区",
        },
        {
          prop: "address",
          element: "el-input",
          placeholder: "请输入",
          label: "详细地址",
        },
        {
          prop: "subjectName",
          element: "el-input",
          placeholder: "请输入",
          label: "科目名称",
        }
      ],
      addNewFormOptions: [
        {
          prop: "code",
          element: "el-input",
          placeholder: "请输入",
          label: "活动随机码"
        },
        {
          prop: "payOrderId",
          element: "el-input",
          placeholder: "请输入",
          label: "第三方支付单号"
        }
      ],
    }
  },
  components:{
    RdForm
  },
  props: {
      data: {
          type: Object,
          default: {}
      }
  },
  mounted(){
    this.getTableData();

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
       const { code, startTime, endTime, goodsName } = this.data;
        this.$fetch("cmsmobilegoodspaylog_listJson",{
            code, startTime, endTime, goodsName,
            type: "new",
            ...this.pageConfig,
            ...this.searchForm,
            ...params
        }).then(res => {
            this.tableData = res.data.varList.map((item) => {
              item.createAt = this.$common._formatDates(item.createAt);
              item.updateAt = this.$common._formatDates(item.updateAt);
              item.startTime = this.$common._formatDates(item.startTime);
              item.endTime = this.$common._formatDates(item.endTime);
              return item;
            });;
            this.pageConfig.totalCount = res.data.page.totalResult;
        })
     },
     pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    handelSelect(val) {
      console.log(val, "valll");
      this.selectedData = val;
    },
    submitAddForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
          this.$fetch("cmsmobilegoodspaylog_editJsp",{
            ...formData,
            id: this.editId
          }).then(res => {
            this.$message.success('操作成功')
            this.addVisible = false;
            this.getTableData();
          })
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
    handleKdgj(row) {
       this.$confirm(
        `确认导入快递管家吗？`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "success",
        }
      )
        .then(async () => {
          this.$fetch("cmsmobilegoodspaylog_importKuaidi", {
            id: row.id
          }).then((res) => {
            if (res.code == 200) {
              this.$message.success("操作成功");
              this.getTableData();
            }
          });
        })
        .catch(() => {});
    },
    submitExportForm(){
      console.log(this.exportValue,'exportValue')
      if(!this.exportValue.length){
        this.$message.warning("请选择导出的列")
        return
      }
      let arr = [];
      this.exportValue.forEach((item,index) => {
        let obj = this.exportData.find(ele => (ele.key == item));
        if(obj){
          arr.push(obj)
        }
      })
      let newArr = [];
      arr.forEach(item => {
        newArr.push(item.label)
        newArr.push(item.key)
      })
      this.$fetch("cmsmobilegoodspaylog_excelJsp",{
        ...this.searchForm,
        columnName: newArr.join(","),
        code: this.data.code
      }).then(res => {
        this.$message.success("操作成功")
        this.downLoadVisible = false;
        this.$common.downLoadFile(res);
      })
    },
    handleDownLoad(){
      this.exportValue = [];
      this.downLoadVisible = true;
      this.$fetch("cmsmobilegoodspaylog_getAllColumnNames",{
        ...this.searchForm,
        code: this.data.code
      }).then(res => {
        console.log(res,'ress--')
        if(!res.data.columnData){
          return;
        }
        this.columnData = res.data.columnData;
        this.exportData = res.data.columnData.map(item => ({
          key: item.columnNames,
          label: item.columnValues
        }))
      })
    },
    handleSync100(){
      this.$confirm(
        `确认将改活动所有未导入订单同步至快递100？--该操作不可逆，请谨慎操作`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          this.$fetch("cmsmobilegoodspaylog_batchImportToKuaidi", {
            code: this.data.code
          }).then((res) => {
            if (res.code == 200) {
              this.$message.success("操作成功");
              this.getTableData();
            }
          });
        })
        .catch(() => {});
    },
    handleBatchSync(){
      if(!this.selectedData.length){
        this.$message.warning("请选择数据")
        return
      }
      this.$fetch("cmsmobilegoodspaylog_batchImportToKd", {
            ids: this.selectedData.map(item => (item.id)).join(",")
          }).then((res) => {
            if (res.code == 200) {
              this.$message.success("操作成功");
              this.getTableData();
            }
          });
    },
    handleAddOld(){
      this.addOldVisible = true;
    },
    handleAddNew(){
      this.addNewVisible = true;
    },
    submitAddOldForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
          this.$fetch("cmsmobilegoodspaylog_saveAgain",{
            ...formData
          }).then(res => {
            this.$message.success('操作成功')
            this.addOldVisible = false;
            this.getTableData();
          })
        }
          
      });
    },
    submitAddNewForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
          this.$fetch("cmsmobilegoodspaylog_saveAgainTwo",{
            ...formData
          }).then(res => {
            this.$message.success('操作成功')
            this.addNewVisible = false;
            this.getTableData();
          })
        }
          
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.goodsName {

}
</style>
