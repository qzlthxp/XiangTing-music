<template>
  <div class="user">
    <user-header v-if="info.user_id" :info="info" @updateBg="updateBg" @updatePhoto="updatePhoto" @updateUserInfo="updateUserInfo"></user-header>
    <main>
      <div class="left" v-if="info.user_id">
        <user-main-left :buttons="buttons" :currentIndex="defaultLeftIndex" @changeType="changeType"></user-main-left>
      </div>
      <div class="right" v-if="info.user_id">
        <user-main-right :type="defaultType" :rightData="like[defaultType]"></user-main-right>
      </div>
    </main>
  </div>
</template>

<script>
import UserHeader from "@/views/user/childComponents/UserHeader";
import UserMainLeft from "@/views/user/childComponents/UserMainLeft";
import UserMainRight from "@/views/user/childComponents/UserMainRight";
import {getUserInfo, getUserLikeSong, getUserLikePlayLists, getUserLikeSinger} from "@/network/user";

export default {
  name: "User",
  data() {
    return {
      defaultLeftIndex: 0,
      defaultType: 'song',
      info: {
        user_id: null,
        user_name: '',
        user_photo: '',
        user_bg: '',
        user_qming: '',
      },
      like: {
        'song': [],
        'singer': [],
        'playLists': [],
      },
      buttons: [
        {nameIsMe: '我喜欢', nameNoMe: 'TA喜欢', class: 'fa fa-heart fa-fw fa-lg', type: 'song'},
        {nameIsMe: '我的关注', nameNoMe: 'TA的关注', class: 'fa fa-plus fa-fw fa-lg', type: 'singer'},
        {nameIsMe: '我的收藏', nameNoMe: 'TA的收藏', class: 'fa fa-heart-o fa-fw fa-lg', type: 'playLists'},
      ]
    }
  },
  watch: {
    $route() {
      this.getInfo();
    },
  },
  components: {
    UserHeader,
    UserMainLeft,
    UserMainRight
  },
  created() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      try {
        let res = (await getUserInfo(this.$route.params.user_id * 1))[0];
        if (res.user_id) {
          (
              {
                user_id: this.info.user_id,
                user_name: this.info.user_name,
                user_photo: this.info.user_photo,
                user_qming: this.info.user_qming,
                user_bg: this.info.user_bg
              } = res
          );
        }
        await this.getSongs();
        await this.getSingers();
        await this.getPlayLists();
        console.log(this.like);
      }catch (e) {
        return e;
      }
    },
    async getSongs() {
      try {
        this.like.song = await getUserLikeSong(this.$route.params.user_id);
      }catch (e) {
        return e;
      }
    },
    async getSingers() {
      try {
        this.like.singer = await getUserLikeSinger(this.$route.params.user_id);
      }catch (e) {
        return e;
      }
    },
    async getPlayLists() {
      try {
        this.like.playLists = await getUserLikePlayLists(this.$route.params.user_id);
      }catch (e) {
        return e;
      }
    },
    changeType(index) {
      this.defaultLeftIndex = index;
      this.defaultType = this.buttons[index].type;
    },
    updateBg(userBg) {
      this.info.user_bg = userBg;
    },
    updatePhoto(userPhoto) {
      this.info.user_photo = userPhoto;
    },
    updateUserInfo(payload) {
      this.info.user_name = payload.user_name;
      this.info.user_photo = payload.user_photo;
      this.info.user_qming = payload.user_qming;
    }
  },
  beforeRouteEnter(to, from, next) {
    let type = to.query.type;
    next(vm => {
      if (type) {
        vm.buttons.forEach( (value, index) => {
          if (value.type === type) {
            vm.defaultLeftIndex = index;
          }
        });
        vm.defaultType = type;
      }
    });
  }
}
</script>

<style scoped>
  .user{
    width: 100%;
    height: auto;
    padding: 80px var(--default-padding) 50px;
    position: relative;
  }
  main{
    width: 100%;
    margin-top: 25px;
    border-radius: var(--default-border-radius);
    box-shadow: 0 0 10px var(--default-border-color);
    display: flex;
  }
  .left{
    width: 250px;
    height: auto;
  }
  .right{
    width: calc(100% - 250px - 25px);
    margin-left: 25px;
  }
</style>
