<script>
import {Trash} from 'lucide-vue-next';
export default {
  components:{Trash},
  props: ["ressource"],
  inject:['removeRessource'],
  methods:{
    remove(){
      const ok = confirm(`are you sure to delete ${this.ressource.title ?? 'this ressource'} ?`);
      if(ok){
        this.removeRessource(this.ressource);
      }
    }
  }
};
</script>

<template>
  <article class="ressources_item">
    <div class="item_cta"><button class="btn-delete" @click="remove"><Trash :size="12" > Delete</Trash></button></div>
    <div>
      <h3>{{ ressource.title }}</h3>
      <p>{{ ressource.description }}</p>
      <a :href="ressource.link">Read more...</a>
    </div>
    <hr>
  </article>
</template>

<style scoped>
r.essources_item{}
.item_cta {
  margin: 1em 0;
  text-align: right;
 
}
a {
  display: block;
  margin-bottom: 1em;
}
</style>
