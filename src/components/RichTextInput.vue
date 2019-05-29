<script>
import Button from "./Button.vue";
import Dropdown from "./Dropdown.vue";

export default {
  name: "RichTextInput",
  props: {
    value: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(val) {
      if (this.editWatcher) {
        this.$refs.content.innerHTML = val;
      } else {
        this.editWatcher = true;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.content) {
        this.$refs.content.innerHTML = this.value;
      }

      this.refreshToolbar();
    });
  },
  methods: {
    execCommand(e, cmd, args) {
      e.preventDefault();
      this.runCommand(cmd, args);
    },
    runCommand(cmd, args) {
      this.$refs.content.focus();

      document.execCommand(cmd, false, args);

      this.refreshToolbar();
    },
    beginInsertImage(e) {
      e.preventDefault();

      this.$refs.fileUpload.click();
    },
    endInsertImage() {
      var files = this.$refs.fileUpload.files;

      try {
        if (files.length === 1) {
          const reader = new window.FileReader();

          reader.onload = () => {
            this.runCommand("insertHTML", `<image src="${reader.result}"/>`);
          };

          reader.readAsDataURL(files[0]);
        }
      } finally {
        this.$refs.fileUpload.value = "";
      }
    },
    refreshToolbar() {
      this.bold = document.queryCommandState("bold");
      this.italic = document.queryCommandState("italic");
      this.underline = document.queryCommandState("underline");
      this.alignment = document.queryCommandState("justifyRight")
        ? "right"
        : document.queryCommandState("justifyCenter")
        ? "center"
        : document.queryCommandState("justifyFull")
        ? "justify"
        : "left";
    },
    handleFocus() {
      document.addEventListener("selectionchange", this.refreshToolbar);
    },
    handleBlur() {
      document.removeEventListener("selectionchange", this.refreshToolbar);
    },
    handleInput(e) {
      if (this.editWatcher) {
        const val = this.$refs.content.innerHTML;

        if (val !== this.value) {
          this.editWatcher = false;
          this.$emit("input", val);
        }

      }
    }
  },
  computed: {
    alignmentIcon() {
      switch (this.alignment) {
        case "left":
          return "fa-align-left";
        case "right":
          return "fa-align-right";
        case "justify":
          return "fa-align-justify";
        case "center":
          return "fa-align-center";
      }
    }
  },
  data() {
    return {
      editWatcher: true,
      bold: false,
      italic: false,
      underline: false,
      alignment: "right"
    };
  },
  render(h) {
    return (
      <div>
        <div class="editor-toolbar">
          <Button
            class={{ small: true, primary: this.bold }}
            onClick={e => this.execCommand(e, "bold")}
            onMousedown={e => e.preventDefault()}
          >
            <Popover class="tooltip" placement="bottom">
              <span style="white-space: nowrap">Negrito (CTRL+B)</span>
            </Popover>
            <i class="fas fa-bold" />
          </Button>
          <Button
            class={{ small: true, primary: this.italic }}
            onClick={e => this.execCommand(e, "italic")}
            onMousedown={e => e.preventDefault()}
          >
            <Popover class="tooltip" placement="bottom">
              <span style="white-space: nowrap">Italico (CTRL+I)</span>
            </Popover>
            <i class="fas fa-italic" />
          </Button>
          <Button
            class={{ small: true, primary: this.underline }}
            onClick={e => this.execCommand(e, "underline")}
            onMousedown={e => e.preventDefault()}
          >
            <Popover class="tooltip" placement="bottom">
              <span style="white-space: nowrap">Sublinhado (CTRL+U)</span>
            </Popover>
            <i class="fas fa-underline" />
          </Button>
          <Dropdown
            class="small"
            onClick={e => this.execCommand(e, "underline")}
            onMousedown={e => e.preventDefault()}
          >
            <i class={`fas ${this.alignmentIcon}`} />
            <ul
              slot="content"
              class="menu scroll-container"
              style={{ maxHeight: "300px" }}
            >
              <li
                class={{ "menu-item": true, active: this.alignment === "left" }}
                onClick={e => this.execCommand(e, "justifyLeft")}
              >
                {<i class={`fas fa-align-left`} />}{" "}
                <pre> Alinhar a esquerda</pre>
              </li>
              <li
                class={{
                  "menu-item": true,
                  active: this.alignment === "right"
                }}
                onClick={e => this.execCommand(e, "justifyRight")}
              >
                {<i class={`fas fa-align-right`} />}{" "}
                <pre> Alinhar a direita</pre>
              </li>
              <li
                class={{
                  "menu-item": true,
                  active: this.alignment === "center"
                }}
                onClick={e => this.execCommand(e, "justifyCenter")}
              >
                {<i class={`fas fa-align-center`} />}{" "}
                <pre> Alinhar ao centro</pre>
              </li>
              <li
                class={{
                  "menu-item": true,
                  active: this.alignment === "justify"
                }}
                onClick={e => this.execCommand(e, "justifyFull")}
              >
                {<i class={`fas fa-align-justify`} />} <pre> Justificar</pre>
              </li>
            </ul>
          </Dropdown>
          <Button
            class={{ small: true }}
            onClick={this.beginInsertImage}
            onMousedown={e => e.preventDefault()}
          >
            <Popover class="tooltip" placement="bottom">
              <span style="white-space: nowrap">Inserir Imagem</span>
            </Popover>
            <i class="fas fa-image" />
          </Button>
        </div>
        <input
          type="file"
          ref="fileUpload"
          accept="image/*"
          onChange={this.endInsertImage}
          style="display: none"
        />
        <div
          contentEditable="true"
          ref="content"
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onInput={this.handleInput}
          class="editor-content"
        />
      </div>
    );
  }
};
</script>
<style>
.editor-toolbar {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #cccccc;
  border-bottom: none;
  padding: 2px;
  background: var(--table-header-color);
}

.editor-toolbar > * {
  margin: 2px;
}

.editor-content {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  border: 1px solid #cccccc;
  padding: 4px;
  min-height: 120px;
}

.editor-content:focus-within,
.editor-content.active {
  box-shadow: 0 0 0 1px var(--primary-color), 0 0 0 3px rgba(19, 124, 189, 0.3),
    inset 0 1px 1px rgba(16, 22, 26, 0.2);
}
</style>