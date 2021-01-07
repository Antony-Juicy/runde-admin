<template>
  <div class="specification-group-container">
    <search-form :formOptions="formOptions" :showNum="showNum" @onSearch="onSearch"></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd">添加规则组</el-button>
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :pageConfig="pageConfig"
        @select="handleSelect"
        @pageChange="pageChange">
        <template slot="edit" slot-scope="scope">
          <el-button @click="openConfig(scope.row)" type="text" size="small">管理</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑规格</el-button>
        </template>
      </rd-table>
      <!-- 添加规则组 -->
      <rd-dialog
        :title="groupStatus ? '添加规则组' : '编辑规则组'"
        :dialogVisible="groupVisible"
        :width="widthNew"
        @handleClose="closeGroup('dataForm')"
        @submitForm="submitForm('dataForm')">
        <el-form ref="dataForm" :model="groupForm" label-width="100px">
          <el-form-item label="规则组名称" prop="groupName">
            <el-input v-model.trim="groupForm.groupName" autocomplete="off" placeholder="请输入规则组名称" />
          </el-form-item>
          <el-form-item label="项目类型" prop="projectType">
            <el-input v-model.trim="groupForm.projectType" autocomplete="off" placeholder="请输入项目类型" />
          </el-form-item>
          <el-form-item label="备注" prop="groupRemake">
            <el-input v-model.trim="groupForm.projecgroupRemaketType" autocomplete="off" placeholder="请输入备注" />
          </el-form-item>
          <el-form-item label="状态" prop="groupType">
            <el-radio v-model="groupForm.groupType" label="1">正常</el-radio>
            <el-radio v-model="groupForm.groupType" label="2">停用</el-radio>
          </el-form-item>
        </el-form>
      </rd-dialog>
      <!-- 添加规则组 -->
      <!-- 管理规格 -->
      <fullDialog v-model="showGroup" title="标题标题标题标题" @change="closeConfig">
        <el-button type="primary" size="small" @click="openAddConfig">添加规格</el-button>
        <rd-table
          :tableData="tableSpecificationData"
          :tableKey="tableSpecificationKey"
          :loading="loading"
          :fixedTwoRow="fixedTwoRow">
          <template slot="edit" slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </rd-table>
        <!-- 添加规格 -->
        <rd-dialog
          :title="specificationStatus ? '添加商品规格' : '编辑商品规格'"
          :dialogVisible="specificationVisible"
          :width="widthNew"
          append-to-body
          @handleClose="closeSpecification('dataForm')"
          @submitForm="submitSpecificationForm('dataForm')">
          <el-form ref="dataForm" :model="specificationForm" label-width="100px">
            <el-form-item label="规则组" prop="groupName">
              <el-select v-model="specificationForm.groupName" placeholder="请选择"></el-select>
            </el-form-item>
            <el-form-item label="规格名称" prop="specificationName">
              <el-input v-model.trim="specificationForm.specificationName" autocomplete="off" placeholder="请输入规则组名称" />
            </el-form-item>
            <el-form-item label="价格" prop="price">
              <el-input-number controls-position="right" v-model.trim ="specificationForm.price" autocomplete="off" :min="0" placeholder="" />
            </el-form-item>
            <el-form-item label="划线价" prop="priceH">
              <el-input-number controls-position="right" v-model.trim ="specificationForm.priceH" autocomplete="off" :min="0" placeholder="" />
            </el-form-item>
            <el-form-item label="剩余库存量" prop="inventory">
              <el-input-number controls-position="right" v-model.trim ="specificationForm.inventory" autocomplete="off" :min="0" placeholder="" />
            </el-form-item>
            <el-form-item label="开通的班型id" prop="enquireClassOneID">
              <el-input v-model.trim="specificationForm.enquireClassOneID" autocomplete="off" placeholder="请输入班型id" />
            </el-form-item>
            <el-form-item label="开通的科目id" prop="enquireSubjectNameOneID">
              <el-input v-model.trim="specificationForm.enquireSubjectNameOneID" autocomplete="off" placeholder="请输入科目id" />
            </el-form-item>
            <el-form-item
              v-for="(domain, index) in specificationForm.domains"
              :label="'配套内容' + index"
              :key="domain.key"
              :prop="'domains.' + index + '.value'"
            >
              <el-input v-model="domain.value" placeholder="内容名称" style="width: 40%;"></el-input>
              <!-- <el-input v-model="domain.num" placeholder="数量" style="width: 35%;"></el-input> -->
              <el-input-number controls-position="right" v-model ="domain.num" autocomplete="off" :min="0" placeholder="数量" />
              <el-button type="danger" size="small" @click.prevent="removeDomain(domain)">删除</el-button>
              <el-button type="primary" size="small" @click="addDomain">新增</el-button>
            </el-form-item>
          </el-form>
        </rd-dialog>
        <!-- 添加规格 -->
      </fullDialog>
      <!-- 管理规格 -->
    </div>
  </div>
