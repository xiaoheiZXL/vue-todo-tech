export default {
  updateCountAsync (store, { num }) {
    setTimeout(() => {
      store.commit('updateCount', num)
    }, 2000)
  }
}
