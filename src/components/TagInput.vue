<template>
  <div :class="{'tag-input': true, minimal: minimal}">
    <div class="tag-input-content" @click="focus">
      <span class="tag" v-for="(item, index) in value" :key="index">
        <span>{{item}}</span>
        <i class="fas fa-times tag-remove" @click="remove(index)"/>
      </span>
      <input ref="input" @blur="onBlur" @focus="onFocus" @keydown="onKeyDown" v-model="query">
    </div>
  </div>
</template>
<script>
export default {
  props: {
    minimal: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default: null
    },
    clearable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      query: ""
    };
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
    clear() {
      this.query = "";
      this.value = null;
    },
    onKeyDown(e) {
      switch (e.keyCode) {
        case 13:
          if (this.query !== "") {
            this.value.push(this.query);
            this.query = "";
          }
          break;
        case 8:
          if (this.query === "" && this.value.length > 0) {
            this.value.splice(this.value.length - 1, 1);
          }
          break;
      }
    },
    onBlur() {
      if (this.query !== "") {
        this.value.push(this.query);
        this.query = "";
      }
    },
    onFocus() {
      this.query = "";
    },
    remove(index){
      this.value.splice(index, 1);
    },
    toggle(item) {
      for (var i = 0; i < this.value.length; ++i) {
        const val = this.value[i];

        if (val.id === item.id) {
          this.value.splice(i, 1);
          return;
        }
      }

      this.value.push(item);
    }
  }
};
</script>