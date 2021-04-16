<template>
  <div class="index">

    <!-- 搜索栏 -->
    <search-form ref="searchForm" :formOptions="formOptions" :showNum="5" @onSearch="onSearch" @onReset="onReset"></search-form>
    
		<!-- 表格主体 -->
    <div class="el-form">
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="date" label="用户昵称" width="180">
          <template slot-scope="scope">
            <div class="form">
              <img class="form-avatar" :src="scope.row.headimgurl">
              <p class="form-text">{{scope.row.nickName}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="微信ID" width="180">
          <template slot-scope="scope">
            <div class="form">
              <p class="form-text">{{scope.row.openId}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="用户标签">
          <template slot-scope="scope">
            <div class="form" v-if="scope.row.wechatUserTagModel.length">
              <p class="form-label" v-for="item in scope.row.wechatUserTagModel" :key="item.id">{{item.labelName}}</p>
            </div>
            <div class="form" v-else>
              <p class="form-label" style="border:none;">无标签</p>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="address" label="关联老师">
          <div class="form">
            <p class="form-text">某某某（422880）</p>
          </div>
        </el-table-column> -->
        <el-table-column prop="address" label="操作">
          <div class="form">
            <p class="form-edit">修改标签</p>
          </div>
        </el-table-column>
      </el-table>
        
      <div class="pages">
        <Pagination :total="total" @pagination="changepageNum"  />
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
      list:[],
      pageNum:1,
      openId:'',
      hasNext:true,
      total:0,
      pageSize:10,
      searchForm:{},
      formOptions: [
        {
          prop: "labelName",
          element: "el-input",
          placeholder: "用户标签",
        },
        {
          prop: "nickName",
          element: "el-input",
          placeholder: "用户昵称",
        },
        {
          prop: "openId",
          element: "el-input",
          placeholder: "微信ID",
        },
      ],


    }
  },

  async mounted() {
		let res = await this.$fetch(
			"get_official_accounts_list",
		);
		let official_accounts = {
			prop: "officialAccounts",
			element: "el-select",
			placeholder: "选择公众号",
			options: res.data.map(v => {
				return {
					label: v.appName,
					value: JSON.stringify(v)
				}
			}),
			// 需要指定一个公众号，默认就选第一个
			initValue: JSON.stringify(res.data[0])
		}
		this.formOptions.unshift(official_accounts);
    //默认第一项
		this.$refs.searchForm.addInitValue()
    this.appId = res.data[0].appId;
    this.getTableData();
	},

  methods: {

		async getTableData() {
      if(this.pageNum == 1){
        this.list = [];
        this.hasNext = true;
      }
      if(!this.hasNext)return
      let postData = {
        pageNum:this.pageNum,
        pageSize:this.pageSize,
        appId:this.appId
      }
			let res = await this.$fetch(
				"wechat_user_page_list",
        {
          ...postData,
          ...this.searchForm
        }
			);
			// console.log(res)
			this.list = this.list.concat(res.data.records);
      this.hasNext = res.data.hasNext;
      this.total = res.data.totalCount;
		},

    changepageNum(e){
      if(e.page > this.pageNum && !this.hasNext)return
      if(e.page == this.pageNum)return
      this.pageNum = e.page;
      this.pageSize = e.limit;
      this.getTableData();
    },

    onSearch(data){
      let searchForm = {};
      if(!!data.officialAccounts){
        this.appId = JSON.parse(data.officialAccounts).appId;
      }
      if(!!data.labelName){
        searchForm.labelName = data.labelName;
      }
      if(!!data.nickName){
        searchForm.nickName = data.nickName;
      }
      if(!!data.openId){
        searchForm.openId = data.openId;
      }
      this.searchForm = searchForm;
      this.pageNum = 1;
      this.getTableData();
    },

    onReset(){
      this.searchForm = {};
    },
    
	},


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
.form-label:nth-child(1n){
  color:#2C9EFF;
  border: 1px solid #2C9EFF;
}
.form-label:nth-child(2n){
  color:#FF9823;
  border: 1px solid #FF9823;
}
.form-label:nth-child(3n){
  color:#FF7D75;
  border: 1px solid #FF7D75;
}
.form-label:nth-last-child(1){
  margin-right: 0;
}
.form-edit{
  font-size: 14px;
  color:#006FFF;
  cursor:pointer;
}
.pages{
  padding:30px 0 70px 0;
}
</style>