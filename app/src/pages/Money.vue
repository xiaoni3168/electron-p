<template>
    <div class="money">
        <rmb nominal="100yuan" :rotate="rotate" @onTouchStart="touchstart"></rmb>
    </div>
</template>
<script>
export default {
    data () {
        return {
            rotate: 0
        }
    },
    methods: {
        touchstart (e) {
            console.log(e);
        }
    }
}
</script>
<style lang="scss" scoped>
.money {
    height: 177px;
    width: 360px;
    margin: auto;
}
</style>
