<script>
import BaseDialog from "./BaseDialog.vue";
import { isValidLink } from "../utilities/form-validators";
export default {
  components: { BaseDialog },
  props: {
    ressource: { type: Object, required: false },
  },
  inject: ["updateRessources", "addRessource"],
  data() {
    return {
      data: { title: "", description: "", link: "", ...this.ressource },
      formIsInvalid: false,
      error: [],
    };
  },
  methods: {
    submit() {
      // Reset Errors.
      this.formIsInvalid = false;
      const errors = [];
      this.error = "";
      //
      const data = Object.fromEntries(new FormData(this.$refs.form));
      for (const [key, value] of Object.entries(data)) {
        if (value === "") {
          errors.push(`${key} field is empty,`);
        }
      }

      if (data.link !== "" && !isValidLink(data.link)) {
        errors.push("link is not valid");
      }
      if (errors.length) {
        console.log("errors", errors);
        for (const err of errors) {
          this.error += `<li>${err}</li>`;
        }
        this.formIsInvalid = true;
        return;
      }
      this.ressource
        ? this.updateRessources({ id: this.ressource.id, ...data })
        : this.addRessource(data);
      this.$refs.form.reset();
    },
  },
};
</script>

<template>
  <section class="tab">
    <form ref="form" @submit.prevent="submit" novalidate>
      <label>
        <span class="label"><small>Title</small></span>
        <input type="text" name="title" required v-model="data.title" />
      </label>
      <label>
        <span class="label"><small>Description</small></span>
        <textarea
          name="description"
          id=""
          rows="10"
          required
          v-model="data.description"
        ></textarea>
      </label>
      <label>
        <span class="label"><small>Link</small></span>
        <input type="url" name="link" required v-model="data.link" />
      </label>
      <button class="btn-cta" type="submit">Add Ressource</button>
    </form>
    <Teleport to="body">
      <base-dialog v-if="formIsInvalid" @close="formIsInvalid = false">
        <h3 class="error">Please fix:</h3>
        <ul class="error" v-html="error"></ul>
      </base-dialog>
    </Teleport>
  </section>
</template>

<style scoped>
form {
  padding: 0.25em 0.5em;
  margin-top: 1em;
}

ul.error > li {
  margin: 0;
  padding: 0;
  list-style-position: inside;
}
</style>
