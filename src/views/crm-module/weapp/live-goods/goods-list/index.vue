<template>
  <div class="goodslist-container">
    <search-form :formOptions="formOptions" :showNum="7" @onSearch="onSearch"></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd">添加商品</el-button>
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :pageConfig.sync="pageConfig"
        @select="handleSelect"
        @pageChange="pageChange">
        <template slot="goodsThumbnail" slot-scope="scope">
          <img :src="scope.row.goodsThumbnail || userLogoUrl" style="width:60px;height:60px;" alt="">
        </template>
        <template slot="goodsStatus" slot-scope="scope">
          <span>{{ scope.row.goodsStatus | goodsStatusFilter }}</span>
        </template>
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button @click="openfullDialogGroup(scope.row)" type="text" size="small">关联规则组</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button @click="goOrders(scope.row)" type="text" size="small">查看订单</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleComment(scope.row)" type="text" size="small">评价</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleDelete(scope.row)" type="text" size="small" style="color: #ec5b56" >删除</el-button>
        </template>
      </rd-table>
      <fullDialog v-model="goodsVisible" :title="goodsStatusVisible ? '添加商品' : '编辑商品'" @change="fullDialogChange">
        <div class="w-container" v-if="goodsVisible">
          <el-form ref="dataForm" :model="goodsForm" :rules="rules" label-width="120px">
            <el-form-item label="商品名称" prop="goodsName">
              <el-input v-model.trim="goodsForm.goodsName" autocomplete="off" placeholder="请输入商品名称" />
            </el-form-item>
            <el-form-item label="项目类型" prop="typeId">
              <el-select v-model="goodsForm.typeId" :disabled="goodsStatusVisible ? false : true" clearable placeholder="请选择">
                <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品标签" prop="goodsLabels">
              <el-select v-model.trim="goodsForm.goodsLabels" multiple filterable allow-create default-first-option placeholder="请选择标签，也可自行添加标签">
                <el-option v-for="item in labelOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品优惠券" prop="couponIds">
              <el-select @change="changCoupon" v-model="goodsForm.couponIds" filterable multiple placeholder="请选择优惠券">
                <el-option v-for="item in couponOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="虚拟购买数" prop="initialBuyNumber">
              <el-input-number controls-position="right" v-model.trim ="goodsForm.initialBuyNumber" autocomplete="off" :min="0" style="width:100%;" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="实际购买数" prop="realBuyNumber">
              <el-input-number controls-position="right" v-model.trim ="goodsForm.realBuyNumber" autocomplete="off" :min="0" :disabled="true" style="width:100%;" placeholder="" />
            </el-form-item>
            <el-form-item label="快递运费" prop="freight">
              <el-input-number controls-position="right" v-model.trim ="goodsForm.freight" autocomplete="off" :min="0" style="width:100%;" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="是否推荐" prop="recommend">
              <el-switch v-model="goodsForm.recommend"></el-switch>
              <!-- <el-radio v-model.trim="goodsForm.recommend" :label="true">是</el-radio>
              <el-radio v-model.trim="goodsForm.recommend" :label="false">否</el-radio> -->
            </el-form-item>
            <el-form-item label="商品状态" prop="goodsStatus">
              <el-radio v-model.trim="goodsForm.goodsStatus" label="Open">上架</el-radio>
              <el-radio v-model.trim="goodsForm.goodsStatus" label="Close">下架</el-radio>
            </el-form-item>
            <el-form-item label="商品缩略图(4:3)" prop="goodsThumbnail" class="icon-wrapper">
              <Upload-oss
                v-if="uploadOssElem"
                :objConfig="{ dir: 'web/runde_admin', project: 'icon_' }"
                :src.sync="goodsForm.goodsThumbnail"
                @srcChangeFun="
                  (data) => {
                    goodsForm.goodsThumbnail = data;
                    reloadElem('uploadOssElem');
                  }
                "
              />
            </el-form-item>
            <el-form-item label="商品展示图(16:9)" prop="goodsExhibitionImage" class="icon-wrapper">
              <Upload-oss
                v-if="uploadOssElem2"
                :objConfig="{ dir: 'web/runde_admin', project: 'icon_' }"
                :src.sync="goodsForm.goodsExhibitionImage"
                @srcChangeFun="
                  (data) => {
                    goodsForm.goodsExhibitionImage = data;
                    reloadElem('uploadOssElem2');
                  }
                "
              />
            </el-form-item>
            <el-form-item label="课程详情" prop="goodsDetail">
              <RdEditor :quillContent="quillContent" @change="changeEditor" />
            </el-form-item>
          </el-form>
          <div class="btn-bottom">
            <el-button type="primary" @click="fullDialogChange(false)">返回</el-button>
            <el-button type="primary" :loading="btnLoading" @click="submitForm" >立即创建/保存</el-button>
          </div>
        </div>
      </fullDialog>
      <fullDialog v-model="showGroup" :title="showGroupTitle" @change="showGroup = false">
        <!-- <el-button type="primary" size="small" @click="openAddGroup">选择规格组</el-button>
        <div class="w-container">
          <div v-for="item in 2" :key="item" style="margin-bottom:10px;">
            <div style="padding: 0 20px;height: 40px; border: 1px solid #EBEEF5; line-height:40px;background-color: rgb(242, 242, 242);">
              标题栏
              <span style="float:right;padding-right:20px;">
                共1个规格
                <el-button @click="handleDelete()" type="text" size="small" style="margin-left:20px; color: #ec5b56" >删除</el-button>
              </span>
            </div>
            <rd-table
              :tableData="tableData"
              :tableKey="tableKey"
              :loading="loading"
              :fixedTwoRow="fixedTwoRow">
            </rd-table>
          </div>
        </div>
        <rd-dialog
          title="选择规格组"
          :dialogVisible="showAddGroup"
          :width="widthGroup"
          append-to-body
          @handleClose="closeAddGroup('dataForm')"
          @submitForm="submitGroupForm('dataForm')">
          <search-form :formOptions="optionsGroup" @onSearch="onGroupSearch"></search-form>
          <rd-table
            :tableData="tableGroupData"
            :tableKey="tableGroupKey"
            :loading="loading"
            :fixedTwoRow="fixedTwoRow"
            :multiple="true"
            :pageConfig.sync="pageGroupConfig"
            @select="handleGroupSelect"
            @pageChange="pageGroupChange">
          </rd-table>
        </rd-dialog> -->
        <Rule-Group ref="rulegroup" :goodsId="goodsId"  @close="showGroup = false" @refresh="refresh" v-if="showGroup"></Rule-Group>
      </fullDialog>
      <fullDialog v-model="commentVisible" title="评论管理" @change="commentVisible = false">
        <Comment-Page ref="comment" :goodsId="goodsId" @close="commentVisible = false" @refresh="refresh" v-if="commentVisible"></Comment-Page>
      </fullDialog>
    </div>
  </div>
