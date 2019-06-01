<template>
  <div :class="{'text-input': true, minimal: minimal}">
    <slot name="before" />
    <input
      ref="input"
      v-bind="$attrs"
      :value="amount"
      type="tel"
      v-on="listeners"
    >
    <slot name="after">
      <Button
        v-if="clearable && value"
        class="action minimal small"
        @click="clear"
      >
        <i class="fas fa-times tag-remove" />
      </Button>
    </slot>
  </div>
</template>

<script>
import accounting from "accounting-js";

export default {
  props: {
    minimal: {
      type: Boolean,
      default: false
    },
    value: Number,
    clearable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      amount: ""
    };
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        focus: event => {
          this.$emit("focus", event);

          if (this.value == null) {
            this.amount = "";
          } else {
            this.amount = accounting.formatNumber(this.value, {
              thousand: "",
              decimal: ",",
              precision: 2
            });
          }

          this.$nextTick(() => {
            this.selectAll();
          });
        },
        keydown: event => {
          this.$emit("keydown", event);

          if (event.keyCode === 8 && event.target.value.length === 0) {
            this.$emit("remove");
          }
        },
        keyup: event => {
          event.preventDefault();

          this.$emit("keyup", event);
        },
        blur: event => {
          this.amount = this.format(this.value);

          this.$emit("blur", event);
        },
        input: event => {
          this.amount = event.target.value;

          this.$emit("input", this.unformat(this.amount));
        }
      };
    }
  },
  watch: {
    value: {
      handler(newVal) {
        if (this.$refs.input !== document.activeElement) {
          if (newVal == null) {
            this.amount = "";
          } else {
            this.amount = this.format(newVal);
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    format(value) {
      return accounting.formatNumber(value, {
        precision: 2,
        decimal: ",",
        thousand: "."
      });
    },
    unformat(value) {
      return accounting.unformat(value, ",");
    },
    clear() {
      this.$emit("input", null);
      this.focus();
    },
    focus() {
      this.$refs.input.focus();
    },
    blur() {
      this.$refs.input.blur();
    },
    selectAll() {
      this.$refs.input.select();
    }
  }
};
</script>