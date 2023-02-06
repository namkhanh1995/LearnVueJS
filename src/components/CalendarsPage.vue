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
          @click:event="showEvent"
          @click:date="showDialog"
      ></v-calendar>
      <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x>
        <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
        >
          <v-toolbar
              :color="selectedEvent.color"
              dark
          >
            <v-btn icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-icon>mdi-clock-start</v-icon>
            <span v-html="selectedEvent.start"></span>
            <v-spacer></v-spacer>
            <v-icon>mdi-clock-end</v-icon>
            <span v-html="selectedEvent.end"></span>
          </v-card-text>
          <v-card-actions>
            <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
            >
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-sheet>

    <v-dialog
        v-model="dialog"
        max-width="500px">
      <v-card color="grey lighten-4"
              min-width="350px"
              flat>
<!--        <CreateCalendarsPage :modelValue="selectedDate"></CreateCalendarsPage>-->
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
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
// import CreateCalendarsPage from "@/components/CreateCalendarsPage.vue";

export default {
  // components: {CreateCalendarsPage},

  data: () => ({
    calendars : {
      id:0,
      eventName:'',
      firstTimestamp:0,
      secondTimestamp:0
    },
    selectedDate : null,
    selectedOpen: false,
    selectedEvent: {},
    selectedElement: null,
    dialog:false,
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
    }],
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
            // add giờ vn
            //let offset = 7
            this.listSchedule = response.data
            let events = []
            for(let i = 0; i< response.data.length; i++){
              events.push({
                name: this.listSchedule[i].eventName,
                //start: new Date(this.listSchedule[i].firstTimestamp + (3600000*offset)),
                //end: new Date(this.listSchedule[i].secondTimestamp + (3600000*offset)),
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


    showEvent({ nativeEvent, event }){
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        // requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        this.selectedOpen = true
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        open()
        // requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      // nativeEvent.stopPropagation()

    },
    showDialog(event){
      this.selectedDate = event.date
      this.calendars.firstTimestamp = event.date+"T00:00"
      this.calendars.secondTimestamp = event.date+"T00:00"
      this.dialog = true

    },
    insertCalendars(){
      this.calendars.firstTimestamp = new Date(this.calendars.firstTimestamp).getTime();
      this.calendars.secondTimestamp = new Date(this.calendars.secondTimestamp).getTime();
      axios.post('http://localhost:8080/api/schedule', this.calendars)

          .then(() => {
            //Perform Success Action
            this.getSchedule()
            this.dialog = false

          })
          // eslint-disable-next-line no-unused-vars
          .catch((error) => {
            // error.response.status Check status code
          }).finally(() => {
        //Perform action in always
      });
    },
    test(){
      console.log("ok")
    }


  },
  name: "CalendarsPage"
}
</script>

<style scoped>

</style>