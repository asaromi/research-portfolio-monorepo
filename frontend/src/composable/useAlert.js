import { ref } from 'vue'

const alerts = ref([])

let nextId = 0

export const useAlert = () => {
  /**
   * Show Alert
   * @param {string} message
   * @param {'error'|'warning'|'info'|'success'} type
   * @param {number} timeout
   */
  const showAlert = (message, type, timeout = 5000) => {
    const id = nextId++

    alerts.value.push({ id, message, type })

    setTimeout(() => {
      removeAlert(id)
    }, timeout)
  }

  const removeAlert = (id) => {
    alerts.value = alerts.value.filter(a => a.id !== id)
  }

  return { alerts, showAlert, removeAlert }
}