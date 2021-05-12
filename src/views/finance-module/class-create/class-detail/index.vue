<template>
  <div class="class-detail">
    <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>班型管理</el-breadcrumb-item>
        <el-breadcrumb-item><a href="javascript:;" @click="goBack(0)">{{title}}</a></el-breadcrumb-item>
        <el-breadcrumb-item v-if="currentCampus && (currentIndex == 1 ||currentIndex == 2)"><a href="javascript:;" @click="goBack(1)">{{currentCampus}}</a></el-breadcrumb-item>
        <el-breadcrumb-item v-if="currentCompany && currentIndex == 2"><a href="javascript:;"  @click="goBack(2)">{{currentCompany}}</a></el-breadcrumb-item>
      </el-breadcrumb>
      <div v-show="currentIndex == 0">
        <search-form
          :formOptions="formOptions"
          :showNum="7"
          @onSearch="onSearch"
        ></search-form>
        <div class="w-container">
          <div class="btn-wrapper">
            <el-button type="success" size="small" @click="handleAdd(1)" icon="el-icon-plus"
              >添加</el-button
            >
            <!-- <el-button type="primary" size="small" @click="handleAdd(2)"  icon="el-icon-edit"
              >批量修改价格</el-button
            >
            <el-button type="danger" size="small" @click="handleAdd(3)" icon="el-icon-caret-right"
              >暂停</el-button
            >
            <el-button type="warning" size="small" @click="handleAdd(4)" icon="el-icon-circle-check"
              >恢复</el-button
            >
            <el-button type="info" size="small" @click="handleAdd(5)" icon="el-icon-plus"
              >批量添加连锁价格</el-button
            > -->
          </div>
          <rd-table
            :tableData="tableData"
            :tableKey="tableKey"
            :pageConfig.sync="pageConfig"
            fixedTwoRow
            multiple
            @pageChange="pageChange"
            :emptyText="emptyText"
          >
            <template slot="campusName" slot-scope="scope">
              <el-button type="text" @click="handleOpen(scope.row)">{{scope.row.campusName}}</el-button>
            </template>
            <template slot="edit" slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="text" size="small"
                >编辑</el-button
              >
              <!-- <el-divider direction="vertical"></el-divider>
              <el-button
                @click="handleDelete(scope.row)"
                type="text"
                size="small"
                style="color: #ec5b56"
                >删除</el-button
              > -->
            </template>
          </rd-table>
        </div>
        
        <!-- 添加 -->
        <rd-dialog
            :title="addStatus?'添加':'编辑'"
            :dialogVisible="addVisible"
            appendToBody
            @handleClose="addVisible = false"
            @submitForm="submitAddForm('dataForm3')"
          >
            <RdForm :formOptions="addFormOptions" formLabelWidth="120px" :rules="addRules" ref="dataForm3" >
              <template slot="subjectName">
                <el-form
                    ref="dataForm2"
                    :model="basicInfo"
                    :rules="rules"
                    label-width="120px"
                >
                    <el-form-item style="margin-left: -120px;margin-bottom: 20px">
                        <el-input v-model="basicInfo.subjectName" readonly size="small"></el-input>
                    </el-form-item>
                    <template v-if="currentData.chargePattern_text == 'Pricesum'">
                      <div
                        class="param-item"
                        v-for="(item, index) in basicInfo.course"
                        :key="item.value"
                      >
                        <el-form-item
                          :prop="'course.' + index + '.coursePrice'"
                          label-width="0"
                          :rules="{
                            required: true,
                            message: '请输入价格',
                            trigger: 'blur',
                          }"
                        >
                          <el-checkbox
                            v-model="item.checked"
                            :label="item.courseId"
                          >{{item.courseName}}</el-checkbox>

                          <el-input
                            v-model="item.coursePrice"
                            size="small"
                            placeholder="请输入价格"
                            style="width: 140px; margin-left: 20px"
                          ></el-input>
                          <el-switch
                            active-text="计算业绩"
                            style="margin-left: 20px"
                            v-model="item.isperformance"
                            active-color="#13ce66"
                            inactive-color="#dcdfe6"
                          >
                          </el-switch>
                        </el-form-item>
                      </div>
                    </template>
                    
                </el-form>
              </template>
            </RdForm>
          </rd-dialog>

          <!-- 批量添加连锁价格 -->
          <rd-dialog
            :title="'批量添加校区班次连锁价格'"
            :dialogVisible="addPriceVisible"
            appendToBody
            @handleClose="addPriceVisible = false"
            @submitForm="submitAddPriceForm('dataForm4')"
          >
            <RdForm :formOptions="addPriceFormOptions" formLabelWidth="120px" :rules="addPriceRules" ref="dataForm4" >
            </RdForm>
          </rd-dialog>

          <!-- 批量修改价格 -->
          <rd-dialog
            :title="'批量修改价格'"
            :dialogVisible="editPriceVisible"
            appendToBody
            @handleClose="editPriceVisible = false"
            @submitForm="submitEditPriceForm('dataForm5')"
          >
            <RdForm :formOptions="editPriceFormOptions" formLabelWidth="120px" :rules="editPriceRules" ref="dataForm5" >
            </RdForm>
          </rd-dialog>
      </div>

      <!-- 校区弹窗 -->
      <Details
      @openChainTable="openChainTable"
        v-show="currentIndex == 1"
      />

      <chainTable  v-show="currentIndex == 2" />
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import Details from "./details.vue";
import chainTable from "./chainTable.vue";
export default {
  name:"class-detail",
  data(){
    return {
      detailsVisible: false,
      currentIndex: 0,
      currentCampus: "",
      currentCompany:"",
      currentData: {},
      formOptions: [
        {
          prop: "status",
          element: "el-select",
          placeholder: "状态",
          options: [
            {
              label: "正常",
              value: "Normal"
            },
            {
              label: "暂停",
              value: "Stop"
            },
          ]
        },
        {
          prop: "campusId",
          element: "el-select",
          placeholder: "校区",
          options: [],
          multiple: true,
          filterable: true
        },
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
          campusName:"汕头分校(广东校区)"
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
          name: "班次名称",
          value: "className",
        },
        {
          name: "项目名称",
          value: "productName",
        },
        {
          name: "科目名称",
          value: "subjectName",
        },
        {
          name: "服务年限",
          value: "serviceYear",
        },
        {
          name: "省份名称",
          value: "provinceName",
        },
        {
          name: "校区名称",
          value: "campusName",
          operate: true
        },
        {
          name: "详细介绍",
          value: "classDetail",
        },
        {
          name: "状态",
          value: "status",
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
        pageSize: 10,
      },
      addVisible: false,
      addPriceVisible: false,
      editPriceVisible: false,
      addFormOptions: [
          
        {
          prop: "className",
          element: "el-input",
          placeholder: "请输入",
          label: "班次名称",
          readonly: true
        },
        {
          prop: "classType",
          element: "el-input",
          placeholder: "请输入",
          label: "班次类型",
          // options: [
          // ],
          readonly: true
        },
        {
          prop: "productName",
          element: "el-input",
          placeholder: "请输入",
          label: "项目",
          // options: [
          // ],
          readonly: true
        },
        {
          prop: "subjectName",
          element: "el-select",
          placeholder: "请选择",
          label: "科目",
          options: [
          ],
          operate: true
        },
        {
          prop: "serviceYear",
          element: "el-select",
          placeholder: "请选择",
          label: "服务年限",
          options: [
            {
              label: 1,
              value: 1
            },
            {
              label: 2,
              value: 2
            },
            {
              label: 3,
              value: 3
            },
            {
              label: 4,
              value: 4
            },
            {
              label: 5,
              value: 5
            },
          ],
          initValue: 1
        },
        {
          prop: "campusId",
          element: "el-select",
          placeholder: "请选择",
          label: "校区",
          options: [
          ],
          filterable: true,
          multiple: true
        },
        {
          prop: "classDetail",
          element: "el-input",
          placeholder: "请输入",
          label: "详细介绍",
          type: "textarea",
          rows: 3
        },
        {
          prop: "status",
          element: "el-select",
          placeholder: "请选择",
          label: "状态",
          options: [
             {
              label: "正常",
              value: "Normal"
            },
            {
              label: "暂停",
              value: "Stop"
            }
          ],
          initValue: "Normal"
        }
      ],
      addRules:{
        className: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        classType: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        productName: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        subjectName: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        serviceYear: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        campusId: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        status: [
          { required: true, message: "请选择", trigger: "change" },
        ],
      },
      addPriceFormOptions: [
        {
          prop: "className",
          element: "el-select",
          placeholder: "请选择",
          label: "连锁",
          options: []
        },
        {
          prop: "className",
          element: "el-input",
          placeholder: "请输入",
          label: "连锁区域"
        },
        {
          prop: "className",
          element: "el-select",
          placeholder: "请选择",
          label: "开网课类型",
          options: []
        },
        {
          prop: "className",
          element: "el-input",
          placeholder: "请输入",
          label: "1科价格"
        },
        {
          prop: "className",
          element: "el-input",
          placeholder: "请输入",
          label: "2科价格"
        },
        {
          prop: "className",
          element: "el-input",
          placeholder: "请输入",
          label: "3科价格"
        },
        {
          prop: "className",
          element: "el-input",
          placeholder: "请输入",
          label: "4科价格"
        }
      ],
      addPriceRules: {

      },
      editPriceFormOptions: [
        {
          prop: "className",
          element: "el-select",
          placeholder: "请输入",
          label: "是否计算业绩",
          options: [
            {
              label: "是",
              value: true
            },
            {
              label: "否",
              value: false
            }
          ]
        },
        {
          prop: "className",
          element: "el-input",
          placeholder: "请输入",
          label: "1科价格"
        },
        {
          prop: "className",
          element: "el-input",
          placeholder: "请输入",
          label: "2科价格"
        },
        {
          prop: "className",
          element: "el-input",
          placeholder: "请输入",
          label: "3科价格"
        },
        {
          prop: "className",
          element: "el-input",
          placeholder: "请输入",
          label: "4科价格"
        }],
      editPriceRules: {},
      addStatus: true,
      editId:"",
      basicInfo: {
          course: [
            //   {
            //   checked: true,
            //   coursePrice: 10,
            //   isperformance: true,
            //   courseName: "test1"
            // }
          ],
          subjectName:""
      },
      rules: {},
      campusArr: []
    }
  },
  components:{
    RdForm,Details,chainTable
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    classTypeId: {
      type: String | Number,
      default: 418590
    },
    classTypeName: {
      type: String,
      default: "2021金牌通关班【网课】"
    },
    productId: {
      type: String | Number,
      default: 0
    }
  },
  mounted(){
    this.getTableData();
  },
   methods: {
     openChainTable(data){
        this.currentIndex = 2;
       this.currentCompany = data.chainName;
     },
      handleOpen(data){
//         this.$emit('openDetails',data)
        // this.detailsVisible = true;
        this.currentIndex = 1;
        this.currentCampus = data.campusName;
      },
     onSearch(val){
       const { campusId } = val;
       if(campusId&&campusId.length){
         this.searchForm = {
            ...val,
            campusId: campusId.join(",")
          };
       }else {
         this.searchForm = {
            ...val,
            classTypeId: this.classTypeId,
            classTypeName: this.classTypeName
          };
       }
       
      console.log(val,this.searchForm , 'val---')
      this.getTableData();
     },
     getTableData(params = {}){
       this.$fetch("courseclass_listJsp", { 
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
        classTypeId: this.classTypeId,
        classTypeName: this.classTypeName,
        productId: this.productId
      }).then((res) => {
        this.tableData = res.data.varList.map(item => {
          item.createAt = this.$common._formatDates(item.createAt);
          return item;
        });
        this.pageConfig.totalCount = res.data.page.totalResult;
        this.campusArr = res.data.campusList.map(item => ({
          label: `${item.campusName}(${item.parentCampusName || ''})`,
          value: item.id
        }));
        this.formOptions[1].options = this.campusArr;
        this.addFormOptions[5].options = this.campusArr;
      });
     },
     pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    handleAdd(index){
      if(index == 1){
        this.addStatus = true;
        this.addVisible = true;
        this.$fetch("courseclass_goAdd",{
          classTypeId: this.classTypeId,
          productId: this.productId
        }).then(res => {
          const { pd } = res.data;
          const { className, classType, productName, subjectName,courses  } = res.data.pd;
          this.$refs.dataForm3.setValue({
            className,
            classType,
            productName,
            subjectName
          })
          this.basicInfo.subjectName = subjectName;
          this.basicInfo.course = courses.map(item => ({
            checked: false,
              coursePrice: "",
              isperformance: true,
              courseName: item.courseName,
              courseId: item.courseId
          }));
          this.currentData = pd;
        })
      }else if(index == 5){
        this.addPriceVisible = true;
      }else if(index == 2){
        this.editPriceVisible = true;
      }
      
    },
    submitAddForm(formName){
      let valid2;
      this.$refs.dataForm2.validate((valid) =>{
        valid2 = valid;
      })
      this.$refs[formName].validate((valid, formData) => {
        if(valid && valid2){
          console.log(formData, this.basicInfo.course,"提交");
          let obj = {};
          this.basicInfo.course.forEach(item => {
            obj['coursePrice'+item.courseId] = item.coursePrice;
            if(item.isperformance){
              obj['isperformance'+item.courseId] = "on";
            }
          })
           console.log(formData, obj,"提交2");
           let campusIds = [];
           formData.campusId.forEach(item => {
             let target = this.campusArr.find(ele => (ele.value == item));
             if(target){
               campusIds.push({
                 name: target.label,
                 val: target.value
               })
             }
             
           })
          this.$fetch("courseclass_save",{
            ...formData,
            classTypeId: this.classTypeId,
            chargePattern: this.currentData.chargePattern_text,
            campusIds: JSON.stringify(campusIds),
            classBatch: this.currentData.classTypeBatch,
            classType: this.currentData.classType_text,
            productId: this.currentData.productId,
            subjectId: this.currentData.subjectId,
            map: JSON.stringify(obj),
            campusId: formData.campusId.join(","),
            course: JSON.stringify(this.basicInfo.course.map(item=>(item.courseId)))
          }).then(res => {
            this.addVisible = false;
            this.getTableData();
          })
        }
          
      });
    },
    submitAddPriceForm(formName){
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
    handleDelete(row) {
      let info = '';
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$fetch("projectType_delete", {
            id: row.id
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
    goBack(index){
      this.currentIndex = index;
    }
  }
}
</script>


<style lang="scss" scoped>
.class-detail {
 
}
</style>
