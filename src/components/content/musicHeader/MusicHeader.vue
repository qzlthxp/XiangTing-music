<template>
  <header>
    <div class="container">
      <!--导航 Start-->
      <ul class="nav">
        <li v-for="(item,index) in navInfo"
            :key="index"
        >
          <a href="javascript:;"
             class="music-a"
             :class="{active: isActive(index)}"
             @click.prevent="redirect(index)"
          >
            {{item.name}}
          </a>
        </li>
      </ul>
      <!--导航 End-->

      <!--搜索 Start-->
      <div class="search">
        <input
            class="search-box"
            type="text"
            placeholder="搜索歌手 / 歌曲 / 专辑"
            v-model.trim="searchText"
        >
        <button class="search-img" @click="textToSearch">
          <i style="color: var(--active-color)" class="fa fa-search"></i>
        </button>
        <div v-show="searchText" class="search-content">
          <section>
            <div class="search-singer">
              <div class="title">歌手</div>
              <div class="content">
                <div class="content-item" v-show="!searchVal.singer.length">
                  <p>暂无数据</p>
                </div>
                <div class="content-item"
                     v-show="searchVal.singer.length"
                     v-for="(item,index) in searchVal.singer"
                     :key="index"
                     @click="toSingerDetail(item.id)"
                >
                  <img class="singer-pic" :src="item.picUrl" alt="歌手图片" />
                  <p class="singer-name">{{item.name}}</p>
                </div>
              </div>
            </div>
            <div class="search-song">
              <div class="title">歌曲</div>
              <div class="content">
                <div class="content-item" v-show="!searchVal.song.length">
                  <p>暂无数据</p>
                </div>
                <div class="content-item"
                     v-show="searchVal.song.length"
                     v-for="(item,index) in searchVal.song"
                     :key="index"
                     @click="toSongDetail(item.id)"
                >
                  <p class="song-name">{{item.name}}&nbsp;-&nbsp;{{item.artists[0].name}}</p>
                </div>
              </div>
            </div>
            <div class="search-ep">
              <div class="title">专辑</div>
              <div class="content">
                <div class="content-item" v-show="!searchVal.ep.length">
                  <p>暂无数据</p>
                </div>
                <div class="content-item"
                     v-show="searchVal.ep.length"
                     v-for="(item,index) in searchVal.ep"
                     :key="index"
                     @click="toEpDetail(item.id)"
                >
                  <img class="ep-pic" :src="item.picUrl" alt="专辑封面" />
                  <p class="ep-name">{{item.name}}&nbsp;-&nbsp;{{item.artists[0].name}}</p>
                </div>
              </div>
            </div>
          </section>
          <loading v-show="loading"></loading>
        </div>
        <div v-show="!searchText" class="search-content">
          <p class="search-hot-title">热门搜索</p>
          <div v-show="searchHot.length">
            <p class="search-hot-item"
               v-for="(item,index) in searchHot"
               :key="index"
               @click="hotWordToSearch(index)"
            >
              <span v-show="index === 0" class="search-hot-num" style="color: #ff5249">{{index + 1}}</span>
              <span v-show="index === 1" class="search-hot-num" style="color: #ff7f29">{{index + 1}}</span>
              <span v-show="index === 2" class="search-hot-num" style="color: #fcc54e">{{index + 1}}</span>
              <span v-show="index > 2" class="search-hot-num">{{index + 1}}</span>
              <span class="search-hot-word">{{item.first}}</span>
            </p>
          </div>
        </div>
      </div>
      <!--搜索 End-->

      <!--用户相关 Start-->
      <div class="right">
        <div class="login-box" @mouseover="showUserInfo">
          <p v-if="!$store.state.user.userInfo.user_token" @click="beginLogin">登录&nbsp;/&nbsp;注册</p>
          <img v-if="$store.state.user.userInfo.user_token" :src="$store.state.user.userInfo.user_photo" alt="用户头像" />
          <user-card v-show="userInfoIsShow && $store.state.user.userInfo.user_token" @mouseleave.native="hideUserInfo"></user-card>
        </div>
        <el-button v-if="!this.$store.state.user.userInfo.user_token" style="background-color: var(--active-color); color: #fff" @click="noLogin">上传单曲<i class="el-icon-upload el-icon--right"></i></el-button>
        <el-upload
            :action="upLoadSongAction"
            v-if="this.$store.state.user.userInfo.user_token"
            class="upload-demo"
            :data="uploadData"
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
        >
          <el-button>上传单曲<i class="el-icon-upload el-icon--right"></i></el-button>
        </el-upload>
      </div>
      <!--用户相关 End-->
    </div>
  </header>
