<template>
  <div class="select-search--wrapper">
    <div
      :class="[valid.active ? `select-search--${valid.type}` : '']"
    >
      <div :class="labelBreakpoint">
        <label
          v-if="label.active"
          :class="['select-search__label', label.class ? label.class : '']"
          >{{ label.text }}
          <br/>
          <span v-if="label.description">{{label.description}}</span>
          </label
        >
        <div
          v-if="!disabled || (disabled && max == 1)"
          class="select-search"
          :class="[
            `select-search--${size}`,
            `select-search--${theme}`,
            { 'select-search--rounded': rounded },
            inputClass
          ]"
        >
          <input
            v-model="search"
            :placeholder="inputPlaceholder"
            :disabled="disabled"
            type="text"
            @input="input"
            @keyup.down="onKeyDown"
            @keyup.up="onKeyUp"
          />
          <div class="select-search--right">
            <slot name="right"></slot>
          </div>
          <i v-if="valid.active" class="fas" @click="closeValid"></i>
          <div
            :class="{ show: (show && options.length > 0) || (show && add) }"
            class="select-search__options"
          >
            <div
              v-for="(option, ind) in options"
              :key="ind"
              class="select-search__option"
              @click="select(option)"
            >
              {{ option.value }}
            </div>
            <div
              v-show="add && options.length < 1"
              class="select-search__option"
              @click="build"
            >
              <span>
                Создать :
                {{ search }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="valid.active && valid.text"
        :class="validationBreakpoint"
      >
        <label
          v-if="label.active && label.align == 'column'"
          :class="['select-search__label', label.class ? label.class : '']"
        ></label>
        <span :class="['select-search__bottom-text', valid.class]">{{
          valid.text
        }}</span>
      </div>
    </div>
    <div
      v-if="inputDescription"
      :class="labelBreakpoint"
    >
      <label
        v-if="label.active"
        :class="['select-search__label', label.class ? label.class : '']"
      ></label>
      <div :class="[inputClass, 'select-search__desc']" >
        {{inputDescription}}
      </div>
    </div>
    <div
      v-if="max !== 1"
      :class="labelBreakpoint"
    >
      <label
        v-if="label.active"
        :class="['select-search__label', label.class ? label.class : '']"
      ></label>
      <div
        :class="[{ 'select-search__tags': children.length > 0 },inputClass]"
      >
        <div
          v-for="(type, ind) in children"
          :key="ind"
          class="tag tag--light tag--icon"
        >
          {{ type.name }}
          <i class="fas fa-times" @click="removeChild(ind)"></i>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'SelectSearch',
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
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
    // index данного компонента, увеличивается в зависимости повторения компонента
    // заменить на key в дальнейшем
    index: {
      type: Number,
      required: true
    },
    // max number of selected elements
    max: {
      type: Number,
      required: true
    },
    model: {
      type: String,
      default: ''
    },
    inputPlaceholder: {
      type: String,
      default: ''
    },
    mountMethod: {
      type: String,
      default: ''
    },
    optionsPrev: {
      type: Array,
      default: function() {
        return [];
      }
    },
    children: {
      type: Array,
      default: function() {
        return [];
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    create: {
      type: Boolean,
      default: false
    },
    inputClass: {
      type: String,
      default: ''
    },
    inputDescription: {
      type: String,
      default: ''
    },
    var: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'medium'
    },
    validation: {
      type: Object,
      default: function() {
        return {
          active: false
        };
      }
    },
    rounded: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      valid: this.validation,
      instance: Math.random()
        .toString(36)
        .substring(7),
      options: this.optionsPrev,
      search: this.value,
      show: false,
      add: this.create
    };
  },

  /*
   *   wot: Computed
   */
  computed: {
    autocomplete: function() {
      return this.search;
    },
    iid: function() {
      return this.model + this.instance;
    },
    labelBreakpoint() {
      let arr = [];
      if (this.label.active) arr.push(`select-search--${this.label.align}`);
      if (this.label.active && this.label.breakpoint) {
        Object.keys(this.label.breakpoint).map(el => {
          arr.push(`select-search--${this.label.breakpoint[el]}_${el}`);
        });
      }
      return arr;
    },
    validationBreakpoint() {
      let arr = [];
      if (this.label.active && this.label.align == 'column')
        arr.push(`select-search--${this.label.align}`);
      if (this.valid.active && this.valid.breakpoint) {
        Object.keys(this.valid.breakpoint).map(el => {
          arr.push(`select-search--${this.valid.breakpoint[el]}_${el}`);
        });
      }
      return arr;
    }
  },
  watch: {
    validation:function(el){
      this.valid = el
    },
    value(val) {
      this.search = val;
    },
    optionsPrev(val) {
      this.options = val;
    },
    options(val, oldval) {
      if (val !== oldval && this.search && this.create) {
        if (val.length <= 0) {
          this.add = true;
        } else {
          this.add = false;
        }
      }
    }
  },
  created: function() {
    //чтобы закрывался при отведения курсора
    let self = this;
    window.addEventListener('click', function(e) {
      // close dropdown when clicked outside
      if (!self.$el.contains(e.target)) {
        self.show = false;
      }
    });
  },
  mounted: function() {
    this.$emit('mount', {
      iid: this.iid,
      // val: this.val,
      search: this.search,
      max: this.max,
      index: this.index,
      mountMethod: this.mountMethod
    });
  },
  methods: {
    closeValid(){
      this.valid.active = false
    },
    build() {
      // this.val = {
      //   name: this.search
      // };
      this.show = false;
      this.$emit('created', {
        val: {
          name: this.search
        },
        index: this.index
      });
    },
    onKeyDown() {
      this.show = true;
    },
    onKeyUp() {
      this.show = false;
    },
    removeChild(childIndex) {
      this.$emit('removeChild', {
        childIndex,
        index: this.index,
        var: this.var
      });
    },
    input(e) {
      this.show = false;
      this.$emit('validate', {
        val: e.target.value,
        var: this.var

      })
      if (e.target.value != '' && e.target.value !== this.value) {
        if (this.max == 1) {
          this.show = true;
          this.$emit('changed', {
            val: e.target.value,
            model: this.model,
            iid: this.iid,
            index: this.index,
            max: this.max,
            var: this.var
          });
        } else {
          this.options = [];
          this.show = true;
          this.$emit('changed', {
            val: e.target.value,
            model: this.model,
            iid: this.iid,
            index: this.index,
            max: this.max,
            var: this.var
          });
        }
      }
    },
    select: function(tag) {
      // this.val = {
      //   name: tag.value
      // };

      if (this.max == 1) {
        this.search = tag.value;
      } else {
        this.search = '';
      }
      this.show = false;
      this.$emit('selected', {
        model: this.model,
        tag,
        iid: this.iid,
        max: this.max,
        index: this.index,
        var: this.var,
        mountMethod: this.mountMethod
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../../../sass/ui/base.scss";
@import "../../../../../../sass/ui/select_search.scss";
@import "../../../../../../sass/ui/tag.scss";
</style>
