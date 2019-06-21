export const state = () => ({
  debug: false,
  drawer: null,
  color: 'success',
  image: '/img/drawer/lake-montain.jpg',
  links2: [
    {
      to: '/theme',
      icon: 'mdi-home',
      text: 'Home'
    }
  ],

  snackbar: {
    show: false,
    y: 'top',
    x: null,
    mode: '',
    timeout: 6000,
    text: "Hello, I'm a snackbar",
    color: 'green'
  }
})

export const actions = {
  flash({ commit }, string) {
    commit('setSnackbar', { text: string, show: true, color: 'success' })
  },
  error({ commit }, string) {
    commit('setSnackbar', { text: string, show: true, color: 'error' })
  }
}

export const mutations = {
  setSnackbar(state, value) {
    state.snackbar = Object.assign(state.snackbar, value)
  },
  setDrawer(state, value) {
    state.drawer = value
  },
  setImage(state, value) {
    state.image = value
  },
  setColor(state, value) {
    state.coloe = value
  },
  toggleDrawer(state, value) {
    state.drawer = !state.drawer
  },
  toggleDebug(state, value) {
    state.debug = !state.debug
  }
}
