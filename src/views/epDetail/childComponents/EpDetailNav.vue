<template>
  <div class="ep-detail-nav">
    <div class="poster">
      <img :src="epInfo.blurPicUrl" alt="">
    </div>
    <div class="info" v-if="Object.keys(epInfo.artists.length)">
      <ul>
        <li>
          <i class="fa fa-user fa-fw"></i>
          <span>歌手：</span>
          <span class="singer-name"
                @click="toSingerDetail(epInfo.artists[0].id)"
          >
            {{epInfo.artists[0].name}}
          </span>
        </li>
        <li>
          <i class="fa fa-calendar fa-fw"></i>
          发行日期：
          <span class="issue-date">
            {{issueDate}}
          </span>
        </li>
      </ul>
      <p>
        <span style="font-weight: bold">简介：</span>
        <span :title="epInfo.description">{{EpDescription}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import {formatDate} from "@/common/utils";

export default {
  name: "EpDetailNav",
  props: {
    epInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    EpDescription() {
      return this.epInfo.description.slice(0,250) + '...';
    },
    issueDate() {
      return formatDate(this.epInfo.publishTime);
    },
  },
  methods: {
    toSingerDetail(singerId) {
      this.$router.push('/music_main/singer_detail/' + singerId + '/careful_chose');
    }
  }
}
</script>

<style scoped>
  .ep-detail-nav{
    width: 100%;
    min-height: 100px;
    overflow: hidden;
  }
  .poster{
    width: 100%;
    height: 250px;
    border: 1px solid var(--default-border-color);
  }
  .poster img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .info ul li{
    padding: 10px 0;
    font-size: 1rem;
    font-weight: bolder;
  }
  .info ul li i,
  .info ul li .singer-name:hover{
    color: var(--active-color);
    cursor: pointer;
  }
</style>