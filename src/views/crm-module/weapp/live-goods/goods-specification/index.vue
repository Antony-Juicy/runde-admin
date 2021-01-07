<template>
  <div class="goodsspecification-container">
      <div class="w-container">
        <div class="btn-wrapper">
          <el-button type="primary" size="small" @click="handleAdd">添加规格</el-button>
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
            <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button @click="handleDelete(scope.row)" type="text" size="small" style="color: #ec5b56" >删除</el-button>
          </template>
        </rd-table>
        <rd-dialog
          :title="specificationStatus ? '添加商品规格' : '编辑商品规格'"
          :dialogVisible="specificationVisible"
          :width="widthNew"
          @handleClose="closeSpecification('dataForm')"
          @submitForm="submitForm('dataForm')">
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
      </div>
  </div>
</template>

<script>

export default {
  name:"goods-specification",
  data(){
    return {
      tableData: [
        {
          specificationGroup: "中药",
          specification: "中药学专业知识一",
          price: 2999,
          priceH: 3000,
          inventory: 50,
          enquireClassOneID: "2021A01D0701",
          enquireSubjectNameOneID: "2021A01D0701",
          content: "药考通关宝典*1,习题册*1"
        }
      ],
      tableKey: [
        { name: '所属规格组',value: 'specificationGroup' },
        { name: '规格',value: 'specification' },
        { name: '价格',value: 'price' },
        { name: '划线价',value: 'priceH' },
        { name: '剩余库存量',value: 'inventory' },
        { name: '开通班型id',value: 'enquireClassOneID' },
        { name: '开通科目id',value: 'enquireSubjectNameOneID' },
        { name: '配套内容',value: 'content' },
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
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    pageChange(val) {
      console.log(val,'pagechange')
    },
    
    // 弹窗
    handleAdd() {
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
    submitForm(formName) {
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
        // key: Date.now()
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.goodsspecification-container {

}
</style>
