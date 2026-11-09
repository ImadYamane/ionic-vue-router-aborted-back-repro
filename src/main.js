import { IonicVue } from '@ionic/vue'
import { createRouter, createWebHistory } from '@ionic/vue-router'
import { createApp } from 'vue'
import '@ionic/vue/css/core.css'
import App from './App.vue'
import HomePage from './HomePage.vue'
import FormPage from './FormPage.vue'
import DonePage from './DonePage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomePage },
    { path: '/form', component: FormPage },
    { path: '/done', component: DonePage },
  ],
})

createApp(App).use(IonicVue).use(router).mount('#app')
