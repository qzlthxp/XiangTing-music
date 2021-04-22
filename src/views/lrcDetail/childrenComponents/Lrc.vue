<template>
  <div class="lrc">
    <p v-for="(item, index) in Object.entries(lrc)" :key="index">
      <span
        :class="{ active: isActive(index) }"
        @click="changeCurrentTimeByLrc(index)"
      >
        {{ item[1] }}
      </span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Lrc',
  props: {
    lrc: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    isActive() {
      return (index) => {
        if (Object.entries(this.lrc).length) {
          if (
            this.$store.state.song.currentTime >=
              Object.entries(this.lrc)[index][0] * 1 &&
            !Object.entries(this.lrc)[index + 1]
          ) {
            return true
          } else {
            return (
              this.$store.state.song.currentTime >=
                Object.entries(this.lrc)[index][0] * 1 &&
              this.$store.state.song.currentTime <
                Object.entries(this.lrc)[index + 1][0] * 1
            )
          }
        } else {
          return false
        }
      }
    },
  },
  methods: {
    changeCurrentTimeByLrc(index) {
      let currTime = Object.entries(this.lrc)[index][0] * 1
      this.$bus.$emit('changeCurrTimeByLrc', currTime)
    },
  },
}
</script>

<style scoped>
.lrc {
  width: 100%;
  height: auto;
  padding: 50px 0 0;
  position: relative;
}
p {
  color: #666;
  line-height: 2rem;
  text-align: center;
}
p span.active {
  font-weight: bold;
  color: #000;
}
p span:hover {
  font-weight: bold;
  color: #000;
  cursor: pointer;
}
</style>
