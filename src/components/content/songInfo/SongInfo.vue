<template>
  <div class="song-info" v-if="songs.length">
    <button class="play-all" @click="playAll">
      <span>
        <i class="fa fa-play"></i>
      </span>
      <span style="margin-left: 10px">播放全部</span>
    </button>

    <button class="add-all">
      <span>
        <i class="fa fa-plus"></i>
      </span>
      <span style="margin-left: 10px">加入歌单</span>
    </button>

    <ul>
      <li class="header">
        <span class="rank-num">序号</span>
        <span class="song-name">歌曲</span>
        <span class="ep-name">专辑</span>
        <span class="song-duration">时长</span>
      </li>
      <li v-for="(item,index) in songs"
          :key="index"
          @mouseover="changeCurrentIndex(index)"
          @mouseleave="initCurrentIndex"
      >
        <span class="rank-num">
          {{index + 1}}
          <img :src="item.al.picUrl" alt="专辑封面">
        </span>
        <span class="song-name" :title="item.song_name">
          <a @mouseover="elTransform($event)"
             @mouseleave="elRemoveTransform($event)"
             href="javascript:;"
          >
            {{item.song_name}}
          </a>
        </span>
        <span class="ep-name" :title="item.al.name">
          <a @mouseover="elTransform($event)"
             @mouseleave="elRemoveTransform($event)"
             href="javascript:;"
             @click="toEpDetail(item.al.id)"
          >
            {{item.al.name}}
          </a>
        </span>
<!--        <span class="song-duration">{{item.song_duration}}</span>-->
        <div class="select" v-show="currentIndex === index">
          <span title="播放" @click="playThisSong(index)">
            <i class="fa fa-play fa-fw"></i>
          </span>
          <span>
            <i title="喜欢" v-show="!isLiked(index)" class="fa fa-heart-o fa-fw" @click="addLikeSong(index)"></i>
            <i title="取消喜欢" v-show="isLiked(index)" class="fa fa-heart activeLike fa-fw" @click="removeLikeSong(index)"></i>
          </span>
          <span title="加入歌单"><i class="fa fa-plus fa-fw"></i></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "SongInfo",
  data() {
    return {
      currentIndex: null,
    }
  },
  props: {
    songInfos: Array,
    default() {
      return [];
    }
  },
  computed: {
    isLiked() {
      return index => {
        return this.$store.state.user.songUserLike.some(value => value === this.songInfos[index].id);
      }
    },
    songs() {
      if (!this.songInfos.length) {
        return [];
      }else {
        const arr = [];
        for (let value of this.songInfos) {
          arr.push({
            id: value.id,
            singer_info: value.ar,
            song_name: value.name,
            song_url: `https://music.163.com/song/media/outer/url?id=${value.id}.mp3`,
            al: value.al,
            type: value.type,
          });
        }
        return arr;
      }
    }
  },
  methods: {
    //鼠标移出隐藏选项栏
    initCurrentIndex() {
      this.currentIndex = null;
    },
    //鼠标悬停展示选项栏
    changeCurrentIndex(index) {
      this.currentIndex = index;
    },
    //点击播放单首音乐
    playThisSong(index) {
      let num = null;
      this.$store.state.song.songList.forEach( (value, key) => {
        if (value.id === this.songs[index].id) {
          num = key;
        }
      });
      if (num) {
        this.$bus.$emit('play-this-song', num);
      }else {
        this.$store.commit('addSongListByUnShift', this.songs[index]);
        this.$bus.$emit('play-first-song');
      }
    },
    //播放全部音乐
    playAll() {
      this.$store.commit('addSongListAllSong',this.songs);
      this.$bus.$emit('play-first-song');
    },
    addLikeSong(index) {
      if (!this.$store.state.user.userInfo.user_token) {
        this.$bus.$emit('show-notice', '登录后可添加喜欢的歌曲');
      }else {
        this.$store.dispatch('likeSongIsAdd', {
          'song_id': this.songInfos[index].id,
          'this': this,
        });
      }
    },
    removeLikeSong(index) {
      this.$store.dispatch('likeSongIsDec', {
        'song_id': this.songInfos[index].id,
        'this': this,
      });
    },
    toEpDetail(epId) {
      this.$router.push('/music_main/ep_detail/' + epId);
    },
    elTransform($event) {
      let childWidth = $event.target.offsetWidth;
      let parentWidth = $event.target.parentElement.offsetWidth;
      if (childWidth > parentWidth) {
        let x = `-${childWidth - parentWidth + 20}px`;
        $event.target.style.setProperty('--x',x);
        $event.target.style.animationDuration = `${(childWidth - parentWidth) / 100 * 4}s`;
        $event.target.classList.add('activeTran');
      }
    },
    elRemoveTransform($event) {
      $event.target.classList.remove('activeTran');
    }
  }
}
</script>

<style scoped>
  .song-info{
    width: 100%;
    height: auto;
    position: relative;
  }
  .play-all,
  .add-all{
    min-width: 100px;
    margin: 25px 25px 25px 0;
    padding: 5px 10px;
    border: none;
    background-color: var(--active-color);
    border-radius: var(--default-border-radius);
    outline: none;
  }
  .play-all span,
  .play-all i{
    color: #fff;
  }
  .add-all{
    background-color: #fff;
    border: 1px solid var(--active-color);
  }
  .add-all span,
  .add-all i{
    color: var(--active-color);
  }
  .song-info ul{
    display: flex;
    flex-direction: column;
  }
  ul li{
    width: 100%;
    height: 70px;
    padding: 5px 0;
    background-color: #fff;
    font-size: 1rem;
    display: flex;
    position: relative;
  }
  ul li:nth-child(odd){
    background-color: rgb(250,250,250);
  }
  ul li:hover{
    background-color: #eee;
  }
  ul li.header{
    font-weight: bold;
  }
  ul li.header:hover{
    background-color: rgb(250,250,250);
  }
  .rank-num{
    width: 20%;
    height: 100%;
    padding: 0 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .rank-num img{
    width: 54px;
    height: 54px;
    margin-right: 21px;
    object-fit: cover;
  }
  .song-name,
  .ep-name,
  .song-duration{
    width: 32.5%;
    height: 100%;
    padding: 0 10px;
    text-align: left;
    line-height: 60px;
    overflow: hidden;
    white-space: nowrap;
  }
  .song-name a,
  .ep-name a{
    display: inline-block;
    --x: 0;
  }
  .activeTran{
    animation-name: tranX;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  .song-duration{
    width: 15%;
  }
  .select{
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
  .fa-heart.activeLike{
    color: #f73859;
  }

  @keyframes tranX {
    100%{
      transform: translateX(var(--x));
    }
  }
</style>