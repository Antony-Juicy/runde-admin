<template>
  <div>
    <el-data-table
      v-bind="recoveryTableData"
       ref="dataTable"
      @reset="recoveryTableData.extraQuery = {
          classifyId: ''
        }"
        @selection-change="onSelectionChange"
    >
      <template v-slot:form="{row}">
        <el-form label-position="top" v-if="row">
          <el-form-item label="课程封面">
            <Upload-oss :src.sync="row.imagePath" @srcChangeFun="(data)=>{ row.imagePath = data}"/>
          </el-form-item>
          <el-form-item label="课程视频小图片">
            <Upload-oss :src.sync="row.imageSmallPath" @srcChangeFun="(data)=>{ row.imageSmallPath = data}"/>
          </el-form-item>
          <el-form-item label="学习方式">
            <el-radio v-model="row.courseStyle" label="网课">网课</el-radio>
            <el-radio v-model="row.courseStyle" label="面授">面授</el-radio>
            <el-radio v-model="row.courseStyle" label="网课+面授">网课+面授</el-radio>
          </el-form-item>
          <el-form-item label="是否隐藏">
            <el-radio v-model="row.hided" label="YES">是</el-radio>
            <el-radio v-model="row.hided" label="NO">否</el-radio>
          </el-form-item>
          <el-form-item label="是否推荐">
            <el-radio v-model="row.recommend" label="YES">是</el-radio>
            <el-radio v-model="row.recommend" label="NO">否</el-radio>
          </el-form-item>
          <el-form-item label="类型">
            <el-radio v-model="row.courseType" label="Course">网课</el-radio>
            <el-radio v-model="row.courseType" label="Live">直播</el-radio>
            <el-radio v-model="row.courseType" label="Class">班型</el-radio>
          </el-form-item>
          <el-form-item label="直播时间" v-if="row.courseType==='Live'">
            <el-date-picker
              value-format="timestamp"
              v-model="row.liveTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="关联课程" v-if="row.courseType==='Live'">
            <el-input placeholder="请输入关联的课程的id" v-model="row.courseId" />
          </el-form-item>
          <el-form-item label="业务类型" v-if="row">
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
              placeholder="请选择业务类型"
              filterable
            ></el-cascader>
          </el-form-item>
          <el-form-item label="课程详情">
            <Tinymce menubar="false" v-model="row.courseDetail" :height="300" />
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
            :options="classifyList"
            placeholder="请选择"
            filterable
          ></el-cascader>
        </el-form-item>
          <el-form-item label="隐藏：">
            <el-radio v-model="recoveryTableData.extraQuery.hided" label="YES">是</el-radio>
            <el-radio v-model="recoveryTableData.extraQuery.hided" label="NO">否</el-radio>
          </el-form-item>
          <el-form-item label="推荐：">
            <el-radio v-model="recoveryTableData.extraQuery.recommend" label="YES">是</el-radio>
            <el-radio v-model="recoveryTableData.extraQuery.recommend" label="NO">否</el-radio>
          </el-form-item>
          <el-form-item label="授课类型：">
            <el-radio v-model="recoveryTableData.extraQuery.courseStyle" label="网课">网课</el-radio>
            <el-radio v-model="recoveryTableData.extraQuery.courseStyle" label="面授">面授</el-radio>
            <el-radio v-model="recoveryTableData.extraQuery.courseStyle" label="网课+面授">网课+面授</el-radio>
          </el-form-item>
          <el-form-item label="类型：">
            <el-radio v-model="recoveryTableData.extraQuery.courseType" label="Course">网课</el-radio>
            <el-radio v-model="recoveryTableData.extraQuery.courseType" label="Live">直播</el-radio>
            <el-radio v-model="recoveryTableData.extraQuery.courseType" label="Class">班型</el-radio>
          </el-form-item>
      </template>
    </el-data-table>
  </div>
</template>

