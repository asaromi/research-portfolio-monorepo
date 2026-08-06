<script setup>
import { useAlert } from '../../composable/useAlert'

const { alerts, removeAlert } = useAlert()
</script>

<template>
  <span class="hidden alert alert-success alert-error alert-warning alert-info text-white btn-success btn-error btn-warning btn-info"/>
  <div class="toast toast-bottom toast-center z-50">
    <TransitionGroup name="list">
      <div
          v-for="alert in alerts"
          :key="alert.id"
          :class="['text-white alert', `alert-${alert.type}`]"
          role="alert"
      >
        <span>{{ alert.message }}</span>

        <button
            :class="['btn btn-sm border-0 focus:outline-none', `btn-${alert.type}`]"
            @click="removeAlert(alert.id)"
            aria-label="Close Alert"
        >
          ✕
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list-enter-active, .list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>