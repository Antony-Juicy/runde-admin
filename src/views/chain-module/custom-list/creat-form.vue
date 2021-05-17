<template>
  <div class="create-form">
    <div class="dailyForm-container">
      <div class="layui-row layui-col-space30">
        <div class="layui-col-md3">
          <div class="tags-wrapper">
            <div class="tags" data-type="text">文字输入框</div>
            <div class="tags" data-type="number">数字输入框</div>
            <div class="tags" data-type="time">时间</div>
            <div class="tags" data-type="date">日期</div>
            <div class="tags" data-type="radio">单选框</div>
            <div class="tags" data-type="checkBox">多选框</div>
            <div class="tags" data-type="appendix">附件</div>
            <div class="tags" data-type="pic">图片</div>
          </div>
        </div>
        <div class="layui-col-md9">
          <div class="table-wrapper">
            <form class="layui-form" action="">
              <div class="layui-form-item">
                <!-- <div class="layui-inline">
                  <label class="layui-form-label"
                    ><span class="star">*</span>表单名称</label
                  >
                  <div class="layui-input-inline" style="width: 300px">
                    <input
                      type="text"
                      name="templateName"
                      placeholder="请输入表单名称，长度不超过15个字"
                      maxlength="15"
                      required
                      lay-verify="required"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                </div> -->

                <!-- <div class="layui-inline">
                  <label class="layui-form-label">类型</label>
                  <div class="layui-input-inline" style="width: 300px">
                    <div id="divselect" class="divselect">
                      <cite>请选择</cite>
                      <ul>
                        <li><a href="javascript:;" selectid="1">未分类</a></li>

                        <li>
                          <a href="javascript:;" selectid="45">测试2</a>

                          <span class="delBtn">删除</span>
                        </li>

                        <li>
                          <a href="javascript:;" selectid="52">测试1</a>

                          <span class="delBtn">删除</span>
                        </li>

                        <li>
                          <a href="javascript:;" selectid="55">生产企业客户</a>

                          <span class="delBtn">删除</span>
                        </li>

                        <li>
                          <a href="javascript:;" selectid="56">批发企业客户</a>

                          <span class="delBtn">删除</span>
                        </li>

                        <li>
                          <a href="javascript:;" selectid="57">连锁客户</a>

                          <span class="delBtn">删除</span>
                        </li>

                        <li>
                          <a href="javascript:;" selectid="58">门店客户</a>

                          <span class="delBtn">删除</span>
                        </li>

                        <div class="addBtn configItem">
                          <span>+ 添加类型</span>
                        </div>
                        <div class="input-wrapper configItem">
                          <input
                            type="text"
                            class="optionInput layui-input"
                            placeholder="请输入类型，长度不得超过10中文"
                          />
                          <div class="cancelInput layui-btn layui-btn-primary">
                            取消
                          </div>
                          <div class="addInput layui-btn">确定</div>
                        </div>
                      </ul>
                      <input
                        name=""
                        value=""
                        id="inputselect"
                        style="display: none"
                      />
                    </div>
                  </div>
                </div> -->
              </div>
              <!-- <form class="layui-form" action=""> -->
              <table class="layui-table" lay-align="center">
                <thead>
                  <tr>
                    <th>序号</th>
                    <th>类型</th>
                    <th>标题<span class="star">*</span></th>
                    <th>提示语</th>
                    <th>是否必填</th>
                    <th>选项内容</th>
                    <th>状态</th>
                    <th>排序</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
              <button
                class="layui-btn submit-btn"
                lay-submit=""
                lay-filter="demo1"
              >
                立即提交
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- 弹窗 -->
    <div class="radio-modal">
      <div class="modal-title">输入选项值<每行一个></div>
      <form class="layui-form" action="" lay-filter="radio-form">
        <textarea name="desc" class="layui-textarea" rows="10"></textarea>
        <div class="layui-btn layui-btn-primary radio-model-cancel">取消</div>
        <button class="layui-btn" lay-submit lay-filter="modelSubmit">
          确认
        </button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "create-form",
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      //声明一个控制点击的变量
      var upLoadClicktag = 0;

      document.onclick = function (e) {
        var e = e || window.event;
        var target = e.target || e.srcElement;
        var _con = $("#divselect"); //获取你的目标元素
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
          $("#divselect ul").hide();
          $(".input-wrapper").hide();
          $(".optionInput").val("");
          $(".addBtn").show();
        }
      };
      // -----自定义下拉框 start----------
      jQuery.divselect = function (divselectid, inputselectid) {
        var inputselect = $(inputselectid);
        $(divselectid + " cite").click(function () {
          var ul = $(divselectid + " ul");
          if (ul.css("display") == "none") {
            ul.slideDown("fast");
          } else {
            ul.slideUp("fast");
          }
        });
        $(divselectid + " ul li a").click(function () {
          var txt = $(this).text();
          $(divselectid + " cite").html(txt);
          var value = $(this).attr("selectid");
          inputselect.val(value);
          $("#inputselect").val(value);
          $(divselectid + " ul").hide();
        });
      };
      function bindDelete() {
        $(".delBtn").click(function (e) {
          layui.use("layer", function () {
            layer.confirm(
              "是否确认删除该类型，删除后该类型下的所有表单模板将移至未分类此类型下？",
              {
                btn: ["确定", "取消"], //按钮
                title: "",
              },
              function () {
                var id = e.target.previousElementSibling.getAttribute(
                  "selectid"
                );
                //ajax
                $.ajax({
                  cache: true,
                  url:
                    "//jwtest.rundejy.com/personaltemplate/deleteTemplateType?id=" +
                    id,
                  dataType: "json",
                  async: false,
                  type: "post",
                  success: function (result) {
                    if (result.code == "Success") {
                      selectId = result.msg;
                      $(e.target.parentNode).remove();
                      layer.closeAll("dialog");
                      // 调用删除下拉的接口，并刷新列表

                      // 如果删除了绑定的那个选项，就把绑定的给换了
                      if (
                        $("#inputselect").val() ==
                        e.target.previousElementSibling.getAttribute("selectid")
                      ) {
                        // 替换成未分类的
                        $("#divselect cite").html("未分类");
                        $("#inputselect").val(1); //换成未分类的id
                      }
                    } else if (result.code == "NotQx") {
                      layer.msg("权限不足", { icon: 2, time: 1000 });
                    } else {
                      layer.msg("失败", { icon: 2, time: 1000 });
                    }
                  },
                  error: function (textStatus) {
                    //请求失败后调用的函数
                    layer.msg("失败", { icon: 2, time: 1000 });
                  },
                });
              },
              function () {}
            );
          });
        });
      }
      layui.use("layer", function () {
        $.divselect(".divselect", "#inputselect");
        bindDelete();
        // 默认绑定第一个值
        // var txt = $("#divselect ul li a")[0].innerText;
        // $("#divselect cite").html(txt);
        // 回显的选项id 3
        var selectedId = 1;
        var selectArr = $("#divselect ul li a");
        for (var i = 0; i < selectArr.length; i++) {
          if (selectArr[i].getAttribute("selectid") == selectedId) {
            var txt = selectArr[i].innerText;
          }
        }
        $("#divselect cite").html(txt);
        $("#inputselect").val(selectedId);

        $(".addBtn").click(function () {
          $(".input-wrapper").show();
          $(".addBtn").hide();
        });
        $(".cancelInput").click(function () {
          $(".input-wrapper").hide();
          $(".addBtn").show();
        });
        $(".addInput").click(function () {
          var value = $(".optionInput").val();
          if (!value) {
            layer.msg("请输入内容");
            return;
          } else if (value.length > 10) {
            layer.msg("长度不得超过10中文");
            return;
          }
          var selectId;
          //ajax
          $.ajax({
            cache: true,
            url:
              "//jwtest.rundejy.com/personaltemplate/saveTemplateType?typeName=" +
              value,
            dataType: "json",
            async: false,
            type: "post",
            success: function (result) {
              if (result.code == "Success") {
                selectId = result.msg;
              } else if (result.code == "NotQx") {
                layer.msg("权限不足", { icon: 2, time: 1000 });
              } else {
                layer.msg("失败", { icon: 2, time: 1000 });
              }
            },
            error: function (textStatus) {
              //请求失败后调用的函数
              layer.msg("失败", { icon: 2, time: 1000 });
            },
          });

          // 新增选项返回的id
          var str = `<li><a href="javascript:;" selectid="${selectId}">${value}</a><span class="delBtn">删除</span></li>`;
          $("#divselect ul li:last").after(str);
          $(".optionInput").val("");
          // 给删除按钮绑定点击事件
          var delBtnArr = document.querySelectorAll(".delBtn");

          delBtnArr[delBtnArr.length - 1].onclick = function (e) {
            layer.confirm(
              "是否确认删除该类型，删除后该类型下的所有表单模板将移至未分类此类型下？",
              {
                btn: ["确定", "取消"], //按钮
                title: "",
              },
              function () {
                // 调用删除下拉的接口，并刷新列表
                var id = e.target.previousElementSibling.getAttribute(
                  "selectid"
                );
                //ajax
                $.ajax({
                  cache: true,
                  url:
                    "//jwtest.rundejy.com/personaltemplate/deleteTemplateType?id=" +
                    id,
                  dataType: "json",
                  async: false,
                  type: "post",
                  success: function (result) {
                    if (result.code == "Success") {
                      selectId = result.msg;
                      $(e.target.parentNode).remove();
                      layer.closeAll("dialog");
                      // 如果删除了绑定的那个选项，就把绑定的给换了
                      if (
                        $("#inputselect").val() ==
                        e.target.previousElementSibling.getAttribute("selectid")
                      ) {
                        // 替换成未分类的
                        $("#divselect cite").html("未分类");
                        $("#inputselect").val(1); //换成未分类的id
                      }
                    } else if (result.code == "NotQx") {
                      layer.msg("权限不足", { icon: 2, time: 2000 });
                    } else {
                      layer.msg("失败", { icon: 2, time: 1000 });
                    }
                  },
                  error: function (textStatus) {
                    //请求失败后调用的函数
                    layer.msg("失败", { icon: 2, time: 1000 });
                  },
                });
              },
              function () {}
            );
          };

          // 绑定a标签
          $(".divselect" + " ul li a").click(function () {
            var txt = $(this).text();
            var value = $(this).attr("selectid");
            $(".divselect" + " cite").html(txt);
            $("#inputselect").val(value);
            $(".divselect" + " ul").hide();
          });
        });
      });
      // -----自定义下拉框 end----------

      // 回显的数据
      var editData = {
        templateName: "",
        templateContent: [
          {
            standard: "",
            qualified: "",
            sequence: 1,
            fieldName: "numberfield1",
            id: "2",
            label: "二塔",
            placeholder: "请输入",
            type: "numberfield",
            required: false,
          },
        ],
        templateTypeId: "1",
        // $("#inputselect").val(editData.templateTypeId);
        // [{id: "1", label: "的", type: "dateField", placeholder: "请选择",required: true, standard: "lt",sequence: 1, qualified:"2020-05-11"},
        // {id: "2", label: "shijian", type: "timeField", placeholder: "请选择",required: false, standard: "gt",sequence: 2, qualified:"05:00"},
        // {id: "3", label: "shuzi", type: "numberfield", placeholder: "请选择",required: true, standard: "gt",sequence: 3, qualified:"33"},
        // {id: "4", label: "当时", type: "radio", placeholder: "请选择", required: true,sequence: 4, type: "radio",singleOption: [
        //         "选项一","选项二"
        //     ]},
        // {id: "5", label: "当时dffg", type: "checkBox", placeholder: "请选择", required: false,sequence: 5, checkOption: [
        //         "选项六","选项七"
        //     ]},
        // {id: "6", label: "士大夫", type: "textfield", placeholder: "请输入", required: true,sequence: 6},
        // {id: "7", label: "士大夫dfs", type: "accessoryField", placeholder: "请输入", required: false,sequence: 7},
        // {id: "8", label: "士大士大夫撒旦夫dfs", type: "uploadPicField", placeholder: "请输入", required: true,sequence: 8},]
      };
      $("#inputselect").val(1);
      $("input[name='templateName']").val(editData.templateName);
      var templateContent = editData.templateContent;
      var index = templateContent.length + 1;

      var radioList = [];
      templateContent.forEach((item, index) => {
        // 选项一\r\n选项二
        if (item.type == "radio") {
          radioList.push({
            index: index + 1,
            category: "radio",
            options: item.singleOption
              .map((item) => item.OptionName)
              .join("\n"),
          });
        } else if (item.type == "checkBox") {
          radioList.push({
            index: index + 1,
            category: "checkBox",
            options: item.checkOption.map((item) => item.OptionName).join("\n"),
          });
        }
      });

      templateContent.forEach((item, index) => {
        // 日期
        if (item.type == "dateField") {
          var str = `
                <tr data-index=${item.sequence}>
                  <td><span class="line_num">${item.sequence}</span></td>
                  <td>日期</td>
                  <td><input type="text" name="dateField-label-${item.sequence}" placeholder="长度不超过15个字" maxlength="15" value="${item.label}" required lay-verify="required" autocomplete="off" class="layui-input"></td>
                  <td><input type="text" name="dateField-placeholder-${item.sequence}" maxlength="15" placeholder="${item.placeholder}" autocomplete="off" class="layui-input"></td>
                  <td><input type="checkbox" name="dateField-required-${item.sequence}"></td>
                  <td>———</td>
                  <td>
                    <div class="layui-form date-range" lay-filter="myDiv">
                      <select name="dateField-standard-${item.sequence}" lay-filter="mySelect">
                        <option value="">请选择</option>
                        <option value="gt">大于</option>
                        <option value="gt&equal">大于或等于</option>
                        <option value="lt">小于</option>
                        <option value="lt&equal">小于或等于</option>
                      </select>
                  </div>
                    <input type="text" name="dateField-qualified-${item.sequence}" value="${item.qualified}" class="layui-input date-baseline datetime" placeholder="请选择日期">
                  </td>
                  <td><i class="layui-icon layui-icon-up" style="font-size: 30px;"></i><i class="layui-icon layui-icon-down" style="font-size: 30px;"></i></td>
                  <td><i class="layui-icon layui-icon-close" style="font-size: 30px;" data-index=${item.sequence}></i></td>
                </tr>
                `;
          $(".table-wrapper tbody").append(str);
          $(`select[name="dateField-standard-${item.sequence}"]`).val(
            item.standard
          );
          $(`input[name="dateField-required-${item.sequence}"]`).prop(
            "checked",
            item.required
          );

          // 时间
        } else if (item.type == "timeField") {
          var str = `
                <tr data-index=${item.sequence}>
                  <td><span class="line_num">${item.sequence}</span></td>
                  <td>时间</td>
                  <td><input type="text" name="timeField-label-${item.sequence}" placeholder="长度不超过15个字" maxlength="15" value="${item.label}" required lay-verify="required" autocomplete="off" class="layui-input"></td>
                  <td><input type="text" name="timeField-placeholder-${item.sequence}" maxlength="15" placeholder="${item.placeholder}" autocomplete="off" class="layui-input"></td>
                  <td><input type="checkbox" name="timeField-required-${item.sequence}"></td>
                  <td>———</td>
                  <td>
                    <div class="layui-form date-range" lay-filter="myDiv">
                      <select name="timeField-standard-${item.sequence}" lay-filter="mySelect">
                        <option value="">请选择</option>
                        <option value="gt">大于</option>
                        <option value="gt&equal">大于或等于</option>
                        <option value="lt">小于</option>
                        <option value="lt&equal">小于或等于</option>
                      </select>
                  </div>
                    <input type="text" name="timeField-qualified-${item.sequence}" value="${item.qualified}"  class="layui-input date-baseline timePicker" placeholder="请选择时间">
                  </td>
                  <td><i class="layui-icon layui-icon-up" style="font-size: 30px;"></i><i class="layui-icon layui-icon-down" style="font-size: 30px;"></i></td>
                  <td><i class="layui-icon layui-icon-close" style="font-size: 30px;" data-index=${item.sequence}></i></td>
                </tr>
                `;

          $(".table-wrapper tbody").append(str);
          $(`select[name="timeField-standard-${item.sequence}"]`).val(
            item.standard
          );
          $(`input[name="timeField-required-${item.sequence}"]`).prop(
            "checked",
            item.required
          );

          // 数字输入框
        } else if (item.type == "numberfield") {
          var str = `
                <tr data-index=${item.sequence}>
                  <td><span class="line_num">${item.sequence}</span></td>
                  <td>数字输入框</td>
                  <td><input type="text" name="numberfield-label-${item.sequence}" placeholder="长度不超过15个字" maxlength="15" value="${item.label}" required lay-verify="required" autocomplete="off" class="layui-input"></td>
                  <td><input type="text" name="numberfield-placeholder-${item.sequence}" maxlength="15" placeholder="${item.placeholder}" autocomplete="off" class="layui-input"></td>
                  <td><input type="checkbox" name="numberfield-required-${item.sequence}"></td>
                  <td>———</td>
                  <td>
                    <div class="layui-form date-range" lay-filter="myDiv">
                      <select name="numberfield-standard-${item.sequence}" lay-filter="mySelect">
                        <option value="">请选择</option>
                        <option value="gt">大于</option>
                        <option value="gt&equal">大于或等于</option>
                        <option value="lt">小于</option>
                        <option value="lt&equal">小于或等于</option>
                      </select>
                  </div>
                    <input type="text" name="numberfield-qualified-${item.sequence}" value="${item.qualified}" class="layui-input date-baseline layui-input-number" placeholder="请输入">
                  </td>
                  <td><i class="layui-icon layui-icon-up" style="font-size: 30px;"></i><i class="layui-icon layui-icon-down" style="font-size: 30px;"></i></td>
                  <td><i class="layui-icon layui-icon-close" style="font-size: 30px;" data-index=${item.sequence}></i></td>
                </tr>
                `;

          $(".table-wrapper tbody").append(str);
          $(`select[name="numberfield-standard-${item.sequence}"]`).val(
            item.standard
          );
          $(`input[name="numberfield-required-${item.sequence}"]`).prop(
            "checked",
            item.required
          );

          // 单选框
        } else if (item.type == "radio") {
          var str = `
                <tr data-index=${item.sequence}>
                  <td><span class="line_num">${item.sequence}</span></td>
                  <td>单选框</td>
                  <td><input type="text" name="radio-label-${item.sequence}" placeholder="长度不超过15个字" maxlength="15" value="${item.label}" required lay-verify="required" autocomplete="off" class="layui-input"></td>
                  <td><input type="text" name="radio-placeholder-${item.sequence}" maxlength="15" placeholder="${item.placeholder}" autocomplete="off" class="layui-input"></td>
                  <td><input type="checkbox" name="radio-required-${item.sequence}"></td>
                  <td><div class="layui-btn layui-btn-primary radio-edit" data-index=${item.sequence} data-category="radio" lay-filter="edit">双击编辑选项内容</button></td>
                  <td>
                    ———
                  </td>
                  <td><i class="layui-icon layui-icon-up" style="font-size: 30px;"></i><i class="layui-icon layui-icon-down" style="font-size: 30px;"></i></td>
                  <td><i class="layui-icon layui-icon-close" style="font-size: 30px;" data-index=${item.sequence}></i></td>
                </tr>
                `;
          $(".table-wrapper tbody").append(str);
          $(`input[name="radio-required-${item.sequence}"]`).prop(
            "checked",
            item.required
          );
          layui.form.render();
          showRadioModal();

          // 多选框
        } else if (item.type == "checkBox") {
          var str = `
                <tr data-index=${item.sequence}>
                  <td><span class="line_num">${item.sequence}</span></td>
                  <td>多选框</td>
                  <td><input type="text" name="checkBox-label-${item.sequence}" placeholder="长度不超过15个字" maxlength="15"  value="${item.label}" required lay-verify="required" autocomplete="off" class="layui-input"></td>
                  <td><input type="text" name="checkBox-placeholder-${item.sequence}" maxlength="15"  placeholder="${item.placeholder}" autocomplete="off" class="layui-input"></td>
                  <td><input type="checkbox" name="checkBox-required-${item.sequence}"></td>
                  <td><div class="layui-btn layui-btn-primary radio-edit" data-index=${item.sequence} data-category="checkBox" lay-filter="edit">双击编辑选项内容</button></td>
                  <td>
                    ———
                  </td>
                  <td><i class="layui-icon layui-icon-up" style="font-size: 30px;"></i><i class="layui-icon layui-icon-down" style="font-size: 30px;"></i></td>
                  <td><i class="layui-icon layui-icon-close" style="font-size: 30px;" data-index=${item.sequence}></i></td>
                </tr>
                `;
          $(".table-wrapper tbody").append(str);
          $(`input[name="checkBox-required-${item.sequence}"]`).prop(
            "checked",
            item.required
          );

          // 文字输入框
        } else if (item.type == "textfield") {
          var str = `
                <tr data-index=${item.sequence}>
                  <td><span class="line_num">${item.sequence}</span></td>
                  <td>文字输入框</td>
                  <td><input type="text" name="textfield-label-${item.sequence}" placeholder="长度不超过15个字" maxlength="15"  value="${item.label}" required lay-verify="required" autocomplete="off" class="layui-input"></td>
                  <td><input type="text" name="textfield-placeholder-${item.sequence}" maxlength="15" placeholder="${item.placeholder}" autocomplete="off" class="layui-input"></td>
                  <td><input type="checkbox" name="textfield-required-${item.sequence}"></td>
                  <td>———</td>
                  <td>———</td>
                  <td><i class="layui-icon layui-icon-up" style="font-size: 30px;"></i><i class="layui-icon layui-icon-down" style="font-size: 30px;"></i></td>
                  <td><i class="layui-icon layui-icon-close" style="font-size: 30px;" data-index=${item.sequence}></i></td>
                </tr>
                `;
          $(".table-wrapper tbody").append(str);
          $(`input[name="textfield-required-${item.sequence}"]`).prop(
            "checked",
            item.required
          );

          // 附件输入框
        } else if (item.type == "accessoryField") {
          var str = `
                <tr data-index=${item.sequence}>
                  <td><span class="line_num">${item.sequence}</span></td>
                  <td>附件</td>
                  <td><input type="text" name="accessoryField-label-${item.sequence}" placeholder="长度不超过15个字" maxlength="15" value="${item.label}" required lay-verify="required" autocomplete="off" class="layui-input"></td>
                  <td><input type="text" name="accessoryField-placeholder-${item.sequence}" maxlength="15" placeholder="${item.placeholder}" autocomplete="off" class="layui-input"></td>
                  <td><input type="checkbox" name="accessoryField-required-${item.sequence}"></td>
                  <td>———</td>
                  <td>———</td>
                  <td><i class="layui-icon layui-icon-up" style="font-size: 30px;"></i><i class="layui-icon layui-icon-down" style="font-size: 30px;"></i></td>
                  <td><i class="layui-icon layui-icon-close" style="font-size: 30px;" data-index=${item.sequence}></i></td>
                </tr>
                `;
          $(".table-wrapper tbody").append(str);
          $(`input[name="accessoryField-required-${item.sequence}"]`).prop(
            "checked",
            item.required
          );

          // 图片输入框
        } else if (item.type == "uploadPicField") {
          var str = `
                <tr data-index=${item.sequence}>
                  <td><span class="line_num">${item.sequence}</span></td>
                  <td>图片</td>
                  <td><input type="text" name="uploadPicField-label-${item.sequence}" placeholder="长度不超过15个字" maxlength="15" value="${item.label}" required lay-verify="required" autocomplete="off" class="layui-input"></td>
                  <td><input type="text" name="uploadPicField-placeholder-${item.sequence}" maxlength="15" placeholder="${item.placeholder}" autocomplete="off" class="layui-input"></td>
                  <td><input type="checkbox" name="uploadPicField-required-${item.sequence}"></td>
                  <td>———</td>
                  <td>———</td>
                  <td><i class="layui-icon layui-icon-up" style="font-size: 30px;"></i><i class="layui-icon layui-icon-down" style="font-size: 30px;"></i></td>
                  <td><i class="layui-icon layui-icon-close" style="font-size: 30px;" data-index=${item.sequence}></i></td>
                </tr>
                `;
          $(".table-wrapper tbody").append(str);
          $(`input[name="uploadPicField-required-${item.sequence}"]`).prop(
            "checked",
            item.required
          );
        }
      });

      layui.form.render();

      // 给删除和排序按钮绑定事件
      document.querySelector(".layui-table").onclick = function (e) {
        // 删除
        if ($(e.target).is(".layui-icon-close")) {
          $(e.target.parentNode.parentNode).remove();
          showArrows();
          numCheck();
        }
        // 上升
        if ($(e.target).is(".layui-icon-up")) {
          swapDom(
            e.target.parentNode.parentNode,
            e.target.parentNode.parentNode.previousElementSibling
          );
          showArrows();
          numCheck();
        }
        // 下降
        if ($(e.target).is(".layui-icon-down")) {
          swapDom(
            e.target.parentNode.parentNode.nextElementSibling,
            e.target.parentNode.parentNode
          );
          showArrows();
          numCheck();
        }
      };

      layui.use(["laydate", "form", "layer"], function () {
        var laydate = layui.laydate;
        var layform = layui.form;
        var table = layui.table;
        var layer = layui.layer;
        layform.render();

        // 日期选择器
        function timeAdd() {
          lay(".datetime").each(function () {
            laydate.render({
              elem: this,
              trigger: "click",
            });
          });
        }

        // 时间选择器
        function timePickerAdd() {
          lay(".timePicker").each(function () {
            laydate.render({
              elem: this,
              trigger: "click",
              type: "time",
              format: "HH:mm",
            });
          });
        }

        // 初始化日期组件
        timeAdd();
        timePickerAdd();
        showRadioModal();
        showArrows();

        // 点击左侧tag 右侧添加数据
        var tags = document.querySelector(".tags-wrapper");
        tags.onclick = function (e) {
          if (!$(e.target).is(".tags")) {
            return;
          }
          // 日期input框
          var dateStr = `
              <tr data-index=${index}>
                <td><span class="line_num">${index}</span></td>
                <td>日期</td>
                <td><input type="text" name="dateField-label-${index}" placeholder="长度不超过15个字" maxlength="15" required lay-verify="required" autocomplete="off" class="layui-input"></td>
                <td><input type="text" name="dateField-placeholder-${index}" maxlength="15" placeholder="请选择" autocomplete="off" class="layui-input"></td>
                <td><input type="checkbox" name="dateField-required-${index}"></td>
                <td>———</td>
                <td>
                  <div class="layui-form date-range" lay-filter="myDiv">
                    <select name="dateField-standard-${index}" lay-filter="mySelect">
                       <option value="">请选择</option>
                       <option value="gt">大于</option>
                       <option value="gt&equal">大于或等于</option>
                       <option value="lt">小于</option>
                       <option value="lt&equal">小于或等于</option>
                    </select>
                 </div>
                  <input type="text" name="dateField-qualified-${index}" class="layui-input date-baseline datetime" placeholder="请选择日期">
                </td>
                <td><i class="layui-icon layui-icon-up" style="font-size: 30px;"></i><i class="layui-icon layui-icon-down" style="font-size: 30px;"></i></td>
                <td><i class="layui-icon layui-icon-close" style="font-size: 30px;" data-index=${index}></i></td>
              </tr>
              `;
          // 文字输入框
          var textStr = `
              <tr data-index=${index}>
                <td><span class="line_num">${index}</span></td>
                <td>文字输入框</td>
                <td><input type="text" name="textfield-label-${index}" placeholder="长度不超过15个字" maxlength="15" required lay-verify="required" autocomplete="off" class="layui-input"></td>
                <td><input type="text" name="textfield-placeholder-${index}" maxlength="15" placeholder="请输入" autocomplete="off" class="layui-input"></td>
                <td><input type="checkbox" name="textfield-required-${index}"></td>
                <td>———</td>
                <td>———</td>
                <td><i class="layui-icon layui-icon-up" style="font-size: 30px;"></i><i class="layui-icon layui-icon-down" style="font-size: 30px;"></i></td>
                <td><i class="layui-icon layui-icon-close" style="font-size: 30px;" data-index=${index}></i></td>
              </tr>
              `;

          // 单选框
          var radioStr = `
              <tr data-index=${index}>
                <td><span class="line_num">${index}</span></td>
                <td>单选框</td>
                <td><input type="text" name="radio-label-${index}" placeholder="长度不超过15个字" maxlength="15" required lay-verify="required" autocomplete="off" class="layui-input"></td>
                <td><input type="text" name="radio-placeholder-${index}" maxlength="15" placeholder="请选择" autocomplete="off" class="layui-input"></td>
                <td><input type="checkbox" name="radio-required-${index}"></td>
                <td><div class="layui-btn layui-btn-primary radio-edit" data-index=${index} data-category="radio" lay-filter="edit">双击编辑选项内容</button></td>
                <td>
                  ———
                </td>
                <td><i class="layui-icon layui-icon-up" style="font-size: 30px;"></i><i class="layui-icon layui-icon-down" style="font-size: 30px;"></i></td>
                <td><i class="layui-icon layui-icon-close" style="font-size: 30px;" data-index=${index}></i></td>
              </tr>
              `;

          // 多选框
          var checkBoxStr = `
              <tr data-index=${index}>
                <td><span class="line_num">${index}</span></td>
                <td>多选框</td>
                <td><input type="text" name="checkBox-label-${index}" placeholder="长度不超过15个字" maxlength="15" required lay-verify="required" autocomplete="off" class="layui-input"></td>
                <td><input type="text" name="checkBox-placeholder-${index}" maxlength="15" placeholder="请选择" autocomplete="off" class="layui-input"></td>
                <td><input type="checkbox" name="checkBox-required-${index}"></td>
                <td><div class="layui-btn layui-btn-primary radio-edit" data-index=${index} data-category="checkBox" lay-filter="edit">双击编辑选项内容</button></td>
                <td>
                  ———
                </td>
                <td><i class="layui-icon layui-icon-up" style="font-size: 30px;"></i><i class="layui-icon layui-icon-down" style="font-size: 30px;"></i></td>
                <td><i class="layui-icon layui-icon-close" style="font-size: 30px;" data-index=${index}></i></td>
              </tr>
              `;

          // 附件
          var appendixStr = `
              <tr data-index=${index}>
                <td><span class="line_num">${index}</span></td>
                <td>附件</td>
                <td><input type="text" name="accessoryField-label-${index}" placeholder="长度不超过15个字" maxlength="15" required lay-verify="required" autocomplete="off" class="layui-input"></td>
                <td><input type="text" name="accessoryField-placeholder-${index}" maxlength="15" placeholder="请上传附件" autocomplete="off" class="layui-input"></td>
                <td><input type="checkbox" name="accessoryField-required-${index}"></td>
                <td>———</td>
                <td>———</td>
                <td><i class="layui-icon layui-icon-up" style="font-size: 30px;"></i><i class="layui-icon layui-icon-down" style="font-size: 30px;"></i></td>
                <td><i class="layui-icon layui-icon-close" style="font-size: 30px;" data-index=${index}></i></td>
              </tr>
              `;

          // 图片
          var picStr = `
              <tr data-index=${index}>
                <td><span class="line_num">${index}</span></td>
                <td>图片</td>
                <td><input type="text" name="uploadPicField-label-${index}" placeholder="长度不超过15个字" maxlength="15" required lay-verify="required" autocomplete="off" class="layui-input"></td>
                <td><input type="text" name="uploadPicField-placeholder-${index}" maxlength="15" placeholder="请上传图片" autocomplete="off" class="layui-input"></td>
                <td><input type="checkbox" name="uploadPicField-required-${index}"></td>
                <td>———</td>
                <td>———</td>
                <td><i class="layui-icon layui-icon-up" style="font-size: 30px;"></i><i class="layui-icon layui-icon-down" style="font-size: 30px;"></i></td>
                <td><i class="layui-icon layui-icon-close" style="font-size: 30px;" data-index=${index}></i></td>
              </tr>
              `;

          // 时间
          var timeStr = `
              <tr data-index=${index}>
                <td><span class="line_num">${index}</span></td>
                <td>时间</td>
                <td><input type="text" name="timeField-label-${index}" placeholder="长度不超过15个字" maxlength="15" required lay-verify="required" autocomplete="off" class="layui-input"></td>
                <td><input type="text" name="timeField-placeholder-${index}" maxlength="15" placeholder="请选择" autocomplete="off" class="layui-input"></td>
                <td><input type="checkbox" name="timeField-required-${index}"></td>
                <td>———</td>
                <td>
                  <div class="layui-form date-range" lay-filter="myDiv">
                    <select name="timeField-standard-${index}" lay-filter="mySelect">
                      <option value="">请选择</option>
                       <option value="gt">大于</option>
                       <option value="gt&equal">大于或等于</option>
                       <option value="lt">小于</option>
                       <option value="lt&equal">小于或等于</option>
                    </select>
                 </div>
                  <input type="text" name="timeField-qualified-${index}" class="layui-input date-baseline timePicker" placeholder="请选择时间">
                </td>
                <td><i class="layui-icon layui-icon-up" style="font-size: 30px;"></i><i class="layui-icon layui-icon-down" style="font-size: 30px;"></i></td>
                <td><i class="layui-icon layui-icon-close" style="font-size: 30px;" data-index=${index}></i></td>
              </tr>
              `;

          // 数字输入框
          var numberStr = `
              <tr data-index=${index}>
                <td><span class="line_num">${index}</span></td>
                <td>数字输入框</td>
                <td><input type="text" name="numberfield-label-${index}" placeholder="长度不超过15个字" maxlength="15" required lay-verify="required" autocomplete="off" class="layui-input"></td>
                <td><input type="text" name="numberfield-placeholder-${index}" maxlength="15" placeholder="请选择" autocomplete="off" class="layui-input"></td>
                <td><input type="checkbox" name="numberfield-required-${index}"></td>
                <td>———</td>
                <td>
                  <div class="layui-form date-range" lay-filter="myDiv">
                    <select name="numberfield-standard-${index}" lay-filter="mySelect">
                      <option value="">请选择</option>
                       <option value="gt">大于</option>
                       <option value="gt&equal">大于或等于</option>
                       <option value="lt">小于</option>
                       <option value="lt&equal">小于或等于</option>
                    </select>
                 </div>
                  <input type="text" name="numberfield-qualified-${index}" class="layui-input date-baseline layui-input-number" placeholder="请输入">
                </td>
                <td><i class="layui-icon layui-icon-up" style="font-size: 30px;"></i><i class="layui-icon layui-icon-down" style="font-size: 30px;"></i></td>
                <td><i class="layui-icon layui-icon-close" style="font-size: 30px;" data-index=${index}></i></td>
              </tr>
              `;

          var type = e.target.getAttribute("data-type");
          if (type == "date") {
            $(".table-wrapper tbody").append(dateStr);
          } else if (type == "text") {
            $(".table-wrapper tbody").append(textStr);
          } else if (type == "radio") {
            $(".table-wrapper tbody").append(radioStr);
          } else if (type == "checkBox") {
            $(".table-wrapper tbody").append(checkBoxStr);
          } else if (type == "appendix") {
            $(".table-wrapper tbody").append(appendixStr);
          } else if (type == "pic") {
            $(".table-wrapper tbody").append(picStr);
          } else if (type == "time") {
            $(".table-wrapper tbody").append(timeStr);
          } else if (type == "number") {
            $(".table-wrapper tbody").append(numberStr);
          }

          showArrows();
          index = index + 1;
          numCheck();
          timeAdd();
          layform.render();

          showRadioModal();
          timePickerAdd();

          document.querySelector(".layui-table").onclick = function (e) {
            // 删除
            if ($(e.target).is(".layui-icon-close")) {
              $(e.target.parentNode.parentNode).remove();
              showArrows();
              numCheck();
            }
            // 上升
            if ($(e.target).is(".layui-icon-up")) {
              swapDom(
                e.target.parentNode.parentNode,
                e.target.parentNode.parentNode.previousElementSibling
              );
              showArrows();
              numCheck();
            }
            // 下降
            if ($(e.target).is(".layui-icon-down")) {
              swapDom(
                e.target.parentNode.parentNode.nextElementSibling,
                e.target.parentNode.parentNode
              );
              showArrows();
              numCheck();
            }
          };
        };

        // 监听单选框/多选框表单提交
        layform.on("submit(modelSubmit)", function (data) {
          var text = data.field.desc;
          var options = text;
          try {
            encodeURIComponent(options)
              .split("%0A")
              .forEach((item) => {
                if (decodeURIComponent(item).length > 15) {
                  layer.msg("每个选项最大输入长度为15", { icon: 5 });
                  throw new error();
                }
              });
          } catch (err) {
            return false;
          }

          radioList.forEach((item) => {
            if (item.index == localStorage.getItem("radioIndex")) {
              item.options = options;
            }
          });
          layer.closeAll();
          return false;
        });
        $(".radio-model-cancel").click(function () {
          layer.closeAll();
        });

        // ---------提交表单-----------------
        layform.on("submit(demo1)", function (data) {
          if (upLoadClicktag == 0) {
            //改版变量
            upLoadClicktag = 1;

            //此处写你要做的事情，操作DOM，发送ajax请求等等。

            //3秒过后可以再次点击
            setTimeout(function () {
              upLoadClicktag = 0;
            }, 3000);
          } else {
            layer.open({
              title: "提示",
              content: "请勿频繁操作！",
            });
            return false;
          }

          var datas = data.field;
          var trArr = $(".layui-table tbody tr");
          var indexArr = [];
          for (var i = 0; i < trArr.length; i++) {
            indexArr.push({
              id: trArr[i].getAttribute("data-index"),
            });
          }

          // 把form表单数据转成需要提交的格式
          indexArr.forEach((item) => {
            for (var key in datas) {
              var namsArr = key.split("-");
              if (namsArr[2] == item.id) {
                item[namsArr[1]] = datas[key];
                item.type = namsArr[0];
              }
            }
          });
          // 对单选 多选进行处理
          indexArr.forEach((item, index) => {
            // 添加排序序号, 转换required为布尔值
            item.sequence = index + 1;
            if (item.required) {
              item.required = true;
            } else {
              item.required = false;
            }
            // 如果是单选 多选，需要添加选项
            if (item.type == "radio" || item.type == "checkBox") {
              if (!radioList.length) {
                layer.msg("请编辑选项内容", { icon: 5 });
                return;
              }
              radioList.forEach((ele) => {
                if (ele.index == item.id && ele.category == item.type) {
                  var optionsArr = [];
                  // 去掉空选项 以及去重
                  uniq(encodeURIComponent(ele.options).split("%0A")).forEach(
                    (op) => {
                      if (op) {
                        optionsArr.push({
                          OptionName: decodeURIComponent(op),
                        });
                      }
                    }
                  );
                  if (item.type == "radio") {
                    item.singleOption = optionsArr;
                  }
                  if (item.type == "checkBox") {
                    item.checkOption = optionsArr;
                  }
                }
              });
            }
          });

          // 判断所有选项是否有写内容，判断时间/日期/数字输入框的合格标准是否同时填写\
          try {
            indexArr.forEach((item) => {
              if (item.type == "radio") {
                if (item.singleOption) {
                  if (
                    !item.singleOption[0].OptionName ||
                    item.singleOption[0].OptionName == "undefined"
                  ) {
                    layer.msg("请编辑第" + item.sequence + "项选项内容", {
                      icon: 5,
                    });
                    throw new error();
                  }
                } else {
                  layer.msg("请编辑第" + item.sequence + "项选项内容", {
                    icon: 5,
                  });
                  throw new error();
                }
              } else if (item.type == "checkBox") {
                if (item.checkOption) {
                  if (
                    !item.checkOption[0].OptionName ||
                    item.checkOption[0].OptionName == "undefined"
                  ) {
                    layer.msg("请编辑第" + item.sequence + "项选项内容", {
                      icon: 5,
                    });
                    throw new error();
                  }
                } else {
                  layer.msg("请编辑第" + item.sequence + "项选项内容", {
                    icon: 5,
                  });
                  throw new error();
                }
              } else if (
                item.type == "timeField" ||
                item.type == "dateField" ||
                item.type == "numberfield"
              ) {
                // standard qualified 必须同时填写
                if (
                  (item.standard && !item.qualified) ||
                  (!item.standard && item.qualified)
                ) {
                  layer.msg(
                    "第" + item.sequence + "项的合格标准必须两项都填写",
                    { icon: 5 }
                  );
                  throw new error();
                }
                if (
                  item.type == "numberfield" &&
                  item.standard &&
                  item.qualified
                ) {
                  if (isNaN(item.qualified)) {
                    layer.msg(
                      "第" + item.sequence + "项的合格标准输入框必须为数字",
                      { icon: 5 }
                    );
                    throw new error();
                  }
                }
              }

              // placeholder判断 如果是空值，就传默认的，有值就传值
              // 文字输入框/数字输入框：请输入  日期/单选框/多选框/时间：请选择  附件：请上传附件 图片：请上传图片
              if (!item.placeholder) {
                // 判断是否是原回显的数据
                var exitIndex = editData.templateContent.findIndex(
                  (ele) => ele.id == item.id
                );
                if (exitIndex >= 0) {
                  item.placeholder = editData.templateContent.find(
                    (ele) => ele.id == item.id
                  ).placeholder;
                } else {
                  if (item.type == "textfield" || item.type == "numberfield") {
                    item.placeholder = "请输入";
                  } else if (item.type == "accessoryField") {
                    item.placeholder = "请上传附件";
                  } else if (item.type == "uploadPicField") {
                    item.placeholder = "请上传图片";
                  } else {
                    item.placeholder = "请选择";
                  }
                }
              }
            });
          } catch {
            return false;
          }

          if (!indexArr.length) {
            layer.open({
              title: "提示",
              content: "当前表单模板内容为空，无法保存！",
            });
            return false;
          }
          var submitData = {
            id: 147,
            templateName: datas.templateName,
            templateTypeId: $("#inputselect").val(),
            templateContent: JSON.stringify(indexArr).replace(/\\r/g, ""),
          };

          // 拿新的模板跟原本的匹配，如果templateContent，没有变化，调用update,如果templateContent有变化，调用save
          var isSame = true;
          if (indexArr.length != editData.templateContent.length) {
            isSame = false;
          } else {
            indexArr.forEach((item, index) => {
              if (
                !isObjectValueEqual(
                  indexArr[index],
                  editData.templateContent[index]
                )
              ) {
                isSame = false;
              }
            });
          }
          var anyData = 1;
          if (anyData == "1") {
            // 更新
            $.ajax({
              cache: true,
              url: "//jwtest.rundejy.com/personaltemplate/editJsp",
              dataType: "json",
              async: false,
              type: "post",
              data: submitData,
              success: function (result) {
                if (result.code == "Success") {
                  layer.msg("成功", { icon: 1, time: 1000 }, function () {
                    parent.location.href =
                      "//jwtest.rundejy.com/personaltemplate/listJsp";
                  });
                } else if (result.code == "NotQx") {
                  layer.msg("权限不足", { icon: 2, time: 1000 });
                } else {
                  layer.msg("失败", { icon: 2, time: 1000 });
                }
              },
              error: function (textStatus) {
                //请求失败后调用的函数
                layer.msg("失败", { icon: 2, time: 1000 });
              },
            });
            return false;
          } else {
            if (isSame) {
              // 更新
              $.ajax({
                cache: true,
                url: "//jwtest.rundejy.com/personaltemplate/editJsp",
                dataType: "json",
                async: false,
                type: "post",
                data: submitData,
                success: function (result) {
                  if (result.code == "Success") {
                    layer.msg("成功", { icon: 1, time: 1000 }, function () {
                      parent.location.href =
                        "//jwtest.rundejy.com/personaltemplate/listJsp";
                    });
                  } else if (result.code == "NotQx") {
                    layer.msg("权限不足", { icon: 2, time: 1000 });
                  } else {
                    layer.msg("失败", { icon: 2, time: 1000 });
                  }
                },
                error: function (textStatus) {
                  //请求失败后调用的函数
                  layer.msg("失败", { icon: 2, time: 1000 });
                },
              });
              return false;
            } else {
              layer.confirm(
                "当前表单模板已更改，将另存为新的表单模板！",
                { title: "提示" },
                function (index) {
                  layer.close(index);
                  $.ajax({
                    cache: true,
                    url: "//jwtest.rundejy.com/personaltemplate/save",
                    dataType: "json",
                    async: false,
                    type: "post",
                    data: submitData,
                    success: function (result) {
                      if (result.code == "Success") {
                        layer.msg("成功", { icon: 1, time: 1000 }, function () {
                          parent.location.href =
                            "//jwtest.rundejy.com/personaltemplate/listJsp";
                        });
                      } else if (result.code == "NotQx") {
                        layer.msg("权限不足", { icon: 2, time: 1000 });
                      } else {
                        layer.msg("失败", { icon: 2, time: 1000 });
                      }
                    },
                    error: function (textStatus) {
                      //请求失败后调用的函数
                      layer.msg("失败", { icon: 2, time: 1000 });
                    },
                  });
                  return false;
                }
              );
            }
          }
          return false;
        });
      });

      // 判断两个对象的值的属性名和值是否相等
      function isObjectValueEqual(a, b) {
        //取对象a和b的属性名
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);

        var index = bProps.findIndex((item) => item == "fieldName");
        if (index >= 0) {
          bProps.splice(index, 1);
        }

        //判断属性名的length是否一致
        if (aProps.length != bProps.length) {
          return false;
        }
        //循环取出属性名，再判断属性值是否一致
        for (var i = 0; i < aProps.length; i++) {
          var propName = aProps[i];
          if (typeof a[propName] == "object") {
            return isObjectValueEqual(a[propName], b[propName]);
          } else {
            if (a[propName] !== b[propName]) {
              return false;
            }
          }
        }
        return true;
      }

      // 交换两个节点的位置
      function swapDom(dom1, dom2) {
        var parentNode1 = dom1.parentNode;
        var nextNode1 = dom1.nextElementSibling;
        dom2.parentNode.insertBefore(dom1, dom2);
        if (nextNode1) {
          parentNode1.insertBefore(dom2, nextNode1);
        } else {
          parentNode1.appendChild(dom2);
        }
      }

      // 头部和底部的箭头判断
      function showArrows() {
        var length = $(".layui-table tbody tr").length;
        for (var i = 0; i < $(".layui-table tbody tr").length; i++) {
          $($(".layui-table tbody tr")[i])
            .find(".layui-icon-up")
            .css("display", "inline");
          $($(".layui-table tbody tr")[i])
            .find(".layui-icon-down")
            .css("display", "inline");
        }
        $($(".layui-table tbody tr")[0])
          .find(".layui-icon-up")
          .css("display", "none");
        $($(".layui-table tbody tr")[length - 1])
          .find(".layui-icon-down")
          .css("display", "none");
      }

      // 检查序号
      function numCheck() {
        var num = $(".layui-table tbody tr").length; //获取行数
        for (var i = 0; i <= num; i++) {
          //进行循环
          $(".layui-table tbody tr .line_num")
            .eq(i)
            .html(i + 1);
        }
      }

      // 单选框弹出层
      function showRadioModal() {
        layui.use(["form"], function () {
          var layform = layui.form;
          lay(".radio-edit").each(function () {
            this.ondblclick = function (e) {
              var index = e.target.getAttribute("data-index");
              var category = e.target.getAttribute("data-category");
              localStorage.setItem("radioIndex", index);
              var isExit = radioList.find((item) => item.index == index);
              if (!isExit) {
                radioList.push({
                  index,
                  category,
                });
                layform.val("radio-form", {
                  desc: "",
                });
              } else {
                radioList.forEach((item) => {
                  if (item.index == localStorage.getItem("radioIndex")) {
                    layform.val("radio-form", {
                      desc: item.options,
                    });
                  }
                });
              }
              layer.open({
                title: "编辑选项内容",
                type: 1,
                content: $(".radio-modal"),
              });
            };
          });
        });
      }

      // 数组去重
      function uniq(array) {
        var temp = [];
        var index = [];
        var l = array.length;
        for (var i = 0; i < l; i++) {
          for (var j = i + 1; j < l; j++) {
            if (array[i] === array[j]) {
              i++;
              j = i;
            }
          }
          temp.push(array[i]);
          index.push(i);
        }
        return temp;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dailyForm-container {
  padding: 16px 25px;
}
.tags-wrapper {
  border: 1px solid #e6e6e6;
  min-height: 600px;
  padding: 30px;
}
.tags-wrapper .tags {
  width: 45%;
  border-radius: 5px;
  border: 1px solid #666;
  text-align: center;
  float: left;
  margin-right: 5%;
  margin-bottom: 30px;
  cursor: pointer;
}
.tags-wrapper .tags:nth-child(even) {
  float: right;
  margin-right: 0;
}
.table-wrapper {
  border: 1px solid #e6e6e6;
  min-height: 600px;
  padding: 30px;
  padding-top: 24px;
}

.date-range {
  width: 45%;
  float: left;
  margin-right: 10px;
}

.date-baseline {
  width: 45%;
}

/deep/ .layui-form-checkbox i {
  border-left: 1px solid #d2d2d2;
}

.clearfloat:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}

