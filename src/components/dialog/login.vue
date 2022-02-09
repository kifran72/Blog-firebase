<template>
  <q-btn stretch flat label="Connexion" @click="openLogin()" />
  <q-dialog v-model="modifyModal">
    <q-card style="width: 500px; max-width: 80vw">
      <q-form @submit="loginEmail()" class="q-gutter-md">
        <q-card-section>
          <div class="text-h6 flex flex-center">Connectez vous avec google</div>
        </q-card-section>
        <q-card-section align="center">
          <q-btn autogrow label="Connexion" color="green" @click="login()" />
        </q-card-section>
        <q-separator inset="item" />
        <q-card-section>
          <div class="text-h6 flex flex-center">
            Connectez avec vos identifiants
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-gutter-y-md column">
            <q-input
              maxlength="60"
              counter
              autogrow
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0 && val !== ' ') ||
                  'Veuillez entrer un email',
              ]"
              filled
              v-model="user.email"
              label="Email"
            />

            <q-input
              v-model="user.password"
              filled
              :type="isPwd ? 'password' : 'text'"
              label="Mot de passe"
              autogrow
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0 && val !== ' ') ||
                  'Veuillez entrer un mot de passe',
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
          <q-card-section align="center">
            <q-btn autogrow label="Connexion" type="submit" color="green" />
          </q-card-section>
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { login } from "../../utils/auth/google";

export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
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
    openLogin() {
      this.modifyModal = true;
    },
    loginEmail() {},
    async login() {
      const googleLogin = await login();
      if (googleLogin) {
        this.modifyModal = false;
        this.showNotif(
          "Bonjour " + googleLogin.user.displayName + " !",
          "green",
          "bottom-right"
        );
      }
    },
  },
};
</script>
