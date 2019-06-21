import user from './en/user'
import human from './en/human'

export default {
  welcome: 'Welcome',

  user,
  human,

  interfaces: {
    goToAdmin: 'Jump to admin'
  },

  security: {
    UMustHavePermission: 'You must have permission to access this page'
  },

  actions: {
    fake: 'Fake',
    download: 'Download',
    cancel: 'Annuler',
    search: 'Search',
    add: 'Add',
    delete: { title: 'Delete', areUsure: 'Are you sure you want to delete ?' },
    edit: 'Edit',
    duplicate: 'Duplicate',
    pdf: 'Export PDF',
    save: {
      create: 'Create',
      update: 'Update'
    },
    ChanchangeFile: 'Change'
  },

  others: {
    noData: 'No data'
  },

  auth: {
    impersonate: 'Impersonate',
    leave_impersonation: 'Leave Impersonation',
    login: {
      action: 'Login',
      teasing: 'Please, enter your credentials',

      form: {
        email: { label: 'Email' },
        password: { label: 'Password' }
      }
    },
    logout: {
      action: 'Logout '
    },
    register: {
      action: 'Create an account'
    }
  }
}
