<template>
  <div class="ep-info">
    <ul>
      <li class="header">
        <span class="rank-num">序号</span>
        <span class="ep-name">专辑</span>
        <span class="ep-issue-date">发行日期</span>
      </li>
      <li v-for="(item,index) in epsInfo"
          :key="index"
      >
        <span class="rank-num">
          {{index + 1}}
          <img :src="item.picUrl" alt="专辑封面">
        </span>
        <span class="ep-name" :title="item.name">
          <a
             href="javascript:;"
             @click="toEpDetail(index)"
          >
            {{item.name}}
          </a>
        </span>
        <span class="ep-issue-date">
          <a
             href="javascript:;"
          >
            {{issueDate(index)}}
          </a>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import {formatDate} from "@/common/utils";

export default {
  name: "EpInfo",
  props: {
    epsInfo: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    issueDate() {
      return index => {
        return formatDate(this.epsInfo[index].publishTime);
      }
    }
  },
  methods: {
    toEpDetail(index) {
      let ep_id = this.epsInfo[index].id;
      this.$router.push('/music_main/ep_detail/' + ep_id);
    }
  }
}
</script>

<style scoped>
  .ep-info{
    width: 100%;
    height: auto;
    position: relative;
  }
  ul{
    margin: 25px 0 0 0;
  }
  ul li{
    width: 100%;
    height: 70px;
    padding: 5px 0;
    background-color: #fff;
    font-size: 1rem;
    display: flex;
    position: relative;
  }
  ul li:nth-child(odd){
    background-color: rgb(250,250,250);
  }
  ul li:hover{
    background-color: #eee;
  }
  ul li.header{
    font-weight: bold;
  }
  ul li.header:hover{
    background-color: rgb(250,250,250);
  }
  .rank-num{
    width: 20%;
    height: 100%;
    padding: 0 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .rank-num img{
    width: 54px;
    height: 54px;
    margin-right: 21px;
    object-fit: cover;
  }
  .ep-name,
  .ep-issue-date{
    height: 100%;
    padding: 0 10px;
    text-align: left;
    line-height: 60px;
    overflow: hidden;
    white-space: nowrap;
  }
  .ep-name{
    width: 60%;
  }
  .ep-issue-date{
    width: 20%;
  }
</style>