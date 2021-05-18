<template>
  <div id="music-main">
    <music-header></music-header>
    <keep-alive v-if="$route.meta.isAlive">
      <router-view></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.isAlive"></router-view>
    <!--    <music-footer></music-footer>-->
    <music-player></music-player>
    <select-play-lists></select-play-lists>
    <side-bar></side-bar>
    <no-login></no-login>
  </div>
</template>

<script>
import MusicHeader from '@/components/content/musicHeader/MusicHeader'
// import MusicFooter from "@/components/content/musicFooter/MusicFooter";
import SelectPlayLists from '@/components/content/selectPlayLists/SelectPlayLists'
import SideBar from '@/components/content/sideBar/SideBar'
import MusicPlayer from '@/components/common/musicPlayer/MusicPlayer'
import NoLogin from '@/components/content/noRes/NoLogin'
import { mapMutations } from 'vuex'
import { loginByToken } from '@/network/login'
import {
  getUserLikePlayLists,
  getUserLikeSinger,
  getUserLikeSong,
  getUserLikeComment,
  getUserDisLikeComment,
} from '@/network/user'
export default {
  name: 'MusicMain',
  components: {
    MusicHeader,
    // MusicFooter,
    SelectPlayLists,
    SideBar,
    MusicPlayer,
    NoLogin,
  },
  created() {
    if (this.$store.state.user.userInfo.user_token) {
      this.getUserLike(this.$store.state.user.userInfo.user_id)
    }else{
      this.TokenLogin()
    }
  },
  methods: {
    ...mapMutations([
      'saveUser',
      'saveLikeSinger',
      'saveLikeSong',
      'saveLikePlayLists',
      'saveLikeComment',
      'saveDisLikeComment',
    ]),
    async TokenLogin() {
      try {
        let res = await loginByToken(localStorage.getItem('music_token'))
        if (res.status) {
          await this.saveUser(res)
          await this.getUserLike(res.user_id)
        }
      } catch (e) {
        return e
      }
    },
    async getUserLike(userId) {
      try {
        let SingerVal = await getUserLikeSinger(userId)
        await this.saveLikeSinger(SingerVal.singers)
        let SongVal = await getUserLikeSong(userId)
        await this.saveLikeSong(SongVal.songs)
        let PlayListsVal = await getUserLikePlayLists(userId)
        await this.saveLikePlayLists(PlayListsVal.playLists)
        let likeCommentVal = await getUserLikeComment(userId)
        await this.saveLikeComment(likeCommentVal.likeComments)
        let DislikeCommentVal = await getUserDisLikeComment(userId)
        await this.saveDisLikeComment(DislikeCommentVal.disLikeComments)
      } catch (e) {
        return e
      }
    },
  },
}
</script>

<style scoped>
#music-main {
  width: 100%;
  min-width: 1440px;
  height: auto;
  position: relative;
}
</style>
