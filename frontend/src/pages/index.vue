<script>

export default {
  name: 'public.vue',
  components: {
    PublicLayout: () => import('../components/layouts/PublicLayout.vue'),
  },
}
</script>


<template>
  <public-layout>
    <router-view />
  </public-layout>
</template>