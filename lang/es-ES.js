import user from './es/user'
import human from './es/human'

export default {
  welcome: 'Benvenido',
  user,
  human,
  interfaces: {
    goToAdmin: 'Admin'
  },

  security: {
    UMustHavePermission: 'Necessita permission para acceder a esta pagina'
  },
  actions: {
    fake: 'Fake datos',
    download: 'Descargar',
    cancel: 'Cancelar',
    search: 'Buscar',
    add: 'Anadir',
    delete: { title: 'Supprimir', areUsure: 'Quieres suprimir ?' },
    edit: 'Editar',
    duplicate: 'Replicar',
    pdf: 'Exporter como PDF',
    save: {
      create: 'Crear',
      update: 'Actualizar'
    },
    changeFile: 'Cambiar'
  },

  others: {
    noData: 'Ninguno datos'
  },

  auth: {
    impersonate: 'Connectar se como',
    leave_impersonation: 'volver a mi cuenta',

    login: {
      action: 'Login',
      teasing: 'Necitamos los datas de connection',

      form: {
        email: { label: 'Email' },
        password: { label: 'Contrassena' }
      }
    },
    logout: {
      action: 'Deconnectar '
    },
    register: {
      action: 'crear una cuenta'
    }
  }
}
