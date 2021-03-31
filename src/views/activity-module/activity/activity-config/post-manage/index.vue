<template>
  <div class="post-manage">
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
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig.sync="pageConfig"
        fixedTwoRow
        @pageChange="pageChange"
        :emptyText="emptyText"
      >
        <template slot="posterPic" slot-scope="scope">
          <el-image 
          style="width: 100px; height: 100px"
            :src="scope.row.posterPic"
            fit="cover"></el-image>
        </template>
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >查阅/编辑</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click="handleDelete(scope.row)"
            type="text"
            size="small"
            style="color: #ec5b56"
            >删除</el-button
          >
        </template>
      </rd-table>
    </div>
    
    <!-- 添加海报 -->
    <rd-dialog
        :title="addStatus?'添加海报':'编辑海报'"
        :dialogVisible="addVisible"
        @handleClose="handleClose"
        @submitForm="submitAddForm('dataForm3')"
      >
        <RdForm :formOptions="addFormOptions" formLabelWidth="120px" :rules="addRules" ref="dataForm3">
          <template slot="posterPic">
            <Upload-oss
              :objConfig="{module: 'activity', project: 'icon_'}"
              :src.sync="posterPic"
              />
          </template>
          <template slot="part">
            <el-radio-group v-model="part" @change="partChange">
              <el-radio :label="1">九块九包邮</el-radio>
              <el-radio :label="2">活动</el-radio>
            </el-radio-group>
          </template>
        </RdForm>
      </rd-dialog>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import uploadFile from "@/components/Activity/uploadFile";
