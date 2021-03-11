<template>
  <div class="play-lists-over-view">
    <div class="box"
         v-for="(item,index) in playListsInfos"
         :key="index"
         @click="goPlayListsDetail(index)"
    >
      <div class="box-bg">
        <img :src="item.play_lists_poster" alt="">
      </div>
      <div class="play-icon">
        <i class="fa fa-play-circle-o fa-fw fa-4x"></i>
      </div>
      <div class="content">
        <p :title="item.play_lists_title" class="play-lists-name">{{item.play_lists_title}}</p>
        <p class="play-number">
          <span><i class="fa fa-headphones fa-fw"></i></span>
          <span style="margin-left: .2rem">{{item.play_number | getPlayNumber}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayListsOverView",
  props: {
    playListsInfos: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  filters: {
    getPlayNumber(data) {
      return data > 10000 ? parseInt(data / 10000) + '万' : data;
    },
  },
  methods: {
    goPlayListsDetail(index) {
      this.$router.push('/music_main/playlists_detail/' + this.playListsInfos[index].play_lists_id);
    }
  }
}
</script>

<style scoped>
  .play-lists-over-view{
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
  }
  .box{
    width: 18%;
    height: 0;
    padding-bottom: 18%;
    margin: 50px 2.5% 20px 0;
    position: relative;
  }
  .box:nth-child(1),
  .box:nth-child(2),
  .box:nth-child(3),
  .box:nth-child(4),
  .box:nth-child(5){
    margin-top: 20px;
  }
  .box:nth-child(5n) {
    margin-right: 0;
  }
  .box-bg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: var(--default-border-radius);
    overflow: hidden;
  }
  .box-bg img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: .2s  cubic-bezier(0, 0.55, 0.45, 1);
    overflow: hidden;
  }
  .play-icon{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
  }
  .play-icon i{
    color: #fff;
  }
  .box:hover .box-bg img{
    transform: scale(1.2);
  }
  .box:hover .play-icon{
    opacity: 1;
  }
  .content{
    position: absolute;
    bottom: -50px;
    left: 0;
    right: 0;
    height: 50px;
  }
  .content p{
    padding: 5px 0;
    font-size: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: default;
  }
</style>