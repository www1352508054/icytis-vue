<template>
  <div style="width: 100%; height: 100vh; background-color: darkslateblue; overflow: hidden">
    <div style="width: 400px; margin: 150px auto">
      <div style="color: #cccccc; font-size: 30px; text-align: center; padding: 30px 0">欢迎注册</div>
      <el-form ref="form" :model="form" size="normal" :rules="rules">
        <el-form-item prop="username">
          <el-input :prefix-icon="User" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input :prefix-icon="Lock" v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item prop="confirm">
          <el-input :prefix-icon="Lock" v-model="form.confirm" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" @click="confirm" type="primary">确定</el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Avatar, Lock, User } from "@element-plus/icons-vue";
import request from "@/utils/request";

export default {
  name: "Register",
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
        ],
        confirm: [
          { required: true, message: '请确认密码', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    confirm(){
      if (this.form.password !== this.form.confirm){
        this.$message({
          type: "error",
          message: "2次输入的密码不一致"
        })
        return
      }

      this.$refs['form'].validate((valid) => {
        if (valid) {
          request.post("/api/user/register", this.form).then(res => {
            if (res.code === "200"){
              this.$message({
                type: "success",
                message: "注册成功",
              })
              this.$router.push("/login") // 登录成功后进行页面跳转
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
    cancel(){
      this.$router.push("/login")
    }
  }
}


</script>

<style scoped>

</style>