<template>

    <v-app>
<!--      <v-main>-->
<!--        <HomePage></HomePage>-->
<!--      </v-main>-->
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
    </v-app>

</template>

<script>
// import HomePage from "@/components/HomePage.vue";
export default {
  name: 'App',

  components: {
    //HomePage

  },

  data: () => ({
    //
  }),
};
</script>
