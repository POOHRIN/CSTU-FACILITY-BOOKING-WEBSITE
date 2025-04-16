<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineEmits } from "vue";
import UserIcon from "@/assets/UserIcon.png";
import MenuIcon from "@/assets/MenuIcon.png";

const isOpen = ref(false);
const dropdown = ref(null);

const emit = defineEmits<{
  (e: 'toggleSidebar'): void;
}>();

const handleSidebarToggle = () => {
  emit("toggleSidebar");
};

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
      <img 
        :src="MenuIcon" 
        alt="Menu Icon" 
        class="menu-icon" 
        @click="handleSidebarToggle"
      />
      <h1>CSTU Facility Booking</h1>
      <span v-if="userId === 'admin'" class="admin"> ADMIN</span>
    </div>
    <div class="navbar-right" ref="dropdown">
      <img 
        @click="toggleDropdown" 
        :src="UserIcon" 
        alt="User Icon" 
        class="user-icon dropdown-a" 
      />
      <ul v-if="isOpen" class="dropdown-menu">
        <li>{{ userId }}</li>
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
  background-color: rgb(219, 78, 78);
  color: white;
  padding: 15px 20px;
}

.navbar-left {
  display: inline-flex;
  align-items: flex-end;
  gap: 10px;
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

.navbar-left h1 {
  display: inline-flex;
  align-items: center;
  font-weight: bold;
  font-size: 2vw;
}

.admin {
  color: gold;
  font-size: 1vw;
}

.user-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

.menu-icon {
  display: none;
  width: 30px;
  height: 30px;
  cursor: pointer;
}

@media (max-width: 600px) {

  .menu-icon {
    display: inline-flex;
  }

  .navbar-left h1{
    font-size: 4vw;
  }

  .admin{
    font-size: 3vw;
  }

}
</style>