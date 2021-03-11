<template>
  <div class="singer-detail-ep">
    <ep-info v-show="eps.length" :eps-info="eps"></ep-info>
  </div>
</template>

<script>
import EpInfo from "@/components/content/epInfo/EpInfo";
import {getAllEp} from "@/network/singerDetailEp";

export default {
  name: "SingerDetailEp",
  data() {
    return {
      eps: [],
    }
  },
  components: {
    EpInfo
  },
  created() {
    this.getEp();
  },
  methods: {
    async getEp() {
      try {
        this.eps = (await getAllEp(this.$route.params.singer_id)).hotAlbums;
      }catch (e) {
        return e;
      }
    }
  }
}
</script>

<style scoped>
  .singer-detail-ep{
    width: 1000px;
    height: auto;
    position: relative;
  }
</style>