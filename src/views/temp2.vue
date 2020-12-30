<template>
  <div class="branch-school">
    <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd"
          >领取</el-button
        >
        <el-button type="warning" size="small" @click="handleAdd"
          >分配</el-button
        >
        <el-button type="info" size="small" @click="handleAdd"
          >AI呼叫</el-button
        >
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig="pageConfig"
        :multiple="true"
        :filterColumn="true"
        fixedTwoRow
        highlight-current-row
        @pageChange="pageChange"
        @select="handelSelect"
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
            style="color: #ec5b56"
            >删除</el-button
          >
        </template>
      </rd-table>
      <rd-dialog
      :title="'123'"
      :dialogVisible="dialogVisible"
      @handleClose="handleClose('dataForm')"
      @submitForm="submitForm('dataForm')"
    >
      <el-form
        ref="dataForm"
        :model="basicInfo"
        :rules="rules"
        :label-width="formLabelWidth"
      >
       <el-form-item label="分组" prop="parentId" :label-width="formLabelWidth">
          <el-select v-model="basicInfo.parentId" placeholder="请选择分组">
            <el-option
              v-for="item in permissionGroup2"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="名称"
          prop="roleName"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model.trim = "basicInfo.roleName"
            autocomplete="off"
            placeholder="请输入角色名称"
          />
        </el-form-item>
        <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
          <el-input
            v-model="basicInfo.remark"
            autocomplete="off"
            placeholder="请输入备注"
            type="textarea"
            :rows="3"
          />
        </el-form-item>
      </el-form>
    </rd-dialog>
    </div>
  </div>
</template>

<script>
let id = 0;
export default {
  name: "temp2",
  data() {
    return {
      formOptions: [
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "员工状态",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "跟进老师",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "机会状态",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "姓名",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "手机",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "省份",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "城市",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "地址",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "注册人",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "学历",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "来源",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "组织架构",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "呼叫状态",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "跟进次数",
        },
        // 课程
        {
          prop: "abc",
          element: "el-cascader",
          placeholder: "课程",
          props: {
            checkStrictly: true,
            lazy: true,
            lazyLoad(node, resolve) {
              const { level } = node;
              setTimeout(() => {
                const nodes = Array.from({ length: level + 1 }).map((item) => ({
                  value: ++id,
                  label: `选项${id}`,
                  leaf: level >= 2,
                }));
                // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                resolve(nodes);
              }, 1000);
            },
          },
          initWidth: true,
        },
        // 时间
        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "最近跟进时间(开始)",
          endPlaceholder: "最近跟进时间(结束)",
          initWidth: true,
        },
        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "创建时间(开始)",
          endPlaceholder: "创建时间(结束)",
          initWidth: true,
        },
        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "进入公海时间(开始)",
          endPlaceholder: "进入公海时间(结束)",
          initWidth: true,
        },
      ],
       tableData: [
        { id: 1, name: "飞翔的荷兰人3", cutdown: 1608897351706, visit: 2,phone:'15692026183' },
        { id: 2, name: "飞翔的荷兰人2",cutdown: new Date().getTime(),phone:'17092026183'  },
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183'  },
      ],
      tableKey: [
        {
          name: "姓名",
          value: "name",
        },
         {
          name: "手机号",
          value: "phone",
          operate: true
        },
        {
          name: "回收倒计时",
          value: "cutdown",
          operate: true,
          width: 155,
        },
        {
          name: "机会来源",
          value: "menuUrl",
        },
        {
          name: "回访",
          value: "visit",
          operate: true,
          width: 60,
        },
        {
          name: "最近回访",
          value: "menuOrder",
          // width: 100
        },
        {
          name: "下次回访",
          value: "description1",
        },
        {
          name: "跟进状态",
          value: "description2",
        },
        {
          name: "创建时间",
          value: "description3",
        },
        {
          name: "呼叫状态",
          value: "description4",
        },
      ],
      pageConfig: {
        totalCount: 100,
        currentPage: 1,
        pageSize: 10,
      },
      selectedData:[],

      // 弹窗
      dialogVisible: false,
       formLabelWidth: "100px",
       basicInfo: {
        // roleCode: "",
        roleName: "",
        status: "",
        remark: "",
        updateReason: "",
        parentId:""
      },
      rules: {
        // roleCode: [{ required: true, message: "请获取编码", trigger: "blur" }],
        updateReason: [
          { required: true, message: "请输入修改事由", trigger: "blur" },
        ],
        roleName: [
          { required: true, message: "请输入名称", trigger: "blur" },
           {  max: 25, message: '长度不多于25个字符', trigger: 'blur' }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
        parentId: [{ required: true, message: "请选择分组", trigger: "blur" }],
      },
      permissionGroup2:[]
    };
  },
  methods: {
    onSearch() {},
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
    handelSelect(val) {
      console.log(val, "valll");
      this.selectedData = val;
    },
     // 弹窗关闭
    handleClose(formName) {
      this.dialogVisible = false;
      this.$refs[formName].resetFields();
    },
    // 弹窗提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.basicInfo, "提交");
           // 新增
            this.$fetch("role_save", {
              ...this.basicInfo,
              loginUserId,
            }).then((res) => {
              this.$message({
                message: "提交成功",
                type: "success",
              });
              this.handleClose("dataForm");
              this.handleTabClick(this.tabPermission);
              console.log(this.tabPermission,this.basicInfo.parentId,'this.tabPermission--')
              if(this.basicInfo.parentId == "") {
                this.getGroupData();
              }
            });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.branch-school {
}
</style>
