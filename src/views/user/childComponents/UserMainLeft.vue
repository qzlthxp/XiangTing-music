<template>
  <div class="main-left">
    <button :class="{active: index === currentIndex}"
        v-for="(item, index) in buttons"
        :key="index"
        @click="changeType(index)"
    >
      <span class="icon">
        <i :class="item.class"></i>
      </span>
      <span v-if="isMe">{{item.nameIsMe}}</span>
      <span v-if="!isMe">{{item.nameNoMe}}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "UserMainLeft",
  props: {
    currentIndex: {
      type: Number,
      default() {
        return 0;
      }
    },
    buttons: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    isMe() {
      return this.$route.params.user_id * 1 === this.$store.state.user.userInfo.user_id;
    }
  },
  methods:{
    changeType(index) {
      this.$emit('changeType', index);
    }
  }
}
</script>

<style scoped>
  .main-left{
    width: 100%;
    height: auto;
    padding: 10px;
    border-radius: var(--default-border-radius);
    overflow: hidden;
  }
  button{
    width: 100%;
    height: 35px;
    margin: 10px 0;
    border: none;
    border-radius: var(--default-border-radius);
    background-color: transparent;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    outline: none;
  }
  button:nth-of-type(1){
    margin-top: 0;
  }
  button span.icon{
    margin-right: 10px;
  }
  button:hover{
    background-color: var(--default-border-color);
  }
  button.active{
    background-color: var(--default-border-color);
  }
  p[class="title"] {
    font-size: 1.2rem;
    color: var(--default-i-color);
  }
  .my-song{
    width: 100%;
    height: auto;
    overflow: hidden;
  }

</style>