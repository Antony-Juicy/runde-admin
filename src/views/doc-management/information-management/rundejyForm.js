let formVersion  = [
  {
    type: "input",
    id: "infoTitle",
    label: "资讯标题",
    width: "150px",
    rules: [
      {
        required: true,
        message: "该项为必填项",
        trigger: "blur",
        transform: v => v && v.trim()
      }
    ],
    el: { placeholder: "" }
  },
  {
    type: "input",
    id: "infoDescribe",
    label: "资讯描述",
    el: { placeholder: "" }
  },
  {
    type: "input",
    id: "infoSource",
    label: "来源",
    el: { placeholder: "" }
  },
  {
    type: "input",
    id: "remark",
    label: "备注",
    el: { placeholder: "" }
  },
  {
    type: "input",
    id: "infoLabel",
    label: "资讯标签",
    el: { placeholder: "" }
  },
  
  {
    type: "input",
    id: "customLabel",
    label: "自定义标签(以，分割)",
    el: { placeholder: "" }
  },
  
  {
    type: "input",
    id: "headOrder",
    label: "顶部推荐排序",
    default: 0,
    el: { placeholder: "" }
  },
  {
    type: "input",
    id: "orderBy",
    default: 0,
    label: "排序",
    el: { placeholder: "" }
  },
  {
    type: "input",
    id: "imageName",
    label: "图片名称",
    el: { placeholder: "" }
  },
  {
    type: "input",
    id: "title",
    label: "标题",
    el: { placeholder: "" }
  },
  {
    type: "input",
    id: "keywords",
    label: "关键词",
    el: { placeholder: "" }
  },
  {
    type: "input",
    id: "description",
    label: "描述",
    el: { placeholder: "", type: "textarea" }
  },

  // 以下需要在slot中自定义
  {
    type: "input",
    id: "infoDetail",
    label: "资讯详情",
    el: { placeholder: "" },
    hidden: r => !r.show
  },
  {
    type: "input",
    id: "classifyId",
    label: "类型",
    el: { placeholder: "" },
    hidden: r => !r.show
  },
  {
    type: "input",
    id: "classifyName",
    label: "类型",
    el: { placeholder: "" },
    hidden: r => !r.show
  },

  {
    type: "input",
    id: "hided",
    label: "是否隐藏",
    default: "NO",
    el: { placeholder: "" },
    hidden: r => !r.show
  },
  {
    type: "input",
    id: "recommend",
    label: "是否资讯推荐",
    default: "NO",
    el: { placeholder: "" },
    hidden: r => !r.show
  },
  {
    type: "input",
    id: "headRecommend",
    label: "是否顶部推荐",
    default: "NO",
    el: { placeholder: "" },
    hidden: r => !r.show
  },
  {
    type: "input",
    id: "imagePath",
    label: "图片地址",
    el: { placeholder: "" },
    hidden: r => !r.show
  }
];
module.exports = formVersion;