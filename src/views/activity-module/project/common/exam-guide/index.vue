<template>
  <div class="examguide-container">
    <div class="w-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="报考省份" name="first">
          <search-form :formOptions="formOptions" :showNum="7" @onSearch="onSearch"></search-form>
          <!-- <div class="w-container"> -->
            <div class="btn-wrapper">
              <el-button type="primary" size="small" @click="handleAdd">添加</el-button>
            </div>
            <rd-table
              :tableData="tableData"
              :tableKey="tableKey"
              :loading="loading"
              :pageConfig.sync="pageConfig"
              :tbodyHeight="600"
              fixedTwoRow
              @pageChange="pageChange"
              :emptyText="emptyText">
              <template slot="edit" slot-scope="scope">
                <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button @click="handleDelete(scope.row)" type="text" size="small" style="color: #ec5b56">删除</el-button>
              </template>
            </rd-table>
          <!-- </div> -->
          
          <!-- 添加海报 -->
          <rd-dialog
            :title="addStatus?'添加省份':'编辑省份'"
            :dialogVisible="addVisible"
            @handleClose="addVisible = false"
            @submitForm="submitAddForm('dataForm')">
            <RdForm :formOptions="addFormOptions" formLabelWidth="120px" :rules="addRules" ref="dataForm"></RdForm>
          </rd-dialog>
        </el-tab-pane>
        <el-tab-pane label="报考信息" name="two">
          <Information ref="Information"></Information>
        </el-tab-pane>
        <el-tab-pane label="报考专业" name="three">
          333
        </el-tab-pane>
        <el-tab-pane label="审核通知" name="four">
          444
        </el-tab-pane>
      </el-tabs>
    </div>
    
  </div>
</template>

<script>
import Information from './information';
export default {
  name:"exam-guide",
  components:{
    Information
  },
  data(){
    return {
      activeName: 'first',
      tabIndex: "0",
      formOptions: [
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "请选择项目",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入省份名称",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请选择状态",
        }
      ],
      searchForm:{},
      emptyText:"暂无数据",
      fixedTwoRow: true,
      tableData:[
        
      ],
      tableKey: [
        {
          name: "主键id",
          value: "id",
          fixed: "left",
          width: 80
        },
        {
          name: "项目",
          value: "staffName",
        },
        {
          name: "省份/学历名称",
          value: "goodsName",
        },
        {
          name: "类型",
          value: "activityName",
        },
        {
          name: "级别",
          value: "posterName",
        },
        {
          name: "排序",
          value: "posterPic",
        },
        {
          name: "状态",
          value: "posterCopyFirst",
        },
        {
          name: "创建时间",
          value: "posterCopySecond",
        },
        {
          name: "更新时间",
          value: "posterCopyThird",
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 140,
          fixed: "right"
        },
      ],
       pageConfig: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
      },
      loading: false,

      addStatus: true,
      addVisible: false,
      addFormOptions: [
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "请选择项目",
          label: "项目",
          options: [
            {
              label: "2019执业药师",
              value: 0,
            },
            {
              label: "2020执业医师",
              value: 1,
            },
            {
              label: "2020执业医师(新)",
              value: 2,
            },
          ],
        },
        {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择级别",
          label: "级别",
          options: [
            {
              label: "一级",
              value: 0,
            },
            {
              label: "二级",
              value: 1,
            },
          ],
        },
        {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择",
          label: "省份/学历",
          options: [
            {
              label: "省份",
              value: 0,
            },
            {
              label: "学历",
              value: 1,
            },
          ],
        },
        {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入省份名称",
          label: "省份/学历名称"
        },
        {
          prop: "menuName3",
          element: "el-input-number",
          placeholder: "请输入排序",
          label: "排序"
        },
        {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入备注",
          label: "备注"
        }
      ],
      addRules: {},
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab.index, "click");
      this.tabIndex = tab.index;
      // if(tab.index == 0){
      //   this.$refs.Manage.getTableData();
      // }else if(tab.index == 1){
      //   this.$refs.Count.getTableData();
      // }
    },
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
      let info = '省份';
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
    }
  }
}
</script>

<style lang="scss" scoped>
.examguide-container {

}
</style>
