<template>
  <div class="specification-group-container">
    <search-form :formOptions="formOptions" :showNum="showNum" @onSearch="onSearch"></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd">添加规则组</el-button>
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
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleDelete(scope.row)" type="text" size="small" style="color: #ec5b56" >删除</el-button>
        </template>
      </rd-table>
      <rd-dialog
        :title="groupStatus ? '添加规则组' : '编辑规则组'"
        :dialogVisible="groupVisible"
        :width="widthNew"
        @handleClose="closeGroup('dataForm')"
        @submitForm="submitForm('dataForm')">
        <el-form ref="dataForm" :model="groupForm" label-width="100px">
          <el-form-item label="规则组名称" prop="groupName">
            <el-input v-model.trim="groupForm.groupName" autocomplete="off" placeholder="请输入规则组名称" />
          </el-form-item>
          <el-form-item label="项目类型" prop="projectType">
            <el-input v-model.trim="groupForm.projectType" autocomplete="off" placeholder="请输入项目类型" />
          </el-form-item>
          <el-form-item label="状态" prop="groupType">
            <el-select v-model="groupForm.groupType" placeholder="请选择/正常/停用">
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
  name:"goods-specification-group",
  data(){
    return {
      showNum: 6,
      searchForm: {},
      formOptions: [
        { prop: 'groupName', element: 'el-input', placeholder: '规则组名称' },
        { prop: 'project', element: 'el-select', placeholder: '选择项目' },
        { prop: 'status', element: 'el-select', placeholder: '选择状态' }
      ],
      tableData: [
        {
          groupName: "中药",
          project: "执业药师",
          status: "正常"
        }
      ],
      tableKey: [
        { name: '规则组名称',value: 'groupName' },
        { name: '项目类型',value: 'project' },
        { name: '状态',value: 'status' },
        { name: '操作',value: 'edit',operate: true,width: 140 }
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
      groupVisible: false,
      groupStatus: true,
      groupForm: {
        groupName: '',
        groupType: '',
        projectType: ''
      }
    }
  },
  methods: {
    onSearch(val) {
      this.searchForm = {...val};
      console.log(val,this.searchForm , 'val---')
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    pageChange(val) {
      console.log(val,'pagechange')
    },
    
    // 弹窗
    handleAdd() {
      console.log(9999)
      this.groupVisible = true;
    },
    handleEdit() {
      console.log(886)
    },
    handleDelete() {
      console.log(996)
    }, 
    closeGroup(formName) {
      this.groupVisible = false;
      // this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      console.log(this.groupForm, 666);
      this.closeGroup("dataForm")
    }
  }
}
</script>

<style lang="scss" scoped>
.specification-group-container {

}
</style>
