<template>
  <div class="my-chance-container">
    <div class="top-total w-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="私海客户" name="first"></el-tab-pane>
        <el-tab-pane label="公海客户" name="second"></el-tab-pane>
        <el-tab-pane label="锁定客户" name="third"></el-tab-pane>
      </el-tabs>
      <div class="card-wrapper">
        <el-row :gutter="12">
          <el-col :span="4" v-for="item in 5" :key="item">
            <el-card shadow="hover">
              <div class="call-total">
                <div class="call-title">今日有效呼叫</div>
                <div class="call-content">0</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-select v-model="chanceValue" placeholder="请选择">
              <el-option
                v-for="item in chanceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="main mt-15">
      <div class="main-left w-container">
        <!-- {{cutdown}} -->
        <search-form
          :formOptions="formOptions"
          :showNum="6"
          @onSearch="onSearch"
        ></search-form>
        <el-divider></el-divider>
        <div class="btn-wrapper">
          <el-button type="success" size="small" @click="handleAdd"
            >成单</el-button
          >
          <el-button type="warning" size="small" @click="handleAdd"
            >释放</el-button
          >
          <el-button type="danger" size="small" @click="handleAdd"
            >失效</el-button
          >
          <el-button type="primary" size="small" @click="handleAdd"
            >添加</el-button
          >
          <el-button type="info" size="small" @click="handleAdd"
            >AI呼叫</el-button
          >
          <el-button size="small" @click="handleAdd">导入</el-button>
        </div>
        <rd-table
          :tableData="tableData"
          :tableKey="tableKey"
          :pageConfig="pageConfig"
          :filterColumn="true"
          :multiple="true"
          highlight-current-row
          @pageChange="pageChange"
        >
          <template slot="id">
            {{cutdown}}
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
      </div>
      <div class="main-right w-container">
        <div class="contact">
          <div class="contact-title">
            <span>联系电话：</span><span>15692026183</span>
          </div>
          <el-form
            ref="dataForm"
            :model="basicInfo"
            :rules="rules"
            :label-width="formLabelWidth"
          >
            <el-form-item label="跟进状态" prop="status">
              <el-select
                v-model="basicInfo.status"
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="item in statusArr"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="下次联系" prop="nextTime">
              <el-input
                v-model.trim="basicInfo.nextTime"
                autocomplete="off"
                placeholder="请选择"
                size="small"
              />
            </el-form-item>
            <el-form-item label="跟进详情" prop="detail">
              <el-input
                v-model.trim="basicInfo.detail"
                autocomplete="off"
                type="textarea"
                placeholder="请输入"
                size="small"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size="small"
                @click="submitForm('dataForm')"
                class="fr"
                >确定</el-button
              >
            </el-form-item>
          </el-form>
          <div class="contact-title">
            <span>基本资料</span>&nbsp;&nbsp;&nbsp;<el-button
              type="warning"
              size="small"
              @click="dialogVisible = true"
              >点击查看参与活动详情</el-button
            >
          </div>
          <el-form
            ref="dataForm2"
            :model="basicInfo"
            :rules="rules"
            :label-width="formLabelWidth"
          >
            <el-form-item label="机会来源" prop="nextTime">
              <el-input
                v-model.trim="basicInfo.nextTime"
                autocomplete="off"
                placeholder="请输入"
                size="small"
              />
            </el-form-item>
            <el-form-item label="活动名称" prop="detail">
              <el-input
                v-model.trim="basicInfo.detail"
                autocomplete="off"
                placeholder="请输入"
                size="small"
              />
            </el-form-item>
            <el-row :gutter="5">
              <el-col :span="12">
                <el-form-item label="注册人" prop="detail">
                  <el-input
                    v-model.trim="basicInfo.detail"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12"
                ><el-form-item label="赛道" prop="detail">
                  <el-input
                    v-model.trim="basicInfo.detail"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  /> </el-form-item
              ></el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="12">
                <el-form-item label="学员姓名" prop="detail">
                  <el-input
                    v-model.trim="basicInfo.detail"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12"
                ><el-form-item label="性别" prop="detail">
                  <el-input
                    v-model.trim="basicInfo.detail"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  /> </el-form-item
              ></el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="12">
                <el-form-item label="学历" prop="detail">
                  <el-input
                    v-model.trim="basicInfo.detail"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12"
                ><el-form-item label="咨询项目" prop="detail">
                  <el-input
                    v-model.trim="basicInfo.detail"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  /> </el-form-item
              ></el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="12">
                <el-form-item label="咨询科目" prop="detail">
                  <el-input
                    v-model.trim="basicInfo.detail"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12"
                ><el-form-item label="咨询课程" prop="detail">
                  <el-input
                    v-model.trim="basicInfo.detail"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  /> </el-form-item
              ></el-col>
            </el-row>
            <el-form-item label="咨询版型" prop="detail">
                  <el-input
                    v-model.trim="basicInfo.detail"
                    autocomplete="off"
                    placeholder="请输入"
                    size="small"
                  /> </el-form-item
              >
            <el-form-item>
              <el-button
                type="primary"
                size="small"
                @click="submitForm('dataForm2')"
                class="fr"
                >确定</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <!-- 活动详情弹窗 -->
        <el-dialog
          title="查看活动详情"
          :visible.sync="dialogVisible"
          width="90%">
          <activityDetail/>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import activityDetail from "./detail";
