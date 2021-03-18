<template>
  <div class="play-lists-header">
    <!--当前分类及排序选项 Start-->
    <div class="chose">
      <div class="chose-info"  @click="handleShowHideCateDetail">
          <span>
            {{choseInfo}}
            <i class="fa fa-angle-up fa-fw" style="transition: .2s linear" ref="choseIcon"></i>
          </span>
      </div>
      <div class="sort">
        <span
            class="music-a"
            v-for="(item,index) in sortItem"
            :key="index"
            :class="{active: index === currentSort}"
            @click="choseSort(index)"
        >
          {{item.name}}
        </span>
      </div>
    </div>
    <!--当前分类及排序选项 End-->

    <!--歌单分类详情 Start-->
    <ul v-show="cateDetailIsShow" class="cate-detail">
      <li v-for="(item,index) in cate" :key="index">
        <p class="top-item">
          <span><i :class="cateIcon[index].class"></i></span>
          <span>{{item.play_lists_main_cate_name}}</span>
        </p>
        <ul class="sec-cate">
          <li class="sec-item"
              :class="{active: currentTopIndex === index && currentSecIndex === key}"
              v-for="(val, key) in item.secCate"
              :key="key"
              @click="choseCate(index,key)"
          >
            {{val.play_lists_detail_cate_name}}
          </li>
        </ul>
      </li>
    </ul>
    <!--歌单分类详情 End-->
  </div>
</template>

<script>
export default {
  name: "PlayListsHeader",
  props: {
    cate: {
      type: Array,
      default() {
        return []
      }
    },
  },
  data() {
    return {
      currentTopIndex: 0,
      currentSecIndex: 0,
      currentSort: 0,
      cateDetailIsShow: false,
      cateIcon: [
        {class: 'fa fa-bookmark fa-fw'},
        {class: 'fa fa-th-large fa-fw'},
        {class: 'fa fa-coffee fa-fw'},
        {class: 'fa fa-smile-o fa-fw'},
        {class: 'fa fa-clock-o fa-fw'},
        {class: 'fa fa-music fa-fw'},
        {class: 'fa fa-language fa-fw'},
      ],
      sortItem: [
        {name: '最热', sort: 'play_number'},
        {name: '最新', sort: 'publishTime'},
      ]
    }
  },
  computed: {
    choseInfo() {
      return this.cate.length ? this.cate[this.currentTopIndex].secCate[this.currentSecIndex].play_lists_detail_cate_name : '';
    }
  },
  methods: {
    handleShowHideCateDetail() {
      this.cateDetailIsShow = !this.cateDetailIsShow;
      if (this.cateDetailIsShow) {
        this.$refs.choseIcon.style.transform = "rotate(180deg)";
      }else {
        this.$refs.choseIcon.style.transform = "rotate(0)";
      }
    },
    choseCate(index, key){
      this.currentTopIndex = index;
      this.currentSecIndex = key;
      if (index === 0 && key === 0) {
        this.$emit('getHot');
      }else{
        this.$emit('getCurrentLists', this.cate[this.currentTopIndex].secCate[this.currentSecIndex].play_lists_detail_cate_id);
      }
      this.cateDetailIsShow = false;
    },
    choseSort(index) {
      this.currentSort = index;
      this.$emit('sortChanged', this.sortItem[index].sort);
    }
  }
}
</script>

<style scoped>
.play-lists-header{
  width: 100%;
  padding: 25px 0 0;
  position: relative;
}
.play-lists-header .chose{
  user-select: none;
  display: flex;
  align-items: flex-end;
}
.play-lists-header .chose .chose-info{
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
}
.play-lists-header .chose .sort{
  padding-left: 25px;
}
.play-lists-header .chose .sort span{
  display: inline-block;
  margin: 0 10px;
  position: relative;
  cursor: pointer;
}
.cate-detail{
  position: absolute;
  top: 70px;
  left: 0;
  width: 600px;
  height: 500px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px var(--default-border-color);
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 9;
}
.top-item{
  margin: 0 0 16px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: default;
}
.top-item i{
  cursor: default;
}
.sec-cate{
  display: flex;
  flex-wrap: wrap;
}
.sec-item{
  width: auto;
  height: auto;
  margin: 0 10px 10px 0;
  padding: 6px 18px;
  background-color: rgb(245,245,245);
  border-radius: 30px;
  font-size: 1rem;
  font-weight: lighter;
  cursor: pointer;
}
.sec-item.active{
  background-color: var(--active-color);
  color: #fff;
}
.sec-item:hover{
  background-color: var(--active-color);
  color: #fff;
}
</style>