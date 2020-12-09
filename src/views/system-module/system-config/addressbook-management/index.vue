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
        @select="handleSelect"
        @pageChange="pageChange"
      >
        <template slot="src" slot-scope="scope">
          <img :src="scope.row.src" style="width:56px;height:56px;" alt="">
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
                <div class="detail">{{dataUser.hireDate}}</div>
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
            <!-- <div class="title_drawer">外呼管理</div>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="七陌坐席:" :label-width="formLabelWidth">
                  <el-input v-model="formDrawer.name" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="七陌密码:" :label-width="formLabelWidth">
                  <el-input v-model="formDrawer.name" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="智博坐席:" :label-width="formLabelWidth">
                  <el-input v-model="formDrawer.name" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="智博密码:" :label-width="formLabelWidth">
                  <el-input v-model="formDrawer.name" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="公司类型:" :label-width="formLabelWidth">
                  <el-input v-model="formDrawer.companyType" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工作手机:" :label-width="formLabelWidth">
                  <el-input v-model="formDrawer.workPhone" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-divider></el-divider> -->
            <div class="title_drawer">多角色管理</div>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="角色:" :label-width="formLabelWidth">
                  <el-select v-model="formDrawer.valueDept" multiple placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
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
  components: {
    RdTree,
    searchForm
  },
  data () {
    return {
      deptlabel: '',
      campusId: "", // 部门id
      campususerId: "", // 部门成员id
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
          prop: 'idcard',
          element: 'el-input',
          initValue: '',
          placeholder: '请输入ID',
        },
      ],
      statusOptions: [
        {
          label: "正常",
          value: "1",
        },
        {
          label: "暂停",
          value: "0",
        },
      ],
      tableData: [],
      tableKey: [
        { name: '头像',value: 'src',operate: true,width: 80 },
        { name: '姓名',value: 'staffName' },
        { name: '手机',value: 'staffPhone' },
        { name: '部门',value: 'campusName' },
        { name: '职位',value: 'positionName' },
        { name: '角色',value: 'roleName' },
        { name: '状态',value: 'status',operate: true },
        { name: '操作',value: 'edit',operate: true,width: 100 },
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
        pageNum: 1,
        pageSize: 10,
      },
      dialog: false,
      loading: false,
      formDrawer: {
        name: '',
        valueDept: []
      },
      options: [
        // {
        //   value: '选项1',
        //   label: '黄金糕'
        // }, {
        //   value: '选项2',
        //   label: '双皮奶'
        // }, {
        //   value: '选项3',
        //   label: '蚵仔煎'
        // }, {
        //   value: '选项4',
        //   label: '龙须面'
        // }, {
        //   value: '选项5',
        //   label: '北京烤鸭'
        // }
      ],
      formLabelWidth: '80px',
      timer: null,
    }
  },
  mounted() {
    this.getTreeData();
    // this.getTableData();
    // this.getDataTree();
    // this.getDataTable();
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
      this.deptlabel = data.campusName
      this.campusId = data.id
      this.getTableData();
    },
    // 搜索栏
    onSearch(val) {
      console.log(val, 999)
      this.searchForm = {...val};
      this.getTableData({
        currentPage: 1,
        pageSize: 10,
        loginUserId,
        campusId: this.campusId,
        ...this.searchForm
      })
    },
    // 获取通讯录组织树
    getTreeData() {
      this.$fetch(
        'getDeptTreeList',{
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
    // 获取本地通讯录组织树
    async getDataTree() {
      const { data } = await axios.get('/json/depttreedata.json')
      this.treeData = data
    },
    // 获取本地组织表格数据
    async getDataTable() {
      const { data } = await axios.get('/json/depttabledata.json')
      this.tableData = data
      this.pageConfig.totalCount = res.data.total
    },
    // 获取组织表格数据
    getTableData(params) {
      this.$fetch(
        "getDeptTableList",
        params || {
          campusId: this.campusId,
          loginUserId,
          currentPage: 1,
          pageSize: 10
        }).then(res => {
          this.tableData = res.data.records;
        })
    },
    getDeptUserDetailData(id) {
      this.$fetch(
        "getDeptUserDetail",{
          id
        }).then(res => {
          this.dataUser = res.data
        })
    },
    getRoleList() {
      this.$fetch("role_list",{
        currentPage: 1,
        pageSize: 10000,
        loginUserId,
        // deptPid:0
      }).then((res) => {
        // console.log(res, 7766666)
        this.options = res.data.records.map(item => ({
          value: item.id,
          label: item.roleName
        }));
        // console.log(this.options, 88888)
      });
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    // 编辑
    editRow(index,id, rows) {
      console.log(index,id,rows, 666)
      // this.dataUser = rows
      this.getDeptUserDetailData(id)
      this.getRoleList()
      this.dialog = true
      this.campususerId = id
    },
    pageChange(val) {
      console.log(666)
      this.getTableData({
        currentPage: val.page,
        showCount: val.limit,
      });
    },
    // 抽屉提交表单
    handleDrawerClose(done) {
      if (this.loading) {
        return;
      }
      let roleIds = this.formDrawer.valueDept.toString()
      console.log(roleIds, 999999)
      // return
      // console.log(done, 3333)
      // this.$confirm('确定要提交表单吗？')
      this.$fetch(
        "deptUser_save",{
          userId: this.campususerId,
          roleIds
        })
        .then(_ => {
          this.loading = true;
          this.onSearch()
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
          }, 2000);
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
    .tree-container {
        /deep/ .el-tree {
          padding-top: 24px;
           height: calc(100vh - 260px);
           overflow: auto;
           padding-bottom: 24px;
        }
    }
  }
  .center_r {
    overflow: hidden;
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