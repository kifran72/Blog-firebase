<template>
  <div class="q-pa-md q-gutter-md">
    <h2>Posts</h2>
    <div class="flex flex-center">
      <q-spinner v-if="spinner" color="primary" size="3em" :thickness="2" />
    </div>
    <q-card v-for="post in posts" :key="post.id" class="bg-blue text-white">
      <q-card-section style="max-width: 80vw">
        <div class="text-h6">{{ post.data.name }}</div>
        <div class="text-subtitle2">{{ post.data.sport }}</div>
      </q-card-section>
      <!-- v-if="user.uid === post.data.id" -->
      <q-card-actions v-if="user">
        <q-btn label="Modifier" @click="modifyEvent(post)" flat />
        <q-btn label="Supprimer" @click="removeEvent(post)" flat />
      </q-card-actions>
    </q-card>
  </div>
</template>

<style></style>

<script>
import { useQuasar } from "quasar";

export default {
  name: "PostBlog",
  props: ["user", "posts", "removeEvent", "modifyEvent", "spinner"],

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
      uidFilter: null,
    };
  },
  mounted() {
    if (this.$props.user) {
      console.log(this.uidFilter);
    }
  },
};
</script>
