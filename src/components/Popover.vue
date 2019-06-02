<style>
.popper {
  z-index: 20;
}

.popover {
  border-radius: 3px;
  background-color: var(--bg-color);
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 2px 4px rgba(16, 22, 26, 0.2),
    0 8px 24px rgba(16, 22, 26, 0.2);
  padding: 5px;
  color: var(--default-color-contrast);
  cursor: default;
}

.popper.tooltip > div > .popover {
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 2px 4px rgba(16, 22, 26, 0.2),
    0 8px 24px rgba(16, 22, 26, 0.2);
  background-color: #394b59;
  color: #f5f8fa;
}

div[x-placement^="right"] > div > .popover > .popover-arrow {
  left: -10px;
}

div[x-placement^="left"] > div > .popover > .popover-arrow {
  right: -10px;
  transform: rotate(180deg);
}

div[x-placement^="top"] > div > .popover > .popover-arrow {
  bottom: -10px;
  transform: rotate(270deg);
}

div[x-placement^="bottom"] > div > .popover > .popover-arrow {
  top: -10px;
  transform: rotate(90deg);
}

.popover-arrow {
  position: absolute;
  width: 30px;
  height: 30px;
  pointer-events: none;
  background: none;
}

.popover-arrow-border {
  fill: #10161a;
  fill-opacity: 0.1;
  pointer-events: all;
}

.popper.tooltip
  > div
  > .popover
  > .popover-arrow
  > svg
  > path.popover-arrow-border {
  fill: #10161a;
  fill-opacity: 0.1;
}

.popover-arrow-fill {
  fill: var(--bg-color);
  pointer-events: all;
}

.popper.tooltip
  > div
  > .popover
  > .popover-arrow
  > svg
  > path.popover-arrow-fill {
  fill: #394b59;
}

.fade-scale-enter {
  opacity: 0;
  transform: scale(0);
}

.fade-scale-enter-to {
  opacity: 1;
  transform: scale(1);
}

.fade-scale-leave {
  opacity: 1;
  transform: scale(1);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0);
}

.fade-scale-enter-active {
  transition: opacity 0.25s cubic-bezier(0.4, 1, 0.75, 0.9),
    transform 0.25s cubic-bezier(0.4, 1, 0.75, 0.9);
}

.fade-scale-leave-active {
  transition: opacity 0.25s cubic-bezier(0.4, 1, 0.75, 0.9),
    transform 0.25s cubic-bezier(0.4, 1, 0.75, 0.9);
}
</style>

<template>
  <div
    ref="popper"
    class="popper"
    v-resize="onResize"
  >
    <transition
      name="fade-scale"
      @before-enter="doCreate"
      @after-leave="doDestroy"
    >
      <div v-if="showPopper">
        <div class="popover">
          <div
            ref="arrow"
            class="popover-arrow"
          >
            <svg viewBox="0 0 30 30">
              <path
                class="popover-arrow-border"
                d="M8.11 6.302c1.015-.936 1.887-2.922 1.887-4.297v26c0-1.378-.868-3.357-1.888-4.297L.925 17.09c-1.237-1.14-1.233-3.034 0-4.17L8.11 6.302z"
              ></path>
              <path
                class="popover-arrow-fill"
                d="M8.787 7.036c1.22-1.125 2.21-3.376 2.21-5.03V0v30-2.005c0-1.654-.983-3.9-2.21-5.03l-7.183-6.616c-.81-.746-.802-1.96 0-2.7l7.183-6.614z"
              ></path>
            </svg>
          </div>
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Popper from "popper.js";

