<!--suppress ALL -->
<template>
  <div id="music-banner" @mouseover="showNavigation" @mouseout="hideNavigation">
    <swiper
      v-if="swiperList.length"
      class="swiper-container"
      :options="swiperOption"
      ref="mySwiper"
    >
      <swiper-slide v-for="(item, index) in swiperList" :key="index">
        <img
          :src="item.play_lists_poster"
          @click="toPlayListsDetail(index)"
          alt="歌单封面"
        />
      </swiper-slide>
      <!--optional controls-->
      <div class="swiper-pagination" slot="pagination"></div>
      <div
        class="swiper-button-prev swiper-button-white hide"
        slot="button-prev"
      ></div>
      <div
        class="swiper-button-next swiper-button-white hide"
        slot="button-next"
      ></div>
    </swiper>
  </div>
</template>

<script>
// import { banner } from '@/network/home'
import { getHotPlayLists } from '@/network/playLists'

export default {
  name: 'MusicBanner',
  data() {
    return {
      swiperOption: {
        loop: true,
        effect: 'slide',
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      },
      swiperList: [],
    }
  },
  created() {
    this.getBanner()
  },
  mounted() {
    if (this.$refs.mySwiper) {
      this.$refs.mySwiper.swiper.slideTo(1, 1000, false)
    }
  },
  methods: {
    async getBanner() {
      try {
        let res = (await getHotPlayLists()).data
        this.swiperList = res.splice(0, 5)
      } catch (e) {
        return e
      }
    },
    showNavigation() {
      this.$refs.mySwiper.swiper.navigation.$nextEl.removeClass('hide')
      this.$refs.mySwiper.swiper.navigation.$prevEl.removeClass('hide')
    },
    hideNavigation() {
      this.$refs.mySwiper.swiper.navigation.$nextEl.addClass('hide')
      this.$refs.mySwiper.swiper.navigation.$prevEl.addClass('hide')
    },
    toPlayListsDetail(index) {
      this.$router.push(
        '/music_main/playlists_detail/' + this.swiperList[index].play_lists_id
      )
    },
  },
}
</script>

<style scoped>
#music-banner {
  width: 100%;
  height: 100%;
  border-radius: var(--default-border-radius);
  overflow: hidden;
}
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-container .hide {
  opacity: 0;
}
.swiper-button-next,
.swiper-button-prev {
  width: 60px;
  height: 60px;
  color: #fff;
  transition: opacity 0.5s;
}
.swiper-button-prev {
  left: 30px;
}
.swiper-button-next {
  right: 30px;
}
</style>
