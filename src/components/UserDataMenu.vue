<template>
    <q-btn :label="title" flat @click="clickMenu">
        <q-menu>
        <div class="row no-wrap q-pa-md">
          <div class="column">
            <div class="text-h6 q-mb-md">{{fullName}}</div>
            <q-list separator>
                <q-item>
                    <q-item-section>Grupo</q-item-section>
                    <q-item-section>{{grupoNome}}</q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>Seção</q-item-section>
                    <q-item-section>{{secaoNome}}</q-item-section>
                </q-item>
            </q-list>
          </div>

          <q-separator vertical inset class="q-mx-lg" />

          <div class="column items-center">
            <q-avatar size="72px">
              <img alt="user_picture" src="https://cdn.quasar.dev/img/avatar4.jpg">
            </q-avatar>
            <q-separator />
            <q-btn
                class="q-mt-md full-width"
                icon="gavel"
                align="between"
                color="secondary"
                label="Termos de Uso"
                size="sm"
                to="usage_terms" />
            <q-btn
                class="q-mt-md full-width"
                icon="logout"
                align="between"
                color="primary"
                label="Sair"
                size="sm"
                v-close-popup
                @click="logout"
            />
          </div>
        </div>
      </q-menu>
    </q-btn>
</template>

<script lang="ts">
import { Logger } from 'src/services/logger';
import { mappaStore } from 'src/store';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class UserDataMenu extends Vue {
    log = new Logger(this)
    async mount(){
        this.log.logInfo('MOUNTED')
        await mappaStore.getAuthFromLocalStorage();          
    }

    logout(): void {
        mappaStore.logout()        
    }

    clickMenu():void{
        if (mappaStore.isAuthorized)
            return;
        void this.$router.push('login')
    }
    get title() {
        if (mappaStore.isAuthorized){
            return mappaStore.userName
        } else {
            return 'LOGIN'
        }
    }

    get fullName() {
        return mappaStore.userName
    }
    get grupoNome(){
        return mappaStore.grupoNome
    }
    get secaoNome(){
        return mappaStore.secaoNome
    }

}
</script>
