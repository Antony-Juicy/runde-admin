<template>
  <div class="comment">
    <el-row>
      <!-- <el-col :span="9">
        <el-switch v-model="value.mute" active-text="禁言设置" @change="muteChange" > </el-switch>
        <span class="tips"> (开启后全体禁言)</span>
      </el-col> -->
      <!-- <el-col :span="8">
        <el-switch v-model="value2" active-text="禁止图片"> </el-switch>
        <span class="tips"> (开启后全体不能发送图片)</span>
      </el-col> -->
      <el-col :span="9">
        <el-switch v-model="value.chatAudit" active-text="聊天审核" @change="examChange"> </el-switch>
        <span class="tips"> (开启后聊天内容需通过审核才能显示)</span>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="operate-table">
      <div class="title">审核列表</div>
      <div class="btn-wrapper">
        <el-button type="success" size="small" @click="handlePassAll"
          >批量通过</el-button
        >
        <el-button type="warning" size="small" @click="handleNopassAll"
          >批量不通过</el-button
        >
        <el-button type="info" size="small" @click="handleDeleteAll"
          >批量删除</el-button
        >
        <el-button type="primary" size="small" @click="refresh"
          >刷新</el-button
        >
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig="pageConfig"
        :multiple="true"
        fixedTwoRow
        @pageChange="pageChange"
        @select="handelSelect"
      >
      <!-- 头像 -->
      <template slot="fromHeadPic" slot-scope="scope">
            <!-- <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar> -->
            <el-avatar :src="scope.row.fromHeadPic" @error="return true">
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
            </el-avatar>
          </template>
          <template slot="imChatStatus" slot-scope="scope">
              {{scope.row.imChatStatus | statusFilter}}
           </template>
        <template slot="edit" slot-scope="scope">
          <el-button @click="handlePass(scope.row)" type="text" size="small"
            >通过</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click="handleNopass(scope.row)"
            type="text"
            size="small"
            style="color: #e6a23c"
            >不通过</el-button
          >
          <!-- <el-divider direction="vertical"></el-divider>
          <el-button @click="handleEdit(scope.row)" type="text" size="small" style="color: #909399"
            >拉黑</el-button
          > -->
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleMute(scope.row)" type="text" size="small" style="color: #ec5b56"
            >禁言</el-button
          >
        </template>
      </rd-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "comment",
  data() {
    return {
      tableData: [
      ],
      tableKey: [
        {
          name: "用户ID",
          value: "fromAccount",
        },
        {
          name: "用户昵称",
          value: "fromNickName"
        },
        {
          name: "用户头像",
          value: "fromHeadPic",
          operate: true
        },
        {
          name: "评论内容",
          value: "content",
          showTooltip: true
        },
        {
          name: "评论时间",
          value: "createAt"
        },
        {
          name: "状态",
          value: "imChatStatus",
          operate: true
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 220
        }
      ],
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      selectedData: [],
      
      device: this.value
    };
  },
  mounted(){
    this.getTableData();
  },
  props: {
    liveId: {
      type: Number,
    },
      value: { //是否禁言和是否审核
        type: Object
      }
  },
  filters:{
    statusFilter(val){
      switch(val){
        case 'Pending':
          return '待审核';
        case 'AuditSuccess':
          return '审核通过';
        case 'AuditFailed':
          return '审核不通过';
        case 'Deleted':
          return '删除';
        case 'Mute':
          return '禁言';
      }
    }
  },
  methods: {
    pageChange(val) {
      this.pageConfig.pageNum = val.page;
      this.pageConfig.pageSize = val.limit;
      this.getTableData();
    },
    handelSelect(val) {
      console.log(val, "valll");
      this.selectedData = val;
    },
    handleAdd(){
      
    },
    getTableData(params = {}) {
      const loading = this.$loading({
        lock: true,
        target: ".comment .el-table",
      });
      this.$fetch("live_im_chat_data", {
        ...this.pageConfig,
        ...this.formInline,
        ...params,
        liveId: this.liveId
      }).then((res) => {
        this.tableData = res.data.records;
        this.pageConfig.totalCount = res.data.totalCount;
        setTimeout(() => {
          loading.close();
        }, 200);
      });
    },

    muteChange(val){  

      this.$emit('input', {
        mute: val,
        chatAudit: this.value.chatAudit
      }) 
      this.$fetch("live_im_mute",{
        liveId: this.liveId,
        mute: val
      }).then(res => {
        if(res.code == 200){
          this.$message.success("操作成功")
          this.$emit("refresh")
        }
      })
    },

    examChange(val){
      this.$emit('input', {
        mute: this.value.mute,
        chatAudit: val
      }) 
      this.$fetch("live_im_chat_audit_switch",{
        liveId: this.liveId,
        audit: val
      }).then(res => {
        if(res.code == 200){
          this.$message.success("操作成功")
          this.$emit("refresh")
        }
      })
    },

    handlePassAll(){
      if(!this.selectedData.length){
        this.$message.warning("请选择评论")
        return;
      }
      this.$fetch("live_im_audit_chat",{
        chatAuditStatus: 'AuditSuccess',
        imChatIds: JSON.stringify(this.selectedData.map(item=>item.id))
      }).then(res => {
        if(res.code == 200){
          this.$message.success('操作成功')
          this.getTableData()
        }
      })
    },

    handleNopassAll(){
      if(!this.selectedData.length){
        this.$message.warning("请选择评论")
        return;
      }
      this.$fetch("live_im_audit_chat",{
        chatAuditStatus: 'AuditFailed',
        imChatIds: JSON.stringify(this.selectedData.map(item=>item.id))
      }).then(res => {
        if(res.code == 200){
          this.$message.success('操作成功')
          this.getTableData()
        }
      })
    },

    handleDeleteAll(){
      if(!this.selectedData.length){
        this.$message.warning("请选择评论")
        return;
      }
      this.$fetch("live_im_audit_chat",{
        chatAuditStatus: 'Deleted',
        imChatIds: JSON.stringify(this.selectedData.map(item=>item.id))
      }).then(res => {
        if(res.code == 200){
          this.$message.success('操作成功')
          this.getTableData()
        }
      })
    },

    handlePass(val){
      this.$fetch("live_im_audit_chat",{
        chatAuditStatus: 'AuditSuccess',
        imChatIds: JSON.stringify([val.id])
      }).then(res => {
        if(res.code == 200){
          this.$message.success('操作成功')
          this.getTableData()
        }
      })
    },

    handleNopass(val){
      this.$fetch("live_im_audit_chat",{
        chatAuditStatus: 'AuditFailed',
        imChatIds: JSON.stringify([val.id])
      }).then(res => {
        if(res.code == 200){
          this.$message.success('操作成功')
          this.getTableData()
        }
      })
    },

    handleMute(val){
      this.$fetch("live_im_audit_chat",{
        chatAuditStatus: 'Mute',
        imChatIds: JSON.stringify([val.id])
      }).then(res => {
        if(res.code == 200){
          this.$message.success('操作成功')
          this.getTableData()
        }
      })
    },

    refresh(){
      this.getTableData({
        pageNum: 1
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.comment {
    padding-left: 30px;
  .tips {
    font-size: 12px;
    line-height: 20px;
    color: #777;
  }
  .operate-table {
    .title {
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: bold;
       color: #409EFF;
    }
  }
}
</style>