export default {
  props: {
    trigger: {
      type: String,
      default: "hover"
    },
    delayOnMouseOver: {
      type: Number,
      default: 50
    },
    delayOnMouseOut: {
      type: Number,
      default: 250
    },
    placement: {
      type: String,
      default: "bottom"
    },
    contentStyle: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      showPopper: false
    };
  },
  mounted() {
    this.referenceElm = this.$refs.popper.parentElement;
    this.popper = this.$refs.popper;

    switch (this.trigger) {
      case "click":
        this.referenceElm.addEventListener("click", this.onClick, false);
        document.addEventListener("mousedown", this.handleDocumentClick, false);
        break;
      case "hover":
        this.referenceElm.addEventListener(
          "mouseover",
          this.onMouseOver,
          false
        );
        this.referenceElm.addEventListener("focus", this.onMouseOver, false);
        this.popper.addEventListener("mouseover", this.onMouseOver, false);
        this.popper.addEventListener("focus", this.onMouseOver, false);
        this.referenceElm.addEventListener("mouseout", this.onMouseOut, false);
        this.referenceElm.addEventListener("blur", this.onMouseOut, false);
        this.popper.addEventListener("mouseout", this.onMouseOut, false);
        this.popper.addEventListener("blur", this.onMouseOut, false);
        break;
      case "focus":
        document.addEventListener("mousedown", this.handleDocumentClick, false);
        break;
    }
  },
  methods: {
    doCreate() {
      this.createPopper();

      this.$emit("show", this);
    },
    onResize() {
      if (this.popperJS) {
        this.updatePopper();
      }
    },
    onClick(e) {
      if (!this.$el || !this.referenceElm || this.$el.contains(e.target)) {
        return;
      }

      this.toggle();
    },
    toggle() {
      if (this.showPopper) {
        this.close();
      } else {
        this.show();
      }
    },
    show() {
      if (!this.showPopper) {
        this.showPopper = true;
        this.$emit("open");
      }
    },
    close() {
      if (this.showPopper) {
        this.showPopper = false;
        this.$emit("close");
      }
    },
    doDestroy() {
      if (this.popperJS) {
        this.popperJS.destroy();
        this.popperJS = null;
      }

      this.$emit("hide", this);
    },
    createPopper() {
      if (this.popperJS && this.popperJS.destroy) {
        this.popperJS.destroy();
      }

      this.$nextTick(() => {
        this.popperJS = new Popper(this.referenceElm, this.popper, {
          modifiers: {
            flip: {
              enabled: true
            },
            arrow: {
              element: this.$refs.arrow
            },
            offset: {
              enabled: true,
              offset: "0, 15"
            }
          },
          placement: this.placement,

          computeStyle: {
            gpuAcceleration: true
          }
        });
      });
    },
    destroyPopper() {
      this.referenceElm.removeEventListener(
        "mouseover",
        this.onMouseOver,
        false
      );
      this.referenceElm.removeEventListener("focus", this.onMouseOver, false);
      this.popper.removeEventListener("mouseover", this.onMouseOver, false);
      this.popper.removeEventListener("focus", this.onMouseOver, false);
      this.referenceElm.removeEventListener("mouseout", this.onMouseOut, false);
      this.referenceElm.removeEventListener("blur", this.onMouseOut, false);
      this.popper.removeEventListener("mouseout", this.onMouseOut, false);
      this.popper.removeEventListener("blur", this.onMouseOut, false);
      document.removeEventListener(
        "mousedown",
        this.handleDocumentClick,
        false
      );

      this.showPopper = false;
    },
    updatePopper() {
      this.popperJS.scheduleUpdate();
    },
    onMouseOver(e) {
      clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        this.show();
      }, this.delayOnMouseOver);
    },
    onMouseOut(e) {
      clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        this.close();
      }, this.delayOnMouseOut);
    },
    handleDocumentClick(e) {
      if (
        !this.$el ||
        !this.referenceElm ||
        this.$el.contains(e.target) ||
        this.referenceElm.contains(e.target) ||
        !this.popper ||
        this.popper.contains(e.target)
      ) {
        return;
      }

      this.close();
    }
  },
  destroyed() {
    this.destroyPopper();
  }
};
</script>