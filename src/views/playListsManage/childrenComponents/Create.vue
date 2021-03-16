<template>
  <div class="create">
    <div class="content">
      <div class="updatePoster">
        <el-image
            style="width: 200px; height: 200px; border-radius: var(--default-border-radius); border: 1px solid var(--default-border-color)"
            :src="posterInfo.showPath"
        >
        </el-image>
        <el-upload
            class="upload-demo"
            action="http://47.116.70.173:8081/api/upload_poster"
            :data="uploadData"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarPosterSuccess"
        >
          <el-button style="margin-left: 20px">上传封面</el-button>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Create",
  data() {
    return {
      fileType: ['image/jpeg','image/jpg','image/gif','image/png'],
      posterInfo: {},
    }
  },
  computed: {
    uploadData() {
      return {
        'user_id': sessionStorage.getItem('manage_user_id'),
        'publishTime': Date.now(),
      }
    },
  },
  methods: {
    beforeAvatarUpload(file) {
      const isAllowType = this.fileType.some(value => value === file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isAllowType) {
        this.$message.error('只能上传JPG,JPEG,GIF格式文件');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isAllowType && isLt2M;
    },
    handleAvatarPosterSuccess(response) {
      this.posterInfo = response;
    },
  }
}
</script>

<style scoped>
  .create{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content{
    width: 800px;
    height: 600px;
    padding: 20px;
    background-color: #fff;
    border-radius: var(--default-border-radius);
    box-shadow: 0 0 10px var(--default-border-color);
    overflow: auto;
  }
  .updatePoster{
    display: flex;
    align-items: flex-end;
    width: 100%;
  }
</style>