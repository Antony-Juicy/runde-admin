<template>
  <div class="activity-manage">
      <search-form
        :formOptions="formOptions"
        @onSearch="onSearch"
        ></search-form>
        <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="addVisible = true"
          >添加</el-button
        >
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig="pageConfig"
        fixedTwoRow
        @pageChange="pageChange"
      >
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click="handleDelete(scope.row)"
            type="text"
            size="small"
            style="color: #ffa500"
            >生成链接</el-button
          >
        </template>
      </rd-table>

      <!-- <rd-dialog
        :title="'添加机会'"
        :dialogVisible="addVisible"
        @handleClose="addVisible = false"
        @submitForm="submitAddForm('dataForm3')"
      >
        <RdForm :formOptions="addFormOptions" :rules="addRules" ref="dataForm3"/>
      </rd-dialog> -->
       <fullDialog v-model="addVisible" title="添加菜单" @change="addVisible = false">
           <RdForm :formOptions="addFormOptions" :inline="true" :rules="addRules" ref="dataForm3"/>
      </fullDialog>
    </div>
  </div>
</template>

<script>
import fullDialog from '@/components/FullDialog';
import RdForm from "@/components/RdForm";
export default {
  name:"activity-manage",
  data(){
    return {
        formOptions: [
              {
          prop: "menuName",
          element: "el-input",
          placeholder: "活动名称",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "公众号名称",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "是否隐藏",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "活动状态",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "项目类型",
        }
      ],
      tableData: [
        { id: 1, name: "飞翔的荷兰人3", cutdown: 1608897351706, visit: 2,phone:'15692026183' },
        { id: 2, name: "飞翔的荷兰人2",cutdown: new Date().getTime(),phone:'17092026183'  },
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
      ],
      tableKey: [
        {
          name: "ID",
          value: "name",
        },
         {
          name: "项目类型",
          value: "phone"
        },
        {
          name: "活动名称",
          value: "cutdown"
        },
        {
          name: "公众号名称",
          value: "menuUrl",
        },
        {
          name: "邀请码类型",
          value: "visit"
        },
        {
          name: "活动时间",
          value: "menuOrder"
        },
        {
          name: "是否强制关注",
          value: "description1",
        },
        {
          name: "是否强制分享",
          value: "description2",
        },
        {
          name: "活动是否隐藏",
          value: "description3",
        },
        {
          name: "活动状态",
          value: "description4",
        }, 
        {
          name: "活动描述",
          value: "description4",
        },
        {
            name:"操作",
            value:"edit",
            operate: true,
            width: 140
        }
      ],
      pageConfig: {
        totalCount: 100,
        currentPage: 1,
        pageSize: 10,
      },
      addVisible: false,
      addFormOptions:[
         {
          prop: "name",
          element: "el-input",
          placeholder: "请输入活动名称",
          label: "活动名称"
        },
        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "活动时间(开始)",
          endPlaceholder: "活动时间(结束)",
          initWidth: true,
          label: "活动时间",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入字段一名称",
          label: "字段一名称"
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入字段二名称",
          label: "字段二名称"
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "销售来源",
          label: "销售来源",
          options: [
            {
              label: "博士",
              value: 0,
            },
            {
              label: "硕士",
              value: 1,
            },
          ],
        },
        {
            prop: "time",
          element: "el-date-picker",
          startPlaceholder: "进入公海时间(开始)",
          endPlaceholder: "进入公海时间(结束)",
          initWidth: true,
          label: "公海时间",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "跟进老师",
          label: "跟进老师",
          options: [
            {
              label: "博士",
              value: 0,
            },
            {
              label: "硕士",
              value: 1,
            },
          ],
        },
         {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入地址",
          label: "地址",
        },
        {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入备注",
          label: "备注",
          type:"textarea",
          rows: 2
        }
      ],
      addRules:{
        updateReason: [
          { required: true, message: "请输入修改事由", trigger: "blur" },
        ]
      }
    }
  },
  components:{
      fullDialog,
      RdForm
  },
   methods: {
       onSearch(){

       },
       handleAdd(){

       },
        pageChange(val) {
      // this.pageConfig.currentPage = val.page;
      // this.pageConfig.pageSize = val.limit;
      // console.log(this.searchForm,'this.searchForm--')
      // this.getTableData({
      //   currentPage: (val && val.page) || 1,
      //   pageSize: (val && val.limit) || 10,
      //   loginUserId,
      //   ...this.searchForm,
      //   parentId: this.parentId
      // });
    },
  }
}
</script>

<style lang="scss" scoped>
.activity-manage {

}
</style>
