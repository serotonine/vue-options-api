<script>
import StoredRessources from "./components/StoredRessources.vue";
import BaseRessourceForm from "./components/BaseRessourceForm.vue";

export default {
  components: {
    StoredRessources,
    BaseRessourceForm,
  },
  data() {
    return {
      activeTab: "stored-ressources",
      ressources: this.loadRessources(),
    };
  },
  methods: {
    selectTab(tab) {
      this.activeTab = tab;
    },
    loadRessources(){
      const localRessources = localStorage.getItem('ressources');
      return JSON.parse(localRessources) ?? [];
    },
     saveRessources(){
      localStorage.setItem('ressources', JSON.stringify(this.ressources));
    },
    addRessource(ressource){
      this.ressources.unshift({...ressource, id:crypto.randomUUID()});
      this.saveRessources();
      this.selectTab('stored-ressources');
    },
    removeRessource(ressource){
      const index = this.ressources.findIndex((r)=> r.id===ressource.id);
      this.ressources.splice(index, 1);
      this.saveRessources();
    }
  },
  provide(){
    return{
      ressources: this.ressources,
      addRessource: this.addRessource,
      removeRessource:this.removeRessource,
    }
  }
};
</script>

<template>
  <div class="container">
    <the-header><h1>Vue Options API</h1></the-header>
  </div>
  <div class="container">
    <button
      type="button"
      @click="selectTab('stored-ressources')"
      :class="{ active: activeTab === 'stored-ressources' }"
    >
      Stored ressources
    </button>
    <button
      type="button"
      @click="selectTab('base-ressource-form')"
      :class="{ active: activeTab === 'base-ressource-form' }"
    >
      Add ressource
    </button>
    <keep-alive><component :is="activeTab"> </component></keep-alive>
  </div>
</template>
