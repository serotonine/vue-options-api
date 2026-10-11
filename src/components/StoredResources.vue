<script>
// Displays the resource list and wires up the search component.
import BaseSearch from "./BaseSearch.vue";
import BaseResource from "./BaseResource.vue";
export default {
  components: {
    BaseSearch,
    BaseResource,
  },
  inject: ["resources"],
  data() {
    return {
      // Local copy of resources so search can filter without mutating the injected source
      data: this.resources,
    };
  },
  methods: {
    // Receives filtered results emitted by BaseSearch and updates the displayed list
    displaySearchResults(results) {
      this.data = results;
    },
  },
};
</script>

<template>
  <section class="tab">
    <div v-if="data.length > 0">
      <base-search :resources="resources" @search-results="displaySearchResults"></base-search>
      <div class="resources">
        <!-- hr prop is false on the last item to avoid a trailing separator -->
        <base-resource
          v-for="(resource, index) in data"
          :key="resource?.id"
          :resource="resource"
          :hr="index < data.length - 1"
        ></base-resource>
      </div>
    </div>
    <div v-else><h4>No resources actually...</h4></div>
  </section>
</template>
<style scoped>
.resources {
  /* max-height: 500px;
  overflow-y:auto;
  padding-right: 1em;; */
}
</style>
