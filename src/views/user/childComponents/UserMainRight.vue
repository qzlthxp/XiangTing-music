<template>
  <div class="main-right">
    <h1>{{this.title}}</h1>
    <song-info v-show="type === 'song' && rightData.length" :song-infos="Infos[defaultPage[type]]"></song-info>
    <no-music v-show="type === 'song' && !rightData.length"></no-music>
    <singer-info v-show="type === 'singer' && rightData.length" :singer-infos="Infos[defaultPage[type]]"></singer-info>
    <no-singer v-show="type === 'singer' && !rightData.length"></no-singer>
    <play-lists-info v-show="type === 'playLists' && rightData.length" :play-lists-infos="Infos[defaultPage[type]]"></play-lists-info>
    <no-collect v-show="type === 'playLists' && !rightData.length"></no-collect>
    <div class="pagination">
      <el-pagination
          background
          class="pagination"
          v-show="rightData.length"
          :current-page="currentPage"
          :page-size="pageSize"
          :pager-count="7"
          layout="total, prev, pager, next, jumper"
          :total="rightData.length"
          @prev-click="prevClick"
          @next-click="nextClick"
          @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import NoMusic from "@/components/content/noRes/NoMusic";
import NoSinger from "@/components/content/noRes/NoSinger";
import NoCollect from "@/components/content/noRes/NoCollect";
import SongInfo from "@/components/content/songInfo/SongInfo";
import SingerInfo from "@/components/content/singerInfo/SingerInfo";
import PlayListsInfo from "@/components/content/playListsInfo/PlayListsInfo";
import {paging} from "@/common/utils";

export default {
  name: "UserMainRight",
  props: {
    type: {
      type: String,
      default: '',
    },
    rightData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      defaultPage: {
        'song': 0,
        'singer': 0,
        'playLists': 0,
      },
      pageSize: 10,
    }
  },
  computed: {
    title() {
      switch (this.type) {
        case 'song':
          return '歌曲';
        case 'singer':
          return '歌手';
        case 'playLists':
          return '歌单';
          default:
            return '';
      }
    },
    Infos() {
      return paging(this.rightData, this.pageSize);
    },
    currentPage() {
      return this.defaultPage[this.type] + 1;
    }
  },
  components: {
    SongInfo,
    SingerInfo,
    PlayListsInfo,
    NoMusic,
    NoSinger,
    NoCollect
  },
  methods: {
    handleCurrentChange(val) {
      this.defaultPage[this.type] = val - 1;
    },
    prevClick(val) {
      this.defaultPage[this.type] = val - 1;
    },
    nextClick(val) {
      this.defaultPage[this.type] = val - 1;
    }
  }
}
</script>

<style scoped>
  .main-right{
    width: 100%;
    height: auto;
    padding: 10px;
    border-radius: var(--default-border-radius);
    overflow: hidden;
  }
  .pagination{
    width: 100%;
    height: auto;
    margin: 25px 0 0;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
</style>