</template>

<script>
import fullDialog from '@/components/FullDialog';
import UploadOss from "@/components/UploadOss";
import RdEditor from "@/components/RdEditor";
import RuleGroup from "./rule-group";
import CommentPage from "./comment";
export default {
  name:"goods-list",
  components: {
    fullDialog,
    UploadOss,
    RdEditor,
    RuleGroup,
    CommentPage
  },
  data(){
    return {
      showNum: 6,
      searchForm: {},
      formOptions: [
        { prop: 'goodsId', element: 'el-input', placeholder: '请输入商品id' },
        { prop: 'typeId', element: 'el-select', placeholder: '请选择项目' },
        { prop: 'goodsName', element: 'el-input', placeholder: '请输入商品名称' },
        { 
          prop: 'goodsStatus',
          element: 'el-select',
          placeholder: '请选择状态',
          options: [
            {
              label: "上架",
              value: "Open",
            },
            {
              label: "下架",
              value: "Close",
            },
          ],
        },
      ],
      tableData: [],
      tableKey: [
        { name: '商品id',value: 'goodsId' },
        { name: '项目类型',value: 'typeName' },
        { name: '商品缩略图',value: 'goodsThumbnail',operate: true,width: 100 },
        { name: '商品名称',value: 'goodsName' },
        { name: '规则组数',value: 'goodsItemGroupCount' },
        { name: '商品价格',value: 'goodsPrices' },
        { name: '总销售量',value: 'totalSalesCount' },
        { name: '状态',value: 'goodsStatus',operate: true },
        { name: '创建时间',value: 'createAt' },
        { name: '操作',value: 'edit',operate: true,width: 280 }
      ],
      userLogoUrl: require('@/assets/userlogo.png'),
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,
      btnLoading: false,
      goodsId: '', // 商品id-公用
      goodsname: '', // 商品名称-公用
      
      // 新增弹窗
      goodsVisible: false,
      goodsStatusVisible: true,
      uploadOssElem: true,
      uploadOssElem2: true,
      goodsForm: {
        typeId: '', // 项目类型
        goodsName: '', // 商品名称
        couponIds: [], // 优惠券
        goodsLabels: [], // 商品标签
        initialBuyNumber: '', // 虚拟购买数
        realBuyNumber: 0, // 实际购买数
        goodsThumbnail: '', // 缩略图
        goodsExhibitionImage: '', // 展示图
        goodsDetail: '', // 商品简介
        freight: '', // 运费
        recommend: true, // 是否推荐
        goodsStatus: '' // 上下架
      },
      quillContent: "uuuu",
      typeOptions: [], // 项目类型
      couponOptions: [], // 商品优惠券
      labelOptions: [
        // {
        //   value: 'HTML',
        //   label: 'HTML'
        // }, {
        //   value: 'CSS',
        //   label: 'CSS'
        // }, {
        //   value: 'JavaScript',
        //   label: 'JavaScript'
        // }
      ], // 商品标签
      rules: {
        goodsName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {  max: 25, message: '长度不多于25个字符', trigger: 'blur' }
        ],
        typeId: [
          { required: true, message: "请选择类型", trigger: "blur" },
        ],
        freight: [
          { required: true, message: "请输入运费", trigger: "blur" }
        ],
        recommend: [
          { required: true, message: "请选择", trigger: "blur" }
        ],
        goodsStatus: [
          { required: true, message: "请选择", trigger: "blur" }
        ],
        goodsThumbnail: [
          { required: true, message: "请上传缩略图", trigger: "blur" }
        ],
        goodsExhibitionImage: [
          { required: true, message: "请上传商品展示图", trigger: "blur" }
        ]
      },

      // 关联规格组弹窗
      showGroup: false,
      showGroupTitle: '',
      // showAddGroup: false,
      // widthGroup: "800px",
      // searchGroupForm: {},
      // optionsGroup: [
      //   { prop: 'groupName', element: 'el-input', placeholder: '请输入规格组名称' },
      //   { prop: 'groupRemark', element: 'el-input', placeholder: '请输入备注内容' },
      // ],
      // tableGroupData: [
      //   {
      //     groupName: "中药",
      //     groupCount: 4,
      //     groupRemark: '备注备注金牌通过班',
      //   }
      // ],
      // tableGroupKey: [
      //   { name: '规格组',value: 'groupName' },
      //   { name: '规格数量',value: 'groupCount' },
      //   { name: '备注',value: 'groupRemark' },
      // ],
      // pageGroupConfig: {
      //   totalCount: 20,
      //   pageNum: 1,
      //   pageSize: 10,
      // },

      // 评论弹窗
      commentVisible: false,
    }
  },
  mounted () {
    this.getTableData()
    this.getTypeData();
    this.getCouponData();
  },
  methods: {
    onSearch(val) {
      this.searchForm = {...val};
      if(this.searchForm.goodsId && isNaN(this.searchForm.goodsId) ){
        this.$message.warning("请输入正确的商品id")
        return
      }
      this.pageConfig.pageNum = 1;
      this.getTableData();
      console.log(val,this.searchForm , 'val---')
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    // 获取商品列表数据
    getTableData(params) {
      const loading = this.$loading({
        lock: true,
        target: ".el-table",
      });
      this.$fetch(
        "goods_list",
        params || {
          loginUserId: this.$common.getUserId(),
          ...this.pageConfig,
          ...this.searchForm
        }
      ).then((res) => {
        this.tableData = res.data.records;
        this.pageConfig.totalCount = res.data.totalCount;
        setTimeout(() => {
          loading.close();
        }, 200);
      });
    },
    // 分页查询
    pageChange(val) {
      console.log(val,'pagechange')
      this.getTableData({
        pageNum: (val && val.page) || 1,
        pageSize: (val && val.limit) || 10,
      });
    },

    // 新增商品
    handleAdd() {
      this.goodsVisible = true;
      this.goodsStatusVisible = true;
      for (const key in this.goodsForm) {
        this.goodsForm[key] = "";
      }
      this.goodsForm.recommend = true
      // this.getTypeData();
      // this.getCouponData();
    },
    // 编辑商品
    handleEdit(row) {
      this.goodsVisible = true;
      this.goodsStatusVisible = false;
      this.getTypeData()
      this.getCouponData();
      this.$fetch(
        "goods_getList",
        {
          loginUserId: this.$common.getUserId(),
          goodsId: row.goodsId
        }
      ).then((res) => {
        this.goodsForm = res.data
        this.quillContent = res.data.goodsDetail
        this.goodsForm.couponIds = res.data.coupons.map(item => item.couponId)
      });
    },
    changCoupon() {
      this.$forceUpdate();
    },
    // 删除商品
    handleDelete(row) {
      console.log(996)
      let info = row.goodsName;
      this.$confirm(`此操作将删除${info}优惠券, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$fetch("goods_delete", {
            goodsId: row.goodsId,
            loginUserId: this.$common.getUserId(),
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
    fullDialogChange(val){
      this.goodsVisible = val;
      // this.$refs[formName].resetFields();
    },
    // 上传图片
    reloadElem(dataElem) {
      // 重新加载组件
      this[dataElem] = false;
      this.$nextTick(() => {
        this[dataElem] = true;
      });
    },
    changeEditor(val) {
      console.log(val,996)
      this.goodsForm.goodsDetail = val;
    },
    // 获取项目类型
    getTypeData() {
      this.$fetch(
        "projectType_normalList",
        {
          loginUserId: this.$common.getUserId()
        }
      ).then((res) => {
        this.typeOptions = res.data.map((item) => ({
          label: item.typeName,
          value: item.typeId,
        }));
        this.formOptions.splice(1,1,{ prop: 'typeId', element: 'el-select', placeholder: '选择项目', options: this.typeOptions })
      });
    },
    // 获取优惠券
    getCouponData() {
      this.$fetch(
        "coupon_getGoods",
        {
          loginUserId: this.$common.getUserId()
        }
      ).then((res) => {
        this.couponOptions = res.data.map((item) => ({
          label: item.couponName,
          value: item.couponId
        }))
      });
    },
    // 提交新增商品
    submitForm() {
      this.$refs.dataForm.validate((val, data) => {
        if(val) {
          this.goodsForm.couponIds = JSON.stringify(this.goodsForm.couponIds)
          this.goodsForm.goodsLabels = JSON.stringify(this.goodsForm.goodsLabels)
          if(this.goodsStatusVisible) {
            // 新增
            this.$fetch("goods_add", {
              ...this.goodsForm,
              loginUserId: this.$common.getUserId()
            }).then((res) => {
              this.$message({
                message: "提交成功",
                type: "success",
              });
              this.getTableData();
              this.fullDialogChange();
            });
          } else {
            // 编辑
            this.$fetch("goods_update", {
              ...this.goodsForm,
              loginUserId: this.$common.getUserId()
            }).then((res) => {
              this.$message({
                message: "编辑成功",
                type: "success",
              });
              this.getTableData();
              this.fullDialogChange();
            });
          }
        }
      });
    },

    goOrders(row) {
      this.$router.push({
        path: '/crm-module/weapp/live-details/goods-orders',
        query: {
          goodsName: row.goodsName,
        } 
      })
    },
    


    // 关联规格组弹窗
    openfullDialogGroup(row) {
      this.showGroup = true;
      this.goodsId = row.goodsId;
      this.showGroupTitle = row.goodsName
    },
    // fullDialogGroup(val) {
    //   this.showGroup = val;
    // },

    // // 选择规格组弹窗
    // onGroupSearch(val) {
    //   this.searchGroupForm = {...val};
    //   console.log(val,this.searchGroupForm , 'val---')
    // },
    // openAddGroup() {
    //   this.showAddGroup = true
    // },
    // closeAddGroup() {
    //   this.showAddGroup = false
    // },
    // submitGroupForm(formName) {
    //   console.log( 666);
    //   this.showAddGroup = false;
    // },
    // handleGroupSelect(rows) {
    //   console.log(rows, "rows---");
    // },
    // pageGroupChange(val) {
    //   console.log(val,'pagechange')
    // },

    // 评论
    handleComment(row) {
      this.commentVisible = true;
      this.goodsId = row.goodsId;
      this.goodsname = row.goodsname;
    },
    refresh(){
      this.getTableData();
    },
  },
  filters: {
    goodsStatusFilter(status){
      switch(status){
        case "Open":
          return '上架';
        case "Close":
          return '下架';
        default:
          return '';
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.goodslist-container {
  /deep/ {
    .el-form-item__content {
      width: 400px;
    }
    .el-divider--vertical {
      margin: 0 4px;
    }
    .img180 {
      width: 100px;
      height: 100px;
    }
    .el-select-dropdown__empty {
      width: 120px;
    }
  }
}
.btn-bottom {
  width: 50%;
  margin-left: 7.5%;
}
</style>
