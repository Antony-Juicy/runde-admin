<template>
  <div class="post-manage">
    <div class="w-container">
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :tbodyHeight="800"
        fixedTwoRow
      >
       <template slot="edit" slot-scope="scope">
          <el-button @click="handleDetail(scope.row)" type="text" size="small"
            >编辑</el-button
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
    <!-- 编辑题目详情 -->
      <rd-dialog
        :title="'编辑'"
        :dialogVisible="editVisible"
        :width="'700px'"
        :showFooter="false"
        top="5vh"
        append-to-body
        @handleClose="editVisible = false"
        @submitForm="submitAddForm('dataForm3')"
      >
        <editSubject :id="id" :issuseId="issuseId" v-if="editVisible" @close="editVisible = false" @refresh="refresh"/>
      </rd-dialog>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import editSubject from './editSubject';
export default {
  name:"link-manage",
  data(){
    return {
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
          name: "题目序号",
          value: "issuseId",
          width: 60
        },
        {
          name: "题目类型",
          value: "issuesType",
          width: 80
        },
        {
          name: "题目",
          value: "issuse1",
        },
         {
          name: "操作",
          value: "edit",
          operate: true,
          width: 100
        },
       
      ],
      editVisible: false,
      issuseId:""
    }
  },
  props:{
    id: {
      type: Number || String
    }
  },
  components:{
    RdForm,
    editSubject
  },
  mounted(){
    this.getTableData();
  },
  watch:{
    id(newVal){
      this.getTableData();
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
       this.$fetch("lookpicture_details", {
        ...this.searchForm,
        ...params,
        id: this.id
      }).then((res) => {
        this.tableData = res.data.map(item => {
          item.issuse1 = item.issue&&item.issue.issuse;
          return item;
        });
      })
     },
     handleDelete(row) {
      let info = '项';
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
    handleDetail(data){
      this.issuseId = data.issuseId;
      this.editVisible = true;
    },
    refresh(){
      this.getTableData();
    }
  }
}
</script>

<style lang="scss" scoped>
.post-manage {

}
</style>
