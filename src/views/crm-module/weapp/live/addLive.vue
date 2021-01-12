<template>
  <div class="addLive">
    <RdForm
      :formOptions="addFormOptions"
      :rules="addRules"
      :formLabelWidth="'150px'"
      ref="dataForm3"
    >
      <template slot="pic">
        {{ img }}
        <Upload-oss
          v-if="uploadOssElem"
          :objConfig="{ dir: 'web/runde_admin', project: 'icon_' }"
          :src.sync="img"
          :initGetConfig="initGetConfig"
          @srcChangeFun="
            (data) => {
              img = data;
              reloadElem('uploadOssElem');
            }
          "
        />
      </template>
      <template slot="bgImg">
        <el-radio v-model="bgImg" label="1">默认背景色</el-radio><br />
        <el-radio v-model="bgImg" label="2">自定义背景色</el-radio><br />
        <div class="pic-container">
          <div class="pic-item" v-show="liveMode">
            <Upload-oss
              v-if="uploadOssElem"
               :initGetConfig="initGetConfig"
              :objConfig="{ dir: 'web/runde_admin', project: 'icon_' }"
              :src.sync="img"
              @srcChangeFun="
                (data) => {
                  img = data;
                  reloadElem('uploadOssElem');
                }
              "
            />
            <p class="tips">请上传横屏背景16：9</p>
          </div>
          <div class="pic-item" v-show="!liveMode">
            <Upload-oss
              v-if="uploadOssElem"
              :initGetConfig="initGetConfig"
              :objConfig="{ dir: 'web/runde_admin', project: 'icon_' }"
              :src.sync="img"
              @srcChangeFun="
                (data) => {
                  img = data;
                  reloadElem('uploadOssElem');
                }
              "
            />
            <p class="tips">请上传竖屏背景9：16</p>
          </div>
        </div>
      </template>
      <template slot="desc">
        <RdEditor />
      </template>
    </RdForm>
    <div class="btn-wrapper">
      <el-button type="primary" size="small" @click="handleAdd"
        >立即创建</el-button
      >
      <el-button size="small" @click="handleClose('dataForm3')">取消</el-button>
    </div>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import UploadOss from "@/components/UploadOss";
import RdEditor from "@/components/RdEditor";
export default {
  name: "addLive",
  data() {
    return {
      addFormOptions: [
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
          label: "直播名称",
        },
        {
          prop: "name",
          element: "el-input",
          placeholder: "请输入直播老师",
          label: "直播老师",
        },
        {
          prop: "type",
          element: "el-radio",
          placeholder: "请选择",
          label: "直播模式",
          options: [
            {
              label: "横屏直播",
              value: 'Landscape',
              tips:
                "适用于商业，知识讲解，活动现场直播等场景，视频比例为16：9窗口",
            },
            {
              label: "竖屏直播",
              value: 'Vertical',
              tips: "适用于直播带货，人物互动讲解等场景，视频比例为9：16窗口",
            },
          ],
          initValue: 'Landscape',
          events:{
            change:(val)=>{
              console.log(val,'radio',this.liveMode)
              if(val == 'Landscape'){
                this.liveMode = true 
              }else if(val == 'Vertical'){
                this.liveMode = false
              }
              
            }
          }
        },
        {
          prop: "time",
          element: "el-date-picker",
          startPlaceholder: "直播时间(开始)",
          endPlaceholder: "直播时间(结束)",
          label: "直播时间",
        },
        {
          prop: "bgImg",
          element: "el-radio",
          placeholder: "请选择",
          label: "直播背景图",
          options: [
            {
              label: "默认背景色",
              value: 0,
            },
            {
              label: "自定义背景图",
              value: 1,
            },
          ],
          initValue: 0,
          operate: true,
        },
        {
          prop: "pic",
          element: "el-input",
          placeholder: "请输入助教密码",
          label: "封面图(21:9)",
          operate: true,
        },
        {
          prop: "desc",
          element: "el-input",
          placeholder: "请输入助教密码",
          label: "直播简介",
          operate: true,
        },
        {
          prop: "menuName",
          element: "el-radio",
          placeholder: "请选择",
          label: "显示状态",
          options: [
            {
              label: "上架",
              value: 0,
            },
            {
              label: "隐藏",
              value: 1,
            }
          ],
          initValue: 0
        },
        {
          prop: "menuName",
          element: "el-radio",
          placeholder: "请选择",
          label: "收费模式",
          options: [
            {
              label: "公开",
              value: 0,
            }
          ],
          initValue: 0
        },
        {
          prop: "name",
          element: "el-input",
          placeholder: "请输入助教密码",
          label: "助教密码",
        },
         {
          prop: "name",
          element: "el-input",
          placeholder: "请输入直播初始人数",
          label: "直播初始人数",
        }
      ],
      addRules: {
        updateReason: [
          { required: true, message: "请输入修改事由", trigger: "blur" },
        ],
      },
      uploadOssElem: true,
      img: "",
      bgImg: "1",
      liveMode: true,
      initGetConfig: false
    };
  },
  components: {
    RdForm,
    UploadOss,
    RdEditor,
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
    handleClose(formName) {
      this.$refs[formName].resetFields();
      this.$emit("close");
    },
    handleAdd() {
      this.$refs.dataForm3.validate((val,data)=>{
        if(val) {
          console.log(data,'data---')
        }
      });
    },
  },
};
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
  .pic-container {
    display: flex;
    .pic-item {
      margin-right: 20px;
    }
  }
}
</style>
