<script setup lang="ts"/>

<template>
    <div>
        <div>
            <h2>Login</h2>
            <form>
                <div class="mb-4">
                    <label>Email</label>
                    <input type="email" required />
                </div>
                <div class="mb-4">
                    <label>Password</label>
                    <input type="password" required />
                </div>
                <RouterLink to="/">Login</RouterLink>
            </form>
        </div>
    </div>
</template>

<style>
template{
    background-color: #c24646;
}
div {
    line-height: 50px;
    background: #e0e0e0;
    color: #000;
}
input{
    margin-left: 10px;
}
h2{
    text-align: center;
}
</style>