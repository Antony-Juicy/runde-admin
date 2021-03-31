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
       <div class="add-act">
          <RdForm
            :formOptions="addFormOptions"
            :inline="true"
            :rules="addRules"
            ref="dataForm3"
          >
            <template slot="param">
              <el-button type="primary" size="small" @click="addDomain"
                >点击添加参数</el-button
              >
            </template>
          </RdForm>
          <el-form
            :model="dynamicValidateForm"
            ref="dynamicValidateForm"
            label-width="100px"
            class="demo-dynamic"
            inline
          >
            <template v-for="(domain, index) in dynamicValidateForm.domains">
              <el-form-item
                :label="'参数名称' + index"
                :key="domain.key"
                :prop="'domains.' + index + '.paramName'"
                :rules="{
                  required: true,
                  message: '参数名称不能为空',
                  trigger: 'blur',
                }"
              >
                <el-input v-model="domain.paramName" size="small" style="width: 300px"></el-input>
              </el-form-item>
              <el-form-item
                :label="'参数值' + index"
                :key="domain.key + '2'"
                :prop="'domains.' + index + '.paramVal'"
                :rules="{
                  required: true,
                  message: '参数值不能为空',
                  trigger: 'blur',
                }"
              >
                <el-input v-model="domain.paramVal" size="small" style="width: 300px"></el-input>
              </el-form-item>
              <el-button :key="domain.key + '3'" @click.prevent="removeDomain(domain)" 
              type="danger" size="small" style="margin-top:5px"
                >删除</el-button
              >
            </template>
          </el-form>
          <div class="btn-wrapper">
            <el-button
              type="primary"
              size="small"
              :loading="btnLoading"
              @click="handleAdd"
              v-prevent-re-click="2000"
              >保存</el-button
            >
            <el-button size="small" @click="handleClose('dataForm3')">取消</el-button>
          </div>
        </div>
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
        <template slot="invitation" slot-scope="scope">
          <el-input
            v-model="scope.row.invitation"
            id="link"
            ref="link"
            style="width: 100%"
            :readonly="true"
            :title="scope.row.invitation"
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
          width: 60
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
          operate: true,
          width: 206
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
        //  {
        //   id: 1,
        //   name: "飞翔的荷兰人3",
        //   cutdown: 1608897351706,
        //   visit: 2,
        //   phone: "15692026183",
        //   link:"http://wx.kaoyaoshi.cn/yaoshi/2019/MyRoad/HomePage.html?activityId=119&id=3182880"
        // },
      ],
      tableLinkKey:[
         {
          name: "活动名称",
          value: "activityName",
          width: 180
        },
        {
          name: "老师名称",
          value: "staffName",
          width: 120
        },
        {
          name: "老师邀请码",
          value: "staffInvitation",
          width: 120
        },
        {
          name: "活动链接",
          value: "invitation",
          operate: true
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 120
        },
      ],
      emptyLinkText:"暂无数据",

       addFormOptions: [
        {
          prop: "activityName",
          element: "el-input",
          placeholder: "请输入活动名称",
          label: "活动名称",
        },
        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "活动时间(开始)",
          endPlaceholder: "活动时间(结束)",
          initWidth: true,
          label: "活动时间",
          //   clearable: false
        },
        {
          prop: "fieldOne",
          element: "el-input",
          placeholder: "请输入字段一名称",
          label: "字段一名称",
        },
        {
          prop: "fieldTwo",
          element: "el-input",
          placeholder: "请输入字段二名称",
          label: "字段二名称",
        },
        {
          prop: "appId",
          element: "el-select",
          placeholder: "微信公众号",
          label: "微信公众号",
          options: [
          ],
        },
        {
          prop: "invitationType",
          element: "el-select",
          placeholder: "邀请码类型",
          label: "邀请码类型",
          options: [
          ],
        },
        {
          prop: "status",
          element: "el-select",
          placeholder: "请选择",
          label: "活动状态",
          options: [
          ],
        },
        {
          prop: "productType",
          element: "el-select",
          placeholder: "请选择",
          label: "项目类型",
          options: [
          ],
        },
        {
          prop: "attentionStatus",
          element: "el-select",
          placeholder: "请选择",
          label: "是否强制关注",
          options: [
            {
              label: "不强制关注",
              value: 0
            },
            {
              label: "强制关注",
              value: 1
            },
          ],
        },
        {
          prop: "shareStatus",
          element: "el-select",
          placeholder: "请选择",
          label: "是否强制分享",
          options: [
            {
              label: "不强制分享",
              value: 0
            },
            {
              label: "强制分享",
              value: 1
            },
          ],
        },
        {
          prop: "hideStatus",
          element: "el-select",
          placeholder: "请选择",
          label: "是否隐藏",
          options: [
             {
              label: "不隐藏",
              value: 0
            },
            {
              label: "隐藏",
              value: 1
            },
          ],
        },
        {
          prop: "activityDesc",
          element: "el-input",
          placeholder: "请输入",
          label: "活动描述",
          type: "textarea",
          rows: 3,
        },
        {
          prop: "param",
          element: "el-input",
          placeholder: "请选择",
          label: "参数",
          operate: true,
        },
      ],
      addRules: {
        activityName: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        fieldOne: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        fieldTwo: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
      },
      btnLoading: false,
      dynamicValidateForm: {
        domains: [
          // {
          //   paramName: "",
          //   paramVal: "",
          // },
        ],
      },
    };
  },
  components: {
    fullDialog,
    RdForm,
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
          
          return item;
        });;
        this.pageConfig.totalCount = res.data.page.totalResult;
        this.formOptions[3].options = res.data.activityStatusList.map(item => ({
            label: item.value,
            value: item.key
          }));
          this.formOptions[4].options = res.data.ProductTypeList.map(item => ({
            label: item.value,
            value: item.key
          }));
          this.addFormOptions[4].options = res.data.weChatList.map(item => ({
            label: item.appName,
            value: item.appId
          }))
          this.addFormOptions[5].options = res.data.invitationTypeList.map(item => ({
            label: item.value,
            value: item.key
          }))
          this.addFormOptions[6].options = res.data.activityStatusList.map(item => ({
            label: item.value,
            value: item.key
          }))
          this.addFormOptions[7].options = res.data.ProductTypeList.map(item => ({
            label: item.value,
            value: item.key
          }))
      })
     },
    handleLink(data){
      this.linkVisible = true;
      this.$fetch("cmsactivityinfo_selectInvitation",{
        activityId: data.id
      }).then(res => {
        this.tableLinkData = res.data.varList;
      })
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
    },

    handleClose(formName) {
      this.$refs[formName].resetFields();
      this.$emit("close");
    },
    handleAdd() {
      this.$refs.dataForm3.validate((val, data) => {
        if (val) {
          console.log(data, "data");
          this.$refs.dynamicValidateForm.validate((valid) => {
            if (valid) {
              console.log(this.dynamicValidateForm,'99')
              // this.$fetch("cmsactivityinfo_save")
            } else {
              console.log("error submit!!");
              return false;
            }
          });
        }
      });
    },

    // 动态添加
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.dynamicValidateForm,'99')
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        paramName: "",
        paramVal: "",
        key: Date.now(),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.activity-manage {
  .add-act {
    max-width: 1235px;
    .btn-wrapper {
      margin-left: 760px;
      margin-top: 50px;
    }
  }
}
</style>
