<template>
    <div class="rating">
        <div class="rating--stars">
            <i aria-hidden="true" :class="i"
               v-for="i in rate"></i>
        </div>
        <div class="rating--val">{{Math.round(rating * 100) / 100}}</div>
    </div>
</template>
<script>

    export default {
        props: ['rating'],
        data() {
            return {
                rate: [],
            }
        },
        methods: {
            fillRate() {
                let rating = parseFloat(this.rating);
                rating = Math.round(rating * 100) / 100;
                this.rate = [];
                for (let $i = 0; $i < 5; $i++) {
                    if (rating - $i >= 1) {
                        this.rate.push('fas fa-star');
                    } else if (rating - $i >= 0.5) {
                        this.rate.push ('fas fa-star-half-alt');
                    } else {
                        this.rate.push('far fa-star');
                    }
                }
            }
        },
        mounted() {
            this.fillRate();
        },
        watch:{
            rating:function(){
                this.fillRate();
            }
        }
    }
</script>

