<style>
.editable-textarea {
  border-radius: 3px;
  display: flex;
  align-items: center;
  padding-left: 4px;
  padding-right: 4px;
  line-height: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  cursor: text;
  display: inline-block;
  position: relative;
  min-width: 200px;
  max-width: 100%;
  overflow: hidden;
}

.editable-textarea:hover {
  box-shadow: 0 0 0 0 rgba(19, 124, 189, 0), 0 0 0 0 rgba(19, 124, 189, 0),
    inset 0 0 0 1px rgba(16, 22, 26, 0.15);
}

.editable-textarea:focus {
  background: #fff;
  box-shadow: 0 0 0 1px var(--primary-color), 0 0 0 3px rgba(19, 124, 189, 0.3),
    inset 0 1px 1px rgba(16, 22, 26, 0.2);
}

.editable-textarea:empty:before {
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
    class="editable-textarea"
    @input="onInput"
    @paste="onPaste"
    @click="focus"
    @focus="onFocus"
  >

  </div>
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
      if (this.editWatcher) {
        this.$refs.content.innerText = val;
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
  data() {
    return {
      editWatcher: true
    };
  },
  methods: {
    clear() {
      this.$emit("input", "");
      this.focus();
    },
    focus() {
      this.$refs.input.focus();
    },
    onFocus() {
      this.$nextTick(() => {
        document.execCommand("selectAll", false, null);
      });
    },
    onPaste(e) {
      e.preventDefault();
      var text = e.clipboardData.getData("text/plain");
      document.execCommand("insertHTML", false, text);
    },
    onInput(e) {
      if (this.editWatcher) {
        const val = this.$refs.content.innerText;
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