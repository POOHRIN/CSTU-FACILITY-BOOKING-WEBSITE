<script setup lang="ts">
import { useRouter } from 'vue-router';
import Image1 from "@/assets/glt3.png";
import Image2 from "@/assets/glt5.png";
import Image3 from "@/assets/glt6.png";

const router = useRouter();
const userId = localStorage.getItem("userIdLogin");

</script>

<template>
  <div class="guideline-container">
    <h1>วิธีการจอง Facility</h1>
    <div class="guideline-content">
      <p>การจอง Facility สามารถทำได้ตามขั้นตอนดังนี้:</p>
      <ol><br>
        <li>
          <strong>เลือก Facility ที่ต้องการ :</strong> เลือก Facility ที่คุณต้องการจะจองจากแถบด้านข้างหรือจากปุ่ม Home เช่น Meeting Room หรือ Presentation Room
          <img :src="Image1" alt="เลือก Facility" class="guide-img"/>
        </li><br><br>

        <li>
          <strong>เลือกห้องที่ต้องการ :</strong> เมื่อคุณเลือกประเภทของ Facility แล้ว เลือกห้องที่ต้องการจะจอง
          <img :src="Image2" alt="เลือกห้องที่ต้องการ" class="guide-img"/>
        </li><br><br>

        <li>
          <strong>เลือกวันที่และเวลา :</strong> เมื่อคุณเลือกห้องที่ต้องการแล้ว เลือกวันที่และเวลาที่คุณต้องการจอง จากนั้นกดจองห้อง
          <img :src="Image3" alt="เลือกวันที่และเวลา" class="guide-img"/>
        </li><br><br>

        <li>
          <strong>ไปที่ My Booking :</strong> หลังจากเลือกเวลาที่ต้องการแล้ว กดปุ่ม "จองทันที" เพื่อยืนยันการจอง
        </li>

        <li>
          <strong>กดยืนยัน :</strong> คุณจะได้รับการยืนยันการจองพร้อมกับหมายเลขจอง
        </li>
      </ol>
      <p>หากคุณพบปัญหาหรือมีคำถามเพิ่มเติม สามารถติดต่อทีมสนับสนุนของเราได้ตลอดเวลา</p>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.guideline-container {
  padding: 20px;
  background-color: #f0f0f0;
  color: black;
  border-radius: 10px;
  margin-top: 20px;
  max-height: 85vh;
  overflow-y: auto;
  position: absolute; 
  left: 10vw; 
  right: 0; 
  width: calc(100% - 12vw); 
  overflow-y: auto; 
  overflow-x: hidden; 
  font-size: 18px;
}

.guideline-container h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 30px;
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

.guide-img {
  display: block;
  width: 600px;        
  height: 450px;       
  object-fit: cover;   
  margin-top: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

strong {
  font-weight: bold;
}
</style>
