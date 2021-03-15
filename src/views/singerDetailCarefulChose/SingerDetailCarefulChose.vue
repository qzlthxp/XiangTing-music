<template>
  <div class="singer-detail-careful-chose">
    <song-info v-if="songs.length && !this.$store.state.isLoading" :song-infos="songs"></song-info>
    <loading v-if="this.$store.state.isLoading"></loading>
    <no-music v-if="!songs.length && !this.$store.state.isLoading"></no-music>
  </div>
</template>

<script>
import SongInfo from "@/components/content/songInfo/SongInfo";
import Loading from "@/components/common/loading/Loading";
import NoMusic from "@/components/content/noRes/NoMusic";
import {getSingerHotSong} from "@/network/singerDetailCarefulChose";

export default {
  name: "SingerDetailCarefulChose",
  data() {
    return {
      songs: [],
    }
  },
  watch: {
    $route() {
      this.getSong();
    }
  },
  components: {
    SongInfo,
    NoMusic,
    Loading
  },
  created() {
   this.getSong();
  },
  methods: {
    async getSong() {
      try {
        this.$store.commit('showLoading');
        this.songs = (await getSingerHotSong(this.$route.params.singer_id)).songs;
        this.$store.commit('hideLoading');
      }catch (e) {
        return e;
      }
    }
  },
}
</script>

<style scoped>
  .singer-detail-careful-chose{
    width: 1000px;
    height: auto;
    position: relative;
  }
</style>