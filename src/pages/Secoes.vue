<template>
  <page-template title="Seções">
    <q-tree :nodes="secoes" node-key="label">
      <template v-slot:default-header="prop">
        <div class="row items-center">
          <q-icon
            :name="prop.node.icon || 'share'"
            color="orange"
            size="28px"
            class="q-mr-sm"
          />
          <div class="text-weight-bold text-primary">{{ prop.node.label }}</div>
        </div>
      </template>

      <template v-slot:default-body="prop">
        <div v-if="prop.node.story">
          <span class="text-weight-bold">This node has a story</span>:
          {{ prop.node.story }}
        </div>
        <div v-if="prop.node.secao">
          <span class="text-weight-bold">
            <q-btn
              flat
              color="secondary"
              label="Gerar planilha"
              @click="gerarPlanilha(prop.node.secao)"
            />
          </span>
        </div>
        <div v-if="prop.node.associado">
          <span class="text-weight-bold">
            {{ idadeAssociado(prop.node.associado.dataNascimento) }}
            <q-btn
              flat
              color="secondary"
              title="Ativar associado"
              icon="arrow_right_alt"
              @click="ativarAssociado(prop.node.associado)"
            />
          </span>
        </div>
        <!-- <span v-else class="text-weight-light text-black">This is some default content.</span> -->
      </template>
    </q-tree>
  </page-template>
</template>

<script lang="ts">
/* eslint-disable */
interface ISecaoNode {
  label: string;
  header?: string;
  icon?: string;
  body?: string;
  story?: string;
  caption?: string;
  enabled?: boolean;
  children?: ISecaoNode[];
  associado?: IAssociado;
  secao?: ISecao;
}
const secoes: ISecaoNode[] = [
  {
    label: 'Satisfied customers',
    header: 'root',
    children: [
      {
        label: 'Good food',
        icon: 'restaurant_menu',
        header: 'generic',
        children: [
          {
            label: 'Quality ingredients',
            header: 'generic',
            body: 'story',
            story: 'Lorem ipsum dolor sit amet.'
          },
          {
            label: 'Good recipe',
            body: 'story',
            story:
              'A Congressman works with his equally conniving wife to exact revenge on the people who betrayed him.'
          }
        ]
      },
      {
        label: 'Good service',
        header: 'generic',
        body: 'toggle',
        caption:
          'Why are we as consumers so captivated by stories of great customer service? Perhaps it is because...',
        enabled: false,
        children: [
          { label: 'Prompt attention' },
          { label: 'Professional waiter' }
        ]
      },
      {
        label: 'Pleasant surroundings',
        children: [
          { label: 'Happy atmosphere' },
          { label: 'Good table presentation', header: 'generic' },
          { label: 'Pleasing decor' }
        ]
      }
    ]
  }
];
import { Vue, Component } from 'vue-property-decorator';
import SelectSecao from 'components/SelectSecao.vue';
import SubSecaoList from 'components/SubSecaoList.vue';
import { IAssociado, ISecao } from 'src/domain/models/interfaces';
import { mappaStore } from 'src/store';
import PageTemplate from 'components/PageTemplate.vue';
@Component({
  components: { SelectSecao, SubSecaoList, PageTemplate }
})
export default class Secoes extends Vue {
  secoes: ISecaoNode[] = secoes;

  idadeAssociado(dataNascimento: Date): string {
    const dn = new Date(dataNascimento);
    var ageDifMs = Date.now() - dn.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    const years = Math.abs(ageDate.getTime() / 31536000000);
    const months = Math.round((years - Math.round(years)) * 12);
    const monthsString = months > 0 ? ` ${Math.round(months)} meses` : '';
    return `${dn.toLocaleDateString()} - ${Math.floor(
      years
    )} anos${monthsString}`;
  }
  associadosOrdenados(
    associados: IAssociado[],
    codigoLider: Number,
    codigoViceLider: Number
  ): ISecaoNode[] {
    const lider = associados.find(a => a.codigo == codigoLider);
    const viceLider = associados.find(a => a.codigo == codigoViceLider);
    const demais = associados
      .filter(a => a.codigo != codigoLider && a.codigo != codigoViceLider)
      .map(a => {
        return {
          label: a.nome,
          codigo: a.codigo,
          body: 'toogle',
          icon: 'face',
          associado: a
        };
      });
    const ass = [];
    if (lider) {
      ass.push({
        label: lider.nome,
        codigo: lider.codigo,
        header: 'generic',
        body: 'toogle',
        tipo: 'lider',
        icon: 'double_arrow',
        associado: lider
      });
    }
    demais.forEach(a => ass.push(a));
    if (viceLider) {
      ass.push({
        label: viceLider.nome,
        codigo: viceLider.codigo,
        header: 'generic',
        body: 'toogle',
        tipo: 'viceLider',
        icon: 'arrow_forward_ios',
        associado: viceLider
      });
    }
    return ass;
  }

  ativarAssociado(associado: IAssociado) {
    alert('Em desenvolvimento');
    //TODO: Criar visualização da timeline do associado
  }
  gerarPlanilha(secao: ISecao) {
    console.info('Gerar planilha', secao);
    //TODO: Criar planilha da seção
  }
  created() {
    this.secoes = mappaStore.getSecoes.map(s => {
      const secao: ISecaoNode = {
        label: s.nome,
        header: 'generic',
        body: 'toogle',
        secao: s
      };
      if (s.SubSecoes) {
        secao.children = s.SubSecoes.map(ss => {
          const subsecao: ISecaoNode = {
            label: ss.nome,
            header: 'generic',
            body: 'toogle',
            children: []
          };
          subsecao.children = this.associadosOrdenados(
            ss.associados,
            ss.codigoLider,
            ss.codigoViceLider
          );
          return subsecao;
        });
      }
      return secao;
    });
  }
  get Secao(): ISecao {
    return mappaStore.getSecaoAtiva;
  }
}
</script>
