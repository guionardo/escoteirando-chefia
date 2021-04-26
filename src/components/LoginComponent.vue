/* eslint-disable @typescript-eslint/no-unsafe-member-access */
<template>
  <q-card class="login-card" bordered>
    <q-card-section>
      <div class="text-h6">Login mAPPa</div>
    </q-card-section>
    <q-separator inset />
    <q-form ref="login_form">
      <q-card-section>
        <q-input
          v-model="username"
          autofocus
          label="Usuário"
          :rules="[(val) => !!val || 'Usuário é requerido']"
        >
          <template v-slot:prepend>
            <q-icon name="account_circle" />
          </template>
        </q-input>
        <q-input
          v-model="password"
          type="password"
          label="Senha"
          :rules="[(val) => !!val || 'Senha é requerida']"
        >
          <template v-slot:prepend>
            <q-icon name="password" />
          </template>
        </q-input>
        <div class="q-gutter-sm">
          <q-checkbox
            v-model="ack"
            label="Entendo os termos de uso deste site"
          />
        </div>
      </q-card-section>
    </q-form>
    <q-card-actions vertical>
      <q-btn flat @click="doLogin">Login</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { MappaLoginServiceInstance } from 'src/services/mappa_login_service';
import { IAjaxResponse } from 'src/services/mappa_request_service';

@Component
export default class LoginComponent extends Vue {
  username = '';
  password = '';
  ack = false;
  show_usage = false;

  doLogin(): void {
    if (!this.ack) {      
      this.$q.notify({
        message: 'Você deve aceitar os termos de uso deste site',
        icon: 'warning_amber',
        color: 'negative',
        actions: [
          {
            label: 'Mostre-me',
            color: 'white',
            handler: (): void => {
              return this.$router.push('usage_terms');
            },
          },
        ],
      });
      return;
    }
    if (!this.username || !this.password) {
      this.$q.notify({
        message: 'Verifique as informações requeridas',
        icon: 'warning_amber',
        color: 'negative',
      });
      return;
    }

    console.log('MappaLoginServiceInstance', MappaLoginServiceInstance);

    MappaLoginServiceInstance.login(this.username, this.password)
      .then((response): void => {
        console.log('Login', response);
        this.$q.notify({ message: 'Login autorizado' });

        MappaLoginServiceInstance.getEscotista(response.userId)
          .then((escotista) => {
            this.$q.notify({ message: `Escotista:${escotista.nomeCompleto}` });

            MappaLoginServiceInstance.getGrupo(
              escotista.codigoGrupo,
              escotista.codigoRegiao
            )
              .then((grupo) => {
                this.$q.notify({
                  message: `Grupo Escoteiro: ${grupo.codigo}/${grupo.codigoRegiao} ${grupo.nome}`,
                });
              })
              .catch((error) => {
                console.error('GET_GRUPO', error);
                this.$q.notify({
                  type: 'negative',
                  message: 'Ocorreu um erro ao obter o grupo',
                });
              });
          })
          .catch((error) => {
            this.$q.notify({
              type: 'negative',
              message: `Ocorreu um erro ao obter o escotista: ${error}`,
            });
          });
      })
      .catch((error: IAjaxResponse): void => {
        if (error.statusCode == 401) {
          this.$q.notify({
            type: 'negative',
            message: 'Não autorizado. Verifique seu usuário e/ou senha',
          });
        } else {
          this.$q.notify({
            type: 'negative',
            message: `Ocorreu um erro ao acessar o servidor de autenticação. [${error.statusCode}:${error.message}]`,
          });
        }
      });
  }
}
</script>
