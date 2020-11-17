<template>
  <div>
    <el-form class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="addPermissionGroup">新增权限组</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="groupName" label="权限名称" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            
            type="primary"
            icon="el-icon-edit"
            @click="edit(scope)"
          >编辑</el-button>
          <el-button
            size="small"
            :disabled="scope.row.setFlag"
            type="danger"
            icon="el-icon-delete"
            @click="del(scope)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="`权限管理[${tableData[dialogIndex].groupName}]`"
      width="50%"
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
    >
      <el-form ref="form" label-width="100px">
        <el-form-item label="权限组名称">
          <el-input v-model="editName" size="small" style="width:200px;"></el-input>
        </el-form-item>
      </el-form>
      <el-tabs tab-position="left" style="height: 380px;" v-if="routes.length">
        <el-tab-pane v-for="route in routes" :key="route.path" :label="route.meta.title">
          <el-form label-width="120px">
            <el-form-item
              :label="child.meta.title"
              v-for="child in route.children"
              :key="child.path"
            >
              <el-switch
                :value="tableData[dialogIndex].routes.includes(child.path)"
                @change="permissionChange(child.path,child.i)"
              ></el-switch>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="dialogVisible = false;tableData[dialogIndex].routes = [...backupTableData]"
        >取 消</el-button>
        <el-button type="primary" @click="submitEdit()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="新增权限组" :visible.sync="addDialogVisible">
      <el-form ref="form" :model="addForm" label-width="100px">
        <el-form-item label="组名称">
          <el-input v-model="addForm.groupName" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="开启所有权限">
          <el-switch v-model="addForm.all"></el-switch>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      routes: [],
      backupTableData: [],
      tableData: [],
      dialogVisible: false,
      dialogIndex: null,

      editName: "",
      addForm: {
        groupName: "",
        all: false
      },
      addDialogVisible: false
    };
  },
  computed: {
    ...mapGetters(["permission_addRoutes"])
  },
  created() {
    this.getData();
    this.routes = this.permission_addRoutes
      .filter(route => {
        return route.meta;
      })
      .map((item, i) => {
        item.children = item.children.map(child => {
          child.i = i;
          return child;
        });
        return item;
      });
  },
  methods: {
    async getData() {
      const data = await this.$store.dispatch(
        "system-management/getAdminGroup"
      );
      this.tableData = [...data];
    },
    addPermissionGroup() {
      this.addForm.groupName = "";
      this.addForm.all = false;
      this.addDialogVisible = true;
    },
    async submitAdd() {
      let groupName = this.addForm.groupName,
        vueRouter = [];
      if (this.addForm.all) {
        vueRouter = this.tableData[0].vueRouter;
      }
      const res = await this.$store.dispatch(
        "system-management/addPlatformAdminGroup",
        {
          groupName,
          vueRouter:JSON.stringify(vueRouter)
        }
      );
      this.$message({
        message: res,
        type: "success"
      });
      this.getData();
      this.addDialogVisible = false;
    },
    edit(item) {
      this.editName = item.row.groupName;
      this.backupTableData = [...this.tableData[item.$index].routes];
      this.dialogIndex = item.$index;
      this.dialogVisible = true;
    },
    del(item) {
      this.$confirm(
        "此操作将永久删除该权限组, 是否继续?",
        `删除[${item.row.groupName}]`,
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "danger"
        }
      )
        .then(async () => {
          const res = await this.$store.dispatch(
            "system-management/delPlatformAdminGroup",
            item.row.id
          );
          this.$message({
            type: "success",
            message: res
          });
          this.getData();
        })
        .catch(() => {});
    },
    permissionChange(e, i) {
      if (this.tableData[this.dialogIndex].routes.includes(e)) {
        // del
        this.removePath(e);
      } else {
        // add
        this.addPath(e);
      }
      if (i >= 0) {
        const pPath = this.routes[i].path;
        if (
          this.routes[i].children.some(child =>
            this.tableData[this.dialogIndex].routes.includes(child.path)
          )
        ) {
          this.addPath(pPath);
        } else {
          this.removePath(pPath);
        }
      }
    },
    addPath(path) {
      this.tableData[this.dialogIndex].routes.push(path);
    },
    removePath(path) {
      this.tableData[this.dialogIndex].routes = this.tableData[
        this.dialogIndex
      ].routes.filter(item => {
        return item !== path;
      });
    },
    async submitEdit() {
      const data = this.tableData[this.dialogIndex];
      const res = await this.$store.dispatch(
        "system-management/setAdminGroup",
        {
          groupId: data.id,
          vueRouter: data.routes,
          groupName: this.editName
        }
      );
      this.$message({
        message: res,
        type: "success"
      });
      this.getData();
      this.dialogVisible = false;
    }
  }
};
</script>
