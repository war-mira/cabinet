<template>
    <div class="form--row">
        <div class="form--item form--item__tags" v-for="item in list">
            <label class="switch">
                <input type="checkbox" :value=item.id v-model="checkedTag">
                <span class="slider round"></span>
            </label>
            <label>{{item.name}}</label>
        </div>
    </div>
</template>
<script>
    import axios from '../services/Api.js';
    export default {
        props: ['url', 'caption', 'data', 'selected'],
        data() {
            return {
                list: [],
                checkedTag: this.selected.map(item=>item.id)
            }
        },
        watch: {
            "checkedTag": function() {
                this.selectItem();
            },
            "selected": function() {
                this.setOptions();
            },
        },
        mounted: function () {
            this.getList();
        },
        
        methods: {
            getList(){
                axios().get('/'+this.url)
                .then((response) => {
                    if(this.data){
                        this.list = response.data[this.data];
                    }else{
                        this.list = response.data.tags;
                    }
                }, (err) => {
                    console.log(err.response)
                })
            },
            setOptions(){
                this.checkedTag = [];
                for(let i=0; i<this.selected.length; i++){
                    this.checkedTag.push(this.selected[i].id);
                }
            },
            selectItem() {
                this.$emit('updated', this.checkedTag);
            }
        }
    }
</script>
            