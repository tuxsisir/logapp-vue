export default function ({ store, redirect }) {
  if (store.state.appView !== 'admin') {
    return redirect('/')
  }
}
