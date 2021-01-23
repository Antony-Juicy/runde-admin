<template>
  <div class="primary-line">
    <search-form
      :formOptions="newFormOptions"
      :showNum="7"
      @onSearch="onSearch"
    ></search-form>
    <div class="main-wrapper">
      <div class="btn-wrapper">
        <el-button type="warning" size="small" @click="handleDistribute"
          >分配</el-button
        >
        <el-button type="info" size="small" @click="handleAdd"
          >AI呼叫</el-button
        >
      </div>
      <rd-table
        :tableData="tableData"
        :tableKey="tableKey"
        :pageConfig="pageConfig"
        :multiple="true"
        fixedTwoRow
        highlight-current-row
        @pageChange="pageChange"
        @select="handelSelect"
      >
        <template slot="edit" slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            @click="handleDelete(scope.row)"
            type="text"
            size="small"
            style="color: #ec5b56"
            >删除</el-button
          >
        </template>
      </rd-table>

      <!-- 分配弹窗 -->
       <rd-dialog
        :title="'分配机会'"
        :dialogVisible="distributeVisible"
        :showFooter="false"
        :width="'400px'"
        @handleClose="distributeVisible = false"
      >
        <el-select v-model="campusValue" placeholder="请选择">
          <el-option
            v-for="item in campusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div class="btn">
          <el-button size="small" type="warning">分配</el-button>
        </div>
      </rd-dialog>
    </div>
  </div>
</template>

