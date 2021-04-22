<template>
  <div class="music-player">
    <div class="left">
      <!--封面 Start-->
      <div class="poster" @click="toLrcDetail">
        <img ref="domPoster" :src="defaultPoster" />
      </div>
      <!--封面 End-->

      <!--歌曲信息、播放进度 Start-->
      <div class="content">
        <p class="song--singer-info">
          <span :title="songName" class="song-name">{{ songName }}</span>
          <span>&nbsp;-&nbsp;</span>
          <span
            class="singer-name"
            v-for="(item, index) in singerInfo"
            :key="index"
            @click="goSingerDetail(index)"
          >
            {{ item.name }}
          </span>
        </p>
        <div class="progress" ref="domProgress">
          <div
            class="click-space"
            @mouseup="getProgress($event)"
            @mousemove="getProgressTip($event)"
            @mouseleave="removeProgressTip"
          />
          <div class="fill" ref="domFill"></div>
          <div
            class="progress-btn"
            ref="domProgressBtn"
            @mousedown="ProgressDrag($event)"
          ></div>
          <div v-show="progressTipIsShow" class="progress-tip" ref="domProTip">
            {{ progressTip | formatTime }}
          </div>
        </div>
        <div class="time">
          <span class="current">{{ currentTime | formatTime }}</span>
          <span>/</span>
          <span class="total">{{ totalTime | formatTime }}</span>
        </div>
      </div>
      <!--歌曲信息、播放进度 End-->
    </div>

    <!--播放按钮 Start-->
    <div class="center">
      <span>
        <i
          title="前一首"
          class="fa fa-chevron-circle-left fa-2x fa-fw"
          @click="frontMusic"
        ></i>
      </span>
      <span @click="playMusic">
        <i
          title="播放"
          v-show="!isPlayed && !songLoadisShow"
          class="fa fa-play-circle fa-4x fa-fw"
        ></i>
        <i
          title="暂停"
          v-show="isPlayed && !songLoadisShow"
          class="fa fa-stop-circle fa-4x fa-fw"
          style="color: var(--active-color)"
        ></i>
        <i
          title="歌曲正在加载请稍后"
          v-show="songLoadisShow"
          style="user-select: none;color: var(--active-color);cursor: default"
          class="fa fa-spinner fa-pulse fa-4x fa-fw"
        ></i>
      </span>
      <span>
        <i
          title="后一首"
          class="fa fa-chevron-circle-right fa-2x fa-fw"
          @click="nextMusic"
        ></i>
      </span>
    </div>
    <!--播放按钮 End-->

    <div class="right">
      <!--喜欢 Start-->
      <div class="like">
        <i
          title="喜欢"
          v-show="!isLiked"
          class="fa fa-heart-o fa-lg fa-fw"
          @click="addLikeSong('right', currentIndex)"
        ></i>
        <i
          title="取消喜欢"
          v-show="isLiked"
          class="fa fa-heart fa-lg activeLike fa-fw"
          @click="removeLikeSong('right', currentIndex)"
        ></i>
      </div>
      <!--喜欢 End-->

      <!--      <div class="download">-->
      <!--        <i title="下载" class="fa fa-download fa-lg fa-fw" @click="downLoadMusic"></i>-->
      <!--      </div>-->

      <!--选择播放模式 Start-->
      <div class="mode">
        <span
          v-for="(item, index) in modes"
          :key="index"
          v-show="index === currentMode"
          @click="changeMode()"
        >
          <i :title="item.title" :class="item.class"></i>
        </span>
      </div>
      <!--选择播放模式 End-->

      <!--播放列表 Start-->
      <div class="list">
        <!--播放列表按钮 Start-->
        <div>
          <i
            title="播放列表"
            class="fa fa-bars fa-lg fa-fw"
            @click="showSongList"
          ></i>
          <div v-show="totalSongList" class="songListNum">
            {{ totalSongList }}
          </div>
        </div>
        <!--播放列表按钮 End-->
        <!--播放列表详情 Start-->
        <div class="song-list" v-show="songListIsShow" ref="SongList">
          <header>
            <p class="song-list-total">
              播放列表<span>(共{{ totalSongList }}首)</span>
            </p>
            <p class="clear-song-list" @click="clearSongList">清空列表</p>
            <span @click="CloseSongList"
              ><i class="fa fa-close fa-lg fa-fw"></i
            ></span>
          </header>
          <!--列表中音乐信息 没有显示发现 Start-->
          <div class="song-list-content">
            <!--列表中没有音乐 Start-->
            <div v-show="!totalSongList" class="no-song-list">
              <p>您还没有添加任何音乐</p>
              <p>去<a href="javascript:;" @click="goHome()">首页发现</a></p>
            </div>
            <!--列表中没有音乐 End-->
            <!--列表中有音乐 Start-->
            <div v-show="totalSongList" class="has-song-list" ref="hasSongList">
              <div
                class="has-song-list-div"
                v-for="(item, index) in this.$store.state.song.songList"
                :key="index"
              >
                <div
                  class="song-info"
                  @mouseenter="showSelect(index)"
                  @mouseleave="hideSelect"
                >
                  <div class="order">
                    <div v-show="index !== currentIndex">{{ index + 1 }}</div>
                    <div
                      v-show="index === currentIndex"
                      class="playingAnimation"
                    >
                      <span
                        :class="{
                          playingAnimationActive: isPlayed && !songLoadisShow,
                        }"
                      ></span>
                      <span
                        :class="{
                          playingAnimationActive: isPlayed && !songLoadisShow,
                        }"
                      ></span>
                      <span
                        :class="{
                          playingAnimationActive: isPlayed && !songLoadisShow,
                        }"
                      ></span>
                    </div>
                  </div>
                  <div class="song-name">
                    <a
                      href="javascript:;"
                      @mouseenter="elTransform($event)"
                      @mouseleave="elTransformBack($event)"
                      @click.prevent="playSongOfList(index)"
                    >
                      {{ item['song_name'] }}
                    </a>
                  </div>
                  <div class="song-singer">
                    <a
                      href="javascript:;"
                      v-for="(val, key) in item.singer_info"
                      :key="key"
                      @mouseenter="elTransform($event)"
                      @mouseleave="elTransformBack($event)"
                      @click="goSingerDetail(key)"
                    >
                      {{ val.name }}
                    </a>
                  </div>
                  <!-- <div class="song-duration" @mouseenter="showSelect(index)">
                    {{ item.duration | getDuration }}
                  </div> -->
                  <div v-show="index === currentSelectIndex" class="select">
                    <span
                      ><i
                        title="加入歌单"
                        class="fa fa-plus fa-lg fa-fw"
                        @click="addThis(index)"
                      ></i
                    ></span>
                    <span>
                      <i
                        title="喜欢"
                        v-show="!listLike(index)"
                        class="fa fa-heart-o fa-lg fa-fw"
                        @click="addLikeSong('list', index)"
                      ></i>
                      <i
                        title="取消喜欢"
                        v-show="listLike(index)"
                        class="fa fa-heart activeLike fa-lg fa-fw"
                        @click="removeLikeSong('list', index)"
                      ></i>
                    </span>
                    <span title="从列表中删除" @click="removeSong(index)"
                      ><i class="fa fa-trash-o fa-lg fa-fw"></i
                    ></span>
                  </div>
                </div>
              </div>
            </div>
            <!--列表有音乐 End-->
          </div>
          <!--列表中音乐信息 没有显示发现 End-->
        </div>
        <!--播放详情 End-->
      </div>
      <!--播放列表 End-->

      <!--音量调节 Start-->
      <div class="volume">
        <span @click="quickChangeVolume" style="min-width: 20px;">
          <i v-show="volumeSize === 0" class="fa fa-volume-off fa-lg fa-fw"></i>
          <i
            v-show="volumeSize > 0 && volumeSize < 0.5"
            class="fa fa-volume-down fa-lg fa-fw"
          ></i>
          <i v-show="volumeSize >= 0.5" class="fa fa-volume-up fa-lg fa-fw"></i>
        </span>
        <div class="volume-progress" ref="domVolumeProgress">
          <div
            class="volume-progress-click"
            ref="domVolumeProgressClickSpace"
            @click="getVolumeProgress($event)"
            @mouseleave="removeVolumeTip"
            @mousemove="getVolumeTip($event)"
          ></div>
          <div class="volume-progress-fill" ref="domVolumeFill"></div>
          <div
            class="volume-btn"
            ref="domVolumeBtn"
            @mousedown="VolumeProgressDrag($event)"
            @mouseleave="removeVolumeTip"
          ></div>
          <div
            v-show="volumeTipIsShow"
            class="volume-progress-tip"
            ref="domVolTip"
          >
            {{ volumeTip | getVolume }}
          </div>
        </div>
      </div>
      <!--音量调节 End-->
    </div>

    <!--锁定播放器位置 Start-->
    <div class="lock" @click="changeLock">
      <i
        v-show="isLocked"
        class="fa fa-lock fa-fw"
        style="font-size: 1.6rem"
      ></i>
      <i
        v-show="!isLocked"
        class="fa fa-unlock fa-fw"
        style="font-size: 1.6rem"
      ></i>
    </div>
    <!--锁定播放器位置 End-->

    <audio
      style="display:none"
      id="audio1"
      ref="domAudio"
      @timeupdate="getCurrentTime($event)"
      @ended="songEnded"
    ></audio>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatTime } from '@/common/utils'
