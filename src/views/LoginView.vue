<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db } from "@/services/firebase";
import type { AdminData } from "@/types/adminData";
import axios from 'axios';

const router = useRouter();
const userId = ref<string>('');
const password = ref<string>('');
const admins = ref<AdminData[]>([]);

const handleLogin = async () => {
    if (userId.value.trim() && password.value.trim()) {
        localStorage.setItem('userIdLogin', userId.value); // Store in localStorage
        if (userId.value == "admin") { //Admin
            const q = query(
                collection(db, "admins"),
                where("admin_id", "==", userId.value)
            );

            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const adminData = querySnapshot.docs[0].data();

                if (adminData.password === password.value) {
                    admins.value = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    })) as AdminData[];
                    router.push('/home');
                } else {
                    alert("Login failed: Password Invalid.");
                }
            } else {
                alert("Login failed: User Invalid.");
            }
        } else { // User
            try {
                const res = await axios.post(
                    'https://restapi.tu.ac.th/api/v1/auth/Ad/verify',
                    {
                        UserName: userId.value,
                        PassWord: password.value
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Application-Key': import.meta.env.VITE_TU_APP_KEY
                        }
                    }
                );
                

                if (res.data && res.data.status) {
                    router.push('/home');
                } else {
                    alert('Login failed: User Invalid.');
                }
            } catch (err: any) {
                console.error(err);
                alert('Login failed: ' + (err.response?.data?.message || err.message));
            }
        }
    } else {
        alert('Please fill in all fields.');
    }
};
</script>

<template>
    <div class="login">
        <h1>TU FACILITY BOOKING WEBSITE</h1>
        <div class="login-box">
            <h2>LOGIN</h2>
            <form @submit.prevent="handleLogin" autocomplete="off">
                <div class="login-data">
                    <input v-model="userId" class="login-input" required placeholder="User ID" />
                </div>
                <div class="login-data">
                    <input v-model="password" type="password" class="login-input" required placeholder="Password" />
                </div>
                <div class="login-button-div">
                    <button type="submit" class="login-button">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style>
.login body {
    background-color: rgb(254, 172, 99);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.login h1{
    font-size: 3rem;
    margin-bottom: 3rem;
    color: white;
    font-weight: bolder;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

.login h2 {
    text-align: center;
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: 1.6rem;
}

.login {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    flex-direction: column;
}

.login-box {
    background-color: rgb(219, 78, 78);
    color: white;
    border-radius: 25px;
    width: 90%;
    max-width: 30rem;
    padding: 2rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    gap: 1.5rem;
}

.login-data,
.login-button-div {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
}

.login-input {
    height: 2.5rem;
    width: 100%;
    padding: 0.5rem;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    margin: 1rem;
}

.login-button {
    padding: 10px 20px;
    font-size: 1rem;
    width: 50%;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: white;
    color: black;
    transition: background-color 0.3s ease;
    margin-top: 2rem;
}

.login-button:hover {
    background-color: #f0f0f0;
    transform: scale(1.02);
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

@media (max-width: 730px) {
    .login h1 {
        font-size: 6vw;
    }

    .login-box {
        padding: 1.5rem;
    }

    .login-button {
        font-size: 0.95rem;
    }

    .login h2 {
        font-size: 4vw;
    }
}


</style>