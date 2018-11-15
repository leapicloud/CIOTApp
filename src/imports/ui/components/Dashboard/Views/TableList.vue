<template>
  <div>
    <div class="row">
      <div class="col-lg-3 col-sm-6" v-for="stats in statsCards">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p style="font-size:14px;">{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{stats.footerText}}
          </div>
        </stats-card>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <paper-table :title="table1.title" :sub-title="table1.subTitle" :data="allThings" :columns="table1.columns">

          </paper-table>
        </div>
      </div>
<!--
      <div class="col-md-12">
        <div class="card card-plain">
          <paper-table type="hover" :title="table2.title" :sub-title="table2.subTitle" :data="table2.data" :columns="table2.columns">

          </paper-table>
        </div>
      </div>
-->
    </div>
  </div>
</template>
<script>
  import PaperTable from '../../UIComponents/PaperTable.vue'
  import { Meteor } from 'meteor/meteor'
  import { Things } from '../../../../api/collections'
  import { Metrics, EdgeData, CommandResults } from '../../../../api/collections'
  import StatsCard from '../../UIComponents/Cards/StatsCard.vue'

  const tableColumns = ['Id', 'Name', 'Model', 'Country', 'City']
  const tableData = [{
    id: 1,
    name: 'Dakota Rice',
    model: '$36.738',
    country: 'Niger',
    city: 'Oud-Turnhout'
  },
  {
    id: 2,
    name: 'Minerva Hooper',
    salary: '$23,789',
    country: 'Curaçao',
    city: 'Sinaai-Waas'
  },
  {
    id: 3,
    name: 'Sage Rodriguez',
    salary: '$56,142',
    country: 'Netherlands',
    city: 'Baileux'
  },
  {
    id: 4,
    name: 'Philip Chaney',
    salary: '$38,735',
    country: 'Korea, South',
    city: 'Overland Park'
  },
  {
    id: 5,
    name: 'Doris Greene',
    salary: '$63,542',
    country: 'Malawi',
    city: 'Feldkirchen in Kärnten'
  }]

  export default {
    components: {
      PaperTable,
      StatsCard,
    },
    data () {
      return {
        statsCards: [
          {
            type: 'warning',
            icon: 'ti-server',
            title: 'Waiting...',
            value: '...',
            footerText: 'Auto Update...',
            footerIcon: 'ti-reload'
          },
          // {
          //   type: 'success',
          //   icon: 'ti-wallet',
          //   title: 'Revenue',
          //   value: '$1,345',
          //   footerText: 'Last day',
          //   footerIcon: 'ti-calendar'
          // },
          // {
          //   type: 'danger',
          //   icon: 'ti-pulse',
          //   title: 'Errors',
          //   value: '23',
          //   footerText: 'In the last hour',
          //   footerIcon: 'ti-timer'
          // },
          // {
          //   type: 'info',
          //   icon: 'ti-twitter-alt',
          //   title: 'Followers',
          //   value: '+45',
          //   footerText: 'Updated now',
          //   footerIcon: 'ti-reload'
          // }
        ],
//        things: [],
        limit: 10,
        table1: {
          title: '接入设备清单',
          subTitle: '显示接入平台的设备清单',
          columns: [...tableColumns],
          data: [...tableData]
        },
        currentCommandId: null,
        // table1: {
        //   title: 'Device List',
        //   subTitle: 'This list shows the managed devices',
        //   columns: [...tableColumns],
        //   data: [...tableData]
        // },
        // table2: {
        //   title: 'Table on Plain Background',
        //   subTitle: 'Here is a subtitle for this table',
        //   columns: [...tableColumns],
        //   data: [...tableData]
        // }
      }
    },
    mounted() {
      Meteor.call('getEnv', "LEAPAPP_ENV", (err, results) => {
        let mapEnv = JSON.parse(results);

        //let url = mapEnv.leapaiUrl + '/leapiot' + '/dt/open/v1/instances' + '?appId=' + mapEnv.appid;
        let url = 'https://api.leapai.com/leapiot/dt/open/v1/instances?appId=' + mapEnv.appid;
        console.log('url=' + url);
        this.$http.get(url)
          .then(response=> {
            console.log('API call response');
            console.dir(response);
            if(response.status==200 && response.data.status === "200") {
              console.log(response.data.status)
              this.currentCommandId = response.data.result.commandId;
              console.log('Got commandId = ' + this.currentCommandId);
            }
          })
          .catch(error=>{
            console.log('API call Error' + error);
          });
      });
    },
    meteor: {
      $subscribe: {
        'things' () {
          console.log('meteor.$subscribe: things');
          return [this.limit]
        },
        'requestcommandresult' () {
          return [100]
        }
      },
      allThings () {
        console.log('allThings changed');
        return Things.find({}, {
          /*sort: { created: -1 },*/
        })
      },
      updateChartsData () {
        // console.log('xxxxx updateChartsData called!');
        console.log('CurrentCommandId = ' + this.currentCommandId);
        var leapIotData = CommandResults.find({/*_id: this.currentCommandId*/}, {
        }).fetch();

        if (leapIotData.length > 0) {
          for (let i=0,len=leapIotData.length; i<len; i++) {
            let data = leapIotData[i];
            if (data._id == this.currentCommandId) {
              console.log('Got leapIoT data:');
              let payload = JSON.parse(data.commandResult);
              console.dir(payload.data);
              let pdata = payload.data;
              this.statsCards = [];
              for (let j=0; j<pdata.total; j++){
                let card = {};
                let row = pdata.rows[j];
                card.type = 'warning';
                card.title = row.name;
                card.value = row.attrnum;
                card.footerText = row.desp;
                card.footerIcon = 'ti-reload';

                if(j==0) {
                  card.icon = 'ti-server';
                }
                else if(j==1) {
                  card.icon = 'ti-notepad';
                }
                else if(j==2) {
                  card.icon = 'ti-pulse';
                }
                else if(j==3) {
                  card.icon = 'ti-printer';
                }
                else if(j==4) {
                  card.icon = 'ti-plug';
                }
                else if(j==5) {
                  card.icon = 'ti-shine';
                }
                else {
                  card.icon = 'ti-timer';
                }

                this.statsCards.push(card);
              }
            }
          }
        }

        var mdata = Metrics.find({}, {
         sort: {created: -1},
         limit: 20
        }).fetch();

        if (mdata.length > 0) {
          var tpArray = [[]];
          var lmArray = [[]];

          for(let i=0, len=mdata.length; i<len; i++) {
            let m = mdata[len-i-1];
            tpArray[0].push(m.tp);
            lmArray[0].push(m.lm);
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
    },
  }

</script>
<style>

</style>
