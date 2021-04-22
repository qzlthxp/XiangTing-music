<template>
  <div class="user-rank">
    <button class="play-all" @click="playAll">
      <span>
        <i class="fa fa-play"></i>
      </span>
      <span style="margin-left: 10px">播放全部</span>
    </button>
    <ul>
      <li class="header">
        <span class="rank-num">序号</span>
        <span class="song-name">歌曲</span>
        <span class="play-number">播放量</span>
        <span class="publish-time">发布日期</span>
      </li>
      <li
        v-for="(item, index) in songs"
        :key="index"
        @mouseover="changeCurrentIndex(index)"
        @mouseleave="initCurrentIndex"
      >
        <span class="rank-num">
          {{ index + 1 }}
        </span>
        <span class="song-name" :title="item.song_info.name">
          <a
            @mouseover="elTransform($event)"
            @mouseleave="elRemoveTransform($event)"
            href="javascript:;"
          >
            {{ item.song_info.name }}
          </a>
        </span>
        <span class="play-number">
          {{ item.song_info.play_number }}
        </span>
        <span class="publish-time">
          {{ item.song_info.publishTime | formatDate }}
        </span>
        <div class="select" v-show="currentIndex === index">
          <span title="播放" @click="playThisSong(index)">
            <i class="fa fa-play fa-fw"></i>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { formatDate } from '@/common/utils'
import { addPlayNumber } from '@/network/song/index'
export default {
  name: 'UserRank',
  props: {
    songs: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      currentIndex: null,
    }
  },
  filters: {
    formatDate,
    formatPlayNumber(n) {
      if (n < 10000) {
        return n
      } else {
        return (n / 1000).toFixed(1)
      }
    },
  },
  methods: {
    async updatePlayNumber(ids) {
      try {
        await addPlayNumber(ids)
      } catch (error) {
        return error
      }
    },
    //鼠标移出隐藏选项栏
    initCurrentIndex() {
      this.currentIndex = null
    },
    //鼠标悬停展示选项栏
    changeCurrentIndex(index) {
      this.currentIndex = index
    },
    //点击播放单首音乐
    playThisSong(index) {
      let ids = []
      let num = null
      let thisSong = this.songs[index].song_info
      ids.push(thisSong.id)
      this.$store.state.song.songList.forEach((value, index) => {
        if (value.id === thisSong.id) {
          num = index
        }
      })
      if (num) {
        this.$bus.$emit('play-this-song', num)
      } else {
        this.$store.commit('addSongListByUnShift', {
          id: thisSong.id,
          singer_info: [
            {
              name: this.songs[index].user_info.user_name,
              id: this.songs[index].user_info.user_id,
              photo: this.songs[index].user_info.user_photo,
            },
          ],
          song_name: thisSong.name,
          song_url: thisSong.url,
          isUser: true,
        })
        this.$bus.$emit('play-first-song')
      }
      this.updatePlayNumber(ids)
    },
    //播放全部音乐
    playAll() {
      let arr = []
      let ids = []
      this.songs.forEach((value) => {
        ids.push(value.song_info.id)
        arr.push({
          id: value.song_info.id,
          singer_info: [
            {
              name: value.user_info.user_name,
              id: value.user_info.user_id,
              photo: value.user_info.user_photo,
            },
          ],
          song_name: value.song_info.name,
          song_url: value.song_info.url,
          isUser: true,
        })
      })
      this.$store.commit('addSongListAllSong', arr)
      this.$bus.$emit('play-first-song')
      this.updatePlayNumber(ids)
    },
    elTransform($event) {
      let childWidth = $event.target.offsetWidth
      let parentWidth = $event.target.parentElement.offsetWidth
      if (childWidth > parentWidth) {
        let x = `-${childWidth - parentWidth + 20}px`
        $event.target.style.setProperty('--x', x)
        $event.target.style.animationDuration = `${((childWidth - parentWidth) /
          100) *
          4}s`
        $event.target.classList.add('activeTran')
      }
    },
    elRemoveTransform($event) {
      $event.target.classList.remove('activeTran')
    },
  },
}
</script>

<style scoped>
.user-rank {
  width: 100%;
  height: auto;
  position: relative;
}
.play-all {
  min-width: 100px;
  margin: 25px 25px 25px 0;
  padding: 5px 10px;
  border: none;
  background-color: var(--active-color);
  border-radius: var(--default-border-radius);
  outline: none;
}
.play-all span,
.play-all i {
  color: #fff;
}
ul li {
  width: 100%;
  height: 70px;
  padding: 5px 0;
  background-color: #fff;
  font-size: 1rem;
  display: flex;
  align-items: center;
  position: relative;
}
ul li:nth-child(odd) {
  background-color: rgb(250, 250, 250);
}
ul li:hover {
  background-color: #eee;
}
ul li.header {
  font-weight: bold;
}
ul li.header:hover {
  background-color: rgb(250, 250, 250);
}
.rank-num {
  width: 17%;
  padding: 0 25px;
}
.song-name {
  width: 32%;
  height: 100%;
  padding: 0 10px;
  text-align: left;
  line-height: 60px;
  overflow: hidden;
  white-space: nowrap;
}
.song-name a {
  display: inline-block;
  --x: 0;
}
.activeTran {
  animation-name: tranX;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.play-number {
  width: 17%;
}
.publish-time {
  width: 17%;
}
.open {
  width: 17%;
  text-align: center;
}
.select {
  position: absolute;
  top: 0;
  right: 0;
  width: 15%;
  height: 100%;
  background-color: #eee;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.fa-heart.activeLike {
  color: #f73859;
}

@keyframes tranX {
  100% {
    transform: translateX(var(--x));
  }
}
</style>
