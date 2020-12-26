<template>
  <div class="my-chance-container">
    <!-- 全屏弹窗 -->
      <fullDialog v-model="showDetail" title="查看活动详情" @change="fullDialogChange">
          <activityDetail/>
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
          <privateCustomers @currentChange="currentChange"/>
        </div>
        <div v-show="tabIndex == '1'">
          <publicCustomers/>
        </div>
        <div v-show="tabIndex == '2'">
          <lockUser/>
        </div>
      </div>
      <!-- 右侧表单 -->
      <div class="main-right w-container">
        <div class="contact">
          <div class="contact-title">
            <span>联系电话：</span><span style="color: red;font-weight: bold">{{$common.hidePhone(currentPhone)}}</span>
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
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="下次联系" prop="nextTime">
              <el-input
                v-model.trim="basicInfo.nextTime"
                autocomplete="off"
                placeholder="请选择"
                size="small"
              />
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
            :model="basicInfo"
            :rules="rules"
            :label-width="formLabelWidth"
          >
            <el-form-item label="机会来源" prop="nextTime">
              <el-input
                v-model.trim="basicInfo.nextTime"
                autocomplete="off"
                placeholder="请输入"
                size="small"
              />
            </el-form-item>
            <el-form-item label="活动名称" prop="detail">
              <el-input
                v-model.trim="basicInfo.detail"
                autocomplete="off"
                placeholder="请输入"
                size="small"
              />
            </el-form-item>
            <el-row :gutter="5">
              <el-col :span="12">
                <el-form-item label="注册人" prop="detail">
                  <el-input
                    v-model.trim="basicInfo.detail"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12"
                ><el-form-item label="赛道" prop="detail">
                  <el-input
                    v-model.trim="basicInfo.detail"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  /> </el-form-item
              ></el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="12">
                <el-form-item label="学员姓名" prop="detail">
                  <el-input
                    v-model.trim="basicInfo.detail"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12"
                ><el-form-item label="性别" prop="detail">
                  <el-input
                    v-model.trim="basicInfo.detail"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  /> </el-form-item
              ></el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="12">
                <el-form-item label="学历" prop="detail">
                  <el-input
                    v-model.trim="basicInfo.detail"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12"
                ><el-form-item label="咨询项目" prop="detail">
                  <el-input
                    v-model.trim="basicInfo.detail"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  /> </el-form-item
              ></el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="12">
                <el-form-item label="咨询科目" prop="detail">
                  <el-input
                    v-model.trim="basicInfo.detail"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12"
                ><el-form-item label="咨询课程" prop="detail">
                  <el-input
                    v-model.trim="basicInfo.detail"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  /> </el-form-item
              ></el-col>
            </el-row>
            <el-form-item label="咨询版型" prop="detail">
                  <el-input
                    v-model.trim="basicInfo.detail"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  /> </el-form-item
              >
            <el-form-item>
              <el-button
                type="primary"
                size="small"
                @click="submitForm('dataForm2')"
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
import fullDialog from '@/components/FullDialog';

export default {
  name: "my-chance",
  data() {
    return {
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
      basicInfo: {
        status: "",
        nextTime: "",
        detail: "",
      },
      rules: {
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
        nextTime: [
          { required: true, message: "请选择下次联系时间", trigger: "blur" },
        ],
        detail: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
      },
      tabIndex: "0",
      currentPhone: ""
    };
  },
  components:{
    activityDetail,
    fullDialog,
    privateCustomers,
    publicCustomers,
    lockUser
  },
 
  methods: {
    handleClick(tab, event) {
      console.log(tab.index, 'click');
      this.tabIndex = tab.index;
    },
   
    fullDialogChange(val){
      this.showDetail = val;
    },
   
    currentChange(val){
      console.log(val,'vallll')
      this.currentPhone = val.phone;
    },

    handleDetail(){
      if(!this.currentPhone){
        this.$message({
          message: '请选择具体的商机哦！温馨提示：点击列表行即可选中',
          type: 'warning'
        })
        return;
      }
      this.showDetail=true
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
    }
  }
}
</style>