<template>
  <div class="rank-list">
    <div class="left" v-if="list.length">
      <rank-list-left :list="list"></rank-list-left>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
import RankListLeft from "@/views/rankList/childComponents/RankListLeft";
import {getTopList} from "@/network/rankList";

export default {
  name: "RankList",
  data() {
    return {
      list: [],
    }
  },
  components: {
    RankListLeft
  },
  created() {
    this.getRank();
  },
  methods: {
    async getRank() {
      try {
        this.list = (await getTopList()).list.slice(0,4);
      }catch (e) {
        return e;
      }
    },
  }
}
</script>

<style scoped>
  .rank-list{
    width: 100%;
    padding: 130px var(--default-padding);
    display: flex;
    position: relative;
  }
  .left{
    width: 250px;
  }
  .right{
    width: calc(100% - 250px);
    padding-left: 50px;
  }

</style>