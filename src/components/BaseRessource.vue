<script>
import { Pencil, Trash } from "lucide-vue-next";
export default {
  components: { Pencil, Trash },
  props: ["ressource"],
  inject: ["editRessource", "removeRessource"],
  methods: {
    edit() {
      this.editRessource(this.ressource);
    },
    remove() {
      const ok = confirm(
        `are you sure to delete ${this.ressource.title ?? "this ressource"} ?`,
      );
      if (ok) {
        this.removeRessource(this.ressource);
      }
    },
  },
};
</script>

<template>
  <article class="ressources_item">
    <div class="item_cta">
      <button class="btn-edit" @click="edit">
        <Pencil :size="12">Edit</Pencil>
      </button>
      <button class="btn-delete" @click="remove">
        <Trash :size="12">Delete</Trash>
      </button>
    </div>
    <div>
      <h3>{{ ressource.title }}</h3>
      <p>{{ ressource.description }}</p>
      <a :href="ressource.link" target="_blank" rel="noopener noreferrer">Read more...</a>
    </div>
    <hr />
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
