<template>
    <div class="charts_block">
        <div class="table--info__title">Статистика отзывов</div>
        <div class="table--info__labels tar">
            <label class="carribbean_green"><span class="bg-carribbean_green rounded"></span>Положительные</label>
            <label class="coral_red"><span class="bg-coral_red rounded"></span>Отрицательные</label>
        </div>
        <div class="graph_container">
            <bar-chart :chartdata="chartdata" :options="options"></bar-chart>
        </div>
    </div>       
</template>

<script>
    import Chart from './Chart.vue'
      
    export default {
        name: 'BarChartContainer',
        props: ['reviews'],
        components: {
            "bar-chart": Chart
        },
        data: () =>({
            loaded: false,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        barPercentage: 0.7,
                        ticks: {
                            autoSkip: false,
                            maxRotation: 90,
                            minRotation: 90
                        }
                    }],
                    yAxes: [{
                      ticks: {
                          beginAtZero:true
                      }
                  }]
                },
                legend: {
                    display: false
                }, 
            }
        }),
        computed:{
            chartdata:function(){
                let date_array = [];
                let positive_array = [];
                let negative_array = [];

                if(this.reviews){
                    for (var property in this.reviews.reviews) {
                        date_array.push(property.toString());
                        let reviews_params = this.reviews.reviews[property];
                        positive_array.push(reviews_params.positive);
                        negative_array.push(reviews_params.negative);
                    }
                    return {
                        labels: date_array,
                        datasets: [
                          {
                            label: 'Положительные',
                            backgroundColor: '#06d09e',
                            data: positive_array,
                            fill: false
                          },
                          {
                            label: 'Отрицательные',
                            backgroundColor: '#fb4438',
                            data: negative_array,
                            fill: false
                          }
                        ]
                    }
                }
            }
        }       
    }
</script>