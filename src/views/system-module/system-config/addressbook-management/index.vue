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
        <el-input placeholder="请输入姓名" v-model="input" clearable style="width: 20%"></el-input>
        <el-input placeholder="请输入手机号" v-model="input" clearable style="width: 20%"></el-input>
        <el-input placeholder="请输入职位" v-model="input" clearable style="width: 20%"></el-input>
        <el-input placeholder="请输入ID" v-model="input" clearable style="width: 20%"></el-input>
        <el-button type="primary">搜索</el-button>
        <el-button type="default">重置</el-button>
        <!-- <search-form :formOptions = "formOptions" @onSearch = onSearch></search-form> -->
      </div>
      <div class="center_r_bottom">
        <p style="margin: 0;">医学1战队</p>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop=""
            label="头像"
            width="100">
            <template slot-scope="scope">
              <img :src="scope.row.src" style="width:60px;height:60px;" alt="">
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
      </div>
      <el-drawer
        title="我是标题"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose">
        <span>我来啦!</span>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import RdTree from '@/components/RdTree';
import searchForm from '@/components/Searchform';
export default {
  inject: ["reload"],
  components: {
    RdTree,
    searchForm
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
        }, {
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
      drawer: false,
      direction: 'rtl',
    }
  },
  methods: {
    onSearch(val) {
      console.log(val, 999)
    },
    editRow(index,id, rows) {
      // rows.splice(index, 1);
      console.log(index,id, 666)
      this.drawer = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleNodeClick(data) {
      console.log(data, 9999);
    }
  }
}
</script>

<style lang='less' scoped>
.container {
  display: flex;
  .center_l {
    width: 20%;
    // height: 300px;
    // background-color: pink;
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
  .center_r_top {
    margin-bottom: 20px;
  }
  .center_r {
    width: 80%;
    margin-left: 10px;
    .center_r_bottom {
      height: 600px;
      padding: 20px;
      // background-color: pink;
      border: 1px solid #ccc;
    }
  }
}
</style>