import Vue from 'vue'
import Vuex from 'vuex'
import Song from '@/store/song/index';
import User from '@/store/user/index';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
  },
  mutations: {
    showLoading (state) {
      state.isLoading = true;
    },
    hideLoading (state) {
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
