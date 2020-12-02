<template>
  <div class="menu-wrapper">
    <search-form
      :formOptions="formOptions"
      :showNum="showNum"
      @onSearch="onSearch"
    ></search-form>
    <div class="menu-wrapper-left">
      <rd-tree
        :data="treeData"
        :defaultProps="defaultProps"
        @nodeClick="handleNodeClick"
      >
      </rd-tree>
    </div>
    <div class="menu-wrapper-right w-container">
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
        <template slot="name" slot-scope="scope">
          <el-tag size="medium">{{ scope.row.name }}</el-tag>
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
      <!-- 新增/编辑 弹窗 -->
      <rd-dialog
        :title="dialogStatus ? '新增菜单' : '编辑菜单'"
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
            label="父级菜单"
            prop="parentId"
            :label-width="formLabelWidth"
            v-if="dialogStatus"
          >
            {{ selectedTree.name }}（id:{{ selectedTree.id }}）
          </el-form-item>
          <el-form-item
            label="编码"
            prop="code"
            :label-width="formLabelWidth"
            v-if="dialogStatus"
          >
            <el-row>
              <el-col :span="16">
                <el-input
                  v-model="basicInfo.code"
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
                  v-prevent-re-click="2000"
                  >获取编码</el-button
                ></el-col
              >
            </el-row>
          </el-form-item>
          <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
            <el-input
              v-model="basicInfo.name"
              autocomplete="off"
              placeholder="请输入名称"
            />
          </el-form-item>
          <el-form-item
            label="状态"
            prop="status"
            :label-width="formLabelWidth"
          >
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
          <el-form-item label="类型" prop="type" :label-width="formLabelWidth">
            <el-select v-model="basicInfo.type" placeholder="请选择类型">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="更新理由"
            prop="updateReason"
            :label-width="formLabelWidth"
            v-if="!dialogStatus"
          >
            <el-input
              v-model="basicInfo.updateReason"
              autocomplete="off"
              placeholder="请输入更新理由"
              type="textarea"
              :rows="1"
            />
          </el-form-item>
          <el-form-item
            label="前端url"
            prop="frontUrl"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="basicInfo.frontUrl"
              autocomplete="off"
              placeholder="请输入前端url"
            />
          </el-form-item>
          <el-form-item
            label="后端url"
            prop="backUrl"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="basicInfo.backUrl"
              autocomplete="off"
              placeholder="请输入后端url"
            />
          </el-form-item>
          <el-form-item
            label="图标"
            prop="icon"
            :label-width="formLabelWidth"
            class="icon-wrapper"
          >
            {{ basicInfo.icon }}
            <Upload-oss
              v-if="uploadOssElem"
              :objConfig="{ dir: 'web/runde_admin', project: 'icon_' }"
              :src.sync="basicInfo.icon"
              @srcChangeFun="
                (data) => {
                  basicInfo.icon = data;
                  reloadElem('uploadOssElem');
                }
              "
            />
          </el-form-item>
          <el-form-item
            label="排序编号"
            prop="orderNum"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="basicInfo.orderNum"
              autocomplete="off"
              placeholder="请输入排序编号"
            />
          </el-form-item>
          <el-form-item
            label="备注"
            prop="remark"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="basicInfo.remark"
              autocomplete="off"
              placeholder="请输入备注"
              type="textarea"
              :rows="2"
            />
          </el-form-item>
        </el-form>
      </rd-dialog>
    </div>
  </div>
</template>

