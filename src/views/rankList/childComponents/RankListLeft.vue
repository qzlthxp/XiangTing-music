<template>
  <div class="rank-list-left">
    <ul>
      <li class="list-item" v-for="(item,index) in list" :key="index">
        <img class="list-cover-img" :src="item.coverImgUrl" alt="">
        <p class="list-name">{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "RankListLeft",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
  .rank-list-left{
    width: 100%;
    height: auto;
    padding: 10px 0;
    box-shadow: 0 0 10px var(--default-border-color);
  }
  .list-item{
    padding: 0 10px;
    margin: 10px 0;
    display: flex;
    align-items: center;
  }
  .list-item:hover{
    background-color: rgb(250,250,250);
    cursor: pointer;
  }
  .list-cover-img{
    width: 60px;
    height: 60px;
    margin-right: 25px;
    object-fit: cover;
  }
  .list-name{
    font-size: 1.2rem;
  }
  .list-item:hover .list-name{
    font-weight: bold;
  }
</style>