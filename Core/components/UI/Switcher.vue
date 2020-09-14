<template>
  <label class="switcher" :class="{ disabled: disabled }">
    <input
      :name="name"
      :checked="value"
      type="checkbox"
      :disabled="disabled"
      @change="$emit('change', $event.target.checked)"
    />
    <p class="switcher__checkmark">
      <slot></slot>
    </p>
  </label>
</template>

<script>
export default {
  name: 'Switcher',
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../../../sass/ui/base.scss";
@import "../../../../../../sass/ui/switcher.scss";
</style>

