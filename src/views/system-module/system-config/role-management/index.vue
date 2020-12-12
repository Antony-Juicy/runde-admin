<template>
  <div class="role-wrapper">
    <div class="group-wrapper">
      <el-radio-group v-model="tabPermission" @change="handleTabClick">
        <el-radio-button :label="item.id" v-for="(item,index) in permissionGroup" :key="index">{{item.roleName}}</el-radio-button>
      </el-radio-group>
    </div>
    <div class="btn-wrapper">
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="small"
        @click="handleAdd"
        >添加</el-button
      >
    </div>
    
    <!-- 表格 -->
    <rd-table
      :tableData="tableData"
      :tableKey="tableKey"
      :loading="loading"
      :fixedTwoRow="fixedTwoRow"
      :pageConfig="pageConfig"
      @select="handleSelect"
      @pageChange="pageChange"
    >
      <template slot="status" slot-scope="scope">
        <span>{{ scope.row.status | statusFilter }}</span>
      </template>
      <template slot="createAt" slot-scope="scope">
        <span>{{ $common._formatDates(scope.row.createAt)}}</span>
      </template>
      <template slot="edit" slot-scope="scope">
        <el-button @click="handleEdit(scope.row)" type="text" size="small"
          >编辑</el-button
        >
        <el-divider direction="vertical"></el-divider>
        <el-button
          @click="handleAuthority(scope.row)"
          type="text"
          size="small"
          style="color: #ec5b56"
          >配置权限</el-button
        >
      </template>
    </rd-table>
    <!-- 新增/编辑 弹窗 -->
    <rd-dialog
      :title="dialogStatus ? '新增角色' : '编辑角色'"
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
        <el-form-item
          label="编码"
          prop="roleCode"
          :label-width="formLabelWidth"
          v-if="dialogStatus"
        >
          <el-row>
            <el-col :span="16">
              <el-input
                v-model="basicInfo.roleCode"
                autocomplete="off"
                placeholder="请点击获取编码"
                disabled
            /></el-col>
            <el-col :span="8"
              ><el-button
                type="primary"
                size="small"
                style="margin-left: 5px"
                @click="getCode"
                >获取编码</el-button
              ></el-col
            >
          </el-row>
        </el-form-item>
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
            v-model="basicInfo.roleName"
            autocomplete="off"
            placeholder="请输入角色名称"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
          <el-select v-model="basicInfo.status" placeholder="请选择状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="修改事由"
          prop="updateReason"
          :label-width="formLabelWidth"
          v-if="!dialogStatus"
        >
          <el-input
            v-model="basicInfo.updateReason"
            autocomplete="off"
            placeholder="请输入修改事由"
            type="textarea"
            :rows="1"
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
    <!-- 配置权限弹窗 -->
    <rd-dialog
      :title="'权限配置'"
      :dialogVisible="authorityVisible"
      v-if="showAuthority"
      @handleClose="handleCloseAuthority('authorityForm')"
      @submitForm="submitFormAuthority('authorityForm')"
    >
      <el-tree
        :data="treeData"
        :props="defaultProps"
        node-key="id"
        ref="tree"
        show-checkbox
        :default-expanded-keys="defaultKeys"
        :default-checked-keys="defaultChekedKeys"
        :check-strictly="true"
        @node-click="handleNodeClick"
        class="authority-tree"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span :class="{ greenNode: data.menuType == 1, redNode: data.menuType == 2 }" :title="node.label">{{
            node.label
          }}</span>
        </span>
      </el-tree>
    </rd-dialog>
  </div>
</template>

