<template>
  <div
    :class="{'input-table-body-cell': true, focused: focused}"
    @click="focus"
    @focus="focus"
    tabindex="0"
  >
    <template v-if="focused">
      <TextInput
        v-if="type === 'text'"
        minimal
        @blur="blur"
        ref="input"
        :value="value"
        @input="$emit('input', $event)"
      />
      <TextInput
        v-if="type === 'currency' || type === 'percentage' || type === 'numeric'"
        minimal
        @blur="blur"
        ref="input"
        v-money="{precision: 2}"
        v-model="model"
      />
      <DateInput
        v-else-if="type === 'date'"
        minimal
        @blur="blur"
        ref="input"
        :value="value"
        @input="$emit('input', $event)"
      />
      <Suggest
        ref="input"
        @input="$emit('input', $event != null ? $event.id : null)"
        @blur="blur"
        :value="value != null ? {id: value, text: type[value]} : null"
        v-else-if="(typeof type === 'object')"
        :search="filterObjectType"
      ></Suggest>
    </template>
    <template v-else-if="value != null">
      <template v-if="type === 'text'">{{value}}</template>
      <template v-else-if="type === 'currency'">{{formatMoney(value)}}</template>
      <template v-else-if="type === 'percentage'">{{formatPercentage(value * 100)}}</template>
      <template v-else-if="type === 'numeric'">{{formatNumber(value)}}</template>
      <template v-else-if="type === 'date'">
        <i class="far fa-clock table-cell-icon"/>
        {{value.formatDate()}}
      </template>
      <template v-else-if="(typeof type === 'object')">{{type[value]}}</template>
    </template>
  </div>
</template>

<script>
import {format, unformat} from './../utils';

export default {
  props: ["type", "value"],

  data() {
    return {
      model: "",
      focused: false
    };
  },
  methods: {
    formatMoney(val) {
      return val == null || isNaN(val) ? "" : "R$ " + format(val);
    },
    formatPercentage(val) {
      return val == null || isNaN(val) ? "" : format(val) + "%";
    },
    formatNumber(val) {
      return val == null || isNaN(val) ? "" : format(val);
    },
    filterObjectType(query) {
      var results = [];

      for (let [key, value] of Object.entries(this.type)) {
        if (value.toLowerCase().startsWith(query.toLowerCase())) {
          results.push({
            id: key,
            text: value
          });
        }
      }

      return results;
    },
    focus() {
      if (!this.focused) {
        this.focused = true;

        if (this.value != null) {
          switch (this.type) {
            case "currency":
            case "numeric":
              this.model = this.value == null || isNaN(this.value) ? '' : format(this.value);
              break;
            case "percentage":
              this.model = this.value == null || isNaN(this.value) ? '' : format(this.value * 100);
              break;

          }
        } else {
          this.model = "";
        }

        this.$nextTick(() => {
          this.$refs.input.focus();      
        });
      }
    },
    blur() {
      this.focused = false;

      switch (this.type) {
        case "currency":
          this.$emit("input", unformat(this.model, 2));
          break;
        case "percentage":
          this.$emit("input", unformat(this.model, 2) / 100);
          break;
        case "numeric":
          this.$emit("input", unformat(this.model, 2));
          break;
      }

      this.$emit("blur");
    }
  }
};
</script>
