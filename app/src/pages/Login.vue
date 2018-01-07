<template>
    <div class="login" @click="toBill">login</div>
</template>
<script>
export default {
    data () {
        return {}
    },
    methods: {
        toBill () {
            this.$router.push('Bill');
        }
    }
}
</script>
<style lang="scss" scoped>
.login {
    color: #2888e5;
    font-size: 2rem;
}
</style>
