<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapMutations} from "vuex";
import {loginByToken} from "@/network/login";
import {getUserLikePlayLists, getUserLikeSinger, getUserLikeSong} from "@/network/user";

export default {
  name: "App",
  created() {
    this.TokenLogin();
  },
  methods: {
    ...mapMutations(['saveUser','saveLikeSinger','saveLikeSong','saveLikePlayLists']),
    async TokenLogin() {
      try {
        let res = await loginByToken(localStorage.getItem('music_token'));
        if (res.status) {
          await this.saveUser(res);
          await this.getUserLike(res.user_id);
          await localStorage.setItem('music_token', res.user_token);
          await sessionStorage.setItem('music_token', res.user_token);
          // await this.$router.replace('/');
        }
      }catch (e) {
        return e;
      }
    },
    async getUserLike(userId) {
      try {
        let SingerVal = await getUserLikeSinger(userId);
        await this.saveLikeSinger(SingerVal.singers);
        let SongVal = await getUserLikeSong(userId);
        await this.saveLikeSong(SongVal.songs);
        let PlayListsVal = await getUserLikePlayLists(userId);
        await this.saveLikePlayLists(PlayListsVal.playLists);
      }catch (e) {
        return e;
      }
    },
  }
};
</script>

<style>

</style>
