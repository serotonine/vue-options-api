<script>
import BaseDialog from "./BaseDialog.vue";
import { isValidLink } from "../utilities/form-validators";
export default {
  components: { BaseDialog },
  props: {
    resource: { type: Object, required: false },
  },
  inject: ["updateResources", "addResource"],
  data() {
    return {
      data: { title: "", description: "", link: "", ...this.resource },
      formIsInvalid: false,
      error: [],
    };
  },
  methods: {
    submit() {
      this.formIsInvalid = false;
      const errors = [];
      this.error = [];
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
        for (const err of errors) {
          this.error.push(err);
        }
        this.formIsInvalid = true;
        return;
      }
      this.resource
        ? this.updateResources({ id: this.resource.id, ...data })
        : this.addResource(data);
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
      <button class="btn-cta" type="submit">
        {{ resource ? "Update resource" : "Add resource" }}
      </button>
    </form>
    <Teleport to="body">
      <base-dialog v-if="formIsInvalid" @close="formIsInvalid = false">
        <h3 class="error">Please fix:</h3>
        <ul class="error">
          <li v-for="e in error" :key="e">{{ e }}</li>
        </ul>
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
