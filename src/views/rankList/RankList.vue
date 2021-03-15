<template>
  <div class="rank-list">
    <div class="left" v-if="list.length">
      <rank-list-left :list="list" @leftClick="leftClick"></rank-list-left>
    </div>
    <div class="right">
      <div class="content">
        <h1>{{title}}</h1>
        <song-info v-if="songs.length" :song-infos="songs"></song-info>
      </div>
      <loading v-if="isLoading"></loading>
    </div>
  </div>
</template>

<script>
import RankListLeft from "@/views/rankList/childComponents/RankListLeft";
import SongInfo from "@/components/content/songInfo/SongInfo";
import Loading  from "@/components/common/loading/Loading";
import {getTopList, getListDetail} from "@/network/rankList";

export default {
  name: "RankList",
  data() {
    return {
      list: [],
      songs: [],
      title: '',
      isLoading: false,
    }
  },
  components: {
    RankListLeft,
    SongInfo,
    Loading
  },
  created() {
    this.getRank();
  },
  methods: {
    async getRank() {
      try {
        this.list = (await getTopList()).list.slice(0,4);
      }catch (e) {
        return e;
      }
    },
    async getList(id) {
      try {
        this.isLoading = true;
        this.songs= (await getListDetail(id)).playlist.tracks;
        this.isLoading = false;
      }catch (e) {
        return e;
      }
    },
    leftClick(obj) {
      this.title = obj.title;
      this.getList(obj.id);
    }
  }
}
</script>

<style scoped>
  .rank-list{
    width: 100%;
    padding: 130px var(--default-padding);
    display: flex;
    position: relative;
  }
  .left{
    width: 250px;
  }
  .right{
    width: calc(100% - 250px);
    padding-left: 50px;
    position: relative;
  }

</style>