<script>
import UploadOss from "@/components/UploadOss";
import Tinymce from "@/components/Tinymce";
export default {
  inject: ['reload'],
  components: { UploadOss, Tinymce },
  data() {
    const _this = this;
    // const courseStyle = {
    //   Online: "网课",
    //   Face: "面授"
    // };
    return {
             
      recoveryTableData: {
        hasDelete: false,
        // hasEdit: false,
        // hasNew: false,
        hasView: true,
        selected: [],
        idkey: "id",
        idName: "id",
        url: {
          get: "course-management/getCoursePage",
          add: "course-management/addCourse",
          set: "course-management/setCourse"
        },
 
        columns: [
          { prop: "id", label: "id", width: "70px" },
          { prop: "title", label: "标题" },
          { prop: "courseName", label: "课程名称" },
          {
            prop: "hided",
            label: "是否隐藏",
            formatter: row => new Object({ NO: "否", YES: "是" })[row.hided]
          },
          {
            prop: "recommend",
            label: "是否推荐",
            formatter: row => new Object({ NO: "否", YES: "是" })[row.recommend]
          },
          { prop: "orderBy", label: "排序", width: "100px" },
          { prop: "courseStyle",label: "授课类型"},
          {
            label: "类型",
            formatter: row => new Object({ Course: '网课', Live: '直播',Class: '班型' })[row.courseType]
          },
          { prop: "classifyName", label: "分类名称" }
        ],
        hasSearch: true,
        searchForm: [
          {
            el: { placeholder: "请输入标题" },
            label: "标题",
            id: "title",
            type: "input"
          },
          {
            el: { placeholder: "请输入课程名称" },
            label: "课程名称",
            id: "courseName",
            type: "input"
          },
          {
            el: { placeholder: "请输入教师名称" },
            label: "教师名称",
            id: "teacherName",
            type: "input"
          }
        ],
        form: [
          {
            type: "input",
            id: "courseName",
            label: "课程名称",
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
            id: "teacherName",
            label: "主讲名师",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "orderBy",
            label: "排序",
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
            id: "oldPrice",
            label: "原价",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "newPrice",
            label: "现价",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "subject",
            label: "科目",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "courseContent",
            label: "课程内容",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "materialItem",
            label: "配套资料",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "serviceDuration",
            label: "服务期限",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "courseScope",
            label: "适用范围",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "courseCharacter",
            label: "课程特色",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "courseReason",
            label: "推荐理由",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "videoHref",
            label: "试听链接/直播链接",
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
            id: "customLabel",
            label: "自定义标签（以，分割）",
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
            id: "courseDetail",
            label: "课程详情",
            el: { placeholder: "" },
            hidden: r => !r.show
          },
          {
            type: "input",
            id: "classifyId",
            label: "业务类型",
            el: { placeholder: "" },
            hidden: r => !r.show
          },
          {
            type: "input",
            id: "classifyName",
            label: "业务类型",
            el: { placeholder: "" },
            hidden: r => !r.show
          },
          {
            type: "input",
            id: "courseStyle",
            label: "学习方式",
            el: { placeholder: "" },
            hidden: r => !r.show
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
            id: "recommend",
            label: "是否推荐",
            el: { placeholder: "" },
            hidden: r => !r.show
          },
          {
            type: "input",
            id: "courseType",
            label: "类型",
            el: { placeholder: "" },
            hidden: r => !r.show
          },
          {
            type: "table",
            id: "liveTime",
            default: [],
            label: "直播时间",
            el: { placeholder: "" },
            hidden: r => !r.show
          },
          {
            type: "input",
            id: "courseId",
            label: "课程id",
            el: { placeholder: "" },
            hidden: r => !r.show
          },
          {
            type: "input",
            id: "imageSmallPath",
            label: "课程小图片",
            el: { placeholder: "" },
            hidden: r => !r.show
          },
          {
            type: "input",
            id: "imagePath",
            label: "课程封面图片地址",
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
                    "course-management/delCourse",
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
    },
    select() {
     [this.$refs.dataTable.data[1], {id: 3}]
       .forEach(r => this.$refs.dataTable.toggleRowSelection(r, true))
   },
   clearSelection() {
     this.$refs.dataTable.clearSelection()
   },
   onSelectionChange(val) {
     this.selected = val
   },
  }
};
</script>
<style>
.el-radio {
  margin-right: 10px;
}
</style>

