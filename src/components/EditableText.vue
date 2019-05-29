<style>
.editable-text {
  border-radius: 3px;
  display: flex;
  align-items: center;
  padding-left: 4px;
  padding-right: 4px;
  height: 30px;
  line-height: 30px;
  cursor: text;
  display: inline-block;
  position: relative;
  white-space: nowrap;
  /*min-width: 100px;*/
  max-width: 100%;
  overflow: hidden;
}

.editable-text:hover {
  box-shadow: 0 0 0 0 rgba(19, 124, 189, 0), 0 0 0 0 rgba(19, 124, 189, 0),
    inset 0 0 0 1px rgba(16, 22, 26, 0.15);
}

.editable-text:focus {
  background: #fff;
  box-shadow: 0 0 0 1px var(--primary-color), 0 0 0 3px rgba(19, 124, 189, 0.3),
    inset 0 1px 1px rgba(16, 22, 26, 0.2);
}

.editable-text br {
  display: none;
}

.editable-text * {
  display: inline;
  white-space: nowrap;
}

.editable-text:empty:before {
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
    class="editable-text"
    @keydown.enter="blur"
    @click="focus"
    @blur="onBlur"
    @paste="onPaste"
  ></div>
</template>

<script>
export default {
  props: {
    value: String,
    placeholder: {
      type: String,
      default: "Clique para editar"
    }
  },
  watch: {
    value(val) {
      if (this.$refs.input) {
        this.$refs.input.innerText = val;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.input.innerText = this.value;
    });
  },
  methods: {
    onResize({ width }) {
      this.width = width + "px";
    },
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
    onBlur() {
      this.$emit(
        "input",
        this.$refs.input.innerText.trim().replace(/(\r\n\t|\n|\r\t)/gm, "")
      );
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