<template>
  <div class="play-lists-detail">
    <div v-if="playListsInfo.length" class="left">
      <!--歌单封面 Start-->
      <img class="play-lists-poster" :src="playListsInfo[0].play_lists_poster" alt="">
      <!--歌单封面 End-->

      <!--收藏 Start-->
      <button v-show="!isCollected" class="collect-play-lists" @click="addLikePlayLists">
        <span><i class="fa fa-heart-o fa-fw"></i></span>
        <span>收藏歌单</span>
      </button>
      <button v-show="isCollected" class="collect-play-lists collected" @click="removeLikePlayLists">
        <span><i class="fa fa-heart fa-fw"></i></span>
        <span>歌单以收藏</span>
      </button>
      <!--收藏 End-->

      <!--简介 Start-->
      <p><span style="font-weight: bold">简介：</span><span>{{playListsInfo[0].play_lists_introduce}}</span></p>
      <!--简介 End-->
    </div>

    <div v-if="playListsInfo.length" class="right">
      <p class="play-lists-title">{{playListsInfo[0].play_lists_title}}</p>
      <div class="user-info">
        <img class="user-photo" :src="playListsInfo[0].user_photo" alt="">
        <span class="user-name" @click="ToUser(playListsInfo[0].user_id)">{{playListsInfo[0].user_name}}</span>
      </div>
      <p class="publish-time"><span>发布日期：</span><span>{{issueDate}}</span></p>
      <song-info v-if="songsInfo.length" :song-infos="songsInfo"></song-info>
    </div>

  </div>
</template>

<script>
import SongInfo from "@/components/content/songInfo/SongInfo";
import {getSongsByPlayListsId} from "@/network/playListsDetail";
import {getPlayListsByPlayListsId} from "@/network/playListsDetail";
import {formatDate} from "@/common/utils";
import {getSongDesc} from "@/network/lrcDetail";

export default {
  name: "PlayListsDetail",
  data() {
    return {
      playListsInfo: [],
      songsInfo: [],
    }
  },
  computed: {
    isCollected() {
      return this.$store.state.user.playListsUserLike.length ? this.$store.state.user.playListsUserLike.some(value => `${value}` === this.$route.params.play_lists_id) : false;
    },
    issueDate() {
      return formatDate(this.playListsInfo[0].publishTime);
    }
  },
  components: {
    SongInfo
  },
  created() {
    this.getPlayListsInfo();
    this.getPlayListsSongs();
  },
  methods: {
    async getPlayListsInfo() {
      try {
        this.playListsInfo = await getPlayListsByPlayListsId(this.$route.params.play_lists_id);
      }catch (e) {
        return e;
      }
    },
    async getPlayListsSongs() {
      try {
        let res = await getSongsByPlayListsId(this.$route.params.play_lists_id);
        let songs = [];
        res.forEach( value => {
          songs.push(value.song_id);
        });
        this.songsInfo = (await getSongDesc(songs.join(','))).songs;
      }catch (e) {
        return e;
      }
    },
    addLikePlayLists() {
      if (!this.$store.state.user.userInfo.user_token) {
        this.$bus.$emit('show-notice', '登陆后可收藏歌单');
      }else {
        this.$store.dispatch('likePlayListsIsAdd', {
          'play_lists_id': this.$route.params.play_lists_id * 1,
          'this': this,
        });
      }
    },
    removeLikePlayLists() {
      this.$store.dispatch('likePlayListsIsDec', {
        'play_lists_id': this.$route.params.play_lists_id * 1,
        'this': this,
      });
    },
    ToUser(userId) {
      this.$router.push('/music_main/user/' + userId);
    }
  }
}
</script>

<style scoped>
  .play-lists-detail{
    width: 100%;
    height: auto;
    padding: 80px var(--default-padding);
    position: relative;
    display: flex;
  }
  .left{
    width: 250px;
    height: auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .left .play-lists-poster{
    width: 250px;
    height: 250px;
    border: 1px solid var(--default-border-color);
    object-fit: cover;
  }
  .left .collect-play-lists{
    width: 80%;
    height: 50px;
    margin: 20px 0;
    border: 1px solid var(--active-color);
    border-radius: 50px;
    background-color: #fff;
    outline: none;
  }
  .left .collect-play-lists.collected{
    background-color: var(--active-color);
  }
  .left .collect-play-lists span,
  .left .collect-play-lists i{
    font-size: 1.5rem;
    color: var(--active-color);
  }
  .left .collect-play-lists.collected span,
  .left .collect-play-lists.collected i{
    font-size: 1.5rem;
    color: #fff;
  }
  .right{
    width: calc(100% - 275px);
    margin-left: 25px;
    height: auto;
    overflow: hidden;
  }
  .right .play-lists-title{
    font-size: 2rem;
    font-weight: bold;
  }
  .user-info{
    width: 100%;
    height: 50px;
    margin: 20px 0;
    font-size: 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .user-photo{
    width: 46px;
    height: 46px;
    border: 1px solid var(--default-border-color);
    margin-right: 20px;
    overflow: hidden;
  }
  .user-name:hover{
    color: var(--active-color);
    cursor: pointer;
  }
</style>