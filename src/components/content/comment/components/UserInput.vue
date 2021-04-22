<template>
  <div class="box">
    <div class="container">
      <div class="left">
        <img
          v-show="$store.state.user.userInfo.user_token"
          :src="$store.state.user.userInfo.user_photo"
          alt="用户头像"
        />
        <img
          v-show="!$store.state.user.userInfo.user_token"
          src="../../../../assets/image/public/photo.png"
          alt=""
        />
      </div>
      <div class="right">
        <el-input
          style="width: 80%;outline:none"
          type="textarea"
          resize="none"
          :rows="3"
          maxlength="250"
          show-word-limit
          :placeholder="placeholder"
          v-model="textarea"
        >
        </el-input>
        <el-button
          style="width: 74.4px;height: 74.4px;background-color: var(--active-color);border: none;display: flex;justify-content: cneter;align-items: center;white-space: pre-wrap;"
          type="primary"
          @click="publish"
          >发表评论</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInput',
  props: {
    placeholder: {
      type: String,
      default: '发表一条友善的评论',
    },
  },
  data() {
    return {
      textarea: '',
    }
  },
  methods: {
    publish() {
      if (!this.$store.state.user.userInfo.user_token) {
        this.$bus.$emit('show-notice', '登陆后可评论')
        return false
      }
      if (!this.textarea || !this.textarea.trim()) {
        this.$toasted.show('你还没有评论！')
        return false
      }
      this.$emit('publishComment', this.textarea)
      this.textarea = ''
    },
  },
}
</script>

<style scoped>
.container {
  width: 100%;
  height: auto;
  padding: 25px 0;
  display: flex;
  overflow-x: hidden;
}
.container .left {
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.container .left img {
  width: 74.4px;
  height: 74.4px;
  border-radius: 100%;
  object-fit: cover;
}
.container .right {
  margin-left: 50px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
