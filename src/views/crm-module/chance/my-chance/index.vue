<template>
  <div class="my-chance-container">
    <!-- 全屏弹窗 -->
    <fullDialog
      v-model="showDetail"
      title="查看活动详情"
      @change="fullDialogChange"
    >
      <activityDetail :detailPhone="detailPhone"/>
    </fullDialog>
    <!-- 上部的总数 -->
    <div class="top-total w-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="私海客户" name="first"></el-tab-pane>
        <el-tab-pane label="公海客户" name="second"></el-tab-pane>
        <el-tab-pane label="锁定客户" name="third"></el-tab-pane>
      </el-tabs>
      <div class="card-wrapper">
        <el-row :gutter="12">
          <el-col :span="4">
            <el-card shadow="hover">
              <div class="call-total">
                <div class="call-title">今日有效呼叫</div>
                <div class="call-content">{{totalObj.yxhj}}</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover">
              <div class="call-total">
                <div class="call-title">今日呼叫总数</div>
                <div class="call-content">{{totalObj.hjzs}}</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover">
              <div class="call-total">
                <div class="call-title">未接通</div>
                <div class="call-content">{{totalObj.wjt}}</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover">
              <div class="call-total">
                <div class="call-title">总时长(s)</div>
                <div class="call-content">{{totalObj.zsc}}</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card shadow="hover">
              <div class="call-total">
                <div class="call-title">平均时长(s)</div>
                <div class="call-content">{{totalObj.pjsc}}</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-select v-model="chanceValue" placeholder="请选择" @change="chanceChange">
              <el-option
                v-for="item in chanceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="main mt-15">
      <!-- 左侧表格 -->
      <div class="main-left w-container">
        <div v-show="tabIndex == '0'">
          <privateCustomers
            @currentChange="currentChange"
            @refresh="refreshForm"
            :newFormOptions="formOptions"
            ref="privateCustomers"
          />
        </div>
        <div v-show="tabIndex == '1'">
          <publicCustomers @currentChange="currentChange"
          @refresh="refreshForm"
            :newFormOptions="formOptions"
            ref="publicCustomers"/>
        </div>
        <div v-show="tabIndex == '2'">
          <lockUser ref="lockUser" @currentChange="currentChange"
          @refresh="refreshForm"
            :newFormOptions="formOptions"/>
        </div>
      </div>
      <!-- 右侧表单 -->
      <div class="main-right w-container">
        <div class="contact">
          <div class="contact-title">
            <span>联系电话：</span
            ><span style="color: red; font-weight: bold">{{
              $common.hidePhone(currentPhone)
            }}</span>
          </div>
          <el-form
            ref="dataForm"
            :model="basicInfo"
            :rules="rules"
            :label-width="formLabelWidth"
          >
            <el-form-item label="跟进状态" prop="status">
              <el-select
                v-model="basicInfo.status"
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="item in statusArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="下次联系" prop="nextTime">
              <el-date-picker
                v-model="basicInfo.nextTime"
                type="datetime"
                placeholder="选择日期时间"
                :picker-options="startDateDisabled"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="跟进详情" prop="detail">
              <el-input
                v-model.trim="basicInfo.detail"
                autocomplete="off"
                type="textarea"
                placeholder="请输入"
                size="small"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size="small"
                @click="submitForm('dataForm')"
                class="fr"
                >确定</el-button
              >
            </el-form-item>
          </el-form>
          <div class="contact-title">
            <span>基本资料</span>&nbsp;&nbsp;&nbsp;<el-button
              type="warning"
              size="small"
              @click="handleDetail"
              >点击查看参与活动详情</el-button
            >
          </div>
          <el-form
            ref="dataForm2"
            :model="basicInfo2"
            :rules="rules2"
            :label-width="formLabelWidth"
          >
            <el-form-item label="机会来源" prop="saleSource">
              <el-input
                v-model.trim="basicInfo2.saleSource"
                autocomplete="off"
                size="small"
                readonly
              />
            </el-form-item>
            <el-form-item label="活动名称" prop="labelInfoName">
              <el-input
                v-model.trim="basicInfo2.labelInfoName"
                autocomplete="off"
                size="small"
                readonly
              />
            </el-form-item>
            <el-row :gutter="5">
              <el-col :span="12">
                <el-form-item label="注册人" prop="createStaffName">
                  <el-input
                    v-model.trim="basicInfo2.createStaffName"
                    autocomplete="off"
                    size="small"
                    readonly
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12"
                ><el-form-item label="赛道" prop="opportunityCampusNature">
                  <el-input
                    v-model.trim="basicInfo2.opportunityCampusNature"
                    autocomplete="off"
                    size="small"
                    readonly
                  /> </el-form-item
              ></el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="12">
                <el-form-item label="学员姓名" prop="studentName">
                  <el-input
                    v-model.trim="basicInfo2.studentName"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12"
                ><el-form-item label="性别" prop="gender">
                  <el-select v-model="basicInfo2.gender" placeholder="请选择">
                    <el-option label="男" value="Male"> </el-option>
                    <el-option label="女" value="Female"> </el-option>
                    <el-option label="未知" value="Unknow"> </el-option>
                  </el-select> </el-form-item
              ></el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="12">
                <el-form-item label="学历" prop="eduBackground">
                  <el-select
                    v-model="basicInfo2.eduBackground"
                    placeholder="请选择"
                  >
                    <el-option
                      :label="item.label"
                      :value="item.value"
                      v-for="item in eduArr"
                      :key="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12"
                ><el-form-item label="咨询项目" prop="enquireProductIdOne">
                  <el-select
                    v-model="basicInfo2.enquireProductIdOne"
                    placeholder="请选择"
                    @change="productChange"
                  >
                    <el-option
                      :label="item.label"
                      :value="item.value"
                      v-for="item in productArr"
                      :key="item.value"
                    >
                    </el-option>
                  </el-select> </el-form-item
              ></el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="12">
                <el-form-item label="咨询科目" prop="enquireSubjectIdOne">
                  <el-select
                    v-model="basicInfo2.enquireSubjectIdOne"
                    placeholder="请选择"
                    @change="subjectChange"
                  >
                    <el-option
                      :label="item.label"
                      :value="item.value"
                      v-for="item in subjectArr"
                      :key="item.value"
                    >
                    </el-option>
                  </el-select> 
                </el-form-item>
              </el-col>
              <el-col :span="12"
                ><el-form-item label="咨询课程" prop="enquireCourseIdOne">
                  <el-select
                    v-model="basicInfo2.enquireCourseIdOne"
                    placeholder="请选择"
                  >
                    <el-option
                      :label="item.label"
                      :value="item.value"
                      v-for="item in courseArr"
                      :key="item.value"
                    >
                    </el-option>
                  </el-select> 
                  </el-form-item
              ></el-col>
            </el-row>
            <el-form-item label="咨询班型" prop="enquireClassOne">
              <el-select
                    v-model="basicInfo2.enquireClassOne"
                    placeholder="请选择"
                    multiple
                  >
                    <el-option
                      :label="item.label"
                      :value="item.value"
                      v-for="item in classArr"
                      :key="item.value"
                    >
                    </el-option>
                  </el-select> 
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size="small"
                @click="submitForm2('dataForm2')"
                class="fr"
                >确定</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import activityDetail from "./detail";
