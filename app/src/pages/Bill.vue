<template>
    <div class="bill">
        <div class="bill-list">
            <div class="bill-list__item" v-for="bill in sortBillList" :key="bill._id">
                <div class="bill-list__item-avatar"></div>
                <div class="bill-list__item-wrap">
                    <div class="bill-list__item-wrap--date">
                        {{bill.date | date('YYYY年MM月DD日')}}
                    </div>
                    <div class="bill-list__item-wrap--number" :class="{0: 'decrease', 1: 'increase'}[bill.gain]">
                        {{(bill.gain ? '+' : '-') + bill.number}}
                    </div>
                </div>
                <div class="bill-list__item-description">
                    {{bill.description}}
                </div>
            </div>
        </div>
        <div class="bill-add" @click="openModal">
            <p-svg :pid="'bill-add'"></p-svg>
        </div>
        <bill-modal v-if="showModal" @close="closeModal"></bill-modal>
    </div>
</template>
<script>
import moment from 'moment';
import _ from 'lodash';
import BillModal from '../components/BillModal';
import * as API from '../api/api';
import PSvg from '../components/PSvg';
export default {
    data () {
        return {
            showModal: false,
            billList: [],
            ps: null
        }
    },
    mounted () {
        this.loadAllFinance();
        this.initList();
    },
    computed: {
        sortBillList () {
            return _.orderBy(this.billList, 'date', 'desc');
        }
    },
    methods: {
        openModal () {
            this.showModal = true;
        },

        initList () {
            API.getBillList().then(res => {
                this.billList = res.data;
                localStorage.setItem('bill', JSON.stringify(res.data));
            });
        },

        loadAllFinance () {
            API.getAllFinances().then(res => {
                localStorage.setItem('finance', JSON.stringify(res.data));
            });
        },

        closeModal () {
            this.showModal = false;
        }
    },
    filters: {
        date (value, format) {
            return moment(value).format(format);
        }
    },
    components: {
        BillModal,
        PSvg
    }
}
</script>
<style lang="scss" scoped>
@import '../styles/_mixin.scss';
.bill {
    height: 100%;
    width: 100%;
    user-select: none;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    &-list {
        height: 100%;
        padding: 0 px2rem(5);
        overflow: scroll;
        &__item {
            width: 100%;
            height: px2rem(66);
            margin-bottom: px2rem(5);
            box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
            display: flex;
            background-color: #eceff1;
            &:last-child {
                margin-bottom: 0;
            }
            &-avatar {
                height: 100%;
                width: px2rem(66);
            }
            &-wrap {
                width: px2rem(120);
                padding: px2rem(5);
                &--date {
                    font-size: px2rem(12);
                    color: #999999;
                }
                &--number {
                    font-weight: bold;
                    font-size: px2rem(24);
                    &.increase {
                        color: #e53935;
                    }
                    &.decrease {
                        color: #43a047;
                    }
                }
            }
            &-description {
                flex: 1;
                padding: px2rem(5);
                font-size: px2rem(12);
                color: #546e7a;
            }
        }
    }
    &-add {
        font-size: px2rem(16);
        position: absolute;
        height: px2rem(60);
        width: px2rem(60);
        background-color: #2888e5;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
        color: #ffffff;
        bottom: 40px;
        right: 40px;
        border-radius: 50%;
        text-align: center;
        line-height: px2rem(60);
        svg {
            height: px2rem(26);
            width: px2rem(26);
            vertical-align: middle;
        }
    }
}
</style>
