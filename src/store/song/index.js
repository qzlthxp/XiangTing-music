export default {
  state: {
    songList: [],
    currentTime: '',
  },
  mutations: {
    addSongListByPush(state, payload) {
      state.songList.push(payload);
    },
    addSongListByUnShift(state, payload) {
      state.songList.unshift(payload);
    },
    addSongListAllSong(state,payload) {
      if (state.songList.length) {
        state.songList = [];
      }
      payload.forEach( value => {
        state.songList.push(value);
      });
    },
    removeSongList(state, payload) {
      if (state.songList.length) {
        state.songList.splice(payload.index, 1);
      }
    },
    clearSongList(state) {
      if (state.songList.length) {
        state.songList = [];
      }
    },
    checkCurrentTime(state, payload) {
      state.currentTime = payload.currentTime;
    },
    resetCurrentTime(state) {
      state.currentTime = '';
    }
  },
  actions: {

  },
  getters: {
    totalSongList(state) {
      return state.songList.length;
    },
  }
};