export default {
  name: "my-chance",
  data() {
    return {
      activeName: "first",
      chanceValue: "0",
      chanceOptions: [
        {
          value: "0",
          label: "全部",
        },
        {
          value: "1",
          label: "手机外呼",
        },
        {
          value: "2",
          label: "在线外呼（总部）",
        },
        {
          value: "3",
          label: "在线外呼（总部）",
        },
      ],
      // 搜索栏
      formOptions: [
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入学员姓名",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入学员手机",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入标签",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "请选择学历",
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
          placeholder: "请选择机会状态",
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
          placeholder: "请选择机会来源",
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
          placeholder: "请选择查询排序方法",
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
          placeholder: "请选择项目",
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
          placeholder: "请选择咨询科目",
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
          placeholder: "请选择咨询课程",
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
          placeholder: "请选择呼叫状态",
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
      ],
      tableData: [{ id: 1 }, { id: 2 }, { id: 3 }],
      tableKey: [
        {
          name: "姓名",
          value: "id",
          operate: true
        },
        {
          name: "手机号",
          value: "menuName",
        },
        {
          name: "回收倒计时",
          value: "menuType",
          operate: true,
        },
        {
          name: "机会来源",
          value: "menuUrl",
        },
        {
          name: "回访",
          value: "status",
          operate: true,
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
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
      },
      formLabelWidth: "80px",
      statusArr: [],
      basicInfo: {
        status: "",
        nextTime: "",
        detail: "",
      },
      rules: {
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
        nextTime: [
          { required: true, message: "请选择下次联系时间", trigger: "blur" },
        ],
        detail: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
      },
      dialogVisible: false,
      cutdown: ""
    };
  },
  components:{
    activityDetail
  },
  mounted(){
    let newTime = new Date(); //定义结束时间
        let endtime = newTime.setDate(newTime.getDate() + 30);
        console.log(new Date(endtime),4564)
    setInterval(() => {
      this.cutdown = this.$common.showtime(endtime)
    }, 1000);
    // setInterval(()=>{
    //   this.cutdown = this.$common.showtime(30)
    //   console.log(this.cutdown,'this.cutdown')
    // },1000)
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSearch() {},
    handleAdd() {},
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
    }
  },
};
</script>

<style lang='scss' scoped>
.my-chance-container {
  .top-total {
    padding-top: 6px;
    .card-wrapper {
      display: flex;
      & > div {
        flex: 1;
      }
      .call-total {
        .call-title {
          font-size: 12px;
          color: #999;
        }
        .call-content {
          font-size: 30px;
          font-weight: 300;
          color: #ff5722;
        }
      }
      /deep/ {
        .el-card__body {
          background-color: #f8f8f8;
          border: none;
        }
      }
    }
  }
  .main {
    display: flex;
    .main-left {
      width: calc(100% - 26% - 15px);
      margin-right: 15px;
      .search-form-box {
        margin: -15px -15px 0 -15px;
      }
      .btn-wrapper {
        margin-bottom: 15px;
      }
    }
    .main-right {
      width: 26%;
      .contact {
        .contact-title {
          line-height: 40px;
          border-bottom: 1px solid #eee;
          margin-bottom: 10px;
          font-size: 14px;
          font-weight: 500;
        }
        /deep/ {
          .el-form {
            // width: 90%;
          }
          .el-form-item {
            margin-bottom: 13px;
          }
          .el-form-item__error {
            line-height: 0.5;
          }
        }
      }
    }
    /deep/ {
      .el-divider--horizontal {
        margin-top: 0;
        margin-bottom: 15px;
      }
    }
  }
}
</style>