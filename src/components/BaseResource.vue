<script>
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
        <Pencil :size="12">Edit</Pencil>
      </button>
      <button class="btn-delete" @click="remove" ref="cancelButton">
        <Trash :size="12">Delete</Trash>
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
  margin: 1em 0;
  text-align: right;
}
a {
  display: block;
  margin-bottom: 1em;
}
</style>
