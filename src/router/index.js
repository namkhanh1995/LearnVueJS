import Vue from 'vue'
import Router from 'vue-router'
// import ListUser from "@/components/ListUser.vue";
// import CreateUser from "@/components/CreateUser.vue";
import CalendarsPage from "@/components/CalendarsPage.vue";
import ListUserCRUD from "@/components/ListUserCRUD.vue";

Vue.use(Router)

export default new Router({
    routes: [ // bao gồm danh sách route
        {
            path: '/', ///path của route
            name: 'calendars', // tên route
            component: CalendarsPage // component route sử dụng
        },
        // {
        //     path: '/listUser',
        //     name: 'listUser',
        //     component: ListUser
        // },
        // {
        //     path: '/createUser',
        //     name: 'createUser',
        //     component: CreateUser
        // },
        {
            path: '/listUserCRUD',
            name: 'listUser',
            component: ListUserCRUD
        }
    ]
})