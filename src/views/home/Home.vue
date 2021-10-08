<template>
  <div id="home" :class="warmTemp">
    <main>
      <div class="search-box">
        <input 
          type="text" 
          class="search-bar"
          placeholder="回车拼音搜索"
          v-model="city"
          @keypress="getHomeData"
        >
      </div>

      <div v-if="this.data.weather != undefined">
        <div class="weather-wrap">
          <div class="location-box">
            <div class="location">{{data.name}}-{{data.country}}</div>
            <div class="date">{{timeInfo.weekDay}} {{timeInfo.month}}.{{timeInfo.day}}</div>
          </div>
        </div>

        <div class="weather-box">
          <div class="temp">{{data.temp | unitize}}</div>
          <div class="weather">{{data.weather}}</div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import { request } from 'network/request.js'
import { HomeWeather } from 'network/home.js'
export default {
  name: 'Home',
  data() {
    return {
      city: '',
      data: {},
      timeInfo: {}
    }
  },
  methods: {
    getHomeData(e) {
      if(e.key === 'Enter') {
        e.target.disabled = true
        const instance = request({
          url: 'weather',
          params: {
            q: this.city,
            appid: 'c49e31970dc5477a895da17444c626a0',
            lang: "zh_cn",
            units: 'metric'
          }
        })

        instance.then(res => {
            e.target.disabled = false
            const data = res.data;
            // console.log(data);
            this.data = new HomeWeather(data.dt, data.name, data.sys, data.main, data.weather)
            // console.log(this.data.timestamp);
            this.getTimeInfo(this.data.timestamp * 1000)
          }, err => {
            e.target.disabled = false
            console.log(err);
          })

        this.city = ''
      }

    },
    getTimeInfo(date) {
      const o = new Date(date)
      // console.log('--------------------');
      const days = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
      const weekDay = days[o.getDay()]
      const day = o.getDate()
      const month = o.getMonth() + 1
      const year = o.getFullYear()
      this.timeInfo = {weekDay, day, month, year}
    }
  },
  filters: {
    unitize(value) {
      return `${Math.round(value)}°C`
    }
  },
  computed: {
    warmTemp() {
      return {warm: typeof this.data.temp != undefined && this.data.temp >= 21 ? true : false}
    }
  }
}
</script>
<style scoped>
  #home {
    background-image: url('~assets/img/cold-bg.jpg');
    background-size: cover;
    background-position: bottom;
    transition: 0.4s;
  }

  #home.warm {
    background-image: url('~assets/img/warm-bg.jpg');
  }

  main {
    min-height: 100vh;
    padding: 25px;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
  }

  .search-box {
    width: 100%;
    margin-bottom: 30px;
  }

  .search-box .search-bar {
    display: block;
    width: 100%;
    padding: 15px;
    
    color: #313131;
    font-size: 20px;

    appearance: none;
    border:none;
    outline: none;
    background: none;

    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 0px 16px 0px 16px;
    transition: 0.4s;
  }

  .search-box .search-bar:focus {
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 16px 0px 16px 0px;
  }

  .location-box .location {
    color: #FFF;
    font-size: 32px;
    font-weight: 500;
    text-align: center;
    text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
  }

  .location-box .date {
    margin: 18px 0;
    color: #FFF;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    font-family: Arial,'宋体',sans-serif;
  }

  .weather-box {
    text-align: center;
  }



  .weather-box .temp {
    display: inline-block;
    padding: 10px 25px;
    color: #fff;
    font-size: 102px;
    font-weight: 900;

    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.25);
    border-radius: 16px;
    margin: 30px 0px;

    box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  }

  .weather-box .weather {
    color: #fff;
    font-size: 48px;
    font-weight: 700;
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  }
</style>