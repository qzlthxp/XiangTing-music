import {
  updateRemoveUserLikePlayLists,
  updateRemoveUserLikeSinger,
  updateRemoveUserLikeSong, updateUserLikePlayLists,
  updateUserLikeSinger,
  updateUserLikeSong
} from "@/network/user";

export default {
  state: {
    userInfo: {
      user_id: null,
      user_name: '',
      user_photo: '',
      user_token: '',
    },
    singerUserLike: [],
    songUserLike: [],
    playListsUserLike: [],
  },
  mutations: {
    saveUser(state, payload) {
      if (payload.status) {
        ({user_id: state.userInfo.user_id, user_name: state.userInfo.user_name, user_photo: state.userInfo.user_photo, user_token: state.userInfo.user_token} = payload);
      }
    },
    saveLikeSinger(state, payload) {
      if (!state.singerUserLike.length) {
        payload.forEach( value => {
          state.singerUserLike.push(value);
        });
      }
    },
    saveLikeSong(state, payload) {
      if (!state.songUserLike.length) {
        payload.forEach( value => {
          state.songUserLike.push(value);
        });
      }
    },
    saveLikePlayLists(state, payload) {
      if (!state.playListsUserLike.length) {
        payload.forEach( value => {
          state.playListsUserLike.push(value);
        });
      }
    },
    removeUser(state) {
      state.userInfo = {
        user_id: null,
        user_name: '',
        user_photo: '',
        user_token: '',
      };
      state.singerUserLike = [];
      state.songUserLike = [];
      state.playListsUserLike = [];
    },
    coverSongs(state, payload) {
      state.songUserLike = [...payload];
    },
    coverSingers(state, payload) {
      state.singerUserLike = [...payload];
    },
    coverPlayLists(state, payload) {
      state.playListsUserLike = [...payload];
    },
  },
  actions: {
    async likeSongIsAdd(context, payload) {
      try {
        let res = await updateUserLikeSong(context.state.userInfo.user_id, payload.song_id);
        context.commit('coverSongs', res.songs);
        payload.this.$toasted.show(res.message);
      }catch (e) {
        return e;
      }
    },
    async likeSongIsDec(context, payload) {
      try {
        let res = await updateRemoveUserLikeSong(context.state.userInfo.user_id, payload.song_id);
        context.commit('coverSongs', res.songs);
        payload.this.$toasted.show(res.message);
      }catch (e) {
        return e;
      }
    },
    async likeSingerIsAdd(context, payload) {
      try {
        let res = await updateUserLikeSinger(context.state.userInfo.user_id, payload.singer_id);
        context.commit('coverSingers', res.singers);
        payload.this.$toasted.show(res.message);
      }catch (e) {
        return e;
      }
    },
    async likeSingerIsDec(context, payload) {
      try {
        let res = await updateRemoveUserLikeSinger(context.state.userInfo.user_id, payload.singer_id);
        context.commit('coverSingers', res.singers);
        payload.this.$toasted.show(res.message);
      }catch (e) {
        return e;
      }
    },
    async likePlayListsIsAdd(context, payload) {
      try {
        let res = await updateUserLikePlayLists(context.state.userInfo.user_id, payload.play_lists_id);
        context.commit('coverPlayLists', res.playLists);
        payload.this.$toasted.show(res.message);
      }catch (e) {
        return e;
      }
    },
    async likePlayListsIsDec(context, payload) {
      try {
        let res = await updateRemoveUserLikePlayLists(context.state.userInfo.user_id, payload.play_lists_id);
        context.commit('coverPlayLists', res.playLists);
        payload.this.$toasted.show(res.message);
      }catch (e) {
        return e;
      }
    },
  }
}