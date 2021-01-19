<template>
  <div class="province-school w-container">
     <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="主线公海" name="first">
          <primaryLine :formOptions="formOptions"/>
        </el-tab-pane>
        <el-tab-pane label="支线公海" name="second">
          <branchLine :formOptions="formOptions"/>
        </el-tab-pane>
      </el-tabs> 
  </div>
</template>

<script>
import primaryLine from './primaryLine'
import branchLine from './branchLine'
export default {
  name:"province-school",
  data(){
    return { 
      activeName:"first",
      formOptions: []
    }
  },
  components:{
    primaryLine,
    branchLine
  },
  mounted(){
    this.getSelectList();
  },
   methods: {
     handleClick(){

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
         let numsOptions = [
          
        ]
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
  }
}
</script>

<style lang="scss" scoped>

</style>
