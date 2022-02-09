<template>
  <q-layout view="hHh Lpr lff">
    <Header :user="user" :changeDrawerState="changeDrawerState" />
    <Drawer :user="user" :drawerState="drawerState" />

    <q-page-container>
      <router-view />
      <q-page-scroller
        position="bottom-right"
        :scroll-offset="150"
        :offset="[18, 18]"
      >
        <q-btn fab icon="keyboard_arrow_up" color="primary" />
      </q-page-scroller>
    </q-page-container>
  </q-layout>
</template>

<script>
import Header from "./components/templates/header";
import Drawer from "./components/templates/drawer";
import { auth, onAuthStateChanged } from "./utils/auth/google";

export default {
  name: "App",
  components: { Header, Drawer },
  methods: {
    changeDrawerState() {
      localStorage.setItem("drawerState", !this.drawerState);
      this.drawerState = !this.drawerState;
      this.$root.$emit("drawerStateChanged", !this.drawerState);
      console.log(JSON.parse(localStorage.getItem("drawerState")));
    },
  },
  data() {
    return {
      user: null,
    };
  },
  setup() {
    return {
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75,
      },

      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "9px",
        opacity: 0.2,
      },
      drawerState: false,
    };
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      } else {
        // User is signed out
        this.user = null;
      }
    });
  },
};
</script>
