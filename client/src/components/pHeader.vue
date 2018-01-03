<template>
    <div class="p-header">
        <div class="p-header__logo">
            <p-svg :pid="'logo'"></p-svg>
        </div>
    </div>
</template>
<script>
export default {
    name: 'pHeader',
    data () {
        return {

        }
    }
}
</script>
<style lang="scss" scoped>
.p-header {
    height: 90px;
    width: 100%;
    &__logo {
        padding: 10px 20px;
        svg {
            height: 50px;
            width: 50px;
        }
    }
}
</style>
