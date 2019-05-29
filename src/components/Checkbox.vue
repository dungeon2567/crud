<style>
.checkbox {
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
  max-height: 16px;
  max-width: 16px;
  padding: 2px;
}

.checkbox .icon {
  font-size: 12px;
  width: 12px;
  height: 12px;
  font-weight: bold;
}
</style>

<template functional>
  <button
    :class="{checkbox: true, primary: props.checked === null || props.checked === true}"
    v-on="listeners"
  >
    <i class="fas fa-check icon" v-if="props.checked === true"/>
    <i class="fas fa-minus icon" v-else-if="props.checked == null"/>
  </button>
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  }
};
</script>
