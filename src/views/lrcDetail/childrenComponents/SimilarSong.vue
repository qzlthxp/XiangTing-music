<template>
  <div class="similar-song">
    <header>相似歌曲</header>
    <ul>
      <li v-for="(item,index) in similarSongs"
          :key="index"
          @click="toSong(index)"
      >
        <img :src="item.album.blurPicUrl" alt="">
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SimilarSong",
  props: {
    similarSongs: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    toSong(index) {
      this.$router.push('/music_main/lrc_detail/' + this.similarSongs[index].id);
    }
  }
}
</script>

<style scoped>
  .similar-song{
    width: 250px;
    height: auto;
    padding: 50px 0 0;
  }
  header{
    font-size: 1.5rem;
    color: #666;
  }
  li{
    margin: 25px 0;
    display: flex;
    align-items: center;
    cursor: pointer;
    overflow: hidden;
  }
  li:hover{
    background-color: rgb(250,250,250);
  }
  li img{
    width: 50px;
    height: 50px;
    margin-right: 25px;
  }
</style>