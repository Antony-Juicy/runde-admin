<template>
  <div class="AddVote">
      <el-form label-width="90px" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="姓名">
            <el-input v-model="formInline.user" size="small" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="微信用户">
            <el-select v-model="formInline.region" size="small" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="手机号码">
            <el-input v-model="formInline.user" size="small" placeholder="审批人"></el-input>
        </el-form-item>
        <br>
         <el-form-item label="活动名称">
            <el-select v-model="formInline.region" size="small" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="项目类型">
            <el-select v-model="formInline.region" size="small" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="作品状态">
            <el-select v-model="formInline.region" size="small" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-tooltip class="item" effect="dark" content="设置作品状态为【暂停】后，该作品不展示且不参与排名！" placement="top">
                <i class="el-icon-warning-outline warning-icon"></i>
            </el-tooltip>
        </el-form-item>

        <el-divider content-position="left"><span class="vote-title">自动投票设置</span></el-divider>

        <el-form-item label="基础数">
            <el-input v-model="formInline.user" size="small" placeholder="请输入"></el-input>
            <el-tooltip class="item" effect="dark" content="【基础数】应为正整数，在开启自动投票功能后，按照该数量自动投票！" placement="top-start">
                <i class="el-icon-warning-outline warning-icon2"></i>
            </el-tooltip>
        </el-form-item>

        <el-form-item label="分钟数">
            <el-input v-model="formInline.user" size="small" placeholder="请输入"></el-input>
            <el-tooltip class="item" effect="dark" content="【分钟数】应为正整数，在开启自动投票功能后，按照该分钟数间隔进行自动投票！" placement="top">
                <i class="el-icon-warning-outline warning-icon2"></i>
            </el-tooltip>
        </el-form-item>

        <el-form-item label="增加范围">
            <el-input v-model="formInline.user" size="small" placeholder="请输入"></el-input>
            <el-tooltip class="item" effect="dark" content="【增加范围】格式应为【X,Y】(X和Y最小为1，最大为99)，在开启自动投票功能后，按照该区间数进行自动投票！" placement="top">
                <i class="el-icon-warning-outline warning-icon"></i>
            </el-tooltip>
        </el-form-item>

       <br/>
        
        <el-form-item label="是否展示">
            <el-select v-model="formInline.region" size="small" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-tooltip class="item" effect="dark" content="【基础数】应为正整数，在开启自动投票功能后，按照该数量自动投票！" placement="top-start">
                <i class="el-icon-warning-outline warning-icon"></i>
            </el-tooltip>
        </el-form-item>
        <el-form-item label="自动投票">
            <el-select v-model="formInline.region" size="small" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>

         <el-form-item label="投票时间">
            <el-date-picker
                v-model="value1"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                size="small">
                </el-date-picker>
            <el-tooltip class="item" effect="dark" placement="top-start">
                <div slot="content">【开始时间】在开启自动投票功能后，到达该时间后进行自动投票！<br/><br/>【结束时间】在开启自动投票功能后，到达该时间后停止自动投票！</div>
                <i class="el-icon-warning-outline warning-icon"></i>
            </el-tooltip>
        </el-form-item>

        <el-divider></el-divider>

        <el-form-item label="作品描述">
            <el-input type="textarea" rows="3" style="width: 806px" v-model="formInline.user" size="small" placeholder="审批人"></el-input>
        </el-form-item>

        <br>
        <el-form-item label="作品图片">
            <!-- <el-input type="textarea" rows="3" style="width: 806px" v-model="formInline.user" size="small" placeholder="审批人"></el-input> -->
            <el-button>上传图片</el-button>
        </el-form-item>

        <br>
         <el-form-item>
            <div style="text-align:right;    width: 873px;">
                <el-button type="primary" @click="onSubmit" size="small">保存</el-button>
                <el-button size="small">取消</el-button>
            </div>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name:"AddVote",
  data(){
    return {
        formInline: {
          user: '',
          region: ''
        },
        value1:""
    }
  },
   methods: {
       onSubmit() {
        console.log('submit!');
      }
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
