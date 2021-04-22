<template>
  <div class="new-coupon">
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
            优惠券数量： <span style="font-size:14px;color:#009688;font-weight:bold;">{{scope.row.couponNum}}</span><br>
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
                    <span style="font-size:14px;color:#009688;font-weight:bold;">无层级限制</span>
                </template>
            </template>
            <template v-else>
                <template v-if="scope.row.subjectInfo">
                    <template v-for="(item,index) in scope.row.subjectInfo">
                        {{item}}<br :key="index">
                    </template>
                </template>
                <template v-else>
                    <span style="font-size:14px;color:#009688;font-weight:bold;">无科目限制</span>
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
                    <span style="font-size:14px;color:#009688;font-weight:bold;">无学校限制</span>
                </template>
            </template>
            <template v-else>
                <template v-if="scope.row.classTypeInfo">
                    <template v-for="(item,index) in scope.row.classTypeInfo">
                        {{item}}<br :key="index">
                    </template>
                </template>
                <template v-else>
                    <span style="font-size:14px;color:#009688;font-weight:bold;">无班型限制</span>
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
                    <span style="font-size:14px;color:#009688;font-weight:bold;">无专业限制</span>
                </template>
            </template>
            <template v-else>
                <template v-if="scope.row.courseInfo">
                    <template v-for="(item,index) in scope.row.courseInfo">
                        {{item}}<br :key="index">
                    </template>
                </template>
                <template v-else>
                    <span style="font-size:14px;color:#009688;font-weight:bold;">无课程限制</span>
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
                    <span style="font-size:14px;color:#009688;font-weight:bold;">无前置学校限制</span>
                </template>
            </template>
            <template v-else>
                <template v-if="scope.row.frontClassTypeInfo">
                    <template v-for="(item,index) in scope.row.frontClassTypeInfo">
                        {{item}}<br :key="index">
                    </template>
                </template>
                <template v-else>
                    <span style="font-size:14px;color:#009688;font-weight:bold;">无前置班型限制</span>
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
                    <span style="font-size:14px;color:#009688;font-weight:bold;">无前置专业限制</span>
                </template>
            </template>
            <template v-else>
                <template v-if="scope.row.frontCourseInfo">
                    <template v-for="(item,index) in scope.row.frontCourseInfo">
                        {{item}}<br :key="index">
                    </template>
                </template>
                <template v-else>
                    <span style="font-size:14px;color:#009688;font-weight:bold;">无前置科目限制</span>
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
                <span style="font-size:14px;color:#009688;font-weight:bold;">无校区限制</span>
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
      <!-- <rd-dialog
          :title="addStatus?'添加':'编辑'"
          :dialogVisible="addVisible"
          @handleClose="handleClose"
          @submitForm="submitAddForm('dataForm3')"
        >
          <RdForm :formOptions="addFormOptions" formLabelWidth="120px" :rules="addRules" ref="dataForm3">
            <template slot="addSkip">
              <el-button size="small" type="primary">添加梯度优惠详情</el-button>
            </template>
          </RdForm>
        </rd-dialog> -->

        <full-dialog
        v-model="addVisible"
        :title="addStatus?'添加':'编辑'"
        @change="handleClose"
      >
        <div style="width: 70%" class="add-form-container">
        <RdForm :formOptions="addFormOptions" formLabelWidth="120px" :rules="addRules" ref="dataForm3">
            <template slot="addSkip">
              <el-button size="small" type="primary" @click="addDomain">添加梯度优惠详情</el-button>
              <el-form
                :model="dynamicValidateForm"
                ref="dynamicValidateForm"
                label-width="100px"
                class="demo-dynamic"
                inline
              >
                <template v-for="(domain, index) in dynamicValidateForm.domains">
                  <el-form-item
                    :label="'课程数量'"
                    :key="domain.key"
                    :prop="'domains.' + index + '.skipKey'"
                    :rules="{
                      required: true,
                      message: '参数名称不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <el-input v-model="domain.skipKey" size="small" style="width: 150px"></el-input>
                  </el-form-item>
                  <el-form-item
                    :label="'优惠金额'"
                    :key="domain.key + '2'"
                    :prop="'domains.' + index + '.skipValue'"
                    :rules="{
                      required: true,
                      message: '参数值不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <el-input v-model="domain.skipValue" size="small" style="width: 150px"></el-input>
                  </el-form-item>
                  <el-button :key="domain.key + '3'" @click.prevent="removeDomain(domain)" 
                  type="danger" size="small" style="margin-top:5px"
                    >删除</el-button
                  >
                </template>
              </el-form>
            </template>
          </RdForm>
          <div class="btn-wrapper">
            <el-button type="primary" size="small" @click="submitAddForm('dataForm3')">保存</el-button>
          </div>
          </div>
      </full-dialog>

  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
