<template>
  <div class="border p-20">
    <v-toolbar dark color="primary">
      <img src="/img/logo/logo.png" height="50px" />
    </v-toolbar>
    <v-card-text>
      <p>
        {{ $t('auth.recover.teasing') }}
      </p>
      <v-form>
        <v-text-field
          v-model="user.email"
          :error-messages="errors.email"
          prepend-icon="person"
          :label="$t('auth.recover.form.email.label')"
          type="text"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :loading="loading" color="primary" @click.prevent="recover">{{
        $t('auth.recover.action')
      }}</v-btn>
    </v-card-actions>

    <v-alert v-if="!!submitError" type="error" :value="!!submitError.message">
      <!--   <h3 v-show="submitError.status !== 422">
        Error {{ submitError.status }}
      </h3> -->
      {{ submitError.message }}
    </v-alert>

    <v-alert v-if="!!successMessage" type="success" :value="!!successMessage">
      <!--   <h3 v-show="submitError.status !== 422">
        Error {{ submitError.status }}
      </h3> -->
      {{ successMessage }}
    </v-alert>
  </div>
</template>

<script>
export default {
  auth: false,
  layout: 'login',
  data() {
    return {
      loading: false,
      errors: {},
      submitError: {},
      successMessage: '',
      user: {
        email: ''
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
    async recover() {
      this.loading = true
      try {
        const response = await this.$axios.post('/api/auth/recover', this.user)
        console.log('error.response.data', response.data)
        this.successMessage = response.data.data
        this.errors = {}
        this.submitError = {}
        this.loading = false
      } catch (error) {
        console.log('error.response.data', error.response.data)
        console.log('error', error)

        if (error.response.data.hasOwnProperty('errors')) {
          this.errors = error.response.data.errors
        }
        this.submitError = {
          message: error.response.data.message,
          status: error.response.status,
          statusText: error.response.statusText
        }
        // this.errors = error.response.data.errors
        this.$store.dispatch('layout/error', error.response.data.message)
        this.loading = false
      }
      /* await this.$auth.loginWith('local', {
        data: this.user
      })
      this.$router.replace('/admin') */
    }
  }
}
</script>
