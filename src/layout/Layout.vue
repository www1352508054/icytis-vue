<template>
  <div>
    <!--    头部-->
    <Header/>
    <!--    主体-->
    <div style="display: flex">
      <!--      侧边栏-->
      <Aside/>
      <!--      内容区域-->
      <router-view style="flex: 1"/>
      <!--      <Home/>-->
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Aside from "@/components/Aside";
import Home from "@/views/User"

export default {
  name: "Layout",
  components: {
    Header,
    Aside,
    Home
  }
}
</script>

<style scoped>

</style>