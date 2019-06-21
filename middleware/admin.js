export default function({ store, redirect, error }) {
  // Si l'utilisateur n'est pas admin

  // const trans = store.state.i18n.messages

  // if (!store.$auth.$state.user) {
  //  return redirect('/login')
  // }

  console.log('store.$auth', store.$auth)
  if (!store.$auth.$state.user) {
    // alert('1')
    return redirect('/auth/login')
  }
}
