<template>
    <div class="bill-modal">
        <div>
            <mu-select-field v-model="type" label="类型" fullWidth>
                <mu-menu-item v-for="f in finance" :key="f._id" :value="f.type" :title="f.name" />
            </mu-select-field>
        </div>
        <div>
            <mu-switch :label="gianText" class="bill-gain-type" v-model="gain"></mu-switch>
        </div>
        <div>
            <mu-text-field label="金额" fullWidth labelFloat v-model="number"></mu-text-field>
        </div>
        <div>
            <mu-date-picker label="日期" fullWidth labelFloat v-model="date"></mu-date-picker>
        </div>
        <div>
            <mu-auto-complete label="备注" @input="handleDescriptionInput" v-model="description" :dataSource="dataSource" fullWidth labelFloat></mu-auto-complete>
        </div>
        <div class="bill-btn-wrap">
            <mu-raised-button label="录入" class="bill-raised-button" primary @click="add"></mu-raised-button>
            <mu-raised-button label="取消" class="bill-raised-button" secondary @click="cancel"></mu-raised-button>
        </div>

        <mu-snackbar v-if="showSnack" :message="latestMoney" action="好的" @actionClick="closeSnack" @close="closeSnack"></mu-snackbar>
    </div>
</template>
<script>
import _ from 'lodash';
import moment from 'moment';
import * as API from '../api/api';
export default {
    data () {
        return {
            type: 0,
            gain: true,
            number: 0,
            date: moment(new Date()).format('YYYY-MM-DD'),
            description: '',

            finance: [],
            bill: [],
            dataSource: [],
            showSnack: false,
            latestMoney: ''
        }
    },
    beforeMount () {
        this.finance = JSON.parse(localStorage.getItem('finance'));
        this.bill = JSON.parse(localStorage.getItem('bill'));
    },
    computed: {
        gianText () {
            return this.gain ? '收入' : '消费';
        }
    },
    methods: {
        add () {
            let bill = {
                type: this.type,
                gain: this.gain,
                number: +this.number,
                date: +new Date(this.date),
                description: this.description
            }
            
            API.addBill(bill).then(r => {
                this.latestMoney = `余额：${r.data.latest}`;
                this.showSnack = true;
                console.log(r);
            }).catch(e => {
                console.log(e);
            })
        },
        cancel () {
            this.$emit('close');
        },
        handleGainChange (value) {
            this.gain = value;
        },
        handleDescriptionInput (value) {
            this.dataSource = _.uniq(this.bill.map(b => b.description));
        },
        closeSnack () {
            this.showSnack = false;
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../styles/_mixin.scss';
.bill-modal {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #ffffff;
    height: 100%;
    width: 100%;
    padding: px2rem(20);
    .bill-btn-wrap {
        display: flex;
        justify-content: space-between;
    }
    .bill-gain-type {
        font-size: px2rem(12);
    }
    .bill-raised-button {
        font-size: px2rem(16);
        width: 48%;
    }
}
</style>
