<template>
  <div class="chanceconfig_container">
    <search-form :formOptions = "formOptions" :showNum="showNum" @onSearch = onSearch></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="handleAdd">添加</el-button>
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :pageConfig="pageConfig"
        :tbodyHeight="600"
        @select="handleSelect"
        @pageChange="pageChange"
      >
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <!-- <el-divider direction="vertical"></el-divider> -->
          >
        </template>
      </rd-table>
      <!-- 新增/编辑 弹窗 -->
      <rd-dialog
        :title="dialogStatus ? '添加配置' : '编辑配置'"
        :dialogVisible="dialogVisible"
        :width="widthNew"
        @handleClose="handleClose('dataForm')"
        @submitForm="submitForm('dataForm')"
      >
        <el-form :inline="true" :model="formInline" class="formLabelWidth">
          <el-form-item label="组织架构：">
            <el-select v-model="formInline.region" placeholder="活动区域">
              <!-- <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="项目名称：">
            <el-select v-model="formInline.region" placeholder="活动区域">
              <!-- <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option> -->
            </el-select>
          </el-form-item>
          <el-divider></el-divider>
          <el-table :data="formInline.tableData" border>
            <el-table-column label="参数名" align="center" prop="text">
              <template slot-scope="scope" >
                <div>{{constArr[scope.$index]}}</div>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="name"
              align="center"
              label="参数名">
            </el-table-column> -->
            <el-table-column
              label="设置"
              align="center"
              width="200">
              <template slot-scope="scope">
                <el-input v-model="scope.row.address"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </rd-dialog>
    </div>
  </div>
</template>

<script>
import searchForm from '@/components/Searchform';
export default {
  name:'chance-config',
  components: {
    searchForm
  },
  data () {
    return {
      showNum: 2,
      searchForm: {},
      formOptions: [
        { prop: 'campusName', element: 'el-select', initValue: '', placeholder: '请选择组织架构' },
        { prop: 'createStaffName', element: 'el-input', initValue: '', placeholder: '请输入创建人' },
      ],
      tableData: [],
      tableKey: [
        { name: 'ID',value: 'id' },
        { name: '组织架构',value: 'campusName' },
        { name: '创建人',value: 'createStaffName' },
        { name: '创建时间',value: 'createAt' },
        { name: '修改人',value: 'updateStaffName' },
        { name: '修改时间',value: 'updateAt' },
        { name: '操作',value: 'edit',operate: true,width: 120 },
      ],
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,

      // 弹窗部分参数
      dialogVisible: false,
      dialogStatus: true, //弹窗状态： true 新增 false 编辑
      formLabelWidth: "100px",
      widthNew: "700px",
      formInline: {
        user: '',
        region: '',
        tableData: [
          { address: '' },
          { address: '' },
          { address: '' },
          { address: '' },
          { address: '' },
          { address: '' },
          { address: '' },
          { address: '' },
          { address: '' },
          { address: '' }
        ]
      },
      constArr: [
        "注册人保护天数",
        "机会上限总数量",
        "锁定客户上限数量",
        "延长锁定次数",
        "延长锁定天数",
        "机会公海（分校/战队）新机会超期未成单天数",
        "机会公海（分校/战队）旧机会超期未成单天数",
        "销售机会未跟进超期天数",
        "销售机会未成单超期天数",
        "机会公海（省校/部长）主线公海超期未成单天数"
      ]
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
    // 打开新增弹窗
    handleAdd() {
      console.log(666)
      this.dialogVisible = true;
      this.dialogStatus = true;
    },
    // 打开编辑弹窗
    handleEdit(row) {
      console.log(999)
      // this.basicInfo = {
      //   ...row,
      // };
      this.dialogVisible = true;
      this.dialogStatus = false;
    },
    // 关闭
    handleClose(formName) {
      console.log(888)
      this.dialogVisible = false;
      // this.$refs[formName].resetFields();
    },
  }
}
</script>

<style lang='scss' scoped>
.chanceconfig_container {
  .btn-wrapper {
    margin-bottom: 8px;
  }
  .el-divider--horizontal {
    margin: 0;
  }
}
</style>