<template>
    <div class="admin-berita">
        <!-- Header -->
        <div class="page-header">
        <div class="header-content">
            <div class="header-text">
            <h1>📰 Management Berita Homepage</h1>
            <p>Kelola berita yang akan ditampilkan di halaman utama</p>
            <div class="page-notice">
                💡 Berita yang dipublish akan otomatis muncul di homepage
            </div>
            </div>
            <div class="header-actions">
            <button @click="showAddBerita = true" class="btn-primary">
                ➕ Tambah Berita
            </button>
            </div>
        </div>
        </div>

        <!-- Position Guide -->
        <div class="position-guide">
        <div class="guide-content">
            <h3>📋 Posisi Berita di Homepage:</h3>
            <div class="position-grid">
            <div class="position-item" v-for="pos in positions" :key="pos.id">
                <div class="position-badge" :class="pos.id">{{ pos.label }}</div>
                <span>{{ pos.description }}</span>
            </div>
            </div>
        </div>
        </div>

        <!-- Berita Table -->
        <div class="table-section">
        <div class="table-container">
            <div class="table-header">
            <div class="table-info">
                Total {{ berita.length }} berita di homepage
            </div>
            </div>

            <div class="table-wrapper">
            <table class="berita-table">
                <thead>
                <tr>
                    <th>Posisi</th>
                    <th>Judul Berita</th>
                    <th>Gambar</th>
                    <th>Link</th>
                    <th>Status</th>
                    <th>Aksi</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in berita" :key="item.id">
                    <td>
                    <span class="position-badge" :class="item.position">
                        {{ getPositionLabel(item.position) }}
                    </span>
                    </td>
                    <td>
                    <div class="berita-title-cell">
                        <div class="berita-title">{{ item.title }}</div>
                    </div>
                    </td>
                    <td>
                    <div class="image-preview" @click="showImagePreview(item.image)">
                        <img :src="item.image" :alt="item.title" class="thumbnail-preview">
                        <span class="preview-hint"> ℹ️Preview</span>
                    </div>
                    </td>
                    <td>
                    <div class="link-cell">
                        <a :href="item.link" target="_blank" class="external-link" @click.stop>
                        🔗 Buka Link
                        </a>
                    </div>
                    </td>
                    <td>
                    <span class="status-badge" :class="item.status">
                        {{ item.status === 'published' ? 'Aktif' : 'Non-Aktif' }}
                    </span>
                    </td>
                    <td>
                    <div class="action-buttons">
                        <button @click="editBerita(item)" class="btn-action edit" title="Edit">
                        ✏️
                        </button>
                        <button 
                        @click="toggleBeritaStatus(item)" 
                        :class="['btn-action', item.status === 'published' ? 'unpublish' : 'publish']"
                        :title="item.status === 'published' ? 'Non-Aktifkan' : 'Aktifkan'"
                        >
                        {{ item.status === 'published' ? '⏸️' : '📤' }}
                        </button>
                        <button 
                        @click="deleteBerita(item)" 
                        class="btn-action delete" 
                        title="Hapus"
                        >
                        🗑️
                        </button>
                    </div>
                    </td>
                </tr>
                </tbody>
            </table>
            
            <!-- Empty State -->
            <div v-if="berita.length === 0" class="empty-state">
                <div class="empty-icon">📰</div>
                <h3>Belum ada berita</h3>
                <p>Mulai dengan menambahkan berita pertama untuk homepage</p>
                <button @click="showAddBerita = true" class="btn-primary">
                ➕ Tambah Berita Pertama
                </button>
            </div>
            </div>
        </div>
        </div>

        <!-- Add Berita Modal -->
        <div v-if="showAddBerita" class="modal-backdrop" @click="showAddBerita = false">
        <div class="modal" @click.stop>
            <div class="modal-header">
            <h3>➕ Tambah Berita Homepage</h3>
            <button @click="showAddBerita = false" class="modal-close">×</button>
            </div>
            <div class="modal-body">
            <div class="form-group">
                <label>Posisi di Homepage *</label>
                <select v-model="newBerita.position" class="form-select">
                <option value="">Pilih Posisi</option>
                <option value="large1">Large 1 - Berita Utama</option>
                <option value="large2">Large 2 - Berita Besar Kiri</option>
                <option value="large3">Large 3 - Berita Tinggi Kanan</option>
                <option value="small1">Small 1 - Berita Kecil Kiri Bawah</option>
                <option value="small2">Small 2 - Berita Kecil Kanan Bawah</option>
                </select>
                <div v-if="positionConflict" class="warning-message">
                ⚠️ Posisi ini sudah digunakan oleh berita lain
                </div>
            </div>
            
            <div class="form-group">
                <label>Judul Berita *</label>
                <input v-model="newBerita.title" type="text" class="form-input" placeholder="Masukkan judul berita">
            </div>
            
            <div class="form-group">
                <label>Link Berita *</label>
                <input v-model="newBerita.link" type="url" class="form-input" placeholder="https://example.com/berita">
            </div>
            
            <div class="form-group">
                <label>URL Gambar *</label>
                <input v-model="newBerita.image" type="url" class="form-input" placeholder="https://example.com/image.jpg">
                <div class="image-preview-small" v-if="newBerita.image">
                <img :src="newBerita.image" alt="Preview" @error="handleImageError">
                </div>
            </div>
            </div>
            <div class="modal-footer">
            <button @click="showAddBerita = false" class="btn-secondary">
                Batal
            </button>
            <button @click="addBerita" class="btn-primary" :disabled="!isValidNewBerita || positionConflict">
                💾 Simpan Berita
            </button>
            </div>
        </div>
        </div>

        <!-- Edit Berita Modal -->
        <div v-if="editingBerita" class="modal-backdrop" @click="cancelEdit">
        <div class="modal" @click.stop>
            <div class="modal-header">
            <h3>✏️ Edit Berita Homepage</h3>
            <button @click="cancelEdit" class="modal-close">×</button>
            </div>
            <div class="modal-body">
            <div class="form-group">
                <label>Posisi di Homepage *</label>
                <select v-model="editingBerita.position" class="form-select">
                <option value="large1">Large 1 - Berita Utama</option>
                <option value="large2">Large 2 - Berita Besar Kiri</option>
                <option value="large3">Large 3 - Berita Tinggi Kanan</option>
                <option value="small1">Small 1 - Berita Kecil Kiri Bawah</option>
                <option value="small2">Small 2 - Berita Kecil Kanan Bawah</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Judul Berita *</label>
                <input v-model="editingBerita.title" type="text" class="form-input">
            </div>
            
            <div class="form-group">
                <label>Link Berita *</label>
                <input v-model="editingBerita.link" type="url" class="form-input">
            </div>
            
            <div class="form-group">
                <label>URL Gambar *</label>
                <input v-model="editingBerita.image" type="url" class="form-input">
                <div class="image-preview-small" v-if="editingBerita.image">
                <img :src="editingBerita.image" alt="Preview" @error="handleImageError">
                </div>
            </div>
            </div>
            <div class="modal-footer">
            <button @click="cancelEdit" class="btn-secondary">
                Batal
            </button>
            <button @click="saveBerita" class="btn-primary">
                💾 Simpan Perubahan
            </button>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'

