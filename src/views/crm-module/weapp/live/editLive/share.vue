<template>
  <div class="share-config">
      <RdForm :formOptions="addFormOptions" formLabelWidth="130px" :rules="addRules" ref="dataForm4">
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
        <template slot="pic2">
              {{img2}}
            <Upload-oss
              v-if="uploadOssElem"
              :objConfig="{ dir: 'web/runde_admin', project: 'icon_' }"
              :src.sync="img2"
              @srcChangeFun="
                (data) => {
                  img2 = data;
                  reloadElem('uploadOssElem');
                }
              "
            />
        </template>
      </RdForm>
      <div class="btn-wrapper">
         <el-button type="primary" size="small" @click="handleAdd"
          >立即创建</el-button
          >
      </div>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import UploadOss from "@/components/UploadOss";
export default {
  name:"temp",
  data(){
    return {
      addFormOptions:[
        {
          prop: "pic",
          element: "el-input",
          placeholder: "请输入助教密码",
          label: "分享海报(4:3)",
          operate: true
        },
        {
          prop: "pic2",
          element: "el-input",
          placeholder: "请输入助教密码",
          label: "分享封面",
          operate: true
        },
        {
          prop: "title",
          element: "el-input",
          placeholder: "请输入分享标题",
          label: "分享标题"
        },
        {
          prop: "desc",
          element: "el-input",
          placeholder: "请输入分享描述",
          label: "分享描述",
          type:"textarea",
          rows:2
        },
      ],
      addRules:{

      },
      uploadOssElem: true,
      img:"",
      img2:""
    }
  },
  components:{
    RdForm,
    UploadOss
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
        handleAdd(){
          
        }
  }
}
</script>

<style lang="scss" scoped>
.share-config {
  .btn-wrapper {
    margin-left: 450px;
  }
}
</style>
