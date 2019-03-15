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
          path: "/",
          component: () => import("@/pages/Online/RegisterUser.vue")
        },
        {
          path: "scope", // choosing a scope to join && play
          component: () => import("@/pages/Online/ScopeSelect/ScopeSelect.vue")
        }
      ]
    }
  ],
});
