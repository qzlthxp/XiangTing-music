<template>
  <div class="lrc-detail-right">
    <header>
      <h1 class="song-name">{{songInfo.name}}</h1>
      <p class="art-name">
        <span @click="toSingerDetail(songInfo.ar[0].id)">{{songInfo.ar[0].name}}</span>
      </p>
      <div class="ep-info">
        <p>
          <span>专辑：</span>
          <span class="al-name"
                @click="toEpDetail(songInfo.al.id)"
          >
            {{songInfo.al.name}}
          </span>
        </p>
        <p class="publish-time">
          <span>发行日期：</span>
          <span>{{issueDate(epInfo)}}</span>
        </p>
      </div>
      <div class="btn">
        <button class="play" @click="playThis">
          <span><i class="fa fa-play"></i></span>
          <span style="margin-left: 10px">播放</span>
        </button>

        <button class="add"  @click="addThis">
          <span><i class="fa fa-plus"></i></span>
          <span style="margin-left: 10px">加入歌单</span>
        </button>
      </div>
    </header>
  </div>
</template>

<script>
import {formatDate} from "@/common/utils";

export default {
  name: "LrcDetailRight",
  props: {
    songInfo: {
      type: Object,
      default() {
        return {};
      }
    },
    epInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    issueDate() {
      return data => {
        return formatDate(data.publishTime);
      }
    }
  },
  methods: {
    toSingerDetail(id) {
      this.$router.push('/music_main/singer_detail/' + id + '/careful_chose');
    },
    toEpDetail(id) {
      this.$router.push('/music_main/ep_detail/' + id);
    },
    playThis() {
      this.$emit('playThis');
    },
    addThis() {
      this.$emit('addThis');
    }
  }
}
</script>

<style scoped>
  .lrc-detail-right{
    width: 100%;
    height: auto;
    position: relative;
    overflow: hidden;
  }
  .song-name{
    font-size: 4rem;
  }
  .art-name{
    font-size: 2rem;
    margin: calc(var(--default-margin) / 4) 0;
    color: #666;
  }
  .art-name span:hover{
    color: var(--active-color);
    cursor: pointer;
  }
  .ep-info{
    width: 100%;
    display: flex;
    font-size: 1.5rem;
  }
  .ep-info .al-name:hover{
    color: var(--active-color);
    cursor: pointer;
  }
  .ep-info .publish-time{
    margin-left: var(--default-margin);
  }
  .play,
  .add{
    min-width: 100px;
    margin: 25px 25px 25px 0;
    padding: 5px 10px;
    border: none;
    background-color: var(--active-color);
    border-radius: var(--default-border-radius);
    outline: none;
  }
  .play span,
  .play i{
    color: #fff;
  }
  .add{
    background-color: #fff;
    border: 1px solid var(--active-color);
  }
  .add span,
  .add i{
    color: var(--active-color);
  }
</style>