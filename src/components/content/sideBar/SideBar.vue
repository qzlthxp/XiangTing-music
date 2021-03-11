<template>
  <div class="side-bar">
    <div v-show="showBack" class="back-top" @click="backTop">
      <i class="fa fa-chevron-up fa-2x"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      showBack: false,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleBack);
  },
  methods: {
    handleBack() {
      this.showBack = scrollY > 500;
    },
    backTop() {
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'
      });
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleBack);
  }
}
</script>

<style scoped>
  .side-bar{
    position: fixed;
    right: 30px;
    bottom: 100px;
    width: 50px;
    height: auto;
  }
  .back-top{
    width: 100%;
    height: 50px;
    background-color: #eeeeee;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>