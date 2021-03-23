<template>
  <div class="activity-manage">
    <search-form :formOptions="formOptions" @onSearch="onSearch"></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="addVisible = true"
          >添加</el-button
        >
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig.sync="pageConfig"
        fixedTwoRow
        @pageChange="pageChange"
      >
        <template slot="startTime" slot-scope="scope">
          开始时间：{{scope.row.startTime}}
          结束时间：{{scope.row.endTime}}
        </template>
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click="handleLink(scope.row)"
            type="text"
            size="small"
            style="color: #ffa500"
            >生成链接</el-button
          >
        </template>
      </rd-table>

      <!-- 添加活动 -->
      <fullDialog
        v-model="addVisible"
        title="添加活动"
        @change="addVisible = false"
      >
        <AddAct
          ref="AddAct"
          @close="addVisible = false"
          @refresh="refresh"
          v-if="addVisible"
        />
      </fullDialog>

      <!-- 编辑活动 -->
      <fullDialog
        v-model="editVisible"
        title="编辑活动"
        @change="editVisible = false"
      >
        <EditAct
          ref="EditAct"
          @close="editVisible = false"
          @refresh="refresh2"
          v-if="editVisible"
        />
      </fullDialog>

      <!-- 活动链接 -->
      <rd-dialog
        :title="'活动邀请链接'"
        :dialogVisible="linkVisible"
        @handleClose="linkVisible = false"
        :showFooter="false"
        width="1200px"
      >
        <rd-table
          :tableData="tableLinkData"
          :tableKey="tableLinkKey"
          fixedTwoRow
          :emptyText="emptyLinkText"
        >
        <template slot="link" slot-scope="scope">
          <el-input
            v-model="scope.row.link"
            id="link"
            ref="link"
            style="width: 380px"
            :readonly="true"
            :title="scope.row.link"
          >
          </el-input>
        </template>
        <template slot="edit">
          <el-button 
          class="teacher-btn" 
          @click="copyLink('.teacher-btn')" 
          type="text" size="small"
           data-clipboard-action="copy"
          data-clipboard-target="#link"
            >复制长链接</el-button
          >
        </template>
      </rd-table>
      </rd-dialog>
    </div>
  </div>
</template>

<script>
import fullDialog from "@/components/FullDialog";
import RdForm from "@/components/RdForm";
import AddAct from "./addAct.vue";
import EditAct from "./editAct.vue";
import Clipboard from "clipboard";
export default {
  name: "activity-manage",
  data() {
    return {
      formOptions: [
        {
          prop: "activityName",
          element: "el-input",
          placeholder: "活动名称",
        },
        {
          prop: "appName",
          element: "el-input",
          placeholder: "公众号名称",
        },
        {
          prop: "hideStatus",
          element: "el-select",
          placeholder: "是否隐藏",
          options: [
            {
              label:"不隐藏",
              value:"0"
            },
            {
              label:"隐藏",
              value:"1"
            },
          ]
        },
        {
          prop: "status",
          element: "el-select",
          placeholder: "活动状态",
          options:[]
        },
        {
          prop: "productType",
          element: "el-select",
          placeholder: "项目类型",
          options: []
        },
      ],
      tableData: [
        
      ],
      tableKey: [
        {
          name: "ID",
          value: "id",
        },
        {
          name: "项目类型",
          value: "productType",
        },
        {
          name: "活动名称",
          value: "activityName",
        },
        {
          name: "公众号名称",
          value: "appName",
        },
        {
          name: "邀请码类型",
          value: "invitationType",
        },
        {
          name: "活动时间",
          value: "startTime",
          operate: true
        },
        {
          name: "是否强制关注",
          value: "attentionStatus",
        },
        {
          name: "是否强制分享",
          value: "shareStatus",
        },
        {
          name: "活动是否隐藏",
          value: "hideStatus",
        },
        {
          name: "活动状态",
          value: "status",
        },
        {
          name: "活动描述",
          value: "activityDesc",
          showTooltip: true
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 140,
        },
      ],
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },
      addVisible: false,
      editVisible: false,
      linkVisible: false,
      tableLinkData:[
         {
          id: 1,
          name: "飞翔的荷兰人3",
          cutdown: 1608897351706,
          visit: 2,
          phone: "15692026183",
          link:"http://wx.kaoyaoshi.cn/yaoshi/2019/MyRoad/HomePage.html?activityId=119&id=3182880"
        },
      ],
      tableLinkKey:[
         {
          name: "活动名称",
          value: "name",
        },
        {
          name: "老师名称",
          value: "phone",
        },
        {
          name: "老师邀请码",
          value: "cutdown",
        },
        {
          name: "活动链接",
          value: "link",
          width: 400,
          operate: true
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 120
        },
      ],
      emptyLinkText:"暂无数据"
    };
  },
  components: {
    fullDialog,
    RdForm,
    AddAct,
    EditAct
  },
  mounted(){
    this.getTableData();
  },
  methods: {
    onSearch(val){
       this.searchForm = {
        ...val
      };
      console.log(val,this.searchForm , 'val---')
      this.getTableData();
     },
    handleAdd() {},
    pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    refresh(){

    },
    refresh2(){

    },
    getTableData(params = {}){
       this.$fetch("cmsactivityinfo_listJsp", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        this.tableData = res.data.varList.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          item.startTime = this.$common._formatDates(item.startTime);
          item.endTime = this.$common._formatDates(item.endTime);
          item.hideStatus = item.hideStatus?"隐藏":"不隐藏";
          item.shareStatus = item.shareStatus?"是":"否";
          item.attentionStatus = item.attentionStatus?"是":"否";
          this.formOptions[3].options = res.data.activityStatusList.map(item => ({
            label: item.value,
            value: item.key
          }));
          this.formOptions[4].options = res.data.ProductTypeList.map(item => ({
            label: item.value,
            value: item.key
          }));
          return item;
        });;
        this.pageConfig.totalCount = res.data.page.totalResult;
      })
     },
    handleLink(data){
      this.linkVisible = true;
    },
    copyLink(btnName) {
      let clipboard = new Clipboard(btnName);
      clipboard.on("success", (e) => {
        this.$message.success("复制成功");
        clipboard.destroy(); // 使用destroy可以清楚缓存
      });
      clipboard.on("error", (e) => {
        this.$message.error("该浏览器不支持自动复制");
        clipboard.destroy();
      });
    },
    handleEdit(){
      this.editVisible = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.activity-manage {
}
</style>
