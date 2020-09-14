<template>
    <div class="multisearch">
        <input type="text" v-model="search" :placeholder="text"/>
        <div class="multisearch--options" :class="{show:options.length}">
            <div v-for="option in options" @click="select(option)" class="multisearch--option">
                <div class="multisearch--option__header">{{option[name] ? option[name] : ''}}</div>
                <div class="multisearch--option__name">{{ option.name }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MultiselectSearch",
        props:{
            'value':{
                default:function () {
                    return {}
                }
            },
            'model':{
                default:''
            },
            'name':{
                default:''
            },
            'text':{
                default:''
            },
            'city': {
                default: null
            }
        },
        data(){ 
            return {
                instance: Math.random().toString(36).substring(7),
                options:[],
                search:'',
                val: this.value
            }
        },
        watch:{
            search:function (val) {
                this.options = [];
                if(val!=''){
                    this.$emit('update', val)
                    if((this.model == 'Medcenter-all') && (this.city)){
                        socket.emit('search inserting', val, ['name'], this.model, this.iid, {city: this.city});
                    }else{
                        socket.emit('search inserting', val, ['name'], this.model, this.iid);
                    }
                    
                } 
            }
        },

        mounted: function () {
            window.addEventListener('click', (e) => {
                this.options = []
            })
            socket.on('search autocomplete 2',function (msg) {
                if(this.iid === msg.key){
                    this.options = msg.data
                }
            }.bind(this));
        },
        computed:{
            autocomplete:function () {
                return this.search;
            },
            iid:function () {
                return this.model + this.instance;
            }
        },
        methods:{
            select:function (tag) {
                if(tag.id){
                    this.val = {
                        name:tag.name,
                        id: tag.id
                    }
                    this.$emit('input', this.val);
                }else{
                    this.$emit('input', tag);
                }                
                this.search = ''
            }
        }
    }
</script>