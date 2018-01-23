<template>
    <div class="rmb" :style="{transform: `rotateY(${rotate}deg)`}" @touchstart="onTouchStart">
        <div class="side rmb-front" :style="rmbFront" :class="{true: 'visiable'}[rotate%180 < 180]"></div>
        <div class="side rmb-reverse" :style="rmbReverse" :class="{true: 'visiable'}[rotate%180 >= 180]"></div>
    </div>
</template>
<script>
import RMBPic from './RMBPic';
export default {
    name: 'rmb',
    props: {
        nominal: String,
        rotate: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {

        }
    },
    mounted () {
    },
    computed: {
        rmbFront () {
            return {
                backgroundImage: `url(${RMBPic[this.nominal].front})`
            }
        },
        rmbReverse () {
            return {
                backgroundImage: `url(${RMBPic[this.nominal].reverse})`
            }
        }
    },
    methods: {
        onTouchStart (e) {
            this.$emit('onTouchStart', e);
        }
    }
}
</script>
<style lang="scss" scoped>
.rmb {
    height: 100%;
    width: 100%;
    position: relative;
    .side {
        height: 100%;
        width: 100%;
        background-size: 100%;
        background-repeat: no-repeat;
        position: absolute;
        top: 0;
        left: 0;
        &.rmb-front {
            display: none;
            &.visiable {
                display: block;
            }
        }
        &.rmb-reverse {
            transform: rotateY(180deg);
            display: none;
            &.visiable {
                display: block;
            }
        }
    }
}
</style>
