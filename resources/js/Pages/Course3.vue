<template>
    <div class="course-detail">
        <div class="course-header">
        <h1>Menyelam ke Dunia Laut</h1>
        <p class="subtitle">Mengenal dasar-dasar ekosistem laut dan perannya</p>
        </div>

        <div class="content-wrapper">
        <div class="main-content">
            <div class="content-section">
            <h2>🌊 Apa itu Ekosistem Laut?</h2>
            <p>Ekosistem laut adalah sistem ekologi yang terbentuk oleh interaksi antara makhluk hidup dan lingkungan fisik di laut. Laut menutupi 71% permukaan Bumi dan menjadi rumah bagi keanekaragaman hayati yang sangat besar.</p>
            </div>

            <div class="content-section">
            <h2>🐠 Komponen Ekosistem Laut</h2>
            <div class="feature-grid">
                <div class="feature-item">
                <h3>Produsen</h3>
                <p>Fitoplankton dan rumput laut yang menghasilkan makanan melalui fotosintesis</p>
                </div>
                <div class="feature-item">
                <h3>Konsumen</h3>
                <p>Ikan, udang, cumi-cumi, dan mamalia laut yang memakan produsen atau konsumen lain</p>
                </div>
                <div class="feature-item">
                <h3>Pengurai</h3>
                <p>Bakteri dan jamur yang menguraikan materi organik menjadi nutrisi</p>
                </div>
            </div>
            </div>

            <div class="content-section">
            <h2>📈 Peran Penting Laut</h2>
            <ul class="role-list">
                <li>🌍 Regulator iklim global</li>
                <li>🏠 Habitat bagi jutaan spesies</li>
                <li>🍽️ Sumber makanan bagi manusia</li>
                <li>💨 Produsen oksigen terbesar</li>
                <li>🛳️ Jalur transportasi penting</li>
            </ul>
            </div>
        </div>

        <div class="navigation">
            <button @click="$router.back()" class="nav-btn back-btn">Kembali</button>
            <button @click="$router.push('/course/4')" class="nav-btn next-btn">Lanjut ke Bab 4</button>
        </div>
        </div>
    </div>
</template>

<script>
    export default {
    name: "Course3"
    }
</script>

<style scoped>
    .course-detail {
    min-height: 100vh;
    padding: 20px;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    }

    .course-detail::before {
    content: "";
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    background: url('/foto/bgc1.jpg') no-repeat center/cover;
    background-size: cover;
    opacity: 0.5;  /* efek transparan */
    z-index: -1;
    }

    .course-header {
    padding-top: 50px;
    text-align: center;
    margin-bottom: 40px;
    position: relative;
    z-index: 2;
    }

    .course-header h1 {
    font-size: 2.5rem;
    font-family: katibeh, serif;
    margin-bottom: 10px;
    }

    .subtitle {
    font-size: 1.2rem;
    font-family: karla, serif;
    opacity: 0.9;
    }

    .content-wrapper {
    max-width: 1000px;
    margin: 0 auto;
    z-index: 2;
    position: relative;

    }

    .main-content {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 30px;
    margin-bottom: 30px;
    }

    .content-section {
    margin-bottom: 40px;
    }

    .content-section h2 {
    font-size: 1.5rem;
    font-family: karla, serif;
    margin-bottom: 15px;
    color: #d9ebff;
    }

    .content-section p {
    font-size: 1rem;
    line-height: 1.6;
    font-family: karla, serif;
    }

    .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
    }

    .feature-item {
    background: rgba(217, 235, 255, 0.1);
    padding: 20px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .feature-item h3 {
    color: #0056a3;
    margin-bottom: 10px;
    font-family: karla, serif;
    }

    .role-list {
    list-style: none;
    padding: 0;
    }

    .role-list li {
    padding: 10px 0;
    font-size: 1.1rem;
    font-family: karla, serif;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .navigation {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    }

    .nav-btn {
    padding: 12px 30px;
    border: none;
    border-radius: 8px;
    font-family: karla, serif;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.3s;
    }

    .back-btn {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    }

    .next-btn {
    background: #0056a3;
    color: white;
    }

    .nav-btn:hover {
    transform: translateY(-2px);
    }

    @media (max-width: 768px) {
    .course-header h1 {
        font-size: 2rem;
    }
    
    .navigation {
        flex-direction: column;
    }
    
    .feature-grid {
        grid-template-columns: 1fr;
    }
    }
</style>