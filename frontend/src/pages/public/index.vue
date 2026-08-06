<script>
import MaintenanceComponent from '../components/Maintenance.vue'
import { getReviews } from '../../api/review.js'
import { useAlert } from '../../composable/useAlert.js'
const { showAlert } = useAlert()

export default {
  name: 'HomePage',
  components: { MaintenanceComponent },
  data: () => ({
    APP_MODE: import.meta.env.VITE_APP_MODE ?? 'development'
  }),
  computed: {
    isMaintenanceMode() {
      return this.APP_MODE === 'maintenance'
    },
  },
  mounted() {
    console.log('APP_MODE:', this.APP_MODE)
    console.log('isMaintenanceMode:', this.isMaintenanceMode)

    getReviews()
        .then(() => showAlert('Reviews loaded successfully!', 'success'))
        .catch(error => showAlert('Failed to load reviews: ' + error.message, 'error'))
  }
}
</script>

<template>
<!--  <maintenance />-->
  <main v-if="isMaintenanceMode">
    <maintenance-component />
  </main>

  <main v-else>
    <h1>This is Home Page</h1>
  </main>
</template>