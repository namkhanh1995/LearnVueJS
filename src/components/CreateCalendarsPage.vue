<template>
  <v-form>
    <v-container>
      <v-text-field
          v-model="calendars.id"
          type="text"
          label="User ID"
      ></v-text-field>
      <v-text-field
          v-model="calendars.eventName"
          type="text"
          label="Event Name"
      ></v-text-field>
      <v-text-field
          v-model="calendars.firstTimestamp"
          type="datetime-local"
          label="Start schedule"
      ></v-text-field>
      <v-text-field
          v-model="calendars.secondTimestamp"
          type="datetime-local"
          label="End schedule"
      ></v-text-field>
      <v-btn
          color="success"
          class="mr-4"
          @click="insertCalendars"
      >
        Save
      </v-btn>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  data:()=>({
    calendars : {
      id:0,
      eventName:'',
      firstTimestamp:0,
      secondTimestamp:0
    }
}),
  mounted() {
    this.calendars.firstTimestamp = new Date().toISOString().substring(0, 16);
    this.calendars.secondTimestamp = new Date().toISOString().substring(0, 16);
  },
  methods:{
    insertCalendars(){
      this.calendars.firstTimestamp = new Date(this.calendars.firstTimestamp).getTime();
      this.calendars.secondTimestamp = new Date(this.calendars.secondTimestamp).getTime();
      axios.post('http://localhost:8080/api/schedule', this.calendars)

          .then(() => {
            //Perform Success Action
            this.$router.push("/")
          })
          // eslint-disable-next-line no-unused-vars
          .catch((error) => {
            // error.response.status Check status code
          }).finally(() => {
        //Perform action in always
      });
    }
  },
  name: "CreateCalendarsPage"
}
</script>

<style scoped>

</style>