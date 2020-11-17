<template>
  <div id="out-table" ref="table">
    <el-data-table v-bind="recoveryTableData" >
      <template v-slot:form="{row}">
        <el-form label-position="top">
          <el-form-item label="归属页面" v-if="row">
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
        </el-form>
      </template>
      <template slot="search">
        <el-form-item label="时间段">
          <el-date-picker
            v-model="timeLine"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @blur="filterTime"
            >
          </el-date-picker>
        </el-form-item>
      </template>
      <template slot="extraBtn">
          <el-button size="small" @click="exportExcel('客户管理列表')">导出excel</el-button>
      </template>
    </el-data-table>
  </div>
</template>

<script>
import { parseTime } from "@/utils";
import { getToken } from '@/utils/auth'
const iceConfig = require('@/config/config.js')
export default {
  inject: ['reload'],
  data() {
    const _this = this;
    return {
      recoveryTableData: {
        idkey: "id",
        idName: "id",
        url: {
          get: "chance-management/getCustomerPage",
          add: "chance-management/addCustomer",
          set: "chance-management/setCustomer"
        },
        hasDelete: false,
        hasEdit: false,
        hasNew: false,
        hasView: true,
        columns: [
          { prop: "id", label: "客户ID", width: "70px" },
          { prop: "name", label: "姓名", width: "150px" },
          { prop: "phone", label: "手机号" },
          { prop: "city", label: "城市" },
          {
            prop: "createAt",
            label: "留言时间",
            formatter: row => parseTime(row.createAt)
          },
          { prop: "pageName", label: "页面(ID ~ 名称)" ,
            formatter: row => {
              return <div>
                  <p>{row.pageId} ~ {row.pageName}</p>
              </div>
            }
          },
          { prop: "education", label: "学历" },
          // { prop: "workNow", label: "当前工作" },
          // { prop: "workYear", label: "工作年限" },
          // { prop: "majorCollege", label: "专业或心仪的大学" },
          // { prop: "studyMethod", label: "学习方式" },
          { prop: "subject", label: "科目" },
          // { prop: "basicSituation", label: "基础情况" }
          // { prop: "ipAddr", label: "ip地址" }
        ],
        hasSearch: true,
        searchForm: [
          {
            el: { placeholder: "请输入姓名" },
            label: "姓名",
            id: "name",
            type: "input"
          },
          {
            el: { placeholder: "请输入页面id" },
            label: "ID",
            id: "pageId",
            type: "input"
          }
        ],
        form: [
          {
            type: "input",
            id: "name",
            label: "姓名",
            width: "150px",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "age",
            label: "年龄",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "phone",
            label: "手机号",
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
            id: "city",
            label: "城市",
            el: { placeholder: "" }
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
            id: "pageId",
            label: "页面id",
            el: { placeholder: "" },
            hidden: r => !r.show
          },
          {
            type: "input",
            id: "education",
            label: "学历",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "workNow",
            label: "当前工作",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "workYear",
            label: "工作年限",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "majorCollege",
            label: "专业或心仪的大学",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "studyMethod",
            label: "学习方式",
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
            id: "basicSituation",
            label: "基础情况",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "ipAddr",
            label: "ip地址",
            el: { placeholder: "" }
          },
          {
            type: "input",
            id: "url",
            label: "URL",
            el: { placeholder: "" }
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
                    "chance-management/delCustomer",
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
          createAt: []
        },
        // hasOperation: false,
        paginationLayout: "sizes,prev, pager, next, jumper"
      },
      rules: {},
      timeLine: [],
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
    },
    filterTime() {
      let newdata = [new Date(this.timeLine[0]).valueOf() ,new Date(this.timeLine[1]).valueOf() ];
      this.recoveryTableData.extraQuery.createAt = newdata;
    },
    exportExcel() {
      console.log('this.recoveryTableData',this.recoveryTableData)
        let data = {
        createAt: this.recoveryTableData.extraQuery.createAt || '',
        pageId: this.recoveryTableData.extraQuery.pageId || '',
        name: this.recoveryTableData.extraQuery.name || ''
      }
      let token =  getToken();
      const timestamp = parseInt(new Date().getTime() / 1000);
      let dataString = "createAt="+ data.createAt + "&pageId="+data.pageId + "&name=" + data.name + "&token="+ token +"&timestamp="+ timestamp;
        window.open(iceConfig.baseUrl + "/admin/customer/export?"+dataString);
        // console.log("dataString",iceConfig.baseUrl + "/admin/customer/export?"+ dataString)
    },
  }
};
</script>

