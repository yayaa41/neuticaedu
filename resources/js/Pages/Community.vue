<template>
  <div class="community-page">
    <div class="page-content">
      <section>
        <h2>Studi Kasus Lokal</h2>
        <p>Beberapa contoh nyata kerusakan laut di Indonesia:</p>
        <ul>
          <li>Limbah tambak udang di Pantai Yogyakarta menyebabkan kematian massal ikan.</li>
          <li>Penumpukan sampah plastik di Laut Jawa merusak hutan mangrove.</li>
          <li>Pencemaran limbah nikel di Perairan Halmahera Timur.</li>
          <li>Pencemaran minyak di Teluk Lampung mengancam kehidupan pesisir.</li>
        </ul>
        
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Community'
}
</script>

<style scoped>
.community-page {
  min-height: 100vh;
  padding-top: 80px;
  z-index: 2;
}

.page-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
  padding-bottom: 120px;
  
}

section {
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 12px;
  padding: 2rem;
  z-index: 2;
}

h2 {
  color: #00796b;
  border-bottom: 3px solid #004d40;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}

ul {
  line-height: 1.8;
  margin-bottom: 2rem;
}

</style>