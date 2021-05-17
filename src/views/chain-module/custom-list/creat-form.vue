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
                        <div class="layui-inline">
                            <label class="layui-form-label"><span class="star">*</span>表单名称</label>
                            <div class="layui-input-inline" style="width: 300px;">
                                <input type="text" name="templateName" placeholder="请输入表单名称，长度不超过15个字"  maxlength="15" required lay-verify="required" autocomplete="off" class="layui-input">
                            </div>
                        </div>

                        <div class="layui-inline">
                            <label class="layui-form-label">类型</label>
                            <!-- 自定义下拉框start -->
                            <div class="layui-input-inline" style="width: 300px;">
                                <div id="divselect" class="divselect">
                                    <cite>请选择</cite>
                                    <ul>
                                        
                                            <li><a href="javascript:;" selectid="1">未分类</a>
                                                
                                                    
                                                
                                            </li>
                                        
                                            <li><a href="javascript:;" selectid="45">测试2</a>
                                                
                                                    
                                                        <span class="delBtn">删除</span>
                                                    
                                                
                                            </li>
                                        
                                            <li><a href="javascript:;" selectid="52">测试1</a>
                                                
                                                    
                                                        <span class="delBtn">删除</span>
                                                    
                                                
                                            </li>
                                        
                                            <li><a href="javascript:;" selectid="55">生产企业客户</a>
                                                
                                                    
                                                        <span class="delBtn">删除</span>
                                                    
                                                
                                            </li>
                                        
                                            <li><a href="javascript:;" selectid="56">批发企业客户</a>
                                                
                                                    
                                                        <span class="delBtn">删除</span>
                                                    
                                                
                                            </li>
                                        
                                            <li><a href="javascript:;" selectid="57">连锁客户</a>
                                                
                                                    
                                                        <span class="delBtn">删除</span>
                                                    
                                                
                                            </li>
                                        
                                            <li><a href="javascript:;" selectid="58">门店客户</a>
                                                
                                                    
                                                        <span class="delBtn">删除</span>
                                                    
                                                
                                            </li>
                                        
                                        <div class="addBtn configItem"><span>+ 添加类型</span></div>
                                        <div class="input-wrapper configItem">
                                            <input type="text" class="optionInput layui-input" placeholder="请输入类型，长度不得超过10中文">
                                            <div class="cancelInput layui-btn layui-btn-primary">取消</div>
                                            <div class="addInput layui-btn">确定</div>
                                        </div>
                                    </ul>
                                    <input name="" value="" id="inputselect" style="display: none;"/>
                                </div>
                            </div>
                            <!-- 自定义下拉框end -->
                        </div>

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
                            <th>合格标准</th>
                            <th>排序</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>

                    </table>
                    <button class="layui-btn submit-btn" lay-submit="" lay-filter="demo1">立即提交</button>

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
        <button class="layui-btn" lay-submit lay-filter="modelSubmit">确认</button>
    </form>
</div>
  </div>
</template>
<script>

export default {
  name:"create-form",
  data(){
    return {
    }
  },
  mounted(){
      
  },
   methods: {
  }
}
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
        .tags-wrapper .tags:nth-child(even){
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

        .layui-form-checkbox i {
            border-left: 1px solid #d2d2d2;
        }

        .clearfloat:after {
            display: block;
            clear: both;
            content: "";
            visibility: hidden;
            height: 0
        }

        .clearfloat {
            zoom: 1
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
            box-shadow:0px 1px 6px 0px rgba(50,120,192,0.15);
            background-color: #ffffff;
            position: absolute;
            z-index: 20000;
            margin-top: 4px;
            display: none;
            padding: 0;
        }
        #divselect ul li{
            height: 39px;
            line-height: 39px;
        }
        #divselect ul li:hover {
            background-color: #F3F6FB;
        }
        #divselect ul .configItem {
            height: 39px;
            line-height: 39px;
        }
        #divselect ul li a{
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
            color: #5FB878;
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
        #divselect .layui-btn+.layui-btn {
            margin-left: 5px;
        }
        /* 下拉选择框样式end */
</style>
