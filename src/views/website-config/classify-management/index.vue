<template>
  <div>
    <el-data-table v-bind="recoveryTableData" @reset="recoveryTableData.extraQuery = {
          pageId: ''
        }">
      <template v-slot:form="{row}">
        <el-form label-position="top" v-if="row">
          <el-form-item label="是否隐藏">
            <el-radio v-model="row.hided" label="YES">是</el-radio>
            <el-radio v-model="row.hided" label="NO">否</el-radio>
          </el-form-item>
          <el-form-item label="归属页面" prop="pageId">
            <el-select
              v-model="row.pageId"
              filterable
              placeholder="请选择页面"
              @change="e=>row.pageName=pageList.filter(item=>item.id===e)[0].pageName"
            >
              <el-option
                v-for="item in pageList"
                :key="item.id"
                :label="item.pageName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        

        <!-- <el-form label-position="top" v-if="row">
          <el-form-item label="该页面URL">
            <el-input v-if="row.shortUrl" placeholder="请输入访问的URL" v-model="row.shortUrl" />
          </el-form-item>
        </el-form> -->
      </template>
      <!-- <template slot="header">
          <el-button size="small" @click="createHandler" >一键生成路径</el-button>
      </template> -->

    <!-- <el-form class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="addPermissionGroup">新增管理员</el-button>
      </el-form-item>
    </el-form> -->
    </el-data-table>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  data() {
    const _this = this;
    return {
      recoveryTableData: {
        idkey: "id",
        idName: "id",
        treeParentKey: "parentId",
        treeLevelKey: "classifyLevel",
        isTree: true,
        url: {
          get: "website-config/getClassifyPage",
          add: "website-config/addClassify",
          set: "website-config/setClassify"
        },
        hasDelete: false,
        // hasEdit: false,
        // hasNew: false,
        // hasView: true,
        columns: [
          { prop: "classifyName", label: "分类名称", width: "200px" },
          { prop: "id", label: "id", width: "120px" },
          { prop: "orderBy", label: "排序", width: "120px" },
          { prop: "remark", label: "备注" },
          { prop: "shortUrl", label: "URL" }
        ],
        form: [
          {
            type: "input-number",
            id: "orderBy",
            label: "排序",
            rules: [
              {
                required: true,
                message: "请输入排序",
                trigger: "blur",
                // transform: v => v * 1
              }
            ],
            el: { placeholder: "请输入排序", "controls-position": "right" }
          },
          {
            type: "input",
            id: "classifyName",
            label: "分类名称",
            rules: [
              {
                required: true,
                message: "请输入分类名称",
                trigger: "blur",
                transform: v => v && v.trim()
              }
            ],
            el: { placeholder: "请输入分类名称" }
          },
          {
            type: "input",
            id: "hided",
            label: "是否隐藏",
            el: { placeholder: "" },
            hidden: r => !r.show
          },
          {
            type: "input",
            id: "remark",
            label: "备注",
            el: { placeholder: "请输入备注" }
          },
          {
            type: "input",
            id: "shortUrl",
            label: "URL简称",
            el: { placeholder: "请输入访问的URL" }
          },
          {
            type: "input",
            id: "pageId",
            label: "页面ID",
            el: { placeholder: "" },
            hidden: r => !r.show
          },
          {
            type: "input",
            id: "pageName",
            label: "页面名称",
            el: { placeholder: "" },
            hidden: r => !r.show
          },
        ],
        extraButtons: [
          {
            type: "danger",
            text: "删除",
            async atClick(row) {
              _this
                .$confirm("此操作将删除该分类, 是否继续?", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "danger"
                })
                .then(async () => {
                  let res = await _this.$store.dispatch(
                    "website-config/delClassify",
                    {
                      id: row.id
                    }
                  );
                  _this.$message({
                    message: "删除成功",
                    type: "success"
                  });
                  _this.reload();
                })
                .catch(() => {});
              resolve(false);
            }
          }
        ],
        formAttrs: {
          rules: {
            pageId: [
              { required: true, message: "请选择类型", trigger: "change" }
            ]
          }
        },
        dataPath: "list",
        totalPath: "count",
        tableAttrs: {
          emptyText: "暂无数据"
        },
        expandAll: false,
        // hasOperation: false,
        paginationLayout: "sizes,prev, pager, next, jumper",
        theItemUrl: ''
      },
      rules: {},
      pageList: [] // 分类列表
    };
  },
  created() {
    this.getPageList();
  },
  mounted() {
    
  },
  methods: {
    async getPageList() {
      let res = await this.$store.dispatch("website-config/getTdkAll");
      this.pageList = res.data.list.map(item => {
        item.label = item.pageName;
        item.value = item.id;
        return item;
      });
    }
    // async init() {
    //     let res = await this.$store.dispatch("website-config/getPinYinJianCheng", {
    //         parentId: 37, // 该分类的父级id
    //         classifyName: '药师测试' // 该分类的分类名称
    //     });
    //     data: {shortUrl: "yscs"}
    // },
    // 暂时先不上这个版本
    // createHandler() {
    //   this.$confirm(
    //     "执行一键生成路径后，会将未设置的路径的分类自动设置以分类中文的拼音简称为路径，是否继续？",
    //     {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       type: "danger"
    //     }
    //   )
    //     .then(async () => {
    //        let res = await this.$store.dispatch('website-config/oneKeyMakeUrl', {});
    //        console.log("hh",hh);
    //       this.$message({
    //         type: "success",
    //         message: res
    //       });
    //       this.getData();
    //     })
    //     .catch(() => {});
    // }
  }
};
</script>

