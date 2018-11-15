<template>
  <div>

    <!-- <div class="row">
      <div class="col-lg-3 col-sm-6" v-for="stats in statsCards">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{stats.footerText}}
          </div>
        </stats-card>
      </div>
    </div> -->

    <!--Charts-->
    <div class="row">
<!--
      <div class="col-xs-12">
        <chart-card :chart-data="usersChart.data" :chart-options="usersChart.options">
          <h4 class="title" slot="title">Users behavior</h4>
          <span slot="subTitle"> 24 Hours performance</span>
          <span slot="footer">
            <i class="ti-reload"></i> Updated 3 minutes ago</span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Open
            <i class="fa fa-circle text-danger"></i> Click
            <i class="fa fa-circle text-warning"></i> Click Second Time
          </div>
        </chart-card>
      </div>

      <div class="col-md-6 col-xs-12">
        <chart-card :chart-data="preferencesChart.data"  chart-type="Pie">
          <h4 class="title" slot="title">Email Statistics</h4>
          <span slot="subTitle"> Last campaign performance</span>
          <span slot="footer">
            <i class="ti-timer"></i> Campaign set 2 days ago</span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Open
            <i class="fa fa-circle text-danger"></i> Bounce
            <i class="fa fa-circle text-warning"></i> Unsubscribe
          </div>
        </chart-card>
      </div>
-->
      <div class="col-xs-12">
        <chart-card ref="chart1" :chart-data="activityChart.data" :chart-options="activityChart.options">
          <h4 class="title" slot="title">工业智能设备状态参数</h4>
          <span slot="subTitle"> 显示设备端各传感器上传的数值</span>
          <span slot="footer">
            <i class="ti-check"></i> 数据信息已认证，最后更新时间: {{activityChart.data.updated}}</span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> 温度#1
          </div>
        </chart-card>
      </div>
      <div class="col-xs-12">
        <chart-card ref="chart2" :chart-data="activityChart2.data" :chart-options="activityChart2.options">
          <h4 class="title" slot="title">工业智能设备状态参数</h4>
          <span slot="subTitle"> 显示设备端各传感器上传的数值</span>
          <span slot="footer">
            <i class="ti-check"></i> 数据信息已认证，最后更新时间: {{activityChart2.data.updated}}</span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> 亮度#1
          </div>
        </chart-card>
      </div>
      <div class="col-xs-12">
        <chart-card ref="chart3" :chart-data="activityChart3.data" :chart-options="activityChart3.options">
          <h4 class="title" slot="title">PTC设备状态参数</h4>
          <span slot="subTitle"> 显示 PTC ThingWorx 设备端各传感器上传的数值</span>
          <span slot="footer">
            <i class="ti-check"></i> 数据信息已认证，最后更新时间: {{activityChart3.data.updated}}</span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> CPU温度
          </div>
        </chart-card>
      </div>

    </div>

  </div>
