<template>
   <q-page class="row items-center justify-evenly">
   <login-component/>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import LoginComponent from 'src/components/LoginComponent'

@Component({
  components: { LoginComponent }
})
export default class Login extends Vue{

}
</script>

<style lang="sass" scoped>
.login-card
    width: 100%
    max-width:250px
</style>