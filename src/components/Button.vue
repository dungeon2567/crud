<script>
export default {
  name: "HelloWorld",
  functional: true,
  render(h, { data, children }) {
    return h("button", data, children);
  }
};
</script>

<style>
button > .icon {
  font-size: 24px;
  width: 24px;
  margin: auto;
  position: absolute;
}

button {
  position: relative;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  justify-content: center;
  vertical-align: middle;
  text-align: center;
  font-size: 12px!important;
  font-weight: bold;
  min-width: 30px;
  min-height: 30px;

  box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2),
    inset 0 -1px 0 rgba(16, 22, 26, 0.1);

  background-color: var(--default-color);
  color: var(--default-color-contrast);
}

button.small {
  height: 16px;
  width: 16px;
}

button > .icon {
  font-size: 20px;
}

button.small > .icon {
  font-size: 16px;
  width: 16px;
}

button:hover {
  background-color: var(--default-color-hover);
}

button:active,
button.active {
  background-color: var(--default-color-active);
}

button.primary {
  background-color: var(--primary-color);
  color: var(--primary-color-contrast);
}

button.primary:hover {
  background-color: var(--primary-color-hover);
}

button.primary:active,
button.primary.active {
  background-color: var(--primary-color-active);
}

button.success {
  background-color: var(--success-color);
  color: var(--success-color-contrast);
}

button.success:hover {
  background-color: var(--success-color-hover);
}

button.success:active,
button.success.active {
  background-color: var(--success-color-active);
}

button.warning {
  background-color: var(--warning-color);
  color: var(--warning-color-contrast);
}

button.warning:hover {
  background-color: var(--warning-color-hover);
}

button.warning:active,
button.warning.active {
  background-color: var(--warning-color-active);
}

button.danger {
  background-color: var(--danger-color);
  color: var(--danger-color-contrast);
}

button.danger:hover {
  background-color: var(--danger-color-hover);
}

button.danger:active,
button.danger.active {
  background-color: var(--danger-color-active);
}

button.minimal {
  box-shadow: none;
  background: none;
  color: inherit;
  border: none;
}

button.minimal.warning {
  color: var(--warning-color);
}

button.minimal.danger {
  color: var(--danger-color);
}

button.minimal.primary {
  color: var(--primary-color);
}

button.minimal.success {
  color: var(--success-color);
}

button.minimal:hover {
  box-shadow: none;
  background: var(--minimal-color-hover);
  text-decoration: none;
}

button.fill {
  width: 100%;
}

button.minimal:active,
button.minimal.active {
  box-shadow: none;
  background: var(--minimal-color-active);
  text-decoration: none;
}

button.small {
  min-width: 24px;
  min-height: 24px;
}

button:disabled {
  color: rgba(92, 112, 128, 0.5);
  cursor: not-allowed !important;
  background: none !important;
  border: none !important;
  box-shadow: none !important;
}
</style>
