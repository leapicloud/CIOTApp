import Vue from 'vue'
import VueRouter from 'vue-router'
import vClickOutside from 'v-click-outside'

// Plugins
import GlobalComponents from './gloablComponents'
import Notifications from './components/UIComponents/NotificationPlugin'
import SideBar from './components/UIComponents/SidebarPlugin'
import App from './App'

// router setup
import routes from './routes/routes'

import axios from 'axios';

// library imports
import Chartist from 'chartist'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/sass/paper-dashboard.scss'
import 'es6-promise/auto'

import VueMeteorTracker from 'vue-meteor-tracker'

function createApp (context) {

  // Meteor Tracker integration
  Vue.use(VueMeteorTracker)
  Vue.config.meteor.freeze = true
  console.log('tracker installed')

  // plugin setup
  Vue.use(VueRouter)
  Vue.use(GlobalComponents)
  Vue.use(vClickOutside)
  Vue.use(Notifications)
  Vue.use(SideBar)

  Vue.prototype.$http = axios;
  Vue.prototype.$env = null;

  Meteor.call('getEnv', "LEAPAPP_ENV", (err, results) => {
    console.log('-----');
    console.log('json:');
    console.log(results);
    console.log('-----');
    console.log('object:');
    Vue.prototype.$env = JSON.parse(results);
    console.log(Vue.prototype.$env);
    console.log('-----');
  });

  // configure router
  const router = new VueRouter({
    routes, // short for routes: routes
    linkActiveClass: 'active'
  })

  // global library setup
  Object.defineProperty(Vue.prototype, '$Chartist', {
    get () {
      return this.$root.Chartist
    }
  })

  /* eslint-disable no-new */
  return {
    app: new Vue({
      el: '#app',
      render: h => h(App),
      router,
      data: {
        Chartist: Chartist
      }
    }),
    router,
  }
}

export default createApp
