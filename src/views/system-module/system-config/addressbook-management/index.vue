<template>
  <div class="addressbook_container">
    <search-form :formOptions = "formOptions" :showNum="showNum" @onSearch = onSearch></search-form>
    <div class="center_l">
      <rd-tree :data="treeData" :defaultProps="defaultProps" @nodeClick="handleNodeClick">
    </rd-tree>
    </div>
    <div class="center_r">
      <div class="center_r_bottom">
        <p style="font-weight: 700;margin-bottom: 20px;">{{deptlabel}}</p>
        <rd-table
          :tableData="tableData"
          :tableKey="tableKey"
          :loading="loading"
          :fixedTwoRow="fixedTwoRow"
          :pageConfig="pageConfig"
          @select="handleSelect"
          @pageChange="pageChange"
        >
          <template slot="src" slot-scope="scope">
            <img :src="scope.row.src" style="width:56px;height:56px;" alt="">
          </template>
          <template slot="edit" slot-scope="scope">
            <el-button @click="editRow(scope.$index,scope.row.id,scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </rd-table>
      </div>
      <el-drawer
        title=""
        :before-close="handleClose"
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
                <div class="detail">{{dataUser.name}}</div>
              </el-col>
              <el-col :span="8">
                <div class="term">所属部门：</div>
                <div class="detail">{{dataUser.dept}}</div>
              </el-col>
              <el-col :span="8">
                <div class="term">员工类型：</div>
                <div class="detail">{{dataUser.status}}</div>
              </el-col>
              <el-col :span="8">
                <div class="term">入职时间：</div>
                <div class="detail">2020-12-01</div>
              </el-col>
              <el-col :span="8">
                <div class="term">手机号码：</div>
                <div class="detail">{{dataUser.phone}}</div>
              </el-col>
              <el-col :span="8">
                <div class="term">钉钉ID：</div>
                <div class="detail">12345678910</div>
              </el-col>
              <el-col :span="8">
                <div class="term">员工职位：</div>
                <div class="detail">{{dataUser.position}}</div>
              </el-col>
              <el-col :span="8">
                <div class="term">部门内级别：</div>
                <div class="detail">1</div>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <div class="title_drawer">外呼管理</div>
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
            </el-row>
            <el-divider></el-divider>
            <div class="title_drawer">多角色管理</div>
            <el-form-item
              v-for="(domain, index) in formDrawer.domains"
              :key="domain.key"
              :prop="'domains.' + index + '.value'"
              label="角色:"
              :label-width="formLabelWidth">
              <el-select v-model="domain.value" clearable placeholder="请选择">
                <el-option label="省校长" value="sheng"></el-option>
                <el-option label="分校长" value="fen"></el-option>
                <el-option label="战队长" value="zhan"></el-option>
                <el-option label="营销专员" value="ying"></el-option>
                <el-option label="电销专员" value="dian"></el-option>
              </el-select>
              <i class="el-icon-remove" style="margin-left:10px;color:red;" @click.prevent="removeDomain(domain)"></i>
            </el-form-item>
            <el-form-item>
              <div class="demo-drawer__content_btn" @click="addDomain"> + 添加</div>
            </el-form-item>
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
      showNum: 4,
      searchForm: {},
      formOptions: [
        {
          prop: 'username',
          element: 'el-input',
          initValue: '',
          placeholder: '请输入姓名',
        },
        {
          prop: 'phone',
          element: 'el-input',
          initValue: '',
          placeholder: '请输入手机号',
        },
        {
          prop: 'zhiwei',
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
      tableData: [],
      tableKey: [
        { name: '头像',value: 'src',operate: true,width: 80 },
        { name: '姓名',value: 'name' },
        { name: '手机',value: 'phone' },
        { name: '部门',value: 'dept' },
        { name: '职位',value: 'position' },
        { name: '角色',value: 'roles' },
        { name: '状态',value: 'status' },
        { name: '编辑',value: 'edit',operate: true,width: 100 },
      ],
      fixedTwoRow: true,
      treeData: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      dataUser: {},
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      dialog: false,
      loading: false,
      formDrawer: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        domains: [{
          value: ''
        }],
      },
      formLabelWidth: '80px',
      timer: null,
    }
  },
  mounted() {
    // this.getTreeData();
    // this.getTableData();
    this.getDataTree();
    // this.getDataTable();
  },
  methods: {
    // 获取通讯录组织树
    getTreeData() {
      this.$fetch('getDeptTreeList').then(res => {
        console.log(res.data.records,'tree')
        this.treeData = res.data.records;
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
    },
    // 获取组织表格数据
    getTableData() {
      console.log('表格数据')
    },
    onSearch(val) {
      console.log(val, 999)
      this.searchForm = {...val};
      this.getDataTable({
        currentPage: 1,
          pageSize: 10,
          loginUserId,
          ...this.searchForm
      })
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    // 编辑
    editRow(index,id, rows) {
      // rows.splice(index, 1);
      console.log(index,id,rows, 666)
      // this.drawer = true
      this.dataUser = rows
      this.dialog = true
    },
    pageChange(val) {
      console.log(666)
      // this.getTableData({
      //   currentPage: val.page,
      //   showCount: val.limit,
      // });
    },
    handleNodeClick(data) {
      console.log(data, 9999);
      this.deptlabel = data.label
      this.getDataTable();
    },
    handleClose(done) {
      if (this.loading) {
        return;
      }
      console.log(done, 3333)
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true;
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
    // 删除多角色
    removeDomain(item) {
      var index = this.formDrawer.domains.indexOf(item)
      if (index !== -1) {
        this.formDrawer.domains.splice(index, 1)
      }
    },
    // 新增多角色
    addDomain() {
      this.formDrawer.domains.push({
        value: '',
        key: Date.now()
      });
    },
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
           height: calc(100vh - 190px);
           overflow: auto;
           padding-bottom: 24px;
        }
    }
  }
  .center_r {
    overflow: hidden;
    padding: 0 20px 0 20px;
    background-color: #fff;
    .center_r_bottom {
      padding: 0 20px 0 0;
    }
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
      .el-select {
        width: 44.5%;
      }
      .demo-drawer__content_btn {
        width: 100%;
        text-align: center;
        color: skyblue;
        border-radius: 10px;
        border: 1px dashed #ccc;
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