<script>
let loginUserId = JSON.parse(localStorage.getItem("userInfo")).userId;
export default {
  inject: ["reload"],
  name:'role-management',
  data() {
    return {
      tabPermission: "",
      defaultChekedKeys:[],
      permissionGroup:[
        {
          id:1,
          name:'技术'
        },
        {
          id:2,
          name:'财务'
        },
        {
          id:3,
          name:'教务'
        },
        {
          id:4,
          name:'市场'
        },
        {
          id:5,
          name:'事业部'
        },
      ],
      permissionGroup2:[],
      tableData: [
      ],
      tableKey: [
        {
          name: "ID",
          value: "id",
          width: 80,
        },
        {
          name: "名称",
          value: "roleName",
        },
        {
          name: "状态",
          value: "status",
          operate: true,
        },
        {
          name: "创建时间",
          value: "createAt",
          operate: true
        },
        {
          name: "备注",
          value: "remark",
          showTooltip: true,
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 160,
        },
      ],
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,
      dialogVisible: false,
      dialogStatus: true, //弹窗状态： true 新增 false 编辑
      formLabelWidth: "100px",
      basicInfo: {
        roleCode: "",
        roleName: "",
        status: "",
        remark: "",
        updateReason: "",
        parentId:""
      },
      rules: {
        roleCode: [{ required: true, message: "请获取编码", trigger: "blur" }],
        updateReason: [
          { required: true, message: "请输入修改事由", trigger: "blur" },
        ],
        roleName: [{ required: true, message: "请输入名称", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
        parentId: [{ required: true, message: "请选择分组", trigger: "blur" }],
      },
      options: [
        {
          label: "正常",
          value: 1,
        },
        {
          label: "暂停",
          value: 0,
        },
      ],
      // 配置权限
      authorityVisible: false,
      treeData: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "menuName",
      },
      currentPageInfo: null,
      selectedRoleId: "",
      defaultKeys: [],
      showAuthority: true
    };
  },
  mounted() {
    // 获取配置权限弹窗的树状
    this.getTreeData();

    // 获取权限组
    this.getGroupData();
    
  },
  filters: {
    statusFilter(status){
        switch(status){
            case 0:
                return '暂停';
            case 1:
                return '正常';
            default:
                return '';
        }
    }
  },
  methods: {
    getGroupData(){
      this.$fetch("role_list",{
         currentPage: 1,
          pageSize: 10000,
          loginUserId,
          deptPid:0
      }).then((res) => {
        this.permissionGroup = res.data.records;
        this.tabPermission = this.permissionGroup[0].id;
        this.handleTabClick(this.tabPermission)
        // 弹窗的下拉
        this.permissionGroup2 = [...this.permissionGroup];
        this.permissionGroup2.unshift({
          id: 0,
          roleName:'父组'
        })
      });
    },
    getTreeData() {
      this.$fetch("getMenuTreeList").then((res) => {
        this.treeData = res.data.records;
        this.treeData.forEach((item) => {
          if (item.children && item.children.length) {
            item.children.forEach((ele) => {
              this.defaultKeys.push(ele.id);
            });
          }
        });
      });
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    pageChange(val) {
      this.currentPageInfo = val;
      this.getTableData({
        currentPage: (val && val.page) || 1,
        pageSize: (val && val.limit) || 10,
        loginUserId,
      });
    },
    getTableData(params) {
      const loading = this.$loading({
        lock: true,
        target: ".el-table",
      });
      this.$fetch(
        "role_list",
        params || {
          currentPage: 1,
          pageSize: 10,
          loginUserId,
        }
      ).then((res) => {
        this.tableData = res.data.records;
        this.pageConfig.totalCount = res.data.total;
        setTimeout(() => {
          loading.close();
        }, 200);
      });
    },
    // 打开新增弹窗
    handleAdd() {
      for (const key in this.basicInfo) {
        this.basicInfo[key] = "";
      }
      this.dialogVisible = true;
      this.dialogStatus = true;
    },
    // 打开编辑弹窗
    handleEdit(row) {
      this.basicInfo = {
        ...row,
      };
      this.dialogVisible = true;
      this.dialogStatus = false;
    },
    // 关闭
    handleClose(formName) {
      this.dialogVisible = false;
      this.$refs[formName].resetFields();
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.basicInfo, "提交");
          if (this.dialogStatus) {
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
          } else {
            // 编辑
            this.$fetch("role_edit", {
              ...this.basicInfo,
              loginUserId,
            }).then((res) => {
              this.$message({
                message: "编辑成功",
                type: "success",
              });
              this.handleClose("dataForm");
              this.handleTabClick(this.tabPermission);
            });
          }
        }
      });
    },
    // -----配置权限弹窗的处理--------
    handleAuthority(data) {
      this.defaultChekedKeys = [];
      // 获取该角色拥有的权限
      this.$fetch('role_getMeunList',{
        roleId: data.id
      }).then(res => {
        this.defaultChekedKeys = [];
        this.defaultChekedKeys = res.msg.split(',');
        this.$forceUpdate();
        
        console.log(this.defaultChekedKeys,'this.defaultChekedKeys--')
        this.selectedRoleId = data.id;
        this.authorityVisible = true;
      })
      
    },
    handleCloseAuthority(formName) {
      this.authorityVisible = false;
        this.showAuthority = false;
        this.$nextTick(()=>{
          this.showAuthority = true;
        })
      
      this.getTreeData();
    },
    submitFormAuthority() {
      console.log(this.$refs.tree.getCheckedKeys(), "key");
      let selectedIdArr = this.$refs.tree.getCheckedKeys();
      if (!selectedIdArr.length) {
        this.$message({
          message: "请选择权限",
          type: "warning",
        });
        return;
      }
      this.$fetch("menu_impower", {
        menuIds: selectedIdArr.join(","),
        roleId: this.selectedRoleId,
      }).then((res) => {
        this.$message({
          message: "保存成功",
          type: "success",
        });
        this.handleCloseAuthority();
      });
    },
    handleNodeClick() {},

    // 获取编码
    getCode() {
      this.$fetch("system_getCode", {
        flagType: 2,
      }).then((res) => {
        this.basicInfo.roleCode = res.data;
      });
    },

    // 点击权限组的分类
    handleTabClick(data){
      this.getTableData({
        deptPid: data,
         currentPage: 1,
          pageSize: 10,
          loginUserId
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.role-wrapper {
  background-color: #fff;
  padding: 20px;
  .group-wrapper {
    margin-bottom: 10px;
    padding-bottom: 10px;
    // border-bottom: 1px solid #EBEEF5;
  }
  .btn-wrapper {
    margin-bottom: 16px;
  }
  .authority-tree {
    padding-left: 20px;
  }
  /deep/ {
    .el-input.is-disabled .el-input__inner {
      color: #767a82;
    }
    .greenNode {
      color: #67c23a;
    }
    .redNode {
      color: #ec5b56;
    }
  }
  .greenNode {
      color: #67c23a;
    }
    .redNode {
      color: #ec5b56;
    }
}
</style>