<template>
  <div class="search-content">
    <song-info v-if="type === 1 && songInfo.length" :song-infos="songInfo"></song-info>
    <singers-over-view v-if="type === 100 && Infos.length" :Infos="Infos"></singers-over-view>
    <ep-info v-if="type === 10 && epsInfo.length" :eps-info="epsInfo"></ep-info>
    <no-collect v-if="(type === 1 && !songInfo.length) || (type === 100 && !Infos.length) || (type === 10 && !epsInfo.length)"></no-collect>
  </div>
</template>

<script>
import SongInfo from "@/components/content/songInfo/SongInfo";
import SingersOverView from "@/views/singers/childComponents/SingersOverView";
import EpInfo from "@/components/content/epInfo/EpInfo";
import NoCollect from "@/components/content/noRes/NoCollect";
export default {
  name: "SearchContent",
  props: {
    searchRes: {
      type: Object,
      default() {
        return {};
      }
    },
    type: {
      type: Number,
      default: 0,
    }
  },
  computed: {
    songInfo() {
      if (this.type === 1 && this.searchRes.songCount) {
        return this.searchRes.songs;
      }else {
        return [];
      }
    },
    Infos() {
      if (this.type === 100 && this.searchRes.artistCount) {
        return this.searchRes.artists;
      }else {
        return [];
      }
    },
    epsInfo() {
      if (this.type === 10 && this.searchRes.albumCount) {
        return this.searchRes.albums;
      }else {
        return [];
      }
    }
  },
  components: {
    SongInfo,
    SingersOverView,
    EpInfo,
    NoCollect
  },
}
</script>

<style scoped>
  .search-content{
    width: 100%;
    height: auto;
    position: relative;
  }
</style>