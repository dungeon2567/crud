<style>
.tag-input input {
  border: none;
  background: none;
  flex-grow: 1;
  color: var(--default-color-contrast);
  margin: 2px;
  line-height: 20px;
  height: 20px;
  padding: 0;
  border: none;
  line-height: 20px;
  margin: 2px;
}

.tag-input input::placeholder {
  opacity: 1;
  color: rgba(92, 112, 128, 0.5);
}

.tag-input > .icon {
  font-size: 16px;
  width: 30px;
  margin: auto;
  position: absolute;
}

.tag-input:focus-within,
.tag-input.active {
  box-shadow: 0 0 0 1px var(--primary-color), 0 0 0 3px rgba(19, 124, 189, 0.3),
    inset 0 1px 1px rgba(16, 22, 26, 0.2);
}

.tag-input {
  border-radius: 3px;
  border: 1px solid #e1e2e3;
  display: flex;
  align-items: center;
  background: var(--bg-color);
}

.tag-input-content {
  display: flex;
  flex-wrap: wrap;
  cursor: text;
  flex-grow: 1;
  margin: 2px;
  max-width: 100%;
}

.tag-input-content .input-container {
  flex-grow: 1;
  flex-basis: 100px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  position: relative;
  margin: 2px;

}

.tag {
  padding: 2px 6px;
  background: #5c7080;
  color: var(--primary-color-contrast);
  border-radius: 3px;
  display: flex;
  align-items: center;
  margin: 2px;
  height: 20px;
  max-width: calc(100% - 8px);
}

.tag-label {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: calc(100% - 15px);
}

.tag > .tag-remove {
  color: var(--primary-color-contrast);
  cursor: pointer;
  opacity: 0.5;
  font-size: 16px;
  margin-left: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tag > .tag-remove:hover {
  opacity: 0.8;
}
</style>

<template>
  <div :class="{'tag-input': true, minimal: minimal}">
    <Popover
      ref="itemsPopover"
      trigger="focus"
      @show="onShow"
      @hide="onHide"
      placement="bottom-start"
    >
      <ul
        class="menu scroll-container"
        :style="{maxHeight: '300px'}"
      >
        <li
          :class="{'menu-item': true, 'disabled': true}"
          v-if="items.length === 0"
        >
          Sem Resultados
        </li>
        <li
          :class="{'menu-item': true, 'active': index === selectedIndex}"
          @click="toggle(item)"
          :key="item.value"
          v-for="(item, index) in items"
        >
          <i :class="`${selected(item) ? 'fas fa-check' : ''} icon`"></i>
          <pre v-html="renderHtml(item.label)" />
          </li>
      </ul>
    </Popover>
    <transition-group name="tag" class="tag-input-content" @click="focus">
      <div class="tag" v-for="item in value" :key="item.value">
        <div class="tag-label">
          {{item.label}}
        </div>
        <i class="fas fa-times tag-remove" @click="toggle(item)"/>
      </div>
      <input ref="input" key="input" @blur="onBlur" @focus="onFocus" @keydown="onKeyDown" v-model="query" />
    </transition-group>
    </div>
</template>

<script>
import { throttle } from "../utils.js";

export default {
  props: {
    minimal: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default: null
    },
    clearable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
    search: {
      type: Function,
      default: query => {
        return [];
      }
    }
  },
  data() {
    return {
      isOpen: false,
      query: "",
      items: [],
      focused: false,
      selectedIndex: 0
    };
  },
  watch: {
    value: {
      deep: true,
      handler() {
        if (this.$refs.itemsPopover && this.isOpen) {
          this.$refs.itemsPopover.updatePopper();
        }
      }
    },
    query: {
      immediate: true,
      handler(newVal, oldVal) {
        if (this.isOpen) {
          this.throttleSearch(newVal);
        }
      }
    }
  },
  methods: {
    renderHtml(text) {
      return (
        "<b>" +
        text.substring(0, this.query.length) +
        "</b>" +
        text.substring(this.query.length)
      );
    },
    selected(item) {
      for (var i = 0; i < this.value.length; ++i) {
        const val = this.value[i];

        if (val.value === item.value) {
          return true;
        }
      }

      return false;
    },
    focus() {
      this.$refs.input.focus();
    },
    throttleSearch: throttle(async function(val) {
      try {
        this.items = await this.search(val);

        this.selectedIndex = 0;

        if (this.value !== null) {
          for (var it = 0; it < this.items.length; ++it) {
            var item = this.items[it];

            if (item.value === this.value.value) {
              this.selectedIndex = it;
              break;
            }
          }
        }
      } catch (err) {
        this.items = [];
      }
    }, 250),
    onShow() {
      this.isOpen = true;

      this.$emit("show");

      this.throttleSearch("");
    },
    clear() {
      this.query = "";
      this.value = null;
    },
    onKeyDown(e) {
      switch (e.keyCode) {
        case 13:
          this.query = "";
          this.toggle(this.items[this.selectedIndex]);

          break;
        case 8:
          if (this.query === "" && this.value.length > 0) {
            this.value.splice(this.value.length - 1, 1);
          }
          break;
        case 38:
          this.selectedIndex -= 1;

          if (this.selectedIndex < 0) {
            this.selectedIndex = this.items.length - 1;
          }

          e.preventDefault();
          break;
        case 40:
          this.selectedIndex += 1;

          if (this.selectedIndex >= this.items.length) {
            this.selectedIndex = 0;
          }

          e.preventDefault();
          break;
        case 9:
          this.$refs.itemsPopover.close();
          break;
        default:
          this.selectedIndex = 0;
          break;
      }
    },
    onHide() {
      this.isOpen = false;

      this.items = [];

      this.$emit("hide");
    },
    onBlur() {
      this.focused = false;

      this.query = "";
    },
    onFocus() {
      this.focused = true;
      this.query = "";
      this.$refs.itemsPopover.show();
    },
    toggle(item) {
      for (var i = 0; i < this.value.length; ++i) {
        const val = this.value[i];

        if (val.value === item.value) {
          this.value.splice(i, 1);
          return;
        }
      }

      this.value.push(item);
    }
  }
};
</script>

<style>
.tag-enter-active,
.tag-leave-active {
  transition-duration: 200ms;
  transition-property: transform, opacity;
}

.tag-enter-active {
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
}

.tag-leave-active {
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  position: absolute;
}

.tag-enter,
.tag-leave-to {
  transform: scale(0.7);
  opacity: 0;
}

.tag-move {
  transition: 200ms transform cubic-bezier(0.165, 0.84, 0.44, 1);
}
</style>