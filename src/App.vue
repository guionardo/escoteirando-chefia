<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mappaStore } from './store';
@Component
export default class App extends Vue {
 async mounted(){
   if (mappaStore.isAuthorized){
     if (this.$router.currentRoute.name=='login'){
       await this.$router.push({name:'home'})
     }
   }else{
     if (this.$router.currentRoute.name!='login'){
       await this.$router.push({name:'login'})
     }
   }
   
 }
}
</script>
