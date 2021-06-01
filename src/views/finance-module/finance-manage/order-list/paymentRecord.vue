<template>
  <div class="view-detail">
    <div class="w-container">
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig.sync="pageConfig"
        fixedTwoRow
        @pageChange="pageChange"
      >
      </rd-table>
    </div>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
export default {
  name:"view-detail",
  data(){
    return {
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
          name: "ID",
          value: "id",
          fixed: "left",
          width: 80
        },
        {
          name: "缴费金额",
          value: "staffName",
        },
        {
          name: "缴费时间",
          value: "goodsName",
        },
        {
          name: "支付类型",
          value: "activityName",
        },
        {
          name: "缴费渠道",
          value: "posterName",
        },
        {
          name: "学员",
          value: "posterPic",
        },
        {
          name: "收款分校",
          value: "posterCopyFirst",
        },
        {
          name: "收款人",
          value: "posterCopySecond",
        },
        {
          name: "备注",
          value: "posterCopyThird",
        }
      ],
       pageConfig: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
      }
    }
  },
  components:{
    RdForm
  },
   methods: {
     onSearch(val){
       this.searchForm = {
        ...val
      };
      console.log(val,this.searchForm , 'val---')
      this.getTableData();
     },
     getTableData(){

     },
     pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    }
  }
}
</script>

<style lang="scss" scoped>
.view-detail {

}
</style>
