<template>
  <div class="user-card">
    <div class="photo" @click="toUser">
      <img :src="$store.state.user.userInfo.user_photo" alt="">
    </div>
    <div class="user-info">
      <p :title="$store.state.user.userInfo.user_name" class="user-name">{{$store.state.user.userInfo.user_name}}</p>
    </div>
    <div class="user-like">
      <div class="user-like-content"
           v-for="(item, index) in userLike"
           :key="index"
           @click="ToUser(index)"
      >
        <p>{{item.name}}</p>
        <p class="number">{{number(index)}}</p>
      </div>
    </div>

    <div class="user-space">
      <div class="content" @click="toUser">
        <span class="icon"><i class="fa fa-user-o fa-fw"></i></span>
        <span>个人中心</span>
      </div>
      <div class="content" @click="toPlayListsManage">
        <span class="icon"><i class="fa fa-th-list fa-fw"></i></span>
        <span>我的歌单</span>
      </div>
    </div>

    <div class="sign-out" @click="logOut">
      <div class="content">
        <span class="icon"><i class="fa fa-sign-out fa-fw"></i></span>
        <span>退出登录</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  data() {
    return {
      fit: 'cover',
      userLike: [
        {name: '喜欢', number: 'songUserLike', type: 'songs'},
        {name: '关注', number: 'singerUserLike', type: 'singers'},
        {name: '收藏', number: 'playListsUserLike', type: 'playLists'},
      ]
    }
  },
  computed: {
    number() {
      return index => {
        return this.$store.state.user[this.userLike[index].number].length;
      }
    }
  },
  methods: {
    toUser() {
      this.$router.push('/music_main/user/' + this.$store.state.user.userInfo.user_id);
    },
    logOut() {
      this.$store.commit('removeUser');
      localStorage.removeItem('music_token');
    },
    ToUser(index) {
      this.$router.push({path: `/music_main/user/${this.$store.state.user.userInfo.user_id}`, query: {type: this.userLike[index].type}});
    },
    toPlayListsManage() {
      sessionStorage.setItem('manage_user_id', this.$store.state.user.userInfo.user_id);
      window.open('/#/playlists_manage', '_blank');
    }
  }
}
</script>

<style scoped>
  .user-card{
    position: absolute;
    top: 10px;
    transform: translateX(-50%);
    width: 250px;
    background-color: #fff;
    border-radius: var(--default-border-radius);
    box-shadow: 0 0 5px #999;
    z-index: 9;
  }
  .photo{
    width: 100%;
    height: 250px;
    overflow: hidden;
    cursor: pointer;
  }
  .photo img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .user-info,
  .user-space,
  .user-like,
  .sign-out{
    width: 100%;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }
  .user-info{
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .user-like{
    display: flex;
  }
  .user-like .user-like-content{
    flex: 1;
    text-align: center;
    cursor: pointer;
  }
  .user-like .user-like-content p.number{
    font-weight: bold;
  }
  .user-like .user-like-content:hover{
    color: var(--active-color);
  }
  .content{
    padding: 10px;
    cursor: pointer;
  }
  .content .icon{
    margin-right: 10px;
  }
  .content:hover{
    background-color: rgb(245,245,245);
  }
</style>