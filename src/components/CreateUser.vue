<template>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation
  >
    <v-text-field
        v-model="form.firstName"
        :counter="10"
        :rules="nameRules"
        label="First Name"
        required
    ></v-text-field>

    <v-text-field
        v-model="form.lastName"
        :rules="nameRules"
        label="Last Name"
        required
    ></v-text-field>

    <v-text-field
        v-model="form.emailId"
        :rules="emailRules"
        label="E-mail"
        required
    ></v-text-field>
    <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="submit"
    >
      Submit
    </v-btn>

    <v-btn
        color="error"
        class="mr-4"
        @click="reset"
    >
      Reset Form
    </v-btn>

  </v-form>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    form: {
      firstName: '',
      lastName: '',
      emailId: '',
    }
  }),

  methods: {
    submit(){
      if(this.$refs.form.validate()){
        axios.post('http://localhost:8080/api/users', this.form)

            .then(() => {
              //Perform Success Action
               this.$router.push('/listUser');
            })
            // eslint-disable-next-line no-unused-vars
            .catch((error) => {
              // error.response.status Check status code
            }).finally(() => {
          //Perform action in always
        });
      }
    },

    reset () {
      this.$refs.form.reset()
    },
  },
  name: "CreateUser"
}
</script>

<style scoped>

</style>