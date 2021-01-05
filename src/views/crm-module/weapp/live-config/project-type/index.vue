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
      </rd-table>
      <rd-dialog
        :title="projectStatus ? '新增项目分类' : '编辑项目分类'"
        :dialogVisible="projectVisible"
        :width="widthNew"
        @handleClose="closeProject('dataForm')"
        @submitForm="submitForm('dataForm')">
        <el-form ref="dataForm" :model="projectForm" label-width="100px">
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model.trim="projectForm.projectName" autocomplete="off" placeholder="请输入项目名称" />
          </el-form-item>
          <el-form-item label="排序" prop="projectsort">
            <el-input-number controls-position="right" v-model.trim ="projectForm.projectsort" autocomplete="off" :min="0" placeholder="请输入排序编号" />
          </el-form-item>
          <el-form-item label="状态" prop="projectType">
            <el-select v-model.trim="projectForm.projectType" placeholder="请选择/正常/停用">
              <el-option label="正常" value="0"></el-option>
              <el-option label="停用" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </rd-dialog>
    </div>
  </div>
</template>

<script>

export default {
  name:"project-type",
  data(){
    return {
      tableData: [],
      tableKey: [
        { name: 'id',value: 'id' },
        { name: '项目名称',value: 'projectName' },
        { name: '排序',value: 'paixu' },
        { name: '状态',value: 'status' },
        { name: '操作',value: 'edit',operate: true,width: 120 }
      ],
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,

      // 弹窗
      widthNew: "600px",
      projectVisible: false,
      projectStatus: true,
      projectForm: {
        projectName: '',
        projectsort: '',
        projectType: ''
      },
    }
  },
  methods: {
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    pageChange(val) {
      console.log(val,'pagechange')
    },

    // 弹窗
    handleAdd() {
      this.projectVisible = true;
    },
    closeProject(formName) {
      this.projectVisible = false;
      // this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      console.log(this.projectForm, 666);
      this.closeProject("dataForm")
    }
  }
}
</script>

<style lang="scss" scoped>
.projecttype-container {

}
</style>
