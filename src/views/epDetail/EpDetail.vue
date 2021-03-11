<template>
  <div class="ep-detail">
    <div v-if="Object.keys(epInfo).length" class="nav-container">
      <ep-detail-nav :epInfo="epInfo"></ep-detail-nav>
    </div>
    <div class="main-container">
      <p class="ep-name">{{epName}}</p>
      <song-info v-show="songs.length" :song-infos="songs"></song-info>
      <no-music v-show="!songs.length"></no-music>
    </div>
  </div>
</template>

<script>
import EpDetailNav from "@/views/epDetail/childComponents/EpDetailNav";
import SongInfo from "@/components/content/songInfo/SongInfo";
import NoMusic from "@/components/content/noRes/NoMusic";
import {getEp} from "@/network/epDetail";

export default {
  name: "EpDetail",
  data() {
    return {
      epName: '',
      epInfo: {},
      songs: [],
    }
  },
  watch: {
    $route() {
      this.getEpInfo();
    }
  },
  components: {
    EpDetailNav,
    SongInfo,
    NoMusic
  },
  created() {
    this.getEpInfo();
  },
  methods: {
    async getEpInfo() {
      try {
        let res = await getEp(this.$route.params.ep_id);
        this.epName = res.album.name;
        this.epInfo = res.album;
        this.songs = res.songs;
      }catch (e) {
        return e;
      }
    }
  }
}
</script>

<style scoped>
  .ep-detail{
    width: 100%;
    padding: 80px var(--default-padding);
    position: relative;
    display: flex;
  }
  .nav-container{
    width: 250px;
    height: auto;
    overflow: hidden;
  }
  .main-container{
    width: calc(100% - 250px);
    height: auto;
    padding-left: 50px;
    overflow: hidden;
  }
  .ep-name{
    font-size: 2rem;
    font-weight: bold;
  }
</style>