<template>
    <div class="input--range">
        <span class='start_age'>0+</span>
        <input type="range" value="0" max="18" step="1"  v-model="value" @change="changeFoo"/>
        <div class="range-val" :style="{'padding-left': ((value*100)/18) + '%' }">
            <span v-text="range_value" v-if='start_visible'></span>
        </div>
    </div>        
</template>

<script>
    export default {
        props:[
            'child_age'
        ],
        data() {
            return {
                start_visible: false,
                numeral: 'лет',
                value:0
            }
        },
        mounted(){
              this.value = this.child_age;
              this.changeFoo();
        },
        methods: {
            changeFoo() {
                if(this.value > 0){
                    this.start_visible = true;
                    if(this.value == 1){
                        this.numeral = 'год';
                    }else if((this.value > 1) && (this.value < 5)){
                        this.numeral = 'года';
                    }else{
                        this.numeral = 'лет';
                    }
                }else{
                    this.start_visible = false;
                }
                    
            }
        },
        watch:{
            child_age:function(val){
              this.value = val;
              this.changeFoo();
            },
            value:function(val){
                this.$emit('input', parseInt(val))
            }
        },
        computed: {
            range_value: function () {
                return this.value + ' ' + this.numeral;
          }
        }
    }
</script>


