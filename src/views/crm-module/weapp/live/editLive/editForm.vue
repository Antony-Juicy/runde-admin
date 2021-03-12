<template>
  <div class="addLive">
    <template v-if="!emptyText">
    <RdForm
      :formOptions="addFormOptions"
      :rules="addRules"
      :formLabelWidth="'150px'"
      ref="dataForm3"
    >
      <template slot="liveBackgroundImage">
        <el-radio v-model="bgType" label="1">默认背景色</el-radio><br />
        <el-radio v-model="bgType" label="2">自定义背景色</el-radio><br />
        <div class="pic-container">
          <div class="pic-item">
            <Upload-oss
              v-if="uploadOssElem"
              :initGetConfig="initGetConfig"
             :objConfig="{module: 'live', project: 'icon_',}"
              :src.sync="bgImg"
              @srcChangeFun="
                (data) => {
                  bgImg = data;
                  reloadElem('uploadOssElem');
                }
              "
            />
            <p class="tips" v-show="liveMode">请上传横屏背景16：9</p>
            <p class="tips" v-show="!liveMode">请上传竖屏背景9：16</p>
          </div>
        </div>
      </template>
      <template slot="liveCover">
        <Upload-oss
          v-if="uploadOssElem2"
          :objConfig="{module: 'live', project: 'icon_',}"
          :src.sync="coverImg"
          :initGetConfig="initGetConfig"
          @srcChangeFun="
            (data) => {
              coverImg = data;
              reloadElem('uploadOssElem2');
            }
          "
        />
      </template>
      <template slot="liveDetail">
        <RdEditor
          placeholder="编辑直播简介"
          module="live"
          height="500px"
          :quillContent="quillContent"
          @change="changeEditor"
        />
      </template>
    </RdForm>
    <div class="btn-wrapper">
      <el-button
        type="primary"
        :loading="btnLoading"
        @click="handleAdd"
        v-prevent-re-click="2000"
        >保存</el-button
      >
      <!-- <el-button size="small" @click="handleClose('dataForm3')">取消</el-button> -->
    </div>
    </template>

    <div v-else style="text-align:center">
      <img src="@/assets/empty-image.png" alt="" class="img-empty" />
      <p>{{ emptyText }}</p>
    </div>
  </div>
</template>

