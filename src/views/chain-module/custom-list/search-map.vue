<template>
  <div  style="position:relative">
    <div class="search-map">
    <!-- {{currentAddress}} -->
      <!-- < -->
      <div id="outer-box">
        <div id="container" class="map" tabindex="0"></div>
        <div id="panel" class="scrollbar1">
            <div id="searchBar">
                <input id="searchInput" placeholder="请输入关键字搜索,并选点" v-model="searchText"/>
            </div>
            <div id="searchResults"></div>
        </div>
      </div>
    </div>
    
    <div class="adress-container">
      <i class="el-icon-place" v-show="currentAddress" style="color:#409eff;font-weight:bold;"></i>
      {{currentAddress}}
      <!-- <el-input size="small" readonly v-model="currentAddress" placeholder="详细地址(仅展示，请先搜索选点)"></el-input> -->
    </div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
export default {
  name:"search-map",
  data(){
    return {
      map: null,
      currentAddress: "",
      searchText:"",
      geocoder:null,
      marker: null
    }
  },
  props: {
    addressCoordinates: {
      type: String
    },
    detailAddress: {
      type: String
    }
  },
  watch: {
    detailAddress(val){
      console.log(val,'valll')
      this.currentAddress = val;
    },
    addressCoordinates(val){
      if(this.map){
        this.regeoCode(val.split(","));
      }
        
    },
  },
  mounted(){
    this.initMap();
    // 定点
    // this.initPosition(this.addressCoordinates)
  },
   methods: {
     initMap(){
       AMapLoader.load({
          "key": "625289cca26855874d066b2351546a5f",              // 申请好的Web端开发者Key，首次调用 load 时必填
          "version": "1.4.15",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
          "plugins": ['AMap.Geocoder'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
          "AMapUI": {             // 是否加载 AMapUI，缺省不加载
              "version": '1.1',   // AMapUI 缺省 1.1
              "plugins":['misc/PositionPicker','misc/PoiPicker'],       // 需要加载的 AMapUI ui插件
          },
          "Loca":{                // 是否加载 Loca， 缺省不加载
              "version": '1.3.2'  // Loca 版本，缺省 1.3.2
          },  
      }).then((AMap)=>{
          this.map = new AMap.Map('container',{
            zoom: 6
          });
          this.initPoiPicker(AMapUI.PoiPicker);

            //  已有经纬度，定点
            this.geocoder = new AMap.Geocoder({
              // city: "010", //城市设为北京，默认：“全国”
              // radius: 1000 //范围，默认：500
            });
            this.marker = new AMap.Marker();
            this.regeoCode(this.addressCoordinates.split(","));
      }).catch(e => {
          console.log(e);
      })
     },
     regeoCode(lnglat) {
          //   let p1 = 116.483038,p2 = 39.990633;
          // var lnglat  = [p1,p2];
          console.log(lnglat,'lnglat---')
          this.map.add(this.marker);
          this.marker.setPosition(lnglat);
          this.map.setCenter([lnglat[0], lnglat[1]]);
          this.map.setZoom(18);
          this.geocoder.getAddress(lnglat, (status, result) =>{
              console.log(result,'result---')
              if (status === 'complete'&&result.regeocode) {
                  var address = result.regeocode.formattedAddress;
                  
                  // document.getElementById('address').value = address;
              }else{
                  console.error('根据经纬度查询地址失败')
              }
          });
      },
     initPoiPicker(PoiPicker){
       let poiPicker = new PoiPicker({
            input: 'searchInput',
            placeSearchOptions: {
                map: this.map,
                pageSize: 10
            },
            searchResultsContainer: 'searchResults'
        });
        poiPicker.on('poiPicked', (poiResult) => {
         
            poiPicker.hideSearchResults();

            var source = poiResult.source,
                poi = poiResult.item;
                 console.log(poi,'poi--')
                 this.$emit("poiPicked",poi)
                 const { pname,cityname,adname,address,name,district } = poi;
                  this.map.setCenter([poi.location.lng, poi.location.lat]);
                  if(!district){
                    this.currentAddress = pname + cityname + adname + address + name;
                  }
                  
            if (source !== 'search') {

                //suggest来源的，同样调用搜索
                poiPicker.searchByKeyword(poi.name);
               
            } else {

                //console.log(poi);
            }
        });
     }
  }
}
</script>

<style lang="scss" scoped>

  .adress-container {
    position: absolute;
    top: -50px;
    left: 280px;
  }

#outer-box {
        width: 100%;
        height: 350px;
        margin-top: 50px;
        // padding-right: 300px;
    }
    
    #container {
        height: 100%;
        width: 100%;
    }
    
    #panel {
        position: absolute;
        top: -50px;
        left: 0;
        overflow-y: hidden;
        width: 270px;
        z-index: 2;
        min-height: 290px;
    }
    
    #searchBar {
        // height: 30px;
        // background: #ccc;
    }
    
    #searchInput {
        width: 100%;
        height: 30px;
        line-height: 30%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        // border: none;
        // border-bottom: 1px solid #ccc;
        padding: 0 5px;
        border: 1px solid #DCDFE6;
            border-radius: 4px;
         &:focus {
            border-color: #409EFF;
            outline: 0;
          }
          &::-webkit-input-placeholder { 
          /* WebKit browsers */ 
            color: #ccc; 
          } 
    }
    
    #searchResults {
        overflow: auto;
        // height: calc(100% - 40px);
        height: 292px;
    }
    
    .amap_lib_placeSearch,
    .amap-ui-poi-picker-sugg-container {
        border: none!important;
    }
    
    .amap_lib_placeSearch .poibox.highlight {
        background-color: #CAE1FF;
    }
    
    .poi-more {
        display: none!important;
    }
</style>
