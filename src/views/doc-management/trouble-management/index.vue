<template>
  <div>
    <el-data-table
      v-bind="recoveryTableData"
      @reset="recoveryTableData.extraQuery = {
          classifyId: ''
        }"
    >
      <template v-slot:form="{row}">
        <el-form label-position="top">
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
              :options="classifyOptions"
              placeholder="请选择"
              filterable
            ></el-cascader>
          </el-form-item>
          <el-form-item label="关联课程" v-if="row">
            <el-select
              style="width:100%"
              v-model="row.courseId"
              filterable
              placeholder="请选择课程"
              @change="e=>row.courseName=courseOptions.filter(item=>item.id===e)[0].courseName"
            >
              <el-option
                v-for="item in courseOptions"
                :key="item.id"
                :label="item.courseName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="答案" v-if="row">
            <Tinymce menubar="false" v-model="row.answer" :height="300" />
          </el-form-item>
        </el-form>
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
            :options="classifyOptions"
            placeholder="请选择"
            filterable
          ></el-cascader>
        </el-form-item>
      </template>
    </el-data-table>
  </div>
</template>

<script>
import { parseTime } from "@/utils";
import Tinymce from "@/components/Tinymce";
export default {
  inject: ['reload'],
  components: { Tinymce },
  data() {
    const _this = this;
    return {
      classifyOptions: [],
      courseOptions: [],
      value: "",
      recoveryTableData: {
        idkey: "id",
        idName: "id",
        url: {
          get: "doc-management/getTroublePage",
          add: "doc-management/addTrouble",
          set: "doc-management/setTrouble"
        },
        hasDelete: false,
        hasView: true,
        // hasEdit: false,
        // hasNew: false,
        hasSearch: true,
        columns: [
          { prop: "id", label: "id", width: "70px" },
          { prop: "question", label: "问题" },
          { prop: "customLabel", label: "标签", width: "150px" },
          { prop: "classifyName", label: "分类名称" },
          {
            prop: "createAt",
            label: "创建时间",
            formatter: row => parseTime(row.createAt)
          }
        ],
        searchForm: [
          {
            el: { placeholder: "请输入问题" },
            label: "问题",
            id: "question",
            type: "input"
          },
          {
            el: { placeholder: "请输入标签" },
            label: "标签",
            id: "customLabel",
            type: "input"
          }
        ],
        form: [
          {
            type: "input",
            id: "question",
            label: "问题",
            rules: [
              {
                required: true,
                message: "请输入问题",
                trigger: "blur",
                transform: v => v && v.trim()
              }
            ],
            el: { placeholder: "请输入问题" }
          },
          {
            type: "input",
            id: "customLabel",
            label: "自定义标签（多个以,分割）",
            el: { placeholder: "请输入自定义标签（多个以,分割）" }
          },
          {
            type: "input",
            id: "remark",
            label: "备注",
            el: { placeholder: "请输入备注" }
          },
          {
            label: "answer",
            type: "input",
            id: "answer",
            el: {},
            hidden: form => !form.show
          },
          {
            label: "courseId",
            type: "input",
            id: "courseId",
            el: {},
            hidden: form => !form.show
          },
          {
            label: "classifyId",
            type: "input",
            id: "classifyId",
            el: {},
            hidden: form => !form.show
          }
        ],
        extraButtons: [
          {
            type: "danger",
            text: "删除",
            async atClick(row) {
              _this
                .$confirm("此操作将删除该信息, 是否继续?", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "danger"
                })
                .then(async () => {
                  let res = await _this.$store.dispatch(
                    "doc-management/delTrouble",
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
      rules: {}
    };
  },
  created() {
    this.getClassifyOptions();
    this.getCourseOptions();
  },
  methods: {
    async getClassifyOptions() {
      let res = await this.$store.dispatch("website-config/getClassifyAll");
      this.classifyOptions = res.data.list;
    },
    async getCourseOptions() {
      let res = await this.$store.dispatch(
        "course-management/getCourseIdAndNameAll"
      );
      this.courseOptions = res.data.list;
    }
  }
};
</script>

