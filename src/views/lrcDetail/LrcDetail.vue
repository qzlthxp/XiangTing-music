<template>
  <div class="lrc-detail">
    <div class="left" v-if="Object.keys(epInfo).length">
      <lrc-detail-left :epInfo="epInfo"></lrc-detail-left>
    </div>
    <div class="right" v-if="Object.keys(songInfo).length">
      <lrc-detail-right
        :epInfo="epInfo"
        :songInfo="songInfo"
        @playThis="playThis"
        @addThis="addThis"
      >
      </lrc-detail-right>
      <div class="lrc-similar" v-if="Object.keys(lrc).length">
        <div style="width: 100%">
          <lrc v-if="Object.keys(lrc).length" :lrc="lrc"></lrc>
          <comment is-user-song="no_user_song"></comment>
        </div>
        <similar-song
          v-if="similarSongs.length"
          :similar-songs="similarSongs"
        ></similar-song>
      </div>
    </div>
  </div>
</template>

<script>
import LrcDetailLeft from '@/views/lrcDetail/childrenComponents/LrcDetailLeft'
import LrcDetailRight from '@/views/lrcDetail/childrenComponents/LrcDetailRight'
import Lrc from '@/views/lrcDetail/childrenComponents/Lrc'
import SimilarSong from '@/views/lrcDetail/childrenComponents/SimilarSong'
import Comment from '@/components/content/comment/index'
import { getSongDesc, getLrc, getSimiSong } from '@/network/lrcDetail'
import { getEp } from '@/network/epDetail'
import { formatLrc } from '@/common/utils'

export default {
  name: 'LrcDetail',
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
      this.getLrcInfo()
      this.getSongInfo()
      this.getSimilarSong()
    },
    songInfo: {
      deep: true,
      handler(newVal) {
        this.songInfo = newVal
      },
    },
    epInfo: {
      deep: true,
      handler(newVal) {
        this.epInfo = newVal
      },
    },
    lrc: {
      deep: true,
      handler(newVal) {
        this.lrc = newVal
      },
    },
    similarSongs: {
      deep: true,
      handler(newVal) {
        this.similarSongs = newVal
      },
    },
  },
  components: {
    LrcDetailLeft,
    LrcDetailRight,
    Lrc,
    SimilarSong,
    Comment,
  },
  created() {
    this.getSongInfo()
    this.getLrcInfo()
    this.getSimilarSong()
  },
  methods: {
    async getSongInfo() {
      try {
        this.songInfo = (await getSongDesc(this.$route.params.song_id)).songs[0]
        await this.getEpInfo(this.songInfo.al.id)
      } catch (e) {
        return e
      }
    },
    async getEpInfo(id) {
      try {
        this.epInfo = (await getEp(id)).album
      } catch (e) {
        return e
      }
    },
    async getLrcInfo() {
      try {
        this.lrc = formatLrc(
          (await getLrc(this.$route.params.song_id)).lrc.lyric
        )
      } catch (e) {
        return e
      }
    },
    async getSimilarSong() {
      try {
        this.similarSongs = (
          await getSimiSong(this.$route.params.song_id)
        ).songs
      } catch (e) {
        return e
      }
    },
    playThis() {
      let obj = {
        id: this.songInfo.id,
        singer_info: this.songInfo.ar,
        song_name: this.songInfo.name,
        song_url: `https://music.163.com/song/media/outer/url?id=${this.songInfo.id}.mp3`,
        al: this.songInfo.al,
        type: this.songInfo.type,
      }
      let num = null
      this.$store.state.song.songList.forEach((value, index) => {
        if (value.id === this.songInfo.id) {
          num = index
        }
      })
      if (num) {
        this.$bus.$emit('play-this-song', num)
      } else {
        this.$store.commit('addSongListByUnShift', obj)
        this.$bus.$emit('play-first-song')
      }
    },
    addThis() {
      let songs = []
      songs.push(this.songInfo.id)
      this.$bus.$emit('openSelectPlayLists', songs)
    },
  },
}
</script>

<style scoped>
.lrc-detail {
  width: 100%;
  height: auto;
  padding: 80px var(--default-padding);
  display: flex;
  position: relative;
}
.left {
  width: 250px;
  height: auto;
  position: relative;
}
.right {
  width: calc(100% - 250px);
  height: auto;
  padding-left: 50px;
  position: relative;
}
.right .lrc-similar {
  display: flex;
  justify-content: space-between;
  position: relative;
}
</style>
