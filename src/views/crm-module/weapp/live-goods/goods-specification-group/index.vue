<template>
  <div class="specification-group-container">
    <search-form :formOptions="formOptions" :showNum="showNum" @onSearch="onSearch"></search-form>
    <div class="w-container">
      <div class="btn-wrapper">
        <el-button type="primary" size="small" @click="handleAdd">添加规格组</el-button>
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :loading="loading"
        :fixedTwoRow="fixedTwoRow"
        :pageConfig.sync="pageConfig"
        @select="handleSelect"
        @pageChange="pageChange">
        <template slot="goodsItemGroupType" slot-scope="scope">
          <span>{{ scope.row.goodsItemGroupType | goodsItemGroupTypeFilter }}</span>
        </template>
        <template slot="goodsGroupStatus" slot-scope="scope">
          <span>{{ scope.row.goodsGroupStatus | Filter }}</span>
        </template>
        <template slot="edit" slot-scope="scope">
          <el-button @click="openConfig(scope.row)" type="text" size="small">管理</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑规格组</el-button>
        </template>
      </rd-table>
      <!-- 添加规格组 -->
      <rd-dialog
        :title="groupVisibleStatus ? '添加规格组' : '编辑规格组'"
        :dialogVisible="groupVisible"
        :width="widthNew"
        @handleClose="closeGroup('dataForm')"
        @submitForm="submitForm('dataForm')">
        <el-form ref="dataForm" :model="groupForm" :rules="rules" label-width="100px">
          <el-form-item label="规格组名称" prop="goodsGroupName">
            <el-input v-model.trim="groupForm.goodsGroupName" autocomplete="off" placeholder="请输入规格组名称" />
          </el-form-item>
          <el-form-item label="规格组分类" prop="goodsItemGroupType">
            <el-select v-model.trim="groupForm.goodsItemGroupType" :disabled="groupVisibleStatus ? false : true" placeholder="请选择商品类型">
              <el-option label="课程" value="Course"></el-option>
              <el-option label="图书" value="Book"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目类型" prop="typeId">
            <el-cascader
              style="width:100%;"
              v-model.trim="groupForm.typeId"
              :disabled="groupVisibleStatus ? false : true"
              :options="typeOptions"
              :props="{ checkStrictly: true }"
              :placeholder="groupVisibleStatus ? '请选择项目类型' : '暂无'"
              clearable>
            </el-cascader>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model.trim="groupForm.remark" autocomplete="off" placeholder="请输入备注" />
          </el-form-item>
          <el-form-item label="状态" prop="goodsGroupStatus">
            <el-radio v-model="groupForm.goodsGroupStatus" label="Normal">正常</el-radio>
            <el-radio v-model="groupForm.goodsGroupStatus" label="Disable">停用</el-radio>
          </el-form-item>
        </el-form>
      </rd-dialog>
      <!-- 添加规格组 -->
      <!-- 管理规格 -->
      <fullDialog v-model="showGroup" :title="showGroupTitle" @change="closeConfig">
        <div class="btn-wrapper">
          <el-button type="primary" size="small" @click="handleAddRule">添加规格</el-button>
        </div>
        <rd-table
          :tableData="tableRuleData"
          :tableKey="tableRuleKey"
          :loading="loading"
          :fixedTwoRow="fixedTwoRow">
          <template slot="goodsItemStatus" slot-scope="scope">
            <span>{{ scope.row.goodsItemStatus | Filter }}</span>
          </template>
          <template slot="edit" slot-scope="scope">
            <el-button type="text" size="small" @click="handleEditRule(scope.row)">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" size="small" @click="handleDeleteRule(scope.row)">删除</el-button>
          </template>
        </rd-table>
        <!-- 添加规格 -->
        <rd-dialog
          :title="ruleStatus ? '添加商品规格' : '编辑商品规格'"
          :dialogVisible="ruleVisible"
          :width="widthNew"
          append-to-body
          @handleClose="closeRule('dataRuleForm')"
          @submitForm="submitRuleForm('dataRuleForm')">
          <el-form ref="dataRuleForm" :model="ruleForm" :rules="gzRules" label-width="120px">
            <el-form-item label="规格名称" prop="goodsItemName">
              <el-input v-model.trim="ruleForm.goodsItemName" autocomplete="off" placeholder="请输入规格组名称" />
            </el-form-item>
            <el-form-item label="价格" prop="salesPrice">
              <el-input-number controls-position="right" v-model.trim ="ruleForm.salesPrice" autocomplete="off" :min="0" placeholder="" />
            </el-form-item>
            <el-form-item label="划线价" prop="originalPrice">
              <el-input-number controls-position="right" v-model.trim ="ruleForm.originalPrice" autocomplete="off" :min="0" placeholder="" />
            </el-form-item>
            <el-form-item label="活动编码" prop="activityCode" v-if="this.showGroupTpye == 'Book'">
              <el-input v-model.trim="ruleForm.activityCode" autocomplete="off" @input="ruleForm.activityCode = String(ruleForm.activityCode).replace(/[^\d]/g,'')" placeholder="请输入活动编码" />
            </el-form-item>
            <el-form-item label="科目名称" prop="subjectName" v-if="this.showGroupTpye == 'Book'">
              <el-input v-model.trim="ruleForm.subjectName" autocomplete="off" placeholder="请输入规格组名称" />
            </el-form-item>
            <el-form-item label="开通的班型id" prop="openClassId" v-if="this.showGroupTpye == 'Course'">
              <el-input v-model.trim="ruleForm.openClassId" autocomplete="off" @input="ruleForm.openClassId = String(ruleForm.openClassId).replace(/[^\d]/g,'')" placeholder="请输入班型id" />
            </el-form-item>
            <el-form-item label="开通的班型名称" prop="openClassName" v-if="this.showGroupTpye == 'Course'">
              <el-input v-model.trim="ruleForm.openClassName" autocomplete="off" placeholder="请输入班型名称" />
            </el-form-item>
            <el-form-item label="开通的课程id" prop="openSubjectId" v-if="this.showGroupTpye == 'Course'">
              <el-input v-model.trim="ruleForm.openSubjectId" autocomplete="off" @input="ruleForm.openSubjectId = String(ruleForm.openSubjectId).replace(/[^\d]/g,'')" placeholder="请输入课程id" />
            </el-form-item>
            <el-form-item label="开通的课程名称" prop="openSubjectName" v-if="this.showGroupTpye == 'Course'">
              <el-input v-model.trim="ruleForm.openSubjectName" autocomplete="off" placeholder="请输入课程名称" />
            </el-form-item>
            <el-form-item
              v-for="(domain, index) in ruleForm.ancillaryGoods"
              :label="'配套内容' + index"
              :key="domain.key"
              :prop="'ancillaryGoods.' + index + '.value'"
            >
              <el-input v-model="domain.value" placeholder="内容名称" style="width: 40%;"></el-input>
              <!-- <el-input v-model="domain.num" placeholder="数量" style="width: 35%;"></el-input> -->
              <el-input-number controls-position="right" v-model ="domain.num" autocomplete="off" :min="0" placeholder="数量" />
              <el-button type="danger" size="small" @click.prevent="removeDomain(domain)">删除</el-button>
              <el-button type="primary" size="small" @click="addDomain">新增</el-button>
            </el-form-item>
            <el-form-item label="商品状态" prop="goodsItemStatus">
              <el-radio v-model.trim="ruleForm.goodsItemStatus" label="Normal">正常</el-radio>
              <el-radio v-model.trim="ruleForm.goodsItemStatus" label="Disable">停用</el-radio>
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
        { prop: 'goodsGroupName', element: 'el-input', placeholder: '规格组名称' },
        { prop: 'typeId', element: 'el-cascader', placeholder: '选择项目类型', props: { checkStrictly: true } },
        { 
          prop: 'goodsItemGroupType',
          element: 'el-select',
          placeholder: '请输入商品名称',
          options: [
            {
              label: "课程",
              value: "Course",
            },
            {
              label: "图书",
              value: "Book",
            },
          ],
        },
        { 
          prop: 'goodsGroupStatus',
          element: 'el-select',
          placeholder: '选择状态',
          options: [
            {
              label: "正常",
              value: "Normal",
            },
            {
              label: "停用",
              value: "Disable",
            },
          ],
        }
      ],
      tableData: [
        // {
        //   goodsGroupName: "中药",
        //   typeName: "执业药师",
        //   goodsGroupStatus: "正常",
        //   itemCount: 4,
        //   remark: "备注备注备注金牌通过班"
        // }
      ],
      tableKey: [
        { name: '规格组名称',value: 'goodsGroupName' },
        { name: '商品类型',value: 'goodsItemGroupType',operate: true },
        { name: '项目类型',value: 'typeName' },
        { name: '规格数',value: 'itemCount' },
        { name: '状态',value: 'goodsGroupStatus',operate: true },
        { name: '备注',value: 'remark' },
        { name: '操作',value: 'edit',operate: true,width: 140 }
      ],
      emptyText: '暂无数据',
      fixedTwoRow: true,
      pageConfig: {
        totalCount: 0,
        pageNum: 1,
        pageSize: 10,
      },
      loading: false,

      // 添加规格组弹窗
      widthNew: "600px",
      groupVisible: false,
      groupVisibleStatus: true,
      groupForm: {
        goodsGroupName: '',
        goodsItemGroupType: '',
        typeId: '',
        remark: '',
        goodsGroupStatus: ''
      },
      typeOptions: [], // 项目类型
      rules: {
        goodsGroupName: [
          { required: true, message: "请输入规格组名称", trigger: "blur" },
          {  max: 25, message: '长度不多于25个字符', trigger: 'blur' }
        ],
        goodsItemGroupType: [
          { required: true, message: "请选择规格组类型", trigger: "blur" }
        ],
        typeId: [
          { required: true, message: "请选择类型", trigger: "blur" }
        ],
        goodsGroupStatus: [
          { required: true, message: "请选择状态", trigger: "blur" }
        ]
      },

      // 管理规格大弹窗
      showGroup: false, // 规格展示
      showGroupTitle: '',
      tableRuleData: [
        {
          goodsItemName: "中药学专业知识一",
          salesPrice: 2999,
          originalPrice: 3000,
          inventory: 50,
          openClassId: "2021A01D0701",
          openSubjectId: "2021A01D0701",
          ancillaryGoods: ["药考通关宝典*1,习题册*1"],
          goodsItemStatus: "正常"
        }
      ],
      tableRuleKey: [
        { name: '规格',value: 'goodsItemName' },
        { name: '价格',value: 'salesPrice' },
        { name: '划线价',value: 'originalPrice' },
        // { name: '剩余库存量',value: 'inventory',width: 120 },
        { name: '开通班型id',value: 'openClassId' },
        { name: '开通班型名称',value: 'openClassName' },
        { name: '开通课程id',value: 'openSubjectId' },
        { name: '开通课程名称',value: 'openSubjectName' },
        { name: '配套内容',value: 'ancillaryGoods' },
        { name: '状态',value: 'goodsItemStatus',operate: true },
        { name: '操作',value: 'edit',operate: true,width: 120 }
      ],

      // 新增规格弹窗
      widthNew: "700px",
      ruleVisible: false,
      ruleStatus: true,
      currentGoodsGroupId: '',
      showGroupTpye: '',
      ruleForm: {
        goodsItemName: '',
        activityCode: '',
        subjectName:'',
        salesPrice: '',
        originalPrice: '',
        openClassId: '',
        openClassName: '',
        openSubjectId: '',
        openSubjectName: '',
        goodsItemStatus: '',
        ancillaryGoods: [
          {
            value: '',
            num: ''
          }
        ],
      },
      gzRules: {
        goodsItemName: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
          {  max: 25, message: '长度不多于25个字符', trigger: 'blur' }
        ],
        salesPrice: [
          { required: true, message: "请输入价格", trigger: "blur" }
        ],
        originalPrice: [
          { required: true, message: "请输入划线价(原价)", trigger: "blur" }
        ],
        activityCode: [
          { required: true, message: "请输入活动编码", trigger: "blur" }
        ],
        subjectName: [
          { required: true, message: "请输入科目名称", trigger: "blur" },
          {  max: 25, message: '长度不多于25个字符', trigger: 'blur' }
        ],
        // openClassId: [
        //   { required: true, message: "请输入班型id", trigger: "blur" }
        // ],
        // openClassName: [
        //   { required: true, message: "请输入班型名称", trigger: "blur" }
        // ],
        // openSubjectId: [
        //   { required: true, message: "请输入课程id", trigger: "blur" }
        // ],
        // openSubjectName: [
        //   { required: true, message: "请输入课程名称", trigger: "blur" }
        // ],
        goodsItemStatus: [
          { required: true, message: "请选择状态", trigger: "blur" }
        ]
      }
    }
  },
  mounted () {
    this.getTableData();
    this.getTypeData();
  },
  methods: {
    onSearch(val) {
      this.searchForm = {...val};
      this.pageConfig.pageNum = 1;
      this.getTableData();
      console.log(val,this.searchForm , 'val---')
    },
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    // 获取规格组列表数据
    getTableData(params={}) {
      return new Promise((resolve,reject)=>{
        let searchForm = JSON.parse(JSON.stringify(this.searchForm))
        if(this.searchForm.typeId) {
          searchForm.typeId = searchForm.typeId.pop()
        }
        this.$fetch(
          "goods_item_list",
          {
            ...this.pageConfig,
            ...searchForm,
            ...params
          }
        ).then((res) => {
          this.tableData = res.data.records;
          this.pageConfig.totalCount = res.data.totalCount;
          resolve();
        })
      })
    },
    pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.pageNum = val.page;
      this.pageConfig.pageSize = val.limit;
      this.getTableData();
    },
    
    // 添加规格组弹窗
    handleAdd() {
      this.groupVisible = true;
      this.groupVisibleStatus = true;
      for (const key in this.groupForm) {
        this.groupForm[key] = "";
      }
      // this.getTypeData();
    },
    handleEdit(row) {
      this.groupVisible = true;
      this.groupVisibleStatus = false;
      this.getTypeData();
      this.$fetch(
        "goods_item_getList",
        {
          goodsItemGroupId: row.goodsGroupId
        }
      ).then((res) => {
        this.groupForm = res.data
      });
    },
    closeGroup(formName) {
      this.groupVisible = false;
      this.$refs[formName].resetFields();
    },
    // 获取项目类型
    getTypeData() {
      this.$fetch(
        "projectType_select",
      ).then((res) => {
        // this.typeOptions = res.data.map((item) => ({
        //   label: item.typeName,
        //   value: item.typeId,
        // }));
        this.typeOptions = this.$common.getTypeTree((res.data))
        this.formOptions.splice(1,1,{ prop: 'typeId', element: 'el-cascader', placeholder: '选择项目类型',props: { checkStrictly: true }, options: this.typeOptions })
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          if(this.groupVisibleStatus) {
            // 新增
            if (this.groupForm.typeId != 0) {
              this.groupForm.typeId = this.groupForm.typeId.pop()
            } else {
              this.groupForm.typeId = 0
            }
            this.$fetch("goods_item_add", {
              ...this.groupForm,
            }).then((res) => {
              this.$message({
                message: "提交成功",
                type: "success",
              });
              this.getTableData();
              this.closeGroup("dataForm");
            });
          } else {
            // 编辑
            this.$fetch("goods_item_update", {
              ...this.groupForm,
            }).then((res) => {
              this.$message({
                message: "编辑成功",
                type: "success",
              });
              this.getTableData();
              this.closeGroup("dataForm");
            });
          }
        }
      });
    },

    //管理规格大弹窗
    openConfig(row) {
      console.log(row,'row---')
      this.showGroup = true;
      this.currentGoodsGroupId = row.goodsGroupId
      this.showGroupTitle = row.goodsGroupName
      this.showGroupTpye = 'Book'
      this.gitRuletableData(row.goodsGroupId)
    },
    closeConfig(val) {
      this.showGroup = val;
    },
    // 获取规则列表数据
    gitRuletableData(goodsGroupId) {
      return new Promise((resolve,reject)=>{
        this.$fetch(
          "goods_rule_list",
          {
            goodsItemGroupId: goodsGroupId
          }
        ).then((res) => {
          this.tableRuleData = res.data;
          resolve();
        })
      })
    },
    
    // 新增规格
    handleAddRule() {
      this.ruleVisible = true;
      this.ruleStatus = true;
    },
    // 编辑规格组
    handleEditRule(row) {
      this.ruleVisible = true;
      this.ruleStatus = false;
      this.$fetch(
        "goods_rule_getList",
        {
          goodsItemId: row.goodsItemId,
          goodsGroupId: this.currentGoodsGroupId
        }
      ).then((res) => {
        this.ruleForm = res.data
      });
    },
    // 删除规格
    handleDeleteRule(row) {
      let info = row.goodsItemName;
      this.$confirm(`此操作将删除${info}规格, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$fetch("goods_rule_delete", {
            goodsItemId: row.goodsItemId,
          }).then((res) => {
            if (res) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              setTimeout(() => {
                this.gitRuletableData(this.currentGoodsGroupId);
              }, 50);
            }
          });
        })
        .catch(() => {});
    }, 
    // 关闭新增/编辑弹窗
    closeRule(formName) {
      this.ruleVisible = false;
      this.ruleForm.ancillaryGoods[0].num = 0 // 手动把数量清零
      this.$refs[formName].resetFields();
    },
    // 提交规格保存
    submitRuleForm(formName) {
      let newData = JSON.stringify(this.ruleForm.ancillaryGoods)
      this.$refs[formName].validate((valid) => {
        if(valid) {
          if(this.ruleStatus) {
            // 新增
            this.$fetch("goods_rule_add", {
              ...this.ruleForm,
              ancillaryGoods: newData,
              goodsGroupId: this.currentGoodsGroupId
            }).then((res) => {
              this.$message({
                message: "提交成功",
                type: "success",
              });
              this.gitRuletableData(this.currentGoodsGroupId);
              this.closeRule("dataRuleForm");
            });
          } else {
            // 编辑
            this.$fetch("goods_rule_update", {
              ...this.ruleForm,
              ancillaryGoods: newData,
              goodsGroupId: this.currentGoodsGroupId
            }).then((res) => {
              this.$message({
                message: "编辑成功",
                type: "success",
              });
              this.gitRuletableData(this.currentGoodsGroupId);
              this.closeRule("dataRuleForm");
            });
          }
        }
      });
    },
    removeDomain(item) {
      var index = this.ruleForm.ancillaryGoods.indexOf(item)
      if (index !== -1) {
        this.ruleForm.ancillaryGoods.splice(index, 1)
      }
    },
    addDomain() {
      this.ruleForm.ancillaryGoods.push({
        value: '',
        num: '',
      });
    }
  },
  filters: {
    goodsItemGroupTypeFilter(status){
      switch(status){
        case "Course":
          return '课程';
        case "Book":
          return '图书';
        default:
          return '';
      }
    },
    Filter(status){
      switch(status){
        case "Normal":
          return '正常';
        case "Disable":
          return '停用';
        default:
          return '';
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.specification-group-container {

  .btn-wrapper {
    margin-bottom: 8px;
  }
}
</style>
