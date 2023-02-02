<template>
  <v-data-table
      :headers="headers"
      :items="listUser"
      :items-per-page="5"
      class="elevation-1"
  ></v-data-table>
</template>

<script>


import axios from "axios";

export default {
  name: "ListUser",
  data() {
    return {
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        {text: 'First Name', value: 'firstName'},
        {text: 'Last Name', value: 'lastName'},
        {text: 'Email', value: 'emailId'},
      ],

      listUser: [],
    }
  },
      methods:{
        async getUser(){
          await axios.get(`http://localhost:8080/api/users`)
              .then(response => {
                this.listUser = response.data
              }).catch(e => {
                this.errors.push(e)
              })

        },
  },
  created() {
    this.getUser();
  }
}
</script>

<style scoped>

</style>