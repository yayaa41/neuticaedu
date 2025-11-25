import { createRouter, createWebHistory } from 'vue-router'

import { provide } from 'vue'
import Login from '@/Pages/Login.vue'
import AdminLayout from '@/components/AdminLayout.vue'
import AdminDashboard from '@/Pages/admin/Dashboard.vue'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../Pages/Home.vue')  // ✅ Path yang benar
  },
  {
    path: '/course',
    name: 'Course',
    component: () => import('../Pages/Course.vue')  // ✅ Path yang benar
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import('../Pages/Community.vue')  // ✅ Path yang benar
  },
  {
    path: '/aboutus',
    name: 'AboutUs',
    component: () => import('../Pages/AboutUs.vue')  // ✅ Path yang benar
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('../Pages/Login.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../Pages/Profile.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../Pages/Register.vue')
  },

  {
    path: '/course/1',
    name: 'Course1',
    component: ()=> import('../Pages/Course1.vue')
  },
  {
    path: '/course/2',
    name: 'Course2',
    component: ()=> import('../Pages/Course2.vue')
  },
  {
    path: '/course/3',
    name: 'Course3',
    component: ()=> import('../Pages/Course3.vue')
  },
  {
    path: '/course/4',
    name: 'Course4',
    component: ()=> import('../Pages/Course4.vue')
  },

  {
    path: '/quiz',
    name: 'Quiz',
    component: ()=> import('../Pages/Quiz.vue')
  },

  {
    path: '/edit-profile',
    name: 'EditProfile',
    component: () => import('../Pages/EditProfile.vue')
  },

  {
    path: '/admin',
    component: () => import('../components/AdminLayout.vue'),
    meta: { requiresAdmin: true },
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('../Pages/admin/Dashboard.vue')
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('../Pages/admin/Users.vue')
      },
      {
        path: 'berita',
        name: 'AdminBerita',
        component: () => import('../Pages/admin/Berita.vue')
      },
      {
        path: 'komunitas',
        name: 'AdminKomunitas',
        component: () => import('../Pages/admin/Komunitas.vue')
      },
      {
        path: 'volunteer',
        name: 'AdminVolunteer',
        component: () => import('../Pages/admin/Volunteer.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
    scrollBehavior(to, from, savedPosition) {
    // Scroll ke atas dengan smooth behavior
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ top: 0, behavior: 'smooth' })
      }, 100)
    })
  }
})

router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const userData = localStorage.getItem('userData')

    console.log('Navigation to:', to.path)
    console.log('Is logged in:', isLoggedIn)
    console.log('User data:', userData)

    if (to.meta.requiresAdmin) {
    if (!isLoggedIn) {
      console.log('Not logged in, redirecting to login')
      return next('/login')
    }
    
    try {
      const user = JSON.parse(userData)
      if (user.role !== 'admin') {
        console.log('Not admin, redirecting to home')
        return next('/')
      }
    } catch (e) {
      console.log('Error parsing user data, redirecting to login')
      return next('/login')
    }
  }

  next()
})

export default router