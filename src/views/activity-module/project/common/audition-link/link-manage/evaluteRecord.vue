<template>
  <div class="post-manage">
      <search-form
      :formOptions="formOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
    <div class="w-container">
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :tbodyHeight="600"
        fixedTwoRow
        :emptyText="emptyText"
      >
      </rd-table>
    </div>
    
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
export default {
  name:"link-manage",
  data(){
    return {
      formOptions: [
        {
          prop: "productName",
          element: "el-input",
          placeholder: "项目名称",
        },
      ],
      searchForm:{},
      emptyText:"暂无数据",
      tableData:[
      ],
      tableKey: [
        {
          name: "项目名称",
          value: "productName",
        },
        {
          name: "您的年龄在",
          value: "issuse",
        },
        {
          name: "是否考过执业药师",
          value: "activityName",
        },
        {
          name: "今年要考试的方向",
          value: "posterName",
        },
        {
          name: "具体的科目有哪些",
          value: "posterPic",
        }
       
      ],
    }
  },
  components:{
    RdForm
  },
  props: {
    linkUserId: {
      type: Number | String
    }
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
     getTableData(params = {}){
       this.$fetch("auditionLink_userEvaluationRecordListJsp", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
        linkUserId: this.linkUserId
      }).then((res) => {
        this.tableData = res.data.varList.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          return item;
        });;

      })
     },
  }
}
</script>

<style lang="scss" scoped>
.post-manage {

}
</style>
