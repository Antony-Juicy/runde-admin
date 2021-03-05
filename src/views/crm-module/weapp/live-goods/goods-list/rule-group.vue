<template>
  <div class="rulegroup-container">
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="openAddGroup">选择规格组</el-button>
      </div>
      <div v-for="(item, i) in this.tableData" :key="i" style="margin-bottom:10px;">
        <div style="padding: 0 20px;height: 40px; border: 1px solid #EBEEF5; line-height:40px;background-color: rgb(242, 242, 242);">
          规格组：{{item.groupName}}
          <span style="float:right;padding-right:20px;">  
            共{{item.goodsItemCount}}个规则
            <el-button @click="deleteAddGroup(item)" type="text" size="small" style="margin-left:20px; color: #ec5b56" >删除</el-button>
          </span>
        </div>
        <rd-table
          :tableData="item.items"
          :tableKey="tableKey"
          :loading="loading"
          :emptyText="emptyText"
          :isImage="isImage"
          :fixedTwoRow="fixedTwoRow">
        </rd-table>
      </div>
      <rd-dialog
        title="选择规格组"
        :dialogVisible="showAddGroup"
        :width="widthGroup"
        append-to-body
        @handleClose="closeAddGroup('dataForm')"
        @submitForm="submitGroupForm('dataForm')">
        <search-form :formOptions="optionsGroup" @onSearch="onGroupSearch"></search-form>
        <rd-table
          :tableData="tableGroupData"
          :tableKey="tableGroupKey"
          :loading="loading"
          :fixedTwoRow="fixedTwoRow"
          :multiple="true"
          :emptyText="emptyText"
          :isImage="isImage"
          :pageConfig.sync="pageGroupConfig"
          @select="handleGroupSelect"
          @pageChange="pageGroupChange">
        </rd-table>
      </rd-dialog>
    </div>
  </div>
</template>

<script>

export default {
  name:"rule-group",
  props:{
    goodsId: {
      type: Number
    }
  },
  data(){
    return {
      // 关联规格组弹窗
      tableData: [],
      tableKey: [
        { name: '规则',value: 'goodsItemName' },
        { name: '价格',value: 'salesPrice' },
        { name: '划线价',value: 'originalPrice' },
        { name: '开通班型id',value: 'openClassId' },
        { name: '开通课程id',value: 'openSubjectId' },
        { name: '配套内容',value: 'ancillaryGoods' }
      ],
      loading: false,
      emptyText: '暂无规则',
      isImage: false, // 控制表格无数据展示图
      fixedTwoRow: true,
      showGroup: false,
      showGroupTitle: '',
      showAddGroup: false,
      widthGroup: "800px",
      searchGroupForm: {},
      goodsGroupIdData: [], // 选择的规则id集合
      optionsGroup: [
        { prop: 'goodsGroupName', element: 'el-input', placeholder: '请输入规格组名称' },
        { prop: 'remark', element: 'el-input', placeholder: '请输入备注内容' },
      ],
      tableGroupData: [
        {
          goodsGroupName: "中药",
          itemCount: 4,
          remark: '备注备注金牌通过班'
        }
      ],
      tableGroupKey: [
        { name: '规格组',value: 'goodsGroupName' },
        { name: '规则数量',value: 'itemCount' },
        { name: '备注',value: 'remark' },
      ],
      pageGroupConfig: {
        totalCount: 20,
        pageNum: 1,
        pageSize: 10,
      },
    }
  },
  mounted () {
    this.getRuleGroupTableData()
  },
  methods: {
    getRuleGroupTableData(params) {
      this.$fetch(
        "goods_rule_group_list",
        params || {
          goodsId: this.goodsId,
        }
      ).then((res) => {
        this.tableData = res.data
      });
    },

    // 选择规格组弹窗
    onGroupSearch(val) {
      this.searchGroupForm = {...val};
      this.pageGroupConfig.pageNum = 1;
      this.getRuleTableData();
      console.log(val,this.searchGroupForm , 'val---')
    },
    getRuleTableData() {
      this.$fetch(
        "goods_item_page_list",
        {
          goodsId: this.goodsId,
          ...this.pageGroupConfig,
          ...this.searchGroupForm
        }
      ).then((res) => {
        console.log(res, 446)
        this.tableGroupData = res.data.records;
        this.pageGroupConfig.totalCount = res.data.totalCount;
      });
    },
    openAddGroup() {
      this.showAddGroup = true;
      this.getRuleTableData();
    },
    closeAddGroup() {
      this.showAddGroup = false
    },
    deleteAddGroup(item) {
      console.log(item, 996)
      let info = item.groupName;
      this.$confirm(`此操作将删除${info}规格组, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$fetch("goods_rule_group_delete", {
            goodsGroupRelatedId: item.goodsGroupRelatedId,
          }).then((res) => {
            if (res) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              setTimeout(() => {
                this.getRuleGroupTableData();
              }, 50);
            }
          });
        })
        .catch(() => {});
    },
    submitGroupForm(formName) {
      // console.log( 666);
      // this.showAddGroup = false;
      // this.$refs[formName].validate((valid) => {
      //   if(valid) {
          // 新增
          let groupIds = JSON.stringify(this.goodsGroupIdData)
          this.$fetch("goods_rule_group_add", {
            goodsId: this.goodsId,
            groupIds: groupIds
          }).then((res) => {
            this.$message({
              message: "提交成功",
              type: "success",
            });
            this.getRuleGroupTableData();
            this.closeAddGroup("dataForm");
          });
      //   }
      // });
    },
    handleGroupSelect(rows) {
      console.log(rows, "rows---");
      this.goodsGroupIdData = rows.map(item => item.goodsGroupId)
    },
    pageGroupChange(val) {
      console.log(val,'pagechange')
      this.pageGroupConfig.pageNum = val.page;
      this.pageGroupConfig.pageSize = val.limit;
      this.getRuleTableData(
      );
    },
  }
}
</script>

<style lang="scss" scoped>
.rulegroup-container{

}
</style>
