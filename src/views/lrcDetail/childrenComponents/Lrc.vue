<template>
  <div class="lrc">
    <p v-for="(item, index) in Object.entries(lrc)"
       :key="index"
    >
      <span :class="{active: isActive(index)}">{{item[1]}}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "Lrc",
  props: {
    lrc: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    isActive () {
      return index => {
        if (Object.entries(this.lrc).length) {
          return this.$store.state.song.currentTime >= Object.entries(this.lrc)[index][0] * 1 && this.$store.state.song.currentTime <  Object.entries(this.lrc)[index + 1][0] * 1;
        }else {
          return false;
        }
      }
    }
  },
}
</script>

<style scoped>
  .lrc{
    width: 100%;
    height: auto;
    padding: 50px 0 0;
    position: relative;
  }
  p{
    color: #666;
    line-height: 2rem;
    text-align: center;
  }
  p span.active{
    font-weight: bold;
    color: #000;
  }
</style>