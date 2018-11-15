<template>
    <div class="card card-map">
<!--
      <div class="header">
        <h4 class="title">Google Maps</h4>
      </div>
-->
      <div class="map">
        <div id="china-map"></div>
      </div>
    </div>
</template>
<script>

  let echarts = require('echarts/lib/echarts')
  // 散点图
  require('echarts/lib/chart/scatter')
  // 散点图放大
  require('echarts/lib/chart/effectScatter')
  // 地图
  require('echarts/lib/chart/map')
  // 图例
  require('echarts/lib/component/legend')
  // 提示框
  require('echarts/lib/component/tooltip')
  // 地图geo
  require('echarts/lib/component/geo')
  // 中国地图
  require('echarts/map/js/china')


  export default {

    data: function() {
        return {
            timer: '',
            chinaMap: undefined
        }
    },
    created: function() {
        this.timer = setInterval(this.timerFunc, 3000)
    },
    methods: {
        getAll: function() {
          let url = this.$env.mapapiUrl + '/leapai-map/map/random/' + this.$env.appid;
          console.log('url=' + url);
          this.$http.get(url)
                        .then(response=> {
                            console.log(response);
                            if(this.chinaMap == undefined) {
                              this.chinaMap = echarts.init(document.getElementById('china-map'));
                            }
                            console.log(this.chinaMap);
                            if(response.status==200) {
                              var options = this.chinaMap.getOption();
                              options.series[0].markPoint.data=response.data;
                              this.chinaMap.hideLoading();
                              this.chinaMap.setOption(options);
                            }
                          })
                        .catch(error=>{
                                console.log(error);
                          });
        },

        getTop5: function() {
          let url = this.$env.mapapiUrl + '/leapai-map/map/random/' + this.$env.appid + '/top/' + this.$env.top;
          console.log('url=' + url);
          this.$http.get(url)
                  .then(response=> {
                      console.log(response);
                      if(this.chinaMap == undefined) {
                        this.chinaMap = echarts.init(document.getElementById('china-map'));
                      }
                      console.log(this.chinaMap);
                      if(response.status==200) {
                        var options = this.chinaMap.getOption();
                        options.series[1].markPoint.data=response.data;
                        this.chinaMap.hideLoading();
                        this.chinaMap.setOption(options);
                      }
                    })
                  .catch(error=>{
                          console.log(error);
                    });
        },

        timerFunc: function() {

            this.getAll();
            this.getTop5();

        },
        cancelAutoUpdate: function() { clearInterval(this.timer) }

    },
    beforeDestroy() {
      clearInterval(this.timer)
    },

    mounted () {
      if(this.chinaMap == undefined) {
        this.chinaMap = echarts.init(document.getElementById('china-map'));
      }

      let showLoadingDefault = {
        text: '加载中...',
        color: '#23531',
        textColor: '#fff',
        // 地图背景色
        maskColor: '#272D3A',
        zlevel: 0
      }

      this.chinaMap.setOption({
        backgroundColor: '#272D3A',
        // 标题
        title: {
          text: '工业互联网平台接入设备分布图',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        // 地图上圆点的提示
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return params.name + ' : ' + params.value[2]
          }
        },
        // 图例按钮 点击可选择哪些不显示
        legend: {
          orient: 'vertical',
          left: 'left',
          top: 'bottom',
          data: ['地区热度', 'top5'],
          textStyle: {
            color: '#fff'
          }
        },
        // 地理坐标系组件
        geo: {
          map: 'china',
          label: {
            // true会显示城市名
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            // 地图背景色
            normal: {
              areaColor: '#465471',
              borderColor: '#282F3C'
            },
            // 悬浮时
            emphasis: {
              areaColor: '#8796B4'
            }
          }
        },
        // 系列列表
        series: [
          {
            name: '地区热度',
            // 表的类型 这里是散点
            type: 'scatter',
            // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件
            coordinateSystem: 'geo',
            data: [],
            // 标记的大小
            symbolSize: 18,
            // 鼠标悬浮的时候在圆点上显示数值
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: '#ddb926'
              },
              // 鼠标悬浮的时候圆点样式变化
              emphasis: {
                borderColor: '#fff',
                borderWidth: 1
              }
            },
            markPoint : {
                symbol:'emptyCircle',
                symbolSize : 18,
                effect : {
                    show: true,
                    shadowBlur : 0
                },
                itemStyle:{
                    normal:{
                        label:{show:false}
                    }
                },
                data: []}
          },
          {
            name: 'top5',
            // 表的类型 这里是散点
            type: 'effectScatter',
            // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件
            coordinateSystem: 'geo',
            data: [],
            // 标记的大小
            symbolSize: 18,
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: '#f4e925',
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            zlevel: 1,
            markPoint : {
              symbolSize : 32,
                 data: []}
          }
        ]
      })
//      chinaMap.showLoading(showLoadingDefault)
//      this.$store.commit('openLoading')
//      this.$store.dispatch('fetchHeatChinaRealData', chinaMap)
//      setInterval(() => {
//        this.$store.dispatch('fetchHeatChinaRealData', chinaMap)
//      }, 1000)

        getAll();
        getTop5();
      }
    /*
    mounted () {
      var myLatlng = new window.google.maps.LatLng(40.748817, -73.985428)
      var mapOptions = {
        zoom: 13,
        center: myLatlng,
        scrollwheel: false, // we disable de scroll over the map, it is a really annoing when you scroll through page
        styles: [{
          'featureType': 'water',
          'stylers': [{ 'saturation': 43 }, { 'lightness': -11 }, { 'hue': '#0088ff' }]
        }, {
          'featureType': 'road',
          'elementType': 'geometry.fill',
          'stylers': [{ 'hue': '#ff0000' }, { 'saturation': -100 }, { 'lightness': 99 }]
        }, {
          'featureType': 'road',
          'elementType': 'geometry.stroke',
          'stylers': [{ 'color': '#808080' }, { 'lightness': 54 }]
        }, {
          'featureType': 'landscape.man_made',
          'elementType': 'geometry.fill',
          'stylers': [{ 'color': '#ece2d9' }]
        }, {
          'featureType': 'poi.park',
          'elementType': 'geometry.fill',
          'stylers': [{ 'color': '#ccdca1' }]
        }, {
          'featureType': 'road',
          'elementType': 'labels.text.fill',
          'stylers': [{ 'color': '#767676' }]
        }, {
          'featureType': 'road',
          'elementType': 'labels.text.stroke',
          'stylers': [{ 'color': '#ffffff' }]
        }, { 'featureType': 'poi', 'stylers': [{ 'visibility': 'off' }] }, {
          'featureType': 'landscape.natural',
          'elementType': 'geometry.fill',
          'stylers': [{ 'visibility': 'on' }, { 'color': '#b8cb93' }]
        }, { 'featureType': 'poi.park', 'stylers': [{ 'visibility': 'on' }] }, {
          'featureType': 'poi.sports_complex',
          'stylers': [{ 'visibility': 'on' }]
        }, { 'featureType': 'poi.medical', 'stylers': [{ 'visibility': 'on' }] }, {
          'featureType': 'poi.business',
          'stylers': [{ 'visibility': 'simplified' }]
        }]

      }
      var map = new window.google.maps.Map(document.getElementById('map'), mapOptions)

      var marker = new window.google.maps.Marker({
        position: myLatlng,
        title: 'Hello World!'
      })

      // To add the marker to the map, call setMap();
      marker.setMap(map)
    }*/
  }

</script>
<style>

</style>
