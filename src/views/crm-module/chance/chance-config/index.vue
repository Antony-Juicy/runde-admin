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
        <el-form :inline="true" ref="dataForm" :model="formInline" :label-width="formLabelWidth">
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
          <el-form-item label="参数名：" :label-width="formLabelWidth2">
            <div>设置<a href="javascript:;" style="color:blue;" @click="defaultNumber">（点击加载默认参数）</a></div>
          </el-form-item>
          <el-form-item label="注册人保护天数：" prop="day" :label-width="formLabelWidth2">
            <el-input-number controls-position="right" v-model.trim ="formInline.createrProtectDay" autocomplete="off" :min="0" /> 天
          </el-form-item>
          <el-form-item label="机会上限总数量：" prop="day" :label-width="formLabelWidth2">
            <el-input-number controls-position="right" v-model.trim ="formInline.opportunityLimit" autocomplete="off" :min="0" /> 个
          </el-form-item>
          <el-form-item label="锁定客户上限数量：" prop="day" :label-width="formLabelWidth2">
            <el-input-number controls-position="right" v-model.trim ="formInline.lockLimit" autocomplete="off" :min="0" /> 个
          </el-form-item>
          <el-form-item label="延长锁定次数：" prop="day" :label-width="formLabelWidth2">
            <el-input-number controls-position="right" v-model.trim ="formInline.extendLockTimes" autocomplete="off" :min="0" /> 次
          </el-form-item>
          <el-form-item label="延长锁定天数：" prop="day" :label-width="formLabelWidth2">
            <el-input-number controls-position="right" v-model.trim ="formInline.extendLockDay" autocomplete="off" :min="0" /> 天
          </el-form-item>
          <el-form-item label="销售机会未跟进超期天数：" prop="day" :label-width="formLabelWidth2">
            <el-input-number controls-position="right" v-model.trim ="formInline.seaNewWcdOverDay" autocomplete="off" :min="0" /> 天
          </el-form-item>
          <el-form-item label="销售机会未成单超期天数：" prop="day" :label-width="formLabelWidth2">
            <el-input-number controls-position="right" v-model.trim ="formInline.seaOldWcdOverDay" autocomplete="off" :min="0" /> 天
          </el-form-item>
          <el-form-item label="机会公海（分校/战队）新机会超期未成单天数：" prop="day" :label-width="formLabelWidth2">
            <el-input-number controls-position="right" v-model.trim ="formInline.opportunityWgjOverDay" autocomplete="off" :min="0" /> 天
          </el-form-item>
          <el-form-item label="机会公海（分校/战队）旧机会超期未成单天数：" prop="day" :label-width="formLabelWidth2">
            <el-input-number controls-position="right" v-model.trim ="formInline.opportunityWcdOverDay" autocomplete="off" :min="0" /> 天
          </el-form-item>
          <el-form-item label="机会公海（省校/部长）主线公海超期未成单天数：" prop="day" :label-width="formLabelWidth2">
            <el-input-number controls-position="right" v-model.trim ="formInline.seaProvinceTrunkWcdOverDay" autocomplete="off" :min="0" /> 天
          </el-form-item>
          <!-- <el-divider></el-divider> -->
          <p style="margin: 10px 0 0 30px;"><span style="color:red;">提示：</span>添加配置之后需等到下一天的0点才生效！</p>
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
      formLabelWidth2: "350px",
      widthNew: "700px",
      formInline: {
        user: '',
        region: '',
        createrProtectDay: '',
        opportunityLimit: '',
        lockLimit: '',
        extendLockTimes: '',
        extendLockDay: '',
        seaNewWcdOverDay: '',
        seaOldWcdOverDay: '',
        opportunityWgjOverDay: '',
        opportunityWcdOverDay: '',
        seaProvinceTrunkWcdOverDay: ''
      },
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
      this.$refs[formName].resetFields();
    },
    // 加载默认参数
    defaultNumber() {
      this.formInline.createrProtectDay = 30;
      this.formInline.opportunityLimit = 300;
      this.formInline.lockLimit = 20;
      this.formInline.extendLockTimes = 2
      this.formInline.extendLockDay = 7;
      this.formInline.seaNewWcdOverDay = 15;
      this.formInline.seaOldWcdOverDay = 5;
      this.formInline.opportunityWgjOverDay = 3;
      this.formInline.opportunityWcdOverDay = 7;
      this.formInline.seaProvinceTrunkWcdOverDay = 15;
    }
  }
}
</script>

<style lang='scss' scoped>
.chanceconfig_container {
  .btn-wrapper {
    margin-bottom: 8px;
  }
  .el-divider--horizontal {
    margin: 10px 0 10px;
  }
  .el-form--inline .el-form-item {
    margin: 0 0 5px 0;
  }
  /deep/ {
    .el-dialog {
      .el-dialog__header {
        padding: 23px 23px 10px 23px;
      }
      .el-dialog__body {
        padding: 10px 20px;
      }
    }
  }
}
</style>