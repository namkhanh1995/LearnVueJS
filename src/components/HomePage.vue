<template>

  <div id="app">
    <v-toolbar  color="blue">
      <router-link to="/"><v-btn>Home</v-btn></router-link>
<!--      <router-link to="/listUser"><v-btn >List User</v-btn></router-link>-->
<!--      <router-link to="/createUser"><v-btn >Create User</v-btn></router-link>-->
      <router-link to="/listUserCRUD"><v-btn >User</v-btn></router-link>
    </v-toolbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "HomePage"
}
</script>

<style scoped>

</style>