export default {
  name: 'MusicPlayer',
  data() {
    return {
      defaultPoster: require('../../../assets/image/public/logo.png'),
      isPlayed: false,
      isLocked: false,
      songListIsShow: false,
      progressTipIsShow: false,
      volumeTipIsShow: false,
      mouseUpChangeCurrentTime: false,
      songLoadisShow: false,
      showUnlockPlayer: false,
      isUser: false,
      currentMode: 0,
      totalTime: 0,
      currentTime: 0,
      progressTip: 0,
      volumeSize: 0,
      volumeSizeHistory: 0,
      volumeTip: 0,
      currentIndex: null,
      currentSelectIndex: null,
      fit: 'cover',
      songName: '歌曲',
      singerInfo: [{ name: '歌手', id: null }],
      modes: [
        { title: '循环播放', class: 'fa fa-repeat fa-lg fa-fw' },
        { title: '单曲循环', class: 'fa fa-retweet fa-lg fa-fw' },
        { title: '顺序播放', class: 'fa fa-sort-amount-asc fa-lg fa-fw' },
        { title: '随机播放', class: 'fa fa-random fa-lg fa-fw' },
      ],
      suffix: ['wav', 'mp3', 'ogg', 'acc', 'webm', 'm4a'],
    }
  },
  computed: {
    ...mapGetters(['totalSongList']),
    domMusicPlayer() {
      return document.querySelector('.music-player')
    },
    domSongListDiv() {
      return document.querySelector(
        `.has-song-list-div:nth-child(${this.currentIndex + 1})`
      )
    },
    isLiked() {
      return this.currentIndex !== null
        ? this.$store.state.user.songUserLike.some(
            (value) =>
              value === this.$store.state.song.songList[this.currentIndex].id
          )
        : false
    },
    listLike() {
      return (index) => {
        return this.$store.state.user.songUserLike.some(
          (value) => value === this.$store.state.song.songList[index].id
        )
      }
    },
  },
  filters: {
    formatTime,
    getVolume(size) {
      return Math.round(size * 100) + '%'
    },
    getDuration(dur) {
      return dur || ''
    },
  },
  mounted() {
    window.addEventListener('mousemove', this.showMusicPlayer)
    this.initAudio()
    /*
    拖动打开，打开状态鼠标抬起可以按照拖动进度播放
    不会在拖动过程中影响音乐播放
    */
    document.onmouseup = () => {
      document.onmousemove = null
      if (this.mouseUpChangeCurrentTime) {
        this.$refs.domAudio.currentTime = this.currentTime
        this.mouseUpChangeCurrentTime = false
      }
    }
    this.$bus.$on('play-first-song', () => {
      if (!this.isLocked && !this.songListIsShow) {
        this.showUnlockPlayer = true
        this.domMusicPlayer.style.transform = 'translateY(0)'
        setTimeout(() => {
          this.showUnlockPlayer = false
        }, 1500)
      }
      /*
      获取更新后的dom 后播放
      保证可以获取正确dom
      因为playSongOfList 改变了dom的背景所以需要这样写
      如果playSongOfList没有dom操作那么直接this.playSongOfList(0);
      也不会报错
       */
      this.$nextTick(() => {
        this.playSongOfList(0)
      })
    })
    this.$bus.$on('play-this-song', (index) => {
      if (!this.isLocked && !this.songListIsShow) {
        this.showUnlockPlayer = true
        this.domMusicPlayer.style.transform = 'translateY(0)'
        setTimeout(() => {
          this.showUnlockPlayer = false
        }, 1500)
      }
      this.$nextTick(() => {
        this.playSongOfList(index)
      })
    })
    this.$bus.$on('changeCurrTimeByLrc', (time) => {
      this.currentTime = time
      this.$refs.domAudio.currentTime = time
      this.changeProgress()
    })
  },
  methods: {
    //播放器初始化
    initAudio() {
      this.$refs.domAudio.volume = this.volumeSize
      this.$refs.domAudio.addEventListener('canplay', () => {
        this.totalTime = this.$refs.domAudio.duration
        this.songLoadisShow = false
      })
    },
    //点击封面跳转到歌词页面
    toLrcDetail() {
      if (this.currentIndex !== null && !this.isUser) {
        let song_id = this.$store.state.song.songList[this.currentIndex].id
        this.$router.push('/music_main/lrc_detail/' + song_id)
      }
    },
    //点击喜欢添加歌曲
    addLikeSong(type, index) {
      if (!this.$store.state.user.userInfo.user_token) {
        this.$bus.$emit('show-notice', '登录后可添加喜欢的歌曲')
      } else {
        switch (type) {
          case 'right':
            if (this.currentIndex !== null) {
              this.$store.dispatch('likeSongIsAdd', {
                song_id: this.$store.state.song.songList[index].id,
                this: this,
              })
            }
            break
          case 'list':
            this.$store.dispatch('likeSongIsAdd', {
              song_id: this.$store.state.song.songList[index].id,
              this: this,
            })
            break
          default:
            break
        }
      }
    },
    //移除喜欢
    removeLikeSong(type, index) {
      switch (type) {
        case 'right':
          if (this.currentIndex !== null) {
            this.$store.dispatch('likeSongIsDec', {
              song_id: this.$store.state.song.songList[index].id,
              this: this,
            })
          }
          break
        case 'list':
          this.$store.dispatch('likeSongIsDec', {
            song_id: this.$store.state.song.songList[index].id,
            this: this,
          })
          break
        default:
          break
      }
    },
    //点击歌曲列表歌曲添加到歌单
    addThis(index) {
      if (this.totalSongList && this.$store.state.user.userInfo.user_token) {
        let songs = []
        songs.push(this.$store.state.song.songList[index].id)
        this.$bus.$emit('openSelectPlayLists', songs)
      } else {
        this.$bus.$emit('show-notice', '登录后可添加到歌单')
      }
    },
    //歌单没有歌曲点击跳转到首页推荐
    goHome() {
      this.$router.push('/music_main/home')
      this.songListIsShow = false
    },
    //显示播放器
    showMusicPlayer(e) {
      //没有上锁并且没有打开播放列表时才隐藏
      if (!this.isLocked && !this.songListIsShow && !this.showUnlockPlayer) {
        if (e.clientY + 80 > document.documentElement.clientHeight) {
          this.domMusicPlayer.style.transform = 'translateY(0)'
        } else {
          this.domMusicPlayer.style.transform = 'translateY(65px)'
        }
      } else {
        this.domMusicPlayer.style.transform = 'translateY(0)'
      }
    },
    //切换播放模式
    changeMode() {
      this.currentMode++
      if (this.currentMode === this.modes.length) {
        this.currentMode = 0
      }
    },
    //改变播放器是否被锁定位置
    changeLock() {
      this.isLocked = !this.isLocked
    },
    //显示选项栏
    showSelect(index) {
      this.currentSelectIndex = index
    },
    //隐藏选项栏
    hideSelect() {
      this.currentSelectIndex = null
    },
    //打开播放列表
    showSongList() {
      if (!this.songListIsShow) {
        this.songListIsShow = true
      }
    },
    //关闭播放列表
    CloseSongList() {
      this.songListIsShow = false
    },
    //显示播放列表歌曲隐藏信息
    elTransform($event) {
      let width = $event.target.offsetWidth
      let parentWidth = $event.target.parentElement.offsetWidth
      if (width > parentWidth) {
        let transformX = `-${width - parentWidth + 5}px`
        $event.target.style.setProperty('--transfromX', transformX)
        $event.target.classList.add('transformActive')
      }
    },
    //隐藏播放列表歌曲隐藏信息
    elTransformBack($event) {
      $event.target.classList.remove('transformActive')
    },
    //跳转到歌手详情页
    goSingerDetail(index) {
      if (!this.singerInfo[index].id) {
        return false
      }
      let singerId = this.singerInfo[index].id
      if (!this.isUser) {
        this.$router.push(
          '/music_main/singer_detail/' + singerId + '/careful_chose'
        )
      } else {
        this.$router.push('/music_main/user/' + singerId)
      }
    },
    //清空播放列表
    clearSongList() {
      this.reset()
      this.currentIndex = null
      this.songLoadisShow = false
      if (this.totalSongList) {
        this.$store.commit('clearSongList')
      }
    },
    //从播放列表删除某首歌
    removeSong(index) {
      let songListDivs = document.querySelectorAll('.has-song-list-div')
      if (index < this.currentIndex) {
        this.$nextTick(() => {
          songListDivs.forEach((value) => {
            value.style.backgroundColor = '#fff'
          })
          this.currentIndex--
          this.domSongListDiv.style.backgroundColor = 'rgb(247,247,247)'
        })
      }
      if (index === this.currentIndex) {
        this.reset()
        this.currentIndex = null
      }
      setTimeout(() => {
        this.$store.commit('removeSongList', {
          index,
          n: 1,
        })
      }, 200)
    },
    //播放列表中的歌曲
    playSongOfList(index) {
      this.reset()
      this.currentIndex = index
      this.domSongListDiv.style.backgroundColor = 'rgb(247,247,247)'
      let songInfo = this.$store.state.song.songList[index]
      if (songInfo.isUser) {
        this.isUser = true
      } else {
        this.isUser = false
      }
      if (Object.keys(songInfo).length) {
        if (!songInfo.al || !Object.keys(songInfo.al).length) {
          this.$refs.domPoster.src = songInfo.singer_info[0].photo
        } else {
          this.$refs.domPoster.src = songInfo.al.picUrl
        }
        if ('mediaSession' in navigator) {
          // eslint-disable-next-line no-undef
          navigator.mediaSession.metadata = new MediaMetadata({
            title: songInfo.song_name,
            artwork: [{ src: this.$refs.domPoster.src }],
          })
        }
        this.$refs.domAudio.src = songInfo.song_url
        this.songName = songInfo.song_name
        this.singerInfo = songInfo.singer_info
        this.$refs.domAudio.load()
        this.songLoadisShow = true
        this.playMusic()
      }
    },
    //播放音乐
    playMusic() {
      if (this.totalSongList) {
        let existSrc = this.suffix.some(
          (value) => this.$refs.domAudio.src.indexOf(value) > -1
        )
        if (this.$refs.domAudio.paused && existSrc) {
          this.isPlayed = true
          setTimeout(() => {
            this.$refs.domAudio.play()
          }, 500)
        } else {
          this.isPlayed = false
          setTimeout(() => {
            this.$refs.domAudio.pause()
          }, 500)
        }
      }
    },
    //上一首音乐
    frontMusic() {
      if (this.totalSongList) {
        if (this.currentIndex === null) {
          this.currentIndex = 0
        } else {
          this.reset()
          this.currentIndex--
          if (this.currentIndex < 0) {
            this.currentIndex = this.totalSongList - 1
          }
        }
        this.playSongOfList(this.currentIndex)
      }
    },
    //下一首音乐
    nextMusic() {
      if (this.totalSongList) {
        if (this.currentIndex === null) {
          this.currentIndex = 0
        } else {
          this.reset()
          this.currentIndex++
          if (this.currentIndex === this.totalSongList) {
            this.currentIndex = 0
          }
        }
        this.playSongOfList(this.currentIndex)
      }
    },
    //实时获取已经播放时长
    getCurrentTime(e) {
      this.currentTime = e.target.currentTime
      this.changeProgress()
      if (this.$store.state.song.currentTime !== this.currentTime) {
        this.$store.commit('checkCurrentTime', {
          currentTime: Math.floor(this.currentTime),
        })
      }
    },
    //点击调整播放进度
    getProgress($event) {
      this.currentTime =
        ($event.offsetX / $event.target.clientWidth) * this.totalTime
      this.$refs.domAudio.currentTime = this.currentTime
      this.changeProgress()
    },
    //拖动调整进度
    ProgressDrag($event) {
      let firstX = $event.clientX
      let left = this.$refs.domProgressBtn.offsetLeft
      document.onmousemove = ($event) => {
        this.mouseUpChangeCurrentTime = true
        let X = $event.clientX - firstX + left
        if (X < 0) {
          X = 0
        } else if (X > this.$refs.domProgress.clientWidth) {
          X = this.$refs.domProgress.clientWidth
        }
        this.$refs.domProgressBtn.style.left = X + 'px'
        this.$refs.domFill.style.width = X + 'px'
        this.currentTime =
          (this.$refs.domFill.clientWidth /
            this.$refs.domProgress.clientWidth) *
          this.totalTime
      }
    },
    //快速调节音量
    quickChangeVolume() {
      if (!this.volumeSize) {
        this.volumeSize = this.volumeSizeHistory
        this.$refs.domVolumeFill.style.width =
          this.volumeSizeHistory * 100 + '%'
        this.$refs.domVolumeBtn.style.left = this.volumeSizeHistory * 100 + '%'
      } else {
        this.volumeSize = 0
        this.$refs.domVolumeFill.style.width = '0'
        this.$refs.domVolumeBtn.style.left = '0'
      }
      this.$refs.domAudio.volume = this.volumeSize
    },
    //点击调整音量进度
    getVolumeProgress($event) {
      this.$refs.domVolumeFill.style.width =
        ($event.offsetX / $event.target.clientWidth) * 100 + '%'
      this.volumeSize = ($event.offsetX / $event.target.clientWidth).toFixed(1)
      this.$refs.domVolumeBtn.style.left =
        ($event.offsetX / $event.target.clientWidth) * 100 + '%'
      this.volumeSizeHistory = this.volumeSize
      this.$refs.domAudio.volume = this.volumeSize
    },
    //拖动调整音量进度
    VolumeProgressDrag($event) {
      let firstX = $event.clientX
      let left = $event.target.offsetLeft
      let domVolumeProgressWidth = this.$refs.domVolumeProgress.clientWidth
      document.onmousemove = ($event) => {
        this.volumeTipIsShow = true
        let X = $event.clientX - firstX + left
        if (X < 0) {
          X = 0
        } else if (X > domVolumeProgressWidth) {
          X = domVolumeProgressWidth
        }
        this.$refs.domVolumeBtn.style.left = X + 'px'
        this.$refs.domVolumeFill.style.width = X + 'px'
        this.volumeSize =
          this.$refs.domVolumeFill.clientWidth / domVolumeProgressWidth
        this.volumeSizeHistory = this.volumeSize
        this.volumeTip =
          this.$refs.domVolumeFill.clientWidth / domVolumeProgressWidth
        this.$refs.domVolTip.style.left =
          (this.$refs.domVolumeFill.clientWidth / domVolumeProgressWidth) *
            100 +
          '%'
        this.$refs.domAudio.volume = this.volumeSize
      }
    },
    //获取音量进度提示
    getVolumeTip($event) {
      this.volumeTipIsShow = true
      this.volumeTip = $event.offsetX / $event.target.clientWidth
      this.$refs.domVolTip.style.left =
        ($event.offsetX / $event.target.clientWidth) * 100 + '%'
    },
    //获取进度提示
    getProgressTip($event) {
      if (this.totalTime > 0) {
        this.progressTipIsShow = true
        this.progressTip =
          ($event.offsetX / $event.target.clientWidth) * this.totalTime
        this.$refs.domProTip.style.left =
          ($event.offsetX / $event.target.clientWidth) * 100 + '%'
        this.$refs.domProTip.style.transform = 'translateX(-50%)'
      }
    },
    //移除进度提示
    removeProgressTip() {
      this.progressTipIsShow = false
    },
    //移除音量进度提示
    removeVolumeTip() {
      this.volumeTipIsShow = false
    },
    //歌曲播放完毕
    songEnded() {
      this.reset()
      switch (this.currentMode) {
        //循环
        case 0:
          this.currentIndex++
          if (this.currentIndex === this.totalSongList) {
            this.currentIndex = 0
          }
          break
        //单曲
        case 1:
          break
        //顺序
        case 2:
          this.currentIndex++
          if (this.currentIndex === this.totalSongList) {
            this.currentIndex = null
          }
          break
        //随机
        case 3:
          this.currentIndex = Math.floor(Math.random() * this.totalSongList)
          break
      }
      this.playSongOfList(this.currentIndex)
    },
    //改变进度条
    changeProgress() {
      this.$refs.domFill.style.width =
        (this.currentTime / this.totalTime) * 100 + '%'
      this.$refs.domProgressBtn.style.left =
        this.$refs.domFill.offsetWidth + 'px'
    },
    //重置数据
    reset() {
      let songListDivs = document.querySelectorAll('.has-song-list-div')
      if (songListDivs.length) {
        songListDivs.forEach((value) => {
          value.style.backgroundColor = '#fff'
        })
      }
      this.$refs.domPoster.src = this.defaultPoster
      this.$refs.domAudio.src = ''
      this.songName = '歌曲'
      this.singerInfo = [{ name: '歌手', id: null }]
      this.isPlayed = false
      this.totalTime = 0
      this.currentTime = 0
      this.$refs.domFill.style.width = '0'
      this.$refs.domProgressBtn.style.left = '0'
    },
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.showMusicPlayer)
    this.$refs.domAudio.removeEventListener('canplay', () => {
      this.totalTime = this.$refs.domAudio.duration
      this.songLoadisShow = false
    })
  },
}
</script>

