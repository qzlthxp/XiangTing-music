<template>
  <div class="comment">
    <div class="total">
      <p>{{ total }}评论</p>
    </div>
    <user-input
      @publishComment="publishComment"
      @changeType="changeType"
    ></user-input>
    <div class="select">
      <span
        v-for="(item, index) in selectInfo"
        :key="item.id"
        :class="{ active: index === selectIndex }"
        @click="changeType(index)"
      >
        {{ item.name }}
      </span>
    </div>
    <div v-if="comments.length">
      <div
        class="comment-content"
        v-for="(item, index) in comments"
        :key="item.id"
      >
        <top-comment
          v-if="!item.isDelete"
          :info="item"
          :index="index"
          :currentInputIndex="currentInputIndex"
          @backTopComment="backTopComment(index)"
          @backSecCom="backSecCom($event, index)"
          @removeTopComment="removeTopComment(index)"
          @removeSecCom="removeSecCom($event, index)"
          @publishBack="publishBack"
        ></top-comment>
      </div>
    </div>
    <div v-show="!comments.length" class="no-content">
      <p>暂无任何评论</p>
    </div>
  </div>
</template>

<script>
import UserInput from '@/components/content/comment/components/UserInput'
import TopComment from '@/components/content/comment/components/TopComment'
import { getAllComments, create, remove } from '@/network/comment/index'
export default {
  name: 'Comment',
  components: {
    UserInput,
    TopComment,
  },
  props: {
    isUserSong: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      total: 0,
      count: 1,
      comments: [],
      text: '',
      selectIndex: 0,
      selectInfo: [
        { id: 1, name: '按热度排序', type: 'hot' },
        { id: 2, name: '按时间排序', type: 'new' },
      ],
      topOrSec: '',
      currentInputIndex: null,
      secIndex: null,
    }
  },
  watch: {
    $route() {
      this.getAll({
        song_id: this.$route.params.song_id,
        type: this.selectInfo[this.selectIndex].type,
      })
    },
    comments: {
      deep: true,
      handler(newVal) {
        this.comments = newVal
      },
    },
  },
  created() {
    this.getAll({
      song_id: this.isUserSong === 'user_song' ? this.$route.params.user_song_id : this.$route.params.song_id,
      type: this.selectInfo[this.selectIndex].type,
    })
  },
  methods: {
    async getAll(obj) {
      try {
        obj.is_user_song = this.isUserSong
        this.comments = await getAllComments(obj)
        this.total = this.comments[0].total
      } catch (e) {
        return e
      }
    },
    async publishComment(text) {
      try {
        let res = await create({
          content: text,
          publishTime: Date.now(),
          user_id: this.$store.state.user.userInfo.user_id,
          song_id: this.isUserSong === 'user_song' ? this.$route.params.user_song_id : this.$route.params.song_id,
          root_comment_id: null,
          to_comment_id: null,
          to_comment_user_name: null,
          is_user_song: this.isUserSong
        })
        if (res.success) {
          res.data.user_photo = this.$store.state.user.userInfo.user_photo
          res.data.user_name = this.$store.state.user.userInfo.user_name
          this.comments.push(res.data)
        }
      } catch (error) {
        return error
      }
    },
    async removeComment(id, type) {
      try {
        await remove({
          updateTime: Date.now(),
          id,
          type,
        })
      } catch (error) {
        return error
      }
    },
    changeType(index) {
      this.selectIndex = index
      this.getAll({
        song_id: this.$route.params.song_id,
        type: this.selectInfo[this.selectIndex].type,
      })
    },
    backTopComment(index) {
      this.topOrSec = 'top'
      this.currentInputIndex = index
    },
    backSecCom($event, topIndex) {
      this.topOrSec = 'sec'
      this.currentInputIndex = topIndex
      this.secIndex = $event
    },
    async publishBack(text) {
      this.text = text
      let root_comment_id = this.comments[this.currentInputIndex].id
      let to_comment_id = null
      let to_comment_user_name = null

      if (this.topOrSec === 'top') {
        let res = await create({
          content: this.text,
          publishTime: Date.now(),
          user_id: this.$store.state.user.userInfo.user_id,
          song_id: this.isUserSong === 'user_song' ? this.$route.params.user_song_id : this.$route.params.song_id,
          root_comment_id,
          to_comment_id,
          to_comment_user_name,
          is_user_song: this.isUserSong
        })
        if (res.success) {
          res.data.user_photo = this.$store.state.user.userInfo.user_photo
          res.data.user_name = this.$store.state.user.userInfo.user_name
          this.comments[this.currentInputIndex].children.push(res.data)
        }
      } else if (this.topOrSec === 'sec') {
        to_comment_id = this.comments[this.currentInputIndex].children[
          this.secIndex
        ].id
        to_comment_user_name = this.comments[this.currentInputIndex].children[
          this.secIndex
        ].user_name
        let res = await create({
          content: this.text,
          publishTime: Date.now(),
          user_id: this.$store.state.user.userInfo.user_id,
          song_id: this.isUserSong === 'user_song' ? this.$route.params.user_song_id : this.$route.params.song_id,
          root_comment_id,
          to_comment_id,
          to_comment_user_name,
          is_user_song: this.isUserSong
        })
        if (res.success) {
          res.data.user_photo = this.$store.state.user.userInfo.user_photo
          res.data.user_name = this.$store.state.user.userInfo.user_name
          this.comments[this.currentInputIndex].children.push(res.data)
        }
      }
    },
    removeSecCom($event, topIndex) {
      this.comments[topIndex].children[$event].isDelete = 1
      this.removeComment(this.comments[topIndex].children[$event].id, 'sec')
    },
    removeAllComment(arr) {
      for (let val of arr) {
        if (val.children && val.children.length) {
          this.removeComment(val.children)
        }
        val.isDelete = 1
      }
    },
    removeTopComment(index) {
      this.removeComment(this.comments[index].id, 'top')
      this.comments[index].isDelete = 1
      let children = this.comments[index].children
      this.removeAllComment(children)
    },
  },
}
</script>

<style scoped>
.comment {
  width: 100%;
  height: auto;
  padding: 25px 0 80px;
}
.total {
  width: 100%;
  height: auto;
  padding: 25px 0 0;
  font-size: 2rem;
  border-top: 1px solid #eee;
}
.comment-content {
  width: 100%;
  height: auto;
}
.no-content {
  width: 100%;
  height: auto;
  padding-top: 50px;
  text-align: center;
  font-size: 1.2rem;
  color: #999;
}
.select {
  width: 100%;
  height: auto;
  border-bottom: 1px solid rgb(229, 233, 239);
  font-size: 1.2rem;
  font-weight: bold;
}
.select span {
  display: inline-block;
  margin-right: 25px;
  margin-bottom: -1px;
  padding-bottom: 0.5rem;
  cursor: pointer;
}
.select span:hover,
.select span.active {
  color: var(--active-color);
  border-bottom: 1px solid var(--active-color);
}
</style>
