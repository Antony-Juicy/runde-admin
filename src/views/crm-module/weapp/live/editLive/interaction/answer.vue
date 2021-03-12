<template>
  <div class="answer">
    <div class="content">
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :emptyText="emptyText"
        fixedTwoRow
        highlight-current-row
        :pageConfig.sync="pageConfig"
        @pageChange="pageChange"
      >
      <template slot="issuesType" slot-scope="scope">
          {{scope.row.issuesType=='SingleSelection'?'单选':'多选'}}
        </template>
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >答题明细</el-button
          >
        </template>
      </rd-table>
    </div>

    <!-- 领取明细 -->
    <el-drawer
      title="答题明细"
      :visible.sync="drawerVisible1"
      :direction="'rtl'"
      :size="'50%'"
      append-to-body
    >
      <answerDetail :answerId="answerId" v-if="drawerVisible1"/>
    </el-drawer>
  </div>
</template>

<script>
import answerDetail from "./answerDetail";
export default {
  name: "answer",
  data() {
    return {
      tableData: [],
      tableKey: [
        {
          name: "题型",
          value: "issuesType",
          operate: true
        },
        {
          name: "答题卡题目",
          value: "title",
        },
        {
          name: "答案",
          value: "rightAnswers",
        },
        {
          name: "派发时间",
          value: "lastPublishDate",
        },
        {
          name: "答题人数",
          value: "answerCount",
        },
        {
          name: "答对人数",
          value: "answerCorrectCount",
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
          width: 120,
        },
      ],
      drawerVisible1: false,
      answerId:'',
      pageConfig: {
        totalCount: 0,
        pageNum: 1,
        pageSize: 10,
      },
      emptyText:"暂无数据"
    };
  },
  components: {
    answerDetail,
  },
   props: {
    liveId: {
      type: Number,
    }
  },
  mounted(){
    this.getTableData();
  },
  methods: {
    pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.pageNum = val.page;
      this.pageConfig.pageSize = val.limit;
      this.getTableData();
    },
    handleEdit(val){
      this.answerId = val.answerSheetId;
      console.log(this.answerId,'this.answerId--')
      this.drawerVisible1 = true;
    },
    getTableData(params = {}) {
      this.$fetch("live_answer_list", {
        ...this.pageConfig,
        ...params,
        liveId: this.liveId
      }).then((res) => {
        this.tableData = res.data.records;
        this.pageConfig.totalCount = res.data.totalCount;
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.answer {
}
</style>
