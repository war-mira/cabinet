<template>
    <div class="ma">
        <Paginate :page-count="meta.last_page"
                v-model="page"
                :per="meta.per_page" 
                :click-handler="clickCallback" 
                :prev-text="'Предыдущая'" 
                :next-text="'Следующая'" 
                :container-class="'pagination'"
                :page-class="'pagination__item'"
                :active-class = "'pagination__item--active'"
                :disabled-class="'pagination__basic disabled'"
                :prev-class="'pagination__basic'"
                :next-class="'pagination__basic'">
            </Paginate>
    </div>
</template>
<script>
    import Paginate from 'vuejs-paginate'
    export default {
        props: ['page', 'meta'],
        components: {
             Paginate
        },
        data() {
            return {
            }
        },
        methods: {
            clickCallback (pageNum){
                this.$emit('updated', pageNum);
            }
        }        
    }
</script>
    
    