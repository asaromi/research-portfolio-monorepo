<script setup>
import Maintenance from './pages/maintenance.vue'

const APP_MODE = import.meta.env.MODE ?? 'maintenance'
</script>

<template>
  <maintenance v-if="APP_MODE === 'maintenance'"/>
  <router-view v-else/>
</template>

<style>
</style>
