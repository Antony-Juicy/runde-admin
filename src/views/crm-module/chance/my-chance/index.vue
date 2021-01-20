<template>
  <div class="my-chance-container">
    <!-- 全屏弹窗 -->
    <fullDialog
      v-model="showDetail"
      title="查看活动详情"
      @change="fullDialogChange"
    >
      <activityDetail />
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
          <el-col :span="4" v-for="item in 5" :key="item">
            <el-card shadow="hover">
              <div class="call-total">
                <div class="call-title">今日有效呼叫</div>
                <div class="call-content">0</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-select v-model="chanceValue" placeholder="请选择">
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
            :newFormOptions="formOptions"
          />
        </div>
        <div v-show="tabIndex == '1'">
          <publicCustomers />
        </div>
        <div v-show="tabIndex == '2'">
          <lockUser />
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
            :rules="rules"
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
                  <!-- <el-input
                    v-model.trim="basicInfo2.enquireProductIdOne"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  />  -->
                  <el-select
                    v-model="basicInfo2.enquireProductIdOne"
                    placeholder="请选择"
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
                  <!-- <el-input
                    v-model.trim="basicInfo2.enquireSubjectIdOne"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  /> -->
                  <el-select
                    v-model="basicInfo2.enquireSubjectIdOne"
                    placeholder="请选择"
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
                  <el-input
                    v-model.trim="basicInfo2.enquireCourseIdOne"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  /> </el-form-item
              ></el-col>
            </el-row>
            <el-form-item label="咨询班型" prop="enquireClassOne">
              <el-input
                v-model.trim="basicInfo2.enquireClassOne"
                autocomplete="off"
                placeholder="请输入"
                size="small"
              />
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

export default {
  name: "my-chance",
  data() {
    return {
      currentData: {},
      showDetail: false,
      activeName: "first",
      chanceValue: "0",
      chanceOptions: [
        {
          value: "0",
          label: "全部",
        },
        {
          value: "1",
          label: "手机外呼",
        },
        {
          value: "2",
          label: "在线外呼（总部）",
        },
        {
          value: "3",
          label: "在线外呼（总部）",
        },
      ],
      formLabelWidth: "80px",
      statusArr: [],
      eduArr: [],
      productArr: [],
      subjectArr:[],
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
      tabIndex: "0",
      currentPhone: "",
      formOptions: [],
    };
  },
  components: {
    activityDetail,
    fullDialog,
    privateCustomers,
    publicCustomers,
    lockUser,
  },
  mounted() {
    this.getSelectList();
    this.getProjcetList();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab.index, "click");
      this.tabIndex = tab.index;
    },

    fullDialogChange(val) {
      this.showDetail = val;
    },

    currentChange(val) {
      console.log(val, "vallll");
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
      this.basicInfo2 = {
        saleSource,
        labelInfoName,
        createStaffName,
        opportunityCampusNature,
        gender: gender_text,
        eduBackground: eduBackground_text,
        enquireProductIdOne,
        enquireSubjectIdOne,
        enquireCourseIdOne,
        enquireClassOne: "",
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
            id,
            feedbackCount,
            studentName,
            marketName,
            marketStaffId,
          } = this.currentData;
          const { detail, nextTime, status } = this.basicInfo;
          let param = {
            opportunityId: id,
            feedbackCount,
            studentName: "123",
            marketName,
            marketStaffId,
            dingdingUserId: 15853048553839257,
            status,
            nextDate: nextTime.getTime(),
            content: detail,
          };
          this.$fetch("chance_saveData", param).then((res) => {});
        }
      });
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
    },

    getSelectList() {
      Promise.all(
        [
          this.$fetch("chance_source_list"),
          this.$fetch("chance_edu_list"),
          this.$fetch("chance_status_list"),
          this.$fetch("chance_call_status"),
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
          {
            prop: "abc",
            element: "el-cascader",
            placeholder: "课程",

            props: {
              checkStrictly: true,
              lazy: true,
              lazyLoad(node, resolve) {
                const { level } = node;
                setTimeout(() => {
                  const nodes = Array.from({ length: level + 1 }).map(
                    (item) => ({
                      value: ++id,
                      label: `选项${id}`,
                      leaf: level >= 2,
                    })
                  );
                  // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                  resolve(nodes);
                }, 1000);
              },
            },
          },
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
                   enquireProductIdOne: id
                 }).then((res) => {
        let data = JSON.parse(res.msg);
        let nodes = data.map((item) => ({
          value: item.id,
          label: item.subjectName,
        }));
        this.subjectArr = nodes;  
      });
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