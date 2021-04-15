<template>
  <div class="view-detail">
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
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig.sync="pageConfig"
        @pageChange="pageChange"
        :emptyText="emptyText"
      >
        <template slot="couponName" slot-scope="scope">
            优惠券名称： {{scope.row.couponName}}<br>
            项目名称： {{scope.row.productName}}<br>
            优惠券数量： <span style="font-size:15px;color:#009688;font-weight:bold;">{{scope.row.couponNum}}</span><br>
            学员类型： {{scope.row.studentType}}<br>
            优惠券状态： {{scope.row.couponStatus}}<br>
            说明： {{scope.row.remark}}<br>
            开始时间： {{scope.row.startTime}}<br>
            结束时间： {{scope.row.endTime}}<br>
        </template>
        <template slot="goodsName" slot-scope="scope">
            <template v-if="scope.row.isNewEducation">
                <template v-if="scope.row.majorLevelInfo">
                    <template v-for="(item,index) in scope.row.majorLevelInfo">
                        {{item}}<br :key="index">
                    </template>
                </template>
                <template v-else>
                    <span style="font-size:15px;color:#009688;font-weight:bold;">无层级限制</span>
                </template>
            </template>
            <template v-else>
                <template v-if="scope.row.subjectInfo">
                    <template v-for="(item,index) in scope.row.subjectInfo">
                        {{item}}<br :key="index">
                    </template>
                </template>
                <template v-else>
                    <span style="font-size:15px;color:#009688;font-weight:bold;">无科目限制</span>
                </template>
            </template>
        </template>
        <template slot="classInfo" slot-scope="scope">
            <template v-if="scope.row.isNewEducation">
                <template v-if="scope.row.schoolInfo">
                    <template v-for="(item,index) in scope.row.schoolInfo">
                        {{item}}<br :key="index">
                    </template>
                </template>
                <template v-else>
                    <span style="font-size:15px;color:#009688;font-weight:bold;">无学校限制</span>
                </template>
            </template>
            <template v-else>
                <template v-if="scope.row.classTypeInfo">
                    <template v-for="(item,index) in scope.row.classTypeInfo">
                        {{item}}<br :key="index">
                    </template>
                </template>
                <template v-else>
                    <span style="font-size:15px;color:#009688;font-weight:bold;">无班型限制</span>
                </template>
            </template>
        </template>
        <template slot="courseInfo" slot-scope="scope">
            <template v-if="scope.row.isNewEducation">
                <template v-if="scope.row.majorInfo">
                    <template v-for="(item,index) in scope.row.majorInfo">
                        {{item}}<br :key="index">
                    </template>
                </template>
                <template v-else>
                    <span style="font-size:15px;color:#009688;font-weight:bold;">无专业限制</span>
                </template>
            </template>
            <template v-else>
                <template v-if="scope.row.courseInfo">
                    <template v-for="(item,index) in scope.row.courseInfo">
                        {{item}}<br :key="index">
                    </template>
                </template>
                <template v-else>
                    <span style="font-size:15px;color:#009688;font-weight:bold;">无课程限制</span>
                </template>
            </template>
        </template>
        <template slot="frontClass" slot-scope="scope">
            <template v-if="scope.row.isNewEducation">
                <template v-if="scope.row.frontSchoolInfo">
                    <template v-for="(item,index) in scope.row.frontSchoolInfo">
                        {{item}}<br :key="index">
                    </template>
                </template>
                <template v-else>
                    <span style="font-size:15px;color:#009688;font-weight:bold;">无前置学校限制</span>
                </template>
            </template>
            <template v-else>
                <template v-if="scope.row.frontClassTypeInfo">
                    <template v-for="(item,index) in scope.row.frontClassTypeInfo">
                        {{item}}<br :key="index">
                    </template>
                </template>
                <template v-else>
                    <span style="font-size:15px;color:#009688;font-weight:bold;">无前置班型限制</span>
                </template>
            </template>
        </template>
        <template slot="frontCourse" slot-scope="scope">
            <template v-if="scope.row.isNewEducation">
                <template v-if="scope.row.frontMajorInfo">
                    <template v-for="(item,index) in scope.row.frontMajorInfo">
                        {{item}}<br :key="index">
                    </template>
                </template>
                <template v-else>
                    <span style="font-size:15px;color:#009688;font-weight:bold;">无前置专业限制</span>
                </template>
            </template>
            <template v-else>
                <template v-if="scope.row.frontCourseInfo">
                    <template v-for="(item,index) in scope.row.frontCourseInfo">
                        {{item}}<br :key="index">
                    </template>
                </template>
                <template v-else>
                    <span style="font-size:15px;color:#009688;font-weight:bold;">无前置科目限制</span>
                </template>
            </template>
        </template>
        <template slot="campusInfo" slot-scope="scope">
            <template v-if="scope.row.campusInfo">
                <template v-for="(item,index) in scope.row.campusInfo">
                    {{item}}<br :key="index">
                </template>
            </template>
            <template v-else>
                <span style="font-size:15px;color:#009688;font-weight:bold;">无校区限制</span>
            </template>
        </template>
        <template slot="couponType" slot-scope="scope">
            优惠类型：{{scope.row.couponType}}<br>
            <template v-if="scope.row.couponType == '梯度优惠'">
                 梯度优惠信息：{{scope.row.gradientInfo}}<br>
            </template>
            <template v-if="scope.row.couponType == '普通优惠'">
                 优惠金额：{{scope.row.faceValue}}<br>
            </template>
            <template v-if="scope.row.couponType == '满减优惠'">
                 满减金额：{{scope.row.fullPrice}}<br>
                 优惠金额：{{scope.row.faceValue}}<br>
            </template>
            <template v-if="scope.row.couponType == '折扣优惠'">
                 折扣：{{scope.row.couponRate}}%<br>
            </template>
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
        @handleClose="addVisible = false"
        @submitForm="submitAddForm('dataForm3')"
      >
        <RdForm :formOptions="addFormOptions" formLabelWidth="120px" :rules="addRules" ref="dataForm3">
          <template slot="post">
            <el-button size="small" type="primary">上传</el-button>
          </template>
        </RdForm>
      </rd-dialog>

      <full-dialog
        v-model="addVisible"
        :title="addStatus?'添加':'编辑'"
        @change="addVisible = false"
      >
        <RdForm :formOptions="addFormOptions" formLabelWidth="120px" :rules="addRules" ref="dataForm3">
          <template slot="post">
            <el-button size="small" type="primary">上传</el-button>
          </template>
        </RdForm>
      </full-dialog>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
