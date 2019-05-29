<template>
  <div>
    <div style="padding: 20px">
      <EditableText
        v-model="k"
        placeholder="Clique para editar o título"
        :style="{'margin-left': 'auto', 'margin-right': 'auto'}"
      />
      <InputTable :rows="rows" :columns="columns"/>
      <EditableTextArea
        v-model="kkk"
        placeholder="Clique para editar o conteudo"
        :style="{'margin-top': '10px'}"
      />
    </div>
    <div style="padding: 20px">
      <InputTable
        :rows="rows2"
        :columns="rows.map(r => ({field: r.nome, label: r.nome, type: r.tipo}))"
      />

      <div class="card" style="margin-top: 45px">
        <div class="card-heading">Tabs</div>
        <div class="card-content">
          <Tabs style="height: 400px" v-model="tab" :tabs="[{id: 'item1', title: 'Item 11111111111111'}, {id: 'item2', title: 'Item 2'}, {id: 'item3', title: 'Item 3', icon: 'address-book'}, {id: 'item4', title: 'Item 4'}]">
            <div slot="item1">
              oiiiiiiiiiiiiii
            </div>
            <div slot="item2">
              qqqqqqqqqqqqqqqqqqqqqq
            </div>
          </Tabs>
        </div>
      </div>
      <Spinner/>
    </div>
  </div>
</template>

<script>

var tipos = {
  text: "Texto",
  date: "Data",
  currency: "Moeda",
  percentage: "Porcentagem",
  numeric: "Numérico"
};

export default {
  name: "ordem-de-servico",
  data() {
    return {
      tab: 'item1',
      k: "",
      kkk: "",
      rows: [
        { nome: "Nome", tipo: "text" },
        { nome: "Data de Criação", tipo: "date" },
        { nome: "Investido", tipo: "currency" },
        { nome: "Porcentagem", tipo: "percentage" },
        { nome: "Quantidade", tipo: "numeric" }
      ],
      rows2: [],
      columns: [
        { field: "nome", label: "Nome", type: "text" },
        { field: "tipo", label: "Tipo", type: tipos }
      ]
    };
  }
};
</script>
