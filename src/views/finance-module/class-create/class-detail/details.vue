<template>
  <div class="details">
    <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button
          type="success"
          size="small"
          @click="handleAdd(1)"
          icon="el-icon-plus"
          >添加</el-button
        >
        <el-button
          type="primary"
          size="small"
          @click="handleAdd(5)"
          icon="el-icon-edit"
          >批量设置价格</el-button
        >
        <el-button
          type="warning"
          size="small"
          @click="handleAdd(2)"
          icon="el-icon-plus"
          >批量共享连锁价格</el-button
        >
      </div>
      <rd-table
        :multiple="true"
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig.sync="pageConfig"
        fixedTwoRow
        @pageChange="pageChange"
        :emptyText="emptyText"
      >
        <template slot="chainName" slot-scope="scope">
          <el-button type="text" @click="handleOpen(scope.row)">{{
            scope.row.chainName
          }}</el-button>
        </template>
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
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
    <!-- 添加 -->
    <rd-dialog
      title="批量享连锁价格"
      :dialogVisible="setVisible"
      appendToBody
      @handleClose="setVisible = false"
      @submitForm="submitAddForm('dataForm3')"
    >
      <RdForm
        :formOptions="addFormOptions2"
        formLabelWidth="120px"
        :rules="addRules"
        ref="dataForm2"
      >
      </RdForm>
    </rd-dialog>
    <!-- 批量设置价格 -->
    <rd-dialog
      :title="'批量设置价格'"
      :dialogVisible="addPriceVisible"
      appendToBody
      @handleClose="addPriceVisible = false"
      @submitForm="submitAddPriceForm('dataForm3')"
    >
      <RdForm
        :formOptions="addFormOptions3"
        formLabelWidth="120px"
        :rules="addRules"
        ref="dataForm3"
      >
        <template slot="subjectId">
          <el-form
            ref="dataForm2"
            :model="basicInfo"
            :rules="rules"
            label-width="120px"
          >
            <el-form-item style="margin-left: -120px; margin-bottom: 20px">
              <el-select
                v-model="basicInfo.region"
                placeholder="请选择活动区域"
              >
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <div
              class="param-item"
              v-for="(item, index) in basicInfo.course"
              :key="item.value"
            >
              <el-form-item
                :prop="'course.' + index + '.coursePrice'"
                label-width="0"
                :rules="{
                  required: item.checked ? true : false,
                  message: '请输入价格',
                  trigger: 'blur',
                }"
              >
                <el-checkbox
                  v-model="item.checked"
                  :label="item.label"
                ></el-checkbox>

                <el-input
                  v-model="item.coursePrice"
                  size="small"
                  placeholder="请输入价格"
                  style="width: 200px; margin-left: 20px"
                ></el-input>
                <el-switch
                  active-text="计算业绩"
                  style="margin-left: 20px"
                  v-model="item.isperformance"
                  active-color="#13ce66"
                  inactive-color="#dcdfe6"
                >
                </el-switch>
              </el-form-item>
            </div>
          </el-form>
        </template>
      </RdForm>
    </rd-dialog>
 
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
export default {
  name: "details",
  components: {
    RdForm,
  },
  data() {
    return {
      setVisible: false,
      formOptions: [
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "状态",
          options: [],
        },
        {
          prop: "menuName1",
          element: "el-select",
          placeholder: "校区",
          options: [],
          multiple: true,
        },
      ],
      searchForm: {},
      emptyText: "暂无数据",
      tableData: [
        {
          status: 1,
          chainName: 2,
          className: 3,
          campusName: "汕头分校(广东校区)",
        },
      ],
      tableKey: [
        {
          name: "校区连锁名",
          value: "chainName",
          operate: true,
        },
        {
          name: "班次名称",
          value: "className",
        },
        {
          name: "校区名称",
          value: "campusName",
        },
        {
          name: "状态",
          value: "status",
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
          prop: "campusName",
          element: "el-input",
          placeholder: "请输入",
          label: "校区",
        },
        {
          prop: "className",
          element: "el-input",
          placeholder: "请输入",
          label: "班次",
          options: [],
        },
        {
          prop: "chainName",
          element: "el-select",
          placeholder: "请选择",
          label: "连锁",
          options: [],
        },
        {
          prop: "status",
          element: "el-select",
          placeholder: "请选择",
          label: "状态",
          options: [],
        },
      ],
      addFormOptions2: [
        {
          prop: "sareCampus",
          element: "el-select",
          placeholder: "请选择",
          label: "选择要共享的分校",
          options: [],
        },
      ],
      addFormOptions3: [
        {
          prop: "chainName",
          element: "el-input",
          placeholder: "请输入",
          label: "连锁",
          options: [],
        },
        {
          prop: "className",
          element: "el-input",
          placeholder: "请输入",
          label: "班次名称",
        },
        {
          prop: "projectName",
          element: "el-select",
          placeholder: "请选择",
          label: "项目",
          options: [],
        },
        {
          prop: "subjectId",
          element: "el-select",
          placeholder: "请选择",
          label: "科目",
          options: [],
          operate: true,
        },
      ],
      addRules: {
        campusName: [{ required: true, message: "请输入", trigger: "blur" }],
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
  methods: {
    handleOpen(data) {
      // this.detailsVisible = false;
      // this.chainTableVisible = true;
      this.$emit("openChainTable",data)
    },
    onSearch(val) {
      this.searchForm = {
        ...val,
      };
      console.log(val, this.searchForm, "val---");
      this.getTableData();
    },
    getTableData() {},
    pageChange(val) {
      console.log(val, "pagechange");
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    handleAdd(index) {
      if (index == 1) {
        //添加
        this.addStatus = true;
        this.addVisible = true;
      } else if (index == 2) {
        this.setVisible = true;
      } else if (index == 5) {
        this.addPriceVisible = true;
      }
    },
    submitAddForm(formName) {
      this.$refs[formName].validate((valid, formData) => {
        if (valid) {
          console.log(formData, "提交");
        }
      });
    },
    submitAddPriceForm(formName) {
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
    handleDelete(row) {
      let info = "";
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$fetch("projectType_delete", {
            id: row.id,
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
  },
};
</script>


<style lang="scss" scoped>
.details {
}
</style>
