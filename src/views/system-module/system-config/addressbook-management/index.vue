<template>
  <div class="container">
    <div class="center_l">
      <rd-tree :data="dataTree" :defaultProps="defaultProps" @node-click="handleNodeClick">
    </rd-tree>
    </div>
    <div class="center_r">
      <div class="center_r_top">
        <!-- <el-form id="searchBox" :model="formData" ref="formRef" :inline="true">
          <el-form-item
            v-for="(item, index) in formOptions"
            :key="newKeys[index]"
            :prop="item.prop"
            :label="item.label ? item.label + '：' : ''"
            :rules="item.rules">
            <formItem v-model="formData[item.prop]" :itemOptions="item" />
          </el-form-item>
        </el-form> -->
        <!-- <el-form id="searchBox" :model="formData" ref="formRef" :inline="true"> -->

          <el-input placeholder="请输入姓名" v-model="formData.name" clearable style="width: 20%"></el-input>
          <el-input placeholder="请输入手机号" v-model="formData.phone" clearable style="width: 20%"></el-input>
          <el-input placeholder="请输入职位" v-model="formData.zhiwei" clearable style="width: 20%"></el-input>
          <el-input placeholder="请输入ID" v-model="formData.idcar" clearable style="width: 20%"></el-input>
        <!-- </el-form> -->
        <el-button type="primary">搜索</el-button>
        <el-button type="default" @click="onReset">重置</el-button>
        <!-- <search-form :formOptions = "formOptions" @onSearch = onSearch></search-form> -->
      </div>
      <div class="center_r_bottom">
        <p style="margin: 0;">医学1战队</p>
        <el-table
          :data="tableData"
          border
          height="500"
          style="width: 100%;margin-top:10px;">
          <el-table-column
            prop=""
            label="头像"
            width="80">
            <template slot-scope="scope">
              <img :src="scope.row.src" style="width:50px;height:50px;" alt="">
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="date"
            label="手机"
            width="150">
          </el-table-column>
          <el-table-column
            prop="province"
            label="部门"
            width="120">
          </el-table-column>
          <el-table-column
            prop="city"
            label="职位"
            width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="角色"
            width="">
          </el-table-column>
          <el-table-column
            prop="zip"
            label="状态"
            width="120">
          </el-table-column>
          <el-table-column
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="editRow(scope.$index,scope.row.id, tableData)"
                type="text"
                size="small">
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          :total="pageConfig.totalCount"
          :page.sync="pageConfig.pageNum"
          :limit.sync="pageConfig.pageSize"
          @pagination="pageChange"
        />
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
            <DescriptionList
              title="基本信息"
              :gutter="20"
              :col="8"
              :dataUser="dataUser"
              :content="dataUser">
            </DescriptionList>
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
import Pagination from "@/components/Pagination";
import DescriptionList from "./descriptionList"; 
export default {
  inject: ["reload"],
  components: {
    RdTree,
    searchForm,
    Pagination,
    DescriptionList
  },
  data () {
    return {
      input: '',
      // formOptions: [
      //   {
      //     prop: 'username',
      //     element: 'el-input',
      //     initValue: '',
      //     placeholder: '请输入姓名',
      //   },
      //   {
      //     prop: 'phone',
      //     element: 'el-input',
      //     initValue: '',
      //     placeholder: '请输入手机号',
      //   },
      //   {
      //     prop: 'zhiwei',
      //     element: 'el-input',
      //     initValue: '',
      //     placeholder: '请输入职位',
      //   },
      //   {
      //     prop: 'idcard',
      //     element: 'el-input',
      //     initValue: '',
      //     placeholder: '请输入ID',
      //   },
      // ],
      formData: {
        name: '',
        phone: '',
        zhiwei: '',
        idcar: ''
      },
      tableData: [
        {
          id: 2,
          src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2763523135,381182796&fm=26&gp=0.jpg',
          date: '13800138000',
          name: '飞翔的荷兰人',
          province: '医学4战队',
          city: '战队长',
          address: '省校长、分校长...',
          zip: '在职'
        },
        {
          id: 1,
          src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2763523135,381182796&fm=26&gp=0.jpg',
          date: '13800138000',
          name: '飞翔的荷兰人',
          province: '医学4战队',
          city: '营销专员',
          address: '省校长、分校长',
          zip: '在职'
        },
        {
          id: 1,
          src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2763523135,381182796&fm=26&gp=0.jpg',
          date: '13800138000',
          name: '飞翔的荷兰人',
          province: '医学4战队',
          city: '营销专员',
          address: '省校长、分校长',
          zip: '在职'
        },
        {
          id: 1,
          src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2763523135,381182796&fm=26&gp=0.jpg',
          date: '13800138000',
          name: '飞翔的荷兰人',
          province: '医学4战队',
          city: '营销专员',
          address: '省校长、分校长',
          zip: '在职'
        },
        {
          id: 1,
          src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2763523135,381182796&fm=26&gp=0.jpg',
          date: '13800138000',
          name: '飞翔的荷兰人',
          province: '医学4战队',
          city: '营销专员',
          address: '省校长、分校长',
          zip: '在职'
        },
        {
          id: 1,
          src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2763523135,381182796&fm=26&gp=0.jpg',
          date: '13800138000',
          name: '飞翔的荷兰人',
          province: '医学4战队',
          city: '营销专员',
          address: '省校长、分校长',
          zip: '在职'
        },{
          id: 1,
          src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2763523135,381182796&fm=26&gp=0.jpg',
          date: '13800138000',
          name: '飞翔的荷兰人',
          province: '医学4战队',
          city: '营销专员',
          address: '省校长、分校长',
          zip: '在职'
        },
        {
          id: 1,
          src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2763523135,381182796&fm=26&gp=0.jpg',
          date: '13800138000',
          name: '飞翔的荷兰人',
          province: '医学4战队',
          city: '营销专员',
          address: '省校长、分校长',
          zip: '在职'
        },
        {
          id: 1,
          src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2763523135,381182796&fm=26&gp=0.jpg',
          date: '13800138000',
          name: '飞翔的荷兰人',
          province: '医学4战队',
          city: '营销专员',
          address: '省校长、分校长',
          zip: '在职'
        },
        {
          id: 1,
          src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2763523135,381182796&fm=26&gp=0.jpg',
          date: '13800138000',
          name: '飞翔的荷兰人',
          province: '医学4战队',
          city: '营销专员',
          address: '省校长、分校长',
          zip: '在职'
        },
      ],
      dataTree: [
        {
          label: "经营管理中心",
          children: [
            {
              label: "广西校区",
              children: [
                {
                  label: "三级 1-1-1",
                  children: [
                    {
                      label: "四级级 1-1-1",
                      children: [
                        {
                          label: "五级级 1-1-1",
                        },
                      ],
                    },
                  ],
                }
              ],
            },
            {
              label: "山东校区",
              children: [
                {
                  label: "三级 1-1-1",
                  children: [
                    {
                      label: "四级级 1-1-1",
                      children: [
                        {
                          label: "五级级 1-1-1",
                        },
                      ],
                    },
                  ],
                }
              ],
            },
            {
              label: "广东校区",
              children: [
                {
                  label: "广州分校",
                  children: [
                    {
                      label: "四级级 1-1-1",
                      children: [
                        {
                          label: "五级级 1-1-1",
                        },
                      ],
                    },
                  ],
                },
                {
                  label: "佛山分校",
                  children: [
                    {
                      label: "四级级 1-1-1",
                      children: [
                        {
                          label: "五级级 1-1-1",
                        },
                      ],
                    },
                  ],
                },
                {
                  label: "茂名分校",
                  children: [
                    {
                      label: "医学1战队",
                      children: [
                        
                      ],
                    },
                    {
                      label: "医学4战队",
                      children: [
                        
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "产品开发中心",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "总裁办",
          children: [
            {
              label: "二级 2-1",
              children: [],
            }
          ],
        },
        {
          label: "药学事业群",
          children: [
            {
              label: "二级 2-1",
              children: [],
            }
          ],
        },
        {
          label: "医学事业群",
          children: [
            {
              label: "二级 2-1",
              children: [],
            }
          ],
        },
        {
          label: "学历事业群",
          children: [
            {
              label: "二级 2-1",
              children: [],
            }
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      dataUser: [
        {
          term: "员工姓名",
          detail: "飞翔的荷兰人"
        },
        {
          term: "所属部门",
          detail: "系统研发部"
        },
        {
          term: "员工类型",
          detail: "在职"
        },
        {
          term: "入职时间",
          detail: "2020-12-01"
        },
        {
          term: "手机号码",
          detail: "13800138000"
        },
        {
          term: "钉钉ID",
          detail: "12345678910"
        },
        {
          term: "员工职位",
          detail: "产品经理"
        },
        {
          term: "部门内级别",
          detail: "5"
        }
      ],
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
  methods: {
    onSearch(val) {
      console.log(val, 999)
    },
    onReset() {
      console.log(9999)
      this.$refs.formRef.resetFields();
    },
    editRow(index,id, rows) {
      // rows.splice(index, 1);
      console.log(index,id, 666)
      // this.drawer = true
      this.dialog = true
    },
    pageChange(val) {
      this.getTableData({
        currentPage: val.page,
        showCount: val.limit,
      });
    },
    handleNodeClick(data) {
      console.log(data, 9999);
    },
    handleClose(done) {
      if (this.loading) {
        return;
      }
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
.container {
  display: flex;
  .center_l {
    width: 20%;
    // height: 300px;
    background-color: #fff;
    border: 1px solid #ccc;
    .tree-container /deep/ {
      .el-tree {
        .el-tree-node__expand-icon.el-icon-caret-right {
          &::before {
            content: url(https://rdimg.rundejy.com/web/runde_console/static/new_test_more.png) !important;
          }
          &.is-leaf {
            &::before {
              content: "" !important;
            }
          }
          &.expanded {
            transform: none !important;
            &::before {
              content: url(https://rdimg.rundejy.com/web/runde_console/static/new_test_less.png) !important;
            }
          }
        }
      }

      .el-tree > .el-tree-node:after {
        border-top: none;
      }

      .el-tree-node {
        position: relative;
        padding-left: 16px;
      }

      .el-tree-node__children {
        padding-left: 16px;
      }

      .el-tree-node :last-child:before {
        height: 38px;
      }

      .el-tree > .el-tree-node:before {
        border-left: none;
      }

      .el-tree-node:before {
        content: "";
        left: -4px;
        position: absolute;
        right: auto;
        border-width: 1px;
      }

      .el-tree-node:after {
        content: "";
        left: -4px;
        position: absolute;
        right: auto;
        border-width: 1px;
      }

      .el-tree-node:before {
        border-left: 1px solid #e3e3e3;
        bottom: 0px;
        height: 100%;
        top: -26px;
        width: 1px;
      }

      .el-tree-node:after {
        border-top: 1px solid #e3e3e3;
        height: 20px;
        top: 12px;
        width: 24px;
      }
    }
  }
  .center_r {
    width: 80%;
    padding: 20px;
    margin-left: 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    .center_r_top {
      // margin-bottom: 20px;
    }
    .center_r_bottom {
      height: 600px;
      padding: 20px 20px 20px 0;
      .pagination-container {
        padding: 20px 16px;
      }
    }
    .demo-drawer__content {
      padding: 40px 60px 0 30px;
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