<template>
  <div class="singer-detail-header" v-if="Object.keys(detailInfo).length">
    <div class="singer-photo">
      <img :src="detailInfo.artist.cover" alt="歌手图片" />
    </div>
    <div class="singer-info-content">
      <h3 class="singer-name">{{detailInfo.artist.name}}</h3>
      <p>
        <span>歌曲：</span><span>{{detailInfo.artist.musicSize}}首、</span>
        <span>专辑：</span><span>{{detailInfo.artist.albumSize}}张、</span>
        <span>MV：</span><span>{{detailInfo.artist.mvSize}}</span>
      </p>
      <div class="briefDesc">
        <span>{{singerInfo}}</span>
        <span class="more" ref="showMore" @click="showDetail">更多</span>
        <span v-show="showDetailInfo" ref="detailInfo" class="detail-info">{{detailInfo.artist.briefDesc}}</span>
      </div>
      <div class="follow-btn">
        <button v-show="!SingerIsUserLike" class="addFollow" @click="addLikeSinger">+ 关注</button>
        <button v-show="SingerIsUserLike" class="remFollow" @click="removeLikeSinger">取消关注</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingerDetailHeader",
  data() {
    return {
      isFollowing: false,
      showDetailInfo: false,
    }
  },
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    //对歌手信息介绍进行裁剪 不全部展示
    singerInfo() {
      return this.detailInfo.artist.briefDesc.length ? this.detailInfo.artist.briefDesc.slice(0,60) + '...' : '';
    },
    SingerIsUserLike() {
      return this.$store.state.user.singerUserLike.length ? this.$store.state.user.singerUserLike.some(value => `${value}` === this.$route.params.singer_id) : false;
    }
  },
  mounted() {
    window.addEventListener('click', this.closeDetail);
  },
  methods: {
    //打开歌手信息简介折叠部分
    showDetail() {
      this.showDetailInfo = true;
    },
    //关闭折叠部分
    closeDetail(e) {
      if (this.showDetailInfo && e.target !== this.$refs.showMore) {
        this.showDetailInfo = this.$refs.detailInfo.contains(e.target);
      }
    },
    addLikeSinger() {
      if (!this.$store.state.user.userInfo.user_token) {
        this.$bus.$emit('show-notice', '登陆后可关注歌手');
      }else {
        this.$store.dispatch('likeSingerIsAdd', {
          'singer_id': this.$route.params.singer_id * 1,
          'this': this,
        });
      }
    },
    removeLikeSinger() {
      this.$store.dispatch('likeSingerIsDec', {
        'singer_id': this.$route.params.singer_id * 1,
        'this': this,
      });
    }
  },
  beforeDestroy() {
    window.removeEventListener('click', this.closeDetail);
  }
}
</script>

<style scoped>
  .singer-detail-header {
    width: 100%;
    height: 300px;
    padding: 25px 120px;
    background-color: rgb(245,245,245);
    display: flex;
    align-items: center;
  }
  .singer-photo{
    width: 250px;
    height: 250px;
    border-radius: 100%;
    overflow: hidden;
  }
  .singer-info-content{
    width: calc(100% - 250px);
    height: 100%;
    padding-left: 50px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: flex-start;
  }
  .singer-info-content .singer-name{
    font-size: 3rem;
  }
  .singer-info-content .briefDesc{
    width: 100%;
    position: relative;
  }
  .singer-info-content .briefDesc .more{
    color: var(--active-color);
    cursor: pointer;
  }
  .singer-info-content .briefDesc .detail-info{
    position: absolute;
    top: 100%;
    right: 0;
    width: 550px;
    max-height: 300px;
    padding: 10px;
    background-color: #ffffff;
    border-radius: var(--default-border-radius);
    box-shadow: 0 0 10px var(--default-border-color);
    overflow: auto;
    z-index: 9;
  }
  .follow-btn{
    width: 200px;
    height: 50px;
    overflow: hidden;
  }
  .follow-btn button{
    width: 100%;
    height: 100%;
    border: none;
    border-radius: var(--default-border-radius);
    font-size: 1.5rem;
    cursor: pointer;
    outline: none;
  }
  button.addFollow{
    background-color: var(--active-color);
    color: #ffffff;
  }
  button.remFollow{
    border: 1px solid var(--active-color);
    color: var(--active-color);
    background-color: transparent;
  }
</style>