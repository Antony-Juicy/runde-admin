<template>
  <div class="vote-management">
    <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd"
          >添加</el-button
        >
        <el-button type="info" size="small" @click="handleDownLoad">导出</el-button>
        <el-button type="danger" size="small" @click="handleChange('Stop')"
          >全部暂停</el-button
        >
        <el-button type="success" size="small" @click="handleChange('Normal')"
          >全部恢复</el-button
        >
        <el-button type="warning" size="small" @click="handleExportPic"
          >导出作品图片</el-button
        >
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig.sync="pageConfig"
        @pageChange="pageChange"
        :emptyText="emptyText"
      >
        <template slot="picUrl" slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.picUrl"
            fit="cover"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </template>

        <template slot="voteInfo" slot-scope="scope">
          <p class="vote-info">
            当前排名：<el-button
              size="mini"
              type="danger"
              @click="gotoInfo(scope.row)"
              >{{ scope.row.ranking }}</el-button
            >
          </p>
          <p class="vote-info">
            总投票数：<el-button
              size="mini"
              type="primary"
              @click="gotoInfo(scope.row)"
              >{{ scope.row.totalVotes }}</el-button
            >
          </p>
          <p class="vote-info">
            实际票数：<el-button
              size="mini"
              type="success"
              @click="gotoInfo(scope.row)"
              >{{ scope.row.actualVotes }}</el-button
            >
          </p>
          <p class="vote-info">
            增加票数：<el-button
              size="mini"
              type="warning"
              @click="gotoInfo(scope.row)"
              >{{ scope.row.addedVotes }}</el-button
            >
          </p>
        </template>

        <template slot="autoVote" slot-scope="scope">
          <p class="vote-info">
            自动投票：<el-button size="mini" type="success">{{
              scope.row.autoVote
            }}</el-button>
          </p>
          <p class="vote-info">
            应用展示：<el-button size="mini" type="warning">{{
              scope.row.showInfo
            }}</el-button>
          </p>
          <p class="vote-info">
            基&nbsp;&nbsp;础&nbsp;&nbsp;数：<el-button
              size="mini"
              type="primary"
              >{{ scope.row.basicNum }}</el-button
            >
          </p>
          <p class="vote-info">
            分&nbsp;&nbsp;钟&nbsp;&nbsp;数：<el-button
              size="mini"
              type="danger"
              >{{ scope.row.minutesNum }}</el-button
            >
          </p>
          <p class="vote-info">
            增加范围：<el-button size="mini" type="success" v-if="scope.row.addScope">{{
              scope.row.addScope
            }}</el-button>
          </p>
          <p class="vote-info">
            开始时间：<el-button size="mini" type="primary" v-if="scope.row.startTime">{{
              scope.row.startTime
            }}</el-button>
          </p>
          <p class="vote-info">
            结束时间：<el-button size="mini" type="primary" v-if="scope.row.endTime">{{
              scope.row.endTime
            }}</el-button>
          </p>
        </template>

        <template slot="status" slot-scope="scope">
          <el-button
            size="mini"
            :type="scope.row.status == '正常' ? 'success' : 'danger'"
            @click="changeStatus(scope.row)"
            >{{ scope.row.status }}</el-button
          >
        </template>

        <template slot="operatorName" slot-scope="scope">
          操作人ID:{{ scope.row.operatorId }}<br />
          操作人名:{{ scope.row.operatorName }}
        </template>

        <template slot="edit" slot-scope="scope">
          <el-button
            @click="handleEdit(scope.row)"
            type="text"
            size="small"
            style="color: #67c23a"
            >编辑</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button @click="downPic(scope.row)" type="text" size="small"
            >下载</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click="handleDetail(scope.row)"
            type="text"
            size="small"
            style="color: #ffa500"
            >换模板</el-button
          >
        </template>
      </rd-table>
    </div>

    <!-- 添加/编辑 -->
    <fullDialog v-model="addVisible" :title="addStatus?'添加':'编辑'" @change="addVisible = false">
      <AddVote
        ref="AddAct"
        :editDetail="editDetail"
        @close="addVisible = false"
        @refresh="refresh"
        v-if="addVisible"
      />
    </fullDialog>

    <!-- 导出 -->
    <rd-dialog
        :title="'选择导出的列'"
        submitText="导出"
        :dialogVisible="downLoadVisible"
        @handleClose="downLoadVisible = false"
        @submitForm="submitExportForm('dataForm3')"
      >
         <el-transfer v-model="exportValue" :data="data"></el-transfer>
      </rd-dialog>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import fullDialog from "@/components/FullDialog";
import AddVote from "./AddVote";
 
