<template>
  <div class="index">

    <!-- 搜索栏 -->
    <div class="search">
        <div class="search-fn">
            <search-form ref="searchForm" :formOptions="formOptions" :showNum="5" @onSearch="onSearch" @onReset="onReset"></search-form>
        </div>
        <div class="search-create" @click="create()">新建渠道二维码</div>
    </div>
    
    
	<!-- 表格主体 -->
    <div class="el-form">
        <el-table :data="realList" style="width: 100%">
            <el-table-column prop="date" label="二维码名称" width="180">
                <template slot-scope="scope">
                    <div class="form">
                        <p class="form-text">{{scope.row.nickName}}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="总关注数" width="80">
                <template slot-scope="scope">
                    <div class="form">
                        <p class="form-text">{{scope.row.openId}}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="总取关数" width="80">
                <template slot-scope="scope">
                    <div class="form">
                        <p class="form-text">{{scope.row.openId}}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="用户标签">
                <template slot-scope="scope">
                    <div class="form form-label-list" v-if="scope.row.wechatUserTagModel.length">
                        <p class="form-label" v-for="item in scope.row.wechatUserTagModel" :key="item.id">{{item.labelName}}</p>
                    </div>
                    <div class="form" v-else>
                        <p class="form-label" style="border:none;">无标签</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="创建时间" width="80">
                <template slot-scope="scope">
                    <div class="form">
                        <p class="form-text">{{scope.row.openId}}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="失效时间" width="80">
                <template slot-scope="scope">
                    <div class="form">
                        <p class="form-text">{{scope.row.openId}}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <div class="form">
                        <p class="form-edit" @click="edit(scope.row)">查看</p>
                        <p class="form-edit" @click="edit(scope.row)">下载</p>
                        <p class="form-edit" @click="edit(scope.row)">数据</p>
                        <p class="form-edit" @click="edit(scope.row)">删除</p>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        
        <div class="pages">
            <Pagination :total="total" @pagination="changepageNum" :layout="'total, prev, pager, next'" />
        </div>
    
    </div>

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


    <!-- 二维码统计 -->
		<fullDialog class="accountLabel" :title="'渠道码数据统计'" v-model="staVisible" @change="staVisible = false">
			<statistical ref="accountLabel"></statistical>
		</fullDialog>



    <div>
      <input type="text" name="" id="">
    </div>


    
  </div>


</template>

<script>
import Pagination from "@/components/Pagination/index.vue";
import statistical from './statistical.vue';
import fullDialog from "@/components/FullDialog";

export default {
    name:'users',

    components: {
        Pagination,
        statistical,
        fullDialog
    },

    computed: {
        // 计算属性的 getter
        realList() {
            return this.list.slice((this.pageNum-1) * this.pageSize,(this.pageNum*this.pageSize-1))
        }
    },

    data() {
        return {
            list:[],
            pageNum:1,
            appId:'',
            hasNext:true,
            total:0,
            pageSize:10,
            searchForm:{},
            labelList:[],
            formOptions: [
                {
                    prop: "labelName",
                    element: "el-input",
                    placeholder: "请输入二维码名称",
                },
            ],
            outerVisible:false,
            labelId:'',
            labelOpenId:'',

            staVisible:false

        }
    },

    // async mounted() {
    //     let res = await this.$fetch(
    //         "get_official_accounts_list",
    //     );
    //     let official_accounts = {
    //         prop: "officialAccounts",
    //         element: "el-select",
    //         placeholder: "选择公众号",
    //         options: res.data.map(v => {
    //             return {
    //                 label: v.appName,
    //                 value: JSON.stringify(v)
    //             }
    //         }),
    //         // 需要指定一个公众号，默认就选第一个
    //         initValue: JSON.stringify(res.data[0])
    //     }
    //     this.formOptions.unshift(official_accounts);
    //     //默认第一项
    //     this.$refs.searchForm.addInitValue()
    //     this.appId = res.data[0].appId;
    //     // this.getTableData();
    //     // this.getLabel();
	// },

  methods: {

    //获取表格数据
		async getTableData() {
      if(this.pageNum == 1){
        this.list = [];
        this.hasNext = true;
      }
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
      this.total = res.data.totalCount;
      this.hasNext = res.data.hasNext;
		},

    //获取标签数组
    async getLabel() {
			let res = await this.$fetch(
				"wechat_label"
			);
      this.labelList = res.data;
		},

    changepageNum(e){
      if(e.page > this.pageNum && this.hasNext){
        this.pageNum = e.page;
        this.getTableData();
      }
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

    //修改标签
    edit(row){
      this.labelId = "";
      let labelList= this.labelList;
      for(let z in row.wechatUserTagModel){
        for(let i in labelList){
          if(labelList[i].labelName == row.wechatUserTagModel[z].labelName){
            labelList[i].active = true;
          }
        }
      }
      this.labelList = labelList;
      this.labelId = row.id;
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
      let index = this.list.findIndex(item => item.id == this.labelId && item.openId == this.labelOpenId);
      let wechatUserTagModel = [];
      this.labelList.forEach((item)=>{
        if(item.active){
          label.push({labelName:item.labelName,labelId:this.labelId,openId:this.labelOpenId});
          wechatUserTagModel.push(item);
        }
      })
      let res = await this.$fetch(
				"update_label",
        {
          userTagAddListRequest:JSON.stringify(label)
        }
			);
      if(res.code == 200){
        let item = this.list[index];
        item.wechatUserTagModel = wechatUserTagModel;
        this.$set(this.list,index,item);
      }
      this.outerVisible = false;
      this.$message(res.msg);
    },

    create(){
      this.staVisible = true;
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
    background:#fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 30px;
    box-sizing: border-box;
    margin-bottom: 15px;
}
.search-fn{
    flex:0 0 1;
    display: flex;
    align-items: center;
}
.search-form-box{
    margin-bottom: 0;
}
.search-create{
    width: 120px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color:#fff;
    background:#26B957;
    font-size: 12px;
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
.form-label-list{
  display: flex;
  flex-wrap: wrap;
  margin-bottom:0  !important;
}
.form-edit{
  font-size: 14px;
  color:#006FFF;
  cursor:pointer;
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