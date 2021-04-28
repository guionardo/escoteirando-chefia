<template>
  <q-page class='row items-center justify-evenly'>
    <login-component />
  </q-page>
</template>

<script lang='ts'>
/* eslint-disable */
import { Vue, Component } from 'vue-property-decorator';
import LoginComponent from 'src/components/LoginComponent.vue';

@Component({
  components: { LoginComponent }
})
export default class Login extends Vue {

}
</script>

