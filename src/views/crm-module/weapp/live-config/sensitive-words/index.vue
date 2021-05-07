<template>
  <div class="sensitiveword-container">
    <div class="w-container">
      聊天敏感词
      <el-switch v-model.trim ="sensitiveList.sensitiveStatus" active-color="#409EFF" inactive-color="#ff4949"></el-switch>
      <span style="font-size: 12px;">开启后包含敏感词的聊天内容只有发送者本人可见</span>
    </div>
    <search-form :formOptions="formOptions" @onSearch="onSearch"></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd">添加敏感词</el-button>
        <!-- <el-button type="primary" size="small">批量导入</el-button>
        <el-button type="primary" size="small">批量导入删除</el-button> -->
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :pageConfig.sync="pageConfig"
        @select="handleSelect"
        @pageChange="pageChange">
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleDelete(scope.row)" type="text" size="small" style="color: #ec5b56" >删除</el-button>
        </template>
      </rd-table>
      <rd-dialog
        :title="wordsStatus ? '添加敏感词' : '编辑敏感词'"
        :dialogVisible="wordsVisible"
        :width="widthNew"
        @handleClose="closeWords('dataForm')"
        @submitForm="submitForm('dataForm')">
        <el-form ref="dataForm" :model="wordsForm" label-width="100px">
          <el-form-item label="敏感词" prop="blacklistWord">
            <el-input v-model.trim="wordsForm.blacklistWord" autocomplete="off" placeholder="请输入敏感词" />
          </el-form-item>
        </el-form>
      </rd-dialog>
    </div>
  </div>
</template>

<script>

export default {
  name:"sensitive-words",
  data(){
    return {
      searchForm: {},
      formOptions: [
        { prop: 'blacklistWord', element: 'el-input', placeholder: '请输入关键词' }
      ],
      tableData: [],
      tableKey: [
        { name: 'id',value: 'blacklistWordId' },
        { name: '敏感词',value: 'blacklistWord' },
        { name: '操作',value: 'edit',operate: true }
      ],
      sensitiveList: {
        sensitiveStatus: ""
      },
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 0,
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,

      wordsStatus: true,
      wordsVisible: false,
      widthNew: "600px",
      blacklistWordId: '', // 公用id
      wordsForm: {
        blacklistWord: ''
      }
    }
  },
  mounted () {
    this.getTableData()
  },
  methods: {
    onSearch(val) {
      this.searchForm = {...val};
      this.pageConfig.pageNum = 1;
      this.getTableData();
      console.log(val,this.searchForm , 'val---')
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    getTableData(params={}) {
      return new Promise((resolve,reject)=>{
        this.loading = true;
        this.$fetch(
          "sensitive_word_list",
          {
            ...this.pageConfig,
            ...this.searchForm,
            ...params
          }
        ).then((res) => {
          this.loading = false;
          this.tableData = res.data.records;
          this.pageConfig.totalCount = res.data.totalCount;
          resolve();
        }).catch(err=>{
          console.log(err)
          reject();
        });
      })
    },
    pageChange(val) {
      console.log(val,'pagechange');
      this.pageConfig.pageNum = val.page;
      this.pageConfig.pageSize = val.limit;
      this.getTableData();
    },
    handleAdd() {
      this.wordsVisible = true;
      this.wordsStatus = true;
    },
    handleEdit(row) {
      console.log(666)
      this.wordsVisible = true;
      this.wordsStatus = false;
      this.$fetch(
        "sensitive_word_getList",
        {
          imBlacklistWordId: row.blacklistWordId
        }
      ).then((res) => {
        this.wordsForm = res.data
      })
      this.blacklistWordId = row.blacklistWordId
    },
    handleDelete(row) {
      console.log(777)
      let info = row.blacklistWord;
      this.$confirm(`此操作将删除${info}这条敏感词, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
          const res = await this.$fetch("sensitive_word_delete", {
            imBlacklistWordId: row.blacklistWordId,
          }).then((res) => {
            if (res) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              setTimeout(() => {
                this.getTableData();
              }, 50);
            }
          });
        }).catch(() => {
          
        });
    },
    closeWords(formName) {
      this.wordsVisible = false;
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      console.log(this.wordsForm, 996)
      this.$refs[formName].validate((valid) => {
        if(valid) {
          if(this.wordsStatus) {
            // 新增
            this.$fetch("sensitive_word_add", {
              ...this.wordsForm
            }).then((res) => {
              this.$message({
                message: "提交成功",
                type: "success",
              });
              this.getTableData();
              this.closeWords("dataForm");
            });
          } else {
            // 编辑
            this.$fetch("sensitive_word_update", {
              ...this.wordsForm,
              blacklistWordId: this.blacklistWordId
            }).then((res) => {
              this.$message({
                message: "编辑成功",
                type: "success",
              });
              this.getTableData();
              this.closeWords("dataForm");
            });
          }
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.sensitivewords-container {
  /deep/ {
    .search-box-wrapper {
      padding-top: 0px;
    }
  }
  .btn-wrapper {
    margin-bottom: 8px;
  }
}
</style>