<template>
  <div class="play-lists">
    <play-lists-header
        v-if="cate.length"
        :cate="cate"
        @getHot="getHotLists"
        @getCurrentLists="getCurrentPlayLists"
    >
    </play-lists-header>
    <main>
      <play-lists-over-view
          v-if="playLists.length && !this.$store.state.isLoading"
          :playListsInfos="playLists"
      >
      </play-lists-over-view>
      <loading v-if="this.$store.state.isLoading"></loading>
      <no-music v-if="!playLists.length && !this.$store.state.isLoading"></no-music>
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
        this.cate = (await getCate()).data;
      }catch (e) {
        return e;
      }
    },
    async getHotLists() {
      try {
        await this.$store.commit('showLoading');
        this.playLists = quickSortPlayLists((await getHotPlayLists()).data);
        await this.$store.commit('hideLoading');
      }catch (e) {
        return e;
      }
    },
    async getCurrentPlayLists(id) {
      try {
        await this.$store.commit('showLoading');
        this.playLists = (await getPlayLists(id)).data;
        await this.$store.commit('hideLoading');
      }catch (e) {
        return e;
      }
    },
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