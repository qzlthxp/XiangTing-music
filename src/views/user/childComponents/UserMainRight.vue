<template>
  <div class="main-right">
    <h1>{{this.title}}</h1>
    <song-info 
      v-if="type === 'songs' && rightData.length" 
      :song-infos="Infos[defaultPage[type]]"
    >
    </song-info>
    <no-music 
      v-if="type === 'songs' && !rightData.length"
    >
    </no-music>
    
    <singer-info 
      v-if="type === 'singers' && rightData.length" 
      :singer-infos="Infos[defaultPage[type]]"
    >
    </singer-info>
    <no-singer 
      v-if="type === 'singers' && !rightData.length"
    >
    </no-singer>
    
    <play-lists-info 
      v-if="type === 'playLists' && rightData.length" 
      :play-lists-infos="Infos[defaultPage[type]]"
    >
    </play-lists-info>
    <no-collect 
      v-if="type === 'playLists' && !rightData.length"
    >
    </no-collect>

    <play-lists-info 
      v-if="type === 'ownPlayLists' && rightData.length" 
      :play-lists-infos="Infos[defaultPage[type]]"
    >
    </play-lists-info>
    
    <own-info 
      v-if="type === 'own' && rightData" 
      :songs="Infos[defaultPage[type]]" 
      :userInfo="userInfo"
      v-bind="$attrs" 
      v-on="$listeners"
    >
    </own-info>
    <no-collect 
      v-if="type === 'own' && !rightData.length"
    >
    </no-collect>
    
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
import OwnInfo from "@/components/content/ownInfo/OwnInfo";
import {paging} from "@/common/utils";

export default {
  name: "UserMainRight",
  props: {
    userInfo: {
      type: Object,
      default() {
        return {};
      }
    },
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
        'songs': 0,
        'singers': 0,
        'playLists': 0,
        'own': 0,
        'ownPlayLists': 0,
      },
      pageSize: 10,
    }
  },
  computed: {
    title() {
      switch (this.type) {
        case 'songs':
          return '喜欢的歌曲';
        case 'singers':
          return '关注的歌手';
        case 'playLists':
          return '收藏的歌单';
        case 'own':
          return '个人作品';
        case 'ownPlayLists':
          return '创建的歌单'
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
    NoCollect,
    OwnInfo
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
    },
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
