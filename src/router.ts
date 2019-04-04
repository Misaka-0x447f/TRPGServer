import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export enum RouterName {
  room = "room"
}

// noinspection JSUnusedGlobalSymbols
export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "*",
      name: "defaultPage",
      component: () => import("./components/DefaultPage/index.vue"),
    },
    {
      path: "/index",
      // lazy load
      component: () => import("./pages/Index/index.vue"),
    },
    {
      path: "/editor",
      component: () => import("./pages/Editor/index.vue"),
    },
    {
      path: "/online",
      component: () => import("./pages/Online/index.vue"),
      children: [
        {
          path: "authError",
          name: "authError",
          component: () => import("@/pages/Online/AuthError/index.vue")
        },
        {
          path: "/",
          component: () => import("@/pages/Online/RegisterUser.vue")
        },
        {
          path: "namespace", // choosing a namespace to join && play
          component: () => import("@/pages/Online/Namespace/index.vue")
        },
        {
          path: "namespace/:ns",
          name: RouterName.room,
          component: () => import("@/pages/Online/Namespace/RoomView.vue")
        }
      ]
    }
  ],
});
