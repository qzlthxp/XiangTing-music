<template>
  <div id="music-main">
    <music-header></music-header>
    <keep-alive v-if="$route.meta.isAlive">
      <router-view></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.isAlive"></router-view>
<!--    <music-footer></music-footer>-->
    <music-player></music-player>
    <side-bar></side-bar>
    <no-login></no-login>
  </div>
</template>

<script>
import MusicHeader from "@/components/content/musicHeader/MusicHeader";
// import MusicFooter from "@/components/content/musicFooter/MusicFooter";
import SideBar from "@/components/content/sideBar/SideBar";
import MusicPlayer from "@/components/common/musicPlayer/MusicPlayer";
import NoLogin from "@/components/content/noRes/NoLogin";
export default {
  name: "MusicMain",
  components: {
    MusicHeader,
    // MusicFooter,
    SideBar,
    MusicPlayer,
    NoLogin
  },

}
</script>

<style scoped>
  #music-main{
    width: 100%;
    min-width: 1440px;
    height: auto;
    position: relative;
  }
</style>