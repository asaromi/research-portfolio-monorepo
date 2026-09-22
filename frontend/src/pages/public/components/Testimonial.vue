<script lang="js">
import ReviewCard from '../review/components/ReviewCard.vue'

export default {
  name: 'Testimonial',
  components: { ReviewCard },
  data: () => ({
    testimonials: [
      {
        full_name: 'Sarah Johnson',
        role: 'Product Manager',
        company: 'Tech Corp',
        review: 'Working with this developer was an absolute pleasure. Their attention to detail and ability to translate complex requirements into elegant solutions exceeded our expectations.',
      },
      {
        full_name: 'Michael Chen',
        role: 'CTO',
        company: 'Startup Hub',
        review: 'An exceptional engineer who consistently delivers high-quality code on time. Their proactive communication and problem-solving mindset made a huge difference to our team.',
      },
      {
        full_name: 'Amara Osei',
        role: 'UX Designer',
        company: 'Creative Agency',
        review: 'Collaborating on projects was seamless. They understand design intent deeply and implement it faithfully — rare to find in a developer!',
      },
      {
        full_name: 'David Park',
        role: 'Engineering Lead',
        company: 'Fintech Solutions',
        review: 'Incredibly skilled and reliable. Delivered a complex dashboard ahead of schedule with zero compromises on code quality.',
      },
      {
        full_name: 'Lina Müller',
        role: 'CEO',
        company: 'Digital Ventures',
        review: 'From day one, they showed ownership and initiative. Our product quality improved significantly under their technical guidance.',
      },
    ],
  }),
}
</script>

<template>
  <section class="testimonial bg-white py-20">
    <div class="space-y-12">
      <div class="text-center space-y-2 px-4">
        <p class="text-sm font-medium text-primary uppercase tracking-widest">Testimonials</p>
        <h2 class="text-3xl font-bold">What People Say</h2>
        <p class="text-base-content/60">Honest feedback from colleagues and clients I've had the pleasure to work with.
        </p>
      </div>

      <!-- Scrollable row -->
      <div class="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 pb-4 no-scrollbar">
        <review-card v-for="(item, index) in testimonials" :key="index" class="snap-start shrink-0"
          :full-name="item.full_name" :review="item.review" :company="item.company" :role="item.role" />
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