<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" :class="{toggled: $sidebar.showSidebar}" @click="toggleSidebar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar bar1"></span>
          <span class="icon-bar bar2"></span>
          <span class="icon-bar bar3"></span>
        </button>
        <a class="navbar-brand">{{routeName}}</a>
      </div>
      <div class="navbar-right-menu">
        <ul class="nav navbar-nav navbar-right">
          <li class="open">
            <a href="#" class="dropdown-toggle btn-magnify" data-toggle="dropdown">
              <i class="ti-panel"></i>
              <p>状态</p>
            </a>
          </li>
             <drop-down title="5条消息通知" icon="ti-bell">
               <li><a href="#">设备[DEV0001]上线</a></li>
               <li><a href="#">设备[DEV0001]下线</a></li>
               <li><a href="#">设备[DEV0001]温度报警</a></li>
               <li><a href="#">设备[DEV0013]上线</a></li>
               <li><a href="#">设备[DEV0012]复位成功</a></li>
             </drop-down>
          <li>
            <a href="#" class="btn-rotate">
              <i class="ti-settings"></i>
              <p>
                设置
              </p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  export default {
    computed: {
      routeName () {
        const {name} = this.$route
        return this.capitalizeFirstLetter(name)
      }
    },
    data () {
      return {
        activeNotifications: false
      }
    },
    methods: {
      capitalizeFirstLetter (string) {
        switch (string) {
          case 'table-list':
            return 'LeapIOT 数字镜像'
            break
          case 'overview':
            return '仪表盘'
            break
          case 'maps':
            return '连接地图'
            break
         default:
            return string.charAt(0).toUpperCase() + string.slice(1)
            break
         }
      },
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      }
    }
  }

</script>
<style>

</style>
