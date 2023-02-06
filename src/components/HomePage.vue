<template>

  <div id="app">

    <v-navigation-drawer app>
      <router-link to="/"><v-btn class="btn-home">Schedule</v-btn></router-link>
      <router-link to="/createCalendars"><v-btn class="btn-home">Create Schedule</v-btn></router-link>
      <router-link to="/listUserCRUD"><v-btn class="btn-home">User</v-btn></router-link>
    </v-navigation-drawer>
    <v-app-bar>

    </v-app-bar>
    <v-main>
      <v-container fluid>

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer app>
      <!-- -->
    </v-footer>
<!--    <v-toolbar color="blue">-->
<!--      <router-link to="/"><v-btn class="btn-home">Schedule</v-btn></router-link>-->
<!--      <router-link to="/createCalendars"><v-btn class="btn-home">Create Schedule</v-btn></router-link>-->
<!--&lt;!&ndash;      <router-link to="/createUser"><v-btn >Create User</v-btn></router-link>&ndash;&gt;-->
<!--      <router-link to="/listUserCRUD"><v-btn class="btn-home">User</v-btn></router-link>-->
<!--    </v-toolbar>-->
<!--    <router-view></router-view>-->
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