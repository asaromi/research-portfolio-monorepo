<script lang="js">
export default {
  name: 'Hero',
  data: () => ({
    message: 'Hello from Hero component!',
  }),
}
</script>

<template>
  <section class="hero h-full bg-white mt-8 py-24">
    <div class="hero-content text-center px-6 space-y-8 flex flex-col items-center text-lg">
      <div class="w-fit flex items-center justify-center gap-2 py-1 px-3 rounded-full bg-accent/30">
        <p class="text-sm font-medium text-accent-content">
          <span class="relative inline-flex rounded-full h-3 w-3 bg-accent-content"></span>
          AVAILABLE FOR NEW PROJECTS
        </p>
      </div>

      <h1 class="text-5xl font-bold">I build high-performance web experiences with <span class="text-accent-content">precision</span>
        and craft.</h1>
      <p class="py-6">
        A Full-stack Developer specializing in architecting scalable, user-centric interfaces for modern enterprise
        applications.
      </p>

      <div class="flex gap-4">
        <button class="btn btn-primary rounded-lg">
          <router-link to="/review">View Resume</router-link>
        </button>

        <button class="btn btn-outline btn-primary rounded-lg">
          <router-link to="/contact">Contact Me</router-link>
        </button>
      </div>
    </div>
  </section>
</template>