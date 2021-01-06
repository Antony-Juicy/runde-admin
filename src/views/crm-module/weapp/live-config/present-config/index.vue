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
        :pageConfig="pageConfig"
        @select="handleSelect"
        @pageChange="pageChange">
      </rd-table>
      <rd-dialog
        :title="presentStatus ? '新增礼物' : '编辑礼物'"
        :dialogVisible="presentVisible"
        :width="widthNew"
        @handleClose="closeProject('dataForm')"
        @submitForm="submitForm('dataForm')">
        <el-form ref="dataForm" :model="presentForm" label-width="100px">
          <el-form-item label="礼物名称" prop="presentName">
            <el-input v-model.trim="presentForm.presentName" autocomplete="off" placeholder="请输入项目名称" />
          </el-form-item>
          <el-form-item label="礼物图片" prop="presentImg" class="icon-wrapper">
            <Upload-oss
              v-if="uploadOssElem"
              :objConfig="{ dir: 'web/runde_admin', project: 'icon_' }"
              :src.sync="presentForm.presentImg"
              @srcChangeFun="
                (data) => {
                  presentForm.presentImg = data;
                  reloadElem('uploadOssElem');
                }
              "
            />
          </el-form-item>
          <el-form-item label="单价价格" prop="presentPrice">
            <el-input-number controls-position="right" v-model.trim ="presentForm.presentPrice" autocomplete="off" :min="0" placeholder="请输入单价价格" />
          </el-form-item>
          <el-form-item label="显示状态" prop="presentType">
            <el-select v-model.trim="presentForm.presentType" placeholder="请选择">
              <el-option label="正常" value="0"></el-option>
              <el-option label="停用" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序值" prop="presentsort">
            <el-input-number controls-position="right" v-model.trim ="presentForm.presentsort" autocomplete="off" :min="0" placeholder="请输入排序编号" />
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
        { prop: 'present', element: 'el-input', placeholder: '礼物名称' },
        { prop: 'shopID', element: 'el-select', placeholder: '显示状态' }
      ],
      tableData: [],
      tableKey: [
        { name: 'ID',value: 'presentID',operate: true,sortable: true },
        { name: '礼物名称',value: 'presentName' },
        { name: '礼物图片',value: 'presentImg' },
        { name: '显示状态',value: 'status' },
        { name: '排序值',value: 'sortNumber' },
        { name: '单价价格',value: 'price' },
        { name: '累计赠送数量',value: 'presentCount' },
        { name: '创建时间',value: 'createTime' },
        { name: '操作',value: 'edit',operate: true,width: 120 }
      ],
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,

      // 弹窗
      uploadOssElem: true,
      widthNew: "600px",
      presentVisible: false,
      presentStatus: true,
      presentForm: {
        presentName: '',
        presentImg: '',
        presentPrice: '',
        presentsort: '',
        presentType: ''
      },
    }
  },
  methods: {
    onSearch(val) {
      this.searchForm = {...val};
      console.log(val,this.searchForm , 'val---')
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    pageChange(val) {
      console.log(val,'pagechange')
    },

    // 弹窗
    handleAdd() {
      this.presentVisible = true;
    },
    closeProject(formName) {
      this.presentVisible = false;
      // this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      console.log(this.presentForm, 666);
      this.closeProject("dataForm")
    },
    // 上传组件
    reloadElem(dataElem) {
      // 重新加载组件
      this[dataElem] = false;
      this.$nextTick(() => {
        this[dataElem] = true;
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.presentconfig-container {

}
</style>
