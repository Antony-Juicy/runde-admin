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
        :multiple="true"
        :pageConfig="pageConfig"
        @select="handleSelect"
        @pageChange="pageChange">
      </rd-table>
      <fullDialog v-model="showDetail" title="" @change="fullDialogChange">
        <el-steps :active="active" :space="1000" finish-status="success">
          <el-step title="1.商品基本信息"></el-step>
          <el-step title="2.设置商品规格描述"></el-step>
        </el-steps>

        <div class="w-container mt-15" v-show="active == 0">
          <el-form ref="dataForm" :model="shopForm" :rules="addRules" label-width="120px">
            <el-form-item label="项目类型" prop="projectType">
              <el-select v-model="shopForm.projectType" placeholder="请选择/立减优惠/折扣优惠">
                <el-option label="执业药师" value="0"></el-option>
                <el-option label="健康管理师" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品名称" prop="projectName">
              <el-input v-model.trim="shopForm.shopName" autocomplete="off" placeholder="请输入优惠券名称" />
            </el-form-item>
            <el-form-item label="商品标签" prop="shopTag">
              <el-select v-model.trim="shopForm.shopTag" multiple filterable allow-create default-first-option placeholder="请选择标签，也可自行添加标签">
                <el-option v-for="item in shopOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="虚拟购买数" prop="xnbuyCount">
              <el-input-number controls-position="right" v-model.trim ="shopForm.xnbuyCount" autocomplete="off" :min="0" placeholder="" />
            </el-form-item>
            <el-form-item label="实际购买数" prop="sjbuyCount">
              <el-input-number controls-position="right" v-model.trim ="shopForm.sjbuyCount" autocomplete="off" :min="0" placeholder="" />
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
            <el-form-item label="快递运费" prop="yunfei">
              <el-input-number controls-position="right" v-model.trim ="shopForm.yunfei" autocomplete="off" :min="0" placeholder="" />
            </el-form-item>
            <el-form-item label="是否推荐" prop="recommend">
              <el-switch v-model.trim ="shopForm.recommend" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item label="商品状态" prop="shopStatus">
              <el-select v-model="shopForm.shopStatus" placeholder="请选择/上架/下架">
                <el-option label="上架" value="0"></el-option>
                <el-option label="下架" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="btn-bottom">
            <el-button type="primary" @click="next">下一步</el-button>
          </div>
        </div>
        <div class="step-two" v-show="active == 1">
          描述描述描述描述描述描述描述描述描述
          <div class="btn-bottom">
            <el-button type="primary" @click="prev">上一步</el-button>
            <el-button type="primary" @click="submitForm">保存</el-button>
          </div>
        </div>
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
      tableData: [],
      tableKey: [
        { name: '商品id',value: 'goodsId' },
        { name: '项目类型',value: 'projectType' },
        { name: '商品缩略图',value: 'goodsImg' },
        { name: '商品名称',value: 'goodsName' },
        { name: '商品价格',value: 'goodsPrice' },
        { name: '总销售量',value: 'allSales' },
        { name: '状态',value: 'status' },
        { name: '创建时间',value: 'createTime' },
        { name: '操作',value: 'edit',operate: true,width: 120 }
      ],
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,
      
      // 弹窗
      showDetail: false,
      active: 0,
      uploadOssElem: true,
      shopForm: {
        projectType: '',
        shopName: '',
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
      }
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
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    pageChange(val) {
      console.log(val,'pagechange')
    },

    // 全屏弹窗
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
    prev() {
      --this.active
    },
    next() {
      if (this.active++ > 1) {
        this.active = 0;
      }
    },
    submitForm(formName) {
      console.log( 666);
      this.active = 0;
      this.showDetail = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.goodslist-container {
  /deep/ {
    .el-form-item__content {
      width: 400px;
    }
  }
}
.btn-bottom {
  width: 50%;
  margin: 0 45%;
}
</style>
