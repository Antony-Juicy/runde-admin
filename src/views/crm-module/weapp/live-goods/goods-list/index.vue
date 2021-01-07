<template>
  <div class="goodslist-container">
    <search-form :formOptions="formOptions" :showNum="7" @onSearch="onSearch"></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="openfullDialogChange">添加商品</el-button>
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :pageConfig="pageConfig"
        @select="handleSelect"
        @pageChange="pageChange">
        <template slot="goodsImg" slot-scope="scope">
          <img :src="scope.row.goodsImg || userLogoUrl" style="width:60px;height:60px;" alt="">
        </template>
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button @click="openfullDialogGroup(scope.row)" type="text" size="small">关联规格组</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleEdit(scope.row)" type="text" size="small">查看订单</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleEdit(scope.row)" type="text" size="small">评价</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleDelete(scope.row)" type="text" size="small" style="color: #ec5b56" >删除</el-button>
        </template>
      </rd-table>
      <fullDialog v-model="showDetail" title="" @change="fullDialogChange">
        <div class="w-container">
          <el-form ref="dataForm" :model="shopForm" :rules="addRules" label-width="120px">
            <el-form-item label="项目类型" prop="projectType">
              <el-select v-model="shopForm.projectType" placeholder="请选择/立减优惠/折扣优惠">
                <el-option label="执业药师" value="0"></el-option>
                <el-option label="健康管理师" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品名称" prop="projectName">
              <el-input v-model.trim="shopForm.shopName" autocomplete="off" placeholder="请输入商品名称" />
            </el-form-item>
            <el-form-item label="商品标签" prop="shopTag">
              <el-select v-model.trim="shopForm.shopTag" multiple filterable allow-create default-first-option placeholder="请选择标签，也可自行添加标签">
                <el-option v-for="item in shopOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品优惠券" prop="shopsCoupon">
              <el-select v-model.trim="shopForm.shopTag" filterable multiple placeholder="请选择优惠券">
                <el-option v-for="item in shopOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="虚拟购买数" prop="xnbuyCount">
              <el-input-number controls-position="right" v-model.trim ="shopForm.xnbuyCount" autocomplete="off" :min="0" style="width:100%;" placeholder="" />
            </el-form-item>
            <el-form-item label="实际购买数" prop="sjbuyCount">
              <el-input-number controls-position="right" v-model.trim ="shopForm.sjbuyCount" autocomplete="off" :min="0" style="width:100%;" placeholder="" />
            </el-form-item>
            <el-form-item label="快递运费" prop="yunfei">
              <el-input-number controls-position="right" v-model.trim ="shopForm.yunfei" autocomplete="off" :min="0" style="width:100%;" placeholder="" />
            </el-form-item>
            <el-form-item label="是否推荐" prop="recommend">
              <el-switch v-model.trim ="shopForm.recommend" active-color="#409EFF" inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item label="商品状态" prop="shopStatus">
              <el-radio v-model="shopForm.shopStatus" label="1">上架</el-radio>
              <el-radio v-model="shopForm.shopStatus" label="2">下架</el-radio>
            </el-form-item>
            <el-form-item label="商品缩略图(4:3)" prop="shopImg" class="icon-wrapper">
              <Upload-oss
                v-if="uploadOssElem"
                :objConfig="{ dir: 'web/runde_admin', project: 'icon_' }"
                :src.sync="shopForm.shopImg"
                @srcChangeFun="
                  (data) => {
                    shopForm.shopImg = data;
                    reloadElem('uploadOssElem');
                  }
                "
              />
            </el-form-item>
            <el-form-item label="商品展示图(16:9)" prop="shopImgBig" class="icon-wrapper">
              <Upload-oss
                v-if="uploadOssElem"
                :objConfig="{ dir: 'web/runde_admin', project: 'icon_' }"
                :src.sync="shopForm.shopImgBig"
                @srcChangeFun="
                  (data) => {
                    shopForm.shopImgBig = data;
                    reloadElem('uploadOssElem');
                  }
                "
              />
            </el-form-item>
            <el-form-item label="课程详情" prop="classDetail">
              <RdEditor/>
            </el-form-item>
          </el-form>
          <div class="btn-bottom">
            <el-button type="primary" @click="fullDialogChange(false)">返回</el-button>
            <el-button type="primary" @click="submitForm">立即创建/保存</el-button>
          </div>
        </div>
      </fullDialog>
      <fullDialog v-model="showGroup" title="标题标题标题标题" @change="fullDialogGroup">
        <el-button type="primary" size="small" @click="openAddGroup">选择规格组</el-button>
        <div class="w-container">

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
            :pageConfig="pageGroupConfig"
            @select="handleGroupSelect"
            @pageChange="pageGroupChange">
          </rd-table>
        </rd-dialog>
      </fullDialog>
    </div>
  </div>
