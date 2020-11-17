<template>
  <div>
    <el-button
      size="small"
      type="success"
      @click="content.push({
                src:'',
                src2:'',
                title: '',
                desc: '',
                href: ''
              })"
    >新增</el-button>
    <el-table :data="content" style="width: 100%">
      
      <el-table-column label="电脑端图片" width="160">
        <template slot-scope="scope">
          <Upload-oss :src.sync="content[scope.$index].src" @srcChangeFun="(data)=>{ content[scope.$index].src = data}"/>
        </template>
      </el-table-column>

      <el-table-column label="移动端图片" width="160">
        <template slot-scope="scope">
          <Upload-oss :src.sync="content[scope.$index].src2" @srcChangeFun="(data)=>{ content[scope.$index].src2 = data}"/>
        </template>
      </el-table-column>
      
      <el-table-column label="标题">
        <template slot-scope="scope">
          <el-input v-model="content[scope.$index].title" placeholder="请输入标题" />
        </template>
      </el-table-column>
      <el-table-column label="跳转地址" width="180px">
        <template slot-scope="scope">
          <el-input v-model="content[scope.$index].href" placeholder="请输入跳转地址" />
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          <el-input type="textarea" v-model="content[scope.$index].desc" placeholder="请输入描述" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="230">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" v-if="scope.$index !== 0"  @click="contentSort(scope.$index, -1)">上移</el-button>
          <el-button size="mini" type="primary"  v-if="scope.$index !== content.length -1"  @click="contentSort(scope.$index, +1)">下移</el-button>
          <el-button size="mini" type="danger" @click="content.splice(scope.$index,1)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import UploadOss from "@/components/UploadOss";
export default {
  name: "bannercontent",
  components: {
    UploadOss
  },
  model: {
    prop: "content",
    event: "change"
  },
  data() {
    return {
    }
  },
  props: {
    content: Array
  },
  mounted() {
  },
  methods: {
    contentSort(index, handler) {
        let num  = Number(index + handler)
        let obj = this.content[num];
        this.content[num] = this.content[index]; 
        this.content.splice(index,1,obj)
    }
  },
};
</script>

<style>
</style>