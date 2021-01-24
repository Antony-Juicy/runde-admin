<template>
  <div class="importphonequery_container">
    <search-form :formOptions = "formOptions" @onSearch = onSearch></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="openDialog">导入查询</el-button>
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
      <rd-dialog
        title="导入手机号码查询订单"
        :dialogVisible="dialogVisible"
        @handleClose="closeDialog('dataForm')"
        @submitForm="submitForm('dataForm')"
      >
        <el-form ref="dataForm" :model="phoneForm" label-width="150px">
          <el-form-item label="导入模版">
            <el-button type="primary" size="small">点击下载模版</el-button>
          </el-form-item>
          <el-form-item label="文件">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-change="handleChange"
              :file-list="fileList">
              <el-button size="small" type="primary">选择文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="跟进详情" prop="detail">
            <el-input
              v-model.trim="phoneForm.detail"
              autocomplete="off"
              type="textarea"
              placeholder="请勿输入备注"
              size="small"
            />
          </el-form-item>
          <P style="color:red;text-align: center;">特别提醒 导入模版中【手机号码】不能为空.否则会导入失败！！！</P>
        </el-form>
      </rd-dialog>
    </div>
  </div>
</template>

<script>
import searchForm from '@/components/Searchform';
export default {
  name:'importphone-query',
  components: {
    searchForm
  },
  data () {
    return {
      showNum: 4,
      searchForm: {},
      formOptions: [
        { prop: 'staffName', element: 'el-input', initValue: '', placeholder: '请输入操作人' },
        { prop: '_id', element: 'el-input', initValue: '', placeholder: '请输入id' },
        { prop: 'remark', element: 'el-input', initValue: '', placeholder: '请输入备注' },
        { prop: 'campusId', element: 'el-select', initValue: '', placeholder: '请选择分校' ,filterable: true},
        { prop: 'createAt', element: 'el-date-picker', initValue: '', startPlaceholder: "创建时间(开始)",
          endPlaceholder: "创建时间(结束)" }
      ],
      tableData: [],
      tableKey: [
        { name: 'ID',value: '_id' },
        { name: '操作人',value: 'staff_name' },
        { name: '所在分校',value: 'campus_name' },
        { name: '导入的手机号码数量',value: 'phone_count' },
        { name: '导出的订单数量',value: 'order_count' },
        { name: '创建时间',value: 'create_at' },
        { name: '操作人IP',value: 'staff_ip' },
        { name: '备注',value: 'remark' },
      ],
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 100,
        currentPage: 1,
        showCount: 10,
      },
      loading: false,

      // 导入手机弹窗参数
      dialogVisible: false,
      phoneForm: {
        detail: ''
      },
      fileList: [
        // {
        //   name: 'food.jpeg',
        //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        // }, {
        //   name: 'food2.jpeg',
        //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        // }
      ]
    }
  },
  mounted(){
    this.getTableData();
    this.getSelectList();
  },
  methods: {
    onSearch(val) {
      this.searchForm = {
        ...val,
        createAt: val.createAt?val.createAt.join(' ~ '):""
      };
      console.log(val,this.searchForm , 'val---')
      this.getTableData();
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    // 导入手机号码弹窗
    openDialog() {
      this.dialogVisible = true;
    },
    closeDialog(formName) {
      this.dialogVisible = false;
      // this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.closeDialog("dataForm")
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    getTableData(params = {}) {
      const loading = this.$loading({
        lock: true,
        target: ".el-table",
      });
      this.$fetch("chance_import_list", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.create_at = item.create_at&&this.$common._formatDates(item.create_at);
          item.recentFeedbackTime = item.recentFeedbackTime&&this.$common._formatDates(item.recentFeedbackTime);
          item.nextFeedBackTime = item.nextFeedBackTime&&this.$common._formatDates(item.nextFeedBackTime);
          item.allotTime = item.allotTime&&this.$common._formatDates(item.allotTime);
          if(item.enquireClassOne){
            item.enquireClassOne = item.enquireClassOne.map(ele=>(ele.name)).join(",")
          }
          return item;
        });
        this.pageConfig.totalCount = res.data.pager.totalRows;
        setTimeout(() => {
          loading.close();
        }, 200);
      });
    },
    getSelectList(){
      this.$fetch("chance_config_campusList").then(res => {
         let campusOptions = res.data.data.map((item) => ({
            label: item.campusName,
            value: item.id,
          }));
          this.formOptions[3].options = campusOptions;
          this.formOptions = [...this.formOptions];
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.importphonequery_container {
  .btn-wrapper {
    margin-bottom: 8px;
  }
}
</style>