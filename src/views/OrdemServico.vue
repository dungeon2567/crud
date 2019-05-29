<template>
  <div>
    <Overlay :isOpen="isOpen" @close="isOpen = false">
      <template slot="header">Formulário teste</template>
      <div class="form">
        <div class="form-group">
          <label class="title">Dados Básicos</label>
          <div class="control-group">
            <label>Tipo de Pessoa</label>
            <label>
              <Radio :value="t === 'F'" @click="t = 'F'"/>Física
            </label>
            <label>
              <Radio :value="t === 'J'" @click="t = 'J'"/>Jurídica
            </label>
          </div>
          <div class="control-group" v-if="t === 'F'">
            <label>CPF</label>
            <TextInput v-model="oi"/>
          </div>
          <div class="control-group" v-else>
            <label>CNPJ</label>
            <TextInput v-model="oi"/>
          </div>
        </div>
        <div class="form-group">
          <label class="title">Localização</label>
          <div class="control-group">
            <label>Assign responsibility</label>
            <label>
              <Checkbox :checked="a" @click="a = !a"/>Gilad gray
            </label>
            <label>
              <Checkbox :checked="b" @click="b = !b"/>Jason Killian
            </label>
            <label>
              <Checkbox :checked="c" @click="c = !c"/>Antoine Llorca
            </label>
          </div>
          <div class="control-group">
            <label>Teste</label>
            <TextInput v-model="kk2"/>
          </div>
          <div class="control-group">
            <label>Teste2</label>
            <Suggest
              v-model="kk3"
              :search="query => items.filter(item => item.text.startsWith(query))"
            />
          </div>
          <div class="control-group">
            <label>Teste3</label>
            <MultipleSuggest
              v-model="kk4"
              :search="query => items.filter(item => item.text.startsWith(query))"
            />
          </div>
          <div class="control-group">
            <label>Teste4</label>
            <DateInput v-model="kk5"/>
          </div>
          <div class="control-group">
            <label>Teste5</label>
            <DateRangeInput v-model="kk6"/>
          </div>
          <div class="control-group">
            <label>Teste5</label>
            <DateRangeInput v-model="kk6"/>
          </div>
        </div>
      </div>
      <template slot="footer">
        <Button>Cancelar</Button>
        <Button class="primary">Salvar</Button>
      </template>
    </Overlay>
  </div>
</template>

<script>
export default {
	name: 'ordem-de-servico',
	data() {
		return {
			items: [{ id: 1, text: 'diego' }, { id: 2, text: 'braga' }, { id: 3, text: 'guedes' }],
			isOpen: true,
			oi: '',
			t: 'F',
			a: true,
			b: true,
			c: true,
			kk2: null,
			kk3: null,
			kk4: [],
			kk5: null,
			kk6: null,
			data: Array.from({ length: 25 }, (v, k) => ({
				id: k,
				teste1: k.toString(),
				teste2: k.toString(),
				teste3: k.toString(),
				projeto: k.toString(),
				cliente: new Date(),
			})),
			columns: [
				{
					label: 'Projeto',
					field: 'projeto',
					type: 'text',
					visible: true,
					filter: null,
				},
				{
					label: 'Teste1',
					field: 'teste1',
					type: 'text',
					visible: true,
					filter: null,
				},
				{
					label: 'Teste2',
					field: 'teste',
					type: 'text',
					visible: true,
					filter: null,
				},
				{
					label: 'Teste3',
					field: 'teste3',
					type: 'text',
					visible: true,
					filter: null,
				},
				{
					label: 'Teste3',
					field: 'teste3',
					type: 'text',
					visible: true,
					filter: null,
				},
				{
					label: 'Cliente',
					field: 'cliente',
					type: 'date',
          visible: true,
          filter: null
				},
			],
		};
	},
};
</script>
