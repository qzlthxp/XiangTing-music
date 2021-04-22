<template>
  <div class="rank-list-left">
    <ul>
      <li
        class="list-item"
        :class="{ active: currentIndex === index }"
        v-for="(item, index) in list"
        :key="index"
        @click="listItemClick(index)"
      >
        <img class="list-cover-img" :src="item.coverImgUrl" alt="排行榜图片" />
        <p class="list-name">{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RankListLeft',
  props: {
    list: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  mounted() {
    this.listItemClick(this.currentIndex)
  },
  methods: {
    listItemClick(index) {
      this.currentIndex = index
      this.$emit('leftClick', {
        title: this.list[index].name,
        id: this.list[index].id,
      })
    },
  },
}
</script>

<style scoped>
.rank-list-left {
  width: 100%;
  min-height: 100px;
  padding: 10px 0;
  box-shadow: 0 0 3px var(--default-border-color);
  position: sticky;
  top: 0;
}
.list-item {
  padding: 0 10px;
  margin: 10px 0;
  display: flex;
  align-items: center;
}
.list-item.active {
  background-color: rgb(247, 247, 247);
  font-weight: bold;
}
.list-item:hover {
  background-color: rgb(247, 247, 247);
  cursor: pointer;
}
.list-cover-img {
  width: 60px;
  height: 60px;
  margin-right: 25px;
  object-fit: cover;
}
.list-name {
  font-size: 1.2rem;
}
.list-item:hover .list-name {
  font-weight: bold;
}
</style>
