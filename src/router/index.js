import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../components/home.vue"),
  },
  {
    path: "/blog",
    name: "Blog",
    component: () => import("../components/blog/blog.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../components/about.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
