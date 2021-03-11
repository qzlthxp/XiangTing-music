<template>
  <div class="singer-info">
    <ul>
      <li v-for="(item,index) in singerInfos"
          :key="index"
      >
        <div class="singer-photo">
          <img :src="item.singer_photo" alt="专辑封面">
        </div>
        <div class="singer-name">
          <p :title="item.singer_name" @click="ToSingerDetail(index)">{{item.singer_name}}</p>
        </div>
        <div class="singer_introduce">
          <p :title="item.singer_info">{{item.singer_info}}</p>
        </div>
        <div class="state">
          <el-button
              style="width: 100px"
              v-show="!isCollected(index)"
              slot="reference"
              @click="follow(index)"
          >关注
          </el-button>

          <el-button
              style="width: 100px"
              v-show="isCollected(index)"
              slot="reference"
              @click="cancelFollow(index)"
            >取消关注
          </el-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SingerInfo",
  props: {
    singerInfos: {
      type: Array,
      default() {
        return [];
      }
    },
  },
  computed: {
    isCollected() {
      return index => {
        return this.$store.state.user.singerUserLike.some(value => value === this.singerInfos[index].singer_id);
      }
    }
  },
  created() {

  },
  methods: {
    ToSingerDetail(index) {
      this.$router.push('/music_main/singer_detail/' + this.singerInfos[index].singer_id +'/careful_chose');
    },
    cancelFollow(index) {
      this.$store.dispatch('likeSingerIsDec', {
        'singer_id': this.singerInfos[index].singer_id,
        'this': this,
      });
    },
    follow(index) {
      this.$store.dispatch('likeSingerIsAdd', {
        'singer_id': this.singerInfos[index].singer_id,
        'this': this,
      });
    }
  }
}
</script>

<style scoped>
  .singer-info{
    width: 100%;
    height: auto;
    position: relative;
  }
  .singer-info ul{
    width: 100%;
    height: auto;
  }
  .singer-info ul li{
    width: 100%;
    height: 100px;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    display: flex;
  }
  .singer-photo{
    width: 80px;
    height: 80px;
  }
  .singer-name{
    width: 150px;
    line-height: 80px;
    text-align: center;
    font-weight: bolder;
    cursor: pointer;
  }
  .singer_introduce{
    width: 500px;
    color: #999;
    line-height: 80px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .state{
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>