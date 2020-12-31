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
        <el-button type="warning" size="small" @click="handleDistribute"
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
        :filterColumn="true"
        :multiple="true"
        fixedTwoRow
        highlight-current-row
        @pageChange="pageChange"
        @select="handelSelect"
      >
        <!-- 跟进次数 -->
        <template slot="visit" slot-scope="scope">
            <span class="visit-container" @click="drawerVisible = true">{{
            scope.row.visit || 0
            }}</span>
        </template>
      </rd-table>
    </div>
    <!-- 回访抽屉 -->
    <rd-drawer
      :dialogVisible="drawerVisible"
      @handleClose="drawerVisible = false"
    ></rd-drawer>

    <!-- 分配弹窗 -->
    <rd-dialog
        :title="'分配机会'"
        :dialogVisible="distributeVisible"
        :showFooter="false"
        :width="'990px'"
        @handleClose="distributeVisible = false"
      >
        <distribution/>
      </rd-dialog>
  </div>
</template>

<script>
let id = 0;
import rdDrawer from "@/components/RdDrawer";
import distribution from "./distribution";
export default {
  name: "branch-school",
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
          name: "机会ID",
          value: "name",
        },
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
          name: "学历",
          value: "cutdown"
        },
        {
          name: "咨询项目",
          value: "menuUrl",
        },
        {
          name: "咨询科目",
          value: "visit"
        },
        {
          name: "咨询班型",
          value: "menuOrder"
        },
        {
          name: "跟进次数",
          value: "visit",
          operate: true,
          width: 60
        },
        {
          name: "跟进状态",
          value: "description2",
        },
        {
          name: "跟进老师",
          value: "description3",
        },
        {
          name: "跟进时间",
          value: "description4",
        },
         {
          name: "创建时间",
          value: "description4",
        },
         {
          name: "进入公海时间",
          value: "description4",
        },
         {
          name: "机会来源",
          value: "description4",
        },
         {
          name: "分校/战队",
          value: "description4",
        },
         {
          name: "省份",
          value: "description4",
        },
         {
          name: "城市",
          value: "description4",
        },
         {
          name: "地址",
          value: "description4",
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
      drawerVisible: false,
      // 分配机会
      distributeVisible: false,
      distributeFormOptions:[
         {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择校区",
          label: "选择校区",
          options: [
            {
              label: "博士",
              value: "0",
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
          placeholder: "请输入姓名",
          label: "姓名"
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入手机号",
          label: "手机号"
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
      distributeRules:{
        updateReason: [
          { required: true, message: "请输入修改事由", trigger: "blur" },
        ]
      }
     
    };
  },
  components:{
      rdDrawer,
      distribution
  },
  methods: {
    handleAdd(){},
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
    submitDistributeForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
        }
          
      });
    },
    handleDistribute(){
      this.distributeVisible = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.branch-school {
}
</style>
