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
            <div class="bill-check__gain-item">
                <span class="bill-check__gain-item--label">当天收入</span>
                <span class="bill-check__gain-item--money gain">{{twGain}}</span>
            </div>
            <div class="bill-check__gain-item">
                <span class="bill-check__gain-item--label">当天支出</span>
                <span class="bill-check__gain-item--money spend">{{twSpend}}</span>
            </div>
        </div>
        <div class="gain-charts">
            <div id="charts" class="gain-charts_charts"></div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import TWEEN from '@tweenjs/tween.js';
import Echarts from 'echarts';

export default {
    name: 'BillCheckByDay',
    data () {
        return {
            billList: [],
            checkDate: moment(new Date()).format('YYYY年MM月DD日'),
            
            gain: 0,
            spend: 0,
            twGain: 0,
            twSpend: 0,

            charts: null
        }
    },
    mounted () {
        this.loadAllBills();

        this.charts = Echarts.init(document.querySelector('#charts'));

        var colors = ['#e53935', '#43a047'];

        
        let checkDate = new Date();
        let gainArray = Array.from({length: new Date(checkDate.getFullYear(), checkDate.getMonth() + 1, 0).getDate()}, () => 0);
        let spendArray = Array.from(gainArray);
        let dayOfMonth = Array.from({length: new Date(checkDate.getFullYear(), checkDate.getMonth() + 1, 0).getDate()}, (d, i) => `${i + 1}号`);
        axios.get(`http://192.168.1.102:1883/api/bill/listByMonth?date=${+checkDate}`).then(bills => {
            bills.data.forEach(b => {
                let day = new Date(b.date).getDate();
                if (b.gain) {
                    gainArray[day] = +Number(gainArray[day] + b.number).toFixed(2);
                } else {
                    spendArray[day] = +Number(gainArray[day] + b.number).toFixed(2);
                }
            });

            var option = {
                title : {
                    text: `${checkDate.getMonth() + 1}月账单`
                },
                color: colors,
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['收入','消费']
                },
                toolbox: {
                    show : true
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        data : dayOfMonth
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'收入',
                        type:'bar',
                        data: gainArray
                    },
                    {
                        name:'消费',
                        type:'bar',
                        data: spendArray
                    }
                ]
            };
            this.charts.setOption(option);
        });
    },
    watch: {
        gain (value) {
            if (this.gain > 0) {
                let animate = time => {
                    requestAnimationFrame(animate);
                    TWEEN.update(time);
                }
                new TWEEN.Tween({m: this.twGain})
                    .to({m: this.gain}, 700)
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .onUpdate((d) => {
                        this.twGain = Number(d.m).toFixed(2);
                    })
                    .start();
                
                requestAnimationFrame(animate);
            }
        },
        spend (value) {
            if (this.spend > 0) {
                let animate = time => {
                    requestAnimationFrame(animate);
                    TWEEN.update(time);
                }
                new TWEEN.Tween({m: this.twSpend})
                    .to({m: this.spend}, 700)
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .onUpdate((d) => {
                        this.twSpend = Number(d.m).toFixed(2);
                    })
                    .start();
                
                requestAnimationFrame(animate);
            }
        },
        checkDate (value) {
            this.setGain();
            this.setSpend();
        }
    },
    methods: {
        loadAllBills () {
            axios.get('http://192.168.1.102:1883/api/bill/list').then(res => {
                this.billList = res.data;
                this.setGain();
                this.setSpend();
                localStorage.setItem('bill', JSON.stringify(res.data));
            });
        },

        setGain () {
            const _t = this;
            this.gain = _.reduce(this.billList, function (sum, b) {
                var total = 0;
                if ((+moment(_t.checkDate, 'YYYY年MM月DD日') + 28800000) == +b.date && b.gain == 1) {
                    total = +Number(sum + b.number).toFixed(2);
                } else {
                    total = sum;
                }
                return total;
            }, 0);
        },
        setSpend () {
            const _t = this;
            this.spend = _.reduce(this.billList, function (sum, b) {
                var total = 0;
                if ((+moment(_t.checkDate, 'YYYY年MM月DD日') + 28800000) == +b.date && b.gain === 0) {
                    total = +Number(sum + b.number).toFixed(2);
                } else {
                    total = sum;
                }
                return total;
            }, 0);
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../styles/_mixin.scss';
.bill-check {
    height: 100%;
    padding: 0 px2rem(10);
    display: flex;
    flex-direction: column;
    &__gain {
        line-height: px2rem(14);
        &-item {
            &--label {
                font-size: px2rem(12);
                color: #9e9e9e;
            }
            &--money {
                font-size: px2rem(16);
                &.gain {
                    color: #e53935;
                }
                &.spend {
                    color: #43a047;
                }
            }
        }
    }

    .gain-charts {
        flex: 1;
        &_charts {
            width: 100%;
            height: 100%;
        }
    }
}
.mu-date-picker {
    font-size: px2rem(12);
}
</style>