export default {
  name: "vote-management",
  data() {
    return {
      formOptions: [
        {
          prop: "activityId",
          element: "el-select",
          placeholder: "活动名称",
          options: []
        },
        {
          prop: "productName",
          element: "el-select",
          placeholder: "项目类型",
           options: []
        },
        {
          prop: "wxId",
          element: "el-select",
          placeholder: "微信用户",
           options: []
        },
        {
          prop: "status",
          element: "el-select",
          placeholder: "作品状态",
          options: [
            {
              label: "正常",
              value: "Normal",
            },
            {
              label: "停止",
              value: "Stop",
            },
          ],
        },
        {
          prop: "autoVote",
          element: "el-select",
          placeholder: "自动投票",
          options: [
            {
              label: "是",
              value: "YES",
            },
            {
              label: "否",
              value: "NO",
            },
          ],
        },
        {
          prop: "orderStr",
          element: "el-select",
          placeholder: "排序字段",
          options: [
            {
              label: "ID",
              value: "id",
            },
            {
              label: "用户排名",
              value: "ranking",
            },
            {
              label: "总投票数",
              value: "total_votes",
            },
            {
              label: "实际票数",
              value: "actual_votes",
            },
            {
              label: "增加票数",
              value: "added_votes",
            },
            {
              label: "参赛时间",
              value: "create_at",
            },
          ],
        },
        {
          prop: "orderMethod",
          element: "el-select",
          placeholder: "排序方式",
          options: [
            {
              label: "升序",
              value: "asc",
            },
            {
              label: "降序",
              value: "desc",
            },
          ],
        },
        {
          prop: "createAt",
          element: "el-date-picker",
          startPlaceholder: "参赛时间(开始)",
          endPlaceholder: "参赛时间(结束)",
          initWidth: true,
        },
      ],
      searchForm: {},
      emptyText: "暂无数据",
      tableData: [
        //  {
        //   id: 1,
        //   name: "飞翔的荷兰人3",
        //   cutdown: 1608897351706,
        //   visit: 2,
        //   phone: "15692026183",
        // },
      ],
      tableKey: [
        {
          name: "ID",
          value: "id",
          fixed: "left",
          width: 60,
        },
        {
          name: "作品",
          value: "picUrl",
          operate: true,
        },
        {
          name: "姓名",
          value: "name",
          width: 80,
        },
        {
          name: "昵称",
          value: "wxName",
          width: 80,
        },
        {
          name: "手机",
          value: "phone",
        },
        {
          name: "活动名称",
          value: "activityName",
        },
        {
          name: "项目类型",
          value: "productName",
          width: 50,
        },
        {
          name: "投票信息",
          value: "voteInfo",
          operate: true,
        },
        {
          name: "自动投票",
          value: "autoVote",
          operate: true,
        },
        {
          name: "状态",
          value: "status",
          operate: true,
        },
        {
          name: "描述",
          value: "content",
        },
        {
          name: "参赛时间",
          value: "createAt",
        },
        {
          name: "操作人",
          value: "operatorName",
          operate: true,
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 170,
          fixed: "right",
        },
      ],
      pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },
      addVisible: false,
      addFormOptions: [
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "请输入海报名称",
          label: "海报名称",
        },
        {
          prop: "post",
          element: "el-input",
          placeholder: "",
          label: "上传海报",
          operate: true,
          initValue: 0,
        },
        {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择",
          label: "所属九块九包邮",
          options: [
            {
              label: "博士",
              value: "0",
            },
            {
              label: "硕士",
              value: 1,
            },
          ],
        },
        {
          prop: "roleName",
          element: "el-select",
          placeholder: "请选择",
          label: "所属活动",
          options: [
            {
              label: "博士",
              value: "0",
            },
            {
              label: "硕士",
              value: 1,
            },
          ],
        },
        {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "分享分案一",
          type: "textarea",
          rows: 2,
        },
        {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "分享分案二",
          type: "textarea",
          rows: 2,
        },
        {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "分享分案三",
          type: "textarea",
          rows: 2,
        },
        {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "分享分案四",
          type: "textarea",
          rows: 2,
        },
        {
          prop: "menuName3",
          element: "el-input",
          placeholder: "请输入",
          label: "分享分案五",
          type: "textarea",
          rows: 2,
        },
      ],
      addRules: {
        updateReason: [
          { required: true, message: "请输入修改事由", trigger: "blur" },
        ],
      },
      addStatus: true,
      editDetail: {},
      downLoadVisible: false,
      exportValue: [],
      data: [
      ],
      columnData:[]
    };
  },
  components: {
    RdForm,
    fullDialog,
    AddVote,
  },
  mounted() {
    this.getTableData();
    this.getSelectList();
  },
  methods: {
    onSearch(val) {
      this.searchForm = {
        ...val,
        createAt: val.createAt?val.createAt.join(' ~ '):""
      };
      console.log(val, this.searchForm, "val---");
      this.getTableData();
    },
    getTableData(params = {}) {
      this.$fetch("cmscertificateinfo_list", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        this.tableData = res.data.varList.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.picUrl = this.$common.setThumbnail(item.picUrl);
          item.startTime = this.$common._formatDates(item.startTime);
          item.endTime = this.$common._formatDates(item.endTime);
          return item;
        });
        this.pageConfig.totalCount = res.data.page.totalResult;
      });
    },
    pageChange(val) {
      console.log(val, "pagechange");
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    handleAdd() {
      this.addStatus = true;
      this.addVisible = true;
    },
    submitAddForm(formName) {
      this.$refs[formName].validate((valid, formData) => {
        if (valid) {
          console.log(formData, "提交");
        }
      });
    },
    handleEdit(data) {
      this.addStatus = false;
      this.addVisible = true;
       this.$fetch("cmscertificateinfo_goEdit",{
            id: data.id
        }).then(res => {
            // console.log(res,'res---')
            this.editDetail = res.data;
        })
    },
    handleChange(status) {
      this.$confirm(`确认执行该操作吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$fetch("cmscertificateinfo_batchChange", {
            statusValue: status
          }).then((res) => {
            if (res) {
              this.$message({
                message: "操作成功",
                type: "success",
              });
              setTimeout(() => {
                this.refresh();
              }, 50);
            }
          });
        })
        .catch(() => {});
    },
    refresh() {
      this.pageConfig.showCount = 10;
      this.pageConfig.currentPage = 1;
      this.getTableData({
        showCount: 10,
        currentPage: 1
      })
    },
    gotoInfo(data) {
      this.$router.push({
        name: '/activity-module/project/pharmacist/certificate-vote/vote-record'  + '?' + sessionStorage.getItem("router-timeStamp"),
        params: {
          certificateId: data.wxId
        } 
      })
    },
    changeStatus(data) {
      console.log(data,'changestatus')
      this.$fetch("cmscertificateinfo_editStatus",{
        statusValue: data.status_text=="Normal"?"Stop":"Normal",
        id: data.id
      }).then(res => {
        this.$message.success("操作成功")
        this.refresh();
      })
    },
    getSelectList() {
      Promise.all([
        this.$fetch("cmscertificateinfo_getActivityList"),
        this.$fetch("cmscertificateinfo_getProductList"),
        this.$fetch("cmscertificateinfo_wchatList"),
      ].map((p) => {
        return p.catch((error) => error);
      })).then(result => {
        let activityArr = result[0].data.map(item => ({
          label: item.activityName,
          value: item.id
        }))
        let productArr = result[1].data.map(item => ({
          label: item.productName,
          value: item.id
        }))
        let wechatArr = result[2].data.list.map(item => ({
          label: item.nickName,
          value: item.id
        }))
        this.formOptions[0].options = activityArr;
        this.formOptions[1].options = productArr;
        this.formOptions[2].options = wechatArr;
        console.log(this.formOptions,'formoptions')
      })
    },
    handleDownLoad(){
      this.exportValue = [];
      this.downLoadVisible = true;
      this.$fetch("cmscertificateinfo_getAllColumnNamesCertificateInfo").then(res => {
        this.columnData = res.data.columnData;
        this.data = res.data.columnData.map(item => ({
          key: item.columnNames,
          label: item.columnValues
        }))
      })
    },
    submitExportForm(){
      console.log(this.exportValue,'exportValue')
      let arr = [];
      this.exportValue.forEach((item,index) => {
        let obj = this.data.find(ele => (ele.key == item));
        if(obj){
          arr.push(obj)
        }
      })
      let newArr = [];
      arr.forEach(item => {
        newArr.push(item.label)
        newArr.push(item.key)
      })
      console.log(newArr,'newArr--')
      this.$fetch("cmscertificateinfo_export",{
        ...this.searchForm,
        columnName: newArr.join(",")
      }).then(res => {
        this.$message.success("操作成功")
        this.downLoadVisible = false;
      })
    },
    handleExportPic(){
      this.$fetch("cmscertificateinfo_toExcelPic")
    },
    downPic(data){
      if(!data.picUrl){
        this.$message.error("该作品没有图片")
        return;
      }
      // window.location.href = data.picUrl;
      window.open(data.picUrl);
    }
  },
};
</script>

<style lang="scss" scoped>
.vote-management {
  .vote-info {
    margin-top: 1px;
    margin-bottom: 1px;
    &:first-child {
      margin-top: 5px;
    }
    &:last-child {
      margin-bottom: 5px;
    }
  }
  /deep/ {
    .el-table {
      .el-button--mini {
        padding: 5px;
      }
      .image-slot {
            display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          background-color: #eee;
          width: 100px;
          height: 100px;
          color: #8492a6;
      }
    }
  }
}
</style>
