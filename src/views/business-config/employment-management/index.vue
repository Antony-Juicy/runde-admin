<template>
  <div>
    <el-data-table v-bind="recoveryTableData">
      <template v-slot:form="{row}">
        <!-- <el-form label-position="top"> -->
        <el-form-item label="类型" v-if="row" prop="recruitType">
          <el-select v-model="row.recruitType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" v-if="row">
          <Tinymce menubar="false" style="width:100%" v-model="row.content" :height="300" />
        </el-form-item>
        <!-- </el-form> -->
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
    const recruitType = {
      Teacher: '师资类',
      Marketing: '营销类',
    }
    return {
      options: [
        {
          value: "Teacher",
          label: "师资类"
        },
        {
          value: "Marketing",
          label: "营销类"
        }
      ],
      value: "",
      recoveryTableData: {
        idkey: "id",
        idName: "id",
        url: {
          get: "business-config/getEmploymentPage",
          add: "business-config/addEmployment",
          set: "business-config/setEmployment"
        },
        hasDelete: false,
        hasView: true,
        // hasEdit: false,
        // hasNew: false,
        formAttrs: {
          rules: {
            recruitType: [
              { required: true, message: "请选择类型", trigger: "change" }
            ]
          }
        },
        columns: [
          { prop: "id", label: "id", width: "70px" },
          {
            prop: "recruitType",
            label: "类型",
            width: "150px",
            formatter: row => recruitType[row.recruitType]
          },
          { prop: "title", label: "标题", width: "150px" },
          {
            prop: "createAt",
            label: "创建时间",
            formatter: row => parseTime(row.createAt)
          }
        ],
        form: [
          {
            type: "input",
            id: "title",
            label: "标题",
            rules: [
              {
                required: true,
                message: "请输入标题",
                trigger: "blur",
                transform: v => v && v.trim()
              }
            ],
            el: { placeholder: "请输入标题" }
          },
          {
            label: "content",
            type: "input",
            id: "content",
            el: {},
            hidden: form => !form.show
          },
          {
            label: "recruitType_text",
            type: "input",
            id: "recruitType_text",
            el: {},
            hidden: form => !form.show
          },
          {
            label: "recruitType",
            type: "input",
            id: "recruitType",
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
                    "business-config/delEmployment",
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
        // hasOperation: false,
        paginationLayout: "sizes,prev, pager, next, jumper"
      },
      rules: {}
    };
  },
  methods: {}
};
</script>

