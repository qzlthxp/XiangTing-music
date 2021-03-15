<template>
  <div class="singer-detail">
    <!--查找到该歌手信息展示 Start-->
    <singer-detail-header v-if="Object.keys(detailInfo).length" :detailInfo="detailInfo"></singer-detail-header>
    <singer-detail-main></singer-detail-main>
    <section class="router-view-section">
      <router-view></router-view>
      <similar-singer v-if="similarSingers.length" :similar-singers="similarSingers"></similar-singer>
    </section>
    <!--查找到该歌手信息展示 End-->
  </div>
</template>

<script>
import SingerDetailHeader from "@/views/singerDetail/childComponents/SingerDetailHeader";
import SingerDetailMain from "@/views/singerDetail/childComponents/SingerDetailMain";
import SimilarSinger from "@/views/singerDetail/childComponents/SimilarSinger";
import {getSingerDetail, getSimiSinger} from "@/network/singerDetail";
export default {
  name: "SingerDetail",
  data() {
    return {
      detailInfo: {},
      similarSingers: [],
    }
  },
  watch: {
    /*
    Vue复用组件
    共用一个路由组件.当路由切换时,页面只会渲染第一次匹配到的参数
     */
    $route() {
      this.getSingerDetailInfo();
      this.getSimilar();
    },
  },
  components: {
    SingerDetailHeader,
    SingerDetailMain,
    SimilarSinger
  },
  created() {
    this.getSingerDetailInfo();
    this.getSimilar();
  },
  methods: {
    //根据url singer_id 异步获取该歌手信息
    async getSingerDetailInfo() {
      if (this.$route.params.singer_id) {
        try {
          this.detailInfo = (await getSingerDetail(this.$route.params.singer_id)).data;
        }catch (e) {
          return e;
        }
      }
    },
    async getSimilar() {
      try {
        this.similarSingers = (await getSimiSinger(this.$route.params.singer_id)).artists;
      }catch (e) {
        return e;
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    window.scrollTo(0,0);
    next();
  }
}
</script>

<style scoped>
  .singer-detail{
    width: 100%;
    padding: 80px 0;
    position: relative;
    overflow: hidden;
  }
  .router-view-section{
    width: 100%;
    height: auto;
    padding: 0 var(--default-padding);
    display: flex;
    justify-content: space-between;
  }

</style>