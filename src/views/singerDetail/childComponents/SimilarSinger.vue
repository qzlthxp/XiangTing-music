<template>
  <div class="similar-singer">
    <header>相似歌手</header>
    <ul v-if="similarSingers.length">
      <li class="singer-box"
          v-for="(item, index) in similarSingers"
          :key="index"
          @click="toSingerDetail(item.id)"
      >
        <img class="singer-photo" :src="item.picUrl" alt="歌手图片" />
        <span class="singer-name">{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SimilarSinger",
  props: {
    similarSingers: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    toSingerDetail(id) {
      this.$router.push('/music_main/singer_detail/' + id + '/careful_chose');
    }
  }
}
</script>

<style scoped>
  .similar-singer{
    width: 250px;
    height: auto;
    padding-top: 25px;
  }
  .similar-singer header{
    font-size: 1.5rem;
  }
  .singer-box{
    width: 100%;
    margin: 25px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
  }
  .singer-box:hover{
    background-color: rgb(250,250,250);
  }
  .singer-box .singer-photo{
    width: 50px;
    height: 50px;
    margin-right: 25px;
    object-fit: cover;
  }
  .singer-box .singer-name{
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .singer-box .singer-name:hover{
    color: var(--active-color);
  }
</style>