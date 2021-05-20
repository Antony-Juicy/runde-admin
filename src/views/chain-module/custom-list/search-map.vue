<template>
  <div class="search-map">
      <p style="height: 14px;line-height: 14px;" v-show="count != 1">{{currentAddress}}</p>
      <div class="searchBox">
          <input type="text" id="search" placeholder="输入关键字选取地点,也可以拖拽地图进行定位" autocomplete="off">
      </div>
      <div id="container" class="map" tabindex="0"></div>
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
      count: 0
    }
  },
  mounted(){
    this.initMap();
  },
   methods: {
     initMap(){
       AMapLoader.load({
          "key": "625289cca26855874d066b2351546a5f",              // 申请好的Web端开发者Key，首次调用 load 时必填
          "version": "1.4.15",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
          "plugins": [],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
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
          this.initPositionPicker(AMapUI.PositionPicker);
      }).catch(e => {
          console.log(e);
      })
     },
     initPoiPicker(PoiPicker){
       const poiPicker = new PoiPicker({
            map: this.map,
            input: 'search'
          })
        //初始化poiPicker
        poiPicker.on('poiPicked',  (poiResult)=> {
            console.log(poiResult);
            const item = poiResult.item;
            let mapInfo = {
                latitude: item.location.lat,
                longitude: item.location.lng,
                address: item.district + ' ' + item.name + ' ' + item.address
            };
            this.map.setCenter([item.location.lng, item.location.lat]);
            this.map.setZoom(18);
        });
     },
     initPositionPicker(PositionPicker){
       let positionPicker = new PositionPicker({
            mode: 'dragMap',//dragMap：拖拽地图，dragMarker：拖拽点
            map: this.map
        });

        positionPicker.on('success',  (positionResult) => {
          this.count++;
            console.log(positionResult,'positionResult--');
           let  mapInfo = {
                latitude: positionResult.position.lat,
                longitude: positionResult.position.lng,
                address: positionResult.regeocode.formattedAddress
            };
            this.currentAddress = positionResult.address;
            document.querySelector("#search").value = "";
            // document.getElementById('address').innerHTML = positionResult.address;
        });
        positionPicker.on('fail', function (positionResult) {
            // document.getElementById('address').innerHTML = ' ';
        });
        positionPicker.start();
     }
  }
}
</script>

<style lang="scss" scoped>
.search-map {
  position: relative;
  .searchBox {
    // position: absolute;
    // z-index: 99;
    // top: 0;
    // left: 10px;
    // width: 100% ;
    #search {
      margin-bottom: 15px;
      width: 100%;
      height: 32px;
      background-color: #FFF;
      -webkit-appearance: none;
      background-color: #FFF;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #DCDFE6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      padding-left: 16px;
      &:focus {
        border-color: #409EFF;
        outline: 0;
      }
      &::-webkit-input-placeholder { 
      /* WebKit browsers */ 
        color: #ccc; 
      } 
    }
  }
  .map {
            height: 300px;
            width: 100%;
        }
}

</style>
