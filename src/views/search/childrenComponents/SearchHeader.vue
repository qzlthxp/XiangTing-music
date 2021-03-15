<template>
  <div class="search-header">
    <div class="img-box">
      <img class="bg" ref="bg" src="https://y.gtimg.cn/mediastyle/yqq/img/bg_singer.jpg" alt="搜索页背景" />
    </div>
    <div class="search-box">
      <div class="search-icon" @click="showSearch">
        <i class="fa fa-search fa-fw" style="color: #999"></i>
      </div>
      <div class="search-input">
        <label for="searchWord">
          <input id="searchWord"
                 type="text"
                 placeholder="Search..."
                 v-model="searchText"
                 @keydown.enter="showSearch"
          >
        </label>
      </div>
      <div class="select">
        <div class="virtual"></div>
        <a class="select-content"
           href="javascript:;"
           @click="showDropDownList"
        >
          <span>{{selectItem[currentItem].name}}</span>
          <span class="select-icon" ref="selectIcon"><i class="fa fa-angle-up fa-lg"></i></span>
        </a>
      </div>
      <div v-show="DropDownListIsShow" class="dropdown-list">
        <ul>
          <li v-for="(item,index) in selectItem"
              :key="index"
              :class="{active: index === currentItem}"
              @click="choseLi(index)"
          >
            <a href="javascript:;">
              {{item.name}}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchHeader",
  data() {
    return {
      DropDownListIsShow: false,
      currentItem: 0,
      searchText: '',
      selectItem: [
        {name: '歌手', type: 100},
        {name: '歌曲', type: 1},
        {name: '专辑', type: 10},
      ]
    }
  },
  watch: {
    $route(to) {
      if (to.query.searchWord) {
        this.searchText = to.query.searchWord;
      }
    }
  },
  created() {
    if (this.$route.query.searchWord) {
      this.searchText = this.$route.query.searchWord;
    }
  },
  methods: {
    showDropDownList() {
      this.DropDownListIsShow = !this.DropDownListIsShow;
      if (this.DropDownListIsShow) {
        this.$refs.selectIcon.style.transform = "rotate(-180deg)";
      }else {
        this.$refs.selectIcon.style.transform = "rotate(0)";
      }
    },
    choseLi(index) {
      this.currentItem = index;
      this.DropDownListIsShow = false;
      this.$refs.selectIcon.style.transform = "rotate(0)";
      this.showSearch();
    },
    showSearch() {
      if (this.searchText) {
        this.$emit('getMore', {
          keywords: this.searchText,
          type: this.selectItem[this.currentItem].type,
        });
      }
    }
  }
}
</script>

<style scoped>
  .search-header{
    width: 100%;
    height: 250px;
    position: relative;
  }
  .img-box{
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bg{
    min-width: 120%;
  }
  .search-box{
    width: 600px;
    height: 64px;
    border-radius: var(--default-border-radius);
    background-color: #fff;
    box-shadow: 0 0 10px var(--default-border-color);
    display: flex;
    position: absolute;
    left: 50%;
    bottom: -32px;
    transform: translateX(-50%);
    z-index: 8;
  }
  .search-icon{
    width: 64px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #searchWord{
    width: 400px;
    height: 64px;
    border: none;
  }
  .select{
    flex: 1;
    display: flex;
    align-items: center;
  }
  .virtual{
    height: 32px;
    width: 32px;
    border-left: 2px solid #999;
  }
  .select-icon{
    display: inline-block;
    transition: .25s cubic-bezier(.19,1,.22,1);
  }
  .select-content{
    width: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .dropdown-list{
    width: 136px;
    height: auto;
    background-color: #fff;
    border-radius: var(--default-border-radius);
    box-shadow: 0 0 10px var(--default-border-color);
    position: absolute;
    right: 0;
    top: 80px;
    z-index: 9;
  }
  .dropdown-list ul{
    width: 100%;
    height: auto;
    padding: 10px 0;
  }
  .dropdown-list ul li{
    padding: 10px;
  }
  .dropdown-list ul li:hover{
    background-color: rgb(247,247,247);
  }
  .dropdown-list ul li.active a{
    color: var(--active-color);
  }
</style>