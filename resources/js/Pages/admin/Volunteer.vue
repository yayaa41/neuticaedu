<template>
    <div class="admin-volunteer">
        <!-- Header -->
        <div class="page-header">
        <div class="header-content">
            <div class="header-text">
            <h1>🤝 Management Volunteer</h1>
            <p>Kelola kegiatan volunteer yang akan ditampilkan di halaman community</p>
            <div class="page-notice">
                💡 Volunteer yang dipublish akan otomatis muncul di halaman community
            </div>
            </div>
            <div class="header-actions">
            <button @click="showAddVolunteer = true" class="btn-primary">
                ➕ Tambah Volunteer
            </button>
            </div>
        </div>
        </div>

        <!-- Volunteer Table -->
        <div class="table-section">
        <div class="table-container">
            <div class="table-header">
            <div class="table-info">
                Total {{ volunteer.length }} kegiatan volunteer
            </div>
            </div>

            <div class="table-wrapper">
            <table class="volunteer-table">
                <thead>
                <tr>
                    <th class="col-gambar">Gambar</th>
                    <th class="col-nama">Nama Kegiatan</th>
                    <th class="col-penyelenggara">Penyelenggara</th>
                    <th class="col-link">Link Pendaftaran</th>
                    <th class="col-status">Status</th>
                    <th class="col-aksi">Aksi</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in volunteer" :key="item.id">
                    <td>
                    <div class="image-preview" @click="showImagePreview(item.image)">
                        <img :src="item.image" :alt="item.nama" class="thumbnail-preview">
                        <span class="preview-hint">👁️ Preview</span>
                    </div>
                    </td>
                    <td>
                    <div class="volunteer-title-cell">
                        <div class="volunteer-nama">{{ item.nama }}</div>
                    </div>
                    </td>
                    <td>
                    <div class="penyelenggara-cell">
                        {{ item.penyelenggara }}
                    </div>
                    </td>
                    <td>
                    <div class="link-cell">
                        <a :href="item.link" target="_blank" class="external-link" @click.stop>
                        🔗 Buka Link
                        </a>
                        <div class="link-url">{{ truncateUrl(item.link) }}</div>
                    </div>
                    </td>
                    <td>
                    <span class="status-badge" :class="item.status">
                        {{ item.status === 'published' ? 'Aktif' : 'Non-Aktif' }}
                    </span>
                    </td>
                    <td>
                    <div class="action-buttons">
                        <button @click="editVolunteer(item)" class="btn-action edit" title="Edit">
                        ✏️
                        </button>
                        <button 
                        @click="toggleVolunteerStatus(item)" 
                        :class="['btn-action', item.status === 'published' ? 'unpublish' : 'publish']"
                        :title="item.status === 'published' ? 'Non-Aktifkan' : 'Aktifkan'"
                        >
                        {{ item.status === 'published' ? '⏸️' : '📤' }}
                        </button>
                        <button 
                        @click="deleteVolunteer(item)" 
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
            <div v-if="volunteer.length === 0" class="empty-state">
                <div class="empty-icon">🤝</div>
                <h3>Belum ada kegiatan volunteer</h3>
                <p>Mulai dengan menambahkan kegiatan volunteer pertama</p>
                <button @click="showAddVolunteer = true" class="btn-primary">
                ➕ Tambah Volunteer Pertama
                </button>
            </div>
            </div>
        </div>
        </div>

        <!-- Add Volunteer Modal -->
        <div v-if="showAddVolunteer" class="modal-backdrop" @click="showAddVolunteer = false">
        <div class="modal" @click.stop>
            <div class="modal-header">
            <h3>➕ Tambah Volunteer</h3>
            <button @click="showAddVolunteer = false" class="modal-close">×</button>
            </div>
            <div class="modal-body">
            <div class="form-group">
                <label>Nama Kegiatan Volunteer *</label>
                <input v-model="newVolunteer.nama" type="text" class="form-input" placeholder="Masukkan nama kegiatan volunteer">
            </div>
            
            <div class="form-group">
                <label>Nama Penyelenggara *</label>
                <input v-model="newVolunteer.penyelenggara" type="text" class="form-input" placeholder="Masukkan nama penyelenggara">
            </div>
            
            <div class="form-group">
                <label>Link Pendaftaran *</label>
                <input v-model="newVolunteer.link" type="url" class="form-input" placeholder="https://example.com/daftar">
            </div>
            
            <div class="form-group">
                <label>URL Gambar Background *</label>
                <input v-model="newVolunteer.image" type="url" class="form-input" placeholder="https://example.com/image.jpg">
                <div class="image-preview-small" v-if="newVolunteer.image">
                <img :src="newVolunteer.image" alt="Preview" @error="handleImageError">
                </div>
            </div>
            </div>
            <div class="modal-footer">
            <button @click="showAddVolunteer = false" class="btn-secondary">
                Batal
            </button>
            <button @click="addVolunteer" class="btn-primary" :disabled="!isValidNewVolunteer">
                💾 Simpan Volunteer
            </button>
            </div>
        </div>
        </div>

        <!-- Edit Volunteer Modal -->
        <div v-if="editingVolunteer" class="modal-backdrop" @click="cancelEdit">
        <div class="modal" @click.stop>
            <div class="modal-header">
            <h3>✏️ Edit Volunteer</h3>
            <button @click="cancelEdit" class="modal-close">×</button>
            </div>
            <div class="modal-body">
            <div class="form-group">
                <label>Nama Kegiatan Volunteer *</label>
                <input v-model="editingVolunteer.nama" type="text" class="form-input">
            </div>
            
            <div class="form-group">
                <label>Nama Penyelenggara *</label>
                <input v-model="editingVolunteer.penyelenggara" type="text" class="form-input">
            </div>
            
            <div class="form-group">
                <label>Link Pendaftaran *</label>
                <input v-model="editingVolunteer.link" type="url" class="form-input">
            </div>
            
            <div class="form-group">
                <label>URL Gambar Background *</label>
                <input v-model="editingVolunteer.image" type="url" class="form-input">
                <div class="image-preview-small" v-if="editingVolunteer.image">
                <img :src="editingVolunteer.image" alt="Preview" @error="handleImageError">
                </div>
            </div>

            <div class="form-group">
                <label>Status</label>
                <select v-model="editingVolunteer.status" class="form-select">
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                </select>
            </div>
            </div>
            <div class="modal-footer">
            <button @click="cancelEdit" class="btn-secondary">
                Batal
            </button>
            <button @click="saveVolunteer" class="btn-primary">
                💾 Simpan Perubahan
            </button>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
    name: 'AdminVolunteer',
    setup() {
        // Data
        const volunteer = ref([])
        const showAddVolunteer = ref(false)
        const editingVolunteer = ref(null)

        // New Volunteer Form
        const newVolunteer = ref({
        nama: '',
        penyelenggara: '',
        link: '',
        image: '',
        status: 'published'
        })

        // Computed
        const isValidNewVolunteer = computed(() => {
        return newVolunteer.value.nama && 
                newVolunteer.value.penyelenggara && 
                newVolunteer.value.link && 
                newVolunteer.value.image
        })

        // Methods
        const fetchVolunteer = () => {
        // Load dari localStorage
        const savedVolunteer = localStorage.getItem('volunteerData')
        if (savedVolunteer) {
            volunteer.value = JSON.parse(savedVolunteer)
        } else {
            // Data default dari community page Anda
            volunteer.value = [
            {
                id: 1,
                nama: 'Sahabat Laut Indonesia',
                penyelenggara: 'Sahabat Laut Indonesia',
                link: 'https://www.sahabatlautindonesia.org/',
                image: '/foto/volunteer1.jpg',
                status: 'published'
            },
            {
                id: 2,
                nama: 'WWF Volunteer Program',
                penyelenggara: 'WWF Indonesia',
                link: 'https://www.wwf.id/id/id/volunteer',
                image: '/foto/volunteer2.jpg',
                status: 'published'
            },
            {
                id: 3,
                nama: 'Penerus Jaga Laut Indonesia',
                penyelenggara: 'PJLI Foundation',
                link: 'https://pjlifoundation.org/volunteer-detail',
                image: '/foto/volunteer3.jpg',
                status: 'published'
            },
            {
                id: 4,
                nama: 'Pandu Laut Nusantara',
                penyelenggara: 'Pandu Laut',
                link: 'https://www.pandulaut.org/',
                image: '/foto/volunteer4.png',
                status: 'published'
            },
            {
                id: 5,
                nama: 'Marine Buddies Campaign',
                penyelenggara: 'WWF Marine Buddies',
                link: 'https://wwf.id/id/act/campaign/marine-buddies',
                image: '/foto/volunteer5.png',
                status: 'published'
            }
            ]
            saveToLocalStorage()
        }
        }

        const saveToLocalStorage = () => {
        localStorage.setItem('volunteerData', JSON.stringify(volunteer.value))
        }

        const handleImageError = (event) => {
        event.target.style.display = 'none'
        }

        const showImagePreview = (imageUrl) => {
        window.open(imageUrl, '_blank')
        }

        const truncateUrl = (url) => {
        if (url.length > 40) {
            return url.substring(0, 37) + '...'
        }
        return url
        }

        // Volunteer actions
        const addVolunteer = () => {
        const item = {
            id: Date.now(),
            ...newVolunteer.value
        }
        volunteer.value.push(item)
        saveToLocalStorage()
        showAddVolunteer.value = false
        resetNewVolunteer()
        }

        const editVolunteer = (item) => {
        editingVolunteer.value = { ...item }
        }

        const saveVolunteer = () => {
        const index = volunteer.value.findIndex(v => v.id === editingVolunteer.value.id)
        if (index !== -1) {
            volunteer.value[index] = { ...editingVolunteer.value }
            saveToLocalStorage()
        }
        editingVolunteer.value = null
        }

        const cancelEdit = () => {
        editingVolunteer.value = null
        }

        const toggleVolunteerStatus = (item) => {
        item.status = item.status === 'published' ? 'draft' : 'published'
        saveToLocalStorage()
        }

        const deleteVolunteer = (item) => {
        if (confirm(`Hapus kegiatan volunteer "${item.nama}"?`)) {
            volunteer.value = volunteer.value.filter(v => v.id !== item.id)
            saveToLocalStorage()
        }
        }

        const resetNewVolunteer = () => {
        newVolunteer.value = {
            nama: '',
            penyelenggara: '',
            link: '',
            image: '',
            status: 'published'
        }
        }

        onMounted(() => {
        fetchVolunteer()
        })

        return {
        // Data
        volunteer,
        showAddVolunteer,
        editingVolunteer,
        
        // Forms
        newVolunteer,
        
        // Computed
        isValidNewVolunteer,
        
        // Methods
        fetchVolunteer,
        handleImageError,
        showImagePreview,
        truncateUrl,
        addVolunteer,
        editVolunteer,
        saveVolunteer,
        cancelEdit,
        toggleVolunteerStatus,
        deleteVolunteer
        }
    }
}
</script>

