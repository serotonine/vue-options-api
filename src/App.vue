<script>
import StoredResources from "./components/StoredResources.vue";
import BaseResourceForm from "./components/BaseResourceForm.vue";

export default {
  components: {
    StoredResources,
    BaseResourceForm,
  },
  data() {
    return {
      activeTab: "stored-resources",
      resources: this.loadResources(),
      resource: null,
    };
  },
  methods: {
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
      this.resources.unshift({ ...resource, id: crypto.randomUUID() });
      this.saveResources();
      this.selectTab("stored-resources");
    },
    updateResources(resource) {
      const index = this.resources.findIndex((r) => r.id === resource.id);
      this.resources.splice(index, 1, { ...resource });
      this.resource = null;
      this.selectTab("stored-resources");
      this.saveResources();
    },
    editResource(resource) {
      this.resource = resource;
      this.selectTab("base-resource-form");
    },
    removeResource(resource) {
      const index = this.resources.findIndex((r) => r.id === resource.id);
      this.resources.splice(index, 1);
      this.saveResources();
    },
  },
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
    <component :is="activeTab" v-bind="activeTab === 'base-resource-form' ? { resource } : {}"> </component>
  </div>
</template>
