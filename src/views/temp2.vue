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
        :pageConfig.sync="pageConfig"
        :multiple="true"
        :filterColumn="true"
        :tbodyHeight="600"
        fixedTwoRow
        highlight-current-row
        @pageChange="pageChange"
        @select="handelSelect"
        :emptyText="emptyText"
      >
      <!-- 手机号 -->
          <template slot="phone" slot-scope="scope">
            {{ $common.hidePhone(scope.row.phone) }}
          </template>
          <!-- 回访 -->
      <template slot="visit" slot-scope="scope">
            <span class="visit-container" @click.stop="openDrawer(scope.row)">{{
              scope.row.feedbackCount || 0
            }}</span>
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

      <rd-dialog
        :title="'添加机会'"
        :dialogVisible="addVisible"
        @handleClose="addVisible = false"
        @submitForm="submitAddForm('dataForm3')"
      >
        <RdForm :formOptions="addFormOptions" :rules="addRules" ref="dataForm3">
          <template slot="temp">
            <el-button size="small" type="primary">点击下载模板</el-button>
        </template>
        </RdForm>
      </rd-dialog>

       <!-- 回访抽屉 -->
    <rd-drawer
      :dialogVisible="drawerVisible"
      :id="drawerId"
      :phone="drawerPhone"
       :title="drawerTitle"
      @handleClose="drawerVisible = false"
    ></rd-drawer>
    </div>
  </div>
</template>

<script>
let id = 0;
import RdForm from "@/components/RdForm";
import Fetch from '@/utils/fetch'
export default {
  name: "temp2",
  data() {
    return {
      emptyText:"暂无数据",

      drawerId:"",
      drawerPhone:"",
      drawerTitle:"",

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
        { id: 3,name: "飞翔的荷兰人1", phone:'18892026183',width:132  },
        { id: 4,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 5,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 6,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 7,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 8,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 9,name: "飞翔的荷兰人1", phone:'18892026183'  },
        { id: 10,name: "飞翔的荷兰人1", phone:'18892026183'  },
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
      permissionGroup2:[],
      // -----------------
      addVisible: false,
      addFormOptions:[
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
      addRules:{
        updateReason: [
          { required: true, message: "请输入修改事由", trigger: "blur" },
        ]
      },
      searchForm:{}
    };
  },
  components:{
    RdForm
  },
  methods: {
     openDrawer(data){
      this.drawerId = data.id;
      this.drawerPhone = data.phone;
      this.drawerTitle = data.studentName || "";
      this.drawerVisible = true;
    },
     onSearch(val) {
       if(val.product&&val.product.length>0){
        this.searchForm = {
          ...val,
          enquireProductIdOne: val.product[0],
          enquireSubjectIdOne: val.product[1],
          enquireCourseIdOne: val.product[2],
          createAt: val.createAt?val.createAt.join(' ~ '):""
        };
      }else {
        this.searchForm = {
          ...val,
          createAt: val.createAt?val.createAt.join(' ~ '):""
        }
      }

      this.searchForm = {
        ...val,
        createAt: val.createAt?val.createAt.join(' ~ '):""
      };
      console.log(val,this.searchForm , 'val---')
      this.getTableData();
    },
     pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
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

     submitAddForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
        }
          
      });
    },

    handleDelete(row) {
      let info = row.typeName;
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
    getTableData(params = {}) {
      const loading = this.$loading({
        lock: true,
        target: ".el-table",
      });
      this.$fetch("chance_config_list", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          return item;
        });
        this.pageConfig.totalCount = res.data.pager.totalRows;
        setTimeout(() => {
          loading.close();
        }, 200);
      }).catch(err => {
        loading.close();
        if(err.response.status == 401){
          this.emptyText = "您没有权限访问"
        }
      });
    },

    getSelectList() {
      Promise.all([
        this.$fetch("chance_source_list"),
        this.$fetch("chance_edu_list"),
        this.$fetch("chance_status_list"),
        this.$fetch("chance_trail_list"),
        this.$fetch("chance_staff_list"),
        this.$fetch("chance_config_campusList"),
        this.$fetch("chance_call_status"),
      ].map((p) => {
        return p.catch(error => error)
    }))
        .then((result) => {
          let sourceOptions = result[0].data.map((item) => ({
            label: item.value,
            value: item.key,
          }));
          let eduOptions = result[1].data.map((item) => ({
            label: item.value,
            value: item.key,
          }));
          let statusOptions = result[2].data.map((item) => ({
            label: item.value,
            value: item.key,
          }));
          let trailOptions = result[3].data.map((item) => ({
            label: item.value,
            value: item.key,
          }));
          let staffOptions = JSON.parse(result[4].msg).map((item) => ({
            label: item.staffName,
            value: item.id,
          }));
          let campusOptions = result[5].data.data.map((item) => ({
            label: item.campusName,
            value: item.id,
          }));
           let callStatusOptions = result[6].data.map((item) => ({
            label: item.value,
            value: item.key,
          }));
           let numsOptions = []
        for(let i=0; i< 8; i++){
          numsOptions.push({
            label: i,
            value: i
          })
        }
          let subjectOptions = [];
          console.log(staffOptions,'staffOptions-')
          this.formOptions = [
            {
              prop: "studentName",
              element: "el-input",
              initValue: "",
              placeholder: "请输入学员姓名",
            },
            {
              prop: "phone",
              element: "el-input",
              initValue: "",
              placeholder: "请输入学员手机",
            },
            {
              prop: "saleSource",
              element: "el-select",
              initValue: "",
              placeholder: "请选择机会来源",
              options: sourceOptions,
            },
            {
              prop: "eduBackground",
              element: "el-select",
              initValue: "",
              placeholder: "请选择学历",
              options: eduOptions,
            },
            {
              prop: "status",
              element: "el-select",
              initValue: "",
              placeholder: "请选择跟进状态",
              options: statusOptions,
            },
            {
              prop: "invalidStatus",
              element: "el-select",
              initValue: "",
              placeholder: "请选择机会状态",
              options: trailOptions
            },
            {
              prop: "marketStaffId",
              element: "el-select",
              initValue: "",
              placeholder: "归属销售",
              options: staffOptions,
              filterable: true
            },
            {
              prop: "enquireProductIdOne",
              element: "el-select",
              initValue: "",
              placeholder: "请选择咨询项目",
            },
            {
              prop: "enquireSubjectIdOne",
              element: "el-select",
              initValue: "",
              placeholder: "请先选择咨询项目",
            },
            {
              prop: "enquireCourseIdOne",
              element: "el-select",
              initValue: "",
              placeholder: "请先选择咨询科目",
            },
            {
              prop: "ordeParams",
              element: "el-select",
              initValue: "",
              placeholder: "选择查询排列方法",
              options: [
                {
                  label: "选择查询排序方法",
                  value: "选择查询排序方法"
                }
              ]
            },
            // 课程
        {
          prop: "abc",
          element: "el-cascader",
          placeholder: "请选择咨询项目/科目/课程",
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
          initWidth: true,
        },
          ];
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.branch-school {
}
</style>
