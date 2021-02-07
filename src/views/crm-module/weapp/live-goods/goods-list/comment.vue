<template>
  <div class="comment-container">
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
        <el-button type="primary" size="small" @click="handleAdd">批量导入</el-button>
      </div>
      <rd-table
        :tableData="tableCommentData"
        :tableKey="tableCommentKey"
        :loading="loading"
        :pageConfig="pageCommentConfig"
        @select="handleSelect"
        @pageChange="pageChange">
        <template slot="headPic" slot-scope="scope">
          <img :src="scope.row.headPic || userLogoUrl" style="width:40px;height:40px;" alt="">
        </template>
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleDelete(scope.row)" type="text" size="small" style="color: #ec5b56">删除</el-button>
        </template>
      </rd-table>
      <rd-dialog
        :title="commentStatus ? '添加评论' : '编辑评论'"
        :dialogVisible="commentVisible"
        :width="widthNew"
        append-to-body
        @handleClose="closeComment('dataForm')"
        @submitForm="submitForm('dataForm')">
        <el-form ref="dataForm" :model="commentForm" :rules="rules" label-width="100px">
          <el-form-item label="用户名称" prop="nickName">
            <el-input v-model.trim="commentForm.nickName" autocomplete="off" placeholder="请输入用户名称" />
          </el-form-item>
          <el-form-item label="评论内容" prop="commentContent">
            <el-input v-model.trim="commentForm.commentContent" autocomplete="off" placeholder="请输入用户评论" />
          </el-form-item>
          <el-form-item label="评论时间" prop="commentDate">
            <!-- <el-input v-model.trim="commentForm.commentDate" autocomplete="off" placeholder="请输入" /> -->
            <el-date-picker
              v-model="commentForm.commentDate"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </rd-dialog>
    </div>
  </div>
</template>

<script>

export default {
  name:"comment",
  props:{
    goodsId: {
      type: Number
    }
  },
  data(){
    return {
      tableCommentData: [
        {
          nickName: '张三',
          headPic: '',
          commentContent: '老师讲得好',
          commentDate: "2021-01-01 00:00:00"
        }
      ],
      tableCommentKey: [
        { name: '用户名称',value: 'nickName' },
        { name: '头像',value: 'headPic',operate: true,width: 62 },
        { name: '评论内容',value: 'commentContent' },
        { name: '评论时间',value: 'commentDate' },
        { name: '操作',value: 'edit',operate: true,width: 120 }
      ],
      userLogoUrl: require('@/assets/userlogo.png'),
      emptyText: '暂无数据',
      pageCommentConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,
      
      // 新增or编辑
      commentStatus: true,
      commentVisible: false,
      widthNew: "600px",
      commentId: '', // 评论id-公用
      commentForm: {
        nickName: '',
        commentContent: '',
        commentDate: ""
      },
      rules: {
        nickName: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {  max: 25, message: '长度不多于25个字符', trigger: 'blur' }
        ],
        commentContent: [
          { required: true, message: "请输入评论", trigger: "blur" }
        ],
        commentDate: [
          { required: true, message: "请选择时间", trigger: "blur" },
        ]
      }
    }
  },
  mounted () {
    this.getCommentData()
  },
  methods: {
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    getCommentData(params) {
      const loading = this.$loading({
        lock: true,
        target: ".el-table",
      });
      this.$fetch(
        "comment_list",
        params || {
          goodsId: this.goodsId,
          ...this.pageCommentConfig
        }
      ).then((res) => {
        this.tableCommentData = res.data.records;
        this.pageCommentConfig.totalCount = res.data.totalCount;
        setTimeout(() => {
          loading.close();
        }, 200);
      });
    },
    handleAdd() {
      this.commentVisible = true
    },
    handleEdit(row) {
      this.commentVisible = true;
      this.commentStatus = false;
      this.$fetch(
        "comment_getList",
        {
          goodsCommentId: row.commentId
        }
      ).then((res) => {
        this.commentForm = res.data
      });
      this.commentId = row.commentId

    },
    handleDelete(row) {
      let info = row.nickName;
      this.$confirm(`此操作将删除${info}这条评论, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$fetch("comment_delete", {
            goodsCommentId: row.commentId,
          }).then((res) => {
            if (res) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              setTimeout(() => {
                this.getCommentData();
              }, 50);
            }
          });
        })
        .catch(() => {});
    },
    pageChange(val) {
      console.log(val,'pagechange')
      this.getCommentData({
        goodsId: this.goodsId,
        pageNum: (val && val.page) || 1,
        pageSize: (val && val.limit) || 10,
      });
    },
    closeComment(formName) {
      this.commentVisible = false;
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      console.log(this.commentForm, 996)
      this.$refs[formName].validate((valid) => {
        if(valid) {
          if(this.commentStatus) {
            // 新增
            this.$fetch("comment_add", {
              ...this.commentForm,
              goodsId: this.goodsId
            }).then((res) => {
              this.$message({
                message: "提交成功",
                type: "success",
              });
              this.getCommentData();
              this.closeComment("dataForm");
            });
          } else {
            // 编辑
            this.$fetch("comment_update", {
              ...this.commentForm,
              commentId: this.commentId
            }).then((res) => {
              this.$message({
                message: "编辑成功",
                type: "success",
              });
              this.getCommentData();
              this.closeComment("dataForm");
            });
          }
        }
      });
    }

  }
}
</script>

<style lang="scss" scoped>
.comment-container {

}
</style>
