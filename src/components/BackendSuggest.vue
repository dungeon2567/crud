<template>
    <Suggest :value="value" @input="$emit('input', $event)" :search="search" @show="onShow" @hide="onHide"/>
</template>

<script>
import api from "../api.js";
export default {
  props: {
    value: Object,
    url: {
      type: String,
      default: "/"
    }
  },
  methods: {
    onShow() {
      this.streamReader = new api.StreamReader(this.url);
    },
    onHide() {
      this.streamReader.close();
      this.streamReader = null;
    },
    search(query) {
      return this.streamReader.withParam(query);
    }
  }
};
</script>