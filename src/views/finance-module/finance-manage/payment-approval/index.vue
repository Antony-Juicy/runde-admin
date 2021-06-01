<template>
  <div class="order-list">
      <div class="w-container">
        <el-form ref="form" :model="form" label-width="80px">
            <el-row :gutter="20">
                    <el-col :span="2">
                        <div class="label-wrapper">
                            学员信息：
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <el-input size="small" placeholder="订单ID"></el-input>
                    </el-col>
                    <el-col :span="3">
                        <el-input size="small" placeholder="学员姓名"></el-input>
                    </el-col>
                    <el-col :span="3">
                        <el-input size="small" placeholder="付款方账户名"></el-input>
                    </el-col>
                    <el-col :span="3">
                        <el-select size="small" v-model="form.type" placeholder="学年">
                        </el-select>
                    </el-col>
            </el-row>
            <div class="line-divider"></div>
            <el-row :gutter="20">
                    <el-col :span="2">
                        <div class="label-wrapper">
                            班型信息：
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <el-select size="small" v-model="form.type" placeholder="项目">
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <el-select size="small" v-model="form.type" placeholder="科目">
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <el-select size="small" v-model="form.type" placeholder="班型">
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <el-select size="small" v-model="form.type" placeholder="课程信息">
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <el-select size="small" v-model="form.type" placeholder="校区">
                        </el-select>
                    </el-col>
            </el-row>
            <div class="line-divider"></div>
            <template v-if="showAll">
                <el-row :gutter="20">
                        <el-col :span="2">
                            <div class="label-wrapper">
                                缴费信息：
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <el-date-picker size="small"
                                v-model="form.type"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="创建日期(开始)"
                                end-placeholder="创建日期(结束)">
                            </el-date-picker>
                        </el-col>
                        <el-col :span="6">
                            <el-date-picker size="small"
                                v-model="form.type"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="缴费日期(开始)"
                                end-placeholder="缴费日期(结束)">
                            </el-date-picker>
                        </el-col>
                        <el-col :span="6">
                            <el-date-picker size="small"
                                v-model="form.type"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="审批完成日期(开始)"
                                end-placeholder="审批完成日期(结束)">
                            </el-date-picker>
                        </el-col>
                </el-row>
                <div class="line-divider"></div>
                <el-row :gutter="20">
                        <el-col :span="2">
                            <div class="label-wrapper">
                                订单信息：
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <el-select size="small" v-model="form.type" placeholder="收款银行">
                            </el-select>
                        </el-col>
                        <el-col :span="3">
                            <el-select size="small" v-model="form.type" placeholder="订单类型">
                            </el-select>
                        </el-col>
                        <el-col :span="3">
                            <el-select size="small" v-model="form.type" placeholder="到账时间">
                            </el-select>
                        </el-col>
                </el-row>
                <div class="line-divider"></div>
                <el-row :gutter="20">
                        <el-col :span="2">
                            <div class="label-wrapper">
                                服务信息：
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <el-select size="small" v-model="form.type" placeholder="招生老师">
                            </el-select>
                        </el-col>
                        <el-col :span="3">
                            <el-select size="small" v-model="form.type" placeholder="市场老师">
                            </el-select>
                        </el-col>
                        <el-col :span="3">
                            <el-select size="small" v-model="form.type" placeholder="教务老师">
                            </el-select>
                        </el-col>
                </el-row>
                <div class="line-divider"></div>
                
                <el-row :gutter="20">
                        <el-col :span="2">
                            <div class="label-wrapper">
                                其他：
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <el-select size="small" v-model="form.type" placeholder="缴费类型">
                            </el-select>
                        </el-col>
                        <el-col :span="3">
                            <el-select size="small" v-model="form.type" placeholder="钱款类型">
                            </el-select>
                        </el-col>
                        <el-col :span="3">
                            <el-select size="small" v-model="form.type" placeholder="支付方式">
                            </el-select>
                        </el-col>
                        <el-col :span="3">
                            <el-select size="small" v-model="form.type" placeholder="审核状态">
                            </el-select>
                        </el-col>
                </el-row>
                <div class="line-divider"></div>
            </template>
            <div class="btn-wrapper">
                <el-button size="small" type="primary" @click="onSearch">搜索</el-button>
                <el-button size="small">重置</el-button>
                <el-button
                    type="text"
                    style="margin-left: 10px; height: 40px"
                    id="closeSearchBtn"
                    @click="closeSearch"
                    >
                    {{ showAll?'收起':'展开' }}
                    <i :class="showAll ? 'el-icon-arrow-up ' : 'el-icon-arrow-down'"></i>
                    </el-button>
            </div>
        </el-form>
            
      </div>
      <div class="w-container">
          <el-radio-group v-model="payType" style="margin-bottom: 30px;" @change="tabClick">
            <el-radio-button label="1">全部</el-radio-button>
            <el-radio-button label="2">在线支付</el-radio-button>
            <el-radio-button label="3">学员余额</el-radio-button>
            <el-radio-button label="4">实收</el-radio-button>
            <el-radio-button label="5">优惠</el-radio-button>
            <el-radio-button label="6">免费</el-radio-button>
            <el-radio-button label="7">退班</el-radio-button>
            <el-radio-button label="8">退费</el-radio-button>
            <el-radio-button label="9">休学</el-radio-button>
        </el-radio-group>
          <rd-table
                :tableData="tableData"
                :tableKey="tableKey"
                :pageConfig.sync="pageConfig"
                @pageChange="pageChange"
            >
                <template slot="studentName" slot-scope="scope">
                   姓名：{{scope.row.studentName}}<br/>
                   <!-- 手机：{{scope.row.phone}}<br/>
                   学历：{{scope.row.education}}<br/>
                   学年：{{scope.row.studentBatch}}<br/> -->
                   <!-- 代理人：{{scope.row.studentName}}<br/> -->
                </template>
                <template slot="productName" slot-scope="scope">
                   订单id：<br/>
                   项目：{{scope.row.studentName}}<br/>
                   科目：{{scope.row.subjectName}}<br/>
                   班型：<el-button type="text" style="padding: 0" @click="addVisible = true">{{scope.row.classTypeName}}</el-button><br/>
                   班次年份：{{scope.row.classBatch}}<br/>
                   课程：{{scope.row.courseName}}<br/>
                   订单创建时间：{{scope.row.bookType}}<br/>
                </template>
                <template slot="salesName" slot-scope="scope">
                   市场老师：{{scope.row.salesName}}<br/>
                   教务老师：{{scope.row.eduName}}<br/>
                   招生老师：{{scope.row.enrollName}}<br/>
                   班主任：{{scope.row.classTeacherName}}<br/>
                   订单创建：{{scope.row.courseName}}<br/>
                </template>
                <template slot="orderId" slot-scope="scope">
                   缴费类型：{{scope.row.orderId}}<br/>
                   支付类型：{{scope.row.status}}<br/>
                   收款分校：<el-button type="text" style="padding: 0">查看详情</el-button><br/>
                   付款金额：{{scope.row.createAt}}<br/>
                   手续费：{{scope.row.updateAt}}<br/>
                   收款方式：{{scope.row.updateAt}}<br/>
                   缴费时间：{{scope.row.updateAt}}<br/>
                   到账时间：{{scope.row.updateAt}}<br/>
                </template>
                 <template slot="realPrice" slot-scope="scope">
                    原价：{{scope.row.realPrice}}<br/>
                    应收：{{scope.row.rebatePrice}}<br/>
                    订单可用余额： <br/>
                    已收(待审/通过)：{{scope.row.applyPassReal}} / {{scope.row.applyPassReal}}<br/>
                    优惠(待审/通过)：{{scope.row.applyRebatePrice}} / {{scope.row.applyPassRebate}}<br/>
                    退费(待审/通过)：{{scope.row.refundPrice}} / {{scope.row.applyPassRefund}}<br/>
                    订单欠费：{{scope.row.arrears}}<br/>
                    订单状态：{{scope.row.status}}<br/>
                </template>
                <template slot="remark" slot-scope="scope">
                    <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="scope.row.remark"
                    @change="remarkChange(scope.row)"
                    >
                    </el-input>
                </template>
                <template slot="edit" slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" type="text" size="small"
                        >设置到账时间</el-button
                    >
                    <el-divider direction="vertical"></el-divider>
                    <el-button @click="handleEdit(scope.row)" type="text" size="small"
                        >下载收据</el-button
                    >
                     <el-divider direction="vertical"></el-divider>
                    <el-button @click="handleEdit(scope.row)" type="text" size="small"
                        >重新生成收据</el-button
                    >
                </template>
            </rd-table>
      </div>

      <!-- 订单详情 -->
       <full-dialog
        v-model="addVisible"
        hideTitle
        @change="addVisible = false"
      >
        <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;" @change="tabClick">
            <el-radio-button label="1">订单课程</el-radio-button>
            <el-radio-button label="2">缴费记录</el-radio-button>
            <el-radio-button label="3">订单日志</el-radio-button>
            <el-radio-button label="4">网课开通记录</el-radio-button>
            <el-radio-button label="5">直播开通记录</el-radio-button>
            <el-radio-button label="6">看课进度记录</el-radio-button>
            <el-radio-button label="7">协议列表</el-radio-button>
            <el-radio-button label="8">图书快递记录</el-radio-button>
            <el-radio-button label="9">用户组开通记录</el-radio-button>
            <el-radio-button label="10">收入确认</el-radio-button>
        </el-radio-group>
        
      </full-dialog>
  </div>
