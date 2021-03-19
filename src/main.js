import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './router/permission';
import store from './store';
import 'normalize.css/normalize.css';
import './styles/css/base.css';
//第三方库
import 'font-awesome/css/font-awesome.min.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Toasted from 'vue-toasted';


Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();
Vue.use(VueAwesomeSwiper,/**/);
Vue.use(Element);
Vue.use(Toasted,{
  theme: "toasted-primary",
  position: "top-center",
  duration : 1000
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
