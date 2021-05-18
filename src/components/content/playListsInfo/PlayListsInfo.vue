<template>
  <div class="play-lists-info">
    <ul>
      <li v-for="(item,index) in playListsInfos"
          :key="index"
      >
        <div class="play-lists-poster">
          <img :src="item.play_lists_poster" alt="专辑封面">
        </div>
        <div class="play-lists-title">
          <p :title="item.play_lists_title" @click="ToPlayListsDetail(index)">{{item.play_lists_title}}</p>
        </div>
        <div class="state">
          <el-button
              style="width: 100px"
              v-show="!isCollected(index)"
              slot="reference"
              @click="collectPlayLists(index)"
          >收藏
          </el-button>

          <el-button
              style="width: 100px"
              v-show="isCollected(index)"
              slot="reference"
              @click="cancelCollectPlayLists(index)"
          >取消收藏
          </el-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PlayListsInfo",
  props: {
    playListsInfos: {
      type: Array,
      default() {
        return [];
      }
    },
  },
  watch: {
    playListsInfos: {
      deep: true,
      handler(newVal) {
        this.playListsInfos = newVal
      }
    }
  },
  computed: {
    isCollected() {
      return index => {
        return this.$store.state.user.playListsUserLike.some(value => value === this.playListsInfos[index].play_lists_id);
      }
    }
  },
  methods: {
    ToPlayListsDetail(index) {
      this.$router.push('/music_main/playlists_detail/' + this.playListsInfos[index].play_lists_id);
    },
    collectPlayLists(index) {
      this.$store.dispatch('likePlayListsIsAdd', {
        'play_lists_id': this.playListsInfos[index].play_lists_id,
        'this': this,
      });
    },
    cancelCollectPlayLists(index) {
      this.$store.dispatch('likePlayListsIsDec', {
        'play_lists_id': this.playListsInfos[index].play_lists_id,
        'this': this,
      });
    }
  }
}
</script>

<style scoped>
  .play-lists-info{
    width: 100%;
    height: auto;
    position: relative;
  }
  .play-lists-info ul{
    width: 100%;
    height: auto;
  }
  .play-lists-info ul li{
    width: 100%;
    height: 100px;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    display: flex;
  }
  .play-lists-poster{
    width: 80px;
    height: 80px;
  }
  .play-lists-title{
    width: 600px;
    line-height: 80px;
    padding: 0 50px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
  }
  .state{
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>