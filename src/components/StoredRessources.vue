<script>
import BaseRessource from './BaseRessource.vue';
export default {
  components: {
   BaseRessource,
  },
  inject:['ressources'],
};
</script>

<template>
<section class="tab">
  <div v-if="ressources.length > 0">
    <base-ressource v-for="ressource in ressources" :key="ressource?.id" :ressource="ressource"></base-ressource>
  </div>
  <div v-else><h3>No ressources actually...</h3></div>
</section>
</template>
