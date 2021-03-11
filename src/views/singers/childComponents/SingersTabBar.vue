<template>
  <div class="singers-tab-bar">
    <!--一级选项（根据首字母） Start-->
    <ul class="tab-bar">
      <li v-for="(item,index) in allInitials"
          :key="index"
          :class="{active: tabIndex === index}"
          @click="getSingerInitial(index)"
      >
        {{item.init}}
      </li>
    </ul>
    <!--一级选项（根据首字母） End-->

    <!--二级选项（根据地区性别和成员） Start-->
    <ul class="detail-bar">
      <li v-for="(item,index) in detailTypes"
          :key="index"
          :class="{active: detailIndex === index}"
          @click="getDetail(index)"
      >
        {{item.name}}
      </li>
    </ul>
    <!--二级选项（根据地区性别和成员） End-->
  </div>
</template>

<script>
export default {
  name: "singersTabBar",
  data() {
    return {
      allInitials: [
        {init: '热门', initial: -1},
        {init: 'A', initial: 'a'},
        {init: 'B', initial: 'b'},
        {init: 'C', initial: 'c'},
        {init: 'D', initial: 'd'},
        {init: 'E', initial: 'e'},
        {init: 'F', initial: 'f'},
        {init: 'G', initial: 'g'},
        {init: 'H', initial: 'h'},
        {init: 'I', initial: 'i'},
        {init: 'J', initial: 'j'},
        {init: 'K', initial: 'k'},
        {init: 'L', initial: 'l'},
        {init: 'M', initial: 'm'},
        {init: 'N', initial: 'n'},
        {init: 'O', initial: 'o'},
        {init: 'P', initial: 'p'},
        {init: 'Q', initial: 'q'},
        {init: 'R', initial: 'r'},
        {init: 'S', initial: 's'},
        {init: 'T', initial: 't'},
        {init: 'U', initial: 'u'},
        {init: 'V', initial: 'v'},
        {init: 'W', initial: 'w'},
        {init: 'X', initial: 'x'},
        {init: 'Y', initial: 'y'},
        {init: 'Z', initial: 'z'},
        {init: '#', initial: '0'},
      ],
      detailTypes: [
        {name: '全部',type: -1,area: -1},
        {name: '华语男歌手', type: 1, area: 7},
        {name: '华语女歌手', type: 2, area: 7},
        {name: '华语组合', type: 3, area: 7},
        {name: '日本男歌手', type: 1, area: 8},
        {name: '日本女歌手', type: 2, area: 8},
        {name: '日本组合', type: 3, area: 8},
        {name: '韩国男歌手', type: 1, area: 16},
        {name: '韩国女歌手', type: 2, area: 16},
        {name: '韩国组合', type: 3, area: 16},
        {name: '欧美男歌手', type: 1, area: 96},
        {name: '欧美女歌手', type: 2, area: 96},
        {name: '欧美组合', type: 3, area: 96},
        {name: '其他', type: -1, area: 0},
      ],
      tabIndex: 0,
      detailIndex: 0,
    }
  },
  methods: {
    //点击获取一级选项 并通过$emit发生给父组件实现父子组件通信
    getSingerInitial(index) {
      this.tabIndex = index;
      this.$emit('changeInitials', this.allInitials[index].initial);
    },
    //点击获取二级选项 并通过$emit发生给父组件实现父子组件通信
    getDetail(index) {
      this.detailIndex = index;
      this.$emit('changeDetailType', {
        type: this.detailTypes[index].type,
        area: this.detailTypes[index].area,
      });
    },
  }
}
</script>

<style scoped>
  .singers-tab-bar{
    width: 100%;
    height: auto;
    padding: 0 var(--default-padding);
    position: relative;
  }
  .singers-tab-bar .tab-bar,
  .singers-tab-bar .detail-bar{
    width: 100%;
    display: flex;
    flex-flow: row wrap;
  }
  .tab-bar li,
  .detail-bar li{
    min-width: 56px;
    height: 28px;
    margin: 5px 0;
    padding: 0 5px;
    border-radius: 14px;
    font-size: 1.2rem;
    text-align: center;
    line-height: 28px;
    cursor: pointer;
  }
  .detail-bar li{
    width: auto;
    padding: 0 10px;
  }
  .tab-bar li:hover,
  .detail-bar li:hover{
    background-color: var(--active-color);
    color: #fff;
  }
  li.active{
    background-color: var(--active-color);
    color: #fff;
  }
</style>