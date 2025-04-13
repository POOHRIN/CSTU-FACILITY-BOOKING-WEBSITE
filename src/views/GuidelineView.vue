<script setup lang="ts">
import { useRouter } from 'vue-router';
import Image1 from "@/assets/glt3.png";
import Image2 from "@/assets/glt5.png";
import Image3 from "@/assets/glt6.png";
import Image4 from "@/assets/glt10.png";
import Image5 from "@/assets/glt8.png";
import Image6 from "@/assets/glt9.png";

const router = useRouter();
const userId = localStorage.getItem("userIdLogin");

if (userId !== "admin") {
    router.push('/home');
}

</script>

<template>
  <div class="guideline-container">
    <h1>วิธีการจอง Facility</h1>
    <div class="steps-grid">
      <div class="step-card">
        <div class="step-number">1</div>
        <h3>เลือก Facility ที่ต้องการ</h3>
        <p>เลือก Facility ที่คุณต้องการจองจากแถบด้านข้างหรือจากปุ่ม Home เช่น Meeting Room หรือ Presentation Room</p>
        <img :src="Image1" alt="เลือก Facility" class="guide-img"/>
      </div>

      <div class="step-card">
        <div class="step-number">2</div>
        <h3>เลือกห้องที่ต้องการ</h3>
        <p>เมื่อคุณเลือกประเภทของ Facility แล้ว เลือกห้องที่ต้องการจะจอง</p>
        <img :src="Image2" alt="เลือกห้องที่ต้องการ" class="guide-img"/>
      </div>

      <div class="step-card">
        <div class="step-number">3</div>
        <h3>เลือกวันที่และเวลา</h3>
        <p>เมื่อคุณเลือกห้องที่ต้องการแล้ว เลือกวันที่และเวลาที่คุณต้องการจอง จากนั้นกดจองห้อง</p>
        <img :src="Image3" alt="เลือกวันที่และเวลา" class="guide-img"/>
      </div>

      <div class="step-card">
        <div class="step-number">4</div>
        <h3>ไปที่ My Booking</h3>
        <p>หลังจากกดจองห้องแล้ว สามารถมาตรวจสอบรายละเอียดการจองได้ที่ My Booking</p>
        <img :src="Image5" alt="My Booking" class="guide-img"/>
      </div>
    </div><br><br><br>

    <h1>วิธีการยกเลิกการจอง</h1>
    <div class="steps-grid">
      <div class="step-card" style="visibility: hidden;"> <!-- ซ่อน -->
        <div class="step-number">5</div>
        <h3>hidden</h3>
        <p>hidden</p>
        <img :src="Image1" alt="เลือก Facility" class="guide-img"/>
      </div>

      <div class="step-card">
        <div class="step-number">1</div>
        <h3>ไปที่ My Booking</h3>
        <p>ไปที่ My Booking เพื่อเลือกรายการที่ต้องการจะยกเลิก</p>
        <img :src="Image6" alt="Cancel Booking" class="guide-img"/>
      </div>

      <div class="step-card">
        <div class="step-number">2</div>
        <h3>กดยกเลิกการจอง</h3>
        <p>จากนั้นเลือก Facility ที่คุณต้องการจะยกเลิก และคลิก "ยกเลิกการจอง" ที่อยู่ด้านขวา</p>
        <img :src="Image4" alt="เลือก Facility" class="guide-img"/>
      </div>

      <div class="step-card" style="visibility: hidden;"> <!-- ซ่อน -->
        <div class="step-number">8</div>
        <h3>hidden</h3>
        <p>hidden</p>
        <img :src="Image1" alt="เลือก Facility" class="guide-img"/>
      </div>
    </div>


    <p class="support-text">
      หากคุณพบปัญหาหรือมีคำถามเพิ่มเติม สามารถติดต่อทีมสนับสนุนของเราได้ตลอดเวลาได้ที่อีเมล poohrin.kon@dome.tu.ac.th <br>
      หรือ wisut.nat@dome.tu.ac.th</p>
  </div>
</template>

<script setup>
</script>

<style scoped>
.guideline-container {
  padding: 20px;
  background-color: #f0f4f8;
  border-radius: 12px;
  margin-top: 20px;
  color: #333;
  font-size: 18px;
  max-height: 85vh;
  overflow-y: auto;
  position: absolute;
  left: 11vw;
  width: calc(100% - 12vw);
}

.guideline-container h1 {
  text-align: center;
  font-size: 32px;
  color: #222;
  margin-bottom: 30px;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  padding: 0 20px;
}

.step-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 25px;
  text-align: center;
}

.step-number {
  width: 40px;
  height: 40px;
  margin: 0 auto 15px;
  border-radius: 50%;
  background-color: rgb(219,78,78);
  color: white;
  font-weight: bold;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-card h3 {
  font-size: 22px;
  margin-bottom: 10px;
  color: #222;
  font-weight: bold;
}

.step-card p {
  font-size: 16px;
  color: #000000;
}

.guide-img {
  display: block;
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  margin-top: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.support-text {
  margin-top: 30px;
  text-align: center;
  font-size: 16px;
  color: #666;
}
</style>