</template>

<script>
import UserCard from "@/components/content/userCard/UserCard";
import Loading from "@/components/common/loading/Loading";
import {searchHot ,searchSingers, searchSongs, searchEps} from "@/network/search";
import {debounce} from "@/common/utils";

export default {
  name: "MusicHeader",
  data() {
    return {
      loading: false,
      userInfoIsShow: false,
      searchVal: {
        singer: [],
        song: [],
        ep: []
      },
      searchHot: [],
      searchText: '',
      color: '',
      uploadSongName: '',
      currentIndex: 0,
      navInfo: [
        {name: '推荐', url: '/music_main/home'},
        {name: '排行榜', url: '/music_main/ranklist'},
        {name: '歌手', url: '/music_main/singer'},
        {name: '分类歌单', url: '/music_main/playlists'},
      ],
      fileType: ['audio/wav','audio/mpeg'],
    }
  },
  watch: {
    searchText: {
      handler(newVal) {
        this.searchText = newVal;
        debounce(this.getSearch(newVal), 500);
      }
    },
  },
  computed: {
    isActive() {
      return index => {
        return this.$route.path.indexOf(this.navInfo[index].url) > -1;
      }
    },
    upLoadSongAction() {
      return this.$store.state.BASEURL + '/upload_user_song';
    },
    uploadData() {
      return {
        user_id : this.$store.state.user.userInfo.user_id,
        song_name: this.uploadSongName,
        publishTime: Date.now(),
      }
    },
  },
  components: {
    UserCard,
    Loading
  },
  created() {
    this.getSearchHot();
  },
  methods: {
    async getSearchHot() {
      try {
        this.searchHot = (await searchHot()).result.hots;
      }catch (e) {
        return e;
      }
    },
    async getSearch(keywords) {
      try {
        this.loading = true;
        this.searchVal.singer = (await searchSingers(keywords)).result.artists;
        this.searchVal.song = (await searchSongs(keywords)).result.songs;
        this.searchVal.ep = (await searchEps(keywords)).result.albums;
        this.loading = false;
      }catch (e) {
        return e;
      }
    },
    showUserInfo() {
      if (Object.keys(this.$store.state.user.userInfo).length){
        this.userInfoIsShow = true;
      }
    },
    hideUserInfo() {
      this.userInfoIsShow = false;
    },
    redirect(index) {
      this.currentIndex = index;
      this.$router.push(this.navInfo[index].url);
    },
    beginLogin() {
      window.open('/#/login');
    },
    noLogin() {
      if (!this.$store.state.user.userInfo.user_token) {
        this.$bus.$emit('show-notice', '登陆后可上传');
      }
    },
    beforeAvatarUpload(file) {
      const isAllowType = this.fileType.some(value => value === file.type);
      this.uploadSongName = file.name.slice(0, file.name.length - 4);
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isAllowType) {
        this.$message.error('只能上传mp3,wav格式的文件');
      }
      if (!isLt5M) {
        this.$message.error('上传歌曲大小不能超过 5MB!');
      }
      return isAllowType && isLt5M;
    },
    handleAvatarSuccess(response) {
      let res = response;
      this.$toasted.show(res.message);
    },
    toSingerDetail(id) {
      this.$router.push('/music_main/singer_detail/' + id + '/careful_chose');
    },
    toSongDetail(id) {
      this.$router.push('/music_main/song_detail/' + id);
    },
    toEpDetail(id) {
      this.$router.push('/music_main/ep_detail/' + id);
    },
    textToSearch() {
      this.$router.push({
        path: '/music_main/search',
        query: {
          searchWord: this.searchText,
        }
      });
    },
    hotWordToSearch(index) {
      this.$router.push({
        path: '/music_main/search',
        query: {
          searchWord: this.searchHot[index].first
        }
      });
    }
  },
}
</script>

