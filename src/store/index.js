import Vue from 'vue'
import Vuex from 'vuex'
import Song from '@/store/song/index';
import User from '@/store/user/index';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    BASEURL: 'http://47.116.70.173:8081/api',
    API_BASEURL: 'https://netease-cloud-music-api-theta.vercel.app/',
    isLoading: false,
  },
  mutations: {
    showLoading(state) {
      state.isLoading = true;
    },
    hideLoading(state) {
      state.isLoading = false;
    },
  },
  modules: {
    song: Song,
    user: User,
  },
  getters: {
  }
})