export default {
  name:"new-coupon",
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
          prop: "couponName",
          element: "el-input",
          placeholder: "请输入",
          label: "优惠券名称"
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
          prop: "subjectId",
          element: "el-select",
          placeholder: "请选择",
          label: "科目名称",
          options: [
          ],
          filterable: true,
          multiple: true,
          events: {

          }
        },
        {
          prop: "classTypeId",
          element: "el-select",
          placeholder: "请选择",
          label: "班型名称",
          options: [
          ],
          multiple: true,
          filterable: true,
          events: {

          }
        },
        {
          prop: "courseId",
          element: "el-select",
          placeholder: "请选择",
          label: "课程名称",
          options: [
          ],
          filterable: true,
          multiple: true,
          events: {

          }
        },
        {
          prop: "frontClassTypeId",
          element: "el-select",
          placeholder: "请选择",
          label: "前置班型",
          options: [
          ],
          filterable: true,
          multiple: true,
          events: {

          }
        },
        {
          prop: "campusId",
          element: "el-select",
          placeholder: "请选择",
          label: "指定校区",
          options: [
          ],
          filterable: true,
          multiple: true
        },
        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "开始时间",
          endPlaceholder: "结束时间",
          initWidth: true,
          label: "时间"
        },
        {
          prop: "couponType",
          element: "el-select",
          placeholder: "请选择",
          label: "优惠类型",
          options: [
          ],
          events: {

          }
        },
        //9
        {
          prop: "fullPrice",
          element: "el-input",
          placeholder: "请选择",
          label: "满减金额",
          hide: true
        },
        //10
        {
          prop: "faceValue",
          element: "el-input",
          placeholder: "请选择",
          label: "优惠金额",
          hide: true
        },
        //11
        {
          prop: "couponRate",
          element: "el-input",
          placeholder: "请选择",
          label: "折扣百分比",
          hide: true
        },
        //12
         {
          prop: "addSkip",
          element: "el-input",
          placeholder: "请选择",
          label: "梯度优惠",
          hide: true,
          operate: true
        },
        //13
        {
          prop: "couponNum",
          element: "el-input",
          placeholder: "请输入",
          label: "优惠券数量"
        },
        //14
        {
          prop: "studentType",
          element: "el-select",
          placeholder: "请选择",
          label: "学员类型",
          options: [
          ],
        },
        // 15
        {
          prop: "superposition",
          element: "el-select",
          placeholder: "请选择",
          label: "可否叠加",
          options: [
            {
              label:"不能叠加",
              value: '0'
            },
            {
              label:"能叠加",
              value: '1'
            }
          ],
        },
        // 16
        {
          prop: "couponStatus",
          element: "el-select",
          placeholder: "请选择",
          label: "优惠券状态",
          options: [
          ],
        },
        {
          prop: "remark",
          element: "el-input",
          placeholder: "请输入",
          label: "使用说明",
          type: "textarea",
          rows: 3
        },
      ],
      addRules:{
        couponName: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        productId: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        couponType: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        couponNum: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        superposition: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        couponStatus: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        remark: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        faceValue: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
         fullPrice: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
         couponRate: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
      },
      addStatus: true,
      editId:"",
      currentProductId:"",
      // 多选： 科目名称，班型名称，课程名称，前置班型，指定校区
      subjectArr: [],
      classTypeArr:[],
      courseArr:[],
      frontClassTypeArr:[],
      campusArr:[],
      dynamicValidateForm: {
        domains: [
          {
            skipKey: "",
            skipValue: "",
          },
        ],
      },
    }
  },
  components:{
    RdForm
  },
  mounted(){
      this.getTableData();
      this.getCampuseList();
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
        
         this.addFormOptions[1].options = res.data.productList.map(item => ({
            label: item.productName,
            value: item.id
        }))
         this.addFormOptions[8].options = res.data.couponTypeList.map(item => ({
            label: item.value,
            value: item.key
        }))
         this.addFormOptions[14].options = res.data.studentTypeList.map(item => ({
            label: item.value,
            value: item.key
        }))
        this.addFormOptions[16].options = res.data.couponStatusList.map(item => ({
            label: item.value,
            value: item.key
        }))
        this.addFormOptions[1].events = {
          change: this.productChange
        }
        this.addFormOptions[2].events = {
          change: this.subjectChange
        }
        this.addFormOptions[3].events = {
          change: this.classChange
        }
         this.addFormOptions[8].events = {
           change: this.couponTypeChange
         }
        
      })
     },
     productChange(val){
       this.currentProductId = val;
      //  获取科目下拉
      this.$fetch("coupontemplateversiontwo_subjectList",{productId: val}).then(res => {
        this.subjectArr = res.data.list.map(item => ({
          label: item.subjectName,
          value: item.id
        }));
        this.addFormOptions[2].options = this.subjectArr;
      })
    },
    subjectChange(val){
       //  获取班型下拉
      this.$fetch("coupontemplateversiontwo_getClassListSelects",{
        subjectIds: val instanceof Array? val.join(","): val,
        productId: this.currentProductId
        }).then(res => {
        this.classTypeArr = res.data.dataJson.list.map(item => ({
          label: item.name,
          value: item.value
        }));
        this.frontClassTypeArr = this.classTypeArr;
        this.addFormOptions[3].options = this.classTypeArr;
        this.addFormOptions[5].options = this.classTypeArr;
      })
    },
    classChange(val){
      // 获取课程下拉
      this.$fetch("coupontemplateversiontwo_getCourseListSelects",{
          classTypeIds: val instanceof Array? val.join(","): val,
        }).then(res => {
          this.courseArr = res.data.dataJson.list.map(item => ({
            label: item.name,
            value: item.value
          }));
          this.addFormOptions[4].options = this.courseArr;
      })
    },
    couponTypeChange(val){
      // console.log(val,'couponchange')
      if(val == 'AllDisCount'){
        this.addFormOptions[10].hide = false;
        this.addFormOptions[9].hide = true;
        this.addFormOptions[11].hide = true;
        this.addFormOptions[12].hide = true;
      }else if(val == 'FullDisCount'){
        this.addFormOptions[9].hide = false;
        this.addFormOptions[10].hide = false;
        this.addFormOptions[11].hide = true;
        this.addFormOptions[12].hide = true;
      }else if(val == 'RageDisCount'){
        this.addFormOptions[11].hide = false;
        this.addFormOptions[9].hide = true;
        this.addFormOptions[10].hide = true;
        this.addFormOptions[12].hide = true;
      }else if(val == 'GradientDisCount'){
        this.addFormOptions[12].hide = false;
        this.addFormOptions[9].hide = true;
        this.addFormOptions[11].hide = true;
        this.addFormOptions[10].hide = true;
      }
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
    getMulInfo(selIds, arr){
      if(!selIds){
        return []
      }
      //选中的id selIds， 整个下拉，
      const currentArr = [];
      // selIds.forEach(item => {
      //   let obj = arr.find(ele => (ele.value == item));
      //   let name = obj.label;
      //   currentArr.push({
      //     name,
      //     val: item
      //   })
      // })
      for(let item of selIds){
        let obj = arr.find(ele => (ele.value == item));
        if(!obj){
          return;
        }
        let name = obj.label;
        currentArr.push({
          name,
          val: item
        })
      }
      return currentArr;
    },
    submitAddForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          this.$refs.dynamicValidateForm.validate((valid) => {
            if (valid) {
              console.log(this.dynamicValidateForm,'99')
              const { time,campusId,classTypeId,courseId,frontClassTypeId,subjectId } = formData;
              let campusInfo = this.getMulInfo(campusId,this.campusArr);
              let classTypeInfo = this.getMulInfo(classTypeId,this.classTypeArr);
              let courseInfo = this.getMulInfo(courseId,this.courseArr);
              let frontClassTypeInfo = this.getMulInfo(frontClassTypeId,this.frontClassTypeArr);
              let subjectInfo = this.getMulInfo(subjectId,this.subjectArr);
              this.$fetch(this.addStatus?"coupontemplateversiontwo_save":"coupontemplateversiontwo_editJsp",{
                ...formData,
                time:'',
                startTime: time?time[0]:'',
                endTime: time?time[1]:'',
                campusId: campusId&&campusId.join(','),
                classTypeId: classTypeId&&classTypeId.join(','),
                courseId: courseId&&courseId.join(','),
                frontClassTypeId: frontClassTypeId&&frontClassTypeId.join(','),
                subjectId: subjectId&&subjectId.join(','),
                campusInfo: JSON.stringify(campusInfo),
                classTypeInfo: JSON.stringify(classTypeInfo),
                courseInfo: JSON.stringify(courseInfo),
                frontClassTypeInfo: JSON.stringify(frontClassTypeInfo),
                subjectInfo: JSON.stringify(subjectInfo),
                id: this.addStatus?"":this.editId,
                gradientInfoMap: JSON.stringify(this.dynamicValidateForm.domains.map(item => ({
                  key: item.skipKey,
                  value: item.skipValue
                })))
              }).then(res => {
                this.$message.success("操作成功")
                this.addVisible = false;
                this.getTableData();
              })
            } else {
              return false;
            }
          });
        }
          
      });
    },
    //  获取校区列表
     getCampuseList(){
       return new Promise((resolve) => {
         this.$fetch("chance_config_campusList").then(res => {
          this.campusArr = res.data.data.map(item => (
            {
            label: item.campusName,
            value: item.id
          }
          ));
          this.addFormOptions[6].options = this.campusArr;
          resolve();
        })
       })
     },
    handleEdit(data){
      this.addVisible = true;
      this.addStatus = false;
      this.$fetch("coupontemplateversiontwo_goEdit",{
        id: data.id
      }).then(async (res) => {
        const { 
          pd,campusIdStr,classTypeIdStr,frontClassTypeIdStr,subjectIdStr,courseIdStr,
          subjectList,classList,courseList,campusList
        } = res.data;
        const { productId,couponType,gradientInfo } = pd;
        // 获取下拉
        console.log(productId,'productId---')
        productId&&this.productChange(productId);
        subjectIdStr&&this.subjectChange(subjectIdStr);
        classTypeIdStr&&this.classChange(classTypeIdStr);
        
        // 赋值
         this.addFormOptions.forEach(item => {
          item.initValue = pd[item.prop];
          if(item.prop == 'couponType'){
             this.couponTypeChange(couponType)
             if(gradientInfo){
               this.dynamicValidateForm.domains = JSON.parse(gradientInfo).map(item => ({
                 skipValue: item.value,
                 skipKey: item.key
               }))
             }else {
               this.dynamicValidateForm.domains = [];
             }
             
           }
           if(item.prop == 'superposition'){
             item.initValue = pd.superposition?'1':'0'
           }
           if(item.prop == 'productId'){
             
           }
           if(item.prop == 'subjectId'){
             item.initValue = subjectIdStr&&subjectIdStr.split(',').map(item => Number(item) || '')
           }
           if(item.prop == 'classTypeId'){
             item.initValue = classTypeIdStr&&classTypeIdStr.split(',').map(item => Number(item) || '')
           }
           if(item.prop == 'courseId'){
             item.initValue = courseIdStr&&courseIdStr.split(',')
           }
           if(item.prop == 'frontClassTypeId'){
             item.initValue = frontClassTypeIdStr&&frontClassTypeIdStr.split(',').map(item => Number(item) || '')
           }
           if(item.prop == 'campusId'){
             item.initValue = campusIdStr&&campusIdStr.split(',').map(item => Number(item) || '')
           }
        })

        setTimeout(() => {
          this.$refs.dataForm3.addInitValue();
        }, 300);
      })
      
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
          const res = await this.$fetch("coupontemplateversiontwo_deleteJsp", {
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
    handleClose(){
      this.addVisible = false;
      this.$refs.dataForm3&&this.$refs.dataForm3.onReset();
      this.dynamicValidateForm.domains = [];
    },
     removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        skipKey: "",
        skipValue: "",
        key: Date.now(),
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.new-coupon {
  .add-form-container {
    .btn-wrapper {
      text-align: right;
    }
    /deep/ {
      .el-form--inline .el-form-item .el-form-item__content {
        width: 150px;
      }
    }
  }
}
</style>
