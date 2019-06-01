<style>
.overlay-backdrop {
  z-index: 30;
  top: 50px;
  background: rgba(0, 0, 0, 0.4);
  height: calc(100% - 50px);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: background-color 0.45s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
    0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
}

.overlay.fullscreen {
  width: 100%;
  height: 100%;
}

.overlay-header {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  background: white;
  z-index: 21;
  padding: 10px;
  flex-shrink: 0;
  border-bottom: 1px solid #cccccc;
}

.overlay-footer {
  background: white;
  border-top: 1px solid #cccccc;
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 2px;
}

.overlay-footer > * {
  margin: 4px;
}

.overlay-body {
  flex-grow: 1;
  background: #fff;
  overflow: auto;
  padding: 16px;  
}

.overlay-header-content {
  flex-grow: 1;
}

.overlay-enter,
.overlay-leave-to {
  background-color: rgba(0, 0, 0, 0);
}

.overlay-enter > .overlay {
  opacity: 0;
  transform: scale(0);
}

.overlay-enter-to > .overlay {
  opacity: 1;
  transform: scale(1);
}

.overlay-leave > .overlay {
  opacity: 1;
  transform: scale(1);
}

.overlay-leave-to > .overlay {
  opacity: 0;
  transform: scale(0);
}

.overlay-enter-active > .overlay {
  transition: opacity 0.45s cubic-bezier(0.4, 1, 0.75, 0.9),
    transform 0.45s cubic-bezier(0.4, 1, 0.75, 0.9);
}

.overlay-leave-active > .overlay {
  transition: opacity 0.45s cubic-bezier(0.4, 1, 0.75, 0.9),
    transform 0.45s cubic-bezier(0.4, 1, 0.75, 0.9);
}

@media (min-width: 512px) {
  .overlay {
    width: 512px;
    height: 512px;
  }
}

@media (max-width: 513px) {
  .overlay {
    width: 100vw;
    height: 100vh;
  }
}

@media (min-width: 1024px) {
  .overlay {
    width: 768px;
    height: 512px;
  }
}

</style>


<template funcional>
  <transition name="overlay">
    <div class="overlay-backdrop" ref="backdrop" @click.stop="$event.target === $refs.backdrop && $emit('close')">
      <div :class="{overlay: true, fullscreen: this.maximized}">
        <div class="overlay-header">
          <div class="overlay-header-content">
            <slot name="header" />
          </div>
          <button class="action minimal small" @click.stop="$emit('close')">
            <i class="fas fa-times icon"/>
          </button>
        </div>
        <div class="overlay-body">
          <slot name="body" />
        </div>
        <div class="overlay-footer">
          <slot name="footer" />
        </div>
        <slot/>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    maximized: {
      type: Boolean,
      default: false
    }
  }
};
</script>
