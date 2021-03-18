<template>
  <div class="create">
    <div class="content">
      <div class="updatePoster">
        <el-image
            style="
              width: 200px;
              height: 200px;
              border-radius: var(--default-border-radius);
              border: 1px solid var(--default-border-color)"
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
      <el-form ref="ruleForm" :model="form" :rules="rules"  label-width="80px">
        <el-form-item label="歌单标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="歌单简介" prop="introduce">
          <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              maxlength="250"
              show-word-limit
              v-model="form.introduce">
          </el-input>
        </el-form-item>
        <el-form-item label="是否公开">
          <el-switch v-model="form.private"></el-switch>
        </el-form-item>
        <el-form-item label="选择分类">
          <div v-for="(item,index) in cate" :key="index">
            <p style="font-weight: bold">{{item.play_lists_main_cate_name}}</p>
            <ul>
              <el-checkbox-group
                  v-model="checkedCate"
                  :min="0"
                  :max="3"
              >
                <el-checkbox
                    v-for="(item, index) in item.secCate"
                    :key="index"
                    :label="item.play_lists_detail_cate_id"
                >
                  {{item.play_lists_detail_cate_name}}
                </el-checkbox>
              </el-checkbox-group>
            </ul>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Create",
  props: {
    cate: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      fileType: ['image/jpeg','image/jpg','image/gif','image/png'],
      posterInfo: {},
      checkedCate: [],
      form: {
        title: '',
        introduce: '',
        private: false,
      },
      rules: {
        title: [
          { required: true, message: '请输入歌单标题', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '请输入歌单简介', trigger: 'blur' },
          { min: 3, max: 250, message: '长度在 3 到 250 个字符', trigger: 'blur' }
        ],
      }
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = {
            user_id: sessionStorage.getItem('manage_user_id'),
            play_lists_detail_cate_ids: this.checkedCate,
            title: this.form.title,
            introduce: this.form.introduce,
            poster: this.posterInfo.path,
            publishTime: Date.now(),
            private: this.form.private ? 1 : 0,
          };
          this.$emit('createPlayLists', obj);
        } else {
          return false;
        }
        this.$refs[formName].resetFields();
        this.posterInfo = {};
        this.checkedCate = [];
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.posterInfo = {};
      this.checkedCate = [];
      this.$emit('closeCreate');
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
    margin-bottom: 25px;
  }
</style>