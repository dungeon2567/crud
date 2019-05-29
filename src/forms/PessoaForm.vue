<template>
  <Overlay @close="accept('oiii')">
    <template slot="header">Pessoa</template>
    <div class="form" slot="body">
      <div class="form-group">
        <label class="title">Dados Básicos</label>
        <div class="control-group">
          <label>Tipo de Pessoa</label>
          <div>
            <label>
              <Radio :value="record.tipo === 'F'" @click="record.tipo = 'F'"/>Física
            </label>
            <label>
              <Radio :value="record.tipo === 'J'" @click="record.tipo = 'J'"/>Jurídica
            </label>
          </div>
        </div>
        <template v-if="record.tipo === 'F'">
          <div class="control-group">
            <label>CPF</label>
            <TextInput autofocus v-model="record.documento" v-mask="'###.###.###-##'"/>
          </div>
          <div class="control-group">
            <label>Apelido</label>
            <TextInput v-model="record.apelido"/>
          </div>
          <div class="control-group">
            <label>RG</label>
            <TextInput v-model="record.identidade"/>
          </div>
        </template>
        <template v-else-if="record.tipo === 'J'">
          <div class="control-group">
            <label>CNPJ</label>
            <TextInput autofocus v-model="record.documento" v-mask="'##.###.###/####-##'"/>
          </div>
          <div class="control-group">
            <label>Nome Fantasia</label>
            <TextInput v-model="record.apelido"/>
          </div>
          <div class="control-group">
            <label>Inscrição Estadual</label>
            <TextInput v-model="record.identidade"/>
          </div>
        </template>
      </div>
      <div class="form-group">
        <label class="title">Localização</label>
        <div class="control-group">
          <label>CEP</label>
          <TextInput v-model="record.cep"/>
        </div>
        <div class="control-group">
          <label>Bairro</label>
          <TextInput v-model="record.bairro"/>
        </div>
        <div class="control-group">
          <label>Cidade</label>
          <TextInput v-model="record.cidade"/>
        </div>
      </div>
      <div class="form-group">
        <label class="title">Contato</label>
        <div class="control-group">
          <label>Emails</label>
          <TagInput v-model="record.emails"/>
        </div>
        <div class="control-group">
          <label>Telefones</label>
          <TagInput v-model="record.telefones"/>
        </div>
        <div class="control-group">
          <label>Celulares</label>
          <TagInput v-model="record.celulares"/>
        </div>
      </div>
    </div>
    <template slot="footer">
      <Button @click="reject('kkk')">Cancelar</Button>
      <Button class="primary">Salvar</Button>
    </template>
  </Overlay>
</template>

<script>
export default {
  props: {
    accept: {
      type: Function,
      required: true
    },
    reject: {
      type: Function,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      record: {
        id: null,
        tipo: "F",
        nome: "",
        apelido: "",
        documento: "",
        identidade: "",
        cep: "",
        emails: [],
        telefones: [],
        celulares: [],
        bairro: "",
        cidade: ""
      }
    };
  }
};
</script>
