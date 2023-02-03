<template>
  <div>
    <v-sheet
        tile
        height="54"
        class="d-flex"
    >
      <v-btn
          icon
          class="ma-2"
          @click="$refs.calendar.prev()"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-select
          v-model="type"
          :items="types"
          dense
          outlined
          hide-details
          class="ma-2"
          label="type"
      ></v-select>
      <v-select
          v-model="mode"
          :items="modes"
          dense
          outlined
          hide-details
          label="event-overlap-mode"
          class="ma-2"
      ></v-select>
      <v-select
          v-model="weekday"
          :items="weekdays"
          dense
          outlined
          hide-details
          label="weekdays"
          class="ma-2"
      ></v-select>
      <v-spacer></v-spacer>
      <v-btn
          icon
          class="ma-2"
          @click="$refs.calendar.next()"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
          ref="calendar"
          v-model="value"
          :weekdays="weekday"
          :type="type"
          :events="events"
          :event-overlap-mode="mode"
          :event-overlap-threshold="30"
          :event-color="getEventColor"
          @change="getEvents"
      ></v-calendar>
    </v-sheet>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    type: 'month',
    types: ['month', 'week', 'day', '4day'],
    mode: 'stack',
    modes: ['stack', 'column'],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
      { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
      { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
      { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
    ],
    value: '',
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    listSchedule: [{
      id : 0,
      eventName : '',
      firstTimestamp : '',
      secondTimestamp : ''
    }]
  }),
  created() {
    // this.getSchedule()
  },
  methods: {
    async getSchedule(){
      await axios.get(`http://localhost:8080/api/schedule`)
          .then(response => {
            // let events = []
            // for(let i = 0; i< response.data.length; i++){
            //
            //   events.push({
            //     name: this.listSchedule[i].eventName,
            //     start: new Date(this.listSchedule[i].firstTimestamp),
            //     end: new Date(this.listSchedule[i].secondTimestamp),
            //     color: 'blue',
            //     // để hiện thị giờ
            //     timed: true,
            //   })
            // }
            // this.events = events
            this.listSchedule = response.data
            let events = []
            for(let i = 0; i< response.data.length; i++){
              events.push({
                name: this.listSchedule[i].eventName,
                start: new Date(this.listSchedule[i].firstTimestamp),
                end: new Date(this.listSchedule[i].secondTimestamp),
                color: 'blue',
                // để hiện thị giờ
                timed: true,
              });
            }
            this.events = events
            // this.getEvents(this.listSchedule)
          }).catch(e => {
        this.errors.push(e)
      })
    },
    getEvents () {
      this.getSchedule()
      // const events = []
      // let test = JSON.parse(JSON.stringify(this.listSchedule))
      // console.log(test)
      // console.log(this.listSchedule)
      // get ngày đầu tháng
      // const min = new Date(`${start.date}T00:00:00`)
      // console.log(min)
      // // get ngày cuối tháng
      // const max = new Date(`${end.date}T23:59:59`)

      // số ngày trong tháng
      // const days = (max.getTime() - min.getTime()) / 86400000

      // random mock data


      // milisecond
      // const firstTimestamp = this.rnd(min.getTime(), max.getTime())
      // date first
      // console.log(firstTimestamp);
      // const first = new Date(1676679961222)
      // milisecond
      // const secondTimestamp = this.rnd(2, 3) * 900000
      // console.log(secondTimestamp);
      // date second
      // const second = new Date(1800000)

    },

    // getEvents(){
    //   const events = []
    //   const min = new Date(`${start.date}T00:00:00`)
    //   console.log()
    //   events.push({
    //               name: 'Meeting',
    //               // start: first,
    //               // end: second,
    //               color: 'blue',
    //               // timed: !allDay,
    //             })
    //   this.events = events
    // },
    getEventColor (event) {
      return event.color
    },
    // rnd (a, b) {
    //   return Math.floor((b - a + 1) * Math.random()) + a
    // },
  },

  name: "CalendarsPage"
}
</script>

<style scoped>

</style>