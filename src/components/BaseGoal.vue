<script>
import Dialog from "./BaseDialog.vue";

export default {
  components: {
    Dialog,
  },
  data() {
    return {
      inputIsInvalid: false,
      error: "The description is empty. Please Feel it",
    };
  },
  props: {
    title: { type: String, required: true },
  },
  methods: {
    saveGoal() {
      const description = this.$refs.goal.value;
      if(description === ""){
        this.inputIsInvalid = true;
        return;
      }
    },
  },
};
</script>
<template>
  <section>
    <h3>{{ title }}</h3>
    <label>
      <span class="label"><small>description</small></span>
      <input type="text" size="40" ref="goal" />
    </label>
    <button type="button" class="btn-cta" @click="saveGoal">save</button>
   <!--  Dialog -->
     <!-- <Teleport :to="body"> -->
    <Dialog v-if="inputIsInvalid" @close="inputIsInvalid = false">
      <h3>{{ error }}</h3>
    </Dialog>
  <!-- </Teleport> -->
  </section>
 
</template>
