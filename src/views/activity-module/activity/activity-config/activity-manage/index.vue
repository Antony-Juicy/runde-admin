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
          prop: "menuName",
          element: "el-input",
          placeholder: "活动名称",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "公众号名称",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "是否隐藏",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "活动状态",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "项目类型",
        },
      ],
      tableData: [
        {
          id: 1,
          name: "飞翔的荷兰人3",
          cutdown: 1608897351706,
          visit: 2,
          phone: "15692026183",
        },
        {
          id: 2,
          name: "飞翔的荷兰人2",
          cutdown: new Date().getTime(),
          phone: "17092026183",
        },
        { id: 3, name: "飞翔的荷兰人1", phone: "18892026183" },
      ],
      tableKey: [
        {
          name: "ID",
          value: "name",
        },
        {
          name: "项目类型",
          value: "phone",
        },
        {
          name: "活动名称",
          value: "cutdown",
        },
        {
          name: "公众号名称",
          value: "menuUrl",
        },
        {
          name: "邀请码类型",
          value: "visit",
        },
        {
          name: "活动时间",
          value: "menuOrder",
        },
        {
          name: "是否强制关注",
          value: "description1",
        },
        {
          name: "是否强制分享",
          value: "description2",
        },
        {
          name: "活动是否隐藏",
          value: "description3",
        },
        {
          name: "活动状态",
          value: "description4",
        },
        {
          name: "活动描述",
          value: "description4",
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
  methods: {
    onSearch() {},
    handleAdd() {},
    pageChange(val) {
      // this.pageConfig.currentPage = val.page;
      // this.pageConfig.showCount = val.limit;
      // console.log(this.searchForm,'this.searchForm--')
      // this.getTableData({
      //   currentPage: (val && val.page) || 1,
      //   showCount: (val && val.limit) || 10,
      //   loginUserId,
      //   ...this.searchForm,
      //   parentId: this.parentId
      // });
    },
    refresh(){

    },
    refresh2(){

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
