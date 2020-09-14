<template>
  <div
    :class="[
      'tag',
      `tag--${theme}`,
      `tag--${size}`,
      icon && icon.class ? 'tag--icon' : '',
      icon && icon.active ? 'tag--icon_active' : '',
      { disabled: disabled },
      { active: active }
    ]"
  >
    <slot></slot>
    <i v-if="icon && icon.class" :class="icon.class"></i>
  </div>
</template>

<script>
export default {
  name: 'Tag',
  props: {
    theme: {
      type: String,
      default: 'light',
      required: false
    },
    size: {
      type: String,
      default: 'medium',
      required: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Object,
      default: function() {
        return {};
      },
      required: false
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../../../sass/ui/base.scss";
@import "../../../../../../sass/ui/tag.scss";
</style>
