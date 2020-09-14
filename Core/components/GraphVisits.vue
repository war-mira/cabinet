<template>
    <div class="charts_block">
        <div class="table--info__title">Посещаемость профиля</div>
        <div class="graph_container">
            <bar-chart :chartdata="chartdata" :options="options"></bar-chart>
        </div>
    </div>       
</template>

<script>
    import Chart from './Chart.vue'
      
    export default {
        name: 'BarChartContainer',
        components: {"bar-chart": Chart},
        props: ['views'],
        data: () =>({
            loaded: false,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        barPercentage: 0.35,
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
                let views_array = [];

                if(this.views){
                    for (let property in this.views.views) {
                        date_array.push(property.toString());
                        views_array.push(this.views.views[property]);
                    }
                    return {
                        labels: date_array,
                        datasets: [
                          {
                            label: 'Посещаемость профиля',
                            backgroundColor: '#0363bf',
                            data: views_array,
                          }
                        ]
                    }
                }

            }
        }       
    }
</script>