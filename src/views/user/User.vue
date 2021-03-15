<template>
  <div class="user">
    <user-header
        v-if="info.user_id"
        :info="info"
        @updateBg="updateBg"
        @updatePhoto="updatePhoto"
        @updateUserInfo="updateUserInfo"
    >
    </user-header>
    <main>
      <div class="left">
        <user-main-left
            :buttons="buttons"
            :currentIndex="defaultLeftIndex"
            @changeType="changeType"
        >
        </user-main-left>
      </div>
      <div class="right">
        <user-main-right
            :type="defaultType"
            :rightData="like[defaultType]"
            :user-info="info"
        >
        </user-main-right>
      </div>
    </main>
  </div>
</template>

<script>
import UserHeader from "@/views/user/childComponents/UserHeader";
import UserMainLeft from "@/views/user/childComponents/UserMainLeft";
import UserMainRight from "@/views/user/childComponents/UserMainRight";
import {getUserInfo, getUserLikeSong, getUserLikePlayLists, getUserLikeSinger, getOwn} from "@/network/user";
import {getSongDesc} from "@/network/lrcDetail";
import {getSingerDetail} from "@/network/singerDetail";
import {getPlayListsByPlayListsId} from "@/network/playListsDetail";

export default {
  name: "User",
  data() {
    return {
      defaultLeftIndex: 0,
      defaultType: 'songs',
      info: {
        user_id: null,
        user_name: '',
        user_photo: '',
        user_bg: '',
        user_qming: '',
      },
      like: {
        'songs': [],
        'singers': [],
        'playLists': [],
        'own': [],
      },
      buttons: [
        {nameIsMe: '我喜欢', nameNoMe: 'TA喜欢', class: 'fa fa-heart fa-fw fa-lg', color: '#f73859', type: 'songs'},
        {nameIsMe: '我的关注', nameNoMe: 'TA的关注', class: 'fa fa-plus fa-fw fa-lg', color: '#08a2f5', type: 'singers'},
        {nameIsMe: '我的收藏', nameNoMe: 'TA的收藏', class: 'fa fa-star fa-fw fa-lg', color: 'var(--active-color)', type: 'playLists'},
        {nameIsMe: '我的作品', nameNoMe: 'TA的作品', class: 'fa fa-music fa-fw fa-lg', color: '#747d8c', type: 'own'},
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
        let res = await getUserInfo(this.$route.params.user_id);
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
        await this.getOwnSongInfo();
      }catch (e) {
        return e;
      }
    },
    getSongs: async function () {
      try {
        let songs = (await getUserLikeSong(this.$route.params.user_id)).songs;
        this.like.songs = (await getSongDesc(songs.join(','))).songs;
      } catch (e) {
        return e;
      }
    },
    async getSingers() {
      try {
        let singers = (await getUserLikeSinger(this.$route.params.user_id)).singers;
        singers.forEach( async (value) => {
          this.like.singers.push((await getSingerDetail(value)).data);
        });
      }catch (e) {
        return e;
      }
    },
    async getPlayLists() {
      try {
        let res = (await getUserLikePlayLists(this.$route.params.user_id)).playLists;
        res.forEach( async value => {
          this.like.playLists.push(await getPlayListsByPlayListsId(value));
        });
      }catch (e) {
        return e;
      }
    },
    async getOwnSongInfo() {
      try {
        this.like.own = (await getOwn(this.$route.params.user_id)).songs;
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
    padding: 80px var(--default-padding);
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
