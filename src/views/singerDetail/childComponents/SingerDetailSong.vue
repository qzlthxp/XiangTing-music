<template>
  <div class="singer-detail-song">
    <song-info v-if="songsInfo.length && !this.$store.state.isLoading" :song-infos="songsInfo"></song-info>
    <no-music v-if="!songsInfo.length && !this.$store.state.isLoading"></no-music>
  </div>
</template>

<script>
import SongInfo from "@/components/content/songInfo/SongInfo";
import NoMusic from "@/components/content/noRes/NoMusic";
import {getSongs} from "@/network/singerDetailSongs";

export default {
  name: "SingerDetailSong",
  data() {
    return {
      songsInfo: [],
    }
  },
  watch: {
    $route() {
      this.getSongs();
    }
  },
  components: {
    SongInfo,
    NoMusic,
  },
  created() {
    this.getSongs();
  },
  methods: {
    async getSongs() {
      try {
        this.songsInfo = (await getSongs(this.$route.params.singer_id)).hotSongs;
      }catch (e) {
        return e;
      }
    }
  },
}
</script>

<style scoped>
  .singer-detail-song{
    width: 1240px;
    height: auto;
    padding: 0 var(--default-padding);
    position: relative;
  }
</style>