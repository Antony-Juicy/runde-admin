<template>
  <div>
    <div style="padding-bottom: 20px;">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="合作方名称">
              <el-input ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="负责人名称">
              <el-input ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系电话">
              <el-input ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="邮箱">
              <el-input ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="地址">
              <el-input ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="开户银行">
              <el-input ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="具体支行">
              <el-input ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="银行账号">
              <el-input ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="户名">
              <el-input ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
              <el-input ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="签约开始日期">
              <el-input ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="签约结束日期">
              <el-input ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row style="float:right;padding-bottom:10px">
        <el-button icon="el-icon-search" type="primary" round >查询</el-button>
        <el-button icon="el-icon-refresh-left" type="warning" round plain>重置</el-button>
        <el-button icon="el-icon-document-add" type="success" round  @click="add">新增</el-button>
        <el-button icon="el-icon-document-remove" type="danger" round >批量删除</el-button>
      </el-row>
    </div>
    <rd-table
      :tableData="tableData"
      :tableKey="tableKey"
      :multiple="multiple"
      :pageConfig="pageConfig"
      @select="handleSelect"
    >
      <template slot="name" slot-scope="scope">
        <el-tag size="medium">{{ scope.row.name }}</el-tag>
      </template>
      <template slot="edit" slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </rd-table>
  </div>

</template>

<script>
export default {
  inject: ['reload'],
  data () {
    return {
      form: {},
      tableData: [],
      tableKey: [
        {
          name: "id",
          value: "id",
          width: 80,
        },
        {
          name: "合作方信息",
          value: "",
        },
        {
          name: "银行账号",
          value: "",
        },
        {
          name: "户名",
          value: "",
        },
        {
          name: "店铺数量",
          value: "",
        },
        {
          name: "兑换码数量",
          value: "",
        },
        {
          name: "购课学员数量",
          value: "",
        },
        {
          name: "店铺数量",
          value: "",
        },
        {
          name: "已提现金额",
          value: "",
        },
        {
          name: "状态",
          value: "",
        },
        {
          name: "修改时间",
          value: "",
        },
        {
          name: "操作",
          value: "edit",
          operate: true,
        },
      ],
      multiple: true,
      pageConfig: {
        totalCount: 100,
        pageNum: 1,
        pageSize: 10,
      },
    }
  },
  mounted () {
    
  },
  methods: {
    handleSelect(rows) {
      console.log(rows, "rows---");
    },
    pageChange(val) {
      this.getTableData({
        currentPage: val.page,
        showCount: val.limit,
      });
    },
    add() {
      console.log(666)
    },
  },
}
</script>

<style lang="scss">
.el-form-item {
  margin-bottom: 10px;
}
</style>