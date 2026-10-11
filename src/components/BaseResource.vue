<script>
// Displays a single resource card with edit and delete actions.
// editResource and removeResource are injected from App.vue (avoid prop-drilling).
import { Pencil, Trash } from "lucide-vue-next";
export default {
  components: { Pencil, Trash },
  props: ["resource", "hr"],
  inject: ["editResource", "removeResource"],
  methods: {
    edit() {
      this.editResource(this.resource);
    },
    remove() {
      const ok = confirm(
        `are you sure to delete ${this.resource.title ?? "this resource"} ?`,
      );
      if (ok) {
        this.removeResource(this.resource);
      }
      else{
        // Blur the button so it doesn't remain focused after the user cancels
        this.$refs.cancelButton.blur();
      }
    },
  },
};
</script>

<template>
  <article class="resources_item">
    <div class="item_cta">
      <button class="btn-edit" @click="edit">
        <Pencil :size="12" stroke-width="4">Edit</Pencil>
      </button>
      <button class="btn-delete" @click="remove" ref="cancelButton">
        <Trash :size="12" stroke-width="4">Delete</Trash>
      </button>
    </div>
    <div>
      <h3>{{ resource.title }}</h3>
      <p>{{ resource.description }}</p>
      <a :href="resource.link" target="_blank" rel="noopener noreferrer">Read more...</a>
    </div>
    <hr v-if="hr">
  </article>
</template>

<style scoped>
.item_cta {
  display: flex;
  justify-content: flex-end;
  gap:0.25em;
  margin: 2em 0 0 0;
  text-align: right;
}
a {
  display: block;
  margin-bottom: 1em;
}
</style>
