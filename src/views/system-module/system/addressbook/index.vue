<template>
  <div class="addressbook_container">
    <search-form :formOptions = "formOptions" :showNum="showNum" @onSearch = onSearch @onReset="onReset"></search-form>
    <div class="center_l">
      <rd-tree :data="treeData" :defaultProps="defaultProps" @nodeClick="handleNodeClick" :default-expanded-keys="defaultKeys">
    </rd-tree>
    </div>
    <div class="center_r w-container">
      <div style="font-weight: 700;margin-bottom: 20px;">{{selectedTree.campusName}}</div>
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd">添加</el-button>
        <el-button type="warning" size="small" @click="dianhuan">调换校区</el-button>
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :multiple="true"
        :pageConfig.sync="pageConfig"
        :emptyText="emptyText"
        :tbodyHeight="600"
        @select="handleSelect"
        @pageChange="pageChange"
      >
        <template slot="src" slot-scope="scope">
          <img :src="scope.row.src || userLogoUrl" style="width:40px;height:40px;" alt="">
        </template>
        <template slot="status" slot-scope="scope">
          <span>{{ scope.row.status | statusFilter }}</span>
        </template>
        <template slot="edit" slot-scope="scope">
          <el-button @click="editRow(scope.$index,scope.row.id,scope.row)" type="text" size="small" style="color: #67c23a">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button @click="dianhuan(scope.$index,scope.row.id,scope.row)" type="text" size="small">多校区管理</el-button>
        </template>
      </rd-table>
      <!-- 添加用户 -->
      <rd-dialog
        :title="userStatusVisible ? '添加用户' : '编辑用户'"
        :dialogVisible="userVisible"
        :width="widthNew"
        @handleClose="closeUser('dataForm')"
        @submitForm="submitForm('dataForm')">
        <el-form ref="dataForm" :model="userForm" :rules="addRules" label-width="100px">
          <el-form-item label="部门组织">
            {{ selectedTree.campusName }}（id:{{ selectedTree.id }}）
          </el-form-item>
          <el-form-item label="姓名" prop="userName">
            <el-input v-model.trim="userForm.userName" autocomplete="off" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model.trim="userForm.mobile" autocomplete="off" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item label="账号" prop="account">
            <el-input v-model.trim="userForm.account" autocomplete="off" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model.trim="userForm.password" autocomplete="off" type="password" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model.trim="userForm.confirmPassword" autocomplete="off" type="password" placeholder="请与上面密码一致" />
          </el-form-item>
          <el-form-item label="职位" prop="positionName">
            <el-select v-model="userForm.positionName" @change="positionChange" filterable placeholder="请选择">
              <el-option
                v-for="item in positionOptions"
                :key="item.value"
                :label="item.label"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色" prop="roleId">
            <el-select v-model="userForm.roleId" filterable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="七陌账号" prop="qimoAccount">
            <el-input v-model.trim="userForm.qimoAccount" autocomplete="off" placeholder="请输入七陌账号" />
          </el-form-item>
          <el-form-item label="智博账号" prop="zhiboAccount">
            <el-input v-model.trim="userForm.zhiboAccount" autocomplete="off" placeholder="请输入智博账号" />
          </el-form-item>
          <el-form-item label="用户类型" prop="userType">
            <el-select v-model.trim="userForm.userType" placeholder="请选择">
              <el-option label="学生" value="Student"></el-option>
              <el-option label="内部人员" value="Ordinary"></el-option>
              <el-option label="加盟商" value="VFranchiser"></el-option>
              <el-option label="连锁负责人" value="Chain"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="campusNature">
            <el-radio v-model="userForm.campusNature" label="OnLine">在职</el-radio>
            <el-radio v-model="userForm.campusNature" label="OffLine">离职</el-radio>
          </el-form-item>
        </el-form>
      </rd-dialog>
      <!-- 员工详情 -->
      <el-drawer
        title=""
        :before-close="handleDrawerClose"
        :visible.sync="dialog"
        direction="rtl"
        custom-class="demo-drawer"
        class="demo-drawer"
        :wrapperClosable="false"
        :with-header="false"
        size="60%"
        ref="drawer">
        <div class="demo-drawer__content">
          <el-form :model="outBound" :rules="editRules" ref="outBoundForm">
            <div class="title_drawer">基本信息</div>
            <el-row :gutter="24">
              <el-col :span="8">
                <div class="term">员工姓名：</div>
                <div class="detail">{{dataUser.staffName}}</div>
              </el-col>
              <el-col :span="8">
                <div class="term">所属部门：</div>
                <div class="detail">{{dataUser.campusName}}</div>
              </el-col>
              <el-col :span="8">
                <div class="term">入职时间：</div>
                <div class="detail">{{$common._formatDates(dataUser.hireDate)}}</div>
              </el-col>
              <el-col :span="8">
                <div class="term">手机号码：</div>
                <div class="detail">{{dataUser.staffPhone}}</div>
              </el-col>
              <el-col :span="8">
                <div class="term">钉钉ID：</div>
                <div class="detail">{{dataUser.dingdingUserId}}</div>
              </el-col>
              <el-col :span="8">
                <div class="term">员工职位：</div>
                <div class="detail">{{dataUser.positionName}}</div>
              </el-col>
              <el-col :span="8">
                <div class="term">部门内级别：</div>
                <div class="detail">{{dataUser.rankLevel}}</div>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <div class="title_drawer">外呼管理</div>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="七陌坐席:" :label-width="formLabelWidth" placeholder="请输入七陌坐席">
                  <el-input v-model="outBound.qimoAccount" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="七陌密码:" :label-width="formLabelWidth" placeholder="请输入七陌密码">
                  <el-input v-model="outBound.qimoPwd" autocomplete="off" type="password"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="智博坐席:" :label-width="formLabelWidth" placeholder="请输入智博坐席">
                  <el-input v-model="outBound.zhiboAccount" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="智博密码:" :label-width="formLabelWidth" placeholder="请输入智博密码">
                  <el-input v-model="outBound.zhiboPwd" autocomplete="off" type="password"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="公司类型:" :label-width="formLabelWidth" prop="companyType">
                  <el-select v-model="outBound.companyType" placeholder="请选择公司类型">
                    <el-option
                      :label="'广东长兴润德教育科技有限公司'"
                      :value="'Runde'">
                    </el-option>
                    <el-option
                      :label="'广州正德教育科技有限公司'"
                      :value="'Zhengde'">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工作手机:" :label-width="formLabelWidth" placeholder="请输入工作手机">
                  <el-input v-model="outBound.workPhone" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="多角色管理:" :label-width="formLabelWidth">
                  <el-select v-model="formDrawer.valueDept" filterable multiple placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态:" :label-width="formLabelWidth">
                  <el-select v-model="outBound.status" placeholder="请选择状态">
                    <el-option
                      :label="'在职'"
                      :value="'Normal'">
                    </el-option>
                    <el-option
                      :label="'离职'"
                      :value="'Stop'">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
          </div>
        </div>
      </el-drawer>
      <!-- 多校区 -->
      <fullDialog v-model="showCampus" title="配置多校区管理" @change="showCampus = false">
        <el-divider content-position="left">选择配置校区</el-divider>
        <el-form ref="campusForm" :model="campusForm" label-width="80px">
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="校区" prop="campusName">
                <el-select v-model="campusForm.campusName" filterable placeholder="请选择">
                  <!-- <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option> -->
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button type="primary">保存</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-divider content-position="left">当前管理校区</el-divider>
        <rd-table
          :tableData="campusTableData"
          :tableKey="campusTableKey"
          :loading="loading"
          :fixedTwoRow="fixedTwoRow"
          :emptyText="campusEmptyText"
          :tbodyHeight="600"
        >
        <template slot="value8" slot-scope="scope">
          <el-button type="text" size="small">删除</el-button>
        </template>
        </rd-table>
      </fullDialog>
    </div>
  </div>
