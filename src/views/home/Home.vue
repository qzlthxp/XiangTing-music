<template>
  <div class="home">
    <full-page>
      <template v-slot:pages>
        <!--page1 Start-->
        <div class="page1" :class="{scrollActive: page1ScrollActive}" ref="page1">
          <div class="left">
            <div class="desc">
              <h1>
                <span><i>想</i></span>
                <span><i>听</i></span>
                <span><i>音</i></span>
                <span><i>乐</i></span>
              </h1>
              <p>在线音乐试听网站</p>
            </div>
            <div class="page1-banner" ref="page1Banner">
              <music-banner></music-banner>
            </div>
          </div>
          <div class="right">

          </div>
        </div>
        <!--page1 End-->
        <!--推荐歌单 Start-->
        <div class="recommend" ref="recGeDan">
          <rec-play-lists
              :recListsScrollActive="recListsScrollActive"
              :playLists="playLists"
              :selectPlayLists="selects"
              :currentPlayListsIndex="currentPlayListsIndex"
              @playListsSelectChange="playListsSelectChange"
          >
          </rec-play-lists>
        </div>
        <!--推荐歌单 End-->
      </template>
    </full-page>
  </div>
</template>

<script>
import FullPage from "@/components/common/fullPage/FullPage";
import MusicBanner from "@/components/common/musicBanner/MusicBanner";
import RecPlayLists from "@/views/home/childComponents/RecPlayLists";
import {paging, quickSortPlayLists} from "@/common/utils";
import {getHotPlayLists, getPlayLists} from "@/network/playLists";

export default {
  name: "Home",
  data() {
    return {
      currentPlayListsIndex: 0,
      playLists: [],
      selectPlayLists: [
        {name: '背景音乐', detail_cate_id: 4},
        {name: '学习工作', detail_cate_id: 9},
        {name: '伤感', detail_cate_id: 14},
        {name: '现场音乐', detail_cate_id: 3},
      ],
      page1ScrollActive: false,
      recListsScrollActive: false,
    }
  },
  components: {
    FullPage,
    MusicBanner,
    RecPlayLists,
  },
  mounted() {
    this.getPlayListsByDetail(this.selects[this.currentPlayListsIndex].detail_cate_id);
    this.page1ScrollActive = true;
    this.$bus.$on('fullPageChanged', num => {
      this.pageChanged(num);
    });
  },
  computed: {
    selects() {
      let userInfo = this.$store.state.user.userInfo;
      if (userInfo.user_id && userInfo.detail_cate) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return [
          { name: '为您推荐', detail_cate_id: this.$store.state.user.userInfo.detail_cate},
            ...this.selectPlayLists
        ];
      }else {
        return [
          {name: '每日精选', detail_cate_id: 0},
          ...this.selectPlayLists
        ];
      }
    }
  },
  methods: {
    async getHotP() {
      try {
        this.playLists = paging(quickSortPlayLists((await getHotPlayLists()).data, 'play_number'), 5);
      }catch (e) {
        return e;
      }
    },
    async getPlayListsByDetail(detailCateId) {
      try {
        if (detailCateId !== 0) {
          this.playLists = paging((await getPlayLists(detailCateId)).data, 5);
        }else {
          await this.getHotP();
        }
      }catch (e) {
        return e;
      }
    },
    playListsSelectChange(index) {
      this.currentPlayListsIndex = index;
      this.getPlayListsByDetail(this.selects[index].detail_cate_id);
    },
    pageChanged(num) {
      switch (num) {
        case 0:
          this.page1ScrollActive = true;
          break;
        case 1:
          this.recListsScrollActive = true;
          break;
        default:
          this.page1ScrollActive = false;
          this.recListsScrollActive = false;
          break;
      }
    }
  }
}
</script>

<style scoped>
  .home{
    width: 100%;
    height: auto;
    position: relative;
  }
  .page1{
    width: 100%;
    height: 100%;
    padding: 80px var(--default-padding);
    display: flex;
  }
  .left{
    width: 60%;
    height: 100%;
    padding: 80px 0;
    position: relative;
  }
  .left .desc{
    width: 400px;
    height: auto;
    position: relative;
  }
  .left .desc h1{
    font-size: 4rem;
    letter-spacing: 5px;
  }
  .left .desc p{
    font-size: 3rem;
    color: #666;
    position: relative;
    top: 2rem;
    opacity: 0;
    animation: .5s swift-up cubic-bezier(.19,1,.22,1) forwards,
  .5s fade-in cubic-bezier(.19,1,.22,1) forwards;
    animation-delay: .5s;
  }
  .left .desc h1 span{
    display: inline-block;
    overflow: hidden;
    position: relative;
    top: 2rem;
    animation: .3s swift-up cubic-bezier(.19,1,.22,1) forwards;
  }
  .left .desc h1 span i{
    font-style: normal;
    position: relative;
    top: 5rem;
    animation: .5s swift-up cubic-bezier(.19,1,.22,1) forwards;
    cursor: default;
  }
  .left .desc h1 span:nth-of-type(1) i {
    animation-delay: 0s;
  }
  .left .desc h1 span:nth-of-type(2) i {
    animation-delay: 0.1s;
  }
  .left .desc h1 span:nth-of-type(3) i {
    animation-delay: 0.2s;
  }
  .left .desc h1 span:nth-of-type(4) i {
    animation-delay: 0.3s;
  }
  .left .desc h1 span:nth-of-type(1) {
    animation-delay: 0s;
  }
  .left .desc h1 span:nth-of-type(2) {
    animation-delay: 0.1s;
  }
  .left .desc h1 span:nth-of-type(3) {
    animation-delay: 0.2s;
  }
  .left .desc h1 span:nth-of-type(4) {
    animation-delay: 0.3s;
  }
  .left .page1-banner{
    width: 700px;
    height: 300px;
    position: absolute;
    bottom: 0;
    left: -50px;
    opacity: 0;
  }
  .page1.scrollActive .left .page1-banner{
    animation: rightBanner .25s cubic-bezier(.19,1,.22,1) forwards,
    .25s fade-in cubic-bezier(.19,1,.22,1) forwards;
    animation-delay: .8s;
  }
  .right{
    width: 40%;
    height: 100%;
    background: url("../../assets/image/public/享音乐.png") no-repeat left top;
    background-size: cover;
    border-radius: var(--default-border-radius);
    position: relative;
    opacity: 0;
    animation: .5s fade-in ease-out forwards;
    animation-delay: 1s;
  }
  .recommend{
    width: 100%;
    height: 100%;
    padding: 80px var(--default-padding);
    position: relative;
  }

  @keyframes swift-up {
    to{
      top: 0;
    }
  }
  @keyframes fade-in {
    to{
      opacity: 1;
    }
  }
  @keyframes fade-scale {
    to{
      transform: scale(1) rotate(45deg);
    }
  }
  @keyframes rightBanner {
    100%{
      left: 0;
    }
  }
</style>
