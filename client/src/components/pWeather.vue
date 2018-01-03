<template>
    <div class="p-weather"></div>   
</template>
<script>
export default {
    name: 'pWeather',
    data () {
        return {
            city: {
                Beijing: {
                    "ID": "1",
                    "cityName": "北京",
                    "cityEN": "Beijing",
                    "townID": "CHBJ000000",
                    "townName": "北京",
                    "townEN": "Beijing"
                }
            },
            defaultCity: 'Beijing'
        }
    },
    mounted () {
        this.loadWeather(this.defaultCity);
    },
    methods: {
        async loadWeather (city) {
            let weather = await this.$remote.weather.getWeather(this.city[city].townID);
            console.log(JSON.parse(weather.body))
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
