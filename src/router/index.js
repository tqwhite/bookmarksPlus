import Vue from "vue";
import VueRouter from "vue-router";

import MainGrid from "@/components/mainGrid/mainGrid.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "mainGrid",
    component: MainGrid
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
