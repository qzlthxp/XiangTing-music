<template>
  <div class="music-footer">
    <div class="upper-content">
      <div class="site-info">
        <p>想听音乐</p>
        <p>起始日期：2020-12-22</p>
      </div>
    </div>
    <div class="lower-content">
      <p>音乐版权归网易云音乐所有，如有侵权联系<span style="color: #999">xiangting20212021@163.com</span>，会尽快下架。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MusicFooter"
}
</script>

<style scoped>
  .music-footer{
    width: 100%;
    height: auto;
    padding: 0 var(--default-padding);
    background-color: rgb(250, 250, 251);
    font-weight: 400;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-content: center;
  }
  .upper-content{
    width: 100%;
    height: auto;
    padding: 25px 0;
    display: flex;
  }
  .site-info{
    width: auto;
    height: auto;
    padding: 0 50px 0 0;
  }
  .lower-content{
    width: 100%;
    height: auto;
    padding: 25px 0 200px;
    border-top: 1px solid #eee;
  }
</style>
