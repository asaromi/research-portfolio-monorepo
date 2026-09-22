<script>
import MaintenanceComponent from '../components/Maintenance.vue'
import { getReviews } from '../../api/review.js'
import { useAlert } from '../../composable/useAlert.js'
import AppHeader from '../components/Header.vue';
import AppFooter from '../components/Footer.vue';
import Tool from './components/Tool.vue';
import Hero from './components/Hero.vue';
import Testimonial from './components/Testimonial.vue';
import Experience from './components/Experience.vue';
import Project from './components/Project.vue';
import Contact from './components/Contact.vue';
const { showAlert } = useAlert()

export default {
  name: 'HomePage',
  components: {
    MaintenanceComponent,
    AppHeader,
    Hero,
    AppFooter,
    Tool,
    Testimonial,
    Experience,
    Project,
    Contact
  },
  data: () => ({
    APP_MODE: import.meta.env.VITE_APP_MODE ?? 'development',
    API_URL: import.meta.env.VITE_API_URL ?? 'https://api.asaromi.workers.dev',
  }),
  computed: {
    isMaintenanceMode() {
      return this.APP_MODE === 'maintenance'
    },
  },
  mounted: () => {
    console.log('APP_MODE:', this.APP_MODE)
    console.log('isMaintenanceMode:', this.isMaintenanceMode)
    console.log('API_URL:', this.API_URL)

    getReviews()
        .then(() => showAlert('Reviews loaded successfully!', 'success'))
        .catch(error => showAlert('Failed to load reviews: ' + error.message, 'error'))
  }
}
</script>

<template>
  <main v-if="isMaintenanceMode">
    <maintenance-component />
  </main>

  <main v-else>
    <app-header />

    <hero />
    <tool />
    <experience />
    <testimonial />
    <project />
    <contact />

    <app-footer />
  </main>
</template>