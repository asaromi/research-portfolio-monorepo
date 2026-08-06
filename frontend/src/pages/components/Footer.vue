<script>
export default {
  name: 'AppFooter',
}
</script>

<template>
  <div class="divider m-0 h-fit"></div>
  <footer class="footer md:footer-horizontal footer-vertical bg-white p-10 text-base-footer grid-cols-1 md:grid-cols-2 reverse">
    <aside class="md:order-1 order-2">
      <p class="text-primary font-bold">DevPortfolio</p>
      <p>© 2026 Asa Romi x Stitch by Google</p>
    </aside>

    <nav class="space-y-0 md:order-2 order-1">
      <h6 class="footer-title ">Social</h6>
      <ul class="grid grid-flow-col gap-4">
        <li>
          <a
              class="py-1 hover:border-b hover:cursor-pointer w-fit"
              target="_blank"
              href="https://linkedin.com/in/asaromi"
          >
            Linkedin
          </a>
        </li>
        <li>
          <a
              class="py-1 hover:border-b hover:cursor-pointer w-fit"
              target="_blank"
              href="https://github.com/asaromi"
          >
            Github
          </a>
        </li>
        <li>
          <a
              class="py-1 hover:border-b hover:cursor-pointer w-fit"
              target="_blank"
              href="mailto:asaromi.ofc@gmail.com"
          >
            Email
          </a>
        </li>
        <li>
          <a
              class="py-1 hover:border-b hover:cursor-pointer w-fit"
              target="_blank"
              href=""
          >
            Resume
          </a>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<style scoped>

</style>