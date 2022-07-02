<template>
  <div style="width: 100%; height: 100vh; background-color: darkslateblue; overflow: hidden">
    <div style="width: 400px; margin: 150px auto">
      <div style="color: #cccccc; font-size: 30px; text-align: center; padding: 30px 0">欢迎登录</div>
      <el-form ref="form" :model="form" size="normal" :rules="rules">
        <el-form-item prop="username">
          <el-input :prefix-icon="User" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input :prefix-icon="Lock" v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" @click="login" type="primary">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script>
import { Avatar, Lock, User } from "@element-plus/icons-vue";
import request from "@/utils/request";

export default {

  name: "Login",
  setup(){
    return {
      Avatar,
      Lock,
      User
    }
  },
  data() {
    return {
      form: {},
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      }
    }
  },
  methods:{
    login() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          request.post("/api/user/login", this.form).then(res => {
            if (res.code === "200"){
              this.$message({
                type: "success",
                message: "登录成功",
              })
              sessionStorage.setItem("user", JSON.stringify(res.data)) // 缓存用户信息
              sessionStorage.setItem("nickName", JSON.stringify(res.data.nickName))
              this.$router.push("/") // 登录成功后进行页面跳转
            } else {
              this.$message({
                type: "error",
                message: res.message,
              })
            }
          })
        }
      })
    },
    register() {
      this.$router.push("/register")
    }
  }
}
</script>

<style scoped>

</style>