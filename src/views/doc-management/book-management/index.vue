<template>
  <div>
    <el-data-table
      v-bind="recoveryTableData"
      @reset="recoveryTableData.extraQuery = {
          classifyId: ''
        }"
    >
      <template v-slot:form="{row}">
        <!-- <el-form label-position="top"> -->
        <div v-if="row">
          <el-form-item label="图书封面">
            <Upload-oss :src.sync="row.bookImage" @srcChangeFun="(data)=>{ row.bookImage = data}"/>
          </el-form-item>
          <el-form-item label="图书类型">
            <el-radio v-model="row.bookType" label="JC">教材</el-radio>
            <el-radio v-model="row.bookType" label="XT">习题</el-radio>
            <el-radio v-model="row.bookType" label="JY">讲义</el-radio>
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
                checkStrictly: true,
                expandTrigger: 'hover'
              }"
              ref="cascader"
              :options="classifyList"
              placeholder="请选择"
              filterable
            ></el-cascader>
          </el-form-item>
          <el-form-item label="图书详情">
            <Tinymce menubar="false" v-model="row.bookContent" :height="300" />
          </el-form-item>
        </div>

        <!-- </el-form> -->
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

    const bookType = {
      JC: "教材",
      XT: "习题",
      JY: "讲义"
    };
    return {
      recoveryTableData: {
        idkey: "id",
        idName: "id",
        url: {
          get: "doc-management/getBookPage",
          add: "doc-management/addBook",
          set: "doc-management/setBook"
        },
        hasDelete: false,
        // hasEdit: false,
        // hasNew: false,
        hasView: true,
        columns: [
          { prop: "id", label: "id", width: "70px" },
          { prop: "bookName", label: "图书名称" },
          { prop: "subject", label: "科目" },
          {
            prop: "bookType",
            label: "图书类型",
            formatter: row => (row.bookType ? bookType[row.bookType] : "")
          },
          { prop: "classifyName", label: "分类名称" },
          {
            prop: "remark",
            label: "备注"
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
            el: { placeholder: "请输入图书名称" },
            label: "图书名称",
            id: "bookName",
            type: "input"
          },
          {
            el: { placeholder: "请输入课程" },
            label: "课程",
            id: "course",
            type: "input"
          }
        ],
        form: [
          {
            type: "input",
            id: "bookName",
            label: "图书名称",
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
            id: "subject",
            label: "科目",
            el: { placeholder: "" },
            rules: [
              {
                required: true,
                message: "该项为必填项",
                trigger: "blur",
                transform: v => v && v.trim()
              }
            ]
          },
          {
            type: "input",
            id: "bookSn",
            label: "图书编码",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "brandName",
            label: "图书品牌",
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
            id: "bookYear",
            label: "图书年份",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "bookHref",
            label: "图书点击链接",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "specification",
            label: "规格",
            el: { placeholder: "" }
          },

          {
            type: "input",
            id: "author",
            label: "作者",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "publishing",
            label: "出版社",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "publishingTime",
            label: "出版时间",
            el: { placeholder: "" }
          },

          // 以下需要在slot中自定义
          {
            type: "input",
            id: "classifyId",
            label: "业务类型id",
            el: { placeholder: "" },
            hidden: r => !r.show
          },
          {
            type: "input",
            id: "classifyName",
            label: "业务类型名称",
            el: { placeholder: "" },
            hidden: r => !r.show
          },
          {
            type: "input",
            id: "bookType",
            label: "图书类型",
            default: "",
            el: { placeholder: "" },
            hidden: r => !r.show
          },
          {
            type: "input",
            id: "bookImage",
            label: "图书封面图片",
            el: { placeholder: "" },
            hidden: r => !r.show
          },
          {
            type: "input",
            id: "bookContent",
            label: "图书详情",
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
                    "doc-management/delBook",
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
    this.getClassifyList();
  },
  methods: {
    async getClassifyList() {
      let res = await this.$store.dispatch("website-config/getClassifyAll");
      this.classifyList = res.data.list;
    }
  }
};
</script>

