<template>
  <q-btn
    stretch
    flat
    label="Déconnexion"
    @click="logout()"
    v-if="user !== 'null'"
  />
</template>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { logout } from "../../utils/auth/google";

export default {
  name: "Logout",
  data() {
    return {
      user: null,
    };
  },
  setup() {
    const $q = useQuasar();

    return {
      modifyModal: ref(false),
      isPwd: ref(true),
      showNotif(message, color, position) {
        $q.notify({
          message: message,
          color: color,
          position: position,
        });
      },
    };
  },
  methods: {
    logout() {
      logout();
      this.showNotif("Déconnecté !", "green", "bottom-right");
    },
  },
  // persist() {

  //   console.log("logged");
  // },
};
</script>
