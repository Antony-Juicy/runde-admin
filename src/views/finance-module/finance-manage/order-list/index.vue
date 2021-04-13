<template>
  <div class="order-list">
      <div class="w-container">
        <el-form ref="form" :model="form" label-width="80px">
            <el-row :gutter="20">
                    <el-col :span="2">
                        <div class="label-wrapper" style="line-height:40px">
                            查看类型：
                        </div>
                    </el-col>
                    <el-col :span="9">
                        <el-radio-group v-model="form.type">
                            <el-radio-button label="我招生的"></el-radio-button>
                            <el-radio-button label="我服务的"></el-radio-button>
                            <el-radio-button label="我管理的"></el-radio-button>
                        </el-radio-group>
                    </el-col>
            </el-row>
            <div class="line-divider"></div>
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
                        <el-input size="small" placeholder="手机号码"></el-input>
                    </el-col>
                    <el-col :span="3">
                        <el-select size="small" v-model="form.type" placeholder="报班学年">
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
                        <el-select size="small" v-model="form.type" placeholder="班型状态">
                            <el-option label="正常" value="shanghai"></el-option>
                            <el-option label="暂停" value="beijing"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <el-select size="small" v-model="form.type" placeholder="班次年份">
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <el-select size="small" v-model="form.type" placeholder="全科状态">
                            <el-option label="正常" value="shanghai"></el-option>
                            <el-option label="暂停" value="beijing"></el-option>
                        </el-select>
                    </el-col>
                    
            </el-row>
            <div class="line-divider"></div>
            <template v-if="showAll">
                <el-row :gutter="20">
                        <el-col :span="2">
                            <div class="label-wrapper">
                                服务信息：
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <el-select size="small" v-model="form.type" placeholder="校区">
                            </el-select>
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
                        <el-col :span="3">
                            <el-select size="small" v-model="form.type" placeholder="班主任">
                            </el-select>
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
                            <el-select size="small" v-model="form.type" placeholder="订单状态">
                            </el-select>
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
                </el-row>
                <div class="line-divider"></div>
                <el-row :gutter="20">
                        <el-col :span="2">
                            <div class="label-wrapper">
                                其他：
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <el-select size="small" v-model="form.type" placeholder="考试状态">
                            </el-select>
                        </el-col>
                        <el-col :span="3">
                            <el-select size="small" v-model="form.type" placeholder="考试退费">
                            </el-select>
                        </el-col>
                        <el-col :span="3">
                            <el-select size="small" v-model="form.type" placeholder="是否新学历">
                            </el-select>
                        </el-col>
                        <el-col :span="3">
                            <el-select size="small" v-model="form.type" placeholder="是否进班群">
                            </el-select>
                        </el-col>
                </el-row>
                <div class="line-divider"></div>
            </template>
            <div class="btn-wrapper">
                <el-button size="small" type="primary">搜索</el-button>
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
          <rd-table
                :tableData="tableData"
                :tableKey="tableKey"
                :pageConfig.sync="pageConfig"
                @pageChange="pageChange"
            >
                <template slot="edit" slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" type="text" size="small"
                        >缴费</el-button
                    >
                    <el-divider direction="vertical"></el-divider>
                    <el-dropdown trigger="click">
                        <el-button @click="handleEdit(scope.row)" type="text" size="small"
                        >异动<i class="el-icon-arrow-down el-icon--right"></i></el-button
                            >
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-plus">申请优惠</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-circle-plus">申请免费</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-circle-plus-outline">申请退费</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-check">退班退费</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-circle-check">申请转班</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-circle-close">申请休学</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                     <el-divider direction="vertical"></el-divider>
                    <el-button @click="handleEdit(scope.row)" type="text" size="small"
                        >协议列表</el-button
                    >
                     <el-divider direction="vertical"></el-divider>
                    <el-button @click="handleEdit(scope.row)" type="text" size="small"
                        >进入班群</el-button
                    >
                </template>
            </rd-table>
      </div>
  </div>
</template>

<script>

export default {
  name:"order-list",
  data(){
    return {
        form: {

        },
        showAll: false,
        tableData: [
            {}
        ],
        tableKey: [
            {
                name: "学员信息",
                value: "name",
                operate: true
            },
            {
                name: "报班信息",
                value: "name",
                operate: true
            },
            {
                name: "服务信息",
                value: "name",
                operate: true
            },
            {
                name: "订单信息",
                value: "name",
                operate: true
            },
            {
                name: "缴费信息",
                value: "name",
                operate: true
            },
            {
                name: "备注",
                value: "name",
                operate: true
            },
            {
                name: "操作",
                value: "edit",
                operate: true
            }
        ]
    }
  },
   methods: {
       closeSearch(){
           this.showAll = !this.showAll;
       },
       pageChange(){

       }
  }
}
</script>

<style lang="scss" scoped>
.order-list {
    .label-wrapper {
        text-align: right;
        line-height: 32px;
    }
    .line-divider {
        border-top: 1px dashed #ccc;
        width: 100%;
        height: 1px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .btn-wrapper {
        text-align: right;
        margin-bottom: 0;
    }
}
</style>
