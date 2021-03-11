<template>
  <div class="no-music">
    <img src="../../../assets/image/public/nomusic.png" alt="暂无歌曲">
    <p>暂无歌曲</p>
  </div>
</template>

<script>
export default {
  name: "NoMusic",
}
</script>

<style scoped>
  .no-music{
    width: 100%;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .no-music img{
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
</style>