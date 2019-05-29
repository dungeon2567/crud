<template>
  <div class="input-group">
    <DateInput
      ref="from"
      :minimal="minimal"
      :value="value ? value[0] : null"
      @input="onInputFrom"
      @blur="$refs.to.focus()"
      :max="value ? value[1] : null"
    />
    <DateInput
      :minimal="minimal"
      :value="value ? value[1] : null"
      @input="onInputTo"
      ref="to"
      @remove="focus"
      @blur="onBlur"
      :min="value ? value[0] : null"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: null
    },
    minimal: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onBlur(){
      this.$emit('blur');
    },
    focus() {
      this.$refs.from.focus();
    },
    onInputFrom(val) {
      this.$emit("input", this.value ? [val, this.value[1]] : [val, null]);
    },
    onInputTo(val) {
      this.$emit("input", this.value ? [this.value[0], val] : [null, val]);
    }
  }
};
</script>