<template>
  <div>
    <el-form class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="addPermissionGroup">新增管理员</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="userAccount" label="账号"></el-table-column>
      <el-table-column prop="userName" label="管理员名称"></el-table-column>
      <el-table-column prop="groupName" label="权限组"></el-table-column>
      <el-table-column prop="lastLogin" label="最后登录时间"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="small" type="primary" icon="el-icon-edit" @click="edit(scope)">编辑</el-button>
          <el-button
            size="small"
            :disabled="name===scope.row.userAccount"
            type="danger"
            icon="el-icon-delete"
            @click="del(scope)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="`管理员修改[${backupTableData.userAccount}]`"
      width="50%"
      v-if="editForm"
      :visible.sync="editForm.show"
    >
      <el-form ref="editform" :model="editForm" label-width="120px" :rules="rules">
        <el-form-item label="账号">
          <div
            style="width:200px;float:left;"
            v-show="!editForm.changeName"
          >{{editForm.userAccount}}</div>
          <el-input style="width:200px" v-model="editForm.userAccount" v-show="editForm.changeName"></el-input>
          <el-button
            :type="editForm.changeName?'success':'primary'"
            :icon="`el-icon-${editForm.changeName?'check':'edit'}`"
            circle
            @click="editForm.changeName = !editForm.changeName"
          ></el-button>
        </el-form-item>
        <el-form-item label="管理员名称">
          <div
            style="width:200px;float:left;"
            v-show="!editForm.changeRealName"
          >{{editForm.userName}}</div>
          <el-input
            style="width:200px"
            v-model="editForm.userName"
            v-show="editForm.changeRealName"
          ></el-input>
          <el-button
            :type="editForm.changeRealName?'success':'primary'"
            :icon="`el-icon-${editForm.changeRealName?'check':'edit'}`"
            circle
            @click="editForm.changeRealName = !editForm.changeRealName"
          ></el-button>
        </el-form-item>
        <el-form-item label="权限组">
          <el-dropdown trigger="click" @command="setPermission">
            <span class="el-dropdown-link">
              {{ editForm.groupName?editForm.groupName:'请选择权限组'}}
              <i
                class="el-icon-arrow-down el-icon--right"
              ></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-popover
                placement="right"
                width="150"
                trigger="hover"
                v-for="item in groupData"
                :key="item.id"
              >
                <el-popover
                  placement="right"
                  width="150"
                  trigger="hover"
                  v-for="route in routes"
                  :key="route.path"
                >
                  <el-button
                    v-for="child in route.children"
                    :key="child.path"
                    type="text"
                    style="width:100%;float:right;margin:5px 0;"
                    v-show="item.routes.includes(child.path)"
                  >{{child.meta.title}}</el-button>

                  <el-button
                    slot="reference"
                    style="width:100%;float:right;margin:5px 0;"
                    v-show="item.routes.includes(route.path)"
                  >{{route.meta.title}}</el-button>
                </el-popover>
                <el-dropdown-item
                  :command="{...item,target:'editForm'}"
                  slot="reference"
                >{{item.groupName}}</el-dropdown-item>
              </el-popover>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
        <!-- <el-form-item label="权限组">
          <el-button type="primary" size="medium">修改权限</el-button>
        </el-form-item>-->
        <el-form-item label="新密码" prop="pwd">
          <el-input
            style="width:250px;float:left;"
            type="text"
            show-password
            v-model="editForm.pwd"
            placeholder="如需修改密码请输入，否则不填"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tableData[editForm.index] = {...backupTableData};editForm = null;">取 消</el-button>
        <el-button type="primary" @click="submitEdit()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="新增管理员" :visible.sync="addDialogVisible">
      <el-form ref="addForm" :model="addForm" label-width="120px" :rules="rules">
        <el-form-item label="账号" prop="userAccount">
          <el-input style="width:200px" v-model="addForm.userAccount"></el-input>
        </el-form-item>
        <el-form-item label="管理员名称" prop="userName">
          <el-input style="width:200px" v-model="addForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="权限组" prop="groupName">
          <el-dropdown trigger="click" @command="setPermission">
            <span class="el-dropdown-link">
              {{ addForm.groupName?addForm.groupName:'请选择权限组'}}
              <i
                class="el-icon-arrow-down el-icon--right"
              ></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-popover
                placement="right"
                width="150"
                trigger="hover"
                v-for="item in groupData"
                :key="item.id"
              >
                <el-popover
                  placement="right"
                  width="150"
                  trigger="hover"
                  v-for="route in routes"
                  :key="route.path"
                >
                  <el-button
                    v-for="child in route.children"
                    :key="child.path"
                    type="text"
                    style="width:100%;float:right;margin:5px 0;"
                    v-show="item.routes.includes(child.path)"
                  >{{child.meta.title}}</el-button>

                  <el-button
                    slot="reference"
                    style="width:100%;float:right;margin:5px 0;"
                    v-show="item.routes.includes(route.path)"
                  >{{route.meta.title}}</el-button>
                </el-popover>
                <el-dropdown-item
                  :command="{...item,target:'addForm'}"
                  slot="reference"
                >{{item.groupName}}</el-dropdown-item>
              </el-popover>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
        <el-form-item label="密码" prop="addPwd">
          <el-input
            style="width:250px;float:left;"
            type="text"
            show-password
            v-model="addForm.addPwd"
          />
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
      backupTableData: {},
      tableData: [],
      groupData: [],
      addForm: {},
      editForm: null,
      addDialogVisible: false,
      rules: {
        pwd: [
          {
            min: 6,
            max: 18,
            message: "密码长度在 6 到 18 个字符",
            trigger: "blur"
          }
        ],
        userAccount: [
          { required: true, message: "请输入账号", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入管理员名称", trigger: "blur" }
        ],
        addPwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "密码长度在 6 到 18 个字符",
            trigger: "blur"
          }
        ],
        groupName: [
          { required: true, message: "请选择权限组", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["permission_addRoutes", "name"])
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
    time(time = +new Date()) {
      let date = new Date(time + 8 * 3600 * 1000);
      return date
        .toJSON()
        .substr(0, 19)
        .replace("T", " ")
        .replace(/-/g, "-");
    },
    async getData() {
      const data = await this.$store.dispatch(
        "system-management/getPlatformAdminAccount"
      );
      this.tableData = [
        ...data.list.map(item => {
          if(item.lastLogin) {
            item.lastLogin = this.time(item.lastLogin);
          }
          
          return item;
        })
      ];
      const groupData = await this.$store.dispatch(
        "system-management/getAdminGroup"
      );
      this.groupData = [...groupData];
    },
    addPermissionGroup() {
      this.addForm = {
        userAccount: "",
        addPwd: "",
        avatar: "",
        userName: "",
        admin_group_id: "",
        groupName: ""
      };
      this.addDialogVisible = true;
    },
    async submitAdd() {
      new Promise((resolve, reject) => {
        this.$refs.addForm.validate(valid => {
          if (valid) {
            resolve();
          } else {
            reject();
          }
        });
      })
        .then(async () => {
          this.addForm.pwd = this.addForm.addPwd;
          const res = await this.$store.dispatch(
            "system-management/addPlatformAdminAccount",
            this.addForm
          );
          this.$message({
            message: res,
            type: "success"
          });
          this.getData();
          this.addDialogVisible = false;
        })
        .catch(err => {});
    },
    edit(item) {
      let data = item.row;
      this.backupTableData = { ...item.row };
      this.editForm = {
        ...data,
        index: item.$index,
        show: true,
        changeName: false,
        changeRealName: false,
        changeGroup: false,
        changePwd: false,
        pwd: "",
        groupName: data.groupName,
        admin_group_id: data.groupId
      };
    },
    del(item) {
      this.$confirm(
        "此操作将永久删除该管理员, 是否继续?",
        `删除[${item.row.userAccount}]`,
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "danger"
        }
      )
        .then(async () => {
          const res = await this.$store.dispatch(
            "system-management/delPlatformAdminAccount",
            { id: item.row.id }
          );
          this.$message({
            type: "success",
            message: res
          });
          this.getData();
        })
        .catch(() => {});
    },
    async submitEdit() {
      new Promise((resolve, reject) => {
        this.$refs.editform.validate(valid => {
          if (valid) {
            resolve();
          } else {
            reject();
          }
        });
      }).then(async () => {
        let form = this.editForm;
        let oriData = { ...this.tableData[form.index] };
        let params = {
          id: form.id,
          groupId: form.admin_group_id,
          userAccount: form.userAccount,
          userName: form.userName
        };
        if (form.pwd) {
          params.password = form.pwd;
        }
        console.log(form);
        const res = await this.$store.dispatch(
          "system-management/setPlatformAdminAccount",
          params
        );
        this.$message({
          message: res,
          type: "success"
        });
        this.getData();
        this.editForm = null;
      });
    },

    setPermission(e) {
      this[e.target].admin_group_id = e.id;
      this[e.target].groupName = e.groupName;
    },
  }
};
</script>
