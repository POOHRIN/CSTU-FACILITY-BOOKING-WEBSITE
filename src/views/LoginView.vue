<script setup lang="ts">

</script>

<template>
    <div class="login-box">
        <h2>Login</h2>
        <form>
            <div class="login-data">
                <input id="loginId" class="login-input" required placeholder="User ID"/>
            </div>
            <div class="login-data">
                <input type="password" id="loginPassword" class="login-input" required placeholder="Password"/>
            </div>
            <div class="remember-me">
                <input type="checkbox" id="remember" name="remember" class="login-checkbox">
                <label>Remember Me</label>
            </div>
            <div class="login-button-div">
                <router-link to="/"><button class="login-button" id="myButton">Login</button></router-link>
            </div>
        </form>
    </div>
</template>

<style>
template{
    background-color: #c24646;
}
h2{
    text-align: center;
}
body{
    background-color: #db8446;
}
.login-input{
    height: 2vw;
    width: 20vw;
}
.main{
    background-color: rgb(214, 214, 214);
    color: black;
    border-radius: 25px;
}
.login-data, .login-button-div, h2, .remember-me{
    margin: 1.9vw 2.5vw;
}
.login-box, .login-button-div{
    justify-content: center;
}
.login-button-div, .login-button{
    text-align: center;
}
.login-button{
    padding: 10px 20px;
    font-size: 18px;
}
.login-checkbox{
    margin-right: 1vw;
}
</style>