<template>
  <div class="rank-list">
    <div class="left" v-if="list.length">
      <rank-list-left :list="list" @leftClick="leftClick"></rank-list-left>
    </div>
    <div class="right">
      <div class="content">
        <h1>{{ title }}</h1>
        <song-info
          v-if="songs.length && !showUserRank"
          :song-infos="songs"
        ></song-info>
        <user-rank v-show="showUserRank" :songs="songs"></user-rank>
      </div>
      <loading v-if="isLoading"></loading>
    </div>
  </div>
</template>

<script>
import RankListLeft from '@/views/rankList/childComponents/RankListLeft'
import SongInfo from '@/components/content/songInfo/SongInfo'
import UserRank from '@/components/content/userRank/UserRank'
import Loading from '@/components/common/loading/Loading'
import { getTopList, getListDetail, getUserRank } from '@/network/rankList'

export default {
  name: 'RankList',
  data() {
    return {
      list: [],
      songs: [],
      title: '',
      isLoading: false,
      showUserRank: false,
    }
  },
  components: {
    RankListLeft,
    SongInfo,
    Loading,
    UserRank,
  },
  created() {
    this.getRank()
  },
  methods: {
    async getRank() {
      try {
        this.list = (await getTopList()).list.slice(0, 4)
        this.list.push({
          id: 9999,
          coverImgUrl: require('../../assets/image/public/people.png'),
          name: '用户榜',
        })
      } catch (e) {
        return e
      }
    },
    async getUserRankList() {
      try {
        this.songs = await getUserRank()
      } catch (error) {
        return error
      }
    },
    async getList(id) {
      try {
        this.isLoading = true
        this.songs = (await getListDetail(id)).playlist.tracks
        this.isLoading = false
      } catch (e) {
        return e
      }
    },
    leftClick(obj) {
      this.title = obj.title
      if (obj.id !== 9999) {
        this.showUserRank = false
        this.getList(obj.id)
      } else {
        this.showUserRank = true
        this.getUserRankList()
      }
    },
  },
}
</script>

<style scoped>
.rank-list {
  width: 100%;
  padding: 130px var(--default-padding);
  display: flex;
  position: relative;
}
.left {
  width: 250px;
}
.right {
  width: calc(100% - 250px);
  padding-left: 50px;
  position: relative;
}
</style>
