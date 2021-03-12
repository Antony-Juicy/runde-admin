<template>
  <div class="edit-live">
      
      <el-tabs :tab-position="'left'"  v-model="activeName">
            <el-tab-pane label="直播基本信息" name="first">
                <editForm :liveId="liveId" ref="editForm" @refresh="refresh"/>
            </el-tab-pane>
            <el-tab-pane label="分享设置" name="second">
                <share :liveId="liveId"/>
            </el-tab-pane>
            <el-tab-pane label="互动设置" name="third">
                <interaction :liveId="liveId"/>
            </el-tab-pane>
            <el-tab-pane label="评论管理" name="fifth">
                <comment :liveId="liveId" v-model="deviceF" @refresh="refresh"/>
            </el-tab-pane>
            <el-tab-pane label="回放管理" name="sixth">
                <playback :liveId="liveId" ref="playback"/>
            </el-tab-pane>
        </el-tabs>
  </div>
</template>

<script>
import editForm from './editForm';
import share from './share';
import interaction from './interaction/index.vue';
import analysis from './analysis/index.vue';
import comment from './comment';
import playback from './playback';
import { scrollTo } from '@/utils/scroll-to';
export default {
  name:"temp",
  data(){
    return {
        activeName:"first",
        chatAudit: '',
        mute:'',
        deviceF:{},
        chatHistorySwitch:''
    }
  },
  props:{
      liveId: {
          type: Number
      },
      liveName: {
          type: String
      }
    //   chatAudit: {
    //       type: Boolean
    //   },
    //   mute: {
    //       type: Boolean
    //   },
  },
  components:{
      editForm,
      share,
      interaction,
      analysis,
      comment,
      playback
  },
  mounted(){
    this.chatAudit = JSON.parse(sessionStorage.getItem('chatAudit'))
    this.mute = JSON.parse(sessionStorage.getItem('mute'))
    this.chatHistorySwitch = JSON.parse(sessionStorage.getItem('chatHistorySwitch'))
    this.deviceF = {
        chatAudit: this.chatAudit,
        mute: this.mute,
        chatHistorySwitch: this.chatHistorySwitch
    }
  },
   methods: {
       refresh(val){
           this.$emit("refresh",val)
       }
  }
}
</script>

<style lang="scss" scoped>
.edit-live {
    /deep/ {
        .el-tabs--left .el-tabs__header.is-left {
            height: 900px;
            width: 140px;
        }
        // .el-tabs--left .el-tabs__nav-scroll {
        //     background: #f5f7fa;
        // }
    }
}
</style>
