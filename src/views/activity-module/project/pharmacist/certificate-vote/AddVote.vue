<template>
  <div class="AddVote">
      <el-form label-width="90px" ref="dataForm" :rules="rules" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="姓名" prop="name">
            <el-input v-model="formInline.name" size="small" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="微信用户" prop="wxId">
            <el-select v-model="formInline.wxId" size="small" placeholder="请选择">
                <el-option :label="item.label" :value="item.value" v-for="(item,index) in wechatArr" :key="index"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
            <el-input v-model="formInline.phone" size="small" placeholder="请输入"></el-input>
        </el-form-item>
        <br>
         <el-form-item label="活动名称" prop="activityId">
            <el-select v-model="formInline.activityId" size="small" placeholder="请选择">
                <el-option :label="item.label" :value="item.value" v-for="(item,index) in activityArr" :key="index"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="项目类型" prop="productId">
            <el-select v-model="formInline.productId" size="small" placeholder="请选择">
                <el-option :label="item.label" :value="item.value" v-for="(item,index) in productArr" :key="index"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="作品状态" prop="status">
            <el-select v-model="formInline.status" size="small" placeholder="请选择">
                <el-option :label="item.label" :value="item.value" v-for="(item,index) in statusArr" :key="index"></el-option>
            </el-select>
            <el-tooltip class="item" effect="dark" content="设置作品状态为【暂停】后，该作品不展示且不参与排名！" placement="top">
                <i class="el-icon-warning-outline warning-icon"></i>
            </el-tooltip>
        </el-form-item>

        <el-divider content-position="left"><span class="vote-title">自动投票设置</span></el-divider>

        <el-form-item label="基础数" prop="basicNum">
            <el-input v-model="formInline.basicNum" size="small" placeholder="请输入"></el-input>
            <el-tooltip class="item" effect="dark" content="【基础数】应为正整数，在开启自动投票功能后，按照该数量自动投票！" placement="top-start">
                <i class="el-icon-warning-outline warning-icon2"></i>
            </el-tooltip>
        </el-form-item>

        <el-form-item label="分钟数" prop="minutesNum">
            <el-input v-model="formInline.minutesNum" size="small" placeholder="请输入"></el-input>
            <el-tooltip class="item" effect="dark" content="【分钟数】应为正整数，在开启自动投票功能后，按照该分钟数间隔进行自动投票！" placement="top">
                <i class="el-icon-warning-outline warning-icon2"></i>
            </el-tooltip>
        </el-form-item>

        <el-form-item label="增加范围" prop="addScope">
            <el-input v-model="formInline.addScope" size="small" placeholder="请输入增加范围：(如：2,6)"></el-input>
            <el-tooltip class="item" effect="dark" content="【增加范围】格式应为【X,Y】(X和Y最小为1，最大为99)，在开启自动投票功能后，按照该区间数进行自动投票！" placement="top">
                <i class="el-icon-warning-outline warning-icon"></i>
            </el-tooltip>
        </el-form-item>

       <br/>
        
        <el-form-item label="是否展示" prop="showInfo">
            <el-select v-model="formInline.showInfo" size="small" placeholder="请选择">
                <el-option :label="item.label" :value="item.value" v-for="(item,index) in showInfoArr" :key="index"></el-option>
            </el-select>
            <el-tooltip class="item" effect="dark" content="【基础数】应为正整数，在开启自动投票功能后，按照该数量自动投票！" placement="top-start">
                <i class="el-icon-warning-outline warning-icon"></i>
            </el-tooltip>
        </el-form-item>
        <el-form-item label="自动投票" prop="autoVote">
            <el-select v-model="formInline.autoVote" size="small" placeholder="请选择">
                <el-option :label="item.label" :value="item.value" v-for="(item,index) in showInfoArr" :key="index"></el-option>
            </el-select>
        </el-form-item>

         <el-form-item label="投票时间" prop="time">
            <el-date-picker
                v-model="formInline.time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                :picker-options="startDateDisabled"
                size="small">
                </el-date-picker>
            <el-tooltip class="item" effect="dark" placement="top-start">
                <div slot="content">【开始时间】在开启自动投票功能后，到达该时间后进行自动投票！<br/><br/>【结束时间】在开启自动投票功能后，到达该时间后停止自动投票！</div>
                <i class="el-icon-warning-outline warning-icon"></i>
            </el-tooltip>
        </el-form-item>

        <el-divider></el-divider>

        <el-form-item label="作品描述" prop="content">
            <el-input type="textarea" rows="3" style="width: 806px" v-model="formInline.content" size="small" placeholder="请输入"></el-input>
        </el-form-item>

        <br>
        <el-form-item label="作品图片" prop="picUrl">
            <Upload-oss
              :objConfig="{module: 'activity'}"
              :src.sync="formInline.picUrl"
            />
        </el-form-item>

        <br>
         <el-form-item>
            <div style="text-align:right;    width: 873px;">
                <el-button type="primary" @click="onSubmit('dataForm')" size="small">保存</el-button>
                <el-button size="small">取消</el-button>
            </div>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import UploadOss from "@/components/UploadOss";
