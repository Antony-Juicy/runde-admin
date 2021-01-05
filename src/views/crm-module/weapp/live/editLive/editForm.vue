<template>
  <div class="addLive">
      <RdForm :formOptions="addFormOptions" :rules="addRules" ref="dataForm4">
          <template slot="pic">
              {{img}}
            <Upload-oss
              v-if="uploadOssElem"
              :objConfig="{ dir: 'web/runde_admin', project: 'icon_' }"
              :src.sync="img"
              @srcChangeFun="
                (data) => {
                  img = data;
                  reloadElem('uploadOssElem');
                }
              "
            />
        </template>
        <template slot="desc">
            <RdEditor/>
        </template>
      </RdForm>
      <div class="btn-wrapper">
         <el-button type="primary" size="small" @click="handleAdd"
          >立即创建</el-button
          >
          <el-button size="small" @click="handleClose('dataForm4')"
            >取消</el-button
          >
      </div>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import UploadOss from "@/components/UploadOss";
import RdEditor from "@/components/RdEditor";
export default {
  name:"addLive",
  data(){
    return {
        addFormOptions:[
            {
          prop: "menuName",
          element: "el-select",
          placeholder: "请选择",
          label: "项目类型",
          options: [
            {
              label: "博士",
              value: 0,
            },
            {
              label: "硕士",
              value: 1,
            },
          ],
        },
         {
          prop: "name",
          element: "el-input",
          placeholder: "请输入直播名称",
          label: "直播名称"
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "请选择",
          label: "直播模式",
          options: [
            {
              label: "博士",
              value: 0,
            },
            {
              label: "硕士",
              value: 1,
            },
          ],
        },
        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "直播时间(开始)",
          endPlaceholder: "直播时间(结束)",
          label: "直播时间",
        },
         {
          prop: "pic",
          element: "el-input",
          placeholder: "请输入助教密码",
          label: "封面图(21:9)",
          operate: true
        },
         {
          prop: "desc",
          element: "el-input",
          placeholder: "请输入助教密码",
          label: "直播简介",
          operate: true
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "请选择",
          label: "显示状态",
          options: [
            {
              label: "博士",
              value: 0,
            },
            {
              label: "硕士",
              value: 1,
            },
          ],
        },
        {
          prop: "menuName",
          element: "el-select",
          placeholder: "请选择",
          label: "收费模式",
          options: [
            {
              label: "博士",
              value: 0,
            },
            {
              label: "硕士",
              value: 1,
            },
          ],
        },
          {
          prop: "name",
          element: "el-input",
          placeholder: "请输入助教密码",
          label: "助教密码"
        },
      ],
      addRules:{
        updateReason: [
          { required: true, message: "请输入修改事由", trigger: "blur" },
        ]
      },
      uploadOssElem: true,
      img:""
    }
  },
  components:{
      RdForm,
      UploadOss,
      RdEditor
  },
   methods: {
       // 上传组件
        reloadElem(dataElem) {
        // 重新加载组件
        this[dataElem] = false;
        this.$nextTick(() => {
            this[dataElem] = true;
        });
        },
        handleClose(formName){
          this.$refs[formName].resetFields();
          this.$emit('close')
        }
  }
}
</script>

<style lang="scss" scoped>
.addLive {
    /deep/ .img180 {
        width: 100px;
        height: 100px;
    }
    .btn-wrapper {
      margin-left: 400px;
    }
}
</style>
