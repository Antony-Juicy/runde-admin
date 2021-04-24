<template>
  <div class="index">

    <!-- 搜索栏 -->
    <div class="search">
      <div class="search-left">
        <el-dropdown trigger="click" placement="bottom-start" @command="handle_select_account" >
          <div class="select-accoumt">
            <img class="logo" :src='account.appImg'>
            <div>{{account.appName}}</div>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item,index) in officialAccounts" :key="index" :command="index">
              <div class="account-option">
                <img :src="item.appImg" class="logo">
                <span>{{ item.appName }}</span>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="search-right">
        <search-form ref="searchForm" :formOptions="formOptions" @onSearch="onSearch" @onReset="onReset"></search-form>
      </div>
    </div>

		<!-- 表格主体 -->
    <div class="el-form">
			<rd-table :tableData="list" :tableKey="tableKey" :pageConfig.sync="pageConfig" @pageChange="pageChange">
				<template slot="label" slot-scope="scope">
          <div class="el-form-list">
					  <span class="el-form-label" v-for="item in scope.row.wechatUserTagModel" v-if="scope.row.wechatUserTagModel && scope.row.wechatUserTagModel.length">{{item.labelName}}</span>
            <span class="el-form-label-null"v-if="!scope.row.wechatUserTagModel || !scope.row.wechatUserTagModel.length">无标签</span>
          </div>
				</template>
				<template slot="edit" slot-scope="scope">
					<el-button @click="handleEdit(scope.row)" type="text" size="small">修改标签</el-button>
				</template>
			</rd-table>
    </div>

    <!-- 修改标签 -->
    <el-dialog  :visible.sync="outerVisible" :show-close="false">
      <div style="background:#fff">
      <div class="label-title">
        <p>修改标签</p>
        <div class="label-close" @click="outerVisible = false">
          <i class="el-icon-close" style="font-size:25px;"></i>
        </div>
      </div>
      <div class="label-content">
        <div class="label-list">
          <div class="label-list-box" v-for="(item,index) in labelList">
            <div class="label-list-radio" @click="chooseLabel(index)">
              <i class="el-icon-check" style="color:#26B957;font-size: 15px;" v-if="item.active"></i>
            </div>
            <div class="label-list-title">{{item.labelName}}</div>
          </div>
        </div>
      </div>
      <div class="list-fn">
        <div @click="outerVisible = false">取消</div>
        <div @click="changeLabel()">确定</div>
      </div>
      </div>
    </el-dialog>
    

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
      searchForm:{},
      labelList:[],
      formOptions: [
        {
          prop: "labelName",
          element: "el-input",
          placeholder: "请输入用户标签",
        },
        {
          prop: "nickName",
          element: "el-input",
          placeholder: "请输入用户昵称",
        },
        {
          prop: "openId",
          element: "el-input",
          placeholder: "请输入微信ID",
        },
      ],
      outerVisible:false,
      labelOpenId:'',

      // 表格数据
      list: [],
			tableKey: [
				{
					name: "用户昵称",
					value: "nickName",
					width: 180
				},
				{
					name: "微信ID",
					value: "openId",
					width: 350
				},
				{
					name: "用户标签",
					value: "label",
					operate: true,
				},
				// {
				// 	name: "关联老师ID",
				// 	value: "labelTypeZH",
				// },
				{
					name: "操作",
					value: "edit",
					operate: true,
					width: 250
				},
			],
			pageConfig: {
				totalCount: 0,
				pageNum: 1,
				pageSize: 10,
			},
      
      //公众号菜单
			officialAccounts: [],
			account: {},
			label: {},
      
    }
  },

  async mounted() {
		let res = await this.$fetch(
			"get_official_accounts_list",
		);
		this.officialAccounts = res.data
		this.account = this.officialAccounts[0];
    this.getTableData();
	},

  methods: {

    //获取表格数据
		async getTableData() {
      this.tableData = [];
      let postData = {
        pageNum:this.pageConfig.pageNum,
        pageSize:this.pageConfig.pageSize,
        appId:this.account.appId
      }
			let res = await this.$fetch(
				"wechat_user_page_list",
        {
          ...postData,
          ...this.searchForm
        }
			);
      this.list = res.data.records;
      this.pageConfig.totalCount = res.data.totalCount;
		},

    //获取标签数组
    async getLabel() {
			let res = await this.$fetch(
				"wechat_label",
        {
          appId:this.account.appId
        }
			);
      this.labelList = res.data;
		},

    
		handle_select_account(index) {
			this.account = this.officialAccounts[index];
			this.pageConfig.pageNum = 1;
			this.getTableData();
		},

    pageChange(e){
			this.pageConfig.pageNum = e.page;
			this.pageConfig.pageSize = e.limit;
			this.getTableData();
    },

    onSearch(data){
      let searchForm = {};
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
		  this.account = this.officialAccounts[0];
      this.searchForm = {};
    },

    //修改标签
    async handleEdit(row){
      await this.getLabel();
      if(!this.labelList.length){
        this.$message('暂无标签');
        return
      }
      this.labelOpenId = "";
      let labelList= this.labelList;
      for(let z in row.wechatUserTagModel){
        for(let i in labelList){
          if(labelList[i].labelName == row.wechatUserTagModel[z].labelName){
            labelList[i].active = true;
          }
        }
      }
      this.labelList = labelList;
      this.labelOpenId = row.openId;
      this.outerVisible = true;
    },

    //选择标签
    chooseLabel(index){
      let newValue = this.labelList[index];
      newValue.active = !newValue.active;
      this.$set(this.labelList,index,newValue);
    },

    async changeLabel(){
      let label = [];
      let index = this.list.findIndex(item => item.openId == this.labelOpenId);
      let wechatUserTagModel = [];
      this.labelList.forEach((item)=>{
        if(item.active){
          label.push({labelName:item.labelName,labelId:item.id,openId:this.labelOpenId});
          wechatUserTagModel.push(item);
        }
      })
      let postData = {};
      if(label.length){
        postData.userTagAddListRequest = JSON.stringify(label);
      }
      let res = await this.$fetch(
				"update_label",
        postData
			);
      if(res.code == 200){
        let item = this.list[index];
        item.wechatUserTagModel = wechatUserTagModel;
        this.$set(this.list,index,item);
        this.$message({
          message: res.msg,
          type: 'success'
        });
      }else{
        this.$message({
          message: res.msg,
          type: 'warning'
        });
      }
      this.outerVisible = false;
      
    },
    
	},


}
</script>

