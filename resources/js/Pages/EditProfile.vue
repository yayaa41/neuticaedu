<template>
    <div class="edit-container">
        <div class="edit-card">

        <h1 class="title">Edit Profil</h1>

        <!-- JOIN DATE (Readonly) -->
        <p class="join-date">Bergabung sejak: {{ form.joined }}</p>

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

        <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

        <!-- BUTTONS -->
        <div class="form-actions">
            <button class="btn-save" @click="saveChanges">Simpan</button>
            <button class="btn-cancel" @click="goBack">Batal</button>
        </div>

        </div>
    </div>
    </template>




            <script>
    export default {
    data() {
        return {
        form: {
            name: "",
            email: "",
            username: "",
            joined: "20 November 2025",
        },
        errorMessage: "",
        };
    },

    methods: {
        saveChanges() {
        if (!this.form.name || !this.form.email || !this.form.username) {
            this.errorMessage = "Semua field wajib diisi!";
            return;
        }

        this.errorMessage = "";

        // Simpan ke backend di sini nanti
        this.$router.push("/profile");
        },

        goBack() {
        this.$router.push("/profile");
        },
    },
    };
    </script>


        <style scoped>
        .edit-container {
    display: flex;
    justify-content: center;
    padding: 40px 20px;
    }

    .edit-card {
    width: 100%;
    max-width: 450px;
    background: #f3f7ff;
    padding: 30px;
    border-radius: 22px;
    box-shadow: 8px 8px 20px #d5dbea, -8px -8px 20px #ffffff;
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

    .form-group {
    margin-bottom: 18px;
    display: flex;
    flex-direction: column;
    }

    .form-group label {
    font-size: 0.95rem;
    font-weight: 600;
    color: #003c75;
    margin-bottom: 6px;
    }

    .form-group input {
    padding: 12px;
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

    .form-actions {
    margin-top: 25px;
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

    .btn-save:hover {
    background: #003f7a;
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

    .btn-cancel:hover {
        background: #c9d9ef;
    }

    .error-text {
        color: #d9534f;
        text-align: center;
        margin-top: 10px;
        font-weight: 600;
    }

</style>