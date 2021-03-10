<template>
  <div class="link-container">
    <search-form :formOptions = "formOptions" :showNum="showNum" @onSearch = onSearch></search-form>
    <div class="w-container mt-15">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd">添加</el-button>
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
        :title="addStatus?'添加直播链接':'编辑直播链接'"
        :dialogVisible="addVisible"
        @handleClose="addVisible = false"
        @submitForm="submitAddForm('dataForm')">
        <RdForm :formOptions="addFormOptions" formLabelWidth="120px" :rules="addRules" ref="dataForm"></RdForm>
      </rd-dialog>
    </div>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
export default {
  name:"link-transcoding",
  components:{
    RdForm
  },
  data(){
    return {
      showNum: 6,
      searchForm: {},
      formOptions: [
        { prop: 'liveId', element: 'el-input', placeholder: '请输入标题' },
        { prop: 'liveId', element: 'el-select', placeholder: '请选择活动' },
        { prop: 'liveId', element: 'el-input', placeholder: '请选择状态' }
      ],
      tableData: [],
      tableKey: [
        { name: '序号',value: 'value1' },
        { name: '活动名称',value: 'value2' },
        { name: '标题',value: 'value3' },
        { name: '内容',value: 'value4' },
        { name: '图标',value: 'value5' },
        { name: '状态',value: 'value6' },
        { name: '操作',value: 'edit',operate: true,width: 280 }
      ],
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 0,
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,

      addStatus: true,
      addVisible: false,
      addFormOptions: [
        {
          prop: "liveLink",
          element: "el-input",
          placeholder: "请输入直播链接",
          label: "直播链接"
        },
        {
          prop: "liveLinkTranscoding",
          element: "el-input",
          placeholder: "请输入直播转码链接",
          label: "直播转码链接",
          type:"textarea"
        },
        { 
          prop: 'status',
          element: 'el-select',
          placeholder: '请选择状态',
          label: "状态",
          options: [
            {
              label: "正常",
              value: 0,
            },
            {
              label: "暂停",
              value: 1,
            }
          ],
        },
        {
          prop: "status",
          element: "el-input",
          placeholder: "备注",
          label: "备注",
          type:"textarea"
        },
      ],
      addRules: {},
    }
  },
  mounted () {
    // this.getTypeData();
    // this.getTableData();
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
    // 获取项目类型
    getTypeData() {
      
    },
    getTableData(params={}) {
      return new Promise((resolve,reject)=>{
        this.$fetch(
          "",
          {
            ...this.pageConfig,
            ...this.searchForm,
            ...params
          }
        ).then((res) => {
          this.tableData = res.data.records;
          this.pageConfig.totalCount = res.data.totalCount;
          resolve();
        })
      })
    },
    pageChange(val) {
      this.pageConfig.pageNum = val.page;
      this.pageConfig.pageSize = val.limit;
      // this.getTableData();
    },
    handleAdd(){
      this.addVisible = true;
    },
    handleEdit(row) {},
    handleDelete(row) {}
  },
  filters: {
    
  },
}
</script>

<style lang="scss" scoped>
.link-container {
  
}
</style>
