<template>
  <div class="no-login" v-show="showNotice">
    <div class="container">
      <header>提示</header>
      <main>{{message}}</main>
      <footer>
        <button class="login" @click="ToLogin">去登录</button>
        <button class="cancel" @click="cancelNotice">再想想</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoLogin",
  data() {
    return {
      message: '',
      showNotice: false,
    }
  },
  mounted() {
    this.$bus.$on( 'show-notice',message => {
      this.showNotice = true;
      this.message = message;
    })
  },
  methods: {
    ToLogin() {
      this.$router.push('/login');
    },
    cancelNotice() {
      this.showNotice = false;
    }
  }
}
</script>

<style scoped>
  .no-login{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,.1);
    z-index: 99;
  }
  .container{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    height: 236px;
    background-color: #fff;
  }
  .container header{
    width: 100%;
    height: 50px;
    padding: 10px 20px;
    border-bottom: 1px solid #eee;
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 30px;
  }
  .container main{
    width: 100%;
    height: 126px;
    padding: 10px 20px;
    line-height: 126px;
    font-size: 1rem;
    color: #999;
  }
  .container footer{
    width: 100%;
    height: 40px;
    padding: 10px 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .login,
  .cancel{
    width: 120px;
    height: 40px;
    border-radius: 40px;
    background-color: var(--active-color);
    color: #fff;
    border: none;
    outline: none;
  }
  .cancel{
    margin-left: 25px;
    background-color: transparent;
    border: 1px solid var(--active-color);
    color: #000;
  }
</style>