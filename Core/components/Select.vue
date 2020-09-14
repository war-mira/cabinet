<template>
    <div class="select--custom">
        <select class="change-city" @change="selectItem" v-model="selectedItem">
            <option value="">{{this.caption}}</option>
            <option v-for="item in list" :value="item.id">{{item.name}}</option> 
        </select>
    </div>
</template>
<script>
    import Api from '../services/Api.js';
    export default {
        props: ['url', 'caption', 'id'],
        data() {
            return {
                list: [],
                selectedItem: ''
            }
        },
        mounted: function () {
            this.getList();
        },
        watch: {
            "id": function() {
                this.selectedItem = this.id;
            },
        },
        methods: {
            getList(){
                Api().get('/'+this.url)
                .then((response) => {
                    this.list = response.data.data;
                    
                }, (err) => {
                    console.log(err.response)
                })
            },
            selectItem() {
                this.$emit('updated', this.selectedItem)
            }
        }
    }
</script>