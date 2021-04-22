import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './router/permission'
import store from './store'
import 'normalize.css/normalize.css'
import './styles/css/base.css'
//第三方库
import 'font-awesome/css/font-awesome.min.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import Toasted from 'vue-toasted'

import Element from '../plugins/element/Element'
import { MessageBox, Message } from 'element-ui'
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.use(VueAwesomeSwiper /**/)
Vue.use(Element)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message

Vue.use(Toasted, {
  theme: 'toasted-primary',
  position: 'top-center',
  duration: 1000,
})
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
