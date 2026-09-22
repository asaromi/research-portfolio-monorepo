<script lang="js">
export default {
  name: 'Experience',
  data: () => ({
    experiences: [
      {
        company: 'Tech Corp',
        role: 'Senior Frontend Developer',
        period: 'Jan 2023 – Present',
        description: 'Led the development of scalable Vue 3 applications, improved performance by 40%, and mentored junior engineers.',
        tags: ['Vue 3', 'TypeScri pt', 'Tailwind CSS'],
      },
      {
        company: 'Startup Hub',
        role: 'Full-stack Developer',
        period: 'Mar 2021 – Dec 2022',
        description: 'Built RESTful APIs with Node.js and designed responsive UIs consumed by 10k+ monthly users.',
        tags: ['Node.js', 'Vue 2', 'PostgreSQL'],
      },
      {
        company: 'Creative Agency',
        role: 'Frontend Developer',
        period: 'Jun 2019 – Feb 2021',
        description: 'Delivered pixel-perfect interfaces from Figma designs and collaborated closely with UX/UI teams.',
        tags: ['HTML', 'SCSS', 'JavaScript'],
      },
    ],
  }),
}
</script>

<template>
  <section class="experience bg-white py-20 px-4">
    <div class="max-w-3xl mx-auto space-y-10">
      <div class="text-center space-y-2">
        <p class="text-sm font-medium text-primary uppercase tracking-widest">Career</p>
        <h2 class="text-3xl font-bold">Work Experience</h2>
        <p class="text-base-content/60">A timeline of the roles that shaped my expertise.</p>
      </div>

      <ol class="relative border-s border-base-300 space-y-10 ms-4">
        <li v-for="(exp, index) in experiences" :key="index" class="ms-6">
          <span
            class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-8 ring-white"
            >
            <svg class="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-7 9a7 7 0 1 1 14 0H3z" />
            </svg>
          </span>

          <div class="card bg-base-100 shadow-sm border border-base-200 p-5 space-y-2">
            <div class="flex items-start justify-between flex-wrap gap-2">
              <div>
                <h3 class="text-base font-semibold">{{ exp.role }}</h3>
                <p class="text-sm text-primary font-medium">{{ exp.company }}</p>
              </div>
              <span class="badge badge-ghost badge-sm">{{ exp.period }}</span>
            </div>

            <p class="text-sm text-base-content/70">{{ exp.description }}</p>

            <div class="flex flex-wrap gap-2 pt-1">
              <span v-for="tag in exp.tags" :key="tag" class="badge badge-primary badge-outline badge-sm">
                {{ tag }}
              </span>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>