<template>
  <div class="class-detail">
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
        <el-button type="primary" size="small" @click="handleAdd(2)"  icon="el-icon-edit"
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
        >
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
    <rd-dialog
        :title="addStatus?'添加':'编辑'"
        :dialogVisible="addVisible"
        appendToBody
        @handleClose="addVisible = false"
        @submitForm="submitAddForm('dataForm3')"
      >
        <RdForm :formOptions="addFormOptions" formLabelWidth="120px" :rules="addRules" ref="dataForm3" >
          <template slot="subjectId">
            <el-form
                ref="dataForm2"
                :model="basicInfo"
                :rules="rules"
                label-width="120px"
            >
                <el-form-item style="margin-left: -120px;margin-bottom: 20px">
                    <el-select v-model="basicInfo.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <div
                    class="param-item"
                    v-for="(item, index) in basicInfo.course"
                    :key="item.value"
                  >
                    <el-form-item
                      :prop="'course.' + index + '.coursePrice'"
                      label-width="0"
                      :rules="{
                        required: item.checked
                          ? true
                          : false,
                        message: '请输入价格',
                        trigger: 'blur',
                      }"
                    >
                      <el-checkbox
                        v-model="item.checked"
                        :label="item.label"
                      ></el-checkbox>

                      <el-input
                        v-model="item.coursePrice"
                        size="small"
                        placeholder="请输入价格"
                        style="width: 200px; margin-left: 20px"
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
        @submitForm="submitAddPriceForm('dataForm3')"
      >
        <RdForm :formOptions="addPriceFormOptions" formLabelWidth="120px" :rules="addPriceRules" ref="dataForm3" >
        </RdForm>
      </rd-dialog>

      <!-- 批量修改价格 -->
      <rd-dialog
        :title="'批量修改价格'"
        :dialogVisible="editPriceVisible"
        appendToBody
        @handleClose="editPriceVisible = false"
        @submitForm="submitEditPriceForm('dataForm3')"
      >
        <RdForm :formOptions="editPriceFormOptions" formLabelWidth="120px" :rules="editPriceRules" ref="dataForm3" >
        </RdForm>
      </rd-dialog>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
export default {
  name:"class-detail",
  data(){
    return {
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
          placeholder: "校区",
          options: [],
          multiple: true
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
          label: "班次名称"
        },
        {
          prop: "classType",
          element: "el-select",
          placeholder: "请选择",
          label: "班次类型",
          options: [
          ],
        },
        {
          prop: "productId",
          element: "el-select",
          placeholder: "请选择",
          label: "项目",
          options: [
          ],
        },
        {
          prop: "subjectId",
          element: "el-select",
          placeholder: "请选择",
          label: "科目",
          options: [
          ],
          operate: true
        },
        {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择",
          label: "服务年限",
          options: [
          ],
        },
        {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择",
          label: "校区",
          options: [
          ],
        },
        {
          prop: "roleName",
          element: "el-input",
          placeholder: "请选择",
          label: "详细介绍",
          type: "textarea",
          rows: 3
        },
        {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择",
          label: "状态",
          options: [
          ],
        }
      ],
      addRules:{
        updateReason: [
          { required: true, message: "请输入修改事由", trigger: "blur" },
        ]
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
          course: [1,2,3],
          region:""
      },
      rules: {}
    }
  },
  components:{
    RdForm
  },
   methods: {
      handleOpen(data){
        this.$emit('openDetails',data)
      },
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
    handleAdd(index){
      if(index == 1){
        this.addStatus = true;
        this.addVisible = true;
      }else if(index == 5){
        this.addPriceVisible = true;
      }else if(index == 2){
        this.editPriceVisible = true;
      }
      
    },
    submitAddForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
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
    }
  }
}
</script>


<style lang="scss" scoped>
.class-detail {
 
}
</style>
