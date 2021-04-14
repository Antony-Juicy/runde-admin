<template>
  <div class="index">

    <div class="el-form">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="用户昵称" width="180">
          <template slot-scope="scope">
            <div class="form">
              <img class="form-avatar" src="@/assets/logo.png">
              <p class="form-text">昵称昵称</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="微信ID" width="180">
          <template slot-scope="scope">
            <div class="form">
              <p class="form-text">微信ID</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="用户标签">
          <template slot-scope="scope">
            <div class="form">
              <p class="form-label">标签</p>
              <p class="form-label">标签标签</p>
              <p class="form-label">标签标签标签</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="关联老师">
          <div class="form">
            <p class="form-text">某某某（422880）</p>
          </div>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <div class="form">
            <p class="form-text">修改标签</p>
          </div>
        </el-table-column>
      </el-table>
        
      <div class="pages">
        <Pagination :total="10" />
      </div>
      
    </div>

    

  </div>
</template>

<script>
import Pagination from "@/components/Pagination/index.vue";
export default {
  name:'users',

  components: {
    Pagination
  },

  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<style>
.index{
  height: 100%;
}
.el-form{
  width: 100%;
  height: 100%;
  padding:0 20px;
  box-sizing: border-box;
  background:#fff;
}
.form{
  display: flex;
  align-items: center;
}
.form-avatar{
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.form-text{
  font-size: 14px;
  color:#333;
}
.form-label{
  display:inline-block ;
  padding:3px 5px;
  font-size: 14px;
  border: 1px solid #333;
  margin-right: 10px;
}
.form-label:nth-last-child(1){
  margin-right: 0;
}
.pages{
  padding:30px 0 70px 0;
}
</style>