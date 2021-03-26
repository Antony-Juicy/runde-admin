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
import Fetch from '@/utils/fetch'
import chanceSelect from '@/utils/chance-select'
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
          prop: "marketStaffId",
          element: "el-select",
          placeholder: "跟进老师",
          filterable: true,
          options: staffOptions
        },
        {
          prop: "createStaffId",
          element: "el-select",
          placeholder: "注册人",
          filterable: true,
          options: staffOptions
        },
        {
          prop: "status",
          element: "el-select",
          placeholder: "机会状态",
          options: trailOptions
        },
        {
          prop: "studentName",
          element: "el-input",
          placeholder: "学员姓名"
        },
        {
          prop: "phone",
          element: "el-input",
          placeholder: "手机",
        },
        {
          prop: "phoneProvince",
          element: "el-input",
          placeholder: "省份",
        },
        {
          prop: "phoneCity",
          element: "el-input",
          placeholder: "城市",
        },
        {
          prop: "eduBackground",
          element: "el-select",
          placeholder: "学历",
          options: eduOptions
        },
        {
          prop: "saleSource",
          element: "el-select",
          placeholder: "机会来源",
          options: sourceOptions
        },
        {
          prop: "campusId",
          element: "el-select",
          placeholder: "组织架构",
          filterable: true,
          options: campusOptions
        },
        {
          prop: "feedbackCount",
          element: "el-select",
          placeholder: "跟进次数",
          options: numsOptions
        },
        // 课程
        chanceSelect.getProjectCascader({
            prop: "product",
            placeholder: "咨询项目/科目/课程"
          }),
        // 时间
        {
          prop: "updateAt",
          element: "el-date-picker",
          startPlaceholder: "最近跟进时间(开始)",
          endPlaceholder: "最近跟进时间(结束)",
          initWidth: true,
        },
        {
          prop: "createAt",
          element: "el-date-picker",
          startPlaceholder: "创建时间(开始)",
          endPlaceholder: "创建时间(结束)",
          initWidth: true,
        },
        {
          prop: "campusPoolTime",
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
