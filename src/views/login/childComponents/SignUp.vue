<template>
  <div class="sign-up">
    <el-form
        status-icon
        :label-position="labelPosition"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
    >
      <el-form-item label="用户名" prop="name" required>
        <el-input v-model="ruleForm.name" placeholder="3~16个字符"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email" required>
        <div style="display: flex;justify-content: space-between">
          <el-input style="width: 53%" ref="ruleFormEmail" v-model="ruleForm.email" placeholder="填写邮箱，获取验证码"></el-input>
          <el-button 
            style="width: 45%" 
            ref="codeBtn" 
            type="primary" 
            :loading="codeLoading" 
            @click="getCode('ruleForm')"
          >
            获取验证码
          </el-button>
        </div>
      </el-form-item>
      <el-form-item label="验证码" prop="code"  required>
        <el-input v-model="ruleForm.code" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" required prop="password">
        <el-input type="password" v-model="ruleForm.password" placeholder="6~16个字符，区分大小写" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>

    <el-button type="primary"
               @click="submitForm('ruleForm')"
               :loading="btnLoading"
    >立即注册
    </el-button>

  </div>
</template>

<script>
import {getEmailCode} from "@/network/login";

export default {
  name: "SignUp",
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
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error('请输入正确的邮箱格式'));
        }
      }, 500);
    };
    var checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'));
      }
      setTimeout(() => {
        if (value === this.emailCode) {
          callback();
        } else {
          callback(new Error('请输入正确验证码'));
        }
      }, 500);
    };
    var checkPassword = (rule, value, callback) => {
      const passwordReg = /^[\w\W]{6,16}$/
      if (!value) {
        return callback(new Error('密码不能为空'));
      }
      setTimeout(() => {
        if (passwordReg.test(value)) {
          callback();
        } else {
          callback(new Error('密码格式为6~16个字符，区分大小写'));
        }
      }, 500);
    };
    return {
      btnLoading: false,
      codeLoading: false,
      labelPosition: 'top',
      codeTime: 30,
      emailCode: '',
      ruleForm: {
        name: '',
        email: '',
        code: '',
        password: '',
      },
      rules: {
        name: [
          { validator: checkName, trigger: 'blur'}
        ],
        email: [
          { validator: checkEmail, trigger: 'blur'}
        ],
        code: [
          { validator: checkCode, trigger: 'blur'}
        ],
        password: [
          { validator: checkPassword, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    async getECode() {
      try {
        this.emailCode = await getEmailCode(this.ruleForm.email) + '';
      }catch (e) {
        return e;
      }
    },
    getTime() {
      this.$refs.codeBtn.$el.innerHTML = `重新获取(${this.codeTime}s)`;
      setTimeout( () => {
        this.codeTime--;
        if (this.codeTime > 0) {
          this.getTime();
        }else {
          this.codeTime = 30;
          this.$refs.codeBtn.$el.innerHTML = '获取验证码';
          this.codeLoading = false;
        }
      },1000);
    },
    getCode(formName) {
      this.$refs[formName].validateField('email', (valid) => {
        if (valid !== '') {
          return false;
        }else {
          this.codeLoading = true;
          this.getTime();
          this.getECode();
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('ToRegister',this.ruleForm);
        } else {
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>
  .sign-up{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>