<script>
import RdForm from "@/components/RdForm";
import UploadOss from "@/components/UploadOss";
import RdEditor from "@/components/RdEditor";
import { scrollTo } from "@/utils/scroll-to";
export default {
  name: "editForm",
  data() {
    return {
      addFormOptions: [
        {
          prop: "liveName",
          element: "el-input",
          placeholder: "请输入直播名称",
          label: "直播名称",
        },
        {
          prop: "liveTeacherName",
          element: "el-input",
          placeholder: "请输入直播老师",
          label: "直播老师",
        },
        {
          prop: "liveMode",
          element: "el-radio",
          placeholder: "请选择",
          label: "直播模式",
          options: [
            {
              label: "横屏直播",
              value: "Landscape",
              tips:
                "适用于商业，知识讲解，活动现场直播等场景，视频比例为16：9窗口",
            },
            {
              label: "竖屏直播",
              value: "Vertical",
              tips: "适用于直播带货，人物互动讲解等场景，视频比例为9：16窗口",
            },
          ],
          initValue: "Landscape",
          events: {
            change: (val) => {
              console.log(val, "radio", this.liveMode);
              if (val == "Landscape") {
                this.liveMode = true;
              } else if (val == "Vertical") {
                this.liveMode = false;
              }
            },
          },
        },
        {
          prop: "liveTime",
          element: "el-date-picker",
          startPlaceholder: "直播时间(开始)",
          endPlaceholder: "直播时间(结束)",
          label: "直播时间",
        },
        {
          prop: "liveBackgroundImage",
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
          prop: "liveCover",
          element: "el-input",
          label: "封面图(21:9)",
          operate: true,
          initValue: 0,
        },

        {
          prop: "liveShowStatus",
          element: "el-radio",
          placeholder: "请选择显示状态",
          label: "显示状态",
          options: [
            {
              label: "上架",
              value: "Show",
            },
            {
              label: "隐藏",
              value: "Hidden",
            },
          ],
          initValue: "Show",
        },
        {
          prop: "liveChargeMode",
          element: "el-radio",
          placeholder: "请选择",
          label: "收费模式",
          options: [
            {
              label: "公开",
              value: "Open",
            },
          ],
          initValue: "Open",
        },
        {
          prop: "assistantPassword",
          element: "el-input",
          placeholder: "请输入助教密码",
          label: "助教密码",
        },
        {
          prop: "liveInitialNumber",
          element: "el-input-number",
          placeholder: "请输入直播初始人数",
          label: "直播初始人数",
        },
        {
          prop: "liveDetail",
          element: "el-input",
          label: "直播简介",
          operate: true,
        },
      ],
      addRules: {
        typeId: [
          { required: true, message: "请选择项目类型", trigger: "blur" },
        ],
        liveName: [
          { required: true, message: "请输入直播名称", trigger: "blur" },
        ],
        liveTeacherName: [
          { required: true, message: "请输入直播老师", trigger: "blur" },
        ],
        liveMode: [
          { required: true, message: "请选择直播模式", trigger: "blur" },
        ],
        liveTime: [
          { required: true, message: "请选择直播时间", trigger: "blur" },
        ],
        liveBackgroundImage: [
          { required: true, message: "请上传直播背景图", trigger: "blur" },
        ],
        liveCover: [
          { required: true, message: "请上传封面图", trigger: "blur" },
        ],
        liveShowStatus: [
          { required: true, message: "请选择显示状态", trigger: "blur" },
        ],
        liveChargeMode: [
          { required: true, message: "请选择收费模式", trigger: "blur" },
        ],
        assistantPassword: [
          { required: true, message: "请输入助教密码", trigger: "blur" },
        ],
        liveInitialNumber: [
          { required: true, message: "请输入直播初始人数", trigger: "blur" },
        ],
      },
      uploadOssElem: true,
      uploadOssElem2: true,
      bgImg: "",
      coverImg: "",
      bgType: "1",
      liveMode: true,
      initGetConfig: true,
      liveDetail: "",
      btnLoading: false,
      quillContent: "",
      emptyText:""
    };
  },
  components: {
    RdForm,
    UploadOss,
    RdEditor,
  },
  props: {
    liveId: {
      type: Number,
    },
  },
  mounted() {
    scrollTo(0, 800);
    this.$fetch("projectType_select", {
      loginUserId: this.$common.getUserId(),
    }).then((res) => {
      // let typeList = res.data.map((item) => ({
      //   label: item.typeName,
      //   value: item.typeId,
      // }));
      let typeList = this.$common.getTypeTree(res.data)
      this.addFormOptions.unshift({
        prop: "typeId",
        element: "el-cascader",
        placeholder: "请选择项目类型",
        label: "项目类型",
        disabled: true,
        props: { checkStrictly: true },
        options: typeList,
      });
      this.setInitVal();
    });
  },
  methods: {
    // 上传组件
    reloadElem(dataElem) {
      console.log("reload");
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
      this.$refs.dataForm3.validate((val, data) => {
        if (val) {
          if (this.bgType == "1") {
            data.liveBackgroundImage = "default";
          } else if (this.bgType == "2") {
            if (this.bgImg == "") {
              this.$message.error("请上传直播背景图");
              return;
            } else {
              data.liveBackgroundImage = this.bgImg;
            }
          }
          if (this.coverImg == "") {
            this.$message.error("请上传封面图");
            return;
          } else {
            data.liveCover = this.coverImg;
          }
          data.liveStartTime = data.liveTime[0];
          data.liveEndTime = data.liveTime[1];
          data.liveDetail = this.liveDetail;
          console.log(data, "data---");
          this.btnLoading = true;
          this.$fetch("live_update", {
            ...data,
            loginUserId: this.$common.getUserId(),
            liveId: this.liveId,
          })
            .then((res) => {
              if (res.code == 200) {
                this.btnLoading = false;
                this.$message.success("保存成功");
                // this.$emit("close");
                this.$emit("refresh");
              }
            })
            .catch((err) => {
              console.log(err);
              this.btnLoading = false;
            });
        }
      });
    },
    changeEditor(val) {
      this.liveDetail = val;
    },
    // 初始赋值
    setInitVal() {
      this.$fetch("live_getInfo", {
        liveId: this.liveId,
        loginUserId: this.$common.getUserId(),
      }).then((res) => {
        this.addFormOptions.forEach((item) => {
          item.initValue = res.data[item.prop];

          // 直播时间，背景图， 封面图， 直播简介，需要单独处理
          if (item.prop == "liveTime") {
            item.initValue = [res.data.liveStartTime, res.data.liveEndTime];
          }
          if (item.prop == "liveBackgroundImage") {
            if (res.data.liveBackgroundImage == "default") {
              this.bgType = "1";
            } else {
              this.bgType = "2";
              this.bgImg = res.data.liveBackgroundImage;
            }
          }
          if (item.prop == "liveCover") {
            this.coverImg = res.data.liveCover;
          }
          if (item.prop == "liveDetail") {
            this.quillContent = res.data.liveDetail;
          }
        });

        this.$refs.dataForm3.addInitValue();
      }).catch(err => {
        if(err.response.status == 401){
          this.emptyText = "您没有权限访问"
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.addLive {
  /deep/ {
    .img180 {
      width: 100px;
      height: 100px;
    }
    .el-input-number--small {
      width: 100%;
    }
    .el-cascader {
      width: 100%;
    }
  }
  .btn-wrapper {
    // margin-left: 400px;
    float: right;
    margin-right: 50px;
  }
  .pic-container {
    display: flex;
    .pic-item {
      margin-right: 20px;
    }
  }
}
</style>
