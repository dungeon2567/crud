<template>
  <div>
    <Button class="minimal list-header" @click="isOpen = !isOpen">
      <span class="list-content">
        <slot name="header"/>
      </span>
      <div class="arrow-container">
        <i :class="`fas fa-chevron-right arrow ${isOpen ? 'isOpen': ''}`"></i>
      </div>
    </Button>
    <SlideTransition>
      <div v-show="isOpen">
        <slot/>
      </div>
    </SlideTransition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: true
    };
  }
};
</script>

<style>
.list-header {
  display: flex;
  margin: 5px 0;
  padding-left: 2px;
  align-items: center;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  align-content: center;
  text-align: left;
  width: 100%;
  line-height: 17px;
}

.list-content {
  margin-left: 5px;
  flex-grow: 1;
  text-overflow: ellipsis;
}

.list-header .arrow {
  transition: transform 0.3s linear;
  transform: rotate(0deg);
}

.arrow-container {
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.list-header .arrow.isOpen {
  transform: rotate(90deg);
}
</style>