<template>
  <div class="home-wrapper">

    <div class="home-page">
      <section class="hero">
        <h1 class="welcome-title">Welcome to NauticaEdū!</h1>
        <p class="welcome-subtitle">Mari jaga kelestarian laut Indonesia bersama-sama</p>
      </section>
    </div>

    <div class="news-grid">

      <!-- Large 1 -->
      <article class="item large-1">
        <img :src="'/foto/palingbesar.jpg'" alt="Hiu Paus">
        <div class="text-large1">
          <h2>Hiu Paus Terdampar di Pantai Kita</h2>
          <p class="date">November 18, 2025</p>
          <button>READ MORE</button>
        </div>
      </article>

      <!-- Large 2 -->
      <article class="item large-2">
        <img :src="'/foto/besar2.jpg'" alt="Sampah Plastik">
        <div class="text-large2">
          <h2>Bahaya Sampah Plastik di Laut: Bisa Cemari Ikan Konsumsi</h2>
          <p class="date">November 15, 2025</p>
          <button>READ MORE</button>
        </div>
      </article>

      <!-- Large 3 -->
      <article class="item large-3">
        <img :src="'/foto/panjang.jpg'" alt="Lumba-lumba">
        <div class="text-large3">
          <h2>Kawanan Lumba-lumba Muncul di Laut Pulau Pramuka Jakarta</h2>
          <p class="date">Agustus 25, 2025</p>
        </div>
      </article>

      <!-- Small row -->
      <div class="small-row">
        <article class="item small-1">
          <img :src="'/foto/kecil1.jpg'" alt="Kecil 1">
          <div class="text-small1">
            <h4>Menikmati keindahan bawah laut Sombu di Wakatobi, habitat dari ribuan spesies biota laut</h4>
            <p class="date">Oktober 7, 2025</p>
          </div>
        </article>

        <article class="item small-2">
          <img :src="'/foto/kecil2.jpg'" alt="Kecil 2">
          <div class="text-small2">
            <h4>Menjaga dan mengolah boga bahari Indonesia Timur</h4>
            <p class="date">Desember 8, 2022</p>
          </div>
        </article>
      </div>
      <p class="teksbawah">Tertarik menjadi bagian dalam melindungi laut? Mari bergabung dengan komunitas kami atau menjadi volunteer untuk berpartisipasi menjaga laut kita! 
      Dapat diakses melalui bagian 
      <router-link to="/community" class="inline-link">community</router-link>.</p>

    </div>

  </div>
</template>



<script>
const NewsGrid = {
  name: "NewsGrid",
  props: ["items"]
};

export default {
  name: "Home",
  components: { NewsGrid }
};
</script>


<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Katibeh&display=swap');

/* BACKGROUND PUTIH HANYA DI HOME */
.home-wrapper {
  background-color: white;

}

.home-page {
  min-height: 100vh;
  background-color: white; 
}

