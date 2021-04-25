<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="isLeftDrawerOpen = !isLeftDrawerOpen"
        />

        <q-toolbar-title> Escoteirando Chefia </q-toolbar-title>
        <user-data-menu />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="isLeftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue';

const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
];

import { Vue, Component } from 'vue-property-decorator';
import { LayoutStore } from 'src/store/LayoutStoreModule';
import { MappaLogin } from 'src/store/MappaLoginModule';
import { IEscotista } from 'src/domain/models/interfaces';
import UserDataMenu from 'src/components/UserDataMenu';
@Component({
  components: { EssentialLink, UserDataMenu },
})
export default class MainLayout extends Vue {
  essentialLinks = linksData;
  login = {};

  get isLeftDrawerOpen() {
    return LayoutStore.isLeftDrawerOpen;
  }

  set isLeftDrawerOpen(value: boolean) {
    LayoutStore.setLeftDrawer(value);
  }

  get auth() {
    return MappaLogin.auth;
  }

  get isLogged() {
    return MappaLogin.isLogged;
  }

  get userName() {
    return MappaLogin.userName;
  }

  get user(): IEscotista {
    return MappaLogin.escotista;
  }
}
</script>
