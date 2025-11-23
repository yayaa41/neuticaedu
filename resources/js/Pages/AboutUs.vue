<template>
  <div class="about-page">
    <!-- White Container -->
    <div class="white-container">
      <!-- Header Section -->
      <section class="about-header">
        <h1 class="about-title">ABOUT US</h1>
      </section>

      <!-- Content Grid -->
      <div class="content-grid">
        <!-- Image Section -->
        <div class="image-section">
          <div class="image-container">
            <img :src="aboutUsImage" alt="About Us" class="about-image"> 
          </div>
        </div>

        <!-- Text Content dalam 2 Kolom -->
        <div class="text-section">
          <div class="text-columns">
            <div class="column left-column">
              <p class="about-description">
                NauticaEdu adalah website yang kami bentuk untuk menyediakan 
                berita, informasi dan pembelajaran terkait dunia bawah laut, selain 
                itu dalam website ini kami menyediakan komunitas dan volunteer 
                untuk mendukung dan turut menjaga kebersihan lingkungan laut sebagai gerakan menjaga kelestarian ekosistem laut.
              </p>
            </div>
            
            <div class="column right-column">
              <p class="about-description">
                We have years of experience in the fourth
                century, where we continue to pursue
                scientific art in each line 50 decades.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUs',
  data() {
    return {
      aboutUsImage: '/foto/aboutus.jpg'
    }
  },
  mounted() {
    // Trigger bubble animation when page loads
    setTimeout(() => {
      if (this.$parent.showBubbles !== undefined) {
        this.$parent.showBubbles = true;
        setTimeout(() => {
          this.$parent.showBubbles = false;
        }, 2500);
      }
    }, 100);
  }
}
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  padding-top: 100px;
  padding-bottom: 50px;
  background: linear-gradient(135deg, #5BA6FA 0%, #004B85 100%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

/* White Container */
.white-container {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  width: 95%;
  margin: 0 auto;
  overflow: hidden;
}

/* Header Section */
.about-header {
  padding-right: 100px;
  padding-inline: 10px;
  text-align: right;
}

.about-title {
  font-family: 'Calibri', serif;
  font-size: 3.5rem;
  font-weight: 700;
  align-items: center;
  margin: 0;
  color: #004B85;
  text-shadow: 3px 3px 8px rgba(0,0,0,0.5);
  letter-spacing: 2px;
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 0;
  min-height: 400px;
}

/* Image Section */
.image-section {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fdff;
}

.image-container {
  width: 100%;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.about-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Text Section dengan 2 Kolom KANAN-KIRI */
.text-section {
  padding: 40px;
  display: flex;
  align-items: center;
  background: white;
}

.text-columns {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Dua kolom dengan lebar sama */
  gap: 40px;
  width: 100%;
}

.column {
  display: flex;
  flex-direction: column;
}

.left-column {
  /* Kolom kiri - tidak perlu styling khusus */
}

.right-column {
  /* Kolom kanan - tidak perlu styling khusus */
}

.about-description {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
  margin: 0;
  text-align: left; /* Ubah dari justify ke left */
}

/* Garis pemisah antara kolom */
.text-columns {
  position: relative;
}

.text-columns::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  background: linear-gradient(to bottom, 
    transparent, 
    #e0e0e0, 
    transparent);
  transform: translateX(-50%);
}

/* Responsive Design */
@media (max-width: 968px) {
  .about-page {
    padding-top: 80px;
    padding-bottom: 30px;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .image-section {
    padding: 30px;
    order: 1;
  }
  
  .text-section {
    padding: 40px 30px;
    order: 2;
  }
  
  .about-title {
    font-size: 3rem;
  }
  
  .about-header {
    padding: 50px 30px;
  }

  .text-columns {
    grid-template-columns: 1fr; /* Jadi 1 kolom di tablet/mobile */
    gap: 25px;
  }
  
  /* Hilangkan garis pemisah di mobile */
  .text-columns::before {
    display: none;
  }
}

@media (max-width: 768px) {
  .about-page {
    padding-top: 70px;
  }
  
  .white-container {
    width: 95%;
    border-radius: 15px;
  }
  
  .about-header {
    padding: 40px 20px;
  }
  
  .about-title {
    font-size: 2.5rem;
  }
  
  .text-section {
    padding: 30px 25px;
  }
  
  .image-section {
    padding: 25px;
  }
  
  .about-description {
    font-size: 1.2rem;
    line-height: 1.6;
  }
  
  .image-container {
    height: 250px;
  }
}

@media (max-width: 480px) {
  .about-page {
    padding-top: 60px;
    padding-bottom: 20px;
  }
  
  .white-container {
    border-radius: 12px;
  }
  
  .about-header {
    padding: 30px 20px;
  }
  
  .about-title {
    font-size: 2rem;
  }
  
  .text-section {
    padding: 25px 20px;
  }
  
  .image-section {
    padding: 20px;
  }
  
  .about-description {
    font-size: 1.1rem;
    line-height: 1.5;
  }
  
  .image-container {
    height: 200px;
  }
}
</style>