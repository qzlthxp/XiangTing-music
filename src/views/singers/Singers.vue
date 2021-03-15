<template>
  <div class="singers">
    <div class="imgBox" ref="singerBgBox">
      <img ref="singerBg" src="https://y.gtimg.cn/mediastyle/yqq/img/bg_singer.jpg" alt="歌手页背景" />
      <div class="content">
        <p>众多歌手，尽在眼前。</p>
      </div>
    </div>

    <!--歌手筛选 Start-->
    <singers-tab-bar
        @changeInitials="changeInitials"
        @changeDetailType="changeDetailType"
    >
    </singers-tab-bar>
    <!--歌手筛选 End-->

    <main>
      <!--歌手展示 Start-->
      <singers-over-view
          v-if="singersInfo.length && !this.$store.state.isLoading"
          :Infos="singersInfo"
      >
      </singers-over-view>
      <!--歌手展示 End-->
      <loading v-if="this.$store.state.isLoading"></loading>
      <no-singer v-if="!singersInfo.length && !this.$store.state.isLoading"></no-singer>
    </main>
  </div>
</template>

<script>
import SingersTabBar from "@/views/singers/childComponents/SingersTabBar";
import SingersOverView from "@/views/singers/childComponents/SingersOverView";
import Loading from "@/components/common/loading/Loading";
import NoSinger from "@/components/content/noRes/NoSinger";
import {getSingers} from "@/network/singers";

export default {
  name: "Singers",
  data() {
    return {
      initial: -1,
      type: -1,
      area: -1,
      singersInfo: [],
    }
  },
  components: {
    SingersTabBar,
    SingersOverView,
    Loading,
    NoSinger
  },
  created() {
    this.getSinger();
  },
  mounted() {
    window.addEventListener('scroll', this.singerBgParallax);
  },
  methods: {
    async getSinger() {
      try{
        await this.$store.commit('showLoading');
        let obj = {
          initial: this.initial,
          type: this.type,
          area: this.area
        };
        this.singersInfo = (await getSingers(obj)).artists;
        await this.$store.commit('hideLoading');
      }catch (e) {
        return e;
      }
    },
    //歌手背景图视差滚动
    singerBgParallax() {
      let scrolled = document.documentElement.scrollTop / this.$refs.singerBgBox.clientHeight;
      let y = scrolled > 1 ? 1 : scrolled;
      this.$refs.singerBg.style.transform = `translateY(${y * 20}%)`;
    },
    //子组件点击事件 父组件修改选择的首字母
    changeInitials(initial) {
      this.initial = initial;
      this.getSinger();
    },
    //子组件点击事件 父组件修改选择的二级选项
    changeDetailType(obj) {
      ({type: this.type, area: this.area} = obj);
      this.getSinger();
    },
  },
  beforeDestroy() {
    window.removeEventListener('scroll',this.singerBgParallax);
  }
}
</script>

<style scoped>
  .singers{
    width: 100%;
    padding: 80px 0;
    position: relative;
    overflow: hidden;
  }
  .imgBox{
    width: 100%;
    height: 300px;
    margin-bottom: 50px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .imgBox img{
    min-height: 150%;
    object-fit: cover;
  }
  .imgBox .content{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .imgBox .content p{
    letter-spacing: .5rem;
    font-size: 3.8rem;
    color: #fff;
  }
  main{
    width: 100%;
    min-height: 100px;
    padding: 0 var(--default-padding);
    position: relative;
  }
</style>
