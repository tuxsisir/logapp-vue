let cookieParser = require('cookieparser')
export const state = () => ({
  sidebar: false,
  authToken: null,
  appView: 'user',
  snack: ''
})

export const mutations = {
  updateAuthToken (state, data) {
    state.authToken = data
  },
  setSnack (state, snack) {
    state.snack = snack
  },
  setAppView (state, view) {
    state.appView = view
  }
}
export const getters = {
  getAppView (state) {
    return state.appView
  },
  getAuthToken (state) {
    return state.authToken
  },
  getSnack (state) {
    return state.snack
  },
  getUserFullName (state) {
    if (state.auth.user !== null) {
      return state.auth.user.name
    } else {
      return ''
    }
  },
  getUserImage (state) {
    if (state.auth.user !== null) {
      return state.auth.user.profile_picture
    } else {
      return ''
    }
  },
  getUserDepartment (state) {
    if (state.auth.user !== null) {
      return state.auth.user.department
    } else {
      return ''
    }
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    let authToken = null
    if (req.headers.cookie) {
      let parsed = cookieParser.parse(req.headers.cookie)
      authToken = parsed['auth._token.local']
    }
    commit('updateAuthToken', authToken)
  }
}