import privateCustomers from "./privateCustomers";
import publicCustomers from "./publicCustomers";
import lockUser from "./lockUser";
import fullDialog from "@/components/FullDialog";
import Fetch from '@/utils/fetch'
import { scrollTo } from '@/utils/scroll-to'
import chanceSelect from '@/utils/chance-select'
export default {
  name: "my-chance",
  data() {
    return {
      startDateDisabled:{},
      currentData: {},
      showDetail: false,
      activeName: "first",
      chanceValue: "全部",
      chanceOptions: [
        {
          value: "全部",
          label: "全部",
        },
        {
          value: "手机外呼",
          label: "手机外呼",
        },
        {
          value: "在线外呼（总部）",
          label: "在线外呼（总部）",
        },
        {
          value: "在线外呼（分校）",
          label: "在线外呼（分校）",
        },
         {
          value: "一键回呼",
          label: "一键回呼",
        },
      ],
      formLabelWidth: "80px",
      statusArr: [],
      eduArr: [],
      productArr: [],
      subjectArr:[],
      courseArr:[],
      classArr:[],
      basicInfo: {
        status: "",
        nextTime: "",
        detail: "",
      },
      basicInfo2: {
        status: "",
        nextTime: "",
        detail: "",
      },
      rules: {
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
        nextTime: [
          { required: true, message: "请选择下次联系时间", trigger: "blur" },
        ],
        detail: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      rules2: {
        eduBackground: [{ required: true, message: "请选择", trigger: "blur" }],
        enquireProductIdOne: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
        enquireSubjectIdOne: [{ required: true, message: "请选择", trigger: "blur" }],
        enquireCourseIdOne: [{ required: true, message: "请选择", trigger: "blur" }],
        enquireClassOne: [{ required: true, message: "请选择", trigger: "blur" }],
      },
      tabIndex: "0",
      currentPhone: "",
      formOptions: [],
      totalObj:{},
      detailPhone:""
    };
  },
  components: {
    activityDetail,
    fullDialog,
    privateCustomers,
    publicCustomers,
    lockUser,
  },
  created(){
    // 限制开始日期不能超过当前日期
    this.startDateDisabled.disabledDate = function (time) {
      return (time.getTime() ) < Date.now()
    }
  },
  mounted() {
    this.getSelectList();
    this.getProjcetList();
    this.chanceChange("全部");
  },
  watch:{
    showDetail(val){
      if(val){
        this.detailPhone = this.currentPhone;
      }
    }
  },
  methods: {

    chanceChange(val){
      this.$fetch("chance_my_info",{
        callType: val
      }).then(res => {
        if(res.code == 200){
          this.totalObj = JSON.parse(res.msg);
        }
      })
    },
    handleClick(tab, event) {
      console.log(tab.index, "click");
      this.tabIndex = tab.index;
    },

    fullDialogChange(val) {
      this.showDetail = val;
    },

    currentChange(val) {
      console.log(val, "vallll");
      if(!val){
        return;
      }
      this.currentData = val;
      this.currentPhone = val.phone;
      this.basicInfo = {
        status: val.status_text,
        nextTime: "",
        detail: "",
      };
      const {
        saleSource,
        labelInfoName,
        createStaffName,
        opportunityCampusNature,
        studentName,
        eduBackground_text,
        gender_text,
        enquireProductIdOne,
        enquireSubjectIdOne,
        enquireCourseIdOne,
        enquireClassOne,
      } = this.currentData;
      this.getSubjectList(enquireProductIdOne);
      this.getCourseList(enquireSubjectIdOne);
      this.getClassList(enquireSubjectIdOne);
      console.log(enquireClassOne,'enquireClassOne')
      this.basicInfo2 = {
        saleSource,
        labelInfoName,
        createStaffName,
        opportunityCampusNature,
        gender: gender_text,
        studentName,
        eduBackground: eduBackground_text,
        enquireProductIdOne,
        enquireSubjectIdOne,
        enquireCourseIdOne,
        enquireClassOne: enquireClassOne&&enquireClassOne.map(item => Number((item.val || item.value)))
      };
      
    },

    submitForm(formName) {
      if (!this.currentPhone) {
        this.$message({
          message: "请选择具体的商机哦！温馨提示：点击列表行即可选中",
          type: "warning",
        });
        return;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.basicInfo, "提交");
          const {
            idStr,
            feedbackCount,
            studentName,
            marketName,
            marketStaffId,
          } = this.currentData;
          const { detail, nextTime, status } = this.basicInfo;
          let param = {
            opportunityId: idStr,
            feedbackCount,
            studentName,
            marketName,
            marketStaffId,
            dingdingUserId: 15853048553839257,
            status,
            nextDate: this.$common._formatDates(nextTime)+':00',
            content: detail,
          };
          this.$fetch("chance_saveData", param).then((res) => {
            if(res.code == 200 || res.code == 1){
              this.$message.success("保存成功")
              this.refreshTable();
              this.$refs[formName].resetFields();
            }
          });
        }
      });
    },

    submitForm2(formName) {
      if (!this.currentPhone) {
        this.$message({
          message: "请选择具体的商机哦！温馨提示：点击列表行即可选中",
          type: "warning",
        });
        return;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.basicInfo2, "提交--basicInfo2");
          const {enquireClassOne,enquireProductIdOne,enquireSubjectIdOne,enquireCourseIdOne,eduBackground,gender } = this.basicInfo2;
          const {
            idStr,
            feedbackCount,
            studentName,
            marketName,
            marketStaffId,
            phone
          } = this.currentData;
          let newEnquireClassOne = [];
          enquireClassOne.forEach(item => {
            let obj = this.classArr.find(ele  => ele.value == item);
            newEnquireClassOne.push({
              name: obj.label,
              val: obj.value
            })
          })
          let productName = this.productArr.find(item => (item.value == enquireProductIdOne)).label;
          let subjectName = this.subjectArr.find(item => (item.value == enquireSubjectIdOne)).label;
          let courseName = this.courseArr.find(item => (item.value == enquireCourseIdOne)).label;
          
          this.$fetch("chance_editData",{
            
            id: idStr,
            enquireProductIdOne,
            enquireProductNameOne: productName,
            enquireSubjectIdOne,
            enquireSubjectNameOne: subjectName,
            enquireClassOne: JSON.stringify(newEnquireClassOne),
            enquireCourseIdOne,
            enquireCourseNameOne: courseName,
            phoneFlag: phone,
            enquireProductIdOneFlag: enquireProductIdOne,
            studentName,
            eduBackground,
            productId: enquireProductIdOne,
            undefined: enquireClassOne.join(","),
            gender
          }).then(res => {
            if(res.code == 200){
              this.$message.success("保存成功")
              this.refreshTable();
            }
          })
        }
      });
    },

    refreshTable(){
      if(this.tabIndex == '0'){
        this.$refs.privateCustomers.getTableData();
      }else if(this.tabIndex == '1'){
        this.$refs.publicCustomers.getTableData();
      }else if(this.tabIndex == '2'){
        this.$refs.lockUser.getTableData();
      }
    },

    // 清空右侧表单
    refreshForm(){
      this.$refs.dataForm.resetFields();
      this.$refs.dataForm2.resetFields();
    },

    handleDetail() {
      if (!this.currentPhone) {
        this.$message({
          message: "请选择具体的商机哦！温馨提示：点击列表行即可选中",
          type: "warning",
        });
        return;
      }
      this.showDetail = true;
      scrollTo(0, 500)
    },

    getSelectList() {
      Promise.all(
        [
          this.$fetch("chance_source_list"),
          this.$fetch("chance_edu_list"),
          this.$fetch("chance_status_list"),
          this.$fetch("chance_call_status")
        ].map((p) => {
          return p.catch((error) => error);
        })
      ).then((result) => {
        let sourceOptions = result[0].data.map((item) => ({
          label: item.value,
          value: item.key,
        }));
        let eduOptions = result[1].data.map((item) => ({
          label: item.value,
          value: item.key,
        }));
        this.eduArr = eduOptions;
        let statusOptions = result[2].data.map((item) => ({
          label: item.value,
          value: item.key,
        }));
        this.statusArr = statusOptions;
        let callStatusOptions = result[3].data.map((item) => ({
          label: item.value,
          value: item.key,
        }));
        let orderOptions = [
          {
            label: "按照创建时间正序查询",
            value: "按照创建时间正序查询",
          },
          {
            label: "按照创建时间逆序查询",
            value: "按照创建时间逆序查询",
          },
          {
            label: "按照回收时间正序查询",
            value: "按照回收时间正序查询",
          },
          {
            label: "按照回收时间逆序查询",
            value: "按照回收时间逆序查询",
          },
          {
            label: "按照最近回访时间正序查询",
            value: "按照最近回访时间正序查询",
          },
          {
            label: "按照最近回访时间逆序查询",
            value: "按照最近回访时间逆序查询",
          },
          {
            label: "按照分配时间正序查询",
            value: "按照分配时间正序查询",
          },
          {
            label: "按照分配时间逆序查询",
            value: "按照分配时间逆序查询",
          },
        ];
        this.formOptions = [
          {
            prop: "studentName",
            element: "el-input",
            placeholder: "学员姓名",
          },
          {
            prop: "phone",
            element: "el-input",
            placeholder: "学员手机",
          },
          {
            prop: "labelInfoName",
            element: "el-input",
            placeholder: "活动名",
          },
          {
            prop: "eduBackground",
            element: "el-select",
            placeholder: "学历",
            options: eduOptions,
          },
          {
            prop: "status",
            element: "el-select",
            placeholder: "机会状态",
            options: statusOptions,
          },
          {
            prop: "saleSource",
            element: "el-select",
            placeholder: "机会来源",
            options: sourceOptions,
          },
          {
            prop: "ordeParams",
            element: "el-select",
            placeholder: "查询排序方法",
            options: orderOptions,
          },
          {
            prop: "callStatus",
            element: "el-select",
            placeholder: "呼叫状态",
            options: callStatusOptions,
          },
          chanceSelect.getProjectCascader({
            prop: "product",
            placeholder: "项目/科目/课程"
          })
        ];
      });
    },

    getProjcetList() {
      this.$fetch("chance_product_list").then((res) => {
        let data = JSON.parse(res.msg);
        let nodes = data.map((item) => ({
          value: item.id,
          label: item.productName,
        }));
        this.productArr = nodes;  
      });
    },
    getSubjectList(id){
      this.$fetch("chance_subject_list",{
                   productIdOne: id
                 }).then((res) => {
        let data = res.data.list;
        let nodes = data.map((item) => ({
          value: item.id,
          label: item.subjectName,
        }));
        this.subjectArr = nodes;  
      });
    },
    getCourseList(id){
      this.$fetch("chance_course_list",{
                   subjectIdOne: id
                 }).then((res) => {
        let data = JSON.parse(res.msg);
        let nodes = data.map((item) => ({
          value: item.id,
          label: item.courseName,
        }));
        this.courseArr = nodes;  
      });
    },
    getClassList(id){
      //  this.classArr = [
      //    {
      //      label: "护士资格精品班网课",
      //      value: "173"
      //    },
      //    {
      //      label: "护士资格金牌通关班网课",
      //      value: "176"
      //    }
      //  ]
      this.$fetch("chance_class_list",{
                   subjectIdOne: id
                 }).then((res) => {
        let data = JSON.parse(res.msg);
        let nodes = data.map((item) => ({
          value: item.id,
          label: item.className,
        }));
        this.classArr = nodes;  
      });
    },
    productChange(val){
      if(!val){
        return;
      }
      this.getSubjectList(val);
      this.basicInfo2.enquireSubjectIdOne = null;
    },
    subjectChange(val){
      if(!val){
        return;
      }
      this.getCourseList(val);
      this.getClassList(val);
      this.basicInfo2.enquireCourseIdOne = null;
      this.basicInfo2.enquireClassOne = null;
    }
  },
};
</script>

