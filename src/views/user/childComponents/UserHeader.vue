<template>
  <div class="user-header">

    <!--封面 Start-->
    <div class="header-bg">
      <img ref="userHeaderBg" :src="info.user_bg" alt="用户封面" />
      <!--上传封面 Start-->
      <el-upload
          v-if="isMe"
          class="upload-demo"
          :action="uploadBgAction"
          :data="uploadData"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
      >
        <el-button
            style="background-color: rgba(0,0,0,.5);color: #fff"
            class="update-bg-btn"
        >
          <i class="fa fa-camera fa-fw"></i>&nbsp;<span>点击更改封面图片</span>
        </el-button>
      </el-upload>
      <!--上传封面 End-->
    </div>
    <!--封面 End-->

    <!--用户信息 Start-->
    <div class="info">
      <h1>{{info.user_name}}</h1>
      <div class="detail-content" ref="detailContent">
        <p><span>个性签名：</span>{{info.user_qming}}</p>
      </div>
      <div class="btn">
        <el-button class="text-btn" type="text" @click="showDetailContent">
          <span v-show="!detailIsShow"><i class="fa fa-angle-down fa-fw"></i></span>
          <span v-show="detailIsShow"><i class="fa fa-angle-up fa-fw"></i></span>
          <span style="color: var(--default-i-color)">查看隐藏信息</span>
        </el-button>
        <!--修改信息 Start-->
        <el-button v-if="isMe" class="update-info" @click="showDialogVisible(); getUser()">
          <i class="fa fa-edit fa-fw"></i>&nbsp;<span>修改个人资料</span>
        </el-button>
        <!--修改信息 Start-->
      </div>
    </div>
    <!--用户信息 End-->

    <!--头像 Start-->
    <div class="user-photo">
      <img :src="info.user_photo" alt="用户头像" />
    </div>
    <!--头像 End-->

    <el-dialog
        title="修改个人信息"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose"
    >
      <el-form
          status-icon
          label-width="80px"
          :label-position="labelPosition"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
      >
        <div class="updatePhoto">
          <el-image
              style="width: 100px; height: 100px; border-radius: var(--default-border-radius)"
              :src="info.user_photo"
              :fit="fit"
          >
          </el-image>
          <el-upload
              v-if="isMe"
              class="upload-demo"
              :action="uploadPhotoAction"
              :data="uploadData"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarPhotoSuccess"
          >
            <el-button style="margin-left: 20px">上传头像</el-button>
          </el-upload>
        </div>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name" placeholder="3~16个字符"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="请输入手机号码(不是必须)"></el-input>
        </el-form-item>
        <el-form-item label="个性签名" prop="qming">
          <el-input v-model="ruleForm.qming" placeholder="最多20字符(不是必须)"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100px;" type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button style="width: 100px;" @click="resetForm">撤销修改</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
  </div>
</template>

<script>
import {getAllUserInfo} from "@/network/user";
import {updateAlUserInfo} from "@/network/user";

