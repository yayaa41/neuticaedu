<template>
    <div class="profile-page">

        <!-- MAIN CONTAINER -->
        <main class="container">

            <!-- PROFILE CARD -->
            <section class="card profile-card animate-on-scroll">
                <div class="profile-left">
                    <div class="avatar" aria-hidden="true"></div>
                    <div class="profile-meta">
                        <h2 class="username">{{ user.name }} <small class="edit" @click="goEditProfile">✎</small></h2>
                        <p class="email">{{ user.email }}</p>
                        <div class="member-badge">⭐ Member sejak {{ user.joined }}</div>
                    </div>
                </div>
                <div class="profile-actions">
                    <button class="btn logout" @click="logout">Logout</button>
                </div>
            </section>

            <!-- STATISTICS -->
            <section class="card stats-card animate-on-scroll">
                <h3>Statistik Aktivitas</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-value">{{ stats.courses }}</div>
                        <div class="stat-label">Course Selesai</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">{{ stats.posts }}</div>
                        <div class="stat-label">Post Community</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">{{ stats.hours }}</div>
                        <div class="stat-label">Volunteer Hours</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">{{ stats.achievements }}</div>
                        <div class="stat-label">Pencapaian</div>
                    </div>
                </div>
            </section>

            <!-- QUICK ACTIONS -->
            <section class="card actions-card animate-on-scroll">
                <h3>Aksi Cepat</h3>
                <div class="actions-row">
                    <router-link class="action-btn" to="/course">Lanjutkan Course</router-link>
                    <router-link class="action-btn" to="/community">Komunitas</router-link>
                    <router-link class= "action-btn" to="/aboutus">Tentang Kami</router-link>
                </div>
            </section>

            <!-- PROGRESS & BADGES -->
            <section class="card progress-badges animate-on-scroll">
                <div class="progress-area">
                    <h3>Progress Course</h3>
                    <div v-for="c in progress" :key="c.id" class="progress-row">
                        <div class="progress-title">{{ c.title }}</div>
                            <div class="progress-bar" role="progressbar" :aria-valuenow="c.percent" aria-valuemin="0" aria-valuemax="100">
                                <div class="progress-fill" :style="{ width: c.percent + '%' }"></div>
                            </div>
                        <div class="progress-percent">{{ c.percent }}%</div>
                    </div>
                </div>

                <div class="badges-area">
                    <h3>Pencapaian</h3>
                    <div class="badges-row">
                        <div v-for="b in badges" :key="b.id" class="badge-item">🏅<span>{{ b.name }}</span></div>
                    </div>
                </div>
            </section>

            <!-- ACTIVITY LOG -->
            <section class="card activity-card animate-on-scroll">
                <h3>Aktivitas Terbaru</h3>
                <div class="activity-list">
                    <div v-for="a in activity" :key="a.id" class="activity-item">
                        <div class="activity-text">{{ a.text }}</div>
                        <div class="activity-time">{{ a.time }}</div>
                    </div>
                </div>
            </section>

        </main>
    </div>
</template>

<script>
    export default {
    name: 'ProfilePage',
    data() {
        return {
        user: { name: 'tiaraa', email: 'tiaraa@gmail.com', joined: '20/11/2025' },
        stats: { courses: 3, posts: 8, hours: '12h', achievements: 5 },
        progress: [
            { id: 1, title: 'Pengenalan Ekosistem Laut', percent: 100 },
            { id: 2, title: 'Konservasi Terumbu Karang', percent: 45 },
            { id: 3, title: 'Dampak Pencemaran Laut', percent: 20 }
        ],
        badges: [ { id: 1, name: 'Pemula Laut' }, { id: 2, name: 'Penjelajah' }, { id: 3, name: 'Penjaga Laut' } ],
        activity: [
            { id: 1, text: "Menyelesaikan modul 'Pengenalan Ekosistem Laut'", time: '2 jam lalu' },
            { id: 2, text: "Berkomentar di diskusi 'Cara Menjaga Terumbu Karang'", time: '1 hari lalu' }
        ]
        }
    },
    mounted() {
        this.initScrollAnimations()
    },
    methods: {
        logout() {
        // placeholder logout
        console.log('logout clicked')
        // perform actual logout (clear token/localStorage, redirect)
        this.$router.push('/login')
        },
        initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible')
                observer.unobserve(entry.target)
            }
            })
        }, { threshold: 0.12 })

        document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el))
        },
    
        goEditProfile() {
            this.$router.push('/edit-profile')
        }
    },
    }
</script>

