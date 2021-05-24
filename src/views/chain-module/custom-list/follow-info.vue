<template>
  <div class="follow-info">
    <div class="contain">
      <div class="info-tab">
        <!-- 列表信息 -->
        <h3>跟进情况</h3>
        <el-timeline>
          <el-timeline-item v-for="(item,index) in tableData" :key="index" placement="top">
            <div class="item-li" @click="clickItem(item)">
              <div class="flex-box">
                <span class="count">第{{item.visitIndex}}次</span>
                <span class="inputer">操作人：{{item.visitUserName}}</span>
                <span class="time">
                  更新时间：{{item.endVisitTime }}
                  <i
                    class="el-icon-arrow-right is-click"
                    v-if="drawer && ruleForm.id == item.id"
                  ></i>
                </span>
              </div>
              <div class="flex-box danger" v-if="item.msg">
                <i class="el-icon-warning">{{item.msg}}</i>
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>
        <div class="fr" style="margin-bottom:20px">
          <el-pagination
            background
            @size-change="sizeChange"
            @current-change="pageChange"
            :current-page="pageConfig.pageNum"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="pageConfig.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageConfig.totalCount">
          </el-pagination>
        </div>
      </div>

      <!-- 表单信息 -->
      <div class="drawer-form" v-if="drawer">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <template v-for="item in formDataArrNew">
            <el-form-item :label="item.label" :prop="item.id" :key="item.id" :required="item.required">
              <!-- 单选 -->
              <template v-if="item.type=='radio'">
                <el-radio v-model="item.value" :label="ele.OptionName" v-for="(ele,i) in item.singleOption" :key="i">{{ele.OptionName}}</el-radio>
              </template>
              <!-- 多选 -->
              <template v-else-if="item.type=='checkBox'">
                <el-checkbox-group 
                  v-model="item.value"
                  >
                  <el-checkbox v-for="(ele,i) in item.checkOption" :label="ele.OptionName" :key="i">{{ele.OptionName}}</el-checkbox>
                </el-checkbox-group>
              </template>
              <!-- 文本域 -->
              <template v-else-if="item.type=='textareaField'">
                <el-input  type="textarea" v-model="item.value" readonly></el-input>
              </template>
              <!-- 附件 -->
              <template v-else-if="item.type=='accessoryField'">
                <div class="file-container" @click="download(item)">
                  <i class="el-icon-receiving"></i>
                </div>
              </template>
              <!-- 图片 -->
              <template v-else-if="item.type=='uploadPicField'">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="item.value"
                  :fit="'cover'"
                ></el-image>
              </template>
              <template v-else>
                  <el-input v-model="item.value" readonly></el-input>
              </template>
            </el-form-item>
          </template>
          
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
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

      pageConfig: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0
      },
      tableData:[],
      currentData: {},
      formDataArr: []
    };
  },
  mounted(){
    this.getTableData();
  },
  computed:{
    formDataArrNew(){
      return this.formDataArr.map(item => {
        if(item.type == 'checkBox'){
          item.value = item.value.split(',')
        }
        return item;
      })
    }
  },
  methods: {
    download(data){
      // location.href = data.value;
      window.open(data.value);
    },
    clickItem(item) {
      console.log("123");
      this.drawer = true;
      // this.ruleForm = item;
      this.$fetch("chain_getVisitRecordDetail",{
        chainVisitRecordId: item.visitRecordId
      }).then(res => {
        this.currentData = res.data;
        this.formDataArr = JSON.parse(this.currentData.visitRecordDetail);
        console.log(this.formDataArr,'this.formData---')
      })
    },
    getTableData(params = {}) {
      this.$fetch("chain_chainVisitRecord", {
        ...this.pageConfig,
        ...params,
        chainId: 12
      }).then((res) => {
        this.tableData = res.data.records;
        this.pageConfig.totalCount = res.data.totalCount;
      })
    },
    pageChange(val) {
      this.pageConfig.pageNum = val;
      this.getTableData();
      scrollTo(0, 800);
    },
    sizeChange(val) {
      this.pageConfig.pageSize = val;
      this.getTableData();
      scrollTo(0, 800);
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
  height: 14px;
  font-size: 14px;
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
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      text-align: center;
      padding: 7px 15px;
    }

    .inputer {
      height: 14px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333333;
    }
    .time {
      height: 14px;
      font-size: 14px;
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
      padding: 16px 10px 16px 16px;
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

.file-container {
  width: 100px;
  height: 100px;
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  cursor: pointer;
}
</style>
