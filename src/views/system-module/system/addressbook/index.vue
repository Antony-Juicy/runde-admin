<template>
  <div class="addressbook_container">
    <search-form :formOptions = "formOptions" :showNum="showNum" @onSearch = onSearch></search-form>
    <div class="center_l">
      <rd-tree :data="treeData" :defaultProps="defaultProps" @nodeClick="handleNodeClick" :default-expanded-keys="defaultKeys">
    </rd-tree>
    </div>
    <div class="center_r w-container">
      <div style="font-weight: 700;margin-bottom: 20px;">{{deptlabel}}</div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :pageConfig="pageConfig"
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
          <el-button @click="editRow(scope.$index,scope.row.id,scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </rd-table>
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
          <el-form :model="formDrawer">
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
                <div class="term">状态：</div>
                <div class="detail">{{dataUser.status | statusFilter}}</div>
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
                <el-form-item label="公司类型:" :label-width="formLabelWidth">
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
            <div class="title_drawer">多角色管理</div>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="角色:" :label-width="formLabelWidth">
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
            </el-row>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import RdTree from '@/components/RdTree';
import searchForm from '@/components/Searchform';
import axios from 'axios';
let loginUserId = JSON.parse(localStorage.getItem("userInfo")).userId;
export default {
  inject: ["reload"],
  name:'addressbook',
  components: {
    RdTree,
    searchForm
  },
  data () {
    return {
      deptlabel: '',
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
        // {
        //   prop: 'idcard',
        //   element: 'el-input',
        //   initValue: '',
        //   placeholder: '请输入ID',
        // },
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
        { name: '操作', value: 'edit', operate: true, width: 100, fixed: 'right'},
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
        workPhone:""
      },
      options: [],
      formLabelWidth: '80px',
      timer: null,
      userLogoUrl: require('@/assets/userlogo.png'),
      currentId:''
    }
  },
  mounted() {
    this.getTreeData();
    this.getRoleList();
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
      this.deptlabel = data.campusName
      this.campusId = data.id
      this.pageConfig.currentPage = 1;
      this.getTableData();
    },
    // 搜索栏
    onSearch(val) {
      this.searchForm = {...val};
      // this.getTableData({
      //   currentPage: 1,
      //   pageSize: 10,
      //   loginUserId,
      //   campusId: this.campusId,
      //   ...this.searchForm
      // })
      this.pageConfig.currentPage = 1;
      this.getTableData();
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
      const loading = this.$loading({
        lock: true,
        target: ".el-table",
      });
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
          setTimeout(() => {
            loading.close();
          }, 200);
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
    handleSelect(rows) {
      console.log(rows, "rows---");
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
      let roleIds = this.formDrawer.valueDept.toString()
      console.log(this.dataUser,this.outBound, 'this.dataUser----this.outBound')
      Promise.all([ this.$fetch(
        "staff_role_list",{
          userId: this.campususerId,
          roleIds
        }), this.$fetch(
        "staff_detail_save",{
          userId: this.campususerId,
          loginUserId,
          companyType: this.outBound.companyType,
          id: this.currentId,
          qimoAccount: this.outBound.qimoAccount,
          qimoPwd: this.outBound.qimoPwd,
          workPhone: this.outBound.workPhone,
          zhiboAccount: this.outBound.zhiboAccount,
          zhiboPwd: this.outBound.zhiboPwd
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
        
    },
    // 关闭抽屉
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
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

    .table-wrapper {
      /deep/ {
        .el-table {
          max-height: 600px;
          height: auto!important;
          .el-table__body-wrapper {
            max-height: 556px;
            height: auto!important;
          }
        }
      }
    }
  }
}
</style>