<template>
  <div class="share-container">
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
        :title="addStatus?'添加':'编辑'"
        :dialogVisible="addVisible"
        @handleClose="addVisible = false"
        @submitForm="submitAddForm('dataForm')">
        <RdForm :formOptions="addFormOptions" formLabelWidth="120px" :rules="addRules" ref="dataForm">
          <template slot="icon">
            <Upload-oss
              v-if="uploadOssElem"
              :objConfig="{ module: 'live', project: 'icon_' }"
              :src.sync="coverImg"
              :initGetConfig="initGetConfig"
              @srcChangeFun="
                (data) => {
                  coverImg = data;
                  reloadElem('uploadOssElem');
                }
              "
            />
          </template>
        </RdForm>
      </rd-dialog>
    </div>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import UploadOss from "@/components/UploadOss";
export default {
  name:"share-count",
  components:{
    RdForm,
    UploadOss
  },
  data(){
    return {
      showNum: 6,
      searchForm: {},
      formOptions: [
        { prop: 'title', element: 'el-input', placeholder: '请输入标题' },
        { prop: 'activity', element: 'el-select', placeholder: '请选择活动' },
        { 
          prop: 'status',
          element: 'el-select',
          placeholder: '请选择状态',
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
      ],
      tableData: [],
      tableKey: [
        { name: '序号',value: 'value1' },
        { name: '活动名称',value: 'value2' },
        { name: '标题',value: 'value3' },
        { name: '内容',value: 'value4' },
        { name: '图标',value: 'value5' },
        { name: '状态',value: 'value6' },
        { name: '操作',value: 'edit',operate: true,width: 140 }
      ],
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 0,
        pageNum: 1,
        showCount: 10,
      },
      loading: false,

      uploadOssElem: true,
      initGetConfig: true,
      coverImg: "",
      addStatus: true,
      addVisible: false,
      addFormOptions: [
        {
          prop: "title",
          element: "el-input",
          placeholder: "请输入标题",
          label: "标题"
        },
        {
          prop: "content",
          element: "el-input",
          placeholder: "请输入内容",
          label: "内容",
          type:"textarea"
        },
        {
          prop: "icon",
          element: "el-input",
          label: "图标",
          operate: true,
          initValue: 0,
        },
        {
          prop: "activityName",
          element: "el-select",
          placeholder: "请选择",
          label: "活动名称"
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
      this.pageConfig.showCount = val.limit;
      // this.getTableData();
    },
    handleAdd(){
      this.addVisible = true;
    },
    handleEdit(row) {},
    handleDelete(row) {},
    // 上传组件
    reloadElem(dataElem) {
      console.log("reload");
      // 重新加载组件
      this[dataElem] = false;
      this.$nextTick(() => {
        this[dataElem] = true;
      });
    },
  },
  filters: {
    
  },
}
</script>

<style lang="scss" scoped>
.share-container {
  
}
</style>
