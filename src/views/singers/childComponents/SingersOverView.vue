<template>
  <div class="singers-over-view">
    <!--每个歌手显示 Start-->
    <div :class="{box: index < 10,smallBox: index >= 10}"
         v-for="(item,index) in Infos"
         :key="index"
    >
      <img title="点击查看该歌手信息" :src="item.picUrl" @click="goSingerDetail(index)" alt="歌手图片" />
      <span class="singer-name" @click="goSingerDetail(index)">{{item.name}}</span>
    </div>
    <!--每个歌手显示 End-->

  </div>
</template>

<script>
export default {
  name: "SingersOverView",
  props: {
    Infos: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  watch: {
    Infos: {
      deep: true,
      handler(newVal) {
        this.Infos = newVal;
      }
    }
  },
  methods: {
    //跳转到点击歌手详情页
    goSingerDetail(index) {
      let singer_id = this.Infos[index].id;
      this.$router.push('/music_main/singer_detail/' + singer_id + '/careful_chose');
    }
  },
}
</script>

<style scoped>
  .singers-over-view{
    width: 100%;
    height: auto;
    margin: 20px 0 0;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    position: relative;
  }
  .box{
    width: 20%;
    padding-bottom: 20%;
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    align-items: center;
  }
  .box img{
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 60%;
    border-radius: 100%;
  }
  .box .singer-name{
    position: absolute;
    bottom: 20%;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 1.2rem;
  }
  .smallBox{
    width: 20%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .smallBox img{
    width: 60px;
    height: 60px;
    border-radius: 100%;
    object-fit: cover;
    overflow: hidden;
  }
  .smallBox .singer-name{
    display: inline-block;
    flex: 1;
    padding: 0 0 0 25px;
    font-size: 1.2rem;
  }

  img:hover,
  .singer-name:hover{
    color: var(--active-color);
    cursor: pointer;
  }
</style>