<style>

.radio {
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
  max-height: 16px;
  max-width: 16px;
  padding: 0;
  border-radius: 50%;
}

.radio .indicator {
  width: 6px;
  height: 6px;
  background: #fff;
  border-radius: 50%;
}
</style>

<template functional>
    <button :class="{radio: true, primary: props.value}" v-on="listeners">
      <div v-if="props.value" class="indicator"/>
    </button>
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
};
</script>
