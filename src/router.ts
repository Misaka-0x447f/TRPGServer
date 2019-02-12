import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

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
      name: "index",
      // lazy load
      component: () => import("./pages/Index/index.vue"),
    },
    {
      path: "/editor",
      name: "editor",
      component: () => import("./pages/Editor/index.vue"),
    },
    {
      path: "/online",
      name: "online",
      component: () => import("./pages/Online/index.vue")
    }
  ],
});
