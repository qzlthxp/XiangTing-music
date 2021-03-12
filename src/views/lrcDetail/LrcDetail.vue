<template>
  <div class="lrc-detail">
    <div class="left" v-if="Object.keys(epInfo).length">
      <lrc-detail-left :epInfo="epInfo"></lrc-detail-left>
    </div>
    <div class="right" v-if="Object.keys(songInfo).length">
      <lrc-detail-right :epInfo="epInfo" :songInfo="songInfo"></lrc-detail-right>
      <div class="lrc-similar" v-if="Object.keys(lrc).length">
        <lrc :lrc="lrc"></lrc>
        <similar-song v-if="similarSongs.length" :similar-songs="similarSongs"></similar-song>
      </div>
    </div>
  </div>
</template>

<script>
import LrcDetailLeft from "@/views/lrcDetail/childrenComponents/LrcDetailLeft";
import LrcDetailRight from "@/views/lrcDetail/childrenComponents/LrcDetailRight";
import Lrc from "@/views/lrcDetail/childrenComponents/Lrc";
import SimilarSong from "@/views/lrcDetail/childrenComponents/SimilarSong";
import {getSongDesc ,getLrc, getSimiSong} from "@/network/lrcDetail";
import {getEp} from "@/network/epDetail";
export default {
  name: "LrcDetail",
  data() {
    return {
      lrc: {},
      songInfo: {},
      epInfo: {},
      similarSongs: [],
    }
  },
  watch: {
    $route() {
      this.getLrcInfo();
      this.getSongInfo();
      this.getSimilarSong();
    },
    songInfo:{
      deep: true,
      handler(newVal) {
        this.songInfo = newVal;
      }
    },
    epInfo:{
      deep: true,
      handler(newVal) {
        this.epInfo = newVal;
      }
    },
    lrc: {
      deep: true,
      handler(newVal) {
        this.lrc = newVal;
      }
    },
    similarSongs: {
      deep: true,
      handler(newVal) {
        this.similarSongs = newVal;
      }
    },
  },
  components: {
    LrcDetailLeft,
    LrcDetailRight,
    Lrc,
    SimilarSong
  },
  created() {
    this.getSongInfo();
    this.getLrcInfo();
    this.getSimilarSong();
  },
  methods: {
    async getSongInfo() {
      try {
        this.songInfo = (await getSongDesc(this.$route.params.song_id)).songs[0];
        await this.getEpInfo(this.songInfo.al.id);
      }catch (e) {
        return e;
      }
    },
    async getEpInfo(id) {
      try {
        this.epInfo = (await getEp(id)).album;
      }catch (e) {
        return e;
      }
    },
    async getLrcInfo() {
      try {
        let lrc = (await getLrc(this.$route.params.song_id)).lrc.lyric;
        let lyrics = lrc.split("\n");//lrc代表歌词文件内容的引用
        let lrcObj = {};
        for(let i = 0; i < lyrics.length; i++ ){
          let lyric = decodeURIComponent(lyrics[i]);
          let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
          let timeRegExpArr = lyric.match(timeReg);
          if(!timeRegExpArr)continue;
          let clause = lyric.replace(timeReg,'');
          for(let k = 0,h = timeRegExpArr.length;k < h;k++) {
            let t = timeRegExpArr[k];
            let min = Number(String(t.match(/\[\d*/i)).slice(1)),
                sec = Number(String(t.match(/\:\d*/i)).slice(1));
            let time = min * 60 + sec;
            lrcObj[time] = clause;
          }
        }
        this.lrc = lrcObj;
      }catch (e) {
        return e;
      }
    },
    async getSimilarSong() {
      try {
        this.similarSongs = (await getSimiSong(this.$route.params.song_id)).songs;
      }catch (e) {
        return e;
      }
    }
  }
}
</script>

<style scoped>
  .lrc-detail{
    width: 100%;
    height: auto;
    padding: 80px var(--default-padding);
    display: flex;
    position: relative;
  }
  .left{
    width: 250px;
    height: auto;
    position: relative;
  }
  .right{
    width: calc(100% - 250px);
    height: auto;
    padding-left: 50px;
    position: relative;
  }
  .right .lrc-similar{
    display: flex;
    justify-content: space-between;
    position: relative;
  }
</style>