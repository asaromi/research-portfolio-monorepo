<script>
import { reactive, ref } from 'vue'
import ReviewCard from './components/ReviewCard.vue'
import AppFooter from '../../components/Footer.vue'
import AppHeader from '../../components/Header.vue'
import { submitReview } from '../../../api/review'
import { useAlert } from '../../../composable/useAlert'

export default {
  components: { AppFooter, AppHeader, ReviewCard },
  setup: () => {
    const { showAlert } = useAlert()

    const formData = reactive({
      full_name: '',
      company: '',
      position: '',
      relation: '',
      review: '',
    })

    const isSubmitting = ref(false)
    const isOpenModal = ref(false)

    const onSubmit = async () => {
      isSubmitting.value = true

      try {
        await submitReview(formData)

        showAlert('Review submitted successfully!', 'success')

        Object.assign(formData, {
          full_name: '',
          company: '',
          position: '',
          relation: '',
          review: '',
        })
      } catch (error) {
        console.error('Error submitting review:', error)
        showAlert('Something went wrong!', 'error')
      } finally {
        const confirmModal = document.getElementById('confirm_modal')
        confirmModal.togglePopover()

        isSubmitting.value = false
      }
    }

    return { formData, isSubmitting, onSubmit }
  },
  computed: {
    isValidForm() {
      return (
          !!this.formData.full_name.trim() &&
          !!this.formData.company.trim() &&
          !!this.formData.review.trim()
      )
    }
  }
}

</script>

<template>
  <app-header/>

  <main class="main min-h-screen-minus-footer max-w-1440 mx-auto px-4! lg:px-0! py-[64px] z-0! bg-base-bg">
    <div class="hero min-h-48">
      <div class="hero-content text-center">
        <div>
          <h1 class="text-3xl font-bold">Share Your Experience</h1>
          <p class="py-5">
            Your feedback helps me build better products and foster stronger professional relationships.
          </p>
        </div>
      </div>
    </div>

    <div class="flex justify-center z-0!">
      <div class="card lg:min-w-[480px] min-w-full mx-2 lg:mx-0 bg-base-100 shadow-xl">

        <!-- @submit.prevent sudah benar, akan mencegah reload halaman -->
        <form @submit.prevent="() => console.log('Form submitted!')" class="card-body px-2!">
          <div class="card-body text-center justify-center space-y-4! lg:px-8! px-4">
            <h2 class="text-lg font-semibold">Give me a Review</h2>

            <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
              <label class="fieldset text-start required:border-red-500">
                <span class="text-base-typo text-sm font-medium">Full Name *</span>

                <!-- Hapus @input, cukup gunakan v-model -->
                <input
                    v-model="formData.full_name"
                    class="input w-full input-md rounded-md border border-base-input! focus:outline-offset-0!"
                    name="full_name"
                    placeholder="John Doe"
                    required
                    type="text"
                />
                <span v-if="!formData.full_name" class="label-text-alt text-red-500 text-xs">Required</span>
              </label>

              <label class="fieldset text-start">
                <span class="text-base-typo text-sm font-medium">Company *</span>
                <input
                    v-model="formData.company"
                    class="input w-full input-md rounded-md border border-base-input! focus:outline-offset-0!"
                    name="company"
                    placeholder="Company Name"
                    required
                    type="text"
                />
                <span v-if="!formData.company" class="label-text-alt text-red-500 text-xs">Required</span>
              </label>

              <label class="fieldset text-start">
                <span class="text-base-typo text-sm font-medium">Role / Position</span>
                <input
                    v-model="formData.position"
                    type="text"
                    placeholder="Role Name"
                    class="input w-full input-md rounded-md border border-base-input! focus:outline-offset-0!"
                />
              </label>

              <label class="fieldset text-start">
                <span class="text-base-typo text-sm font-medium">Relation</span>
                <select
                    v-model="formData.relation"
                    name="relation"
                    class="select w-full select-primary border border-base-input! rounded-md focus:outline-offset-0!"
                >
                  <option value="" disabled>Select an option</option>
                  <option value="direct">Direct Client</option>
                  <option value="colleague">Team Colleague</option>
                  <option value="manager">Manager / Supervisor</option>
                  <option value="mentor">Mentor / Advisor</option>
                </select>
              </label>
            </div>

            <div class="flex w-full">
              <label class="fieldset w-full text-start">
                <span class="text-base-typo text-sm font-medium">Your Review *</span>
                <textarea
                    v-model="formData.review"
                    name="review"
                    class="textarea rounded-md border border-base-input! w-full focus:outline-offset-0!"
                    placeholder="Share your experience working together"
                    rows="4"
                    required
                />
                <span v-if="!formData.review" class="label-text-alt text-red-500 text-xs">Required</span>
              </label>
            </div>

            <div class="flex space-y-4 justify-between">
              <p class="max-w-1/2 text-start text-xs font-semibold flex-wrap">
                By submitting, you agree that this review may be publicly displayed on my portfolio website.
              </p>

              <button
                  type="button"
                  :disabled="isSubmitting || !isValidForm"
                  class="w-[137px] btn btn-primary not-disabled:bg-primary rounded-lg btn-error disabled:btn-disabled disabled:text-neutral-content"
                  popovertarget="confirm_modal"
              >
                <span v-if="!isSubmitting">Submit Review</span>
                <span v-else class="loading loading-spinner text-white"></span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </main>

  <div class="modal" id="confirm_modal" popover>
    <div class="modal-box space-y-4" >
      <h3 class="font-bold text-lg">Preview your testimonial</h3>
      <p class="py-2">
        Your review will be displayed on my portfolio website. Please review the details carefully before submitting.
      </p>

      <div class="flex justify-center">
      <review-card :company="formData.company" :review="formData.review" :full-name="formData.full_name"
                   :role="formData.role" :relation="formData.relation"/>
      </div>

      <div class="modal-action">
        <button class="btn btn-neutral rounded-lg" popovertarget="confirm_modal" popovertargetaction="hide">
          Cancel
        </button>

        <button class="btn btn-primary rounded-lg w-[92px]" @click="onSubmit" :disabled="isSubmitting">
          <span v-if="!isSubmitting">Confirm</span>
          <span v-else class="loading loading-spinner text-white"></span>
        </button>
      </div>
    </div>
  </div>

  <app-footer/>
</template>