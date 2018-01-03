<template>
    <svg>
        <use :xlink:href="icon"></use>
    </svg>
</template>
<script>
export default {
    name: 'pSvg',
    props: {
        pid: {
            type: String,
            required: true
        }
    },
    computed: {
        icon () {
            return `#${this.pid}`;
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
