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
          get: "system-management/getAdminLogPage",
          add: "website-config/addTdk",
          set: "website-config/setTdk"
        },
        hasOperation: false,
        hasDelete: false,
        hasEdit: false,
        hasNew: false,
        hasView: false,
        columns: [
          { prop: "id", label: "id", width: 70 },
          {
              label: "技术员",
              width: 200,
              formatter: row => {
                  return (<div><p>姓名:{row.adminName}</p><p>Ip: {row.adminIp}</p><p>Id: {row.adminId}</p></div>)
              }
          },
          {
              label: "操作对象",
              width: 200,
              formatter: row => {
                  return (<div><p>内容Id: {row.beanId}</p><p>内容标题: {row.beanTitle}</p><p>{row.operationType}时间:</p><p>{parseTime(row.operationTime)}</p></div>)
              }
          },
          { prop: "params", label: "参数集合",width: 400 },
          { prop: "operationDesc", label: "操作描述" }
        ],
        hasSearch: false,
        form: [],
        dataPath: "list",
        totalPath: "count",
        tableAttrs: {
          emptyText: "暂无数据"
        },
        paginationLayout: "sizes,prev, pager, next, jumper"
      },
      rules: {}
    };
  },
  methods: {}
};
</script>

