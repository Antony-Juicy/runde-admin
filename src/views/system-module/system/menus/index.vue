<template>
  <div class="menu-wrapper">
    <search-form
      :formOptions="formOptions"
      :showNum="showNum"
      @onSearch="onSearch"
    ></search-form>
    <div class="menu-wrapper-left beauty-scroll">
      <rd-tree
        :data="treeData"
        :defaultProps="defaultProps"
        @nodeClick="handleNodeClick"
        :default-expanded-keys="defaultKeys"
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
        :fixedTwoRow="fixedTwoRow"
        :pageConfig.sync="pageConfig"
        :filterColumn="true"
        :tbodyHeight="600"
        @select="handleSelect"
        @pageChange="pageChange"
        @sortChange="sortChange"
      >
        <template slot="menuType" slot-scope="scope">
          <span>{{ scope.row.menuType | typeFilter }}</span>
        </template>
        <template slot="status" slot-scope="scope">
          <span>{{ scope.row.status | statusFilter }}</span>
        </template>
        <template slot="menuUrl" slot-scope="scope">
          <span>{{
            scope.row.menuType == "0" ? scope.row.menuUrl : scope.row.menuBackUrl
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
            :label="selectedTree.menuType=='1'?'父级接口':'父级菜单'"
            prop="parentId"
            :label-width="formLabelWidth"
            v-if="dialogStatus"
          >
            {{ selectedTree.menuName }}（id:{{ selectedTree.id }}）
          </el-form-item>
          <el-form-item label="名称" prop="menuName" :label-width="formLabelWidth">
            <el-input
              v-model.trim ="basicInfo.menuName"
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
          <el-form-item label="类型" prop="menuType" :label-width="formLabelWidth">
            <el-select
              v-model="basicInfo.menuType"
              placeholder="请选择类型"
              :disabled="!dialogStatus"
            >
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
              v-model.trim="basicInfo.updateReason"
              autocomplete="off"
              placeholder="请输入更新理由"
              type="textarea"
              :rows="1"
            />
          </el-form-item>
          <el-form-item
            label="前端url"
            prop="menuUrl"
            :label-width="formLabelWidth"
            v-if="basicInfo.menuType == '0'"
          >
            <el-input
              v-model.trim="basicInfo.menuUrl"
              autocomplete="off"
              placeholder="请输入前端url"
            />
          </el-form-item>
          <el-form-item
            label="后端url"
            prop="menuBackUrl"
            :label-width="formLabelWidth"
            v-if="basicInfo.menuType == '1'"
          >
            <el-input
              v-model.trim = "basicInfo.menuBackUrl"
              autocomplete="off"
              placeholder="请输入后端url"
            />
          </el-form-item>
          <el-form-item
            label="过滤类型"
            prop="filterType"
            :label-width="formLabelWidth"
            v-if="basicInfo.menuType == '2'"
          >
            <el-select v-model="basicInfo.filterType" placeholder="请选择类型">
              <el-option
                v-for="item in filterTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="过滤条件"
            prop="filterWhere"
            :label-width="formLabelWidth"
            v-if="basicInfo.menuType == '2'"
          >
            <el-input
              v-model.trim ="basicInfo.filterWhere"
              autocomplete="off"
              placeholder="请输入过滤条件"
            />
          </el-form-item>
          <el-form-item
            label="过滤数据"
            prop="filterData"
            :label-width="formLabelWidth"
            v-if="basicInfo.menuType == '2'"
          >
            <el-input
              v-model.trim ="basicInfo.filterData"
              autocomplete="off"
              placeholder="请输入过滤数据"
            />
          </el-form-item>
          <el-form-item
            label="图标"
            prop="menuIcon"
            :label-width="formLabelWidth"
            class="icon-wrapper"
          >
            <Upload-oss
             :objConfig="{module: 'system', project: 'icon_'}"
              :src.sync="basicInfo.menuIcon"
            />
          </el-form-item>
          <el-form-item
            label="排序编号"
            prop="menuOrder"
            :label-width="formLabelWidth"
          >
            <el-input-number
              controls-position="right"
              v-model.trim ="basicInfo.menuOrder"
              autocomplete="off"
              :min="0"
              placeholder="请输入排序编号"
            />
          </el-form-item>
          <el-form-item
            label="备注"
            prop="description"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model.trim ="basicInfo.description"
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
import UploadOss from "@/components/UploadOss";
let loginUserId = JSON.parse(localStorage.getItem("userInfo")).userId;
export default {
  inject: ["reload"],
  name:'menus',
  components: {
    RdTree,
    UploadOss,
  },
  data() {
    return {
      defaultKeys: [],
      tabPosition: "left",
      text: "",
      tableData: [
      ],
      tableKey: [
        {
          name: "ID",
          value: "id",
          width: 80
        },
        {
          name: "名称",
          value: "menuName"
        },
        {
          name: "类型",
          value: "menuType",
          operate: true,
          width: 80
        },
        {
          name: "路径",
          value: "menuUrl",
          showTooltip: false,
          operate: true,
        },
        {
          name: "状态",
          value: "status",
          operate: true,
           width: 80
        },
        {
          name: "排序",
          value: "menuOrder",
          width: 60
        },
        {
          name: "备注",
          value: "description",
          showTooltip: true
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 120,
          fixed: 'right'
        },
      ],
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
      },
      dialogVisible: false,
      dialogStatus: true, //弹窗状态： true 新增 false 编辑
      formLabelWidth: "100px",
      basicInfo: {
        // code: "11",
        menuName: "",
        status: "1",
        menuType: "1",
        description: "",
        menuUrl: "",
        menuBackUrl: "",
        menuOrder: "",
        updateReason: "",
        menuIcon: "",
        filterType: "",
        filterWhere:"",
        filterData:""
      },
      rules: {
        updateReason: [
          { required: true, message: "请输入更新理由", trigger: "blur" },
        ],
        // code: [{ required: true, message: "请获取编码", trigger: "blur" }],
        menuName: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {  max: 25, message: '长度不多于25个字符', trigger: 'blur' }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
        menuType: [{ required: true, message: "请选择类型", trigger: "blur" }],
        menuUrl: [
          { required: true, message: "请输入前端url", trigger: "blur" },
        ],
        menuBackUrl: [
          { required: true, message: "请输入后端url", trigger: "blur" },
        ],
        filterType: [
          { required: true, message: "请选择过滤类型", trigger: "blur" },
        ],
        filterWhere: [
          { required: true, message: "请输入过滤条件", trigger: "blur" },
        ]
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
          label: "菜单",
          value: "0",
        },
        {
          label: "接口",
          value: "1",
        },
        {
          label: "数据权限",
          value: "2",
        },
      ],
      // 树状
      treeData: [],
      defaultProps: {
        children: "children",
        label: "menuName",
      },
      selectedTree: "",

      // 搜索栏
      formOptions: [
        {
          prop: "menuName",
          element: "el-input",
          initValue: "",
          placeholder: "请输入名称",
        },
        {
          prop: "menuType",
          element: "el-select",
          initValue: "",
          placeholder: "请选择类型",
          options: [
            {
              label: "菜单",
              value: "0",
            },
            {
              label: "接口",
              value: "1",
            },
            {
              label: "数据权限",
              value: "2",
            },
          ],
        },
      ],
      showNum: 4,
      searchForm: {}, //搜索栏信息
      currentPageInfo: null, //当前页数 page和limit
      uploadOssElem: true,
      filterTypeOptions: [
        {
          label: "数据过滤",
          value: "1",
        },
        {
          label: "按钮",
          value: "2",
        },
        {
          label: "列表列显示",
          value: "3",
        },
      ],
      parentId: null
    };
  },
  filters: {
    typeFilter(status) {
      switch (status) {
        case "0":
          return "菜单";
        case "1":
          return "接口";
        case "2":
          return "数据权限";
        default:
          return "";
      }
    },
    statusFilter(status){
        switch(status){
            case "0":
                return '暂停';
            case "1":
                return '正常';
            default:
                return '';
        }
    }
  },
  mounted() {
    this.getTableData();
    this.getTreeData();
  },
  methods: {
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    pageChange(val) {
      this.currentPageInfo = val;
      this.pageConfig.currentPage = val.page;
      this.pageConfig.pageSize = val.limit;
      console.log(this.searchForm,'this.searchForm--')
      this.getTableData({
        currentPage: (val && val.page) || 1,
        pageSize: (val && val.limit) || 10,
        loginUserId,
        ...this.searchForm,
        parentId: this.parentId
      });
    },
    getTableData(params) {
      this.$fetch(
        "getMenuList",
        params || {
          loginUserId,
          ...this.pageConfig,  //页数
          ...this.searchForm,  //搜索条件
          parentId: this.parentId//父级id
        }
      ).then((res) => {
        this.tableData = res.data.records;
        this.pageConfig.totalCount = res.data.total;
      });
    },
    // 打开新增弹窗
    handleAdd() {
      // 如果没有先选父级结果 弹出提示
      if (!this.selectedTree) {
        this.$message({
          message: "请先选择父级菜单",
          type: "warning",
        });
        return;
      } else if (this.selectedTree.menuType == "2") {
        this.$message({
          message: "请选择正确的菜单或接口",
          type: "warning",
        });
        return;
      }
      for (const key in this.basicInfo) {
        this.basicInfo[key] = "";
      }
      this.basicInfo.status="1"
        // this.basicInfo.menuType= "1"
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
      // this.$refs[formName].resetFields();
    },
    // 提交
    submitForm(formName) {
      this.$forceUpdate();
      this.$refs[formName].validate((valid) => {
        if (valid) {

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
              this.getTableData();
              this.getTreeData();
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
              this.getTableData();
              this.getTreeData();
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
          const res = await this.$fetch("menu_delete", {
            ids: data.id,
            loginUserId,
          }).then((res) => {
            if (res) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              setTimeout(() => {
                this.getTableData();
                this.getTreeData();
              }, 50);
            }
          });
        })
        .catch(() => {});
    },

    // 操作菜单树
    handleNodeClick(data) {
      this.selectedTree = data;
      this.parentId = data.id;
      this.pageConfig.currentPage = 1;
      this.getTableData();
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

    // 获取编码
    getCode() {
      this.$fetch("system_getCode", {
        flagType: 5,
      }).then((res) => {
        this.basicInfo.code = res.data;
        this.$forceUpdate();
        console.log(this.basicInfo.code,'this.basicInfo.code---')
      });
    },

    // 搜索
    onSearch(data) {
      console.log(data, "data--",this.currentPageInfo);
      this.searchForm = { ...data };
      this.pageConfig.currentPage = 1;
      this.getTableData();
    },

    // 上传组件
    reloadElem(dataElem) {
      // 重新加载组件
      this[dataElem] = false;
      this.$nextTick(() => {
        this[dataElem] = true;
      });
    },

    // 排序发生变化的时候
    sortChange(data) {
      console.log(data, "data--");
    }
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
        height: calc(100vh - 230px);
        overflow: auto;
      }
    }
  }
  .menu-wrapper-right {
    overflow: hidden;
    min-height: calc(100vh - 230px);
    .btn-wrapper {
      margin-bottom: 8px;
    }

    /deep/ {
      .img180 {
        width: 70px;
        height: 70px;
      }
      .icon-wrapper .el-form-item__content {
        line-height: 0;
      }

      .el-input.is-disabled .el-input__inner {
      color: #767a82;
    }
    }
  }

  .authority-tree {
    padding-left: 20px;
  }
}
</style>