.hero {
  height: 100vh;
  background-image: url('/foto/homefix.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding: 0 20px;
}

.welcome-title {
  font-family: "Katibeh", serif;
  font-size: 6rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
  line-height: 1.1;
  position: relative;
  z-index: 2;
}

.welcome-subtitle {
  font-size: 2rem;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  font-weight: 300;
  font-family: "Katibeh", serif;
  font-style: normal;
  position: relative;
  z-index: 2;
}

/* Responsive */
@media (max-width: 768px) {
  .welcome-title {
    font-size: 2.5rem;
  }
  
  .welcome-subtitle {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .welcome-title {
    font-size: 2rem;
  }
  
  .welcome-subtitle {
    font-size: 1rem;
  }
}

/*Bagian News*/

.news-grid {
  display: grid;
  font-family: "Playfair Display", serif;
  grid-template-columns: 2fr 1fr;     /* kiri dua bagian, kanan satu bagian */
  grid-template-rows: auto 1fr auto; /* baris: top, middle, bottom */
  gap: 10px;
  background-color: #D9D9D9;
  margin-bottom: 30px;
  align-items: start;
  max-width: 1200px;   /* atur sesuai kebutuhan: 1000px, 1100px, 1200px */
  margin: 80px auto auto;      /* ini membuat kotak berada di tengah */
  padding: 10px;       /* memberi ruang agar tidak nempel ke tepi */
  border-radius: 12px; /* opsional: agar sudut lebih halus */
  position: relative;
  z-index: 2;
}

/* Penempatan item pada grid utama */
.large-1 { grid-column: 1 / -1; height: 380px;/* span full width (kolom 1 sampai akhir) */ }
.large-2 { grid-column: 1 / 2; grid-row: 2 / 3;height: 300px; }
.large-3 { grid-column: 2 / 3; grid-row: 2 / 4; height: 580px; } /* kanan tinggi (menjangkau row 2 dan 3) */

/* small-row: menempati kolom kiri baris paling bawah */
.small-row {
  grid-column: 1 / 2;
  grid-row: 3 / 4;
  display: flex;
  gap: 5px;
}

/* Dua small item berdampingan, masing-masing setengah lebar container */
.small-row .small-1,
.small-row .small-2 {
  flex: 1 1 0;
  grid-column: auto;
  grid-row: auto;
  height: 270px;
}

.small-1 {
  grid-column: 1 / 2;
  grid-row: 3 / 4;
}

/* Gaya umum item */
.item {
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  min-height: 120px;
  background: #111; /* fallback saat gambar belum load */
}

/* Pastikan gambar memenuhi kotak dan ter-crop rapi */
.item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display:block;
}

/* teks overlay */
.text-large1 {
  position: absolute;
  top: 14px;
  left: 14px;
  right: 14px;
  font-size: 40px;
  color: white;
  z-index: 2;
  font-family: playfair display, serif;
  text-shadow: 0 3px 10px rgba(0,0,0,0.6);
}

.text-large2 {
  position: absolute;
  top: 14px;
  left: 14px;
  right: 14px;
  font-size: 30px;
  color: white;
  z-index: 2;
  font-family: playfair display, serif;
  text-shadow: 0 3px 10px rgba(0,0,0,0.6);
}

.text-large3 {
  position: absolute;
  left: 14px;
  bottom: 14px;
  text-align: left;
  font-size: 30px;
  font-family: playfair display, serif;
  color: white;
  z-index: 2;
  text-shadow: 0 3px 10px rgba(0,0,0,0.6);
}

.text-small1{
  position: absolute;
  left: 14px;
  bottom: 14px;
  text-align: left;
  font-size: 25px;
  font-family: playfair display, serif;
  color: white;
  z-index: 2;
  text-shadow: 0 3px 10px rgba(0,0,0,0.6);
}

.text-small2{
  position: absolute;
  left: 14px;
  bottom: 14px;
  text-align: left;
  font-size: 25px;
  font-family: playfair display, serif;
  color: white;
  z-index: 2;
  text-shadow: 0 3px 10px rgba(0,0,0,0.6);
}

.item .text {
  position: absolute;
  top: 14px;
  left: 14px;
  right: 14px;
  color: white;
  z-index: 2;
  text-shadow: 0 3px 10px rgba(0,0,0,0.6);
}

/* styling judul dan tanggal */
.item h2, .item h4 {
  margin: 0 0 6px 0;
  line-height: 1.05;
}
.date {
  font-size: 0.75rem;
  letter-spacing: 1px;
  opacity: 0.9;
  margin-bottom: 8px;
  text-transform: uppercase;
}

/* tombol */
.item button {
  margin-top: 8px;
  padding: 7px 12px;
  background: #0b65a8;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

.teksbawah{
  font-family: karla, serif;
  color: #1e2124;
  font-size: 18px;
}

.inline-link{
  color: #0060C0;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
}

/* responsive: pada layar sempit, ubah jadi satu kolom */
@media (max-width: 900px) {
  .news-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }

  .large-3 { grid-column: 1 / -1; grid-row: auto; }
  .large-2 { grid-column: 1 / -1; grid-row: auto; }
  .small-row { grid-column: 1 / -1; flex-direction: row; }
  .small-row .small-1, .small-row .small-2 { flex: 1 1 50%; }
}

/* mobile: stack vertically */
@media (max-width: 480px) {
  .small-row { flex-direction: column; }
  .small-row .small-1, .small-row .small-2 { width: 100%; }
}
</style>