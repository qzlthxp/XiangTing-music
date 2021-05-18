<template>
  <div v-show="showSelectPlayLists" class="select-play-lists">
    <div class="container">
      <header>
        <p>
          <span>你选择了</span>
          <span>{{ids.length}}</span>
          <span>首歌曲添加到</span>
        </p>
        <p>请选择</p>
        <i class="fa fa-close fa-fw fa-lg close" @click="close"></i>
      </header>
      <div class="content">
        <el-radio-group
            style="width: 100%"
            v-model="radio"
        >
          <el-radio
              class="radio"
              v-for="(item,index) in playLists"
              :key="index"
              :label="item.play_lists_id"
          >
            <p class="play-lists-info">
              <span class="title" :title="item.play_lists_title">{{item.play_lists_title}}</span>
              <span class="count" :title="item.songCount">{{item.songCount}}</span>
            </p>
          </el-radio>
        </el-radio-group>
      </div>
      <div class="low">
        <el-button style="width: 80%" @click="toManage">创建新的歌单</el-button>
      </div>
      <div class="lower">
        <el-button style="width: 150px;height: 40px" type="primary" @click="add">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {getAllPlayLists} from "@/network/playlistsManage";
import {addSong} from "@/network/selectPlayLists";

export default {
  name: "SelectPlayLists",
  data() {
    return {
      radio: '',
      ids: [],
      playLists: [],
      showSelectPlayLists: false,
    }
  },
  watch: {
    '$store.state.user.userInfo': {
      deep: true,
      handler(newVal) {
        this.getPlayLists(newVal.user_id);
      }
    },
    playLists: {
      deep: true,
      handler(newVal) {
        this.playLists = newVal;
      }
    }
  },
  created() {
    this.getPlayLists(this.$store.state.user.userInfo.user_id);
  },
  mounted() {
    this.$bus.$on('openSelectPlayLists', (songs) => {
      this.showSelectPlayLists = true;
      this.ids = songs;
    });
  },
  methods: {
    async getPlayLists(id) {
      try {
        this.playLists = (await getAllPlayLists(id)).playLists;
      }catch (e) {
        return e;
      }
    },
    async addSongs(obj) {
      try {
        let res = await addSong(obj);
        if (res.success) {
          await this.getPlayLists(this.$store.state.user.userInfo.user_id);
        }
        this.$toasted.show(res.message);
      }catch (e) {
        return e;
      }
    },
    toManage() {
      this.close();
      window.open('/#/playlists_manage', '_blank');
    },
    add() {
      if (this.radio && this.ids.length) {
        let obj = {
          play_lists_id: this.radio,
          ids: this.ids
        };
        this.addSongs(obj);
      }
    },
    close() {
      this.showSelectPlayLists = false;
    }
  },
  beforeDestroy() {
    this.radio = null;
    this.ids = null;
    this.playLists = null;
  }
}
</script>

<style scoped>
  .select-play-lists{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
  }
  .container{
    width: 420px;
    height: 520px;
    background-color: #fff;
    border-radius: var(--default-border-radius);
    display: flex;
    flex-direction: column;
  }
  .container header{
    width: 100%;
    height: 75px;
    border-bottom: 1px solid var(--default-border-color);
    position: relative;
  }
  .container header p:nth-of-type(1){
    padding: 15px 0 10px;
    font-size: 1.2rem;
    font-weight: normal;
    text-align: center;
  }
  .container header p:nth-of-type(2){
    color: #666;
    text-align: center;
  }
  .close{
    position: absolute;
    top: 15px;
    right: 10px;
  }
  .close:hover{
    color: var(--active-color);
  }
  .content{
    flex: 1;
    overflow: auto;
    position: relative;
    z-index: 9;
  }
  .radio{
    width: 100%;
    padding: 15px 25px;
    display: flex;
  }
  .radio .play-lists-info{
    display: flex;
    justify-content: space-between;
  }
  .radio .play-lists-info .title,
  .radio .play-lists-info .count{
    display: inline-block;
    width: 300px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .radio .play-lists-info .count{
    width: 50px;
  }
  .low{
    width: 100%;
    height: 60px;
    padding: 10px 0;
    text-align: center;
  }
  .lower{
    width: 100%;
    height: 100px;
    border-top: 1px solid var(--default-border-color);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>