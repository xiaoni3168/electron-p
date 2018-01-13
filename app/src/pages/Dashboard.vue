<template>
    <div class="dashboard">
        <div class="dashboard-card">
            <d3-pie 
                :height="cardWidth" 
                :width="cardWidth" 
                :datas="finances" 
                :value="'number'"
                :unit="'元'"
                :title="pieTitle"
                class="dashboard-card__item">
            </d3-pie>
        </div>
        <div class="dashboard-card">
            <bill-check-by-day></bill-check-by-day>
        </div>
    </div>
</template>
<script>
import moment from 'moment';
import axios from 'axios';

import BillCheckByDay from '../components/billComp/BillCheckByDay';
export default {
    data () {
        return {
            finances: [],
            cardWidth: document.body.offsetWidth - 20
        }
    },
    mounted () {
        this.loadAllFinance();
    },
    methods: {
        loadAllFinance () {
            axios.get('http://192.168.1.102:1883/api/finance/all').then(res => {
                this.finances = res.data;
                localStorage.setItem('finance', JSON.stringify(res.data));
            });
        },
    },
    computed: {
        pieTitle () {
            return `Finance at ${moment(new Date()).format('DD MMM YYYY')}`;
        }
    },
    components: {
        BillCheckByDay
    }
}
</script>
<style lang="scss">
@import '../styles/_mixin.scss';
.dashboard {
    height: 100%;
    padding: px2rem(10) 0;
    &-card {
        width: calc(100% - #{px2rem(20)});
        height: px2rem(360);
        margin: 0 auto;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
        background-color: #eceff1;
        margin-bottom: 20px;
        &__item {
            .d3-pie-title {
                font-size: px2rem(12);
            }
        }
    }
}
</style>