</template>

<script>
import fullDialog from '@/components/FullDialog';
import UploadOss from "@/components/UploadOss";
import RdEditor from "@/components/RdEditor";
export default {
  name:"goods-list",
  components: {
    fullDialog,
    UploadOss,
    RdEditor
  },
  data(){
    return {
      showNum: 6,
      searchForm: {},
      formOptions: [
        { prop: 'goodsId', element: 'el-input', placeholder: '请输入商品id/名称' },
        { prop: 'project', element: 'el-select', placeholder: '请输入项目' },
        { prop: 'goodsname', element: 'el-input', placeholder: '请选择商品名称' },
        { prop: 'status', element: 'el-select', placeholder: '请选择状态' },
      ],
      tableData: [
        {
          goodsId: 12306,
          projectType: '执业药师',
          goodsImg: '',
          goodsName: '2022年最强最全的执业药师课程',
          goodsPrice: 1999,
          allSales: 500,
          status: '上架',
          createTime: '2022-01-01 00:00:00'
        }
      ],
      tableKey: [
        { name: '商品id',value: 'goodsId' },
        { name: '项目类型',value: 'projectType' },
        { name: '商品缩略图',value: 'goodsImg',operate: true,width: 100 },
        { name: '商品名称',value: 'goodsName' },
        { name: '商品价格',value: 'goodsPrice' },
        { name: '总销售量',value: 'allSales' },
        { name: '状态',value: 'status' },
        { name: '创建时间',value: 'createTime' },
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
      
      // 新增弹窗
      showDetail: false,
      uploadOssElem: true,
      shopForm: {
        projectType: '',
        shopName: '',
        shopsCoupon: '',
        shopTag: '',
        xnbuyCount: '',
        sjbuyCount: '',
        shopImg: '',
        shopImgBig: '',
        classDetail: '',
        yunfei: '',
        recommend: true,
        shopStatus: ''
      },
      shopOptions: [
        {
          value: 'HTML',
          label: 'HTML'
        }, {
          value: 'CSS',
          label: 'CSS'
        }, {
          value: 'JavaScript',
          label: 'JavaScript'
        }
      ],
      addRules: {
        projectType: [
          { required: true, message: "请选择类型", trigger: "blur" },
        ]
      },

      // 关联规格组弹窗
      showGroup: false,
      showAddGroup: false,
      widthGroup: "800px",
      searchGroupForm: {},
      optionsGroup: [
        { prop: 'groupName', element: 'el-input', placeholder: '请输入规格组名称' },
        { prop: 'groupRemark', element: 'el-input', placeholder: '请输入备注内容' },
      ],
      tableGroupData: [
        {
          groupName: "中药",
          groupCount: 4,
          groupRemark: '备注备注金牌通过班',
        }
      ],
      tableGroupKey: [
        { name: '规格组',value: 'groupName' },
        { name: '规格数量',value: 'groupCount' },
        { name: '备注',value: 'groupRemark' },
      ],
      pageGroupConfig: {
        totalCount: 20,
        pageNum: 1,
        pageSize: 10,
      },
    }
  },
  methods: {
    onSearch(val) {
      this.searchForm = {...val};
      console.log(val,this.searchForm , 'val---')
    },
    handleAdd() {
      console.log(666)
    },
    handleEdit() {
      console.log(886)
    },
    handleDelete() {
      console.log(996)
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    pageChange(val) {
      console.log(val,'pagechange')
    },

    // 新增弹窗
    openfullDialogChange() {
      this.showDetail = true;
    },
    fullDialogChange(val){
      this.showDetail = val;
    },
    // 上传组件
    reloadElem(dataElem) {
      // 重新加载组件
      this[dataElem] = false;
      this.$nextTick(() => {
        this[dataElem] = true;
      });
    },
    submitForm(formName) {
      console.log( 666);
      this.showDetail = false;
    },

    // 关联规格组弹窗
    openfullDialogGroup() {
      this.showGroup = true;
    },
    fullDialogGroup(val) {
      this.showGroup = val;
    },

    // 选择规格组弹窗
    onGroupSearch(val) {
      this.searchGroupForm = {...val};
      console.log(val,this.searchGroupForm , 'val---')
    },
    openAddGroup() {
      this.showAddGroup = true
    },
    closeAddGroup() {
      this.showAddGroup = false
    },
    submitGroupForm(formName) {
      console.log( 666);
      this.showAddGroup = false;
    },
    handleGroupSelect(rows) {
      console.log(rows, "rows---");
    },
    pageGroupChange(val) {
      console.log(val,'pagechange')
    },
  }
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
  }
}
.btn-bottom {
  width: 50%;
  margin-left: 7.5%;
}
</style>