<style scoped>
    /* Background uses uploaded image path */
    .profile-page {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background-image: url('/mnt/data/4ea49617-3844-4261-8153-3c5d33e8553b.png');
        background-size: cover;
        background-position: center;
        padding-bottom: 40px;
    }

    /* CONTAINER */
    .container {
        padding-top: 50px;
        max-width: 1100px;
        margin: 24px auto;
        width: calc(100% - 40px);
        display: grid;
        grid-template-columns: 1fr;
        gap: 18px;
        z-index: 2;
    }
    
    .card {
        background: rgba(255,255,255,0.95);
        border-radius: 12px;
        padding: 18px;
        box-shadow: 0 6px 20px rgba(11,91,168,0.06);
    }

    /* PROFILE */
    .profile-card {
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:12px
    }
    
    .profile-left {
        display:flex;
        align-items:center;
        gap:14px
    }
    
    .avatar {
        width:84px;
        height:84px;
        border-radius:50%;
        background: linear-gradient(135deg,#dcecff,#bfe0ff);
        box-shadow:0 6px 12px rgba(0,0,0,0.08)
    }
    
    .username {
        font-size:20px;
        margin:0
    }
    
    .username .edit{
        font-size:12px;
        color:#0060C0;
        margin-left:6px
    }

    .email {
        margin:6px 0 0 0;
        color:#41627a
    }
    
    .member-badge {
        display:inline-block;
        margin-top:8px;
        padding:6px 10px;
        background:#eaf5ff;
        color:#0b5ba8;
        border-radius:999px;
        font-weight:600;
        font-size:13px
    }
    
    .profile-actions .btn.logout {
        background:#ff5c3b;
        color:#fff;
        border:none;
        padding:10px 14px;
        border-radius:8px;
        cursor:pointer
    }

    .edit {
        cursor: pointer;
        margin-left: 6px;
        padding: 4px;
        font-size: 14px;
        color: #0060c0;
        transition: 0.2s;
    }

    .edit:hover {
        color: #003f83;
        transform: scale(1.1);
    }


    /* STATS */
    .stats-grid {
        display:grid;
        grid-template-columns: repeat(4,1fr);
        gap:12px;
        margin-top:12px
    }
    
    .stat-item {
        background:#f3fbff;
        padding:14px;
        border-radius:10px;
        text-align:center
    }
    
    .stat-value {
        font-size:20px;
        color:#0056a3;
        font-weight:700
    }
    
    .stat-label {
        color:#4b6b80;
        margin-top:6px
    }

    /* ACTIONS */
    .actions-row {
        display:flex;
        gap:12px
    }
    
    .action-btn {
        flex:1;
        display:inline-flex;
        align-items:center;
        justify-content:center;
        padding:12px 8px;
        background:#eef5ff;
        border-radius:10px;
        text-decoration:none;
        color:#084a86;
        font-weight:700
    }

    /* PROGRESS & BADGES */
    .progress-badges {
        display:grid;
        grid-template-columns: 1fr 300px;
        gap:18px;
        align-items:start
    }
    
    .progress-row {
        margin-bottom:12px
    }
    
    .progress-title {
        font-weight:600
    }
    
    .progress-bar {
        width:100%;
        height:12px;
        background:#e6f0ff;
        border-radius:999px;
        overflow:hidden;
        margin-top:6px
    }
    
    .progress-fill {
        height:100%;
        background: linear-gradient(90deg,#0b5ba8,#3ba0ff);
        border-radius:999px;
        transition: width 800ms
        cubic-bezier(.2,.9,.2,1)
    }
    
    .progress-percent {
        font-size:13px;
        color:#4b6b80;
        margin-top:6px
    }
    
    .badges-row {
        display:flex;
        gap:10px;
        flex-wrap:wrap
    }
    .badge-item {
        background:#f0f8ff;
        padding:8px 12px;
        border-radius:10px;
        font-weight:600;
        display:flex;
        gap:8px;
        align-items:center
    }

    /* ACTIVITY */
    .activity-list {
        display:flex;
        flex-direction:column;
        gap:10px
    }
    
    .activity-item {
        background:#eaf5ff;
        padding:12px;
        border-radius:10px
    }
    
    .activity-time {
        color:#5b7690;
        font-size:13px;
        margin-top:6px
    }

    /* ================== Responsive Breakpoints ================== */
    @media (max-width: 900px) {
    .stats-grid { grid-template-columns: repeat(2,1fr) }
    .progress-badges { grid-template-columns: 1fr }
    .nav-links a { margin-left:12px; font-size:14px }
    }

    @media (max-width: 600px) {
    .nav-inner { padding:10px }
    .brand { font-size:20px }
    .container { width: calc(100% - 28px); margin: 12px auto }
    .profile-card { flex-direction:column; align-items:flex-start }
    .profile-actions { width:100%; display:flex; justify-content:flex-end; margin-top:8px }
    .stats-grid { grid-template-columns: repeat(2,1fr) }
    .actions-row { flex-direction:column }
    .action-btn { width:100% }
    .stat-value { font-size:18px }
    }

    /* ================== Scroll Animation ================== */
    .animate-on-scroll { opacity:0; transform: translateY(18px); transition: all 700ms cubic-bezier(.2,.9,.2,1); will-change: transform, opacity }
    .animate-on-scroll.is-visible { opacity:1; transform: translateY(0) }

    /* small accessibility tweak for reduced-motion */
    @media (prefers-reduced-motion: reduce) {
    .animate-on-scroll { transition: none !important; transform: none !important; opacity: 1 !important }
    }
</style>
