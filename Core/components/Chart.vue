<script>
import VueCharts from 'vue-chartjs'
import { Bar } from 'vue-chartjs'

export default {
    extends: Bar,
    props: ['chartdata', 'options'],
    mounted () {
        this.renderChart(this.chartdata, this.options)
    },
    watch: {
        chartdata: function () {
          this.renderChart(this.chartdata, this.options)
        }
      }
}
</script>


