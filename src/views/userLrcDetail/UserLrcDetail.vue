<template>
  <div class="user-lrc-detail">
    <div class="left">
      <h1 class="song-name">{{ songInfo.name }}</h1>
    <div class="user-info">
      <img class="user-photo" @click="$router.push('/music_main/user/' + songInfo.user_id)" :src="songInfo.user_photo" alt="">
      <p class="user-name"  @click="$router.push('/music_main/user/' + songInfo.user_id)">{{ songInfo.user_name }}</p>
    </div>
    <p class="time">发布时间：{{ publishTime(songInfo.publishTime) }}</p>
    <div class="btn">
      <button class="play" @click="playThis">
        <span><i class="fa fa-play"></i></span>
        <span style="margin-left: 10px">播放</span>
      </button>
      <button class="share" @click="shareThis" ref="shareBtn">
        <span style="position: relative;z-index: -1">
          <i class="fa fa-share fa-fw"></i>
        </span>
        <span style="position: relative;z-index: -1">分享</span>
        <div class="share-box" ref="shareBox" v-show="showShareBox">
          <p>复制链接进行分享</p>
          <div class="content">
            <input
              ref="pathInput"
              style="height: 35px;font-size:1.2rem; padding: 0 10px; border: none;background: #eee"
              type="text"
              :value="fullPath"
            />
            <el-button
              style="height: 35px;display: flex;justify-content: center;align-items:center"
              icon="el-icon-document-copy"
              @click="copyPath"
            ></el-button>
          </div>
        </div>
      </button>
    </div>
    <comment is-user-song="user_song"></comment>
    </div>

    <div class="right">
      <p class="title">该用户其他歌曲</p>
      <ul>
        <li 
          class="similar-item" 
          v-for="item in similarList" 
          :key="item.id"
          @click="$router.push('/music_main/user_lrc_detail/' + item.id)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Comment from '@/components/content/comment/index';
import { getSong, getOwn } from '@/network/user';
import { formatDate } from '@/common/utils';
import { getSimilar } from '@/network/userLrcDetail/index';
export default {
  name: 'UserLrcDetail',
  components: {
    Comment
  },
  filters: {
    formatDate
  },
  data() {
    return {
      songInfo: [],
      similarList: [],
      showShareBox: false,
    }
  },
  watch: {
    $route() {
      this.getUserSong()
    },
    songInfo: {
      deep: true,
      handler(newVal) {
        this.songInfo = newVal;
      }
    },
    similarList: {
      deep: true,
      handler(newVal) {
        this.similarList = newVal;
      }
    }
  },
  computed: {
    fullPath() {
      return process.env.VUE_APP_SHARE_BASE + this.$route.fullPath
    },
    publishTime() {
      return data => {
        return formatDate(data * 1)
      }
    }
  },
  created() {
    this.getUserSong()
  },
  mounted() {
    window.addEventListener('click', this.closeShareBox)
  },
  methods: {
    async getUserSong() {
      try {
        this.songInfo = await getSong(this.$route.params.user_song_id)
        await this.getSimilarSongs(this.songInfo.user_id, this.$route.params.user_song_id)
      } catch (error) {
        return error;
      }
    },
    async getSimilarSongs(userId, songId) {
      try {
        this.similarList = (await getSimilar(userId, songId)).songs
      } catch (error) {
        return error;
      }
    },
    playThis() {
      let ids = []
      let num = null
      ids.push(this.songInfo.id)
      this.$store.state.song.songList.forEach((value, index) => {
        if (value.id === this.songInfo.id) {
          num = index
        }
      })
      if (num !== null) {
        this.$bus.$emit('play-this-song', num)
      } else {
        this.$store.commit('addSongListByUnShift', {
          id: this.songInfo.id,
          singer_info: [
            {
              name: this.songInfo.user_name,
              id: this.songInfo.user_id,
              photo: this.songInfo.user_photo,
            },
          ],
          song_name: this.songInfo.name,
          song_url: this.songInfo.url,
          isUser: true,
        })
        this.$bus.$emit('play-first-song')
      }
      this.updatePlayNumber(ids)
    },
    shareThis() {
      this.showShareBox = true
    },
    copyPath() {
      this.$refs.pathInput.select()
      document.execCommand('Copy')
      this.$toasted.show('复制成功!')
    },
    closeShareBox(e) {
      if (this.showShareBox && e.target !== this.$refs.shareBtn) {
        if (this.$refs.shareBox.contains) {
          this.showShareBox = this.$refs.shareBox.contains(e.target)
        }
      }
    },
  },
}
</script>

<style scoped>
.user-lrc-detail {
  width: 100%;
  min-height: 100vh;
  padding: 80px var(--default-padding);
  position: relative;
  display: flex;
}
.left {
  flex: 1;
  padding-right: var(--default-margin);
}
.right{
  width: 250px;
  padding-top: calc(var(--default-margin) / 2);
}
.right .title{
  font-size: 1.5rem;
  color: #999;
}
.right ul{
  padding: calc(var(--default-margin) / 2) 0;
}
.right ul .similar-item{
  padding: 15px 10px;
  cursor: pointer;
}
.right ul .similar-item:hover{
  background-color: rgb(250,250,250);
  color: var(--active-color);
}
.song-name,
.time{
  padding: calc(var(--default-margin) / 2) 0;
}
.user-info{
  display: flex;
  align-items: center;
  font-size: 1rem;
}
.user-info .user-photo{
  width: 50px;
  height: 50px;
  margin-right: calc(var(--default-margin) / 2);
  border-radius: 100%;
  cursor: pointer;
}
.user-info .user-name{
  cursor: pointer;
}
.user-info .user-name:hover{
  color: var(--active-color);
}
.play,
.add,
.share {
  min-width: 100px;
  margin-right: 25px;
  padding: 5px 10px;
  border: none;
  background-color: var(--active-color);
  border-radius: var(--default-border-radius);
  outline: none;
  position: relative;
}
.play span,
.play i {
  color: #fff;
}
.add {
  background-color: #fff;
  border: 1px solid var(--active-color);
}
.share {
  border: 1px solid var(--active-color);
  background-color: unset;
}
.add span,
.add i,
.share span,
.share i {
  color: var(--active-color);
}
.share-box {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -120%);
  padding: 10px;
  font-size: 0.6rem;
  background-color: #fff;
  box-shadow: 0 0 10px #eee;
}
.share-box .content {
  display: flex;
  margin-top: 10px;
}

</style>