export default {
  name:"view-detail",
  data(){
    return {
      formOptions: [
        {
          prop: "couponName",
          element: "el-input",
          placeholder: "优惠券名称",
        },
        {
          prop: "couponStatus",
          element: "el-select",
          placeholder: "优惠券状态",
          options: []
        },
        {
          prop: "studentType",
          element: "el-select",
          placeholder: "学员类型",
          options: []
        },
        {
          prop: "superposition",
          element: "el-select",
          placeholder: "是否叠加",
          options: [
              {
                  label: "不能叠加",
                  value: '0'
              },
              {
                  label: "可以叠加",
                  value: '1'
              }
          ]
        },
        {
          prop: "productId",
          element: "el-select",
          placeholder: "项目名称",
          options: []
        },
      ],
      searchForm:{},
      emptyText:"暂无数据",
      tableData:[
      ],
      tableKey: [
        {
          name: "序号",
          value: "id",
          fixed: "left",
          width: 60
        },
        {
          name: "优惠券信息",
          value: "couponName",
          operate: true
        },
        {
          name: "科目信息",
          value: "goodsName",
          operate: true
        },
        {
          name: "班型信息",
          value: "classInfo",
          operate: true
        },
        {
          name: "课程信息",
          value: "courseInfo",
          operate: true
        },
        {
          name: "前置班型",
          value: "frontClass",
          operate: true
        },
        {
          name: "前置课程",
          value: "frontCourse",
          operate: true
        },
        {
          name: "校区信息",
          value: "campusInfo",
          operate: true
        },
        {
          name: "优惠信息",
          value: "couponType",
          operate: true
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
      addFormOptions: [
          
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入名称",
          label: "名称"
        },
        {
          prop: "post",
          element: "el-input",
          placeholder: "",
          label: "上传",
          operate: true,
          initValue: 0
        },
        {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择",
          label: "所属九块九包邮",
          options: [
            {
              label: "博士",
              value: "0",
            },
            {
              label: "硕士",
              value: 1,
            },
          ],
        },
        {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择",
          label: "所属活动",
          options: [
            {
              label: "博士",
              value: "0",
            },
            {
              label: "硕士",
              value: 1,
            },
          ],
        },
        {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "分享分案一",
          type:"textarea",
          rows: 2
        },
         {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "分享分案二",
          type:"textarea",
          rows: 2
        },
         {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "分享分案三",
          type:"textarea",
          rows: 2
        },
         {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "分享分案四",
          type:"textarea",
          rows: 2
        },
           {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "分享分案五",
          type:"textarea",
          rows: 2
        }
      ],
      addRules:{
        updateReason: [
          { required: true, message: "请输入修改事由", trigger: "blur" },
        ]
      },
      addStatus: true,
      editId:""
    }
  },
  components:{
    RdForm
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
       this.$fetch("coupontemplateversiontwo_listJsp", {
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
        });;
        this.pageConfig.totalCount = res.data.page.totalResult;
        this.formOptions[1].options = res.data.couponStatusList.map(item => ({
            label: item.value,
            value: item.key
        }))
        this.formOptions[2].options = res.data.studentTypeList.map(item => ({
            label: item.value,
            value: item.key
        }))
        this.formOptions[4].options = res.data.productList.map(item => ({
            label: item.productName,
            value: item.id
        }))
        
      })
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
    }
  }
}
</script>

<style lang="scss" scoped>
.view-detail {

}
</style>
