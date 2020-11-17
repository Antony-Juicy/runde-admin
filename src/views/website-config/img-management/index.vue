<template>
  <section class="section_box">
    <h3>上传到OSS的图片的位置</h3>
    <div class="tips_box2">
        <el-cascader
                v-model="cas.data"
                :options="cas.options"
                @change="handleChange"></el-cascader>
        <el-input v-if="showProject" placeholder='可选择在图片之前添加前缀' v-model="pic.project" width="200"></el-input>
        <Upload-oss v-if='uploadOssElem' :objConfig="{name: pic.name,project: pic.project, dir: pic.dir}" :isMult="true" @srcChangeFun="srcChangeFun"/>
    </div>


    <!-- 列表 -->
    <ul class="show_imgs" v-if='uploadOssElem'>
      <li v-for="(item,itemI) in allImages" :key="itemI">
        <img :src="item" alt="">
        <span>{{item}}</span>
      </li>
    </ul>

    <div class="tips_box3">
        <h3>Tips: 拓展<br/>  <span>例如: icon.png</span>（删除指定名字的图片、重新上传替换旧图片） </h3>
        <el-input placeholder='请输入指定图片名' v-model="pic.name" width="300"></el-input>
    </div>
    
  </section>
</template>




<script>
import UploadOss from "@/components/UploadOss";
export default {
  components: {
    UploadOss
  },
  asyncData({ params }) {},
  data() {
    return {
      showProject: false,
      uploadOssElem: true,
      allImages: [],
      pic: {
        project: '',
        name: '',
        dir: '',
        backetName: ''
      },
        cas: {
            data: [],
            options: [{
                    value: 'cmsuserInfo/yxy', // 最后面不要带/因为接口返回的时候默认在最后带上了
                    label: '营销页',
                    children: [{
                        value: 'shorthand',
                        label: '考前速记',
                    },{
                        value: 'wanrunzhengde',
                        label: '万润正德',
                    }]
                },
                {
                  value: 'web/official',
                  label: '官网PC端',
                  children: [
                    {
                        value: 'static',
                        label: 'static',
                    },
                  ]},

                {
                  value: 'web/officialM',
                  label: '官网移动端',
                  children: [
                    {
                        value: 'static',
                        label: 'static',
                    },
                  ]},

                  {
                  value: 'web/runde_console',
                  label: '官网后台',
                  children: [
                    {
                        value: 'static',
                        label: 'static',
                    },
                  ]},
            ]
        }
    }
  },
  watch: {
      'pic.name': {
          handler: function() {
              this.reloadElem();
          }
      },
      'pic.project': {
          handler: function() {
              this.reloadElem();
          }
      }
  },
  mounted() {
  },
  methods: {
     srcChangeFun(data) {
        let arr = data.split(',');
        arr.pop();
        this.allImages = this.allImages.concat(arr);
        this.reloadElem();
     },
     reloadElem() {
       this.uploadOssElem = false
       this.$nextTick(()=> {
         this.uploadOssElem = true;
       })
     },
     handleChange(data) {
         this.pic.project = data[1],
         this.pic.dir = data[0];
         if(data[0].indexOf("web") > -1) {
              this.showProject = true;
              this.pic.dir = data[0] +"/" + data[1];
              this.pic.project = '';
         }else {
              this.showProject = false;
         }
         this.reloadElem();
     }
  }
}
</script>

<style scoped lang="scss">
.show_imgs {
  list-style: none;
  padding: 0;
  margin: 0;
  li {
     display: flex;
     margin-bottom: 5px;
       img {
        width: 100px;
        height: 100px;
      }
      span {
        display: inline-block;
        line-height: 100px;
        margin-left: 40px;
      }
  }

}
.tips_box2 {
  display: flex;
  align-items: center;
}
.tips_box3 {
    margin-top: 60px;
    h3 {
      span {
        font-size: 14px;
        color: #999;
      }
    }
}
::v-deep .el-input,::v-deep .el-popper {
  width: 300px;
  display: inline-block;
  margin-right: 20px;
}

::v-deep .el-select-dropdown {
    min-width: 300px !important;
}
</style>
