<template>
    <div class="p-dashboard">
        <p-header></p-header>
        <div class="p-dashboard__content">
            <d3-pie 
                :height="500" 
                :width="500" 
                :datas="finances" 
                :value="'number'"
                :unit="'元'"
                :title="pieTitle"
                class="p-dashboard__content-item"></d3-pie>
            <d3-chart
                :height="500"
                :width="500"
                :datas="finances"
                :value="'number'"
                :unit="'元'"
                :options="chartOptions"
                class="p-dashboard__content-item"></d3-chart>
        </div>
    </div>
</template>
<script>
import moment from 'moment';
import PHeader from '../components/pHeader';
import PWeather from '../components/pWeather';
export default {
    data () {
        return {
            finances: [],
            chartOptions: {}
        }
    },
    mounted () {
        this.loadFinanceData().then(r => {
            this.finances = r;
        })
    },
    computed: {
        pieTitle () {
            return `Finance at ${moment(new Date()).format('DD MMM YYYY')}`;
        }
    },
    methods: {
        async loadFinanceData () {
            return await this.$remote.finance.getAllFinance();
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../styles/color.scss';

.p-dashboard {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: $grey-lighten-4;

    &__content {
        width: 100%;
        flex-grow: 1;
        display: flex;

        &-item {
            height: 500px;
            width: 500px;
        }
    }
}
</style>
