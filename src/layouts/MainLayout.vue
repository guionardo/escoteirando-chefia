<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <user-nav-menu/>
                <q-toolbar-title> Escoteirando Chefia </q-toolbar-title>
                <user-data-menu />
            </q-toolbar>
        </q-header>
    
        <q-page-container>
            <h1 v-if="!isProxyOk">PROXY ESTÁ DESATIVADO</h1>
            <router-view v-else/>
        </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue';
import UserDataMenu from 'components/UserDataMenu.vue';
import UserNavMenu from 'components/UserNavMenu.vue'

import { Vue, Component } from 'vue-property-decorator';
import {
    isProxyHealthy
} from 'src/services/mappa_api';
@Component({
    components: { EssentialLink, UserDataMenu, UserNavMenu },
})
export default class MainLayout extends Vue {
    isProxyOk = true

    async mounted() {
        if (!await isProxyHealthy()) {
            this.isProxyOk = false
        }
        console.log('MainLayout mounted')
    }
}
</script>