<script>
let id = 0;
export default {
  name: "temp2",
  data() {
    return {
      newFormOptions: [
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "跟进老师",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "注册人",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "机会状态",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "姓名",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "手机",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "省份",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "城市",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "学历",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "机会来源",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "组织架构",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "跟进次数",
        },
        // 课程
        {
          prop: "abc",
          element: "el-cascader",
          placeholder: "课程",
          props: {
            checkStrictly: true,
            lazy: true,
            lazyLoad(node, resolve) {
              const { level } = node;
              setTimeout(() => {
                const nodes = Array.from({ length: level + 1 }).map((item) => ({
                  value: ++id,
                  label: `选项${id}`,
                  leaf: level >= 2,
                }));
                // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                resolve(nodes);
              }, 1000);
            },
          },
          initWidth: true,
        },
        // 时间
        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "最近跟进时间(开始)",
          endPlaceholder: "最近跟进时间(结束)",
          initWidth: true,
        },
        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "创建时间(开始)",
          endPlaceholder: "创建时间(结束)",
          initWidth: true,
        },
        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "进入公海时间(开始)",
          endPlaceholder: "进入公海时间(结束)",
          initWidth: true,
        },
      ],
       tableData: [
      ],
      tableKey: [
          {
          name: "ID",
          value: "id",
          width: 80
        },
        {
          name: "姓名",
          value: "studentName",
        },
         {
          name: "手机号码",
          value: "phone"
        },
        {
          name: "学历",
          value: "eduBackground"
        },
        {
          name: "咨询项目",
          value: "enquireProductNameOne",
        },
        {
          name: "咨询科目",
          value: "enquireSubjectNameOne"
        },
        {
          name: "咨询班型",
          value: "enquireClassOne"
        },
        {
          name: "跟进次数",
          value: "feedbackCount",
        },
        {
          name: "跟进状态",
          value: "status",
        },
        {
          name: "跟进老师",
          value: "marketName",
        },
        {
          name: "最近跟进",
          value: "recentFeedbackTime",
        },
        {
          name: "创建时间",
          value: "createAt",
        },
        {
          name: "进入公海时间",
          value: "campusPoolTime",
        },
        {
          name: "机会来源",
          value: "saleSource",
        },
        {
          name: "分校/战队",
          value: "campusName",
        },
        {
          name: "省份",
          value: "phoneProvince",
        },
         {
          name: "城市",
          value: "phoneCity",
        },
         {
          name: "地址",
          value: "address",
        },
         {
          name: "赛道",
          value: "opportunityCampusNature",
        },
      ],
      pageConfig: {
        totalCount: 100,
       currentPage: 1,
        showCount: 10,
      },
      selectedData:[],
      distributeVisible: false,
      campusOptions: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        campusValue: '',
        searchForm: {}
    };
  },
  props:{
    formOptions: {
      type: Array,
      default:()=>[]
    }
  },
  watch:{
    formOptions(newVal){
      console.log(newVal,'newww')
      this.newFormOptions = newVal;
    }
  },
   mounted() {
    this.getTableData();
    // this.getSelectList();
  },
  methods: {
    handleAdd(){

    },
    onSearch(val) {
      this.searchForm = { ...val };
      console.log(val, this.searchForm, "val---");
      this.getTableData();
    },
     pageChange(val) {
      console.log(val,'pagechange')
      this.pageConfig.currentPage = val.page;
      this.pageConfig.showCount = val.limit;
      this.getTableData();
    },
    handelSelect(val) {
      console.log(val, "valll");
      this.selectedData = val;
    },
    handleDistribute(){
      this.distributeVisible = true;
    },
    getTableData(params = {}) {
      const loading = this.$loading({
        lock: true,
        target: ".el-table",
      });
      this.$fetch("chance_province_list", {
        ...this.pageConfig,
        ...this.searchForm,
        ...params,
        token:"123"
        // opportunityCampusNature: "OffLine",
        // branchFlag:"branchFlag"
      }).then((res) => {
        this.tableData = res.data.data.map((item) => {
          item.createAt = this.$common._formatDates(item.createAt);
          item.updateAt = this.$common._formatDates(item.updateAt);
          item.campusPoolTime = this.$common._formatDates(item.campusPoolTime);
          item.phone = this.$common.hidePhone(item.phone);
          item.enquireClassOne = item.enquireClassOne && item.enquireClassOne.map(item=>(item.name)).join(",");
          return item;
        });
        this.pageConfig.totalCount = res.data.count;
        setTimeout(() => {
          loading.close();
        }, 200);
      });
    },
    getSelectList(){
      Promise.all([
        this.$fetch("chance_staff_list"),
        this.$fetch("chance_status_list"),
        this.$fetch("chance_edu_list"),
        this.$fetch("chance_source_list"),
        this.$fetch("chance_config_campusList")
      ].map((p) => {
        return p.catch(error => error)
    }))
        .then((result) => {
          console.log(result,'resu')
           let staffOptions = JSON.parse(result[0].msg).map((item) => ({
            label: item.staffName,
            value: item.id,
          }));
           let trailOptions = result[1].data.map((item) => ({
            label: item.value,
            value: item.key,
          }));
          let eduOptions = result[2].data.map((item) => ({
            label: item.value,
            value: item.key,
          }));
           let sourceOptions = result[3].data.map((item) => ({
            label: item.value,
            value: item.key,
          }));
           let campusOptions = result[4].data.data.map((item) => ({
          label: item.campusName,
          value: item.id,
        }));
         let numsOptions = []
        for(let i=0; i< 8; i++){
          numsOptions.push({
            label: i,
            value: i
          })
        }
       
        this.formOptions = [
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "跟进老师",
          filterable: true,
          options: staffOptions
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "注册人",
          filterable: true,
          options: staffOptions
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "机会状态",
          options: trailOptions
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "学员姓名"
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "手机",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "省份",
        },
        {
          prop: "menuName",
          element: "el-input",
          placeholder: "城市",
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "学历",
          options: eduOptions
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "机会来源",
          options: sourceOptions
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "组织架构",
          filterable: true,
          options: campusOptions
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "跟进次数",
          options: numsOptions
        },
        // 课程
        {
          prop: "abc",
          element: "el-cascader",
          placeholder: "课程",
          props: {
            checkStrictly: true,
            lazy: true,
            lazyLoad(node, resolve) {
              const { level } = node;
              setTimeout(() => {
                const nodes = Array.from({ length: level + 1 }).map((item) => ({
                  value: ++id,
                  label: `选项${id}`,
                  leaf: level >= 2,
                }));
                // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                resolve(nodes);
              }, 1000);
            },
          },
          initWidth: true,
        },
        // 时间
        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "最近跟进时间(开始)",
          endPlaceholder: "最近跟进时间(结束)",
          initWidth: true,
        },
        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "创建时间(开始)",
          endPlaceholder: "创建时间(结束)",
          initWidth: true,
        },
        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "进入公海时间(开始)",
          endPlaceholder: "进入公海时间(结束)",
          initWidth: true,
        },
      ]
        })
        
    }
  },
};
</script>

<style lang="scss" scoped>
.primary-line {
    .main-wrapper {
        padding: 0 15px;
    }
    .search-form-box {
        // border-bottom: 1px solid #E4E7ED;
    }
    .btn {
      text-align: right;
      margin-top: 20px;
    }
}
</style>