</template>

<script>
import fullDialog from '@/components/FullDialog';
export default {
  name:"goods-specification-group",
  components: {
    fullDialog
  },
  data(){
    return {
      showNum: 6,
      searchForm: {},
      formOptions: [
        { prop: 'groupName', element: 'el-input', placeholder: '规则组名称' },
        { prop: 'project', element: 'el-select', placeholder: '选择项目' },
        { prop: 'status', element: 'el-select', placeholder: '选择状态' }
      ],
      tableData: [
        {
          groupName: "中药",
          project: "执业药师",
          status: "正常",
          num: 4,
          remake: "备注备注备注金牌通过班"
        }
      ],
      tableKey: [
        { name: '规则组名称',value: 'groupName' },
        { name: '项目类型',value: 'project' },
        { name: '规格数',value: 'num' },
        { name: '状态',value: 'status' },
        { name: '备注',value: 'remake' },
        { name: '操作',value: 'edit',operate: true }
      ],
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,

      // 添加规则组弹窗
      widthNew: "600px",
      groupVisible: false,
      groupStatus: true,
      groupForm: {
        groupName: '',
        groupType: '',
        projectType: '',
        groupRemake: ''
      },

      // 管理规格大弹窗
      showGroup: false,
      tableSpecificationData: [
        {
          specificationGroup: "中药",
          specification: "中药学专业知识一",
          price: 2999,
          priceH: 3000,
          inventory: 50,
          enquireClassOneID: "2021A01D0701",
          enquireSubjectNameOneID: "2021A01D0701",
          content: "药考通关宝典*1,习题册*1",
          status: "正常"
        }
      ],
      tableSpecificationKey: [
        { name: '规格',value: 'specification' },
        { name: '价格',value: 'price' },
        { name: '划线价',value: 'priceH',width: 120 },
        { name: '剩余库存量',value: 'inventory',width: 120 },
        { name: '开通班型id',value: 'enquireClassOneID' },
        { name: '开通科目id',value: 'enquireSubjectNameOneID' },
        { name: '配套内容',value: 'content' },
        { name: '状态',value: 'status' },
        { name: '操作',value: 'edit',operate: true,width: 120 }
      ],

      // 新增规格弹窗
      showSpecification: false,
      widthNew: "800px",
      specificationVisible: false,
      specificationStatus: true,
      specificationForm: {
        groupName: '',
        specificationName: '',
        price: '',
        priceH: '',
        inventory: '',
        enquireClassOneID: '',
        enquireSubjectNameOneID: '',
        domains: [{
          value: '',
          num: ''
        }],
      }
    }
  },
  methods: {
    onSearch(val) {
      this.searchForm = {...val};
      console.log(val,this.searchForm , 'val---')
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    pageChange(val) {
      console.log(val,'pagechange')
    },
    
    // 添加规则组弹窗
    handleAdd() {
      console.log(9999)
      this.groupVisible = true;
    },
    handleEdit() {
      console.log(886)
    },
    closeGroup(formName) {
      this.groupVisible = false;
      // this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      console.log(this.groupForm, 666);
      this.closeGroup("dataForm")
    },

    //管理规格大弹窗
    openConfig() {
      this.showGroup = true;
    },
    closeConfig(val) {
      this.showGroup = val;
    },
    
    // 新增规格弹窗
    openAddConfig() {
      console.log(9999)
      this.specificationVisible = true;
    },
    handleEdit() {
      console.log(886)
    },
    handleDelete() {
      console.log(996)
    }, 
    closeSpecification(formName) {
      this.specificationVisible = false;
      this.specificationForm.domains[0].num = 0 // 手动把数量清零
      this.$refs[formName].resetFields();
    },
    submitSpecificationForm(formName) {
      console.log(this.specificationForm, 666);
      this.closeSpecification("dataForm")
    },
    removeDomain(item) {
      var index = this.specificationForm.domains.indexOf(item)
      if (index !== -1) {
        this.specificationForm.domains.splice(index, 1)
      }
    },
    addDomain() {
      this.specificationForm.domains.push({
        value: '',
        num: '',
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.specification-group-container {

}
</style>
