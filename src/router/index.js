import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/components/mainGrid/mainGrid.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/viewLinks",
    name: "viewLinks",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/components/Auxilliary/Auxilliary.vue"
      )
  }
];

const router = new VueRouter({
  routes
});

export default router;
