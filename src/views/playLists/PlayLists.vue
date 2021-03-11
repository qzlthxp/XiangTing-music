<template>
  <div class="play-lists">
    <play-lists-header :cate="cate" @getHot="getHotLists" @getCurrentLists="getCurrentLists"></play-lists-header>
    <main>
      <play-lists-over-view
          v-show="playLists.length && !this.$store.state.isLoading"
          :playListsInfos="playLists"
      >
      </play-lists-over-view>
      <loading v-show="this.$store.state.isLoading"></loading>
      <no-music v-show="!playLists.length && !this.$store.state.isLoading"></no-music>
    </main>
  </div>
</template>

<script>
import PlayListsHeader from "@/views/playLists/childComponents/PlayListsHeader";
import PlayListsOverView from "@/views/playLists/childComponents/PlayListsOverView";
import Loading from "@/components/common/loading/Loading";
import NoMusic from "@/components/content/noRes/NoMusic";
import {getCate, getHotPlayLists, getPlayLists} from "@/network/playLists";
import {quickSortPlayLists} from "@/common/utils";

export default {
  name: "PlayLists",
  data() {
    return {
      cate: [],
      playLists:[],
    }
  },
  components: {
    PlayListsHeader,
    PlayListsOverView,
    Loading,
    NoMusic
  },
  created() {
    this.getAllCate();
    this.getHotLists();
  },
  methods: {
    async getAllCate() {
      try {
        this.cate = await getCate();
      }catch (e) {
        return e;
      }
    },
    async getHotLists() {
      try {
        await this.$store.commit('showLoading');
        this.playLists = quickSortPlayLists(await getHotPlayLists());
        await this.$store.commit('hideLoading');
      }catch (e) {
        return e;
      }
    },
    async getCurrentPlayLists(id) {
      try {
        await this.$store.commit('showLoading');
        this.playLists = await getPlayLists(id);
        await this.$store.commit('hideLoading');
      }catch (e) {
        return e;
      }
    },
    getCurrentLists(id) {
      this.getCurrentPlayLists(id);
    }
  }
}
</script>

<style scoped>
  .play-lists{
    width: 100%;
    min-height: calc(100vh - 80px);
    padding: 80px var(--default-padding);
    position: relative;
  }
  main{
    position: relative;
    width: 100%;
  }
</style>