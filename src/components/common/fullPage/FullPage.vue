<template>
  <div id="full-page" ref="fullPage">
    <div class="container" ref="container">
      <slot name="pages"></slot>
    </div>
    <ul class="pager">
      <li class="pager-item"
          v-for="(item, index) in pageCount"
          :key="index"
          :class="{active: index === currentPage}"
          @click="topPage(index)"
      >
      </li>
    </ul>
  </div>
</template>

<script>
import {debounce, debounceIIFE} from "@/common/utils";

export default {
  name: "FullPage",
  data() {
    return {
      pageCount: 0,
      currentPage: 0,
      isScrolling: false,
    }
  },
  watch: {
    currentPage: {
      deep: false,
      handler(newVal) {
        this.currentPage = newVal;
        this.$bus.$emit('fullPageChanged', newVal);
      }
    }
  },
  mounted() {
    this.initContainer();
    // chrome and ie
    window.addEventListener('mousewheel', debounceIIFE(this.scrollMouse, 500));
    // firefox
    window.addEventListener("DOMMouseScroll", debounceIIFE(this.scrollMouse, 500));
    //resize
    window.addEventListener('resize', debounce(this.initContainer, 500));
  },
  methods: {
    //getHeight
    initContainer() {
      this.isScrolling = false;
      if (this.$refs.container.childElementCount) {
        this.pageCount = this.$refs.container.childElementCount;
        this.$refs.container.style.height = document.documentElement.clientHeight + 'px';
      }
    },
    // 鼠标滚轮事件
    getWheelDelta(event) {
      if (event.wheelDelta) {
        return event.wheelDelta;
      } else {
        // 兼容火狐
        return -event.detail;
      }
    },
    // 鼠标滚动逻辑（全屏滚动关键逻辑）
    scrollMouse(event) {
      if (!this.isScrolling) {
        let delta = this.getWheelDelta(event);
        if (delta < 0) {
          this.isScrolling = true;
          this.goDown();
        }else {
          this.isScrolling = true;
          this.goUp();
        }
      }
    },
    //当前页码增加
    currentPageAdd() {
      this.currentPage += 1;
      if (this.currentPage === this.pageCount - 1) {
        this.currentPage = this.pageCount - 1;
      }
    },
    //当前页码减少
    currentPageDec() {
      this.currentPage -= 1;
      if (this.currentPage === 0) {
        this.currentPage = 0;
      }
    },
    //鼠标往前滚动
    goUp() {
      if (this.$refs.container && this.$refs.container.offsetTop < 0) {
        this.currentPageDec();
        let top = this.$refs.container.offsetTop + this.$refs.container.clientHeight;
        this.$refs.container.style.top = `${top}px`;
        setTimeout( () => {
          this.isScrolling = false;
        }, 510);
      }
    },
    //鼠标往后滚动
    goDown() {
      if (this.$refs.container) {
        let alreadyNum = Math.abs(this.$refs.container.offsetTop / this.$refs.container.clientHeight);
        let childCountNum = this.$refs.container.childElementCount;
        if (alreadyNum + 1 < childCountNum) {
          this.currentPageAdd();
          let top = this.$refs.container.offsetTop - this.$refs.container.clientHeight;
          this.$refs.container.style.top = `${top}px`;
          setTimeout( () => {
            this.isScrolling = false;
          }, 510);
        }
      }
    },
    //通过分页器跳转
    topPage(index) {
      this.isScrolling = true;
      this.currentPage = index;
      this.$refs.container.style.top = `${index * Math.abs(this.$refs.container.clientHeight) * -1}px`;
      setTimeout( () => {
        this.isScrolling = false;
      }, 510);
    }
  },
  beforeDestroy() {
    window.removeEventListener('mousewheel', debounceIIFE(this.scrollMouse, 500));
    // firefox
    window.removeEventListener("DOMMouseScroll", debounceIIFE(this.scrollMouse, 500));
    //resize
    window.removeEventListener('resize', debounce(this.initContainer, 500));
  }
}
</script>

<style scoped>
  #full-page{
    overflow: hidden;
  }
  .container{
    width: 100%;
    position: relative;
    top: 0;
    transition: .5s cubic-bezier(.19,1,.22,1);
  }
  .pager{
    position: fixed;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 9;
  }
  .pager-item{
    width: 5px;
    height: 5px;
    margin: 10px 0;
    border-radius: 100%;
    background-color: #000;
    transition: .5s cubic-bezier(.19,1,.22,1);
    cursor: pointer;
  }
  .pager-item:hover,
  .pager-item.active{
    width: 12px;
    height: 12px;
  }
</style>