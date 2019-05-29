<template>
  <Button :class="{active: isOpen}"  >
    <Popover ref="popover" :trigger="trigger" @show="isOpen = true" @hide="isOpen = false" :placement="placement">
      <slot name="content" />
    </Popover>
    <slot />
  </Button>
</template>

<script>
import Popover from "./Popover.vue";
import Button from "./Button.vue";

export default {
  props: {
    placement: {
      type: String,
      default: "bottom"
    },
    trigger: {
      type: String,
      default: "click"
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    close(){
      this.$refs.popover.close();
    }, 
    open(){
      this.$refs.popover.open();
    }
  }
};
</script>