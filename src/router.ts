import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export enum RouterName {
  defaultPage = "defaultPage",
  startup = "startup",
  editor = "editor",
  authError = "authError",
  register = "register",
  nsSelect = "nsSelect",
  roomView = "roomView",
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
      name: RouterName.defaultPage,
      component: () => import("./components/DefaultPage/index.vue"),
    },
    {
      path: "/index",
      name: RouterName.startup,
      // lazy load
      component: () => import("./pages/Index/index.vue"),
    },
    {
      path: "/editor",
      name: RouterName.editor,
      component: () => import("./pages/Editor/index.vue"),
    },
    {
      path: "/online",
      component: () => import("./pages/Online/index.vue"),
      children: [
        {
          path: "authError",
          name: RouterName.authError,
          component: () => import("@/pages/Online/_exception/auth.vue")
        },
        {
          path: "/",
          name: RouterName.register,
          component: () => import("@/pages/Online/RegisterUser.vue")
        },
        {
          path: "ns", // choosing a namespace to join && play
          name: RouterName.nsSelect,
          component: () => import("@/pages/Online/Namespace/index.vue")
        },
        {
          path: "ns/room",
          name: RouterName.roomView,
          component: () => import("@/pages/Online/Namespace/RoomView.vue")
        }
      ]
    }
  ],
});