<style lang='scss' scoped>
.index{
  height: 100%;
}
.search{
  width: 100%;
  background: #fff;
  // display: flex;
  // align-items: center;
  margin-bottom: 15px;
  padding-left:15px;
  box-sizing: border-box;
}
.search-left{
  float: left;
  height: 71px;
  display: flex;
  align-items: center;
}
.search-form-box{
  margin-bottom: 0;
}
.select-accoumt {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  height: 33px;
  border: 1px solid #dcdfe6;
  padding:0 15px;
  white-space:nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  .logo {
    height: 20px;
    width: 20px;
    margin-right: 10px;
    object-fit: contain;
  }
}
.select-accoumt div{
  min-width: 150px;
  overflow:hidden;
  text-overflow:ellipsis; 
  white-space:nowrap;
}
.account-option {
	display: flex;
	align-items: center;
	cursor: pointer;
	padding: 4px 4px;
  min-width: 150px;
  overflow:hidden;
  text-overflow:ellipsis; 
  white-space:nowrap;
	&:hover {
		background-color: #f5f7fa;
	}
	.logo {
		width: 40px;
		height: 40px;
		object-fit: contain;
		margin-right: 10px;
	}
}
.el-form{
  // width: 100%;
  height: 100%;
  padding:20px;
  box-sizing: border-box;
  background:#fff;
}
.el-form-list{
  padding:3px 0;
}
.el-form-label{
  padding:1px 3px;
  color:#2C9EFF;
  border:1px solid #2C9EFF;
  margin:0 5px 5px 0;
  display: inline-block;
  font-size: 12px;
}
.el-form-label-null{
  font-size: 12px;
  color:#333;
}
.pages{
  padding:30px 0 70px 0;
}
.el-dialog__body{
  padding:20px 10px;
}
.el-dialog__header{
  padding:0 10px;
}
.label-title{
  width: 100%;
  text-align: center;
  position: relative;
  margin-bottom: 40px;
}
.label-title p{
  font-size: 18px;
  color:#333;
  font-weight: bold;
  margin:0;
}
.label-close{
  position:absolute;
  right:0;
  top:-10px;
  cursor:pointer;
}
.label-content{
  height: 500px;
  overflow-y: auto;
}
.label-list{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding:0 20px;
  box-sizing: border-box;
}
.label-list-box{
  width: 33%;
  flex:0 0 33%;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}
.label-list-radio{
  width:20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border:1px solid #707070;
  margin-right: 5px;
  box-sizing: border-box;
  cursor:pointer;
}
.label-list-title{
  font-size: 15px;
  color:#333;
}
.list-fn{
  display: flex;
  align-items: center;
  justify-content: center;
  padding:30px 0 20px 0;
}
.list-fn div{
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border:1px solid #707070;
  color:#333333;
  font-size: 14px;
  margin-right: 20px;
  cursor:pointer;
}
.list-fn div:nth-child(2){
  background:#26B957;
  color:#fff;
  border: none;
  margin-right: 0;
}
</style>