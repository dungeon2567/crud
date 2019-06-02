<template>
  <div class="pa-md">
    <DataTable
      :rows="data"
      :columns="columns"
      @delete="deleteMany"
    >
      <div
        class="action-group"
        slot="actions"
        slot-scope="{col, row}"
      >
        <Button
          class="small primary"
          @click="editGrower(row)"
        >
          <i class="fas fa-edit icon" />
          <Popover
            class="tooltip"
            placement="bottom"
          >
            <div style="width: 100px">
              Clique para editar o grower '
              <b>{{row.name}}</b>''
            </div>
          </Popover>
        </Button>
        <Button
          class="small danger"
          @click="deleteGrower(row)"
        >
          <i class="far fa-trash-alt icon" />
          <Popover
            class="tooltip"
            placement="bottom"
          >
            <div style="width: 100px">
              Clique para deletar o grower '
              <b>{{row.name}}</b>''
            </div>
          </Popover>
        </Button>
      </div>
    </DataTable>
  </div>
</template>

<script>
import ReactiveForm from "./../forms/ReactiveForm.vue";

export default {
  name: "Grower",
  mounted() {
    fetch("https://my-json-server.typicode.com/pedroskakum/fake-api/grower")
      .then(response => response.json())
      .then(data => {
        this.data = data;
      });
  },
  methods: {
    async editGrower(grower) {
      const { id, ...initialState } = grower;

      var data = await this.$root.openForm(ReactiveForm, {
        header: "Editar grower",
        initialState,
        schema: state => {
          return [
            {
              label: "Dados Básicos",
              fields: [
                {
                  name: "name",
                  label: "Nome",
                  type: "text",
                  hint: "Nome do grower"
                },
                {
                  name: "cpf",
                  label: "CPF",
                  type: "text",
                  mask: "###.###.###-##",
                  hint: "documento do grower"
                }
              ]
            }
          ];
        },
        save: newState => {
          return fetch(
            `https://my-json-server.typicode.com/pedroskakum/fake-api/grower/${
              id
            }`,
            {
              method: "PATCH",
              body: JSON.stringify(newState)
            }
          ).then(response => {
            alert("Grower editado com sucesso!");
          });
        }
      });
    },
    async deleteMany(keys) {
      await Promise.all(
        keys.map(id =>
          fetch(
            `https://my-json-server.typicode.com/pedroskakum/fake-api/grower/${id}`,
            {
              method: "DELETE"
            }
          ).then(response => {
            alert(`Grower ${id} deletado com sucesso!`);
          })
        )
      );
    },
    async deleteGrower(grower) {
      return fetch(
        `https://my-json-server.typicode.com/pedroskakum/fake-api/grower/${
          grower.id
        }`,
        {
          method: "DELETE"
        }
      ).then(response => {
        alert("Grower deletado com sucesso!");
      });
    }
  },
  data() {
    return {
      data: [],
      columns: [
        {
          id: "id",
          field: "id",
          label: "Id",
          type: "text",
          multiple: false,
          visible: true
        },
        {
          id: "name",
          field: "name",
          label: "Nome",
          type: "text",
          multiple: false,
          visible: true
        },
        {
          id: "cpf",
          field: "cpf",
          label: "CPF",
          type: "text",
          multiple: false,
          visible: true,
          rules: [val => val.length === 0 && "O Campo CPF é obrigatório"]
        }
      ]
    };
  }
};
</script>
