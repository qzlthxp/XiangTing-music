<template>
  <div class="rec-play-lists"
    :class="{scrollActive: recListsScrollActive}"
  >
    <div class="rec-play-lists-header">
      <p class="title">推荐歌单</p>
      <div class="select">
        <a  href="javascript:;"
            class="select-item play-lists-item"
            :class="{active: currentPlayListsIndex === index}"
            v-for="(item, index) in selectPlayLists"
            :key="index"
            @click="homeChosePlayLists(index)"
        >
          {{item.name}}
        </a>
      </div>
    </div>
    <div class="overView-container">
      <button class="prev-btn" @click="Prev('p')">
        <i class="fa fa-angle-left fa-fw"></i>
      </button>
      <play-lists-over-view :playListsInfos="playLists[playListsPage]"></play-lists-over-view>
      <button class="next-btn" @click="Next('p')">
        <i class="fa fa-angle-right fa-fw"></i>
      </button>
    </div>
  </div>
</template>

<script>
import PlayListsOverView from "@/views/playLists/childComponents/PlayListsOverView";
export default {
  name: "RecPlayLists",
  props: {
    currentPlayListsIndex: {
      type: Number,
      default: 0,
    },
    playLists: {
      type: Array,
      default() {
        return [];
      },
    },
    selectPlayLists: {
      type: Array,
      default() {
        return [];
      },
    },
    recListsScrollActive: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      playListsPage: 0,
    }
  },
  components: {
    PlayListsOverView
  },
  methods: {
    homeChosePlayLists(index) {
      this.playListsPage = 0;
      this.$emit('playListsSelectChange', index);
    },
    Prev(data) {
      if (data === 'p') {
        this.playListsPage--;
        if (this.playListsPage < 0) {
          this.playListsPage = 0;
        }
      }
    },
    Next(data) {
      if (data === 'p') {
        this.playListsPage++;
        if (this.playListsPage >= this.playLists.length) {
          this.playListsPage = this.playLists.length - 1;
        }
      }
    },
  }
}
</script>

<style scoped>
  .rec-play-lists{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .rec-play-lists-header .title{
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
    opacity: 0;
    transform: translateY(50px);
  }
  .rec-play-lists .rec-play-lists-header .select{
    width: 100%;
    height: auto;
    padding: 20px 0;
    font-size: 1.2rem;
    font-weight: lighter;
    text-align: center;
    line-height: 50px;
    opacity: 0;
    transform: translateY(50px);
  }
  .rec-play-lists .rec-play-lists-header .select .select-item{
    margin: 0 20px;
    cursor: pointer;
  }
  .rec-play-lists .rec-play-lists-header .select .select-item.active{
    color: var(--active-color);
  }
  .rec-play-lists .rec-play-lists-header .select .select-item:hover{
    color: var(--active-color);
  }
  .overView-container{
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    opacity: 0;
    transform: translateY(50px);
  }
  .rec-play-lists .prev-btn,
  .rec-play-lists .next-btn{
    position: absolute;
    width: 50px;
    height: 120px;
    background-color: transparent;
    border: none;
    outline: none;
    overflow: hidden;
  }
  .rec-play-lists .prev-btn i,
  .rec-play-lists .next-btn i{
    transform: scale(5);
  }
  .rec-play-lists .prev-btn{
    left: -60px;
  }
  .rec-play-lists .next-btn{
    right: -60px;
  }
  .rec-play-lists.scrollActive .title{
    animation: removeOpacityTran .5s linear forwards;
    animation-delay: .5s;
  }
  .rec-play-lists.scrollActive .select{
    animation: removeOpacityTran .5s linear forwards;
    animation-delay: .75s;
  }
  .rec-play-lists.scrollActive .overView-container{
    animation: removeOpacityTran .5s linear forwards;
    animation-delay: 1.25s;
  }

  @keyframes removeOpacityTran {
    100%{
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
