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
    <h3 @click="close"><X :size="24"/></h3>
    <slot></slot>
  </dialog>
</template>

<style scoped>
h3 {
  text-align: right;
  cursor: pointer;
  margin: 0;
  padding: 1em 0 0;
}
dialog {
  padding: 0 1em 1em 1em;
  width: 40%;
  background-color: white;
  border-radius:6px;
  border-color:crimson;
}
</style>