import UploadOss from "@/components/UploadOss";
export default {
  name:"post-manage",
  data(){
    return {
      part: "",
      postPic:"",
      formOptions: [
        {
          prop: "goodsName",
          element: "el-input",
          placeholder: "商品名称",
        },
        {
          prop: "activityName",
          element: "el-input",
          placeholder: "活动名称",
        },
        {
          prop: "posterName",
          element: "el-input",
          placeholder: "海报名称",
        }
      ],
      searchForm:{},
      emptyText:"暂无数据",
      tableData:[
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
          width: 80
        },
        {
          name: "老师名称",
          value: "staffName",
        },
        {
          name: "商品名称",
          value: "goodsName",
        },
        {
          name: "活动名称",
          value: "activityName",
        },
        {
          name: "海报名称",
          value: "posterName",
        },
        {
          name: "海报图片",
          value: "posterPic",
          operate:true
        },
        {
          name: "分享文案一",
          value: "posterCopyFirst",
        },
        {
          name: "分享文案二",
          value: "posterCopySecond",
        },
        {
          name: "分享文案三",
          value: "posterCopyThird",
        },
        {
          name: "分享文案四",
          value: "posterCopyFourth",
        },
        {
          name: "分享文案五",
          value: "posterCopyFifth",
        },
        {
          name: "创建时间",
          value: "createAt",
        },
        {
          name: "修改时间",
          value: "updateAt",
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 140,
          fixed: "right"
        },
      ],
      posterPic:"",
       pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },
      addVisible: false,
      addFormOptions: [
          
        {
          prop: "posterName",
          element: "el-input",
          placeholder: "请输入海报名称",
          label: "海报名称"
        },
        {
          prop: "posterPic",
          element: "el-input",
          placeholder: "",
          label: "上传海报",
          operate: true,
          initValue: 0
        },
        {
          prop: "part",
          element: "el-radio",
          placeholder: "请选择",
          label: "所属模块",
          options: [
            {
              label:"九块九包邮",
              value: 1
            },
            {
              label:"活动",
              value: 2
            }
          ],
          operate: true,
          initValue: 0
        },
        {
          prop: "goodsId",
          element: "el-select",
          placeholder: "请选择",
          label: "所属九块九包邮",
          options: [
          ],
          hide: true
        },
        {
          prop: "activityId",
          element: "el-select",
          placeholder: "请选择",
          label: "所属活动",
          options: [
          ],
          hide: true
        },
        {
          prop: "posterCopyFirst",
          element: "el-input",
          placeholder: "请输入",
          label: "分享分案一",
          type:"textarea",
          rows: 2
        },
         {
          prop: "posterCopySecond",
          element: "el-input",
          placeholder: "请输入",
          label: "分享分案二",
          type:"textarea",
          rows: 2
        },
         {
          prop: "posterCopyThird",
          element: "el-input",
          placeholder: "请输入",
          label: "分享分案三",
          type:"textarea",
          rows: 2
        },
         {
          prop: "posterCopyFourth",
          element: "el-input",
          placeholder: "请输入",
          label: "分享分案四",
          type:"textarea",
          rows: 2
        },
           {
          prop: "posterCopyFifth",
          element: "el-input",
          placeholder: "请输入",
          label: "分享分案五",
          type:"textarea",
          rows: 2
        }
      ],
      addRules:{
        goodsId: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
         activityId: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
         posterName: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
         part: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
         posterPic: [
          { required: true, message: "请上传", trigger: "blur" },
        ]
      },
      addStatus: true
    }
  },
  components:{
    RdForm,
    uploadFile,
    UploadOss
  },
  mounted(){
    this.getTableData();
    this.getSelectList();
  },
   methods: {
     onSearch(val){
       this.searchForm = {
        ...val
      };
      console.log(val,this.searchForm , 'val---')
      this.getTableData();
     },
     getTableData(params = {}){
       this.$fetch("posterinfo_listJson", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
      }).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          item.startTime = this.$common._formatDates(item.startTime);
          item.endTime = this.$common._formatDates(item.endTime);
          return item;
        });;
        this.pageConfig.totalCount = res.data.count;
      })
     },
     pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    handleAdd(){
      this.addVisible = true;
    },
    submitAddForm(formName){
      this.$refs[formName].validate((valid, formData) => {
        if(valid){
          console.log(formData, "提交");
          if(!this.posterPic){
            this.$message.error(("请上传图片"));
            return;
          }
          if(!this.part){
            this.$message.error(("请选择所属模块"));
            return;
          }
          let goodsName,activityName;
          let obj1 = this.addFormOptions[3].options.find(item => (item.value == formData.goodsId));
          goodsName = obj1&&obj1.label;
          let obj2 = this.addFormOptions[4].options.find(item => (item.value == formData.activityId));
          activityName = obj2&&obj2.label;
          this.$fetch(this.addStatus?"posterinfo_save":"posterinfo_editJsp",{
            ...formData,
            posterPic: this.posterPic,
            goodsName,
            activityName
          }).then(res => {
            this.$message.success("操作成功")
            this.addVisible = false;
            this.getTableData();
          })
        }
          
      });
    },
    handleEdit(data){
      this.addStatus = false;
      this.addVisible = true;
    },
    handleDelete(row) {
      let info = '海报';
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
    partChange(val){
      if(val == 1){
        this.addFormOptions[3].hide = false;
        this.addFormOptions[4].hide = true;
      }else if(val == 2){
        this.addFormOptions[3].hide = true;
        this.addFormOptions[4].hide = false;
      }
    },
    getSelectList(){
      this.$fetch("posterinfo_getMobileGoodsUrlDataList").then(res => {
        this.addFormOptions[3].options = res.data.list.map(item => ({
          label: item.goodsName,
          value: item.id
        }))
      })
      this.$fetch("posterinfo_getActivityInfoDataList").then(res => {
        this.addFormOptions[4].options = res.data.list.map(item => ({
          label: item.activityName,
          value: item.id
        }))
      })
    },
    handleClose(){
      this.addVisible = false;
      this.posterPic = "";
      this.part = 0;
      this.addFormOptions[3].hide = true;
        this.addFormOptions[4].hide = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.post-manage {

}
</style>
