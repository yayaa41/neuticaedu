<template>
    <div class="edit-container">
        <div class="edit-card">

        <h1 class="title">Edit Profil</h1>

        <!-- JOIN DATE (Readonly) -->
        <p class="join-date">Bergabung sejak: {{ form.joined }}</p>

        <!-- PROFILE PICTURE UPLOAD -->
        <div class="form-group profile-picture-section">
            <label>Foto Profil</label>
            <div class="profile-picture-container">
                <div class="avatar-preview" @click="triggerFileInput">
                    <img v-if="form.avatar" :src="form.avatar" alt="Profile" class="avatar-image" />
                    <div v-else class="avatar-placeholder">
                        {{ form.name ? form.name.charAt(0).toUpperCase() : 'U' }}
                    </div>
                    <div class="upload-overlay">
                        <span>✎</span>
                    </div>
                </div>
                <input 
                    type="file" 
                    ref="fileInput"
                    @change="handleImageUpload" 
                    accept="image/*"
                    class="file-input"
                />
            </div>
            <p class="upload-hint">Klik foto untuk mengubah</p>
        </div>

        <!-- FORM -->
        <div class="form-group">
            <label>Nama Lengkap</label>
            <input type="text" v-model="form.name" />
        </div>

        <div class="form-group">
            <label>Email</label>
            <input type="email" v-model="form.email" />
        </div>

        <div class="form-group">
            <label>Username</label>
            <input type="text" v-model="form.username" />
        </div>

        <div class="form-group">
            <label>Bio</label>
            <textarea 
                v-model="form.bio" 
                placeholder="Ceritakan sedikit tentang diri Anda..."
                maxlength="150"
                class="bio-textarea"
            ></textarea>
            <div class="char-count">{{ form.bio.length }}/150</div>
        </div>

        <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success-text">{{ successMessage }}</p>

        <!-- BUTTONS -->
        <div class="form-actions">
            <button class="btn-save" @click="saveChanges" :disabled="isLoading">
                {{ isLoading ? 'Menyimpan...' : 'Simpan' }}
            </button>
            <button class="btn-cancel" @click="goBack" :disabled="isLoading">Batal</button>
        </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'EditProfile',
    data() {
        return {
        form: {
            name: "",
            email: "",
            username: "",
            bio: "",
            avatar: "",
            joined: ""
        },
        errorMessage: "",
        successMessage: "",
        isLoading: false,
        originalData: {}
        };
    },

    mounted() {
        this.loadUserData();
    },

    methods: {
        loadUserData() {
            // Load data dari localStorage
            const savedUserData = localStorage.getItem('userData');
            
            if (savedUserData) {
                const userData = JSON.parse(savedUserData);
                this.form = {
                    name: userData.name || "",
                    email: userData.email || "",
                    username: userData.username || userData.name || "",
                    bio: userData.bio || "",
                    avatar: userData.avatar || "",
                    joined: userData.joinDate || new Date().toLocaleDateString('id-ID')
                };
                
                // Simpan data original untuk compare
                this.originalData = { ...this.form };
            } else {
                this.$router.push('/login');
            }
        },

        triggerFileInput() {
            this.$refs.fileInput.click();
        },

        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                // Validasi file type
                if (!file.type.startsWith('image/')) {
                    this.errorMessage = 'Harap pilih file gambar yang valid';
                    return;
                }

                // Validasi file size (max 2MB)
                if (file.size > 2 * 1024 * 1024) {
                    this.errorMessage = 'Ukuran file maksimal 2MB';
                    return;
                }

                const reader = new FileReader();
                reader.onload = (e) => {
                    this.form.avatar = e.target.result;
                    this.errorMessage = "";
                };
                reader.readAsDataURL(file);
            }
        },

        async saveChanges() {
            // Validasi
            if (!this.form.name || !this.form.email || !this.form.username) {
                this.errorMessage = "Nama, email, dan username wajib diisi!";
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.form.email)) {
                this.errorMessage = "Format email tidak valid!";
                return;
            }

            this.isLoading = true;
            this.errorMessage = "";
            this.successMessage = "";

            try {
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Update user data di localStorage
                const updatedUserData = {
                    name: this.form.name,
                    email: this.form.email,
                    username: this.form.username,
                    bio: this.form.bio,
                    avatar: this.form.avatar,
                    joinDate: this.form.joined,
                    role: JSON.parse(localStorage.getItem('userData')).role // Preserve role
                };

                localStorage.setItem('userData', JSON.stringify(updatedUserData));

                this.successMessage = "Profil berhasil diperbarui!";
                
                // Redirect setelah 1 detik
                setTimeout(() => {
                    this.$router.push('/profile');
                }, 1000);

            } catch (error) {
                this.errorMessage = "Terjadi kesalahan saat menyimpan data";
                console.error('Save error:', error);
            } finally {
                this.isLoading = false;
            }
        },

        goBack() {
            this.$router.push("/profile");
        },

        hasChanges() {
            return JSON.stringify(this.form) !== JSON.stringify(this.originalData);
        }
    },

    watch: {
        // Optional: Bisa dipakai untuk confirm sebelum leave kalau ada perubahan
        // '$route'(to, from) {
        //     if (this.hasChanges()) {
        //         const answer = window.confirm('Anda memiliki perubahan yang belum disimpan. Yakin ingin keluar?');
        //         if (!answer) return false;
        //     }
        // }
    }
};
</script>

