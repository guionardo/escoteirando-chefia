<template>
   <q-page class="row items-center justify-evenly">
        <q-card>
            <q-card-section>
                <div class="text-h6">Termos de Uso</div>
            </q-card-section>
            <q-card-section>
                <p v-for="line in termLines" :key="line">{{line}}</p>
            </q-card-section>
            <q-card-actions>
                <q-btn flat label="Voltar" color="primary" @click="voltar"/>
            </q-card-actions>
        </q-card>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import {usage_terms} from 'src/assets/usage_terms'
@Component
export default class UsageTerms extends Vue{
  termLines = usage_terms

  voltar(){
    this.$router.back()
  }
}
</script>