<script>
import RdTree from "@/components/RdTree";
import searchForm from "@/components/Searchform";
import UploadOss from "@/components/UploadOss";
let loginUserId = JSON.parse(localStorage.getItem("userInfo")).userId;
export default {
  inject: ["reload"],
  components: {
    RdTree,
    searchForm,
    UploadOss,
  },
  data() {
    return {
      tabPosition: "left",
      text: "",
      tableData: [
        {
          id: 1,
          name: 111,
          status: 1,
          classifyName: "微软",
          icon: "https://rdimg.rundejy.com/web/runde_admin/icon_hs.png",
          remark:
            "看全国分校审批查看全国分校审批查看全国分,校审批查看全国分校审批,查看全国分校审批查,看全国分校审批查看全国分校审批查看全国分校审批查看全国分校审批查",
        },
        {
          id: 2,
          name: 111,
          status: 1,
          classifyName: "微软",
          remark: "abh瑟夫",
        },
      ],
      tableKey: [
        {
          name: "ID",
          value: "id",
          width: 80,
        },
        {
          name: "名称",
          value: "name",
        },
        {
          name: "排序",
          value: "orderNum",
        },
        {
          name: "类型",
          value: "type",
        },
        {
          name: "路径",
          value: "frontUrl",
          showTooltip: false,
        },
        {
          name: "图标",
          value: "icon",
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
          width: 120,
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
        code: "11",
        name: "",
        status: "",
        type: "",
        remark: "",
        frontUrl: "",
        backUrl: "",
        orderNum: "",
        updateReason: "",
        icon: "",
      },
      rules: {
        updateReason: [
          { required: true, message: "请输入更新理由", trigger: "blur" },
        ],
        code: [{ required: true, message: "请获取编码", trigger: "blur" }],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
      },
      options: [
        {
          label: "正常",
          value: "1",
        },
        {
          label: "暂停",
          value: "0",
        },
      ],
      typeOptions: [
        {
          label: "目录",
          value: "0",
        },
        {
          label: "菜单",
          value: "1",
        },
        {
          label: "令牌",
          value: "2",
        },
      ],
      // 树状
      treeData: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      selectedTree: "",

      // 搜索栏
      formOptions: [
        {
          prop: "name",
          element: "el-input",
          initValue: "",
          placeholder: "请输入名称",
        },
        {
          prop: "type",
          element: "el-select",
          initValue: "",
          placeholder: "请选择类型",
          options: [
            {
              label: "目录",
              value: 0,
            },
            {
              label: "菜单",
              value: 1,
            },
            {
              label: "令牌",
              value: 2,
            },
          ],
        },
      ],
      showNum: 4,
      searchForm: {}, //搜索栏信息
      currentPageInfo: null, //当前页数 page和limit
      uploadOssElem: true,
    };
  },
  mounted() {
    // this.getTableData();
    // this.getTreeData();
  },
  methods: {
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    pageChange(val) {
      this.currentPageInfo = val;
      this.getTableData({
        currentPage: val.page || 1,
        pageSize: val.limit || 10,
        loginUserId,
        ...this.searchForm,
      });
    },
    getTableData(params) {
      const loading = this.$loading({
        lock: true,
        target: ".el-table",
      });
      this.$fetch(
        "getMenuList",
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
      // 如果没有先选父级结果 弹出提示
      // if(!this.selectedTree) {
      //   this.$message({
      //     message: '请先选择父级菜单',
      //     type: 'warning'
      //   })
      //   return;
      // }else if(this.selectedTree.type != "0") {
      //   this.$message({
      //     message: '请选择正确的菜单',
      //     type: 'warning'
      //   })
      //   return;
      // }
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
          if (this.basicInfo.type == "0" && !this.basicInfo.frontUrl) {
            this.$message({
              message: "请输入前端url",
              type: "warning",
            });
            return;
          }
          if (this.basicInfo.type == "1" && !this.basicInfo.backUrl) {
            this.$message({
              message: "请输入后端url",
              type: "warning",
            });
            return;
          }
          if (this.basicInfo.orderNum && isNaN(this.basicInfo.orderNum)) {
            this.$message({
              message: "请输入正确的排序编号",
              type: "warning",
            });
            return;
          }

          if (this.dialogStatus) {
            // 新增
            this.$fetch("menu_save", {
              ...this.basicInfo,
              isOneLevel: 0,
              loginUserId,
              parentId: this.selectedTree.id,
            }).then((res) => {
              this.$message({
                message: "提交成功",
                type: "success",
              });
              this.handleClose("dataForm");
              this.pageChange(this.currentPageInfo);
            });
          } else {
            // 编辑
            this.$fetch("menu_edit", {
              ...this.basicInfo,
              loginUserId,
            }).then((res) => {
              this.$message({
                message: "编辑成功",
                type: "success",
              });
              this.handleClose("dataForm");
              this.pageChange(this.currentPageInfo);
            });
          }
        }
      });
    },
    // 删除权限
    handleDelete(data) {
      let info = "权限";
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$fetch("menu_delete", { id: data.row.id });
          if (res) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            setTimeout(() => {
              this.pageChange(this.currentPageInfo);
            }, 50);
          }
        })
        .catch(() => {});
    },

    // 操作菜单树
    handleNodeClick(data) {
      console.log(data, "---");
      this.selectedTree = data;
    },
    getTreeData() {
      this.$fetch("getMenuTreeList").then((res) => {
        console.log(res.data.records, "tree");
        this.treeData = res.data.records;
      });
    },

    // 获取编码
    getCode() {
      this.$fetch("system_getCode", {
        flagType: 5,
      }).then((res) => {
        this.basicInfo.code = res.data;
      });
    },

    // 搜索
    onSearch(data) {
      console.log(data, "data--");
      this.searchForm = { ...data };
      this.getTableData({
        currentPage: 1,
        pageSize: 10,
        loginUserId,
        ...this.searchForm,
      });
    },

    // 上传组件
    reloadElem(dataElem) {
      // 重新加载组件
      this[dataElem] = false;
      this.$nextTick(() => {
        this[dataElem] = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-wrapper {
  .menu-wrapper-left {
    float: left;
    width: 340px;
    margin-right: 24px;
    overflow: auto;
    .tree-container {
      /deep/ .el-tree {
        padding-top: 24px;
        height: calc(100vh - 260px);
        overflow: auto;
        padding-bottom: 24px;
      }
    }
  }
  .menu-wrapper-right {
    overflow: hidden;
    .btn-wrapper {
      margin-bottom: 16px;
    }

    /deep/ {
      .img180 {
        width: 70px;
        height: 70px;
      }
      .icon-wrapper .el-form-item__content {
        line-height: 0;
      }
    }
  }

  .authority-tree {
    padding-left: 20px;
  }
}
</style>