import user from './fr/user'
// import human from './fr/human'

export default {
  welcome: 'Bienvenue',

  user,
  // human,

  interfaces: {
    goToAdmin: "Aller à l'admin"
  },

  others: {
    noData: 'Pas de données à afficher'
  },

  security: {
    UMustHavePermission:
      "Vous n'avez pas les droits pour se connecter à cette page"
  },

  actions: {
    fake: 'Generer des fausses données',
    download: 'Télécharger',
    cancel: 'Annuler',
    search: 'Rechercher',
    add: 'Ajouter',
    delete: {
      title: 'Supprimer',
      areUsure: 'Etes vous certain de supprimer ?'
    },

    edit: 'Editer',
    duplicate: 'Dupliquer',
    pdf: 'Exporter en PDF',
    save: {
      create: 'Créer',
      update: 'Mettre à jour'
    },
    changeFile: 'Changer'
  },

  auth: {
    impersonate: 'Se connecter en tant que',
    leave_impersonation: 'Retour à mon compte',

    recover: {
      action: 'Réccupérer mon mot de passe',
      teasing: 'Veuillez saisir votre Email pour définir votre mot de passe',

      form: {
        email: { label: 'Email' }
      }
    },
    newpassword: {
      action: 'Mettre à jour mon mot de passe',
      teasing: 'Veuillez saisir votre nouveau mot de passe',

      form: {
        password: { label: 'Nouveau mot de passe' }
      }
    },
    login: {
      action: 'Se Connecter',
      teasing: 'Veuillez saisir vos identifiants de connexion',

      form: {
        email: { label: 'Email' },
        password: { label: 'Mot de passe' }
      }
    },
    logout: {
      action: 'Déconnexion '
    },
    register: {
      action: 'Créer un compte'
    }
  }
}
