<template>
    <q-list bordered>
        <q-item v-ripple v-if="!!lider">
            <q-item-section>{{lider.nome}}</q-item-section>
        </q-item>
        <q-separator v-if="!!lider" />
        <q-item v-for="ass in demais" :key="ass.codigo" v-ripple>
            <q-item-section>{{ass.nome}}</q-item-section>
        </q-item>
        <q-separator v-if="!!viceLider"/>
        <q-item v-ripple v-if="!!viceLider">
            <q-item-section>{{viceLider.nome}}</q-item-section>
        </q-item>
    </q-list>
</template>

<script lang="ts">
import { Logger } from 'src/services/logger';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ISubSecao } from 'src/domain/models/interfaces'
import { mappaGetImagem } from 'src/services/mappa_api';
interface IMembro{
    nome:string
    foto:string
}
@Component
export default class SubSecaoList extends Vue {
    @Prop() readonly subsecao: ISubSecao = {codigo:0,nome:'',codigoSecao:0,codigoLider:0,codigoViceLider:0,associados:[]}
    log = new Logger(this)
    lider? : IMembro|null = null
    viceLider? : IMembro|null = null
    demais: IMembro[] = []

    async mounted(): Promise<void> {        
        for (let i = 0; i < this.subsecao.associados.length; i++) {
            const ass = this.subsecao.associados[i]
            let imagem=''
            if (ass.codigoFoto){
                imagem = await mappaGetImagem(ass.codigoFoto)
            }

            if (ass.codigo == this.subsecao.codigoLider) {
                this.lider = {nome:ass.nome,foto:imagem}
            } else if (ass.codigo == this.subsecao.codigoViceLider) {
                this.viceLider = {nome:ass.nome,foto:imagem}
            } else {
                this.demais.push({nome:ass.nome,foto:imagem})
            }
        }
    }


}
</script>

<style>

</style>