export default {
    name: 'AdminBerita',
    setup() {
        // Data
        const berita = ref([])
        const showAddBerita = ref(false)
        const editingBerita = ref(null)
        const positionConflict = ref(false)

        // Posisi berita
        const positions = ref([
        { id: 'large1', label: 'Large 1', description: 'Berita utama (full width)' },
        { id: 'large2', label: 'Large 2', description: 'Berita besar kiri' },
        { id: 'large3', label: 'Large 3', description: 'Berita tinggi kanan' },
        { id: 'small1', label: 'Small 1', description: 'Berita kecil kiri bawah' },
        { id: 'small2', label: 'Small 2', description: 'Berita kecil kanan bawah' }
        ])

        // New Berita Form
        const newBerita = ref({
        position: '',
        title: '',
        link: '',
        image: '',
        status: 'published'
        })

        // Computed
        const isValidNewBerita = computed(() => {
        return newBerita.value.position && 
                newBerita.value.title && 
                newBerita.value.link && 
                newBerita.value.image
        })

        // Methods
        const fetchBerita = () => {
        // Load dari localStorage
        const savedBerita = localStorage.getItem('homepageNews')
        if (savedBerita) {
            berita.value = JSON.parse(savedBerita)
        } else {
            // Data default dari home page Anda
            berita.value = [
            {
                id: 1,
                position: 'large1',
                title: 'Hiu Paus Terdampar di Pantai Kita',
                link: 'https://www.tempo.co/lingkungan/terdamparnya-hiu-paus-kita-2090748',
                image: '/foto/palingbesar.jpg',
                status: 'published'
            },
            {
                id: 2,
                position: 'large2',
                title: 'Bahaya Sampah Plastik di Laut: Bisa Cemari Ikan Konsumsi',
                link: 'https://news.detik.com/berita/d-4798953/bahaya-sampah-plastik-di-laut-bisa-cemari-ikan-konsumsi',
                image: '/foto/besar2.jpg',
                status: 'published'
            },
            {
                id: 3,
                position: 'large3',
                title: 'Kawanan Lumba-lumba Muncul di Laut Pulau Pramuka Jakarta',
                link: 'https://news.detik.com/berita/d-7726140/kawanan-lumba-lumba-muncul-di-laut-pulau-pramuka-jakarta',
                image: '/foto/panjang.jpg',
                status: 'published'
            },
            {
                id: 4,
                position: 'small1',
                title: 'Menikmati keindahan bawah laut Sombu di Wakatobi, habitat dari ribuan spesies biota laut',
                link: 'https://www.antaranews.com/foto/5158889/menikmati-keindahan-bawah-laut-sombu-di-wakatobi-habitat-dari-ribuan-spesies-biota-laut',
                image: '/foto/kecil1.jpg',
                status: 'published'
            },
            {
                id: 5,
                position: 'small2',
                title: 'Menjaga dan mengolah boga bahari Indonesia Timur',
                link: 'https://www.antaranews.com/berita/3293223/menjaga-dan-mengolah-boga-bahari-indonesia-timur',
                image: '/foto/kecil2.jpg',
                status: 'published'
            }
            ]
            saveToLocalStorage()
        }
        }

        const saveToLocalStorage = () => {
        localStorage.setItem('homepageNews', JSON.stringify(berita.value))
        }

        const checkPositionConflict = () => {
        if (!newBerita.value.position) {
            positionConflict.value = false
            return
        }
        
        const existing = berita.value.find(item => 
            item.position === newBerita.value.position
        )
        positionConflict.value = !!existing
        }

        const getPositionLabel = (position) => {
        const pos = positions.value.find(p => p.id === position)
        return pos ? pos.label : position
        }

        const handleImageError = (event) => {
        event.target.style.display = 'none'
        }

        const showImagePreview = (imageUrl) => {
        window.open(imageUrl, '_blank')
        }

        // Berita actions
        const addBerita = () => {
        const item = {
            id: Date.now(),
            ...newBerita.value
        }
        berita.value.push(item)
        saveToLocalStorage()
        showAddBerita.value = false
        resetNewBerita()
        }

        const editBerita = (item) => {
        editingBerita.value = { ...item }
        }

        const saveBerita = () => {
        const index = berita.value.findIndex(b => b.id === editingBerita.value.id)
        if (index !== -1) {
            berita.value[index] = { ...editingBerita.value }
            saveToLocalStorage()
        }
        editingBerita.value = null
        }

        const cancelEdit = () => {
        editingBerita.value = null
        }

        const toggleBeritaStatus = (item) => {
        item.status = item.status === 'published' ? 'draft' : 'published'
        saveToLocalStorage()
        }

        const deleteBerita = (item) => {
        if (confirm(`Hapus berita "${item.title}"?`)) {
            berita.value = berita.value.filter(b => b.id !== item.id)
            saveToLocalStorage()
        }
        }

        const resetNewBerita = () => {
        newBerita.value = {
            position: '',
            title: '',
            link: '',
            image: '',
            status: 'published'
        }
        positionConflict.value = false
        }

        // Watch for position changes
        watch(() => newBerita.value.position, checkPositionConflict)

        onMounted(() => {
        fetchBerita()
        })

        return {
        // Data
        berita,
        showAddBerita,
        editingBerita,
        positionConflict,
        positions,
        
        // Forms
        newBerita,
        
        // Computed
        isValidNewBerita,
        
        // Methods
        fetchBerita,
        checkPositionConflict,
        getPositionLabel,
        handleImageError,
        showImagePreview,
        addBerita,
        editBerita,
        saveBerita,
        cancelEdit,
        toggleBeritaStatus,
        deleteBerita
        }
    }
    }
