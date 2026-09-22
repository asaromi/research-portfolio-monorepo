<script lang="js">
export default {
  name: 'Project',
  data: () => ({
    projects: [
      {
        title: 'Portfolio CMS',
        description: 'A headless CMS built with Node.js and Vue 3 for managing portfolio content dynamically with real-time previews.',
        tags: ['Vue 3', 'Node.js', 'MongoDB'],
        liveUrl: '#',
        repoUrl: '#',
      },
      {
        title: 'E-Commerce Dashboard',
        description: 'A feature-rich admin dashboard with analytics, inventory management, and order tracking for an online store.',
        tags: ['Vue 2', 'Chart.js', 'Tailwind CSS'],
        liveUrl: '#',
        repoUrl: '#',
      },
      {
        title: 'Task Management App',
        description: 'A collaborative Kanban board with drag-and-drop, real-time sync, and role-based access control.',
        tags: ['Vue 3', 'Pinia', 'Supabase'],
        liveUrl: '#',
        repoUrl: '#',
      },
      {
        title: 'Real-time Chat App',
        description: 'A WebSocket-based chat application with channels, direct messages, and file sharing capabilities.',
        tags: ['Vue 3', 'Socket.io', 'Express'],
        liveUrl: '#',
        repoUrl: '#',
      },
      {
        title: 'Analytics Platform',
        description: 'A data visualization dashboard aggregating metrics from multiple sources with custom chart widgets.',
        tags: ['Vue 3', 'D3.js', 'REST API'],
        liveUrl: '#',
        repoUrl: '#',
      },
    ],
  }),
}
</script>

<template>
  <section class="project bg-base-200">
    <div class="space-y-12 py-20">
      <div class="text-center space-y-2 px-4">
        <p class="text-sm font-medium text-primary uppercase tracking-widest">Portfolio</p>
        <h2 class="text-3xl font-bold">Featured Projects</h2>
        <p class="text-base-content/60">A selection of things I've built and shipped.</p>
      </div>

      <!-- Scrollable row -->
      <div class="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 pb-4 no-scrollbar">
        <div v-for="(project, index) in projects" :key="index"
          class="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300 snap-start shrink-0 w-72">
          <div class="card-body space-y-3">
            <h3 class="card-title text-base">{{ project.title }}</h3>
            <p class="text-sm text-base-content/70 flex-1">{{ project.description }}</p>

            <div class="flex flex-wrap gap-2">
              <span v-for="tag in project.tags" :key="tag" class="badge badge-primary badge-outline badge-sm">
                {{ tag }}
              </span>
            </div>

            <div class="card-actions justify-end pt-2">
              <a :href="project.repoUrl" class="btn btn-ghost btn-xs rounded-lg">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23A11.52 11.52 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.21.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Code
              </a>
              <a :href="project.liveUrl" class="btn btn-primary btn-xs rounded-lg">Live →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>