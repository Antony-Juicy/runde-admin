<template>
  <div class="chainTable">
    <div class="w-container">
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig.sync="pageConfig"
        fixedTwoRow
        @pageChange="pageChange"
        :emptyText="emptyText"
      >
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
        </template>
      </rd-table>
    </div>

    <!-- 添加 -->
    <rd-dialog
      :title="addStatus ? '添加菜单' : '编辑菜单'"
      :dialogVisible="addVisible"
      appendToBody
      @handleClose="addVisible = false"
      @submitForm="submitAddForm('dataForm3')"
    >
      <RdForm
        :formOptions="addFormOptions"
        formLabelWidth="120px"
        :rules="addRules"
        ref="dataForm1"
      >
      </RdForm>
    </rd-dialog>
 
  
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
export default {
  name: "chainTable",
  data() {
    return {
      emptyText: "暂无数据",
      tableData: [
        {
          id: 1,
          chainName: '汕头市凯德药品连锁有限公司（汕头分校谈判）',
          className: '价格显示查看',
          coursesnum:4,
          coursesPrice: 2300,
        },
      ],
      tableKey: [
        {
          name: "id",
          value: "id",
        },
        {
          name: "连锁名",
          value: "chainName",
        },
        {
          name: "班次名称",
          value: "className",
        },
        {
          name: "课程数",
          value: "coursesnum",
        },
        {
          name: "课程价格",
          value: "coursesPrice",
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 140,
          fixed: "right",
        },
      ],
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
      },
      addVisible: false,
      addPriceVisible: false,
      addFormOptions: [
        {
          prop: "coursesPrice",
          element: "el-input",
          placeholder: "请输入",
          label: "价格",
        },
       
      ],
   
   
      addRules: {
        coursesPrice: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      addStatus: true,
      editId: "",
      basicInfo: {
        course: [1, 2, 3],
        region: "",
      },
      rules: {},
    };
  },
  components: {
    RdForm,
  },
  methods: {
    handleOpen(data) {
      // this.detailsVisible = true;
    },
    getTableData() {},
    pageChange(val) {
      console.log(val, "pagechange");
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
  
    submitAddForm(formName) {
      this.$refs[formName].validate((valid, formData) => {
        if (valid) {
          console.log(formData, "提交");
        }
      });
    },
    handleEdit(data) {
      this.addStatus = false;
      this.addVisible = true;
      this.addFormOptions.forEach((item) => {
        item.initValue = data[item.prop];
      });
      setTimeout(() => {
        this.$refs.dataForm3.addInitValue();
      }, 0);
      this.editId = data.id;
    },
   
  },
};
</script>


<style lang="scss" scoped>
.chainTable {
  padding-top: 30px;
}
</style>
