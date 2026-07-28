<script setup>
</script>

<template>
  <div class="min-h-screen bg-base-200 flex items-center justify-center p-4">
    <div class="max-w-md w-full text-center space-y-8 bg-base-100 p-10 rounded-3xl shadow-md">
      <div class="flex justify-center">
        <div class="p-4 bg-primary/10 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
      </div>
      
      <div class="space-y-4">
        <h1 class="text-4xl font-heading font-bold text-primary">System Maintenance</h1>
        <p class="text-neutral">
          We're currently performing some scheduled maintenance to improve our services. We'll be back online shortly.
        </p>
      </div>

      <div class="pt-4">
        <div class="flex items-center justify-center gap-2 text-sm font-medium text-neutral/70">
          <span class="relative flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
          </span>
          Estimated completion: 24 hours
        </div>
      </div>

      <div class="pt-6">
        <button class="btn btn-primary bg-primary w-full" onclick="window.location.reload()">
          Check Status
        </button>
      </div>
    </div>
  </div>
</template>