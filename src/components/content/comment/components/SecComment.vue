<template>
  <div class="sec-comment">
    <div class="left">
      <img
        @click="$router.push('/music_main/user/' + secInfo.user_id)"
        class="user-photo"
        :src="secInfo.user_photo"
        alt=""
      />
    </div>
    <div class="right">
      <div class="info" style="display: flex;align-items: flex-end">
        <p>
          <span>{{ secInfo.user_name }}</span>
          <span
            v-if="secInfo.to_comment_user_name"
            style="padding: 0 10px;"
          ></span>
          <span v-if="secInfo.to_comment_user_name"
            >回复<span style="color: var(--active-color)"
              >@{{ secInfo.to_comment_user_name }}</span
            ></span
          >
          <span style="padding: 0 10px;"></span>
          <span style=" font-size: 1.2rem">{{ secInfo.content }} </span>
        </p>
      </div>
      <div class="select">
        <div class="time" style="margin-right:25px">
          {{ publishTime(secInfo.publishTime) }}
        </div>
        <div class="like" style="margin-right:25px">
          <i
            v-if="
              !$store.state.user.commentUserLike.some(
                (value) => value === secInfo.id
              )
            "
            class="fa fa-thumbs-o-up fa-fw"
            @click="handleLike('add')"
          ></i>
          <i
            v-if="
              $store.state.user.commentUserLike.some(
                (value) => value === secInfo.id
              )
            "
            class="fa fa-thumbs-up fa-fw"
            style="color: var(--active-color)"
            @click="handleLike('desc')"
          ></i>
          <span>{{ secInfo.like_count }}</span>
        </div>
        <div class="dislike" style="margin-right:25px">
          <i
            v-if="
              !$store.state.user.commentUserDisLike.some(
                (value) => value === secInfo.id
              )
            "
            class="fa fa-thumbs-o-down fa-fw"
            @click="handleDislike('add')"
          ></i>
          <i
            v-if="
              $store.state.user.commentUserDisLike.some(
                (value) => value === secInfo.id
              )
            "
            class="fa fa-thumbs-down fa-fw"
            style="color: var(--active-color)"
            @click="handleDislike('desc')"
          ></i>
        </div>
        <div class="back" style="margin-right:auto" @click="backSecComment()">
          回复
        </div>
        <div
          class="more"
          v-if="secInfo.user_id === $store.state.user.userInfo.user_id"
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
                title="确定删除这条评论吗？"
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
    </div>
  </div>
</template>

<script>
import { dateFormat } from '@/common/utils'
import { mapMutations } from 'vuex'
import { likeComment, dislikeComment } from '@/network/user/index'
export default {
  name: 'SecComment',
  props: {
    secInfo: {
      type: Object,
      default() {
        return {}
      },
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      active: false,
      activeDisLike: false,
      showMoreItem: false,
    }
  },
  computed: {
    publishTime() {
      return data => {
        return dateFormat(data * 1)
      }
    }
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
          id: this.secInfo.id,
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
          id: this.secInfo.id,
          updateTime: Date.now(),
        })
      } catch (error) {
        return error
      }
    },
    backSecComment() {
      this.$emit('backSecComment')
    },
    handleShowHideMoreItem() {
      this.showMoreItem = !this.showMoreItem
    },
    handleLike(type) {
      if (type === 'add') {
        this.addLikeComment(this.secInfo.id)
        this.removeUserDisLikeComment(this.secInfo.id)
        ++this.secInfo.like_count
        this.handleLikeComment()
      }
      if (type === 'desc') {
        this.removeUserLikeComment(this.secInfo.id)
        --this.secInfo.like_count
      }
    },
    handleDislike(type) {
      if (type === 'add') {
        if (
          this.$store.state.user.commentUserLike.some(
            (value) => value === this.secInfo.id
          )
        ) {
          --this.secInfo.like_count
          this.removeUserLikeComment(this.secInfo.id)
        }
        this.addDisLikeComment(this.secInfo.id)
        this.handleDisLikeComment()
      }
      if (type === 'desc') {
        this.removeUserDisLikeComment(this.info.id)
      }
    },
    handleConfirm() {
      this.$emit('removeSecComment')
    },
    handleCancel() {
      this.showMoreItem = false
      return false
    },
  },
}
</script>

<style scoped>
.sec-comment {
  width: 100%;
  height: 100%;
  padding: 25px 0;
  display: flex;
}
.sec-comment .left {
  width: 60px;
  height: 60px;
}
.sec-comment .left img {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  object-fit: cover;
  cursor: pointer;
}
.sec-comment .right {
  margin-left: 50px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.sec-comment .info {
  width: 100%;
  word-break: break-all;
  white-space: pre-wrap;
}
.sec-comment .select {
  width: 100%;
  height: 2rem;
  color: #999;
  display: flex;
  align-items: center;
}
.sec-comment .select .back {
  padding: 5px 10px;
  border-radius: 2px;
}
.sec-comment .select .back:hover {
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
