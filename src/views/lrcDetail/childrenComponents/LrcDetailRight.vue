<template>
  <div class="lrc-detail-right">
    <header>
      <h1 class="song-name">{{songInfo.name}}</h1>
      <p class="art-name" @click="toSingerDetail(songInfo.ar[0].id)">{{songInfo.ar[0].name}}</p>
      <div class="ep-info">
        <p>
          <span>专辑：</span>
          <span class="al-name" @click="toEpDetail(songInfo.al.id)">{{songInfo.al.name}}</span>
        </p>
        <p class="publish-time">
          <span>发行日期：</span>
          <span>{{songInfo.publishTime | formatDate}}</span>
        </p>
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
    }
  },
  filters: {
    formatDate
  },
  methods: {
    toSingerDetail(id) {
      this.$router.push('/music_main/singer_detail/' + id + '/careful_chose');
    },
    toEpDetail(id) {
      this.$router.push('/music_main/ep_detail/' + id);
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
  .art-name:hover{
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
</style>