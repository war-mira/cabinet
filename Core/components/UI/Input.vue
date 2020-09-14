<template>
  <div
    :class="[
      'input--wrapper',
      valid.active ? `input--${valid.type}` : ''
    ]"
  >
    <div :class="labelBreakpoint">
      <label
        v-if="label.active"
        :class="['input__label', label.class ? label.class : '']"
        >{{ label.text }}
          <br/>
          <span v-if="label.description">{{label.description}}</span>
        </label
      >
      <div
        class="input"
        :class="[
          `input--${size}`,
          `input--${theme}`,
          { 'input--rounded': rounded },
          { disabled: disabled },
          inputClass
        ]"
      >
        <slot v-if="hasBeforeInputSlot" name="beforeInputPlace"></slot>
        <div :class="['input--block', inputBlockClass]">
          <slot v-if="hasInputSlot" name="inputPlace"></slot>
          <input
            v-else
            :value="value"
            :type="type"
            :placeholder="placeholder"
            :disabled="disabled"
            @input="$emit('change', $event.target.value)"
            @blur="$emit('blur', $event.target.value)"
          />
          <div class="input--right">
            <slot name="right"></slot>
          </div>
          <i v-if="valid.active" class="fas" @click="closeValid"></i>
        </div>
        <slot v-if="hasAfterInputSlot" name="afterInputPlace"></slot>
      </div>
    </div>
    <div
      v-if="valid.active && valid.text"
      :class="validationBreakpoint"
    >
      <label
        v-if="label.active && label.align == 'column'"
        :class="['input__label', label.class ? label.class : '']"
      ></label>
      <span :class="['input__bottom-text', valid.class]">{{
        valid.text
      }}</span>
    </div>
    <div
      v-if="inputDescription"
      :class="labelBreakpoint"
    >
      <label
        v-if="label.active"
        :class="['input__label', label.class ? label.class : '']"
      ></label>
      <div :class="[inputClass, 'input__desc']" >
        {{inputDescription}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    label: {
      type: Object,
      default: function() {
        return {
          active: false
        };
      }
    },
    validation: {
      type: Object,
      default: function() {
        return {
          active: false
        };
      }
    },
    theme: {
      type: String,
      default: 'primary',
      required: false
    },
    rounded: {
      type: Boolean,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    inputClass: {
      type: String,
      default: ''
    },
    inputDescription: {
      type: String,
      default: ''
    },
    inputBlockClass: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'medium'
    },
    value: {
      default: ''
    }
  },
  data(){
    return{
      valid: this.validation
    }
  },
  watch:{
    validation:function(el){
      this.valid = el
    }
  },
  computed: {
    hasInputSlot() {
      return !!this.$slots.inputPlace;
    },
    hasBeforeInputSlot() {
      return !!this.$slots.beforeInputPlace;
    },
    hasAfterInputSlot() {
      return !!this.$slots.afterInputPlace;
    },
    labelBreakpoint() {
      let arr = [];
      if (this.label.active) arr.push(`input--${this.label.align}`);
      if (this.label.active && this.label.breakpoint) {
        Object.keys(this.label.breakpoint).map(el => {
          arr.push(`input--${this.label.breakpoint[el]}_${el}`);
        });
      }
      return arr;
    },
    validationBreakpoint() {
      let arr = [];
      if (this.label.active && this.label.align == 'column')
        arr.push(`input--${this.label.align}`);
      if (this.valid.active && this.valid.breakpoint) {
        Object.keys(this.valid.breakpoint).map(el => {
          arr.push(`input--${this.valid.breakpoint[el]}_${el}`);
        });
      }
      return arr;
    }
  },
  methods:{
    closeValid(){
      this.valid.active = false
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../../../sass/ui/base.scss";
@import "../../../../../../sass/ui/input.scss";
</style>
