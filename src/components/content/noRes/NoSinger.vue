<template>
  <div class="no-singer">
    <img src="../../../assets/image/public/nosinger.png" alt="暂无歌曲">
    <p>暂无歌手信息</p>
  </div>
</template>

<script>
export default {
  name: "NoSinger"
}
</script>

<style scoped>
.no-singer{
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.no-singer img{
  width: 200px;
  height: 200px;
  object-fit: cover;
}
</style>