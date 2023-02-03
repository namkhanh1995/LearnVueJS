import Vue from 'vue'
import Router from 'vue-router'
import CalendarsPage from "@/components/CalendarsPage.vue";
import ListUserCRUD from "@/components/ListUserCRUD.vue";
import CreateCalendarsPage from "@/components/CreateCalendarsPage.vue";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'calendars',
            component: CalendarsPage
        },
        {
            path: '/createCalendars',
            name: 'createCalendars',
            component: CreateCalendarsPage
        },
        {
            path: '/listUserCRUD',
            name: 'listUser',
            component: ListUserCRUD
        }
    ]
})