<style scoped>
    .admin-volunteer {
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
    }

    .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
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

    .volunteer-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    }

    /* Lebar kolom */
    .volunteer-table th:nth-child(1),
    .volunteer-table td:nth-child(1) {
    width: 120px; /* Gambar */
    }

    .volunteer-table th:nth-child(2),
    .volunteer-table td:nth-child(2) {
    width: 250px; /* Nama Kegiatan */
    }

    .volunteer-table th:nth-child(3),
    .volunteer-table td:nth-child(3) {
    width: 200px; /* Penyelenggara */
    }

    .volunteer-table th:nth-child(4),
    .volunteer-table td:nth-child(4) {
    width: 300px; /* Link */
    }

    .volunteer-table th:nth-child(5),
    .volunteer-table td:nth-child(5) {
    width: 100px; /* Status */
    }

    .volunteer-table th:nth-child(6),
    .volunteer-table td:nth-child(6) {
    width: 150px; /* Aksi */
    }

    .volunteer-table th,
    .volunteer-table td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid #ecf0f1;
    }

    .volunteer-table th {
    background: #f8f9fa;
    font-weight: 600;
    color: #2c3e50;
    font-size: 14px;
    }

    .volunteer-table td {
    font-size: 14px;
    color: #2c3e50;
    }

    .volunteer-table tr:hover {
    background: #f8f9fa;
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

    /* Text cells */
    .volunteer-title-cell .volunteer-nama {
    font-weight: 600;
    line-height: 1.3;
    word-wrap: break-word;
    }

    .penyelenggara-cell {
    font-size: 14px;
    color: #6c757d;
    }

    /* Link cell */
    .link-cell {
    max-width: 300px;
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

    .link-url {
    font-size: 11px;
    color: #6c757d;
    margin-top: 4px;
    word-break: break-all;
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
    
    .table-section {
        padding: 20px;
    }
    
    .volunteer-table {
        font-size: 12px;
    }
    
    .volunteer-table th,
    .volunteer-table td {
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