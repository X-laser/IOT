<template>
  <div class="login-container">
    <div class="title">{{ require('@/settings.js').title }}</div>
    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="login-form" label-position="left">
      <el-form-item class="login-form-title" label="用户登录" label-width="100%"></el-form-item>
      <el-form-item class="login-form-username" prop="username">
        <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="loginForm.username" @keyup.enter.native="login('loginForm')"></el-input>
      </el-form-item>
      <el-form-item class="login-form-pwd" prop="pwd">
        <el-input type="password" auto-complete="new-password" prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="loginForm.password" @keyup.enter.native="login('loginForm')"></el-input>
      </el-form-item>
      <el-form-item class="login-form-checked-psd">
        <el-checkbox v-model="loginForm.checkedPsd">记住密码</el-checkbox>
      </el-form-item>
      <el-form-item class="login-form-btn">
        <el-button type="primary" :loading="loading" @click="login('loginForm')">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        checkedPsd: false
      },
      loginRules: {
        username: { required: true, message: '用户名不能为空', trigger: 'change' },
        password: { required: true, message: '密码不能为空', trigger: 'change' }
      },
      loading: false
    }
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return false
        this.loading = true
        try {
          await this.$store.dispatch('login', this.loginForm)
        } catch (error) {
          console.log(error)
        }
        this.loading = false
      })
    },
    init () {
      if (window.sessionStorage.getItem('userInfo')) {
        const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
        this.loginForm.username = userInfo.username
        this.loginForm.password = userInfo.password
        this.loginForm.checkedPsd = userInfo.password !== '' ? true : false // eslint-disable-line
      }
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.font-family {
  color: #fff;
  font-size: 24px;
  font-family: Microsoft YaHei;
}
.login-container {
  width: 100%;
  height: 100%;
  background-image: url('~@img/login-bg.png');
  background-size: 100% 100%;
  overflow: hidden;
  .title {
    width: 671px;
    color: #4ADFFE;
    font-size: 46px;
    font-family: AdobeHeitiStd-Regular;
    text-align: center;
    position: absolute;
    right: 196px;
    bottom: 664px;;
  }
  .login-form {
    width: 671px;
    height: 466px;
    background-image: url('~@img/login-form-bg.png');
    background-size: 100% 100%;
    position: absolute;
    right: 196px;
    bottom: 202px;
    .login-form-username, .login-form-pwd, .login-form-btn, .login-form-checked-psd {
      width: 548px;
      margin-left: 62px;
    }
    .login-form-title {
      margin-top: 40px;
      margin-bottom: 46px;
      /deep/ .el-form-item__label {
        color: #4ADFFE;
        font-size: 35px;
        font-family: AdobeHeitiStd-Regular;
        text-align: center;
      }
    }
    .login-form-username, .login-form-pwd {
      margin-bottom: 28px;
      /deep/ .el-input__inner {
        @extend .font-family;
        height: 56px;
        line-height: 56px;
        background-color: rgba(6, 135, 205, 0.3);
        border-color: rgba(11, 161, 248, 1);
        padding-left: 68px;
        &::-webkit-input-placeholder {
          @extend .font-family;
        }
      }
      /deep/ .el-input__icon {
        font-size: 24px;
        color: #4ADFFE;
        margin-top: 4px;
        margin-left: 29px;
      }
      &.is-error {
        /deep/ .el-input__inner {
          border-color: #F56C6C;
        }
      }
    }
    .login-form-pwd {
      margin-bottom: 47px;
    }
    .login-form-checked-psd {
      /deep/ .el-checkbox {
        .el-checkbox__input {
          margin-top: -6px;
        }
        .el-checkbox__inner {
          height: 24px;
          width: 24px;
          background-color: transparent;
          border: 2px solid #0BA1F8;
          &::after {
            left: 8px;
            height: 12px;
            width: 5px;
          }
        }
        .el-checkbox__label {
          color: #fff;
          font-size: 21px;
          font-family: MicrosoftYaHei;
        }
      }
    }
    .login-form-btn {
      /deep/ .el-button--primary {
        height: 59px;
        background-color: #4ADFFE;
        width: 100%;
        span {
          color: #062D53;
          font-size: 29px;
          font-family: Microsoft YaHei;
        }
      }
    }
  }
}
</style>
