<template>
  <div class="vote-record">
    <search-form
      :formOptions="formOptions"
      :showNum="7"
      ref="searchForm"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd"
          >添加</el-button
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
          ></el-image>
        </template>
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <!-- <el-divider direction="vertical"></el-divider>
          <el-button
            @click="handleDelete(scope.row)"
            type="text"
            size="small"
            style="color: #ec5b56"
            >删除</el-button
          > -->
        </template>
      </rd-table>
    </div>

    <!-- 添加 -->
    <rd-dialog
      :title="addStatus ? '添加' : '编辑'"
      :dialogVisible="addVisible"
      @handleClose="addVisible = false"
      @submitForm="submitAddForm('dataForm3')"
    >
      <RdForm
        :formOptions="addFormOptions"
        formLabelWidth="120px"
        :rules="addRules"
        ref="dataForm3"
      >
        <template slot="post">
          <el-button size="small" type="primary">上传</el-button>
        </template>
      </RdForm>
    </rd-dialog>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
export default {
  name: "vote-record",
  data() {
    return {
      formOptions: [
        {
          prop: "wxName",
          element: "el-input",
          placeholder: "微信昵称",
        },
        {
          prop: "phone",
          element: "el-input",
          placeholder: "手机",
        },
        {
          prop: "activityId",
          element: "el-select",
          placeholder: "活动名称",
          options: [],
        },
        {
          prop: "productId",
          element: "el-select",
          placeholder: "项目类型",
          options: [],
        },
        {
          prop: "certificateId",
          element: "el-select",
          placeholder: "参赛选手",
          options: [],
        },
        {
          prop: "wxId",
          element: "el-select",
          placeholder: "微信用户",
          options: [],
        },
        {
          prop: "voteType",
          element: "el-select",
          placeholder: "投票类型",
          options: [],
        },
        {
          prop: "status",
          element: "el-select",
          placeholder: "投票状态",
          options: [],
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
          name: "ID主键",
          value: "id",
          fixed: "left",
          width: 80,
        },
        {
          name: "头像",
          value: "picUrl",
          operate: true
        },
        {
          name: "昵称",
          value: "wxName",
        },
        {
          name: "手机",
          value: "phone",
        },
        {
          name: "本次投票",
          value: "votes",
          width: 60
        },
        {
          name: "活动名称",
          value: "activityName",
        },
        {
          name: "项目类型",
          value: "productName",
        },
        {
          name: "参赛者姓名",
          value: "certificateName",
        },
        {
          name: "地理位置",
          value: "location",
        },
        {
          name: "投票类型",
          value: "voteType",
        },
        {
          name: "投票状态",
          value: "status",
        },
        {
          name: "投票时间",
          value: "createAt",
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 90,
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
          prop: "wxId",
          element: "el-select",
          placeholder: "请选择",
          label: "微信用户",
          options: [],
        },
        {
          prop: "certificateId",
          element: "el-select",
          placeholder: "请选择",
          label: "参赛选手",
          options: [],
        },
        {
          prop: "votes",
          element: "el-input",
          placeholder: "请输入",
          label: "本次投票数",
        },
        {
          prop: "voteType",
          element: "el-select",
          placeholder: "请选择",
          label: "投票类型",
          options: [],
        },
        {
          prop: "status",
          element: "el-select",
          placeholder: "请选择",
          label: "投票状态",
          options: [],
        },
      ],
      activityIdList: [],
      certificateList: [],
      productList: [],
      statusList: [],
      voteTypeList: [],
      wechatList: [],
      addStatus: true,
      addRules: {},
      editId: null
    };
  },
  components: {
    RdForm,
  },
  mounted() {
    this.getTableData();
    this.getSelectList();
    
  },
  watch: {
    "$route.params.certificateId"(newVal){
       this.addCertificateVal();
    }
  },
  methods: {
    addCertificateVal(){
      this.formOptions[4].initValue = this.$route.params.certificateId;
      this.$refs.searchForm.addInitValue();
      this.onSearch({
        certificateId: this.$route.params.certificateId
      })
    },
    onSearch(val) {
      this.searchForm = {
        ...val,
      };
      console.log(val, this.searchForm, "val---");
      this.getTableData();
    },
    getTableData(params = {}) {
      this.$fetch("cmscertificatevotes_list", {
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
        // this.getSelectList(res.data);
      });
    },
    async getSelectList(data) {
      // const { activityIdList, certificateList, productList, statusList, voteTypeList, wechatList} = data;
      const result = await Promise.all(
        [
          this.$fetch("cmscertificatevotes_getActivityInfo"),
          this.$fetch("cmscertificatevotes_getCertificate"),
          this.$fetch("cmscertificatevotes_getProductList"),
          this.$fetch("cmscertificatevotes_getStatusList"),
          this.$fetch("cmscertificatevotes_getVoteTypeList"),
          this.$fetch("cmscertificatevotes_getWechat"),
        ].map((p) => {
          return p.catch((error) => error);
        })
      );
      this.activityIdList = result[0].data.map((item) => ({
        label: item.activityName,
        value: item.id,
      }));
      this.certificateList = result[1].data.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      this.productList = result[2].data.map((item) => ({
        label: item.productName,
        value: item.id,
      }));
      this.statusList = result[3].data.map((item) => ({
        label: item.value,
        value: item.key,
      }));
      this.voteTypeList = result[4].data.map((item) => ({
        label: item.value,
        value: item.key,
      }));
      this.wechatList = result[5].data.map((item) => ({
        label: item.nickName,
        value: item.id,
      }));
      this.formOptions[2].options = this.activityIdList;
      this.formOptions[3].options = this.productList;
      this.formOptions[4].options = this.certificateList;
      this.formOptions[5].options = this.wechatList;
      this.formOptions[6].options = this.voteTypeList;
      this.formOptions[7].options = this.statusList;
      if(this.$route.params.certificateId){
        this.addCertificateVal();
      }

      this.addFormOptions[0].options = this.wechatList;
      this.addFormOptions[1].options = this.certificateList;
      this.addFormOptions[3].options = this.voteTypeList;
      this.addFormOptions[4].options = this.statusList;
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
      this.addFormOptions[0].disabled = false;
      this.addFormOptions[1].disabled = false;
      this.addFormOptions[2].disabled = false;
      this.$refs.dataForm3 && this.$refs.dataForm3.onReset();
      this.addFormOptions = JSON.parse(JSON.stringify(this.addFormOptions));
    },
    submitAddForm(formName) {
      this.$refs[formName].validate((valid, formData) => {
        if (valid) {
          console.log(formData, "提交");
            let certificateName = this.certificateList.find(
              (item) => item.value == formData.certificateId
            ).label;
            let wxName = this.wechatList.find(
              (item) => item.value == formData.wxId
            ).label;
            this.$fetch(this.addStatus?"cmscertificatevotes_add":"cmscertificatevotes_edit", {
              ...formData,
              certificateName,
              wxName,
              id:this.addStatus?"": this.editId
            }).then((res) => {
              this.$message.success("操作成功");
              this.getTableData();
              this.addVisible = false;
            });
        }
      });
    },
    handleEdit(data) {
      this.addStatus = false;
      this.addVisible = true;
      this.editId = data.id;
      this.$fetch("cmscertificatevotes_goEdit", {
        id: data.id,
      }).then((res) => {
        this.addFormOptions.forEach((item) => {
          item.initValue = res.data.pd[item.prop];
        });
        this.addFormOptions[0].disabled = true;
        this.addFormOptions[1].disabled = true;
        this.addFormOptions[2].disabled = true;
        console.log(this.addFormOptions, "111");
        this.$refs.dataForm3.addInitValue();
      });
    },
    handleDelete(row) {
      let info = "";
      this.$confirm(`此操作将删除此${info}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$fetch("projectType_delete", {
            typeId: row.typeId,
            loginUserId,
          }).then((res) => {
            if (res) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              setTimeout(() => {
                this.getTableData();
              }, 50);
            }
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.vote-record {
}
</style>
