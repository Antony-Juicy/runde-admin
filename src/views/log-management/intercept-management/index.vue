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
          get: "system-management/getIpInfoLogPage",
          add: "website-config/addTdk",
          set: "website-config/setTdk"
        },
        hasOperation: false,
        hasDelete: false,
        hasEdit: false,
        hasNew: false,
        columns: [
          { prop: "id", label: "id", width: 70 },
          {
              label: "操作",
              width: 250,
              formatter: row => {
                  return (<div><p>操作员ip: {row.ip}</p><p>截止时间:{parseTime(row.timeEnd)}</p><p>静止时间: {row.timeDesc}</p></div>)
              }
          },
          {
              label: "接口",
              formatter: row => {
                  return (<div><p>接口地址: {row.url}</p><p>完整路径: {row.path}</p></div>)
              }
          },
          { prop: "logDesc", label: "描述",width: 400 },
          {
              prop: "logDesc",
              label: "时间",
              formatter: row => {
                  return (<div><p>创建时间:{parseTime(row.createAt)}</p><p>修改时间:{row.updateAt}</p></div>)
              }
          }
        ],
        hasSearch: false,
        form: [],
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

