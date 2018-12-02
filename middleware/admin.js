export default function ({ store, redirect }) {
  if (!(store.getters.getUserDepartment === 'Management' || store.getters.isUserReviewer)) {
    return redirect('/')
  }
}
