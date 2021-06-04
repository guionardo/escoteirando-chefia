<template>
    <q-card>
        <q-card-section>Seções</q-card-section>
        <q-card-section>
            <q-select v-model="secao" :options="secoes" @input="setSecao" />
        </q-card-section>
    </q-card>
</template>

<script lang="ts">
import { Logger } from 'src/services/logger';
import { mappaStore } from 'src/store';
import { Vue, Component } from 'vue-property-decorator';
import { ISecao } from 'src/domain/models/interfaces'
interface ISelect {
    label: string
    value: ISecao
    disable: boolean
}
@Component
export default class SelectSecao extends Vue {
    log = new Logger(this)
    secao: ISelect = { label: 'Selecione', disable: true, value: {codigo:0,nome:'',codigoTipoSecao:0,codigoGrupo:0,codigoRegiao:''} };
    secoes: ISelect[] = [];

    mounted() {

        this.secoes = mappaStore.getSecoes.map(function(secao): { label: string;value: ISecao; disable:boolean} {
            return {
                label: secao.nome,
                value: secao,
                disable: false
            }
        })

        // this.secao = this.secoes[0]
    }

    setSecao() {
        console.log('Secao mudou', this.secao)
        mappaStore.setSecaoAtiva(this.secao.value)
    }

}
</script>

<style>

</style>