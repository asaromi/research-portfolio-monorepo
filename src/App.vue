<script setup>
import Maintenance from './pages/maintenance.vue'

const APP_MODE = import.meta.env.APP_MODE ?? 'maintenance'
</script>

<template>
  <div v-if="APP_MODE === 'maintenance'">
    <maintenance />
  </div>
  <router-view v-else />
</template>

<style>
</style>
