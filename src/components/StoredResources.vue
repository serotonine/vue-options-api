<script>
import BaseResource from './BaseResource.vue';
export default {
  components: {
   BaseResource,
  },
  inject:['resources'],
};
</script>

<template>
<section class="tab">
  <div v-if="resources.length > 0">
    <base-resource v-for="(resource, index) in resources" :key="resource?.id" :resource="resource" :hr="index < (resources.length - 1)"></base-resource>
  </div>
  <div v-else><h3>No resources actually...</h3></div>
</section>
</template>
