<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const isOpen = ref(false);
const dropdown = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const handleClickOutside = (event) => {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const userId = ref('');

onMounted(() => {
    userId.value = localStorage.getItem('userIdLogin') || '';
});

function logout() {
  localStorage.removeItem('userIdLogin');
  console.log(localStorage.getItem('userIdLogin'));
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-left">
      <h1>CSTU Facility Booking</h1>
    </div>
    <div class="navbar-right" ref="dropdown">
      <a @click="toggleDropdown" class="dropdown-a">{{ userId }}</a>
        <ul v-if="isOpen" ref="dropdown" class="dropdown-menu">
          <li><router-link to="/login" class="dropdown-link" @click="logout()">Logout</router-link></li>
        </ul>
    </div>
</nav>
</template>
  
<style scoped>

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(219,78,78);
  color: white;
  padding: 15px 20px;
}

.navbar-right {
  position: relative;
  margin-right: 1vw;
}

.dropdown-a {
  color: white;
  border: none;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 4vh;
  right: 0;
  background: white;
  color: black;
  list-style: none;
  padding: 0;
  margin: 0;
  width: auto;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 9999;
}

.dropdown-menu li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.dropdown-menu li:last-child {
  border-bottom: none;
}
</style>