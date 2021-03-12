<template>
  <div class="presentconfig-container">
    <search-form :formOptions = "formOptions" :showNum="showNum" @onSearch = onSearch></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :pageConfig.sync="pageConfig"
        @select="handleSelect"
        @pageChange="pageChange">
        <template slot="giftImage" slot-scope="scope">
          <img :src="scope.row.giftImage" style="width:80px;height:80px;" alt="">
        </template>
        <template slot="giftStatus" slot-scope="scope">
          <span>{{ scope.row.giftStatus | giftStatusFilter }}</span>
        </template>
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleDelete(scope.row)" type="text" size="small" style="color: #ec5b56">删除</el-button>
        </template>
      </rd-table>
      <rd-dialog
        :title="presentStatus ? '新增礼物' : '编辑礼物'"
        :dialogVisible="presentVisible"
        :width="widthNew"
        @handleClose="closePresent('dataForm')"
        @submitForm="submitForm('dataForm')">
        <el-form ref="dataForm" :model="presentForm" label-width="100px">
          <el-form-item label="礼物名称" prop="liveGiftName">
            <el-input v-model.trim="presentForm.liveGiftName" autocomplete="off" placeholder="请输入项目名称" />
          </el-form-item>
          <el-form-item label="礼物图片" prop="giftImage" class="icon-wrapper">
            <Upload-oss
              v-if="uploadOssElem"
              :objConfig="{module: 'live', project: 'icon_'}"
              :src.sync="presentForm.giftImage"
              @srcChangeFun="
                (data) => {
                  presentForm.giftImage = data;
                  reloadElem('uploadOssElem');
                }
              "
            />
          </el-form-item>
          <el-form-item label="单价价格" prop="giftPrice">
            <el-input-number controls-position="right" v-model.trim ="presentForm.giftPrice" autocomplete="off" :min="0" placeholder="请输入单价价格" />
          </el-form-item>
          <el-form-item label="显示状态" prop="giftStatus" style="width:50%;">
            <el-select v-model.trim="presentForm.giftStatus" placeholder="请选择">
              <el-option label="显示" value="Show"></el-option>
              <el-option label="隐藏" value="Hidden"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序值" prop="orderValue">
            <el-input-number controls-position="right" v-model.trim ="presentForm.orderValue" autocomplete="off" :min="0" placeholder="请输入排序编号" />
          </el-form-item>
        </el-form>
      </rd-dialog>
    </div>
  </div>
</template>

<script>
import UploadOss from "@/components/UploadOss";
export default {
  name:"present-config",
  components: {
    UploadOss
  },
  data(){
    return {
      showNum: 6,
      searchForm: {},
      formOptions: [
        { prop: 'liveGiftName', element: 'el-input', placeholder: '礼物名称' },
        { 
          prop: 'giftStatus',
          element: 'el-select',
          placeholder: '显示状态',
          options: [
            {
              label: "显示",
              value: "Show",
            },
            {
              label: "隐藏",
              value: "Hidden",
            },
          ],
        }
      ],
      tableData: [
        // {
        //   liveGiftId: 1,
        //   liveGiftName: "测试礼物",
        //   giftImage: "",
        //   giftStatus: "显示",
        //   orderValue: 1,
        //   giftPrice: 9.9,
        //   totalGiveCount: 110,
        //   createAt: "2020-01-01 00:00:00"
        // }
      ],
      tableKey: [
        { name: 'ID',value: 'liveGiftId',sortable: true },
        { name: '礼物名称',value: 'liveGiftName' },
        { name: '礼物图片',value: 'giftImage',operate: true },
        { name: '显示状态',value: 'giftStatus',operate: true },
        { name: '排序值',value: 'orderValue' },
        { name: '单价价格',value: 'giftPrice' },
        { name: '累计赠送数量',value: 'totalGiveCount' },
        { name: '创建时间',value: 'createAt' },
        { name: '操作',value: 'edit',operate: true,width: 120 }
      ],
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 0,
        pageNum: 1,
        pageSize: 10,
      },
      currentPageInfo: null, //当前页数 page和limit
      loading: false,

      // 弹窗
      uploadOssElem: true,
      widthNew: "600px",
      presentVisible: false,
      presentStatus: true,
      presentForm: {
        liveGiftName: '',
        giftImage: '',
        giftPrice: '',
        orderValue: '',
        giftStatus: ''
      },
    }
  },
  mounted () {
    this.getTableData();
  },
  methods: {
    onSearch(val) {
      this.searchForm = {...val};
      this.pageConfig.pageNum = 1;
      this.getTableData();
      console.log(val,this.searchForm , 'val---')
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    getTableData(params={}) {
      return new Promise((resolve,reject)=>{
        this.$fetch(
          "gift_list",
          {
            // loginUserId: this.$common.getUserId(),
            ...this.pageConfig,
            ...this.searchForm,
            ...params
          }
        ).then((res) => {
          this.tableData = res.data.records;
          this.pageConfig.totalCount = res.data.totalCount;
          resolve();
        })
      })
    },
    pageChange(val) {
      console.log(val,'pagechange')
      // this.currentPageInfo = val;
      // this.getTableData({
      //   pageNum: (val && val.page) || 1,
      //   pageSize: (val && val.limit) || 10,
      //   loginUserId: this.$common.getUserId()
      // });
      this.pageConfig.pageNum = val.page;
      this.pageConfig.pageSize = val.limit;
      this.getTableData();
    },

    // 新增
    handleAdd() {
      this.presentVisible = true;
      this.presentStatus = true;
      for (const key in this.presentForm) {
        this.presentForm[key] = "";
      }
    },
    // 编辑
    handleEdit(row) {
      this.presentVisible = true;
      this.presentStatus = false;
      this.presentForm = {
        ...row
      }
    },
    // 删除
    handleDelete(row) {
      let info = row.liveGiftName;
      this.$confirm(`此操作将删除${info}礼物, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$fetch("gift_delete", {
            liveGiftId: row.liveGiftId,
            loginUserId: this.$common.getUserId(),
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
    closePresent(formName) {
      this.presentVisible = false;
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      // console.log(this.presentForm, 666);
      // this.closePresent("dataForm")
      this.$refs[formName].validate((valid) => {
        if(valid) {
          if(this.presentStatus) {
            // 新增
            this.$fetch("gift_add", {
              ...this.presentForm,
              loginUserId: this.$common.getUserId()
            }).then((res) => {
              this.$message({
                message: "提交成功",
                type: "success",
              });
              this.getTableData();
              this.closePresent("dataForm");
            });
          } else {
            // 编辑
            this.$fetch("gift_update", {
              ...this.presentForm,
              loginUserId: this.$common.getUserId()
            }).then((res) => {
              this.$message({
                message: "编辑成功",
                type: "success",
              });
              this.getTableData();
              this.closePresent("dataForm");
            });
          }
        }
      });
    },
    // 上传组件
    reloadElem(dataElem) {
      // 重新加载组件
      this[dataElem] = false;
      this.$nextTick(() => {
        this[dataElem] = true;
      });
    },
  },
  filters: {
    giftStatusFilter(status){
      switch(status){
        case "Show":
          return '显示';
        case "Hidden":
          return '隐藏';
        default:
          return '';
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.presentconfig-container {

}
</style>
