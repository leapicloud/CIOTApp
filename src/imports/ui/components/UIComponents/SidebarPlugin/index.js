import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [
    // {
    //   name: '连接地图',
    //   icon: 'ti-map',
    //   path: '/admin/maps'
    // },
    // {
    //   name: '仪表盘',
    //   icon: 'ti-panel',
    //   path: '/admin/overview'
    // },
    {
      name: 'LeapIOT',
      icon: 'ti-view-list-alt',
      path: '/table-list'
    },
/*    {
      name: 'User Profile',
      icon: 'ti-user',
      path: '/admin/stats'
    },
    {
      name: 'Typography',
      icon: 'ti-text',
      path: '/admin/typography'
    },
    {
      name: 'Icons',
      icon: 'ti-pencil-alt2',
      path: '/admin/icons'
    },
    {
      name: 'Notifications',
      icon: 'ti-bell',
      path: '/admin/notifications'
    }*/
  ],
  displaySidebar (value) {
    this.showSidebar = value
  }
}

const SidebarPlugin = {

  install (Vue) {
    Vue.mixin({
      data () {
        return {
          sidebarStore: SidebarStore
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$sidebar', {
      get () {
        return this.$root.sidebarStore
      }
    })
    Vue.component('side-bar', Sidebar)
  }
}

export default SidebarPlugin
