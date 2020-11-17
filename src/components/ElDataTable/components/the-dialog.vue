<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    ref="dialog"
    v-bind="dialogAttrs"
    @close="resetFields"
    :close-on-click-modal="false"
  >
    <!--https://github.com/FEMessage/el-form-renderer-->
    <el-form-renderer :content="form" ref="form" v-bind="formAttrs" :disabled="isView">
      <!--@slot 额外的弹窗表单内容, 当form不满足需求时可以使用，参考：https://femessage.github.io/el-form-renderer/#/Demo?id=slot -->
      <slot :row.sync="slotData" />
    </el-form-renderer>

<div slot="footer" v-show="!isView">
  <el-button @click="visible = false" :size="buttonSize">取 消</el-button>
  <el-button type="primary" @click="confirm" :loading="confirmLoading" :size="buttonSize">确 定</el-button>
</div>
</el-dialog>
</template>

<script>
export const dialogModes = {
  new: "new",
  edit: "edit",
  view: "view"
};

export default {
  props: {
    newTitle: {
      type: String,
      required: true
    },
    editTitle: {
      type: String,
      required: true
    },
    viewTitle: {
      type: String,
      required: true
    },
    form: {
      type: Array,
      required: true
    },
    formAttrs: {
      type: Object,
      required: true
    },
    dialogAttrs: {
      type: Object,
      required: true
    },
    buttonSize: String
  },
  data() {
    return {
      mode: dialogModes.new,
      visible: false,
      confirmLoading: false,
      slotData: null
    };
  },
  computed: {
    title() {
      switch (this.mode) {
        case dialogModes.edit:
          return this.editTitle;
        case dialogModes.view:
          return this.viewTitle;
        default:
          return this.newTitle;
      }
    },
    isView() {
      return this.mode === dialogModes.view;
    }
  },
  methods: {
    /**
     * 显示dialog
     * @public
     */
    show(mode, formValue) {
      this.mode = mode;
      this.visible = true;
      if (formValue) {
        // $nextTick 有时也拿不到 form ，这样是稳妥的做法
        this.$refs.dialog.$once("opened", () => {
          this.$refs.form.updateForm(formValue);
          this.slotData = formValue;
        });
      } else {
        formValue = {};
        this.form.forEach(item => {
          formValue[item.id] = item.default || "";
        });
        for (let i in formValue) {
          if (formValue[i].constructor === Number) {
            formValue[i] = 0;
          }
          if (formValue[i].constructor === String) {
            formValue[i] = "";
          }
          if (formValue[i].constructor === Array) {
            formValue[i] = [];
          }
          if (formValue[i].constructor === Boolean) {
            formValue[i] = false;
          }
        }
        this.slotData = { ...formValue };
      }
    },
    async confirm() {
      const valid = await new Promise(this.$refs.form.validate);
      if (!valid) return;
      let formValue = this.$refs.form.getFormValue();
      this.form.map(item => {
        if (item.hidden) {
          formValue[item.id] = this.slotData[item.id];
        }

        return item;
      });
      const isNew = this.mode === dialogModes.new;
      this.confirmLoading = true;
      const done = (close = true) => {
        this.confirmLoading = false;
        if (close) this.visible = false;
      };
      this.$emit("confirm", isNew, formValue, done);
    },
    resetFields() {
      this.$refs.form.resetFields();
      this.slotData = null;
    }
  },
  watch: {
    slotData: {
      handler() {
        if (this.$refs.form && this.slotData) {
          let formValue = this.$refs.form.getFormValue();
          this.form.map(item => {
            if (item.hidden) {
              formValue[item.id] = this.slotData[item.id];
            }
            return item;
          });
          this.$refs.form.updateForm(formValue);
        }
      },
      deep: true
    }
  }
};
</script>

<style></style>
