<template>
  <div>
    <el-menu
        style="width: 200px; min-height: calc(100vh - 50px)"
        router
        default-active="user"
        :default-openeds="[1]"
        class="el-menu-vertical-demo">
      <el-sub-menu index="1">
        <template #title><span>系统管理</span></template>
          <el-menu-item index="user">用户管理</el-menu-item>
          <el-menu-item index="app">应用管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title><span>数据管理</span></template>
        <el-menu-item index="data">量化管理</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside"
}

</script>

<style scoped>

</style>