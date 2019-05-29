<template>
  <div class="pa-md">
    <DataTable
      :rows="data"
      :columns="columns"
      :loadMore="loadMore"
    >
      <div
        class="action-group"
        slot="actions"
        slot-scope="{col, row}"
      >
        <Button
          class="small primary"
          @click="openForm(col)"
        >
          <i class="fas fa-edit icon" />
          <Popover
            class="tooltip"
            placement="bottom"
          >
            <div style="width: 100px">
              Clique para editar a pessoa '
              <b>{{row.nome}}</b>''
            </div>
          </Popover>
        </Button>
        <Button class="small warning">
          <i class="fab fa-algolia icon" />
        </Button>
      </div>
    </DataTable>
    <Button @click="open">
      Open
    </Button>
  </div>
</template>

<script>
import types from "./../Types.js";
import ReactiveForm from "./../forms/ReactiveForm.vue";
import TextArea from "@/components/TextArea.vue";
import QRCodeScanner from "@/components/QRCodeScanner.vue";

export default {
  name: "home",
  props: {
    type: {
      type: String,
      default: "pessoa"
    }
  },
  components: {
    TextArea,
    QRCodeScanner
  },
  methods: {
    async open(){
      var data = await this.$root.openForm(QRCodeScanner);

      alert(data);
    },
    async loadMore() {
      this.data.push(
        ...Array.from({ length: 10 }, (v, k) => ({
          id: k.toString(),
          nome: k,
          dataCriacao: new Date(),
          documento: "teste",
          cep: "27812871",
          bairro: "9999",
          email: ["2817281", "teste"]
        }))
      );
    },

    async openForm() {
      var data = await this.$root.openForm(ReactiveForm, {
        header: "Pessoa",
        schema: state => {
          function renderDadosBasicos() {
            if (state.tipo === "F") {
              return [
                {
                  name: "documento",
                  label: "CPF",
                  type: "text",
                  mask: "###.###.###-##",
                  hint: "oii gente, tudo bem?"
                },
                {
                  name: "apelido",
                  label: "Apelido",
                  type: "date"
                },
                {
                  name: "identidade",
                  label: "RG",
                  type: "text",
                  hint: "eita kkkk"
                },
                {
                  name: "dididi",
                  label: "DIDIDI",
                  type: "html"
                }
              ];
            } else if (state.tipo === "J") {
              return [
                {
                  name: "documento",
                  label: "CNPJ",
                  type: "text",
                  mask: "##.###.###/####-##"
                },
                {
                  name: "apelido",
                  label: "Nome Fantasia",
                  type: "text"
                },
                {
                  name: "identidade",
                  label: "Inscrição Estadual",
                  type: "text"
                }
              ];
            } else {
              return [];
            }
          }

          return [
            {
              label: "Dados Básicos",
              fields: [
                {
                  name: "tipo",
                  label: "Tipo",
                  type: "select",
                  options: [
                    {
                      value: "J",
                      label: "Jurídica"
                    },
                    {
                      value: "F",
                      label: "Física"
                    }
                  ]
                },
                ...renderDadosBasicos()
              ]
            },
            {
              label: "Localização",
              fields: [
                {
                  name: "cep",
                  label: "CEP",
                  mask: "##.###-###",
                  type: "text"
                },
                {
                  name: "bairro",
                  label: "Bairro",
                  type: "text"
                },
                {
                  name: "cidade",
                  label: "Cidade",
                  type: "text"
                }
              ]
            }
          ];
        },
        save: state => {
          return new Promise((resolve, reject) => {
            setTimeout(() => reject({ documento: "ue" }), 3000);
          });
        }
      });
    }
  },
  data() {
    return {
      editorData: "<p>Rich-text editor content.</p>",
      data: Array.from({ length: 10 }, (v, k) => ({
        id: k.toString(),
        nome: k,
        dataCriacao: new Date(),
        documento: "teste",
        cep: "27812871",
        bairro: "9999",
        email: ["2817281", "teste"]
      })),
      columns: Object.entries(types[this.type]).map(([key, value]) => ({
        id: key,
        field: key,
        label: value.label,
        type: value.type,
        multiple: value.multiple,
        visible: true
      }))
    };
  }
};
</script>
