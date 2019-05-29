<template>
  <div class="pa-md">
    <div class="card-grid">
      <div
        v-for="(type, index) in classes"
        :key="index"
      >
        <div class="card">
          <div class="card-header">
            <EditableText
              v-model="type.name"
              placeholder="Nome do tipo"
            />
            <Button class="minimal">
              <i class="fas fa-times icon"></i>
            </Button>
          </div>
          <div class="divider vertical" />
          <div class="card-content">
            <div
              class="field-container"
              v-for="(field, index) in type.fields"
              :key="'field-' + index"
            >
              <EditableText
                v-model="field.name"
                placeholder="Nome do campo"
              />
              <span>:</span>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  computed: {
    classes() {
      return this.types.filter(type => !type.primitive);
    }
  },
  methods: {},
  data() {
    return {
      types: [
        {
          name: "Integer",
          primitive: true
        },
        {
          name: "String",
          primitive: true
        },
        {
          name: "Teste",
          fields: [
            {
              id: "nome",
              name: "Nome",
              type: "Diego"
            }
          ]
        }
      ]
    };
  }
};
</script>
<style>
.card-grid {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
}

.card-grid > * {
  padding: 10px;
  flex-basis: 200px;
  flex-grow: 0;
}

.card-header {
  display: flex;
  flex-direction: horizontal;
}

.card-content {
  padding: 10px;
}

.card-header > *:first-child {
  flex-grow: 1;
}

.card-header > * {
  margin: 5px;
}

.field-container {
  display: grid;
}

@media screen and (min-width: 512px) {
  .card-grid > * {
    flex-basis: 25%;
  }
}
</style>