<style scoped>
.edit-container {
    display: flex;
    justify-content: center;
    padding: 80px 20px;
    min-height: 100vh;
    background: linear-gradient(135deg, #a5c9f6 0%, #0a45c5 100%);
}

.edit-card {
    width: 100%;
    max-width: 500px;
    background: #f3f7ff;
    padding: 35px;
    border-radius: 22px;
    box-shadow: 8px 8px 20px rgba(0, 0, 0, 0.1), -8px -8px 20px #ffffff;
    height: fit-content;
    position: relative;
    z-index: 2;
}

.title {
    text-align: center;
    font-size: 1.7rem;
    font-weight: 700;
    color: #004b8f;
    margin-bottom: 15px;
    font-family: "Karla", sans-serif;
}

.join-date {
    text-align: center;
    font-size: 0.9rem;
    font-weight: 600;
    color: #0056a3;
    opacity: 0.75;
    margin-bottom: 25px;
}

/* Profile Picture Styles */
.profile-picture-section {
    text-align: center;
}

.profile-picture-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.avatar-preview {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: linear-gradient(135deg, #dcecff, #bfe0ff);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
}

.avatar-preview:hover {
    transform: scale(1.05);
}

.avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
}

.avatar-placeholder {
    font-size: 2rem;
    font-weight: bold;
    color: #004b8f;
}

.upload-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 75, 143, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 50%;
}

.avatar-preview:hover .upload-overlay {
    opacity: 1;
}

.upload-overlay span {
    color: white;
    font-size: 1.5rem;
}

.file-input {
    display: none;
}

.upload-hint {
    font-size: 0.8rem;
    color: #666;
    margin: 5px 0 0 0;
}

/* Form Styles */
.form-group {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
}

.form-group label {
    font-size: 0.95rem;
    font-weight: 600;
    color: #003c75;
    margin-bottom: 8px;
}

.form-group input {
    padding: 12px 15px;
    background: #e9f1ff;
    border: none;
    border-radius: 12px;
    font-size: 0.95rem;
    box-shadow: inset 4px 4px 10px #cfd8ea, inset -4px -4px 10px #ffffff;
    outline: none;
    transition: 0.3s ease;
}

.form-group input:focus {
    box-shadow: inset 3px 3px 10px #c2cce0, inset -3px -3px 10px #ffffff;
}

.bio-textarea {
    padding: 12px 15px;
    background: #e9f1ff;
    border: none;
    border-radius: 12px;
    font-size: 0.95rem;
    box-shadow: inset 4px 4px 10px #cfd8ea, inset -4px -4px 10px #ffffff;
    outline: none;
    transition: 0.3s ease;
    resize: vertical;
    min-height: 80px;
    font-family: inherit;
}

.bio-textarea:focus {
    box-shadow: inset 3px 3px 10px #c2cce0, inset -3px -3px 10px #ffffff;
}

.char-count {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 5px;
}

.form-actions {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    gap: 12px;
}

.btn-save {
    flex: 1;
    background: #0056a3;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: 0.25s;
}

.btn-save:hover:not(:disabled) {
    background: #003f7a;
}

.btn-save:disabled {
    background: #ccc;
    cursor: not-allowed;
}

.btn-cancel {
    flex: 1;
    background: #dce7f8;
    color: #003f7a;
    padding: 12px;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: 0.25s;
}

.btn-cancel:hover:not(:disabled) {
    background: #c9d9ef;
}

.btn-cancel:disabled {
    background: #e0e0e0;
    cursor: not-allowed;
}

.error-text {
    color: #d9534f;
    text-align: center;
    margin-top: 10px;
    font-weight: 600;
}

.success-text {
    color: #28a745;
    text-align: center;
    margin-top: 10px;
    font-weight: 600;
}

/* Responsive Design */
@media (max-width: 600px) {
    .edit-container {
        padding: 20px 15px;
    }
    
    .edit-card {
        padding: 25px 20px;
    }
    
    .form-actions {
        flex-direction: column;
    }
    
    .avatar-preview {
        width: 80px;
        height: 80px;
    }
    
    .avatar-placeholder {
        font-size: 1.5rem;
    }
}
</style>