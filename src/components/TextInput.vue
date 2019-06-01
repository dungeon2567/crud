<style>
input {
	border: none;
	background: none;
	flex-grow: 1;
	flex-shrink: 1;
	flex-basis: 100px;

	color: var(--default-color-contrast);
	margin: 2px;
	line-height: 24px;
	height: 24px;
	width: 100%;
	max-width: 100%;

	padding-left: 6px;
	padding-right: 6px;

}

.text-input {
	flex-grow: 1;
}

input::placeholder {
	opacity: 1;
	color: rgba(92, 112, 128, 0.5);
}

.text-input > .icon {
	font-size: 16px;
	width: 30px;
	margin: auto;
}

.text-input > .action {
	padding: 0;
	justify-content: center;
}

.text-input > .action > .icon {
	font-size: 16px;
}

.text-input:focus-within,
.text-input.active {
	box-shadow: 0 0 0 1px var(--primary-color), 0 0 0 3px rgba(19, 124, 189, 0.3), inset 0 1px 1px rgba(16, 22, 26, 0.2);
}

.text-input {
	border-radius: 3px;
	border: 1px solid #cccccc;
	display: flex;
	align-items: center;
	background: var(--bg-color);
	padding: 2px;
}

.text-input.minimal {
	box-shadow: none;
	border: none;
	background: none;
}
</style>

<template>
  <div :class="{'text-input': true, minimal: minimal}">
    <slot/>
    <slot name="before"/>
    <input
      ref="input"
      v-bind="$attrs"
      :value="value"
      v-on="listeners"
    >
    <slot name="after">
      <Button v-if="clearable && value" class="action minimal small" @click="clear">
        <i class="fas fa-times tag-remove"/>
      </Button>
    </slot>
  </div>
</template>

<script>
export default {
	props: {
		minimal: {
			type: Boolean,
			default: false,
		},
		value: String,
		clearable: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		listeners() {
			return {
				...this.$listeners,
				focus: event => {
					this.focused = true;

					this.$emit('focus', event);
				},
				keydown: event => {
					this.$emit('keydown', event);
	
					if(event.keyCode === 8 && event.target.value.length === 0){
						this.$emit('remove');
						console.log('remove');
					}
				},
				keyup: event => {
					event.preventDefault();
					
					this.$emit('keyup', event);
				},
				blur: event => {
					this.focused = false;

					this.$emit('blur', event);
				},
				input: event => this.$emit('input', event.target.value),
			};
		},
	},
	methods: {
		clear() {
			this.$emit('input', '');
			this.focus();
		},
		focus() {
			this.$refs.input.focus();
		},
		blur() {
			this.$refs.input.blur();
		},
		selectAll() {
			this.$refs.input.select();
		},
	},
};
</script>