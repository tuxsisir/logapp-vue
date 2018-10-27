export default function ({ store, redirect }) {
  if (store.state.appView !== 'user') {
    return redirect('/admin/review-logs/')
  }
}
