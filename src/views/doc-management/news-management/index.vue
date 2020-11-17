<template>
  <div>
    <el-data-table
      v-bind="recoveryTableData"
      @reset="recoveryTableData.extraQuery = {
          classifyId: ''
        }"
    >
      <template v-slot:form="{row}">
        <div label-position="top" v-if="row">
          <el-form-item label="图片地址">
            <Upload-oss :src.sync="row.imagePath" @srcChangeFun="(data)=>{ row.imagePath = data}"/>
          </el-form-item>
          <el-form-item label="是否隐藏">
            <el-radio v-model="row.hided" label="YES">是</el-radio>
            <el-radio v-model="row.hided" label="NO">否</el-radio>
          </el-form-item>
          <el-form-item label="是否顶部推荐">
            <el-radio v-model="row.headRecommend" label="YES">是</el-radio>
            <el-radio v-model="row.headRecommend" label="NO">否</el-radio>
          </el-form-item>
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
              placeholder="请选择"
              filterable
            ></el-cascader>
          </el-form-item>
          <el-form-item label="新闻详情">
            <Tinymce menubar="false" v-model="row.infoDetail" :height="300" />
          </el-form-item>
        </div>
      </template>

      <template slot="search">
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
        <el-form-item label="隐藏：">
            <el-radio v-model="recoveryTableData.extraQuery.hided" label="YES">是</el-radio>
            <el-radio v-model="recoveryTableData.extraQuery.hided" label="NO">否</el-radio>
          </el-form-item>
          
          <el-form-item label="顶部推荐:">
            <el-radio v-model="recoveryTableData.extraQuery.headRecommend" label="YES">是</el-radio>
            <el-radio v-model="recoveryTableData.extraQuery.headRecommend" label="NO">否</el-radio>
          </el-form-item>
      </template>
    </el-data-table>
  </div>
</template>

<script>
import UploadOss from "@/components/UploadOss";
import Tinymce from "@/components/Tinymce";
import { parseTime } from "@/utils";
export default {
  inject: ['reload'],
  components: { UploadOss, Tinymce },
  data() {
    const _this = this;
    const pd = {
      YES: "是",
      NO: "否"
    };
    return {
      recoveryTableData: {
        idkey: "id",
        idName: "id",
        url: {
          get: "doc-management/getNewsPage",
          add: "doc-management/addNews",
          set: "doc-management/setNews"
        },
        hasDelete: false,
        // hasEdit: false,
        // hasNew: false,
        hasView: true,
        columns: [
          { prop: "id", label: "id", width: "70px" },
          { prop: "infoTitle", label: "新闻标题" },
          { prop: "infoSource", label: "来源" },
          { prop: "watchedNum", label: "阅读量" },
          { prop: "classifyName", label: "分类名称" },
          {
            prop: "createAt",
            label: "创建时间",
            formatter: row => (row.createAt ? parseTime(row.createAt) : "")
          }
        ],
        hasSearch: true,
        formAttrs: {
          rules: {
            classifyId: [
              { required: true, message: "请选择类型", trigger: "change" }
            ]
          }
        },
        searchForm: [
          {
            el: { placeholder: "请输入新闻标题" },
            label: "新闻标题",
            id: "infoTitle",
            type: "input"
          },
          {
            el: { placeholder: "请输入来源" },
            label: "来源",
            id: "infoSource",
            type: "input"
          },
          {
            el: { placeholder: "请输入自定义标签" },
            label: "自定义标签",
            id: "customLabel",
            type: "input"
          }
        ],
        form: [
          {
            type: "input",
            id: "infoTitle",
            label: "新闻标题",
            width: "150px",
            rules: [
              {
                required: true,
                message: "该项为必填项",
                trigger: "blur",
                transform: v => v && v.trim()
              }
            ],
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "infoDescribe",
            label: "新闻描述",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "infoSource",
            label: "来源",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "remark",
            label: "备注",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "customLabel",
            label: "自定义标签(以，分割)",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "headOrder",
            label: "顶部推荐排序",
            default: 0,
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "orderBy",
            default: 0,
            label: "排序",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "imageName",
            label: "图片名称",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "title",
            label: "标题",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "keywords",
            label: "关键词",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "description",
            label: "描述",
            el: { placeholder: "", type: "textarea" }
          },

          // 以下需要在slot中自定义
          {
            type: "input",
            id: "infoDetail",
            label: "新闻详情",
            el: { placeholder: "" },
            hidden: r => !r.show
          },
          {
            type: "input",
            id: "classifyId",
            label: "类型",
            el: { placeholder: "" },
            hidden: r => !r.show
          },
          {
            type: "input",
            id: "classifyName",
            label: "类型",
            el: { placeholder: "" },
            hidden: r => !r.show
          },

          {
            type: "input",
            id: "hided",
            label: "是否隐藏",
            default: "NO",
            el: { placeholder: "" },
            hidden: r => !r.show
          },
          {
            type: "input",
            id: "headRecommend",
            label: "是否顶部推荐",
            default: "NO",
            el: { placeholder: "" },
            hidden: r => !r.show
          },
          {
            type: "input",
            id: "imagePath",
            label: "图片地址",
            el: { placeholder: "" },
            hidden: r => !r.show
          }
        ],
        extraButtons: [
          {
            type: "danger",
            text: "删除",
            async atClick(row) {
              _this
                .$confirm("此操作将删除该数据, 是否继续?", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "danger"
                })
                .then(async () => {
                  let res = await _this.$store.dispatch(
                    "doc-management/delNews",
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
          classifyId: ""
        },
        // hasOperation: false,
        paginationLayout: "sizes,prev, pager, next, jumper"
      },
      classifyList: [] // 分类列表
    };
  },
  created() {
    this.getClassList();
  },
  methods: {
    async getClassList() {
      let res = await this.$store.dispatch("website-config/getClassifyAll");
      this.classifyList = res.data.list;
    }
  }
};
</script>
<style scoped>
.el-radio {
  margin-right: 10px;
}
</style>
