<template>
  <div class="editor-container">
    <div class="content">
      <div class="main-info">
        <div class="updatePoster">
          <el-image
            style="
              width: 200px;
              height: 200px;
              border-radius: var(--default-border-radius);
              border: 1px solid var(--default-border-color)"
            :src="form.poster"
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
            <el-button style="margin-left: 20px">更新封面</el-button>
          </el-upload>
        </div>
        <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
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
              v-model="form.introduce"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="设为私有">
            <el-switch v-model="form.private"></el-switch>
          </el-form-item>
        </el-form>
        <hr>
        <el-row>
          <el-popconfirm
            title="这是一段内容确定删除吗？"
            @confirm="handleDelAll"
          >
            <el-button slot="reference">删除选中</el-button>
          </el-popconfirm>
        </el-row>
        <el-table
          ref="multipleTable"
          :data="editorSongs"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column
            prop="name"
            label="歌名"
            width="300"
          >
          </el-table-column>
          <el-table-column 
            label="歌手"
            width="300"
          >
            <template slot-scope="scope">
              <span v-for="(item, index) in scope.row.ar" :key="index">
                {{ item.name }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @confirm="handleDelete(scope.$index, scope.row)"
              >
                <el-button size="mini" type="danger" slot="reference"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="btns">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交修改</el-button
        >
        <el-button @click="resetForm()">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayListsEditor',
  props: {
    editorInfo: {
      type: Object,
      default() {
        return {}
      },
    },
    editorSongs: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      fileType: ['image/jpeg', 'image/jpg', 'image/gif', 'image/png'],
      posterInfo: {},
      multipleSelection: [],
      form: {
        title: this.editorInfo.play_lists_title || '',
        introduce: this.editorInfo.play_lists_introduce || '',
        poster: this.editorInfo.play_lists_poster || '',
        private: Boolean(this.editorInfo.private) || false,
      },
      rules: {
        title: [
          { required: true, message: '请输入歌单标题', trigger: 'blur' },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur',
          },
        ],
        introduce: [
          { required: true, message: '请输入歌单简介', trigger: 'blur' },
          {
            min: 3,
            max: 250,
            message: '长度在 3 到 250 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  computed: {
    uploadData() {
      return {
        user_id: sessionStorage.getItem('music_user_id'),
        publishTime: Date.now(),
      }
    },
  },
  methods: {
    beforeAvatarUpload(file) {
      const isAllowType = this.fileType.some((value) => value === file.type)
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isAllowType) {
        this.$message.error('只能上传JPG,JPEG,GIF格式文件')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isAllowType && isLt2M
    },
    handleAvatarPosterSuccess(response) {
      this.form.poster = response.showPath
      console.log(response)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDelete(index, row) {
      let ids = []
      ids.push(row.id)
      this.$emit('delete-song-of-play-lists', ids)
    },
    handleDelAll() {
      let ids = []
      this.multipleSelection.forEach((value) => {
        ids.push(value.id)
      })
      this.$emit('delete-song-of-play-lists', ids)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const obj = {
            play_lists_id: this.editorInfo.play_lists_id,
            play_lists_title: this.form.title,
            play_lists_introduce: this.form.introduce
          }
          if (this.form.private) {
            obj.private = 1
          }else {
            obj.private = 0
          }
          if (!Object.keys(this.posterInfo).length) {
            obj.poster = this.form.poster.match(/(\/user_upload.*)/g)[0]
          } else {
            obj.poster = this.posterInfo.path
          }
          this.$emit('update-play-lists-info', obj)
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.$emit('closeEditor')
    },
  },
}
</script>

<style scoped>
.editor-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--default-border-color);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  width: 800px;
  height: 600px;
  background-color: #fff;
  border-radius: var(--default-border-radius);
  box-shadow: 0 0 10px var(--default-border-color);
  overflow: hidden;
}
.main-info {
  width: 100%;
  height: 500px;
  padding: 20px;
  overflow-y: auto;
}
.updatePoster {
  display: flex;
  align-items: flex-end;
  width: 100%;
  margin-bottom: 25px;
}
.btns {
  height: 100px;
  line-height: 100px;
  text-align: center;
}
</style>
