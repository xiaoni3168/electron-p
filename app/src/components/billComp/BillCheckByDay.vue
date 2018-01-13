<template>
    <div class="bill-check">
        <div class="bill-check__time">
            <mu-date-picker 
                v-model="checkDate"
                format="YYYY年MM月DD日"
                fullWidth>
            </mu-date-picker>
        </div>
        <div class="bill-check__gain">
            <div>
                <span>当天收入</span>
                <span>{{gain}}</span>
            </div>
            <div>
                <span>当天支出</span>
                <span>{{spend}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
export default {
    name: 'BillCheckByDay',
    data () {
        return {
            billList: [],
            checkDate: moment(new Date()).format('YYYY年MM月DD日')
        }
    },
    mounted () {
        this.loadAllBills();
    },
    computed: {
        gain () {
            const _t = this;
            return _.reduce(this.billList, function (sum, b) {
                var total = 0;
                if ((+moment(_t.checkDate, 'YYYY年MM月DD日') + 28800000) == +b.date && b.gain == 1) {
                    total = +Number(sum + b.number).toFixed(2);
                } else {
                    total = sum;
                }
                return total;
            }, 0);
        },
        spend () {
            const _t = this;
            return _.reduce(this.billList, function (sum, b) {
                var total = 0;
                if ((+moment(_t.checkDate, 'YYYY年MM月DD日') + 28800000) == +b.date && b.gain === 0) {
                    total = +Number(sum + b.number).toFixed(2);
                } else {
                    total = sum;
                }
                return total;
            }, 0);
        }
    },
    methods: {
        loadAllBills () {
            axios.get('http://192.168.1.102:1883/api/bill/list').then(res => {
                this.billList = res.data;
                localStorage.setItem('bill', JSON.stringify(res.data));
            });
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../styles/_mixin.scss';
.bill-check {
    height: 100%;
    padding: 0 10px;
}
.mu-date-picker {
    font-size: px2rem(12);
}
</style>
