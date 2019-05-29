<template>
  <div class="tabs-container">
    <div class="tabs">
      <div
        v-for="tab in tabs"
        ref="tab"
        :key="tab.id"
        :class="{tab: true, active: value === tab.id, error: tab.error}"
      >
        <div class="tab-content" @click="setActiveTab(tab.id)">
          <i :class="`fas fa-${tab.icon} icon`" v-if="tab.icon"/>
          {{tab.title}}
        </div>
        <div class="slider" ref="slider" v-if="value === tab.id">
          <div class="indicator"/>
        </div>
      </div>
    </div>
    <div class="tab-items">
      <transition name="fade" :duration="{enter: 175, leave: 175}" mode="out-in">
        <div v-if="value" :key="value">
          <slot :name="value"/>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: {
    value: {
      type: String,
      required: false
    },
    tabs: {
      type: Array
    }
  },
  data() {
    return {
      sliderStyle: {}
    };
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal != oldVal && this.$refs && this.$refs.tab) {
        let oldIndex = this.indexOf(oldVal);
        let newIndex = this.indexOf(newVal);

        let oldTab = this.$refs.tab[oldIndex];
        let newTab = this.$refs.tab[newIndex];

        let oldWidth = oldTab.offsetWidth;

        let oldOffset = oldTab.offsetLeft;

        let newWidth = newTab.offsetWidth;

        let newOffset = newTab.offsetLeft;

        this.$nextTick(() => {
          let slider = this.$refs.slider[0];

          if (slider) {
            slider.animate(
              [
                {
                  transform: `translateX(${-(newOffset - oldOffset)}px)`,
                  width: oldWidth + "px"
                },
                {
                  transform: "none",
                  width: "100%"
                }
              ],
              {
                duration: 350,
                easing: 'ease-in-out'
              }
            );
          }
        });
      }
    }
  },
  methods: {
    indexOf(id) {
      for (let i = 0; i < this.tabs.length; ++i) {
        let tab = this.tabs[i];

        if (tab.id === id) return i;
      }

      return -1;
    },
    setActiveTab(tab) {
      this.$emit("input", tab);
    }
  }
};
</script>

<style>
.tabs-container {
  display: flex;
  flex-direction: column;
}

.tab-items {
  flex-grow: 1;
}

.tabs {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-content: space-between;
  align-items: flex-end;
  overflow: hidden;
  margin-top: 10px;
  margin-bottom: 5px;
  position: relative;
  border-bottom: 1px solid rgba(16, 22, 26, 0.15);
}

.tabs > .tab {
  position: relative;
  min-width: 140px;
}


.tab-content {
  font-size: 14px;
  margin-bottom: 10px;
  color: #5c7080;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 5px;
  padding-right: 5px;
  white-space: nowrap;
}


.tab-content:hover,
.tab-content:focus,
.tab-content:active {
  color: var(--primary-color);
}

.tabs > .tab.active > .tab-content {
  color: var(--primary-color);
  cursor: default;
}

.tabs > .tab.error > .tab-content {
  color: var(--danger-color);
}

.tab > .slider {
  position: absolute;
  bottom: 0;
  border-radius: 1px;
  padding-left: 5px;
  padding-right: 5px;
  transform: none;
  width: 100%;
}

.tab > .slider > .indicator {
  height: 2px;
  background: var(--primary-color);
}

.tab.error > .slider > .indicator {
  background: var(--danger-color);
}
</style>