</template>

<script>
export default {
  name:"order-list",
  data(){
    return {
        payType:"1",
        tabPosition:"1",
        addVisible: false,
        form: {

        },
        showAll: false,
        tableData: [
            {}
        ],
        tableKey: [
            {
                name: "学员信息",
                value: "studentName",
                operate: true
            },
            {
                name: "报班信息",
                value: "productName",
                operate: true
            },
            {
                name: "服务信息",
                value: "salesName",
                operate: true
            },
            // {
            //     name: "订单信息",
            //     value: "orderId",
            //     operate: true
            // },
            {
                name: "缴费信息",
                value: "orderId",
                operate: true,
                width: 230
            },
             {
                name: "审核状态",
                value: "realPrice",
                // operate: true,
                width: 100
            },
             {
                name: "业绩",
                value: "realPrice",
                // operate: true,
                width: 100
            },
            // {
            //     name: "备注",
            //     value: "remark",
            //     operate: true
            // },
            {
                name: "操作",
                value: "edit",
                operate: true,
                width: 120
            }
        ],
        pageConfig: {
            totalCount: 0,
            currentPage: 1,
            pageSize: 10,
        },
    }
  },
  mounted(){
      this.getTableData();
  },
   methods: {
       tabClick(e){
           console.log(e,'---')
       },
       onSearch(){
           this.getTableData();
       },
       closeSearch(){
           this.showAll = !this.showAll;
       },
       pageChange(){

       },
       getTableData(params = {}) {
            this.$fetch("orderinfo_orderManage", {
                ...this.pageConfig,
                ...this.searchForm,
                ...params,
            }).then((res) => {
                this.tableData = res.data.varList.map((item) => {
                    item.createAt = this.$common._formatDates(item.createAt);
                    item.updateAt = this.$common._formatDates(item.updateAt);
                    return item;
                });
                this.pageConfig.totalCount = res.data.page.totalResult;
            })
        },
        remarkChange(val){
            console.log(val,'val')
            const { orderId ,remark } = val;
            this.$fetch("orderinfo_setRemark",{
                orderId,
                remark
            }).then(res => {
                this.$message.success("设置成功")
            })
        }

  }
}
</script>

<style lang="scss" scoped>
.order-list {
    .label-wrapper {
        text-align: right;
        line-height: 32px;
        font-size: 14px;
        color: #333333;
        font-weight: 600;
    }
    .line-divider {
        border-top: 1px dashed #ccc;
        width: 100%;
        height: 1px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .btn-wrapper {
        text-align: right;
        margin-bottom: 0;
    }
}
</style>