export default {
  name:"AddVote",
  data(){
    return {
        startDateDisabled:{},
        formInline: {
          showInfo:"YES",
          autoVote:"YES",
        },
        value1:"",
        rules: {
            name: [
                { required: true, message: '请输入', trigger: 'blur' },
            ],
            wxId: [
                { required: true, message: '请选择', trigger: 'blur' },
            ],
            activityId: [
                { required: true, message: '请选择', trigger: 'blur' },
            ],
            productId: [
                { required: true, message: '请选择', trigger: 'blur' },
            ],
            status: [
                { required: true, message: '请选择', trigger: 'blur' },
            ],
            content: [
                { required: true, message: '请输入', trigger: 'blur' },
            ]
        },
        showInfoArr: [
            {
                label: "是",
                value:"YES"
            },
            {
                label: "否",
                value1:"NO"
            }
        ],
        statusArr: [
             {
              label: "正常",
              value: "Normal"
            },
             {
              label: "停止",
              value: "Stop"
            }
        ],
        activityArr:[],
        productArr:[],
        wechatArr:[],
    }
  },
  components: {
      UploadOss
  },
  props: {
      editDetail: {
          type: Object
      }
  },
  watch:{
    editDetail(newVal){
        console.log(newVal,'editDetail')
        let data = newVal.pd;
        this.formInline = {
            ...data,
            time: [data.startTime,data.endTime]
        }
    }
  },
  created(){
      // 限制开始日期不能超过当前日期
    this.startDateDisabled.disabledDate = function (time) {
      return (time.getTime() + 24 * 3600 * 1000) < Date.now()
    }
    this.getSelectList();
  },
   methods: {
       onSubmit(formName) {
        this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(this.formInline, "提交");

          this.$fetch("cmscertificateinfo_add",{
              ...this.formInline,
              startTime: this.formInline.time&&this.$common._formatDates2(this.formInline.time[0]),
              endTime: this.formInline.time&&this.$common._formatDates2(this.formInline.time[1]),
              time:"",
          }).then(res => {
              this.$message.success("操作成功")
              this.$emit("close")
              this.$emit("refresh")
          })
        }
          
      });
      },
      getSelectList() {
      Promise.all([
        this.$fetch("cmscertificateinfo_getActivityList"),
        this.$fetch("cmscertificateinfo_getProductList"),
        this.$fetch("cmscertificateinfo_wchatList"),
      ].map((p) => {
        return p.catch((error) => error);
      })).then(result => {
        this.activityArr = result[0].data.map(item => ({
          label: item.activityName,
          value: item.id
        }))
        this.productArr = result[1].data.map(item => ({
          label: item.productName,
          value: item.id
        }))
        this.wechatArr = result[2].data.list.map(item => ({
          label: item.nickName,
          value: item.id
        }))
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.AddVote {
    .warning-icon {
            position: absolute;
            left: -87px;
            top: 13px;
            cursor: pointer;
            color: red;
            font-size: 16px;
    }
    .warning-icon2 {
        position: absolute;
            left: -72px;
            top: 13px;
            cursor: pointer;
            color: red;
            font-size: 16px;
    }
    .vote-title {
        color: #0b6cbc;
        font-size: 20px;
    }
    /deep/ {
        .el-input--small .el-input__inner {
            width: 199px;
        }
    }
}
</style>
