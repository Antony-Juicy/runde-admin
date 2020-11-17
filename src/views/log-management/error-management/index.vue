<template>
  <div>
    <el-data-table v-bind="recoveryTableData"></el-data-table>
  </div>
</template>

<script>
import { parseTime } from "@/utils";
export default {
  data() {
    const _this = this;
    return {
      recoveryTableData: {
        idkey: "id",
        idName: "id",
        url: {
          get: "system-management/getErrorLogPage",
          add: "website-config/addTdk",
          set: "website-config/setTdk"
        },
        hasOperation: false,
        hasDelete: false,
        hasEdit: false,
        hasNew: false,
        hasView: true,
        columns: [
          { prop: "id", label: "id",width: 70 },
          {
            label: '错误明细',
            width: 400,
            formatter: row => {
              return (<div><p style="color: #e43232;">时间:{parseTime(row.createAt)}</p><p>参数值:{row.errParam}</p> <p  style="color: #e43232;">于{row.errLine}行报错  方法名:{row.errMethod}</p> <p>文件名称:{row.errFile}</p><p>类名称:{row.errClass}</p><br/><p style="color: #409EFF;">备注:{row.remark}</p>  </div>)
            }
          },
          { prop: "errType", label: "错误类型", width: 500 },
          { prop: "errInfo", label: "错误信息" }
          
        ],
        hasSearch: false,
        form: [
          {
            type: "input",
            id: "errParam",
            label: "参数值",
            el: { placeholder: "", type: "textarea" }
          },
          {
            type: "input",
            id: "errFile",
            label: "文件名称",
            el: { placeholder: "", type: "textarea" }
          },
          {
            type: "input",
            id: "errClass",
            label: "类名称",
            el: { placeholder: "", type: "textarea" }
          },
          {
            type: "input",
            id: "errMethod",
            label: "方法名称",
            el: { placeholder: "", type: "textarea" }
          },
          {
            type: "input",
            id: "errLine",
            label: "错误行号",
            el: { placeholder: "", type: "textarea" }
          },
          {
            type: "input",
            id: "errType",
            label: "错误类型",
            el: { placeholder: "", type: "textarea" }
          },
          {
            type: "input",
            id: "errInfo",
            label: "错误信息",
            el: { placeholder: "", type: "textarea" }
          },
          {
            type: "input",
            id: "userId",
            label: "用户id",
            el: { placeholder: "", type: "textarea" }
          },
          {
            type: "input",
            id: "userName",
            label: "用户名称",
            el: { placeholder: "", type: "textarea" }
          },
          {
            type: "input",
            id: "remark",
            label: "备注",
            el: { placeholder: "", type: "textarea" }
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

