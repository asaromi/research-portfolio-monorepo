<script>
export default {
  name: 'PublicLayout',
  components: {
    Header: () => import('../Header.vue'),
    Footer: () => import('../Footer.vue'),
  },
}
</script>


<template>
  <Header />
  <main class="main">
    <slot />
  </main>
  <Footer />
</template>