<template>
  <div class="border p-20">
    <v-toolbar dark color="primary">
      <img src="/img/logo/logo.png" height="50px" />
    </v-toolbar>
    <v-card-text>
      <p>
        {{ $t('auth.login.teasing') }}
      </p>
      <v-form>
        <v-text-field
          v-model="user.email"
          prepend-icon="mdi-account"
          :label="$t('auth.login.form.email.label')"
          type="text"
        ></v-text-field>
        <v-text-field
          v-model="user.password"
          prepend-icon="mdi-key"
          :label="$t('auth.login.form.password.label')"
          type="password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <!--  <nuxt-link class="ml-3" to="/auth/recover"
        >J'ai oublié mon mot de passe</nuxt-link
      > -->
      <v-spacer></v-spacer>
      <v-btn color="primary" :loading="loadinglogin" @click.prevent="login"
        >Je me connecte</v-btn
      >
    </v-card-actions>
    <v-alert color="error" icon="danger" :value="!!errorMessage">
      {{ errorMessage }}
    </v-alert>
  </div>
</template>

<script>
export default {
  auth: false,
  layout: 'login',
  data() {
    return {
      loadinglogin: false,
      errorMessage: '',
      user: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    env() {
      return process.env.LARAVEL_ENDPOINT
    },
    envone() {
      return process.env.ONESIGNAL_APP_ID
    }
  },
  created() {
    // this.notify()
  },
  methods: {
    notify() {
      this.$OneSignal.push(() => {
        this.$OneSignal.isPushNotificationsEnabled(isEnabled => {
          if (isEnabled) {
            alert('Push notifications are enabled!')
          } else {
            alert('Push notifications are not enabled yet.')
          }
        })
      })

      // Using window and array form
      this.$OneSignal.push([
        'addListenerForNotificationOpened',
        data => {
          alert('Received NotificationOpened:', data)
        }
      ])
    },

    async login() {
      this.loadinglogin = true
      try {
        // alert('1')
        this.errorMessage = ''
        await this.$auth.loginWith('local', {
          data: this.user
        })
        this.$router.replace('/admin')
        // alert('2')
        // alert('3')
      } catch (error) {
        // alert(error.toString())

        this.errorMessage = 'Accès non autorisé' + error.toString()
      }
      this.loadinglogin = false
    }
  }
}
</script>
