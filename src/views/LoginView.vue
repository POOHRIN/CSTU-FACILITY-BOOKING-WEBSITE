<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userId = ref('');
const password = ref('');
const rememberMe = ref(false);

const handleLogin = () => {
    if (userId.value && password.value) {
        console.log('Logging in with:', userId.value, password.value, rememberMe.value);
        router.push('/home'); // Redirect after successful login
    } else {
        alert('Please fill in all fields.');
    }
};
</script>

<template>
    <div class="login">
        <div class="login-box">
            <h2>Login</h2>
            <form @submit.prevent="handleLogin">
                <div class="login-data">
                    <input v-model="userId" class="login-input" required placeholder="User ID"/>
                </div>
                <div class="login-data">
                    <input v-model="password" type="password" class="login-input" required placeholder="Password"/>
                </div>
                <div class="remember-me">
                    <input v-model="rememberMe" type="checkbox" class="login-checkbox">
                    <label>Remember Me</label>
                </div>
                <div class="login-button-div">
                    <button type="submit" class="login-button">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style>
body {
    background-color: rgb(197, 94, 38);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

h2 {
    text-align: center;
}

.login {
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-box {
    background-color: rgb(214, 214, 214);
    color: black;
    border-radius: 25px;
    width: 30vw;
    padding: 2vw;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.login-data, .login-button-div, .remember-me {
    padding: 1vw 2.5vw;
}

.login-input {
    height: 2vw;
    width: 100%;
    padding: 0.5vw;
}

.login-button {
    padding: 10px 20px;
    font-size: 18px;
    width: 100%;
    cursor: pointer;
}

.login-checkbox {
    margin-right: 0.5vw;
}

</style>