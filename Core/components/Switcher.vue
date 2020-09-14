<template>
    <div class="switch">
        <div class="switch__item" :class="{ active:activeItem.id == item.id }"
             :data-value="item.id"
             v-for="item in list" @click="change(item)">{{item.value}}
        </div>
    </div>
</template>

<script>
    export default {
        props:['items','active'],
        data() {
            return {
                value: '',
                activeItem:{},
                list:this.items
            }
        },
        mounted:function(){
            this.activeItem = this.active;
            this.value = this.activeItem.id;

        },
        methods: {
            change: function(item) {
                this.activeItem = item;
                this.value = item.id;
            }
        },
    }
</script>