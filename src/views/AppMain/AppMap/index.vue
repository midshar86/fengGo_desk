<template>
  <div id="map-container"></div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
import { capitals } from '@/assets/data/cities'
export default {
  // 在dom挂载完毕后初始化
  mounted() {
    this.initAMap()
  },
  // 在组件卸载之前清除地图
  beforeUnmount() {
    this.map?.destroy()
  },
  methods: {
    // 初始化
    initAMap() {
      window._AMapSecurityConfig = {
        // 安全密钥
        securityJsCode: '015dd568e84f04ebe2c413fc0b165b6a'
      }
      AMapLoader.load({
        key: '19a80f3ae3c63ecfb02b04f7b0739126', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.Scale'] //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
      })
        .then((AMap) => {
          this.map = new AMap.Map('map-container', {
            // 设置地图容器id
            viewMode: '3D', // 是否为3D地图模式
            zoom: 4, // 初始化地图级别
            center: [116.397428, 39.90923]
            // 初始化地图中心点位置
          })
          for (var i = 0; i < capitals.length; i += 1) {
            var center = capitals[i].center
            var circleMarker = new AMap.CircleMarker({
              center,
              radius: 10 + Math.random() * 10, //3D视图下，CircleMarker半径不要超过64px
              strokeColor: 'white',
              strokeWeight: 2,
              strokeOpacity: 0.5,
              fillColor: 'rgba(0,0,124,1)',
              fillOpacity: 0.5,
              zIndex: 10,
              bubble: true,
              cursor: 'pointer',
              clickable: true
            })
            circleMarker.setMap(this.map)
          }
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
#map-container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 85vh;
}
</style>
