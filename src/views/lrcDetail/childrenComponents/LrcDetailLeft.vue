<template>
  <div class="lrc-detail-left">
    <img :src="epInfo.blurPicUrl" alt="专辑封面" />
    <p class="desc">
      <span class="desc-title">专辑简介：</span>
      <span :title="epInfo.description" class="desc-content">{{epInfo.description | decDesc}}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "LrcDetailLeft",
  props: {
    epInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    decDesc(data) {
      if (data.length < 200) {
        return data;
      }else {
        return  data.slice(0,200) + '...';
      }
    }
  },
}
</script>

<style scoped>
  .lrc-detail-left{
    position: sticky;
    top: 80px;
    width: 100%;
    min-height: 100px;
    overflow: hidden;
  }
  .desc{
    margin: var(--default-margin) 0;
  }
  .desc-title{
    font-weight: bold;
    font-size: 1.5rem;
  }
  .desc-content{
    font-size: 1rem;
    color: #666;
  }
</style>