<style lang='scss' scoped>
.my-chance-container {
  .top-total {
    padding-top: 6px;
    .card-wrapper {
      display: flex;
      & > div {
        flex: 1;
      }
      .call-total {
        .call-title {
          font-size: 12px;
          color: #999;
        }
        .call-content {
          font-size: 30px;
          font-weight: 300;
          color: #ff5722;
        }
      }
      /deep/ {
        .el-card__body {
          background-color: #f8f8f8;
          border: none;
        }
      }
    }
  }
  .main {
    display: flex;
    .main-left {
      width: calc(100% - 26% - 15px);
      margin-right: 15px;
    }
    .main-right {
      width: 26%;
      .contact {
        .contact-title {
          line-height: 40px;
          border-bottom: 1px solid #eee;
          margin-bottom: 10px;
          font-size: 14px;
          font-weight: 500;
        }
        /deep/ {
          .el-form {
            // width: 90%;
          }
          .el-form-item {
            margin-bottom: 13px;
          }
          .el-form-item__error {
            line-height: 0.5;
          }
        }
      }
    }
    /deep/ {
      .el-divider--horizontal {
        margin-top: 0;
        margin-bottom: 15px;
      }
      .el-date-editor.el-input {
        width: 100%;
      }
    }
  }
}
</style>