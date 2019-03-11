<template>
    <div class="login">
        <div class="login-wrapper">
            <h2 class="title">
                <i class="el-icon-setting"></i>
                欢迎登陆华联超市管理系统
            </h2>
            <!-- 表单 -->
            <el-form 
            :model="loginForm" 
            status-icon 
            :rules="rules" 
            ref="loginForm" 
            label-width="100px" 
            class="demo-ruleForm">
                <!-- 账号 -->
                <el-form-item label="账号" prop="account">
                    <el-input type="text" v-model="loginForm.account" autocomplete="off"></el-input>
                </el-form-item>

                <!-- 密码 -->
                <el-form-item label="密码" prop="password">
                    <el-input type="text" v-model="loginForm.password" autocomplete="off"></el-input>
                </el-form-item>

                <!-- 确认密码 -->
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="text" v-model="loginForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>

                <!-- 提交按钮 -->
                <el-form-item>                    
                    <el-button round type="primary" @click="submitForm('loginForm')">登录</el-button>
                    <el-button round @click="resetForm('loginForm')">重置</el-button>
                </el-form-item> 
            </el-form>

        </div>


    </div>
</template>

<script>
export default {
  data() {
    // 自定义验证密码
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 3 || value.length > 5) {
        callback(new Error("密码长度为3~5个字符"));
      } else {
        if (this.loginForm.checkPass !== "") {
          this.$refs.loginForm.validateField("checkPass");
        }
        callback();
      }
    };

    // 再次验证密码
    const checkPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.loginForm.password) {
        callback(new Error("两次密码不一样"));
      } else {
        callback();
      }
    };

    // 整个表单的数据
    return {
      loginForm: {
        account: "",
        password: "",
        checkPass: ""
      },
      // 表单的验证
      rules: {
        // 账号验证
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],

        // 验证密码
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],

        // 再次验证密码
        checkPass: [{ required: true, validator: checkPwd, trigger: "blur" }]
      }
    };
  },

  methods: {
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        // 手机账号和密码
        const parms = {
            account:this.loginForm.account,
            password:this.loginForm.password,
        }

        this.$router.push('/index')
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>


<style lang="less">
//  引入首页样式
@import "./Login.less";
</style> 