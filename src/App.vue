<script>
// Root component — owns the resource list and all CRUD logic.
// All methods and the resource array are shared via provide() so child
// components can inject them directly without prop-drilling.
import StoredResources from "./components/StoredResources.vue";
import BaseResourceForm from "./components/BaseResourceForm.vue";

export default {
  components: {
    StoredResources,
    BaseResourceForm,
  },
  data() {
    return {
      // Tab name matches the kebab-case component name used by <component :is>.
      activeTab: "stored-resources",
      resources: this.loadResources(),
      // Holds the resource being edited; null means we're in "add" mode.
      resource: null,
    };
  },
  methods: {
    // isEmpty resets the edited resource when switching to the "Add" tab manually.
    selectTab(tab, isEmpty=false) {
      if(isEmpty) this.resource = null;
      this.activeTab = tab;
    },
    loadResources() {
      const localResources = localStorage.getItem("resources");
      return JSON.parse(localResources) ?? [];
    },
    saveResources() {
      localStorage.setItem("resources", JSON.stringify(this.resources));
    },
    addResource(resource) {
      // unshift places the new resource at the top of the list
      this.resources.unshift({ ...resource, id: crypto.randomUUID() });
      this.saveResources();
      this.selectTab("stored-resources");
    },
    updateResources(resource) {
      // splice replaces in-place to keep the same list position
      const index = this.resources.findIndex((r) => r.id === resource.id);
      this.resources.splice(index, 1, { ...resource });
      this.resource = null;
      this.selectTab("stored-resources");
      this.saveResources();
    },
    editResource(resource) {
      // Sets the resource to edit, then switches to the form tab
      this.resource = resource;
      this.selectTab("base-resource-form");
    },
    removeResource(resource) {
      const index = this.resources.findIndex((r) => r.id === resource.id);
      this.resources.splice(index, 1);
      this.saveResources();
    },
  },
  // Expose resources and CRUD methods to all descendants via inject
  provide() {
    return {
      resources: this.resources,
      updateResources: this.updateResources,
      addResource: this.addResource,
      editResource: this.editResource,
      removeResource: this.removeResource,
    };
  },
};
</script>

<template>
  <div class="container">
    <the-header><h1>Vue Options API</h1></the-header>
  </div>
  <div class="container">
    <button
      type="button"
      @click="selectTab('stored-resources')"
      :class="{ active: activeTab === 'stored-resources' }"
      role="tablist"
    >
      Stored resources
    </button>
    <button
      type="button"
      @click="selectTab('base-resource-form', true)"
      :class="{ active: activeTab === 'base-resource-form' }"
      role="tablist"
    >
      Add resource
    </button>
    <!-- Dynamic component: switches between StoredResources and BaseResourceForm.
         The resource prop is only passed when on the form tab (edit mode). -->
    <component :is="activeTab" v-bind="activeTab === 'base-resource-form' ? { resource } : {}"> </component>
  </div>
</template>
