<template>
  <div>
    <el-data-table
      v-bind="recoveryTableData"
      @reset="recoveryTableData.extraQuery = {
          classifyId: ''
        }"
    >
      <template v-slot:form="{row}">
        <!-- <el-form label-position="top"> -->
        <div v-if="row">
          <el-form-item label="图片地址">
            <Upload-oss :src.sync="row.imagePath" @srcChangeFun="(data)=>{ row.imagePath = data}"/>
          </el-form-item>
          <el-form-item label="是否隐藏">
            <el-radio v-model="row.hided" label="YES">是</el-radio>
            <el-radio v-model="row.hided" label="NO">否</el-radio>
          </el-form-item>
          <el-form-item :label="'是否重点推荐'">
            <el-radio v-model="row.headRecommend" label="YES">是</el-radio>
            <el-radio v-model="row.headRecommend" label="NO">否</el-radio>
          </el-form-item>
          <el-form-item :label="'是否重点推荐'">
            <el-radio v-model="row.recommend" label="YES">是</el-radio>
            <el-radio v-model="row.recommend" label="NO">否</el-radio>
          </el-form-item>
          
          <el-form-item label="分类" v-if="row">
            <el-cascader
              style="width:100%"
              v-model="row.classifyId"
              :props="{
                label:'classifyName',
                value:'id',
                checkStrictly: true,
                emitPath: false,
                checkStrictly: true,
                expandTrigger: 'hover'
              }"
              ref="cascader"
              @change="e=>{
                row.classifyName = $refs.cascader.getCheckedNodes()[0].label
              }"
              :options="classifyList"
              placeholder="请选择"
              filterable
            ></el-cascader>
          </el-form-item>
          <el-form-item label="资讯详情">
            <Tinymce menubar="false" v-model="row.infoDetail" :height="300" />
          </el-form-item>
        </div>

        <!-- </el-form> -->
      </template>

      <template slot="search">
        <el-form-item label="分类">
          <el-cascader
            style="width:100%"
            v-model="recoveryTableData.extraQuery.classifyId"
            :props="{
                label:'classifyName',
                value:'id',
                checkStrictly: true,
                emitPath: false,
                checkStrictly: true
              }"
            :options="classifyList"
            placeholder="请选择"
            filterable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="隐藏：">
            <el-radio v-model="recoveryTableData.extraQuery.hided" label="YES">是</el-radio>
            <el-radio v-model="recoveryTableData.extraQuery.hided" label="NO">否</el-radio>
          </el-form-item>
          <el-form-item :label="iceConfig.version !== 'rundejy' ? '首页推荐:' : '资讯推荐:'">
            <el-radio v-model="recoveryTableData.extraQuery.recommend" label="YES">是</el-radio>
            <el-radio v-model="recoveryTableData.extraQuery.recommend" label="NO">否</el-radio>
          </el-form-item>
          
          <el-form-item :label="iceConfig.version !== 'rundejy' ? '重点推荐:' : '顶部推荐:'">
            <el-radio v-model="recoveryTableData.extraQuery.headRecommend" label="YES">是</el-radio>
            <el-radio v-model="recoveryTableData.extraQuery.headRecommend" label="NO">否</el-radio>
          </el-form-item>
      </template>
    </el-data-table>
  </div>
</template>

<script>
import UploadOss from "@/components/UploadOss";
import Tinymce from "@/components/Tinymce";
import { parseTime } from "@/utils";
const iceConfig = require('@/config/config.js')
const formVersion = require(`./${iceConfig.version}Form.js`);
export default {
  inject: ['reload'],
  components: { UploadOss, Tinymce },
  data() {
    const _this = this;
    const pd = {
      YES: "是",
      NO: "否"
    };
    return {
      iceConfig: iceConfig,
      recoveryTableData: {
        idkey: "id",
        idName: "id",
        url: {
          get: "doc-management/getInformationPage",
          add: "doc-management/addInformation",
          set: "doc-management/setInformation"
        },
        hasDelete: false,
        // hasEdit: false,
        // hasNew: false,
        hasView: true,
        columns: [
          { prop: "id", label: "id", width: "70px" },
          { prop: "infoTitle", label: "资讯标题" },
          { prop: "infoSource", label: "来源" },
          { prop: "watchedNum", label: "阅读量" },
          { prop: "classifyName", label: "分类名称" },
          {
            prop: "createAt",
            label: "创建时间",
            formatter: row => (row.createAt ? parseTime(row.createAt) : "")
          }
        ],
        hasSearch: true,
        formAttrs: {
          rules: {
            classifyId: [
              { required: true, message: "请选择类型", trigger: "change" }
            ]
          }
        },
        searchForm: [
          {
            el: { placeholder: "请输入资讯标题" },
            label: "资讯标题",
            id: "infoTitle",
            type: "input"
          },
          {
            el: { placeholder: "请输入来源" },
            label: "来源",
            id: "infoSource",
            type: "input"
          },
          {
            el: { placeholder: "请输入自定义标签" },
            label: "自定义标签",
            id: "customLabel",
            type: "input"
          }
        ],
        form: formVersion,
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
                    "doc-management/delInformation",
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
          classifyId: ""
        },
        // hasOperation: false,
        paginationLayout: "sizes,prev, pager, next, jumper"
      },
      classifyList: [] // 分类列表
    };
  },
  created() {
    this.getClassList();
  },
  methods: {
    changeExpand(e) {
      console.log(e, this.$refs.cascader.getCheckedNodes());
    },
    async getClassList() {
      let res = await this.$store.dispatch("website-config/getClassifyAll");
      this.classifyList = res.data.list;
    }
  }
};
</script>
<style scoped>
.el-radio {
  margin-right: 10px;
}
</style>