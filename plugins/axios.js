export default function ({ $axios, redirect, store }) {
  $axios.onRequest(config => {
    config.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;application/json'
    if (store.state.authToken) {
      config.headers.common['Authorization'] = store.state.authToken
    }
  })
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 404) {
      redirect('/404')
    } else if (code === 500) {
      redirect('/500')
    } else if (code === 401) {
      redirect('/accounts/login')
    }
  })
}
