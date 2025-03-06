<script setup lang="ts">

</script>

<template>
  <div class="guideline-container">
    <h2>วิธีการจอง Facility</h2>
    <div class="guideline-content">
      <p>การจอง Facility ง่ายและรวดเร็ว เพียงทำตามขั้นตอนดังนี้:</p>
      <ol><br>
        <li><strong>เลือก Facility ที่ต้องการ :</strong> เลือก Facility ที่คุณต้องการจองจากแถบด้านข้าง เช่น Meeting Room หรือ Presentation Room</li>
        <li><strong>เลือกวันที่และเวลา :</strong> เมื่อคุณเลือก Facility แล้ว เลือกวันที่และเวลาที่คุณต้องการจอง</li>
        <li><strong>ไปที่ My Booking :</strong> หลังจากเลือกเวลาที่ต้องการแล้ว กดปุ่ม "จองทันที" เพื่อยืนยันการจอง</li>
        <li><strong>กดยืนยัน :</strong> คุณจะได้รับการยืนยันการจองพร้อมกับหมายเลขจอง</li>
      </ol>
      <p>หากคุณพบปัญหาหรือมีคำถามเพิ่มเติม สามารถติดต่อทีมสนับสนุนของเราได้ตลอดเวลา</p>
      <h1> เดี๋ยวมาแก้เพิ่ม</h1>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.guideline-container {
  padding: 20px;
  background-color: rgb(211, 211, 211);
  color: black;
  border-radius: 10px;
  margin-top: 20px;
  max-height: 85vh;
  overflow-y: auto;
  position: absolute; 
  left: 15vw; 
  right: 0; 
  width: calc(100% - 18vw); 
}

.guideline-container h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5em;
}

.guideline-content {
  padding: 20px;
}

ol {
  margin-left: 20px;
}

ol li {
  margin-bottom: 15px;
  line-height: 1.6;
}

strong {
  font-weight: bold;
}
</style>