</script>

<style scoped>
    .admin-berita {
    min-height: 100vh;
    background: #f8f9fa;
    padding-bottom: 20px;
    font-family: karla, serif;
    }

    /* Header */
    .page-header {
    background: white;
    padding: 24px 30px;
    border-bottom: 1px solid #e9ecef;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    position: relative;
    z-index: 2;
    }

    .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    }

    .header-text h1 {
    margin: 0 0 8px 0;
    font-size: 28px;
    color: #2c3e50;
    font-weight: 700;
    }

    .header-text p {
    margin: 0;
    color: #6c757d;
    font-size: 16px;
    }

    .page-notice {
    background: #e3f2fd;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 14px;
    color: #1976d2;
    margin-top: 8px;
    border-left: 4px solid #2196f3;
    }

    .header-actions {
    display: flex;
    gap: 12px;
    }

    /* Buttons */
    .btn-primary {
    background: #3498db;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    }

    .btn-primary:hover {
    background: #2980b9;
    transform: translateY(-1px);
    }

    .btn-secondary {
    background: #95a5a6;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    }

    .btn-secondary:hover {
    background: #7f8c8d;
    }

    /* Position Guide */
    .position-guide {
    background: white;
    padding: 20px 30px;
    border-bottom: 1px solid #e9ecef;
    position: relative;
    z-index: 2;
    }

    .guide-content h3 {
    margin: 0 0 16px 0;
    color: #2c3e50;
    font-size: 18px;
    }

    .position-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
    }

    .position-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px;
    background: #f8f9fa;
    border-radius: 8px;
    }

    .position-badge {
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    color: white;
    min-width: 60px;
    text-align: center;
    }

    .position-badge.large1 { background: #e74c3c; }
    .position-badge.large2 { background: #3498db; }
    .position-badge.large3 { background: #9b59b6; }
    .position-badge.small1 { background: #27ae60; }
    .position-badge.small2 { background: #f39c12; }

    /* Table */
    .table-section {
    padding: 20px 30px;
    }

    .table-container {
    max-width: 1200px;
    margin: 0 auto;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    border: 1px solid #e9ecef;
    overflow: hidden;
    position: relative;
    z-index: 2;
    }

    .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid #e9ecef;
    }

    .table-info {
    color: #6c757d;
    font-size: 14px;
    }

    .table-wrapper {
    overflow-x: auto;
    }

    .berita-table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
    }

    .berita-table th:nth-child(1),
    .berita-table td:nth-child(1) {
        width: 70px; 
    }

    .berita-table th:nth-child(3),
    .berita-table td:nth-child(3) {
    width: 100px; /* Kolom gambar */
    }

    .berita-table th:nth-child(4),
    .berita-table td:nth-child(4) {
    width: 100px; /* Perlebar kolom link */
    }

    .berita-table th:nth-child(5),
    .berita-table td:nth-child(5) {
    width: 80px; /* Kolom status */
    }

    .berita-table th:nth-child(6),
    .berita-table td:nth-child(6) {
    width: 120px; /* Kolom aksi */
    }

    .berita-table th,
    .berita-table td {
        padding: 16px;
        text-align: left;
        border-bottom: 1px solid #ecf0f1;
    }

    .berita-table th {
    background: #f8f9fa;
    font-weight: 600;
    color: #2c3e50;
    font-size: 14px;
    }

    .berita-table td {
    font-size: 14px;
    color: #2c3e50;
    }

    .berita-table tr:hover {
    background: #f8f9fa;
    }

    /* Berita title */
    .berita-title-cell .berita-title {
    font-weight: 600;
    line-height: 1.3;
    }

    /* Image preview */
    .image-preview {
    position: relative;
    width: 80px;
    height: 60px;
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    }

    .thumbnail-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
    }

    .preview-hint {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.7);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    opacity: 0;
    transition: opacity 0.3s;
    }

    .image-preview:hover .preview-hint {
    opacity: 1;
    }

    /* Link cell */
    .link-cell {
    max-width: 200px;
    }

    .external-link {
    color: #3498db;
    text-decoration: none;
    font-size: 12px;
    font-weight: 500;
    }

    .external-link:hover {
    text-decoration: underline;
    }

    /* Status badges */
    .status-badge {
    padding: 6px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    }

    .status-badge.published {
    background: #e8f5e8;
    color: #27ae60;
    }

    .status-badge.draft {
    background: #fff3e0;
    color: #f57c00;
    }

    /* Action buttons */
    .action-buttons {
    display: flex;
    gap: 8px;
    }

    .btn-action {
    background: none;
    border: none;
    padding: 8px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s;
    }

    .btn-action.edit:hover {
    background: #3498db;
    color: white;
    }

    .btn-action.publish:hover {
    background: #27ae60;
    color: white;
    }

    .btn-action.unpublish:hover {
    background: #f39c12;
    color: white;
    }

    .btn-action.delete:hover {
    background: #e74c3c;
    color: white;
    }

    /* Empty state */
    .empty-state {
    text-align: center;
    padding: 60px 20px;
    color: #6c757d;
    }

    .empty-icon {
    font-size: 48px;
    margin-bottom: 16px;
    }

    .empty-state h3 {
    margin: 0 0 8px 0;
    color: #2c3e50;
    }

    .empty-state p {
    margin: 0 0 20px 0;
    }

    /* Modals */
    .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    }

    .modal {
    background: white;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }

    .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    border-bottom: 1px solid #e9ecef;
    }

    .modal-header h3 {
    margin: 0;
    color: #2c3e50;
    }

    .modal-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #6c757d;
    }

    .modal-body {
    padding: 24px;
    }

    .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 24px;
    border-top: 1px solid #e9ecef;
    }

    /* Form styles */
    .form-group {
    margin-bottom: 20px;
    }

    .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #2c3e50;
    }

    .form-input,
    .form-select {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    box-sizing: border-box;
    }

    .form-input:focus,
    .form-select:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
    }

    .warning-message {
    color: #e74c3c;
    font-size: 12px;
    margin-top: 4px;
    font-weight: 500;
    }

    .image-preview-small {
    margin-top: 8px;
    width: 100px;
    height: 75px;
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid #ddd;
    }

    .image-preview-small img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    }

    /* Responsive */
    @media (max-width: 768px) {
    .page-header {
        padding: 20px;
    }
    
    .header-content {
        flex-direction: column;
        gap: 16px;
        align-items: flex-start;
    }
    
    .position-guide {
        padding: 20px;
    }
    
    .position-grid {
        grid-template-columns: 1fr;
    }
    
    .table-section {
        padding: 20px;
    }
    
    .berita-table {
        font-size: 12px;
    }
    
    .berita-table th,
    .berita-table td {
        padding: 12px 8px;
    }
    
    .action-buttons {
        flex-direction: column;
        gap: 4px;
    }
    
    .modal {
        width: 95%;
        margin: 20px;
    }
    }

    @media (max-width: 480px) {
    .header-text h1 {
        font-size: 24px;
    }
    }
</style>