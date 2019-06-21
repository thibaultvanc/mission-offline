<template>
  <section id="welcome" class="hide-overflow">
    <v-layout>
      <v-flex hidden-sm-and-down md6>
        <v-img :src="require('~/assets/front/background.png')" height="100vh" />
      </v-flex>

      <v-flex
        xs12
        md6
        align-content-space-between
        layout
        :pa-5="$vuetify.breakpoint.smAndDown"
        wrap
      >
        <base-bubble-1 style="transform: rotate(180deg) translateY(25%)" />

        <v-layout align-center justify-center>
          <v-flex xs12 md7 class="white pa-3">
            <!-- <h1>test_endpoint : {{ test_endpoint }}</h1> -->

            <base-heading class=" pa-5">
              <!-- <img src="~/assets/img/logo.png" height="50px" /> -->
              Mission Offline
            </base-heading>

            <base-text>
              <h5 style="font-size:25px">
                Fort d'une équipe expérimentée, MissionOffline continue à se
                développer pour proposer de nouveaux services adaptés à vos
                besoins. Dorénavant, un interlocuteur unique gérera le quotidien
                de vos chantiers :
              </h5>
              <ul>
                <li>
                  La modification des horaires de mise en et hors service de la
                  surveillance grâce à la télémainte-nance
                </li>
                <li>
                  La demande d'intervention d'un technicien pour une maintenance
                </li>
                <li>
                  Désactivation exceptionnelle de l'alarme : livrai-sons,
                  ouverture les weekends et jours fériés.
                </li>
              </ul>

              <p class="mt-5">
                * Notre système de télémaintenance permet de traiter votre
                demande dans les 5 minutes.
              </p>
            </base-text>

            <div class="text-xs-right">
              <img src="\img\logo\logo.png" height="150px" />
            </div>

            <!-- <v-btn nuxt to="/presentation" color="secondary" class="mt-4 ">
              Learn More
            </v-btn> -->
          </v-flex>
        </v-layout>

        <base-bubble-2
          style="transform: rotate(180deg) translate(-200px, -15%)"
        />
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
export default {
  layout: 'web',
  data() {
    return {
      test: []
    }
  },
  // middleware: ['auth'],
  computed: {
    /* test_endpoint() {
      return process.env.MY_KEY
    } */
  }
}
</script>
