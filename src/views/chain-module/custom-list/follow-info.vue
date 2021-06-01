<template>
  <div class="follow-info">
    <div class="contain">
      <div class="info-tab">
        <!-- 列表信息 -->
        <!-- <h3>跟进情况</h3> -->
        <el-timeline>
          <el-timeline-item v-for="(item,index) in tableData" :key="index" placement="top">
            <div class="item-li" @click="clickItem(item)">
              <div class="flex-box">
                <span class="count">第{{item.visitIndex}}次</span>
                <div class="inputer">
                  <div>操作人：</div>
                  <div>{{item.visitUserName}}</div>
                </div>
                <div class="time">
                  <div>更新时间：</div>
                  <div>{{item.endVisitTime }}</div>
                </div>
                <div class="time">
                  <div>任务截止日期：</div>
                  <div>{{item.deadline }}</div>
                </div>
                 <i
                    class="el-icon-arrow-right is-click"
                    v-if="drawer && currentId == item.visitRecordId"
                  ></i>
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
          label-width="120px"
          class="demo-ruleForm"
        >
          <template v-for="item in formDataArrNew">
            <el-form-item :label="item.label" :key="item.id" :required="item.required">
              <!-- 单选 -->
              <template v-if="item.type=='radio'">
                <el-radio v-model="item.value" :label="ele.OptionName" v-for="(ele,i) in item.singleOption" :key="i" disabled>{{ele.OptionName}}</el-radio>
              </template>
              <!-- 多选 -->
              <template v-else-if="item.type=='checkBox'">
                <el-checkbox-group 
                  v-model="item.value"
                  disabled
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
                <template v-if="item.value">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="item.value"
                    :fit="'cover'"
                  ></el-image>
                </template>
                 <template v-else>
                   <img
                    style="width: 100px; height: 100px"
                    src="@/assets/icon/noimg.png"/>
                 </template>
              </template>
              <template v-else>
                  <el-input v-model="item.value" readonly></el-input>
              </template>
            </el-form-item>
          </template>
          <!-- 现场 -->
          <template v-if="currentData.visitType == 'SITE'">
            <el-form-item label="开始拜访">
              <el-image
                  style="width: 100px; height: 100px"
                  :src="currentData.startVisitPhoto"
                  :fit="'cover'"
                ></el-image>
                <div><i class="el-icon-location" style="font-size:16px;color:#409eff"></i>{{currentData.startVisitAddress}}</div>
                <div>时间：{{currentData.startVisitTime}}</div>
            </el-form-item>
            <el-form-item label="结束拜访">
              <el-image
                  style="width: 100px; height: 100px"
                  :src="currentData.endVisitPhoto"
                  :fit="'cover'"
                ></el-image>
                <div><i class="el-icon-location" style="font-size:16px;color:#409eff"></i>{{currentData.endVisitAddress}}</div>
                <div>时间：{{currentData.endVisitTime}}</div>
            </el-form-item>
          </template>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to';
export default {
  name: "temp",
  data() {
    return {
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
      formDataArr: [],
      currentId:""
    };
  },
  props: {
    followId: {
      type: String | Number
    }
  },
  watch: {
    followId(newVal){
      if(!newVal){
        return;
      }
      this.getTableData();
    }
  },
  mounted(){
    this.getTableData();
  },
  computed:{
    formDataArrNew(){
      return this.formDataArr.map(item => {
        if(item.type == 'checkBox'){
          item.value = item.value?item.value.split(','):[];
        }
        return item;
      })
    }
  },
  methods: {
    download(data){
      location.href = data.value;
      // window.open(data.value);
    },
    clickItem(item) {
      console.log("123");
      this.drawer = true;
      this.currentId = item.visitRecordId;
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
      if(!this.followId){
        return;
      }
      this.$fetch("chain_chainVisitRecord", {
        ...this.pageConfig,
        ...params,
        chainId: this.followId
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
      // height: 14px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333333;
      // line-height: 22px;
    }
    .time {
      // height: 14px;
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
      cursor: pointer;
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