</template>
<script>
  import StatsCard from '../../UIComponents/Cards/StatsCard.vue'
  import ChartCard from '../../UIComponents/Cards/ChartCard.vue'
  import { Meteor } from 'meteor/meteor'
  import { Metrics, EdgeData, CommandResults } from '../../../../api/collections'
  import moment from 'moment'

  export default {
    components: {
      StatsCard,
      ChartCard
    },
    /**
     * Chart data used to render stats, charts. Should be replaced with server data
     */
    data () {
      return {
        currentCommandId: null,
        spinner: 0,
        statsCards: [
          {
            type: 'warning',
            icon: 'ti-server',
            title: 'Capacity',
            value: '105GB',
            footerText: 'Updated now',
            footerIcon: 'ti-reload'
          },
          {
            type: 'success',
            icon: 'ti-wallet',
            title: 'Revenue',
            value: '$1,345',
            footerText: 'Last day',
            footerIcon: 'ti-calendar'
          },
          {
            type: 'danger',
            icon: 'ti-pulse',
            title: 'Errors',
            value: '23',
            footerText: 'In the last hour',
            footerIcon: 'ti-timer'
          },
          {
            type: 'info',
            icon: 'ti-twitter-alt',
            title: 'Followers',
            value: '+45',
            footerText: 'Updated now',
            footerIcon: 'ti-reload'
          }
        ],
        usersChart: {
          data: {
            labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
            series: [
              [287, 385, 490, 562, 594, 626, 698, 895, 952],
              [67, 152, 193, 240, 387, 435, 535, 642, 744],
              [23, 113, 67, 108, 190, 239, 307, 410, 410]
            ]
          },
          options: {
            low: 0,
            high: 1000,
            showArea: true,
            height: '245px',
            axisX: {
              showGrid: false
            },
            lineSmooth: this.$Chartist.Interpolation.simple({
              divisor: 3
            }),
            showLine: true,
            showPoint: false
          }
        },
        activityChart: {
          data: {
            labels: ['-19', '-18', '-17', '-16', '-15', '-14', '-13', '-12', '-11', '-10', '-09', '-08', '-07', '-06', '-05', '-04', '-03', '-02', '-01', '=00'],
            series: [
              [100],
            ],
            updated: Date()
          },
          options: {
            high: 70,
            low: 20,
            seriesBarDistance: 10,
            axisX: {
              showGrid: false
            },
            height: '245px'
          }
        },
        activityChart2: {
          data: {
            labels: ['-19', '-18', '-17', '-16', '-15', '-14', '-13', '-12', '-11', '-10', '-09', '-08', '-07', '-06', '-05', '-04', '-03', '-02', '-01', '=00'],
            series: [
              [128]
            ],
            updated: Date()
          },
          options: {
            high: 240,
            low: 20,
            seriesBarDistance: 10,
            axisX: {
              showGrid: false
            },
            height: '245px'
          }
        },
        activityChart3: {
          data: {
            labels: ['-19', '-18', '-17', '-16', '-15', '-14', '-13', '-12', '-11', '-10', '-09', '-08', '-07', '-06', '-05', '-04', '-03', '-02', '-01', '=00'],
            series: [
              [30]
            ],
            updated: Date()
          },
          options: {
            high: 60,
            low: 30,
            seriesBarDistance: 5,
            axisX: {
              showGrid: false
            },
            height: '245px'
          }
        },
        preferencesChart: {
          data: {
            labels: ['62%', '32%', '6%'],
            series: [62, 32, 6]
          },
          options: {}
        }

      }
    },
    mounted() {
      // Meteor.call('getEnv', "MAPAPP_ENV", (err, results) => {
      //   let mapEnv = JSON.parse(results);
      //   // Call API
      //   let url = mapEnv.leapaiUrl + '/leapiot' + '/dt/open/instances' + '?appId=8e85e1d6-9bb0-11e8-9909-0242ac120012';
      //   console.log('url=' + url);
      //   this.$http.get(url)
      //     .then(response=> {
      //       console.log('API call response');
      //       console.dir(response);                      
      //       if(response.status==200 && response.data.status === "200") {
      //         this.currentCommandId = response.data.result.commandId;
      //         console.log('Got commandId = ' + this.currentCommandId);
      //       }
      //     })
      //     .catch(error=>{
      //       console.log('API call Error' + error);
      //     });
      // });
    },
    meteor: {
      $subscribe: {
        'metrics' () {
          return [20]
        },
        'edgedata' () {
          return [100]
        },
        'requestcommandresult' () {
          return [100]
        }
      },
      updateChartsData () {
        if (this.spinner == 0 || this.spinner == 4)
          console.log('/');
        if (this.spinner == 1 || this.spinner == 5)
          console.log('-');
        if (this.spinner == 2 || this.spinner == 6)
          console.log('\\');
        if (this.spinner == 3 || this.spinner == 7)
          console.log('|');

        this.spinner++;
        if (this.spinner >= 8) this.spinner = 0;

        // console.log('xxxxx updateChartsData called!');
        // console.log('CurrentCommandId = ' + this.currentCommandId);
        // var leapIotData = CommandResults.find({/*_id: this.currentCommandId*/}, {
        // }).fetch(); 

        // if (leapIotData.length > 0) {
        //   for (let i=0,len=leapIotData.length; i<len; i++) {
        //     let data = leapIotData[i];
        //     if (data._id == this.currentCommandId) {
        //       console.log('Got leapIoT data:');
        //       let payload = JSON.parse(data.commandResult);
        //       console.dir(payload.data);
        //       let pdata = payload.data;
        //       this.statsCards = [];
        //       for (let j=0; j<pdata.total; j++){
        //         let card = {};
        //         let row = pdata.rows[j];
        //         card.type = 'warning';
        //         card.icon = 'ti-server';
        //         card.title = row.name;
        //         card.value = row.attrnum;
        //         card.footerText = row.desp;
        //         card.footerIcon = 'ti-reload';
        //         this.statsCards.push(card);
        //       }
        //     }
        //   }
        // }

        var mdata = Metrics.find({}, {
         sort: {created: -1}, 
         limit: 20
        }).fetch();

        if (mdata.length > 0) {
          var tpArray = [[]];
          var lmArray = [[]];

          for(let i=0, len=mdata.length; i<len; i++) {
            let m = mdata[len-i-1];
            tpArray[0].push(m.tp-20);
            lmArray[0].push(255-m.lm);
            this.activityChart.data.updated = moment(m.created).format('YYYY年MM月DD日 HH:mm:ss');//m.created;
            this.activityChart2.data.updated = moment(m.created).format('YYYY年MM月DD日 HH:mm:ss');//m.created;
          }
          this.activityChart.data.series = tpArray;
          this.activityChart2.data.series = lmArray;
          //this.chart1Data.x = this.chart1Data.series[0]; 

          //console.log('Metrics length=' + mdata.length + ', dumping activityChart.data:');
          //console.dir(this.chart1Data);

          //this.$forceUpdate();
          this.$refs.chart1.updateChartData(this.activityChart.data);
          this.$refs.chart2.updateChartData(this.activityChart2.data);
        }

        var edgedata = EdgeData.find({}, {
         sort: {ts: -1}, 
         limit: 20
        }).fetch();

        if (edgedata.length > 0) {
          var tpArray = [[]];

          for(let i=0, len=edgedata.length; i<len; i++) {
            let m = edgedata[len-i-1];
            tpArray[0].push(m.cpu_tempreture);
            this.activityChart3.data.updated = moment(m.ts).format('YYYY年MM月DD日 HH:mm:ss');
          }
          this.activityChart3.data.series = tpArray;
          this.$refs.chart3.updateChartData(this.activityChart3.data);
        }
      }
    }
  }

</script>
<style>

</style>
