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
          name: "子订单ID",
          value: "id",
          fixed: "left",
          width: 80
        },
        {
          name: "班次",
          value: "staffName",
        },
        {
          name: "课程名称",
          value: "goodsName",
        },
        {
          name: "课程应收",
          value: "activityName",
        },
        {
          name: "优惠抵扣",
          value: "posterName",
        },
        {
          name: "课程实收",
          value: "posterPic",
        },
        {
          name: "收入确认(已确认/未确认)",
          value: "posterCopyFirst",
        },
        {
          name: "技能考试",
          value: "posterCopySecond",
        },
        {
          name: "理论考试",
          value: "posterCopyThird",
        },
        {
          name: "购买时间",
          value: "posterCopyFourth",
        },
        {
          name: "剩余服务年限",
          value: "posterCopyFifth",
        },
        {
          name: "课程状态",
          value: "createAt",
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
