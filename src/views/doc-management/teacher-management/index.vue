<template>
  <div>
    <el-data-table v-bind="recoveryTableData" @reset="recoveryTableData.extraQuery = {
          pageId: ''
        }">
      <template v-slot:form="{row}">
        <!-- <el-form label-position="top"> -->
        <div v-if="row">
          <el-form-item label="教师小图">
            <Upload-oss :src.sync="row.imgSmall"  @srcChangeFun="(data)=>{ row.imgSmall = data}" />
          </el-form-item>
          <el-form-item label="教师大图">
            <Upload-oss :src.sync="row.imgBig"  @srcChangeFun="(data)=>{ row.imgBig = data}"/>
          </el-form-item>
          <el-form-item label="教师二维码">
            <Upload-oss :src.sync="row.imgCode"  @srcChangeFun="(data)=>{ row.imgCode = data}"/>
          </el-form-item>
          <el-form-item label="是否隐藏">
            <el-radio v-model="row.hided" label="YES">是</el-radio>
            <el-radio v-model="row.hided" label="NO">否</el-radio>
          </el-form-item>
          <el-form-item label="类型" prop="pageId">
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
        </div>

        <!-- </el-form> -->
      </template>

      <!-- 搜索栏 -->
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
          get: "doc-management/getTeacherPage",
          add: "doc-management/addTeacher",
          set: "doc-management/setTeacher"
        },
        hasDelete: false,
        // hasEdit: false,
        // hasNew: false,
        hasView: true,
        columns: [
          { prop: "id", label: "id", width: "70px" },
          { prop: "name", label: "教师名称" },
          { prop: "pageName", label: "归属页面" },
          { prop: "course", label: "课程" },
          {
            prop: "remark",
            label: "备注"
          }
        ],
        hasSearch: true,
        formAttrs: {
          rules: {
            pageId: [
              { required: true, message: "请选择类型", trigger: "change" }
            ]
          }
        },
        searchForm: [
          {
            el: { placeholder: "请输入教师名称" },
            label: "教师名称",
            id: "name",
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
            id: "name",
            label: "姓名",
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
            id: "course",
            label: "所教科目",
            el: { placeholder: "" },
            rules: [
              {
                required: true,
                message: "该项为必填项",
                trigger: "blur",
                transform: v => v && v.trim()
              }
            ],
          },
          {
            type: "input",
            id: "shortTxt",
            label: "简介",
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
            id: "remark",
            label: "备注",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "orderBy",
            label: "排序",
            default: 0,
            el: { placeholder: "" }
          },

          // 以下需要在slot中自定义
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
            id: "imgSmall",
            label: "教师小图",
            el: { placeholder: "" },
            hidden: r => !r.show
          },
          {
            type: "input",
            id: "imgBig",
            label: "教师大图",
            el: { placeholder: "" },
            hidden: r => !r.show
          },
          {
            type: "input",
            id: "imgCode",
            label: "教师二维码",
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
                    "doc-management/delTeacher",
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
          pageId: ""
        },
        // hasOperation: false,
        paginationLayout: "sizes,prev, pager, next, jumper"
      },
      pageList: [] // 分类列表
    };
  },
  created() {
    this.getPageList();
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
  }
};
</script>

