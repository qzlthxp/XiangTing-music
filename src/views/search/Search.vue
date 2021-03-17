<template>
  <div class="search">
    <search-header @getMore="getMore"></search-header>
    <main>
      <search-content
          v-if="Object.keys(searchRes).length"
          :search-res="searchRes"
          :type="type"
      >
      </search-content>
      <hot-search-list
          v-if="hots.length && !Object.keys(searchRes).length"
          :hots="hots"
      >
      </hot-search-list>
    </main>
  </div>
</template>

<script>
import SearchHeader from "@/views/search/childrenComponents/SearchHeader";
import SearchContent from "@/views/search/childrenComponents/SearchContent";
import HotSearchList from "@/views/search/childrenComponents/HotSearchList";
import {searchMore, searchHot} from "@/network/search";

export default {
  name: "Search",
  data() {
    return {
      type: 100,
      searchRes: {},
      hots: [],
      isLoading: false,
    }
  },
  watch: {
    $route(to) {
      if (to.query.searchWord) {
        this.getMore({
          keywords: to.query.searchWord,
          type: this.type,
        });
      }
    }
  },
  components: {
    SearchHeader,
    SearchContent,
    HotSearchList
  },
  created() {
    if (this.$route.query.searchWord) {
      this.getMore({
        keywords: this.$route.query.searchWord,
        type: 100,
      });
    }else {
      this.getHot();
    }
  },
  methods: {
    async getHot() {
      try {
        this.hots = (await searchHot()).result.hots;
      }catch (e) {
        return e;
      }
    },
    async getMore(obj) {
      try {
        this.type = obj.type;
        this.searchRes = (await searchMore(obj)).result;
      }catch (e) {
        return e;
      }
    },
  }
}
</script>

<style scoped>
  .search{
    width: 100%;
    height: auto;
    padding: 80px 0 0;
    position: relative;
  }
  main{
    width: 100%;
    height: auto;
    padding: 50px var(--default-padding) 0;
    position: relative;
  }
</style>