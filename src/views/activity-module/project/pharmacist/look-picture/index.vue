<template>
  <div class="look-picture">
      <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd"
          >添加</el-button
        >
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig.sync="pageConfig"
        :tbodyHeight="600"
        fixedTwoRow
        @pageChange="pageChange"
        :emptyText="emptyText"
      >
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleDetail(scope.row)" type="text" size="small" style="color: #ffa500"
            >上传题目</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleDetail(scope.row)" type="text" size="small" style="color: #ffa500"
            >查看题目详情</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click="handleDelete(scope.row)"
            type="text"
            size="small"
            style="color: #ec5b56"
            >删除</el-button
          >
        </template>
      </rd-table>
    </div>
    
    <!-- 添加 -->
    <rd-dialog
        :title="addStatus?'添加':'编辑'"
        :dialogVisible="addVisible"
        @handleClose="addVisible = false"
        @submitForm="submitAddForm('dataForm3')"
      >
        <RdForm :formOptions="addFormOptions" formLabelWidth="120px" :rules="addRules" ref="dataForm3">
          <template slot="post">
            <el-button size="small" type="primary">上传</el-button>
          </template>
        </RdForm>
      </rd-dialog>

      <!-- 题目详情 -->
      <el-drawer
          :visible.sync="detailVisible"
          title="题目详情"
          size="50%"
        >
          <subjectDetail
            ref="subjectDetail"
            @close="detailVisible = false"
            v-if="detailVisible"
          />
      </el-drawer>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import Fetch from '@/utils/fetch';
import subjectDetail from "@/views/activity-module/project/common/audition-link/audition-subject/subjectDetail";
export default {
  name:"look-picture",
  data(){
    return {
      formOptions: [
        {
          prop: "menuName",
          element: "el-cascader",
          placeholder: "项目类型",
          props: {
            checkStrictly: true,
            lazy: true,
            lazyLoad:(node, resolve)=> {
              console.log(node,'node')
              const { level } = node;
              if(level == 0){
                Fetch("chance_product_list").then(res => {
                  let data = JSON.parse(res.msg);
                  let nodes = data.map(item =>({
                    value: item.id,
                    label: item.productName,
                    leaf: level >= 2,
                  }));
                  resolve(nodes);
                })
              }else if(level == 1){
                 Fetch("chance_subject_list",{
                   enquireProductIdOne: node.data.value
                 }).then(res => {
                   let nodes;
                   if(res.msg == "没有相关数据"){
                     nodes = [];
                   }else {
                     let data = res.data;
                    nodes = data.map(item =>({
                      value: item.id,
                      label: item.subjectName,
                      leaf: level >= 2,
                    }));
                   }
                  resolve(nodes);
                })
              }else if(level == 2){
                 Fetch("chance_course_list",{
                   subjectIdOne: node.data.value
                 }).then(res => {
                   let nodes;
                   if(res.msg == "没有相关数据"){
                     nodes = [];
                   }else {
                     let data =JSON.parse(res.msg);
                    nodes = data.map(item =>({
                      value: item.id,
                      label: item.courseName,
                      leaf: level >= 2,
                    }));
                   }
                  resolve(nodes);
                })
              }else {
                resolve([]);
              }
            },
          },
          initWidth: true
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "中西药",
          options: [
            {
              label:"中药",
              value:"1"
            },
            {
              label:"西药",
              value:"2"
            }
          ]
        }
      ],
      searchForm:{},
      emptyText:"暂无数据",
      tableData:[
         {
          id: 1,
          name: "飞翔的荷兰人3",
          cutdown: 1608897351706,
          visit: 2,
          phone: "15692026183",
        },
      ],
      tableKey: [
        {
          name: "ID主键",
          value: "id",
          fixed: "left",
          width: 80
        },
        {
          name: "一级项目",
          value: "staffName",
        },
        {
          name: "二级项目",
          value: "goodsName",
        },
        {
          name: "中西药",
          value: "activityName",
        },
        {
          name: "题目描述",
          value: "posterName",
        },
        {
          name: "数据状态",
          value: "posterPic",
        },
        {
          name: "排序",
          value: "posterCopyFirst",
          width: 80
        },
        {
          name: "创建时间",
          value: "createAt",
        },
        {
          name: "更新时间",
          value: "updateAt",
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 160,
          fixed: "right"
        },
      ],
       pageConfig: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
      },
      addVisible: false,
      addFormOptions: [
          
        // {
        //   prop: "menuName",
        //   element: "el-input",
        //   placeholder: "请输入名称",
        //   label: "名称"
        // },
        // {
        //   prop: "post",
        //   element: "el-input",
        //   placeholder: "",
        //   label: "上传",
        //   operate: true,
        //   initValue: 0
        // },
        {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择",
          label: "一级项目类型",
          options: [
          ],
        },
        {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择",
          label: "二级项目类型",
          options: [
          ],
        },
         {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择",
          label: "中西药",
          options: [
            {
              label:"中药",
              value:"1"
            },
            {
              label:"西药",
              value:"2"
            }
          ],
        },
        {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "题目描述",
          type:"textarea",
          rows: 1
        },
         {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "排序"
        }
      ],
      addRules:{
        updateReason: [
          { required: true, message: "请输入修改事由", trigger: "blur" },
        ]
      },
      addStatus: true,
      detailVisible: false
    }
  },
  components:{
    RdForm,
    subjectDetail
  },
   methods: {
     onSearch(val){
       this.searchForm = {
        ...val
      };
      console.log(val,this.searchForm , 'val---')
      this.getTableData();
     },
     getTableData(){

     },
     pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    handleAdd(){
      this.addVisible = true;
    },
    submitAddForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
        }
          
      });
    },
    handleEdit(data){
      this.addStatus = false;
      this.addVisible = true;
    },
    handleDelete(row) {
      let info = '';
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$fetch("projectType_delete", {
            typeId: row.typeId,
            loginUserId,
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
        })
        .catch(() => {});
    },
    handleDetail(data){
      this.detailVisible = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.look-picture {

}
</style>
