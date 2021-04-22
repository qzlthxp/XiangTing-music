<template>
  <div class="hot-search-list">
    <div class="container">
      <div
        class="content"
        v-for="(item, index) in hots"
        :key="index"
        @click="toSearch(index)"
      >
        <span v-show="index === 0" class="num" style="color: #ff5249">{{
          index + 1
        }}</span>
        <span v-show="index === 1" class="num" style="color: #ff7f29">{{
          index + 1
        }}</span>
        <span v-show="index === 2" class="num" style="color: #fcc54e">{{
          index + 1
        }}</span>
        <span v-show="index > 2" class="num">{{ index + 1 }}</span>
        <span class="name">{{ item.first }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotSearchList',
  props: {
    hots: {
      type: Array,
      default() {
        return []
      },
    },
  },
  methods: {
    toSearch(index) {
      this.$router.push({
        path: '/music_main/search',
        query: {
          searchWord: this.hots[index].first,
        },
      })
    },
  },
}
</script>

<style scoped>
.hot-search-list {
  width: 600px;
  height: auto;
  margin: 0 auto;
  position: relative;
}
h3 {
  text-align: center;
  margin-bottom: 25px;
}
.container {
  width: 100%;
  height: 300px;
  display: flex;
  flex-flow: column wrap;
}
.content {
  width: 50%;
  padding: 20px;
  display: flex;
  align-items: center;
  font-weight: 400;
  cursor: pointer;
}
.content .num {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 20px;
  text-align: center;
  line-height: 20px;
}
.content .name {
  flex: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.content:hover .name {
  color: var(--active-color);
}
</style>
