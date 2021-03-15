<template>
  <div class="login-container">
    <div class="container">
      <div class="con-header">
        <span class="login" :class="{active: !showSignUp}" @click="ToLoginBox">邮箱密码登录</span>
        <span class="register" :class="{active: showSignUp}" @click="ToRegisterBox">免费注册</span>
      </div>
      <div class="content">
        <sign-in v-show="!showSignUp" @ToLogin="ToLogin"></sign-in>
        <sign-up v-show="showSignUp" @ToRegister="ToRegister"></sign-up>
      </div>
    </div>
    
    <div class="left-img">
      <img src="../../assets/image/public/logo.png" alt="左侧logo" />
    </div>
    <div class="right-img">
      <img src="../../assets/image/public/logo.png" alt="右侧logo" />
    </div>
  </div>
</template>

<script>
import SignIn from "@/views/login/childComponents/SignIn";
import SignUp from "@/views/login/childComponents/SignUp";
import {mapMutations} from 'vuex';
import {Login} from "@/network/login";
import {Register} from "@/network/login";
import {getUserLikePlayLists, getUserLikeSinger, getUserLikeSong} from "@/network/user";

export default {
  name: "Login",
  data() {
    return {
      showSignUp: false,
    }
  },
  components: {
    SignIn,
    SignUp
  },
  methods: {
    ...mapMutations(['saveUser','saveLikeSinger','saveLikeSong','saveLikePlayLists']),
    async ToLogin(payload) {
      try {
        let res = await Login(payload);
        if (res.status) {
          await this.saveUser(res);
          await localStorage.setItem('music_token', res.user_token);
          await sessionStorage.setItem('music_token', res.user_token);
          await this.$router.replace('/');
          await this.getUserLike(res.user_id);
        }else {
          await this.$message.error('邮箱密码错误');
        }
      }catch (e) {
        return e;
      }
    },
    async ToRegister(payload) {
      try {
        let res = await Register(payload);
        if (res.status) {
          await this.$message({
            message: '注册成功',
            type: 'success'
          });
          await localStorage.setItem('music_token', res.user_token);
        }else {
          await this.$message.error(res.message);
        }
      }catch (e) {
        return e;
      }
    },
    async getUserLike(userId) {
      try {
        let SingerVal = await getUserLikeSinger(userId);
        await this.saveLikeSinger(SingerVal.singers);
        let SongVal = await getUserLikeSong(userId);
        await this.saveLikeSong(SongVal.songs);
        let PlayListsVal = await getUserLikePlayLists(userId);
        await this.saveLikePlayLists(PlayListsVal.playLists);
      }catch (e) {
        return e;
      }
    },
    ToLoginBox() {
      this.showSignUp = false;
    },
    ToRegisterBox() {
      this.showSignUp = true;
    }
  }
}
</script>

<style scoped>
  .login-container{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-width: 1440px;
    height: 100vh;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }
  .container{
    width: 400px;
    height: calc(100% - 150px);
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .container .con-header{
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-end;
  }
  .container .con-header .login:hover,
  .container .con-header .register:hover{
    color: #409EFF;
    cursor: pointer;
  }
  .active{
    font-size: 1.5rem;
    font-weight: bold;
    color: #409EFF;
  }
  .content{
    width: 100%;
    height: 100%;
  }
  .left-img,
  .right-img{
    position: absolute;
    height: 800px;
    width: 800px;
    top: 50%;
    transform: translateY(-50%);
    opacity: .3;
    z-index: -1;
  }
  .left-img{
    left: -550px;
  }
  .right-img{
    right: -550px;
  }
</style>