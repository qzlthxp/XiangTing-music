<template>
  <div class="lrc-detail-right">
    <header>
      <h1 class="song-name">{{ songInfo.name }}</h1>
      <p class="art-name">
        <span
          v-for="(item, index) in songInfo.ar"
          :key="index"
          @click="toSingerDetail(item.id)"
        >
          {{ item.name }}
        </span>
      </p>
      <div class="ep-info">
        <p>
          <span>专辑：</span>
          <span class="al-name" @click="toEpDetail(songInfo.al.id)">
            {{ songInfo.al.name }}
          </span>
        </p>
        <p class="publish-time">
          <span>发行日期：</span>
          <span>{{ issueDate(epInfo) }}</span>
        </p>
      </div>
      <div class="btn">
        <button class="play" @click="playThis">
          <span><i class="fa fa-play"></i></span>
          <span style="margin-left: 10px">播放</span>
        </button>

        <button class="add" @click="addThis">
          <span><i class="fa fa-plus"></i></span>
          <span style="margin-left: 10px">加入歌单</span>
        </button>

        <button class="share" @click="shareThis" ref="shareBtn">
          <span style="position: relative;z-index: -1"
            ><i class="fa fa-share fa-fw"></i
          ></span>
          <span style="position: relative;z-index: -1">分享</span>
          <div class="share-box" ref="shareBox" v-show="showShareBox">
            <p>复制链接进行分享</p>
            <div class="content">
              <input
                ref="pathInput"
                style="height: 35px;font-size:1.2rem; padding: 0 10px; border: none;background: #eee"
                type="text"
                :value="fullPath"
              />
              <el-button
                style="height: 35px;display: flex;justify-content: center;align-items:center"
                icon="el-icon-document-copy"
                @click="copyPath"
              ></el-button>
            </div>
          </div>
        </button>
      </div>
    </header>
  </div>
</template>

<script>
import { formatDate } from '@/common/utils'

export default {
  name: 'LrcDetailRight',
  props: {
    songInfo: {
      type: Object,
      default() {
        return {}
      },
    },
    epInfo: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      showShareBox: false,
    }
  },
  computed: {
    issueDate() {
      return (data) => {
        return formatDate(data.publishTime)
      }
    },
    fullPath() {
      return 'http://47.116.70.173:3000/#' + this.$route.fullPath
    },
  },
  mounted() {
    window.addEventListener('click', this.closeShareBox)
  },
  methods: {
    toSingerDetail(id) {
      this.$router.push('/music_main/singer_detail/' + id + '/careful_chose')
    },
    toEpDetail(id) {
      this.$router.push('/music_main/ep_detail/' + id)
    },
    playThis() {
      this.$emit('playThis')
    },
    addThis() {
      this.$emit('addThis')
    },
    shareThis() {
      this.showShareBox = true
    },
    copyPath() {
      this.$refs.pathInput.select()
      document.execCommand('Copy')
      this.$toasted.show('复制成功!')
    },
    closeShareBox(e) {
      if (this.showShareBox && e.target !== this.$refs.shareBtn) {
        if (this.$refs.shareBox.contains) {
          this.showShareBox = this.$refs.shareBox.contains(e.target)
        }
      }
    },
  },
}
</script>

<style scoped>
.lrc-detail-right {
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
}
.song-name {
  font-size: 4rem;
}
.art-name {
  font-size: 2rem;
  margin: calc(var(--default-margin) / 4) 0;
  color: #666;
}
.art-name span:hover {
  color: var(--active-color);
  cursor: pointer;
}
.ep-info {
  width: 100%;
  display: flex;
  font-size: 1.5rem;
  margin-bottom: 25px;
}
.ep-info .al-name:hover {
  color: var(--active-color);
  cursor: pointer;
}
.ep-info .publish-time {
  margin-left: var(--default-margin);
}
.play,
.add,
.share {
  min-width: 100px;
  margin-right: 25px;
  padding: 5px 10px;
  border: none;
  background-color: var(--active-color);
  border-radius: var(--default-border-radius);
  outline: none;
  position: relative;
}
.play span,
.play i {
  color: #fff;
}
.add {
  background-color: #fff;
  border: 1px solid var(--active-color);
}
.share {
  border: 1px solid var(--active-color);
  background-color: unset;
}
.add span,
.add i,
.share span,
.share i {
  color: var(--active-color);
}
.share-box {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -120%);
  padding: 10px;
  font-size: 0.6rem;
  background-color: #fff;
  box-shadow: 0 0 10px #eee;
}
.share-box .content {
  display: flex;
  margin-top: 10px;
}
</style>
