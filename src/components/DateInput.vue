<style>
.date-input {
  min-width: 90px;
}
</style>
<template>
  <TextInput
    ref="input"
    :minimal="minimal"
    v-model="valueString"
    class="date-input"
    :clearable="clearable"
    @keydown="onKeyDown"
    @focus="onFocus"
    maxlength="10"
    placeholder="dd/mm/aaaa"
    v-mask="'##/##/####'"
  >
    <Popover
      ref="pickerPopover"
      trigger="focus"
      @close="onHide"
      @open="onShow"
      placement="bottom-start"
    >
      <DatePicker :value="value" @input="selected($event)" :min="min" :max="max"/>
    </Popover>
  </TextInput>
</template>

<script>
function tryParseInt(str, defaultValue) {
  var retValue = defaultValue;
  if (str !== null) {
    if (str.length > 0) {
      if (!isNaN(str)) {
        retValue = parseInt(str);
      }
    }
  }

  return retValue;
}

import DatePicker from "./DatePicker.vue";
import Popover from "./Popover.vue";
import TextInput from "./TextInput.vue";

export default {
  props: {
    min: {
      type: Date,
      required: false
    },
    max: {
      type: Date,
      required: false
    },
    minimal: {
      type: Boolean,
      default: false
    },
    value: {
      type: Date,
      default: null
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      valueString: "",
      isOpen: false,
    };
  },
  components: {
    DatePicker,
    Popover,
    TextInput
  },
  watch: {
    valueString(newVal, oldVal) {
      if (newVal != oldVal) {
        this.editing = true;

        var split = newVal.split("/");

        var now = new Date();

        var day = null;
        var month = null;
        var year = null;

        if (split.length > 0) {
          day = tryParseInt(split[0], null);
          if (split.length > 1) {
            month = tryParseInt(split[1], null);

            if (split.length > 2) {
              year = tryParseInt(split[2], null);
            }
          }
        }

        if (day === null && month === null && year === null) {
          this.$emit("input", null);
        } else {
          var dt = new Date(
            year || now.getFullYear(),
            month ? month - 1 : now.getMonth(),
            day || now.getDate()
          );

          if (this.min && dt.isLessThan(this.min)) {
            dt = this.min;
          }

          if (this.max && dt.isGreaterThan(this.max)) {
            dt = this.max;
          }

          this.$emit("input", dt);
        }

        this.$nextTick(() => {
          this.editing = false;
        });
      }
    },
    value: {
      immediate: true,
      handler(newVal, oldVal) {
        if (!this.editing) {
          if (newVal != oldVal) {
            this.updateValueString(newVal);
          }
        }
      }
    }
  },
  methods: {
    onShow() {
      this.isOpen = true;
    },
    focus() {
      this.$refs.input.focus();
    },
    onKeyDown(e) {
      if (e.keyCode === 8 && this.valueString.length === 0) {
        this.$emit("remove");
      } else if (e.keyCode === 9) {
        this.$refs.pickerPopover.close();
      }
    },
    onHide() {
      this.updateValueString(this.value);

      this.isOpen = false;

      this.$emit("blur");
    },
    onFocus() {
      this.$refs.pickerPopover.show();
      this.$refs.input.selectAll();
      this.$emit("focus");
    },
    blur(){
      this.$refs.input.blur();
    },
    selected(val) {
      this.$emit("input", val);
      this.$refs.pickerPopover.close();
    },
    updateValueString(newVal) {
      if (newVal === null) {
        this.valueString = "";
      } else {
        this.valueString =
          newVal
            .getDate()
            .toString()
            .padStart(2, "0") +
          "/" +
          (newVal.getMonth() + 1).toString().padStart(2, "0") +
          "/" +
          newVal
            .getFullYear()
            .toString()
            .padStart(4, "0");
      }
    }
  }
};
</script>