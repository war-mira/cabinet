<template>
    <div class="widget--container">
        <div class="column"><label>часы</label><span>{{times[0].time}}</span></div>
        <span>:</span>
        <div class="column"><label>минуты</label><span>{{times[1].time}}</span></div>
        <span>:</span>
        <div class="column"><label>секунды</label><span>{{times[2].time}}</span></div>
    </div>        
</template>

<script>
    
    export default {
        data() {
            return {
                startTime: '',
                endTime: '',
                times: [
                    {id: 1, text: 'часов', time: 1},
                    {id: 2, text: 'минут', time: 1},
                    {id: 3, text: 'секунд', time: 1},
                ],
            }
        },
        methods: {
            updateTimer: function() {
              if (
                this.times[2].time > 0 ||
                this.times[1].time > 0 ||
                this.times[0].time > 0
              ) {
                this.getTimeRemaining();
                this.updateProgressBar();
              } else {
                clearTimeout(this.timeinterval);
                 this.progress = 0;
              }
            },
            getTimeRemaining: function() {
                let t = Date.parse(new Date(this.endTime)) - Date.parse(new Date());
                if(t >= 0){
                    this.times[2].time = this.checkTime(Math.floor(t / 1000 % 60)); //seconds
                    this.times[1].time = this.checkTime(Math.floor(t / 1000 / 60 % 60)); //minutes
                    this.times[0].time = Math.floor(t / (1000 * 60 * 60) % 24); //hours
                }else {
                  this.times[1].time = this.times[1].time = this.times[0].time = 0;
                  this.progress = 0;
                }
            },
            updateProgressBar: function() {
                let monthNames = ["January", "February", "March","April", "May", "June", "July","August", "September", "October","November", "December"];
                let date = new Date();
                
                let day = date.getDate();
                
                let tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                let tomorrowDay = tomorrow.getDate();
                
                let tomorrowMonth = tomorrow.getMonth();
                let tomorrowYear = tomorrow.getFullYear();
                
                let startMonth = date.getMonth();
                let year = date.getFullYear();
                
                this.startTime = monthNames[startMonth]+ ' ' + day + ',' + year + ' 00:00:00';
                this.endTime = monthNames[tomorrowMonth]+ ' ' + tomorrowDay + ',' + tomorrowYear + ' 00:00:00';
                
                let startTime = Date.parse(new Date(this.startTime));
                let currentTime = Date.parse(new Date());
                let endTime = Date.parse(new Date(this.endTime));
                let interval = parseFloat(
                  (currentTime - startTime) / (endTime - startTime) * 100
                ).toFixed(2);
                this.progress = 100-interval;
            },
            checkTime(i) {
                if (i < 10) {i = "0" + i;}
                return i;
            }
          },
        created: function() {
            this.updateTimer();
            this.timeinterval = setInterval(this.updateTimer, 1000);
        }
    }
</script>