export default {
  name: "UserHeader",
  data() {
    var checkName = (rule, value, callback) => {
      const nameReg = /^[\w\W]{3,16}$/
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }
      setTimeout(() => {
        if (nameReg.test(value)) {
          callback();
        } else {
          callback(new Error('用户名格式3~16个字符'));
        }
      }, 500);
    };
    return {
      fit: 'cover',
      labelPosition: 'left',
      detailIsShow: false,
      dialogVisible: false,
      fileType: ['image/jpeg','image/jpg','image/gif','image/png'],
      allUserInfo: {},
      ruleForm: {
        name: '',
        phone: null,
        qming: '',
      },
      rules: {
        name: [
          { validator: checkName, trigger: 'blur'}
        ],
        qming: [
          { min: 0, max: 20, message: '长度最大为20字符', trigger: 'blur' }
        ]
      },
    }
  },
  props: {
    info: {
      type: Object,
      default() {
        return {};
      },
    }
  },
  computed: {
    uploadPhotoAction() {
      return this.$store.state.BASEURL + '/update_user_photo';
    },
    uploadBgAction() {
      return this.$store.state.BASEURL + '/update_user_bg';
    },
    uploadData() {
      return {
        'user_id': this.$store.state.user.userInfo.user_id,
      }
    },
    isMe() {
      return this.info.user_id === this.$store.state.user.userInfo.user_id;
    }
  },
  methods: {
    async getUser() {
      try {
        let res = (await getAllUserInfo(this.$store.state.user.userInfo.user_id))[0];
        this.allUserInfo = res;
        this.ruleForm.name = res.user_name;
        this.ruleForm.phone = res.user_phone;
        this.ruleForm.qming = res.user_qming;
      }catch (e) {
        return e;
      }
    },
    async updateInfo() {
      try {
        let res = (await updateAlUserInfo({
          'user_id': this.$store.state.user.userInfo.user_id,
          'user_name': this.ruleForm.name,
          'user_phone': this.ruleForm.phone,
          'user_qming': this.ruleForm.qming,
          'user_photo': this.info.user_photo.match(/\/user_upload_photo.*/)[0],
        }))[0];
        if (res.status) {
          await this.$toasted.show(res.message);
          await (
              {
                user_name: this.$store.state.user.userInfo.user_name,
                user_photo: this.$store.state.user.userInfo.user_photo,
                user_token: this.$store.state.user.userInfo.user_token
              } = res
          );
          await this.$emit('updateUserInfo', {
            user_name: res.user_name,
            user_photo: res.user_photo,
            user_qming: res.user_qming,
          });
          this.dialogVisible = false;
        }else {
          this.$message.error(res.message);
        }
      }catch (e) {
        return e;
      }
    },
    showDialogVisible() {
      this.dialogVisible = true;
    },
    showDetailContent() {
      if (this.detailIsShow) {
        this.$refs.detailContent.style.height = "0";
      }else {
        this.$refs.detailContent.style.height = "25px";
      }
      this.detailIsShow = !this.detailIsShow;
    },
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
    handleAvatarSuccess(response) {
      let res = response[0];
      if (res.status) {
        this.$toasted.show(res.message);
        this.$emit('updateBg', res.user_bg);
      }else {
        this.$message.error(res.message);
      }
    },
    handleAvatarPhotoSuccess(response) {
      let res = response[0];
      if (res.status) {
        this.$toasted.show(res.message);
        this.$emit('updatePhoto', res.user_photo);
        this.$store.state.user.userInfo.user_photo = res.user_photo;
      }else {
        this.$message.error(res.message);
      }
    },
    handleClose(done) {
      this.$confirm('确定关闭?').then(
          () => done()
      ).catch(
          () => {}
      );
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateInfo();
        } else {
          return false;
        }
      });
    },
    resetForm() {
      if (Object.keys(this.allUserInfo).length) {
        this.ruleForm.name = this.allUserInfo.user_name;
        this.ruleForm.phone = this.allUserInfo.user_phone;
        this.ruleForm.qming = this.allUserInfo.user_qming;
      }
    }
  }
}
</script>

<style scoped>
  .user-header{
    width: 100%;
    margin-top: 20px;
    border-radius: var(--default-border-radius);
    box-shadow: 0 0 10px var(--default-border-color);
    position: relative;
    overflow: hidden;
  }
  .header-bg{
    width: 100%;
    height: 250px;
    background-color: rgb(250,250,250);
    position: relative;
  }
  .header-bg img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .update-bg-btn{
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .update-bg-btn i{
    color: #fff;
  }
  .info{
    width: 100%;
    padding: 0 20px 10px 158px;
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: flex-start;
  }
  .info .detail-content{
    width: 100%;
    height: 0;
    overflow: hidden;
    transition: height .25s ease-in-out;
  }
  .info .btn{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
  }
  .updatePhoto{
    width: 100%;
    height: 100px;
    margin-bottom: 20px;
    display: flex;
    align-items: flex-end;
  }
  .user-photo{
    position: absolute;
    left: 10px;
    top: 186px;
    width: 128px;
    height: 128px;
    background-color: #fff;
    border: 4px solid #eee;
    border-radius: var(--default-border-radius);
    z-index: 9;
  }

</style>