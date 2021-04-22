<template>
  <div class="top-comment">
    <div class="left">
      <img
        @click="$router.push('/music_main/user/' + info.user_id)"
        :src="info.user_photo"
        alt=""
      />
    </div>
    <div class="content">
      <div class="user-info">
        <p>{{ info.user_name }}</p>
      </div>
      <div class="info">
        <p style="font-size: 1.2rem">{{ info.content }}</p>
      </div>
      <div class="select">
        <div class="time" style="margin-right:25px">
          {{ info.publishTime | getDate }}
        </div>
        <div class="like" style="margin-right:25px">
          <i
            v-show="
              !$store.state.user.commentUserLike.some(
                (value) => value === info.id
              )
            "
            class="fa fa-thumbs-o-up fa-fw"
            @click="handleLike('add')"
          ></i>
          <i
            v-show="
              $store.state.user.commentUserLike.some(
                (value) => value === info.id
              )
            "
            class="fa fa-thumbs-up fa-fw"
            style="color: var(--active-color)"
            @click="handleLike('desc')"
          ></i>
          <span>{{ info.like_count }}</span>
        </div>
        <div class="dislike" style="margin-right:25px">
          <i
            v-show="
              !$store.state.user.commentUserDisLike.some(
                (value) => value === info.id
              )
            "
            class="fa fa-thumbs-o-down fa-fw"
            @click="handleDislike('add')"
          ></i>
          <i
            v-show="
              $store.state.user.commentUserDisLike.some(
                (value) => value === info.id
              )
            "
            class="fa fa-thumbs-down fa-fw"
            style="color: var(--active-color)"
            @click="handleDislike('desc')"
          ></i>
        </div>
        <span class="back" style="margin-right:auto" @click="backTopComment"
          >回复</span
        >
        <div
          class="more"
          v-if="info.user_id === $store.state.user.userInfo.user_id"
        >
          <i
            @click="handleShowHideMoreItem"
            class="fa fa-ellipsis-v fa-fw fa-lg"
          ></i>
          <ul class="more-item" v-show="showMoreItem">
            <li>
              <el-popconfirm
                confirm-button-text="删除"
                cancel-button-text="不用了"
                @confirm="handleConfirm"
                @cancel="handleCancel"
                icon="el-icon-info"
                icon-color="red"
                title="确定删除这条评论吗？删除后评论下的所有回复都将被删除。"
              >
                <el-button
                  class="remove"
                  style="width: 100%; border: none;border-radius: 0"
                  slot="reference"
                  >删除</el-button
                >
              </el-popconfirm>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="info.children">
        <div v-for="(item, index) in info.children" :key="index">
          <sec-comment
            v-if="!item.isDelete"
            :secInfo="item"
            :index="index"
            @backSecComment="backSecComment(index)"
            @removeSecComment="removeSecComment(index)"
          ></sec-comment>
        </div>
      </div>
      <user-input
        :placeholder="plaholder"
        v-if="index === currentInputIndex"
        @publishComment="publishBackComment"
      ></user-input>
    </div>
  </div>
</template>

<script>
import UserInput from '@/components/content/comment/components/UserInput'
import SecComment from '@/components/content/comment/components/SecComment'
import { dateFormat } from '@/common/utils'
import { mapMutations } from 'vuex'
import { likeComment, dislikeComment } from '@/network/user/index'
export default {
  name: 'TopComment',
  components: {
    UserInput,
    SecComment,
  },
  props: {
    info: {
      type: Object,
      default() {
        return {}
      },
    },
    index: {
      type: Number,
      defaulte: 0,
    },
    currentInputIndex: {
      type: Number,
      defaulte: null,
    },
  },
  data() {
    return {
      active: false,
      activeDisLike: false,
      showInput: false,
      showMoreItem: false,
      plaholder: '',
    }
  },
  filters: {
    getDate(date) {
      return dateFormat(date)
    },
  },
  methods: {
    ...mapMutations([
      'addLikeComment',
      'addDisLikeComment',
      'removeUserLikeComment',
      'removeUserDisLikeComment',
    ]),
    async handleLikeComment() {
      try {
        await likeComment({
          user_id: this.$store.state.user.userInfo.user_id,
          id: this.info.id,
          updateTime: Date.now(),
        })
      } catch (error) {
        return error
      }
    },
    async handleDisLikeComment() {
      try {
        await dislikeComment({
          user_id: this.$store.state.user.userInfo.user_id,
          id: this.info.id,
          updateTime: Date.now(),
        })
      } catch (error) {
        return error
      }
    },
    backTopComment() {
      this.plaholder = '回复 @' + this.info.user_name + ':'
      this.$emit('backTopComment')
    },
    backSecComment(index) {
      this.plaholder = '回复 @' + this.info.children[index].user_name + ':'
      this.$emit('backSecCom', index)
    },
    publishBackComment(text) {
      this.$emit('publishBack', text)
    },
    removeSecComment(index) {
      this.$emit('removeSecCom', index)
    },
    handleShowHideMoreItem() {
      this.showMoreItem = !this.showMoreItem
    },
    handleLike(type) {
      if (type === 'add') {
        this.addLikeComment(this.info.id)
        this.removeUserDisLikeComment(this.info.id)
        ++this.info.like_count
        this.handleLikeComment()
      }
      if (type === 'desc') {
        this.removeUserLikeComment(this.info.id)
        --this.info.like_count
      }
    },
    handleDislike(type) {
      if (type === 'add') {
        if (
          this.$store.state.user.commentUserLike.some(
            (value) => value === this.info.id
          )
        ) {
          --this.info.like_count
          this.removeUserLikeComment(this.info.id)
        }
        this.addDisLikeComment(this.info.id)
        this.handleDisLikeComment()
      }
      if (type === 'desc') {
        this.removeUserDisLikeComment(this.info.id)
      }
    },
    handleConfirm() {
      this.$emit('removeTopComment')
      this.showMoreItem = false
    },
    handleCancel() {
      this.showMoreItem = false
      return false
    },
  },
}
</script>

<style scoped>
.top-comment {
  width: 100%;
  height: auto;
  padding: 25px 0 0;
  display: flex;
}
.top-comment .left {
  width: 80px;
  height: 80px;
}
.top-comment .left img {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  object-fit: cover;
  cursor: pointer;
}
.content {
  margin-left: 50px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid rgb(229, 233, 239);
}
.content .info {
  width: 100%;
  word-break: break-all;
  white-space: pre-wrap;
}
.content .user-info {
  width: 100%;
  height: 2rem;
  font-weight: bold;
}
.content .select {
  width: 100%;
  height: 2rem;
  color: #999;
  display: flex;
  align-items: center;
}
.content .select .back {
  padding: 5px 10px;
  border-radius: 2px;
  margin-right: auto;
}
.content .select .back:hover {
  cursor: pointer;
  background-color: var(--active-color);
  color: #fff;
}
.content .select .more {
  position: relative;
}
.content .select .more i:hover {
  color: var(--active-color);
}
.content .select .more .more-item {
  position: absolute;
  top: 20px;
  right: 10px;
  width: 120px;
  height: auto;
  padding: 10px 0;
  text-align: center;
  background-color: #fff;
  border-radius: var(--default-border-radius);
  box-shadow: 0 0 10px var(--default-border-color);
}
.content .select .more .more-item .remove:hover {
  background-color: rgba(0, 100, 0, 0.1);
  color: var(--active-color);
}
</style>