<style scoped>
header{
  position: absolute;
  width: 100%;
  height: 80px;
  padding: 10px var(--default-padding);
  z-index: 9;
}
.container{
  width: auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
header ul {
  width: auto;
  height: 100%;
  margin-right: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
}
header ul li{
  width: auto;
  height: 100%;
  white-space: nowrap;
  line-height: 60px;
}
header ul li a{
  margin-right: 15px;
  font-size: 1.5rem;
  position: relative;
}
header ul li a.active{
  font-weight: bold;
}
.search{
  flex: 0 0 281px;
  height: 41px;
  margin: 0 25px;
  background-color: #fff;
  border: 1px solid var(--active-color);
  border-radius: 41px;
  display: flex;
  align-items: center;
  position: relative;
}
.search-box{
  width: 200px;
  height: 100%;
  background-color: transparent;
  margin: 0 20px;
  line-height: 40px;
  border: none;
  overflow: hidden;
}
.search-img{
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  outline: none;
}
.search-box:focus ~ .search-content{
  display: block;
}
.search-content{
  position: absolute;
  top: 50px;
  left: -20%;
  right: -20%;
  min-height: 100px;
  padding: 20px;
  background-color: #fff;
  border-radius: var(--default-border-radius);
  box-shadow: 0 0 10px var(--default-border-color);
  display: none;
  z-index: 9;
  transition: .2s ease-out;
  overflow: hidden;
}
.search-content:hover{
  display: block;
}
.search-hot-item{
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.search-hot-item:hover{
  background-color: rgb(247,247,247);
  cursor: pointer;
}
.search-hot-title{
  font-weight: bold;
}
.search-hot-num{
  width: 20px;
  line-height: 30px;
  font-weight: 400;
}
.search-hot-word{
  flex: 1;
  line-height: 30px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.search-content .search-singer,
.search-content .search-song,
.search-content .search-ep{
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  overflow: hidden;
}
.search-content .search-singer .title,
.search-content .search-song .title,
.search-content .search-ep .title{
  flex: 0 0 50px;
  font-size: 1.5rem;
  font-weight: bold;
}
.search-content .search-singer .content,
.search-content .search-song .content,
.search-content .search-ep .content{
  flex: 1;
}
.search-content .search-singer .content .content-item,
.search-content .search-ep .content .content-item{
  width: 100%;
  margin-bottom: 10px;
  display: flex;
}
.search-content .search-singer .content .content-item:hover,
.search-content .search-song .content .content-item:hover,
.search-content .search-ep .content .content-item:hover{
  background-color: rgb(247,247,247);
  cursor: pointer;
}
.search-content .search-singer .content .content-item .singer-pic,
.search-content .search-ep .content .content-item .ep-pic{
  width: 40px;
  height: 40px;
  margin-right: 25px;
  object-fit: cover;
}
.search-content .search-singer .content .content-item .singer-name,
.search-content .search-song .content .content-item .song-name,
.search-content .search-ep .content .content-item .ep-name{
  line-height: 40px;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.right{
  width: auto;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.right .login-box{
  flex: 0 0 auto;
  display: inline-block;
  margin-right: 25px;
}
.right .login-box:hover p{
  color: var(--active-color);
  cursor: pointer;
}
.right .login-box img{
  width: 46px;
  height: 46px;
  border-radius: 9999px;
  border: 1px solid var(--default-border-color);
  object-fit: cover;
  object-position: center;
  cursor: pointer;
  overflow: hidden;
}
</style>
