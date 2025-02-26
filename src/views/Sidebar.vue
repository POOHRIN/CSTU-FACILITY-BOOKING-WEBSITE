<template>
  <aside class="sidebar">
    <ul>
      <li><router-link to="/home">Home</router-link></li>
    </ul>
    <ul class="facility">
      <li><router-link to="/home/meeting-room">Meeting Room</router-link></li>
      <li><router-link to="/home/presentation-room">Presentation Room</router-link></li>
    </ul>
    <ul>
      <li><router-link to="/home/guideline">Guideline</router-link></li>
    </ul>
    <ul>
      <li><router-link to="/home/my-booking">my Booking</router-link></li>
    </ul>
  </aside>
</template>
  
<style scoped>
.sidebar {
  width: auto;
  height: 100%;
  background-color: rgb(161, 65, 0);
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: fixed; 
  top: 60px; 
  left: 0;
  bottom: 0;
}
.sidebar a {
  color: white;
  text-decoration: none;
  padding: 10px;
}
.sidebar a:hover {
  background: #444;
}

.sidebar ul {
  padding: 0;
  list-style: none;
}

.sidebar ul:not(:last-child) {
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
.sidebar ul, .sidebar li{
  padding: 1.6vh 0;
}
</style>