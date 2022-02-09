<template>
  <q-page padding>
    <div class="q-pa-md q-gutter-md">
      <h2>Blog</h2>
      <p v-if="!user" v-cloak>Connectez vous pour écrire un post</p>
      <AddPost v-else :user="user" :addEvent="addEvent" />
    </div>
    <PostBlog
      :user="user"
      :posts="posts"
      :removeEvent="removeEvent"
      :modifyEvent="modifyEvent"
      :spinner="spinner"
    />
  </q-page>
</template>

<style></style>

<script>
import { useMeta, useQuasar } from "quasar";
import { auth, onAuthStateChanged } from "../../utils/auth/google";
import { getPosts, deletePosts, addInPost } from "../../utils/db/blog";

//components
import AddPost from "./addPost.vue";
import PostBlog from "./postBlog.vue";

const metaData = {
  // sets document title
  title: "Blog",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  // titleTemplate: title => `${title} - My Website`,

  // meta tags
  meta: {
    // description: { name: "description", content: "Page 1" },
    // keywords: { name: "keywords", content: "Quasar website" },
    equiv: {
      "http-equiv": "Content-Type",
      content: "text/html; charset=UTF-8",
    },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle: {
      property: "og:title",
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template(ogTitle) {
        return `${ogTitle}`;
      },
    },
  },

  // CSS tags
  link: {
    material: {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/icon?family=Material+Icons",
    },
  },

  // JS tags
  script: {
    ldJson: {
      type: "application/ld+json",
      innerHTML: `{ "@context": "http://schema.org" }`,
    },
  },

  // <html> attributes
  htmlAttr: {
    "xmlns:cc": "http://creativecommons.org/ns#", // generates <html xmlns:cc="http://creativecommons.org/ns#">,
    empty: undefined, // generates <html empty>
  },

  // <body> attributes
  bodyAttr: {
    "action-scope": "xyz", // generates <body action-scope="xyz">
    empty: undefined, // generates <body empty>
  },

  // <noscript> tags
  noscript: {
    default: "This is content for browsers with no JS (or disabled JS)",
  },
};
export default {
  name: "Blog",
  components: {
    AddPost,
    PostBlog,
  },
  methods: {
    async addEvent(event) {
      const posts = await addInPost(event);
      if (posts) {
        this.posts.push(posts);
      }
      this.showNotif(
        "Le post " + event.name + " a été crée !",
        "green",
        "bottom-right"
      );
    },
    modifyEvent(event) {
      // modifySalle(event);
      this.showNotif(
        "Le post " + event.data.name + " a été modifié !",
        "green",
        "bottom-right"
      );
    },
    async removeEvent(event) {
      await deletePosts(event);
      this.posts = this.posts.filter((post) => post.id !== event.id);
      this.showNotif(
        "Le post " + event.data.name + " a été supprimé !",
        "green",
        "bottom-right"
      );
    },
  },
  data() {
    return {
      user: null,
      posts: [],
      spinner: false,
    };
  },
  async mounted() {
    this.spinner = true;
    const posts = await getPosts();
    if (posts) {
      this.spinner = false;
      this.posts = posts;
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  setup() {
    const $q = useQuasar();
    useMeta(metaData);

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
};
</script>
