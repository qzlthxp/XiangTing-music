<template>
  <div class="sign-in">

    <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
    >
      <el-form-item prop="email" required>
        <el-input v-model="ruleForm.email" placeholder="邮箱" clearable></el-input>
      </el-form-item>
      <el-form-item prop="password" required>
        <el-input type="password" v-model="ruleForm.password" placeholder="密码"></el-input>
      </el-form-item>
    </el-form>

    <el-button type="primary"
               @click="submitForm('ruleForm')"
               :loading="btnLoading"
    >立即登录
    </el-button>

    <div class="help">
      <a href="javascript:;">忘记密码?</a>
    </div>

  </div>
</template>

<script>

export default {
  name: "SignIn",
  data() {
    return {
      btnLoading: false,
      ruleForm: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ]
      }
    };
  },
  methods: {
    toLogin() {
      this.$emit('ToLogin',{
        'user_email': this.ruleForm.email,
        'user_password': this.ruleForm.password,
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.toLogin();
        } else {
          return false;
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
   .sign-in{
     width: 100%;
     height: 100%;
     display: flex;
     flex-direction: column;
     justify-content: center;
   }
   .help{
     width: 100%;
     margin-top: 20px;
     text-align: right;
   }
  .help a:hover{
     color: #409EFF;
   }
</style>
