export default function({ app }, inject) {
  // beforeLanguageSwitch called right before setting a new locale
  app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
    // alert('Change LANG')
    console.log(oldLocale, newLocale)
  }
  // onLanguageSwitched called right after a new locale has been set
  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    // alert('LANG Changed')
    console.log(oldLocale, newLocale)
  }
}
