<template>
    <div class="login">
        <div class="login-background" :style="{ backgroundImage: `url(data:image/jpg;base64,${background})` }"></div>
        <div class="login-content" @keypress.enter="signin">
            <div class="login-content_label">登录</div>
            <div class="login-content_input">
                <input type="text" placeholder="邮 箱" v-model="username">
                <input type="password" placeholder="密 码" v-model="password">
                <span @click="signin"><p-svg :pid="'login'"></p-svg></span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Login',
    data () {
        return {
            background: '',

            username: '',
            password: ''
        }
    },
    mounted () {
        this.$remote.login.getLoginBackground().then(bk => {
            this.background = bk;
        });
    },
    methods: {
        signin () {
            this.$remote.login.signin(this.username, this.password).then(res => {
                if (res) {
                    this.$router.push('dashboard');
                } else {
                    alert('error');
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.login {
    height: 100%;
    width: 100%;
    background-color: #f5f5f5;
    position: fixed;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 100;
    & > * {
        z-index: 1;
    }
    &-background {
        background-repeat: no-repeat;
        background-size: 100%;
        filter: blur(20px);
        height: calc(100% + 160px);
        width: calc(100% + 160px);
        top: -120px;
        left: -120px;
        position: fixed;
        z-index: -1;
        opacity: 0.85;
    }
    &-content {
        position: absolute;
        text-align: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #ffffff;
        &_label {
            font-size: 26px;
            margin-bottom: 30px;
        }
        &_input {
            input {
                display: block;
                border: 1px solid #cccccc;
                background: rgba(255,255,255,.2);
                height: 28px;
                width: 190px;
                border-radius: 28px;
                padding: 0 20px;
                font-size: 14px;
                color: #ffffff;
                margin: 10px 0;
                text-align: center;
                transition: .17s;
                box-sizing: border-box;
                -webkit-appearance: none;
                &:focus {
                    outline: none;
                }
                &::-webkit-input-placeholder {
                    color: #eeeeee;
                    font-weight: 100;
                }
            }
            svg {
                height: 18px;
                width: 18px;
                fill: #f5f5f5;
                cursor: pointer;
                margin-top: 20px;
                &:hover {
                    fill: #e8eaf6;
                }
            }
        }
    }
}
</style>

