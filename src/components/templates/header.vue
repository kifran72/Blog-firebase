<template>
  <q-header elevated>
    <q-toolbar class="bg-black">
      <q-btn
        flat
        @click="changeDrawerState()"
        round
        dense
        icon="menu"
        v-if="screen.name === 'xs'"
      />
      <q-toolbar-title to="/"> My blog</q-toolbar-title>
      <div v-if="!user && screen.name !== 'xs'">
        <Signup />
        <Login />
      </div>
      <div v-if="user && screen.name !== 'xs'">
        <Profil :user="user" clickable />
        <Logout :user="user" />
      </div>

      <!-- <q-separator inset spaced /> -->
      <q-btn
        v-if="dark.isActive"
        icon="brightness_7"
        stretch
        flat
        @click="changeTheme(false)"
      />
      <q-btn
        v-if="!dark.isActive"
        icon="mode_night"
        stretch
        flat
        @click="changeTheme(true)"
      />
    </q-toolbar>
  </q-header>
</template>

<script>
import { useQuasar, Screen } from "quasar";
import { ref } from "vue";
import Login from "../dialog/login.vue";
import Signup from "../dialog/signup.vue";
import Logout from "../dialog/logout.vue";
import Profil from "../dialog/profil.vue";

export default {
  name: "Header",
  props: ["user", "changeDrawerState"],
  setup() {
    const $q = useQuasar();
    $q.dark.set(JSON.parse(localStorage.getItem("dark")));
    return {
      leftDrawerOpen: ref(false),
      dark: $q.dark,
      miniState: ref(true),
      modifyModal: ref(false),
      isPwd: ref(true),
      screen: Screen,
    };
  },
  methods: {
    openLogin() {
      this.modifyModal = true;
    },
    changeTheme(state) {
      localStorage.setItem("dark", state);
      this.dark.set(state);
    },
  },
  components: {
    Login,
    Signup,
    Logout,
    Profil,
  },
};
</script>
