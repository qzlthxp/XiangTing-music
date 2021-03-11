<template>
    <div class="no-collect">
      <img src="../../../assets/image/public/nocollect.png" alt="暂无歌曲">
      <p>暂无收藏</p>
    </div>
</template>

<script>
export default {
  name: "NoCollect",
}
</script>

<style scoped>
.no-collect{
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.no-collect img{
  width: 200px;
  height: 200px;
  object-fit: cover;
}
</style>