.clearfloat {
  zoom: 1;
}

.submit-btn {
  float: right;
}

.radio-modal {
  text-align: center;
  width: 200px;
  padding: 5px 15px 10px 15px;
  display: none;
}

.radio-modal .layui-textarea {
  margin-bottom: 10px;
  width: 200px;
  display: inline-block;
}

.star {
  color: red;
}

.time-item {
  margin-left: 34px;
  margin-bottom: 20px;
}
/* 下拉选择框样式start */
#divselect {
  width: 186px;
  /* margin: 80px auto;
            position: relative; */
  z-index: 10000;
}
#divselect cite {
  width: 300px;
  height: 38px;
  line-height: 38px;
  display: block;
  color: #807a62;
  cursor: pointer;
  font-style: normal;
  padding-left: 4px;
  padding-right: 30px;
  border: 1px solid #e6e6e6;
}
#divselect ul {
  width: 335px;
  /* border: 1px solid #333333; */
  box-shadow: 0px 1px 6px 0px rgba(50, 120, 192, 0.15);
  background-color: #ffffff;
  position: absolute;
  z-index: 20000;
  margin-top: 4px;
  display: none;
  padding: 0;
}
#divselect ul li {
  height: 39px;
  line-height: 39px;
}
#divselect ul li:hover {
  background-color: #f3f6fb;
}
#divselect ul .configItem {
  height: 39px;
  line-height: 39px;
}
#divselect ul li a {
  height: 100%;
  width: 70%;
  display: inline-block;
  color: #333333;
  text-decoration: none;
  padding-left: 10px;
  padding-right: 10px;
}
#divselect ul li .delBtn {
  cursor: pointer;
  color: #5fb878;
  float: right;
  margin-right: 15px;
}
#divselect .addBtn {
  text-align: center;
}
#divselect .addBtn span {
  cursor: pointer;
}
#divselect .input-wrapper {
  display: none;
}
#divselect .optionInput {
  width: 225px;
  height: 25px;
  padding-left: 4px;
  display: inline-block;
  margin-left: 10px;
}
#divselect .layui-btn {
  width: 34px;
  height: 25px;
  padding: 0;
  line-height: 25px;
}
#divselect .cancelInput {
  margin-left: 10px;
}
#divselect .layui-btn + .layui-btn {
  margin-left: 5px;
}
/* 下拉选择框样式end */
</style>
