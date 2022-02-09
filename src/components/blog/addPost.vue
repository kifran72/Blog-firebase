<template>
  <q-btn color="green" label="Ajoutez un post" @click="addEvent(event)" />
  <!-- <q-card class="bg-green text-white">
      <q-card-actions>
        <q-btn label="Ajouter une tâche" @click="add = true" flat />
      </q-card-actions>
    </q-card>

    <q-dialog v-model="add">
      <q-card style="width: 500px; max-width: 80vw">
        <q-form @submit="addInlist()" class="q-gutter-md">
          <q-card-section>
            <div class="text-h6">Ajouter une tâche a votre liste</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="q-gutter-y-md column">
              <q-input
                maxlength="25"
                counter
                autogrow
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0 && val !== ' ') ||
                    'Veuillez entrer un titre',
                ]"
                filled
                v-model="item.titre"
                label="Titre"
              />
              <q-input
                autogrow
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0 && val !== ' ') ||
                    'Veuillez entrer un commentaire',
                ]"
                filled
                v-model="item.description"
                label="Description"
              />
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Ajouter" type="submit" color="primary" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog> -->
</template>

<style></style>

<script>
import { useQuasar } from "quasar";

export default {
  name: "AddPost",
  props: ["user", "addEvent"],

  data() {
    return {
      event: {
        name: "",
        sport: "",
        user: { uid: "", displayName: "", email: "" },
      },
    };
  },
  setup() {
    const $q = useQuasar();

    return {
      showNotif(message, color, position) {
        $q.notify({
          message: message,
          color: color,
          position: position,
        });
      },
    };
  },
  mounted() {
    this.event.name = "test";
    this.event.sport = "Tennis";
    this.event.user.uid = this.$props.user.uid;
    this.event.user.displayName = this.$props.user.displayName;
    this.event.user.email = this.$props.user.email;
  },
};
</script>
