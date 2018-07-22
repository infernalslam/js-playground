// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCodemirror from 'vue-codemirror'
import Notifications from 'vue-notification'
import 'codemirror/lib/codemirror.css'
import '../node_modules/bulma/css/bulma.min.css'

Vue.use(VueCodemirror)
Vue.use(Notifications)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
