<template>
  <div class="follow-info">
    <div class="contain">
      <div class="info-tab">
        <!-- 列表信息 -->
        <h3>跟进情况</h3>
        <el-timeline>
          <el-timeline-item v-for="(item,index) in list" :key="index" placement="top">
            <div class="item-li" @click="clickItem(item)">
              <div class="flex-box">
                <span class="count">第{{item.count}}次</span>
                <span class="inputer">操作人：{{item.name}}</span>
                <span class="time">
                  更新时间：{{item.time }}
                  <i
                    class="el-icon-arrow-right is-click"
                    v-if="drawer && ruleForm.id == item.id"
                  ></i>
                </span>
              </div>
              <div class="flex-box danger" v-if="index == 3">
                <i class="el-icon-warning">开始拜访定位异常</i>
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>

      <!-- 表单信息 -->
      <div class="drawer-form" v-if="drawer">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="对接人" prop="name">
                <el-input  v-model="ruleForm.name" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码" prop="phone">
                <el-input  maxlength="11" v-model="ruleForm.phone" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="职位" prop="job">
                <el-input v-model="ruleForm.job" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="跟进情况" prop="situation">
            <el-input type="textarea" v-model="ruleForm.situation" readonly></el-input>
          </el-form-item>
          <el-form-item label="达成结果" prop="result">
            <el-input type="textarea" v-model="ruleForm.result" readonly></el-input>
          </el-form-item>

          <el-form-item label="上次回访" prop="time">
            <el-input v-model="ruleForm.time" readonly></el-input>
          </el-form-item>

          <el-form-item prop="time">
            <div class="block">
              <span class="demonstration">图片</span>
            </div>
            <div class="demo-image__preview">
              <el-image style="width: 100px; height: 100px" :src="ruleForm.nowPhoto"></el-image>
            </div>
          </el-form-item>

          <el-form-item prop="beginImg " class="imageList">
            <div class="flex-inline">
              <span class="demonstration">开始拜访</span>
              <div class="demo-image__preview">
                <el-image style="width: 100px; height: 100px" :src="ruleForm.beginImg"></el-image>
              </div>
              <div>
                <i class="el-icon-location">{{ruleForm.beginAddr}}</i>
              </div>
              <div>
                  时间:{{ruleForm.beginTime}}
              </div>
            </div>
            
            <div class="flex-inline">
              <span class="demonstration">结束拜访</span>
              <div class="demo-image__preview">
                <el-image style="width: 100px; height: 100px" :src="ruleForm.endImg"></el-image>
              </div>
              <div>
                <i class="el-icon-location">{{ruleForm.beginAddr}}</i>
              </div>
              <div>
                  时间:{{ruleForm.beginTime}}
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import RdTree from "@/components/RdTree";
import searchForm from "@/components/Searchform";
import axios from "axios";
import Common from "@/utils/common";
import uploadFile from "@/components/Activity/uploadFile";
export default {
  name: "temp",
  data() {
    return {
      list: [
        {
          id: 4,
          count: 1,
          name: "飞翔的荷兰人",
          phone: 12345678910,
          job: "负责人",
          situation: "跟进情况",
          result: "达成结果",
          time: "2021-01-01 12：00",
          nowPhoto:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2867258487,3621741239&fm=26&gp=0.jpg",
          beginImg:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2867258487,3621741239&fm=26&gp=0.jpg",
          beginAddr: "HIMONDAY产业园—B栋",
          beginTime: "2021-01-01 12：00",
          endImg:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2867258487,3621741239&fm=26&gp=0.jpg",
          endAddr: "2021-01-01 12：00",
          endTime: "HIMONDAY产业园—A栋",
          isNowStrike: true,
        },
        {
          id: 3,
          count: 1,
          name: "飞翔的荷兰人",
          phone: 12345678910,
          job: "负责人",
          situation: "跟进情况",
          result: "达成结果",
          time: "2021-01-01 12：00",
          nowPhoto:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2867258487,3621741239&fm=26&gp=0.jpg",
          beginImg:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2867258487,3621741239&fm=26&gp=0.jpg",
          beginAddr: "HIMONDAY产业园—B栋",
          beginTime: "2021-01-01 12：00",
          endImg:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2867258487,3621741239&fm=26&gp=0.jpg",
          endAddr: "2021-01-01 12：00",
          endTime: "HIMONDAY产业园—A栋",
          isNowStrike: true,
        },
        {
          id: 2,
          count: 1,
          name: "飞翔的荷兰人",
          phone: 12345678910,
          job: "负责人",
          situation: "跟进情况",
          result: "达成结果",
          time: "2021-01-01 12：00",
          nowPhoto:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2867258487,3621741239&fm=26&gp=0.jpg",
          beginImg:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2867258487,3621741239&fm=26&gp=0.jpg",
          beginAddr: "HIMONDAY产业园—B栋",
          beginTime: "2021-01-01 12：00",
          endImg:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2867258487,3621741239&fm=26&gp=0.jpg",
          endAddr: "2021-01-01 12：00",
          endTime: "HIMONDAY产业园—A栋",
          isNowStrike: true,
        },
        {
          id: 1,
          count: 1,
          name: "飞翔的荷兰人",
          phone: 12345678910,
          job: "负责人",
          situation: "跟进情况",
          result: "达成结果",
          time: "2021-01-01 12：00",
          nowPhoto:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2867258487,3621741239&fm=26&gp=0.jpg",
          beginImg:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2867258487,3621741239&fm=26&gp=0.jpg",
          beginAddr: "HIMONDAY产业园—B栋",
          beginTime: "2021-01-01 12：00",
          endImg:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2867258487,3621741239&fm=26&gp=0.jpg",
          endAddr: "2021-01-01 12：00",
          endTime: "HIMONDAY产业园—A栋",
          isNowStrike: true,
        },
      ],
      drawer: false,
    //   id: "",

      ruleForm: {
        id: "",
        name: "",
        phone: "",
        job: "",
        situation: "",
        result: "",
        time: "",
        nowPhoto: "",
        beginImg: "",
        beginAddr: "",
        beginTime: "",
        endImg: "",
        endAddr: "",
        endTime: "",
      },
    //   rules: {
    //     name: [{ required: true, message: "请输入", trigger: "blur" }],
    //     phone: [
    //       { required: true, message: "请输入", trigger: "blur" },
    //       { validator: Common._validatorPhone, trigger: "blur" },
    //     ],
    //     job: [{ required: true, message: "请输入", trigger: "blur" }],
    //     situation: [{ required: true, message: "请输入", trigger: "blur" }],
    //     result: [{ required: true, message: "请输入", trigger: "blur" }],
    //     time: [{ required: true, message: "请输入", trigger: "blur" }],
    //     nowPhoto: [{ required: true, message: "请输入", trigger: "blur" }],
    //   },
    };
  },
  methods: {
    clickItem(item) {
      console.log("123");
      this.drawer = true;
      this.ruleForm = item;
    },
  },
};
</script>

<style lang="scss" scoped>
// 公共样式
.flex-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.danger {
  height: 16px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 600;
  color: #ec5b56;
  margin-top: 10px;
}
.flex-inline{
    display: inline-block;
    margin-right: 30px;
}

// 结构样式
.follow-info {
  background: #fff;
  padding: 0px 40px;
  //   min-width: 1350px;
  ul {
    .count {
      background: #448ef7;
      border-radius: 15px 2px 15px 15px;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      text-align: center;
      padding: 7px 15px;
    }

    .inputer {
      height: 16px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333333;
    }
    .time {
      height: 16px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #666666;
      .is-click {
        margin-left: 20px;
      }
    }

    .item-li {
      background: #f6faff;
      border: 1px solid #448ef7;
      box-shadow: 0px 8px 24px 0px rgba(68, 142, 247, 0.15);
      border-radius: 6px;
      padding: 20px 15px 20px 20px;
    }
  }
  .contain {
    display: flex;
    .info-tab {
      flex: 1;
    }
    .drawer-form {
      flex: 1;
      margin-left: 38px;
      padding: 60px 38px;
      border-left: 1px solid #eee;
    }
  }
  
}
</style>
