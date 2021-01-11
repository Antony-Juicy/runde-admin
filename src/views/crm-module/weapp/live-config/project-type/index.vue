<template>
  <div class="projecttype-container">
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd">新增项目分类</el-button>
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :pageConfig="pageConfig"
        @select="handleSelect"
        @pageChange="pageChange">
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <!-- <el-divider direction="vertical"></el-divider> -->
          <!-- <el-button @click="handleAuthority(scope.row)" type="text" size="small" style="color: #ec5b56">配置权限</el-button> -->
        </template>
      </rd-table>
      <rd-dialog
        :title="projectStatus ? '新增项目分类' : '编辑项目分类'"
        :dialogVisible="projectVisible"
        :width="widthNew"
        @handleClose="closeProject('dataForm')"
        @submitForm="submitForm('dataForm')">
        <el-form ref="dataForm" :model="projectForm" label-width="100px">
          <el-form-item label="项目名称" prop="typeName">
            <el-input v-model.trim="projectForm.typeName" autocomplete="off" placeholder="请输入项目名称" />
          </el-form-item>
          <el-form-item label="排序" prop="orderValue">
            <el-input-number controls-position="right" v-model.trim ="projectForm.orderValue" autocomplete="off" :min="0" placeholder="请输入排序编号" />
          </el-form-item>
          <el-form-item label="状态" prop="typeStatus">
            <el-select v-model.trim="projectForm.typeStatus" placeholder="请选择/正常/停用">
              <el-option label="正常" value="Normal"></el-option>
              <el-option label="停用" value="Disable"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </rd-dialog>
    </div>
  </div>
</template>

<script>
let loginUserId = JSON.parse(localStorage.getItem("userInfo")).userId;
export default {
  name:"project-type",
  data(){
    return {
      tableData: [
        {
          typeId: 1,
          typeName: "执业药师",
          orderValue: 1,
          typeStatus: "正常"
        },
        {
          typeId: 2,
          typeName: "健康管理师",
          orderValue: 2,
          typeStatus: "停用"
        }
      ],
      tableKey: [
        { name: 'id',value: 'typeId' },
        { name: '项目名称',value: 'typeName' },
        { name: '排序',value: 'orderValue' },
        { name: '状态',value: 'typeStatus' },
        { name: '操作',value: 'edit',operate: true,width: 140 }
      ],
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      currentPageInfo: null,
      loading: false,

      // 弹窗
      widthNew: "600px",
      projectVisible: false,
      projectStatus: true,
      projectForm: {
        typeId: '',
        typeName: '',
        orderValue: '',
        typeStatus: ''
      },
    }
  },
  mounted () {
    // this.getTableData()
  },
  methods: {
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    getTableData(params) {
      const loading = this.$loading({
        lock: true,
        target: ".el-table",
      });
      this.$fetch(
        "projectType_list",
        params || {
          loginUserId,
          ...this.pageConfig,
        }
      ).then((res) => {
        this.tableData = res.data.records;
        this.pageConfig.totalCount = res.data.total;
        setTimeout(() => {
          loading.close();
        }, 200);
      });
    },
    pageChange(val) {
      console.log(val,'pagechange')
      this.currentPageInfo = val;
      this.getTableData({
        currentPage: (val && val.page) || 1,
        pageSize: (val && val.limit) || 10,
        loginUserId
      });
    },

    // 新增
    handleAdd() {
      this.projectVisible = true;
      this.projectStatus = true;
      for (const key in this.projectForm) {
        this.projectForm[key] = "";
      }
    },
    // 编辑
    handleEdit(row) {
      this.projectVisible = true;
      this.projectStatus = false;
      this.projectForm = {
        ...row
      }
    },
    closeProject(formName) {
      this.projectVisible = false;
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          if(this.projectStatus) {
            // 新增
            this.$fetch("projectType_add", {
              ...this.projectForm,
              loginUserId,
            }).then((res) => {
              this.$message({
                message: "提交成功",
                type: "success",
              });
              this.closeProject("dataForm");
            });
          } else {
            // 编辑
            this.$fetch("projectType_update", {
              ...this.projectForm,
              loginUserId,
            }).then((res) => {
              this.$message({
                message: "编辑成功",
                type: "success",
              });
              this.closeProject("dataForm");
            });
          }
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.projecttype-container {

}
</style>
