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
        :pageConfig.sync="pageConfig"
        :tbodyHeight="600"
        fixedTwoRow
        @pageChange="pageChange"
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
          prop: "menuName",
          element: "el-select",
          placeholder: "项目名称",
        },
      ],
      searchForm:{},
      emptyText:"暂无数据",
      tableData:[
         {
          id: 1,
          name: "飞翔的荷兰人3",
          cutdown: 1608897351706,
          visit: 2,
          phone: "15692026183",
        },
      ],
      tableKey: [
        {
          name: "科目名称",
          value: "staffName",
        },
        {
          name: "分数",
          value: "goodsName",
        },
        {
          name: "题号1",
          value: "activityName",
        },
        {
          name: "题号2",
          value: "posterName",
        },
        {
          name: "题号3",
          value: "posterPic",
        },
        {
          name: "题号4",
          value: "posterPic",
        },
        {
          name: "题号5",
          value: "posterPic",
        },
        {
          name: "题号6",
          value: "posterPic",
        },
        {
          name: "题号7",
          value: "posterPic",
        },
        {
          name: "题号8",
          value: "posterPic",
        },
        {
          name: "题号9",
          value: "posterPic",
        },
        {
          name: "题号10",
          value: "posterPic",
        },
        {
          name: "题号11",
          value: "posterPic",
        },
        {
          name: "题号12",
          value: "posterPic",
        },
       
      ],
       pageConfig: {
        totalCount: 0,
        currentPage: 1,
        showCount: 10,
      },
    }
  },
  components:{
    RdForm
  },
  mounted(){
    this.getTableData();
  },
  props: {
    linkUserId: {
      type: Number | String
    }
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
       this.$fetch("auditionLink_userRecordListJsp", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
        linkUserId: this.linkUserId
      }).then((res) => {
        this.tableData = res.data.varList?res.data.varList.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          return item;
        }):[];

      })
     },
     pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
  }
}
</script>

<style lang="scss" scoped>
.post-manage {

}
</style>
