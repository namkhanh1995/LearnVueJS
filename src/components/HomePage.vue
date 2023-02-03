<template>

  <div id="app">
    <v-toolbar color="blue">
      <router-link to="/"><v-btn class="btn-home">Schedule</v-btn></router-link>
      <router-link to="/createCalendars"><v-btn class="btn-home">Create Schedule</v-btn></router-link>
<!--      <router-link to="/createUser"><v-btn >Create User</v-btn></router-link>-->
      <router-link to="/listUserCRUD"><v-btn class="btn-home">User</v-btn></router-link>
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
.btn-home {
  margin-left: 10px;
}
</style>