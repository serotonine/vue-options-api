<script>
import { X } from "lucide-vue-next";
export default {
  components: { X },
  methods: {
    open() {
      this.$refs.dialog.showModal();
    },
    close() {
      this.$emit("close");
    },
  },
  emits: ["close"],
  mounted() {
    this.$refs.dialog.showModal();
  },
};
</script>

<template>
  <dialog ref="dialog">
    <button class="btn-neutral" @click="close"><X :size="24"/></button>
    <slot></slot>
  </dialog>
</template>

<style scoped>
dialog {
  padding: 0 1em 1em 1em;
  width: 40%;
  background-color: white;
  border-radius:6px;
  border-color:crimson;
}
</style>
