<template>
    <q-btn-dropdown v-if="isAuthorized" flat dense round icon="menu" aria-label="Menu">
        <q-list>
            <q-item v-for="item in menuData" :key="item.title" clickable v-close-popup :to="item.to">
                <q-item-section>
                    <q-item-label>{{ item.title }}</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </q-btn-dropdown>
</template>

<script lang="ts">
import { Logger } from 'src/services/logger';
import { mappaStore } from 'src/store';
import { Vue, Component } from 'vue-property-decorator';

const menuData = [
    { title: 'Seções', to: 'secoes' },
    { title: 'Home', to: 'home' },
    { title: 'Termos de uso', to: 'usage_terms' },
    { title: 'Menu 3', to: '#' },
];
@Component
export default class UserNavMenu extends Vue {
    log = new Logger(this)
    menuData = menuData

    async mount() {
        this.log.logInfo('MOUNTED')

        await mappaStore.getAuthFromLocalStorage();
    }

    logout(): void {
        mappaStore.logout()
    }

    clickMenu(): void {
        if (mappaStore.isAuthorized)
            return;
        void this.$router.push('login')
    }
    get title() {
        if (mappaStore.isAuthorized) {
            return mappaStore.userName
        } else {
            return 'LOGIN'
        }
    }
    get isAuthorized() {
        return mappaStore.isAuthorized
    }
    get fullName() {
        return mappaStore.userName
    }
    get grupoNome() {
        return mappaStore.grupoNome
    }
    get secaoNome() {
        return mappaStore.secaoNome
    }

}
</script>
