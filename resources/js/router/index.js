import { createRouter, createWebHistory } from 'vue-router'

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
    path: '/edit-profile',
    name: 'EditProfile',
    component: () => import('../Pages/EditProfile.vue')
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router