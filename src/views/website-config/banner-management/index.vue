<template>
  <div>
    <el-data-table
      v-bind="recoveryTableData"
      @reset="recoveryTableData.extraQuery = {
          classifyId: '',
          pageId: ''
        }"
    >
      <template v-slot:form="{row}">
        <!-- <el-form label-position="top"> -->
        <el-form-item label="分类" v-if="row">
          <el-cascader
            style="width:100%"
            v-model="row.classifyId"
            :props="{
                label:'classifyName',
                value:'id',
                checkStrictly: true,
                emitPath: false,
                checkStrictly: true
              }"
            :options="classifyList"
            placeholder="请选择类型"
            filterable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="归属页面" label-position="top" v-if="row" prop="pageId">
          <el-select
            style="width:100%"
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
        <!-- <el-form-item label="备注" v-if="row">
          <el-input v-model="row.remark" placeholder="请输入备注" />
        </el-form-item>-->
        <div v-if="row">
          <el-form-item label="轮播图内容">
            <bannercontent v-model="row.content" @sortHandled="arr => row.content = arr"></bannercontent>
          </el-form-item>
        </div>
        <!-- </el-form> -->
      </template>

      <template slot="search">
        <el-form-item label="归属页面">
          <el-select v-model="recoveryTableData.extraQuery.pageId" filterable placeholder="请选择页面">
            <el-option
              v-for="item in pageList"
              :key="item.id"
              :label="item.pageName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类">
          <el-cascader
            style="width:100%"
            v-model="recoveryTableData.extraQuery.classifyId"
            :props="{
                label:'classifyName',
                value:'id',
                checkStrictly: true,
                emitPath: false,
                checkStrictly: true
              }"
            :options="classifyList"
            placeholder="请选择"
            filterable
          ></el-cascader>
        </el-form-item>
      </template>
    </el-data-table>
  </div>
</template>

<script>
import bannercontent from "./content";
export default {
  inject: ['reload'],
  components: {
    bannercontent
  },
  data() {
    const _this = this;
    return {
      recoveryTableData: {
        idkey: "id",
        idName: "id",
        url: {
          get: "website-config/getCarouselPage",
          add: "website-config/addCarousel",
          set: "website-config/setCarousel"
        },
        hasDelete: false,
        // hasEdit: false,
        // hasNew: false,
        columns: [
          { prop: "id", label: "id", width: "70px" },
          { prop: "title", label: "标题" },
          { prop: "pageName", label: "归属页面" },
          // { prop: "module", label: "模块" },
          { prop: "classifyName", label: "分类名称" },
          { prop: "remark", label: "备注" }
        ],
        hasSearch: true,
        searchForm: [
          {
            el: { placeholder: "请输入标题" },
            label: "标题",
            id: "title",
            type: "input"
          }
        ],
        form: [
          {
            type: "input",
            id: "title",
            label: "轮播图标题",
            el: { placeholder: "请输入轮播图标题" },
            rules: [
              {
                required: true,
                message: "请输入轮播图标题",
                trigger: "blur",
                transform: v => v && v.trim()
              }
            ]
          },
          // {
          //   type: "input",
          //   id: "module",
          //   label: "模块",
          //   rules: [
          //     {
          //       required: true,
          //       message: "请输入模块名称",
          //       trigger: "blur",
          //       transform: v => v && v.trim()
          //     }
          //   ],
          //   el: { placeholder: "请输入模块名称" }
          // },
          {
            type: "input",
            id: "remark",
            label: "备注",
            hidden: form => !form.show,
            el: { placeholder: "未填写则使用默认" }
          },
          {
            label: "pageId",
            type: "input",
            id: "pageId",
            el: {},
            hidden: form => !form.show
          },
          {
            label: "pageName",
            type: "input",
            id: "pageName",
            el: {},
            hidden: form => !form.show
          },
          {
            label: "content",
            type: "table",
            id: "content",
            default: [],
            el: {},
            hidden: form => !form.show
          },
          {
            type: "input",
            id: "classifyId",
            label: "类型",
            el: { placeholder: "" },
            hidden: r => !r.show
          }
        ],
        formAttrs: {
          rules: {
            pageId: [
              { required: true, message: "请选择页面", trigger: "change" }
            ]
          }
        },
        extraButtons: [
          {
            type: "danger",
            text: "删除",
            async atClick(row) {
              _this
                .$confirm("此操作将删除该页面, 是否继续?", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "danger"
                })
                .then(async () => {
                  let res = await _this.$store.dispatch(
                    "website-config/delCarousel",
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
        dataPath: "list",
        totalPath: "count",
        tableAttrs: {
          emptyText: "暂无数据"
        },
        extraQuery: {
          pageId: "",
          classifyId: ""
        },
        // hasOperation: false,
        paginationLayout: "sizes,prev, pager, next, jumper"
      },
      pageList: [],
      classifyList: [] // 分类列表
    };
  },
  created() {
    this.getPageList();
    this.getClassList();
  },
  methods: {
    async getPageList() {
      let res = await this.$store.dispatch("website-config/getTdkAll");
      this.pageList = res.data.list.map(item => {
        item.label = item.pageName;
        item.value = item.id;
        return item;
      });
    },
    async getClassList() {
      let res = await this.$store.dispatch("website-config/getClassifyAll");
      this.classifyList = res.data.list;
    },
    sortHandled(arrData) {
      this.row.content = arrData;
      console.log("修改后的数值  arrData",arrData)
    }
  }
};
</script>