<style scoped>
i {
  color: rgb(102, 102, 102);
}
.music-player {
  height: 65px;
  width: 100%;
  min-width: 1440px;
  padding: 0 var(--default-padding);
  background-color: #fff;
  box-shadow: 0 -1px 10px var(--default-border-color);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  transform: translateY(65px);
  transition: 0.6s cubic-bezier(0, 0.55, 0.45, 1);
}
.left,
.right {
  flex: 1;
  position: relative;
}
.left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.right > div:nth-child(odd) {
  margin: 0 var(--default-margin);
}
.center {
  width: 150px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.poster {
  width: 67px;
  height: 65px;
  border-left: 1px solid #eeeeee;
  border-right: 1px solid #eeeeee;
  position: relative;
  cursor: pointer;
}
.poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.content {
  width: 350px;
  height: 100%;
  padding: 0 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.content .song--singer-info {
  width: 100%;
  height: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.content .song--singer-info .singer-name {
  color: #999;
  cursor: pointer;
}
.content .song--singer-info .singer-name:hover {
  color: var(--active-color);
}
.progress {
  width: 100%;
  height: 4px;
  background-color: #eee;
  cursor: pointer;
  position: relative;
}
.click-space {
  background-color: transparent;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
}
.fill {
  width: 0;
  height: 100%;
  background-color: var(--active-progress);
  position: relative;
}
.time {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.progress-btn,
.volume-btn {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -4px);
  width: 12px;
  height: 12px;
  background-color: var(--active-progress);
  border: 4px solid #fff;
  box-shadow: 0 0 0 1px var(--default-border-color);
  border-radius: 50%;
  cursor: pointer;
  z-index: 9;
}
.progress-tip {
  position: absolute;
  top: -20px;
  width: auto;
  height: 15px;
  background-color: #fff;
  padding: 0 3px;
  border-radius: 3px;
  line-height: 15px;
  text-align: center;
  z-index: 9;
}
.activeLike {
  color: #f73859;
}
.list {
  position: relative;
}
.songListNum {
  user-select: none;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1rem;
  transform: translate(50%, -50%);
}
.song-list {
  position: absolute;
  top: -40px;
  right: -25px;
  transform: translateY(-100%);
  width: 580px;
  height: auto;
  background-color: #ffffff;
  border-radius: var(--default-border-radius);
  box-shadow: 0 0 10px var(--default-border-color);
  z-index: 10;
  overflow: hidden;
}
.song-list header {
  width: 100%;
  height: auto;
  padding: 20px 20px 10px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}
.song-list-total {
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: auto;
}
.song-list-total > span {
  font-size: 1rem;
  font-weight: lighter;
}
.clear-song-list {
  margin-right: 20px;
  font-size: 1rem;
  cursor: pointer;
}
.clear-song-list:hover {
  color: var(--active-color);
}
.song-list-content {
  width: 100%;
  height: auto;
  overflow: auto;
  position: relative;
}
.no-song-list {
  width: 100%;
  height: 400px;
  color: var(--default-i-color);
  font-size: 1.5rem;
  display: flex;
  flex-flow: nowrap column;
  justify-content: center;
  align-items: center;
}
.no-song-list a {
  color: var(--active-color);
  text-decoration: underline;
}
.has-song-list {
  width: 100%;
  max-height: 400px;
  overflow: auto;
}
.has-song-list-div {
  width: 100%;
  height: 50px;
  display: flex;
}
.song-info {
  width: 100%;
  height: 100%;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  position: relative;
}
.song-info:hover {
  background-color: rgb(247, 247, 247);
}
.order {
  width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.playingAnimation {
  width: 20px;
  height: 15px;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
}
.playingAnimation span {
  display: inline-block;
  width: 3px;
  background-color: var(--active-color);
}
.playingAnimation span:first-child {
  height: 20%;
}
.playingAnimation span:nth-child(2) {
  height: 40%;
  animation-delay: 0.2s;
}
.playingAnimation span:last-child {
  height: 60%;
  animation-delay: 0.3s;
}
.playingAnimationActive {
  animation: playingSpan 0.5s linear infinite alternate;
}
.song-name {
  width: calc((100% - 20px) * 0.4);
  margin-left: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.song-singer {
  width: calc((100% - 20px) * 0.4);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
/* .song-duration {
  width: calc((100% - 20px) * 0.2);
  height: 100%;
  text-align: right;
  font-weight: bold;
} */
.select {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: auto;
  padding: 0 0 0 5px;
  background-color: rgb(247, 247, 247);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.select span {
  margin: 0 3px;
}
.song-info a {
  display: inline-block;
  --transfromX: 0;
}
.transformActive {
  animation: tx 1.5s linear infinite alternate;
}
.volume {
  width: 110px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.volume-progress {
  width: 80px;
  height: 3px;
  background-color: #eee;
  position: relative;
}
.volume-progress-click {
  position: absolute;
  top: -2px;
  right: 0;
  bottom: -2px;
  left: 0;
  cursor: pointer;
  z-index: 9;
}
.volume-progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background-color: var(--active-progress);
}
.volume-progress-tip {
  position: absolute;
  top: -20px;
  width: auto;
  transform: translateX(-50%);
  height: 15px;
  padding: 0 3px;
  border-radius: 3px;
  line-height: 15px;
  text-align: center;
  z-index: 9;
}
.lock {
  width: 45px;
  height: 30px;
  padding: 5px;
  background-color: #fff;
  border-top-right-radius: 50px;
  border-top-left-radius: 50px;
  border: 1px solid var(--default-border-color);
  border-bottom: #fff;
  position: absolute;
  top: -29px;
  right: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
}

audio {
  display: none;
}
@keyframes tx {
  100% {
    transform: translateX(var(--transfromX));
  }
}
@keyframes playingSpan {
  100% {
    height: 100%;
  }
}
</style>
