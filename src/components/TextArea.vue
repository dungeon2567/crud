<style>
.textarea {
  border-radius: 3px;
  border: 1px solid #cccccc;
  background: var(--bg-color);
  padding: 2px;
  min-height: 66px;
} 

.textarea:focus {
  background: #fff;
  box-shadow: 0 0 0 1px var(--primary-color), 0 0 0 3px rgba(19, 124, 189, 0.3),
    inset 0 1px 1px rgba(16, 22, 26, 0.2);
}

.textarea:empty:before {
  content: attr(placeholder);
  color: rgba(92, 112, 128, 0.5);
  display: block;
}
</style>

<template>
  <div
    tabindex="0"
    :placeholder="placeholder"
    ref="input"
    contenteditable="true"
    class="textarea"
    @paste="onPaste"
    @click="focus"
    @input="onInput"
  >

  </div>
</template>

<script>
export default {
  props: {
    value: String,
    placeholder: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      editWatcher: true
    };
  },
  watch: {
    value(val) {
      if (this.editWatcher) {
        this.$refs.input.innerText = val;
      } else {
        this.editWatcher = true;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.input.innerText = this.value;
    });
  },
  methods: {
    clear() {
      this.$emit("input", "");
      this.focus();
    },
    focus() {
      this.$refs.input.focus();
    },
    onPaste(e) {
      e.preventDefault();
      var text = e.clipboardData.getData("text/plain");
      document.execCommand("insertHTML", false, text);
    },
    onInput(e) {
      if (this.editWatcher) {
        const val = this.$refs.input.innerText;
        if (val !== this.value) {
          this.editWatcher = false;
          this.$emit("input", val);
        }
      }
    },
    selectAll() {
      this.$refs.input.select();
    }
  }
};
</script>