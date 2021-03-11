<template>
  <div class="singer-detail-song-info">
    <header>
      <ul>
        <li v-for="(item,index) in singerDetailMainTabBar"
            :key="index"
        >
          <span class="music-a"
                :class="{active: currentIndex === index}"
                @click="changeActiveLi(index)"
          >
            {{item.name}}
          </span>
        </li>
      </ul>
    </header>
  </div>
</template>

<script>
export default {
  name: "SingerDetailMain",
  data() {
    return {
      currentIndex: 0,
      singerDetailMainTabBar: [
        {name: '精心挑选', url: '/careful_chose'},
        {name:'专辑', url: '/eps'},
      ]
    }
  },
  methods: {
    changeActiveLi(index) {
      this.currentIndex = index;
      this.$router.push('/music_main/singer_detail/' + this.$route.params['singer_id'] + this.singerDetailMainTabBar[index].url);
    },
  }
}
</script>

<style scoped>
.singer-detail-song-info{
  width: 100%;
  height: auto;
  margin-top: var(--default-margin);
  padding: 0 var(--default-padding);
}
.singer-detail-song-info ul{
  width: 100%;
  display: flex;
}
.singer-detail-song-info ul li{
  width: auto;
  margin-right: var(--default-margin);
}
.singer-detail-song-info ul li span{
  font-size: 1.5rem;
  position: relative;
  cursor: pointer;
}
.singer-detail-song-info ul li span.active{
  font-weight: bold;
}
</style>