</template>

<script>
import RdTree from '@/components/RdTree';
import fullDialog from "@/components/FullDialog";
import searchForm from '@/components/Searchform';
import axios from 'axios';
import Common from "@/utils/common";
let loginUserId = JSON.parse(localStorage.getItem("userInfo")).userId;
export default {
  inject: ["reload"],
  name:'addressbook',
  components: {
    RdTree,
    searchForm,
    fullDialog
  },
  data () {
    return {
      campusId: 1, // 组织id
      campususerId: "", // 组织成员id
      showNum: 4,
      searchForm: {},
      formOptions: [
        {
          prop: 'staffName',
          element: 'el-input',
          initValue: '',
          placeholder: '请输入姓名',
        },
        {
          prop: 'staffPhone',
          element: 'el-input',
          initValue: '',
          placeholder: '请输入手机号',
        },
        {
          prop: 'positionName',
          element: 'el-input',
          initValue: '',
          placeholder: '请输入职位',
        },
        {
          prop: 'status',
          element: 'el-select',
          initValue: '',
          placeholder: '请选择在职/离职',
          options: [
            {
              label: "在职",
              value: "Normal",
            },
            {
              label: "离职",
              value: "Stop",
            }
          ],
        },
      ],
      tableData: [],
      tableKey: [
        { name: '头像',value: 'src',operate: true,width: 62 },
        { name: '姓名',value: 'staffName' },
        { name: '手机',value: 'staffPhone' },
        { name: '部门',value: 'campusName' },
        { name: '职位',value: 'positionName' },
        { name: '角色',value: 'roleName' },
        { name: '状态',value: 'status',operate: true },
        { name: '操作', value: 'edit', operate: true, fixed: 'right'},
      ],
      emptyText: '暂无数据，请选择相应的组织架构',
      fixedTwoRow: true,
      treeData: [],
      defaultKeys:[],
      defaultProps: {
        children: "children",
        label: "campusName",
      },
      dataUser: {},
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
      },
      dialog: false,
      loading: false,
      formDrawer: {
        valueDept: []
      },
      outBound: {
        qimoAccount:"",
        qimoPwd:"",
        zhiboAccount:"",
        zhiboPwd:"",
        companyType:"",
        workPhone:"",
        status: '', // Stop Normal
      },
      editRules: {
        companyType: [{ required: true, message: "请选择公司类型", trigger: "change" }]
      },
      options: [], // 多角色数组
      formLabelWidth: '90px',
      timer: null,
      userLogoUrl: require('@/assets/userlogo.png'),
      currentId:'',

      // 新增弹窗
      widthNew: '700px',
      userVisible: false,
      userStatusVisible: true,
      selectedTree: "",
      positionOptions: [],
      userForm: {
        userName: '',
        positionName: '',
        positionId: '',
        mobile: '',
        account: '',
        password: '',
        confirmPassword: '',
        roleId: '',
        qimoAccount: '',
        zhiboAccount: '',
        userType: '',
        campusNature: '',
      },
      addRules: {
        userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入正确的手机号", trigger: "blur" },
          { validator: Common._validatorPhone, trigger: "blur" },
        ],
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        confirmPassword: [{ required: true, message: "请输入密码", trigger: "blur" }],
        positionName: [{ required: true, message: "请选择职位", trigger: "blur" }],
        roleId: [{ required: true, message: "请选择角色", trigger: "blur" }],
        qimoAccount: [{ required: true, message: "请输入七陌账号", trigger: "blur" }],
        zhiboAccount: [{ required: true, message: "请输入智博账号", trigger: "blur" }],
        userType: [{ required: true, message: "请选择用户类型", trigger: "blur" }],
        campusNature: [{ required: true, message: "请勾选状态", trigger: "blur" }],
      },
      // 多校区配置
      campusForm: {
        campusName: ''
      },
      showCampus: false, // 多校区大弹窗
      campusTableData: [],
      campusTableKey: [
        { name: '员工',value: 'value1' },
        { name: '校区',value: 'value2' },
        { name: '手机号',value: 'value3' },
        { name: '角色名',value: 'value4' },
        { name: '职位名',value: 'value5' },
        { name: '分配时间',value: 'value6' },
        { name: '更新时间',value: 'value7' },
        { name: '操作',value: 'value8' },
      ],
      campusEmptyText: '暂无数据',
    }
  },
  mounted() {
    this.getTreeData();
    this.getRoleList();
    this.getPositionList();
    this.getTableData();
  },
  filters: {
    statusFilter(status){
      switch(status){
        case "Normal":
          return '在职';
        case "Stop":
          return '离职';
        default:
          return '';
      }
    }
  },
  methods: {
    // 操作通讯录树
    handleNodeClick(data) {
      console.log(data,'data----')
      this.selectedTree = data
      this.campusId = data.id
      this.pageConfig.currentPage = 1;
      this.getTableData();
    },
    // 搜索栏
    onSearch(val) {
      this.searchForm = {...val};
      this.pageConfig.currentPage = 1;
      this.getTableData();
    },
    onReset(){
      this.searchForm = {};
    },
    positionChange(val) {
      console.log(val,'positionChange----')
      this.positionId = val.value;
      this.positionName = val.label
    },
    // 获取通讯录组织树
    getTreeData() {
      this.$fetch(
        'staff_tree',{
          loginUserId
        }).then(res => {
        this.treeData = res.data;
        this.treeData.forEach(item => {
          if(item.children && item.children.length) {
            item.children.forEach(ele => {
              this.defaultKeys.push(ele.id)
            })
          }
        })
      })
    },
    // 获取部门成员列表
    getTableData(params) {
      this.$fetch(
        "staff_list",
        params || {
          campusId: this.campusId,
          loginUserId,
          ...this.pageConfig,  //页数
          ...this.searchForm  //搜索条件
        }).then(res => {
          this.tableData = res.data.records;
          this.pageConfig.totalCount = res.data.total;
        })
    },
    // 获取成员信息
    getUserDetailData(id) {
      this.$fetch(
        "staff_detail",{
          id
        }).then(res => {
          this.dataUser = res.data
          this.formDrawer.valueDept = this.dataUser.userRoleResponseList.map(item => item.roleId)
          this.outBound = {...res.data}
        })
    },
    // 获取成员多角色
    getRoleList() {
      this.$fetch("role_list",{
        currentPage: 1,
        pageSize: 10000,
        loginUserId
      }).then((res) => {
        this.options = res.data.records.map(item => ({
          value: item.id,
          label: item.roleName,
          status: item.status
        })).filter((item)=>{
          return item.status == "1"
        });
      });
    },
    getPositionList() {
      this.$fetch("staff_positionName",{

      }).then((res) => {
        this.positionOptions = res.data.list.map(item => ({
          value: item.id,
          label: item.positionName
        }))
      })
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    handleAdd() {
      if (!this.selectedTree) {
        this.$message({
          message: "请先选择部门组织",
          type: "warning",
        });
        return;
      }
      this.userVisible = true;
      this.userStatusVisible = true;
      for (const key in this.userForm) {
        this.userForm[key] = "";
      }
    },
    // 关闭新增/编辑弹窗
    closeUser(formName) {
      this.userVisible = false;
      this.$refs[formName].resetFields();
    },
    // 编辑
    editRow(index,id, rows) {
      // this.dataUser = rows
      this.getUserDetailData(id)
      
      this.dialog = true
      this.campususerId = rows.userId
      this.currentId = id;
    },
    pageChange(val) {
      this.pageConfig.currentPage = val.page;
      this.pageConfig.pageSize = val.limit;
      this.getTableData({
        currentPage: val.page,
        pageSize: val.limit,
        campusId: this.campusId,
        ...this.searchForm,
        loginUserId
      });
    },
    // 抽屉提交表单
    handleDrawerClose(done) {
      if (this.loading) {
        return;
      }
      this.$refs.outBoundForm.validate((val, data) => {
        if(val) {
          let roleIds = this.formDrawer.valueDept.toString()
          console.log(this.dataUser,this.outBound, 'this.dataUser----this.outBound')
          Promise.all([ this.$fetch(
            "staff_role_list",{
              userId: this.campususerId,
              roleIds
            }), this.$fetch(
            "staff_detail_updateStaff",{
              userId: this.campususerId,
              loginUserId,
              companyType: this.outBound.companyType,
              id: this.currentId,
              qimoAccount: this.outBound.qimoAccount,
              qimoPwd: this.outBound.qimoPwd,
              workPhone: this.outBound.workPhone,
              zhiboAccount: this.outBound.zhiboAccount,
              zhiboPwd: this.outBound.zhiboPwd,
              status: this.outBound.status
            })])
            .then(_ => {
              this.loading = true;
              // this.onSearch()
              this.getTableData();
              this.timer = setTimeout(() => {
                done();
                // 动画关闭需要一定的时间
                setTimeout(() => {
                  this.loading = false;
                }, 400);
              }, 500);
            })
            .catch(_ => {});
        }
      })
        
    },
    // 关闭抽屉
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
    // 提交新增用户
    submitForm() {
      this.$refs.dataForm.validate((val, data) => {
        if(val) {
          if(this.userStatusVisible) {
            // 新增
            this.$fetch("staff_save", {
              ...this.userForm,
              campusId: this.selectedTree.id,
              campusName: this.selectedTree.campusName,
              positionId: this.positionId,
              positionName: this.positionName,
              loginUserId: this.$common.getUserId()
            }).then((res) => {
              let roleIds = this.userForm.roleId;
              this.$fetch(
              "staff_role_list",{
                userId: res.data.id,
                roleIds
              }).then((res) => {
                this.$message({
                  message: "提交成功",
                  type: "success",
                });
                this.getTableData();
                this.closeUser('dataForm');
              })
            });
          } else {
            
          }
        }
      });
    },
    // 调换校区操作
    dianhuan() {
      this.$message({
        message: "暂未开放",
        type: "warning",
      });
    },
    // 多校区配置操作
    configCampus() {
      this.showCampus = true;
    },
    getCampusTreeData() {
      this.$fetch(
        "",
      ).then((res) => {
        
      });
    },
    getCampusTableData(params) {
      this.$fetch(
        "staff_list",
        params || {
          
        }).then(res => {
          
        })
    }
  }
}
</script>

<style lang='scss' scoped>
.addressbook_container {
  .center_l {
    float: left;
    width: 340px;
    margin-right: 24px;
    overflow: auto;
    .tree-container {
        /deep/ .el-tree {
          padding-top: 24px;
          // height: 707px;
          height: calc(100vh - 230px);
          overflow: auto;
        }
    }
  }
  .center_r {
    overflow: hidden;
    // height: 707px;
    min-height: calc(100vh - 230px);
    .demo-drawer__content {
      padding: 40px 60px 0 30px;
      .term {
        color: #606266;
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
        padding-bottom: 16px;
        margin-right: 8px;
        white-space: nowrap;
        display: table-cell;
      }
      .detail {
        font-weight: 500;
        font-size: 14px;
        line-height: 1.5;
        width: 100%;
        padding-bottom: 16px;
        color: #606266;
        display: table-cell;
      }
      .title_drawer {
        font-weight: 700;
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 20px;
        color: rgba(0, 0, 0, 0.85);
      }
      .demo-drawer__footer {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
      }
    }

  }
}
</style>