<template>
  <div>
    <!-- <pre><span class="m-5">formCmpnt</span> :: {{ formCmpnt }}</pre> -->
    <i-list :model="model" :method="method" :form-cmpnt="formCmpnt">
      <div
        v-if="ready"
        slot-scope="{
          list,
          toggleForm,
          closeCard,
          showForm,
          showCard,
          searchProps,
          search,
          updateSearch,
          ready,
          removeElem,
          edit,
          show,
          formUpdated,
          formCreated
        }"
      >
        <!-- <pre><span class="m-5">showForm</span> :: {{ showForm }}</pre> -->
        <!--  <pre><span class="m-5">list</span> :: {{ list }}</pre> -->
        <!--  removeButtonEvents, inputProps, inputEvents, addElem -->
        <v-layout row wrap>
          <v-flex xs6>
            <v-text-field
              :value="search"
              append-icon="search"
              box
              :label="$t('actions.search')"
              @input="e => updateSearch(e)"
            ></v-text-field>
          </v-flex>
          <v-flex xs6 class="text-xs-right">
            <v-btn color="success" @click="toggleForm">
              <v-icon>mdi-plus</v-icon> {{ $t('actions.add') }}
            </v-btn>
          </v-flex>
        </v-layout>

        <v-alert
          v-show="list.length === 0"
          color="info"
          icon="block"
          :value="true"
        >
          {{ $t('others.noData') }}
        </v-alert>

        <!--         <pre><span class="m-5">showCard</span> :: {{ showCard }}</pre>
        <pre><span class="m-5">test</span> :: {{ test }}</pre> -->

        <v-tabs
          :value="test"
          color="primary"
          dark
          slider-color="secondary"
          @change="e => show(list[e])"
        >
          <v-tab v-for="elem in list" :key="elem.id" ripple>
            <slot name="line" :item="elem"></slot>
          </v-tab>

          <v-btn color="success" @click="toggleForm">
            <v-icon>mdi-plus</v-icon> {{ $t('actions.add') }}
          </v-btn>

          <v-tabs-items :value="test">
            <v-tab-item
              v-for="elem in list"
              :key="elem.id"
              @change="e => (showCard = 1)"
            >
              <v-card flat>
                <v-card-text v-if="showCard">
                  <div v-if="showForm">
                    <component
                      :is="formCmpnt"
                      :value="showCard"
                      @cancel="toggleForm"
                      @stored="formCreated"
                      @updated="formUpdated"
                    ></component>

                    <v-btn color="primary" flat @click="toggleForm">
                      {{ $t('actions.cancel') }}
                    </v-btn>
                  </div>

                  <div v-else>
                    <slot
                      name="actions"
                      :item="elem"
                      :removeElem="removeElem"
                      :show="show"
                      :edit="edit"
                    ></slot>

                    <v-card v-if="!!Object.keys(showCard).length" class="pa-3">
                      <!-- <pre><span class="m-5">showCard</span> :: {{ showCard }}</pre> -->

                      <component :is="cardCmpnt" :value="showCard"></component>

                      <div class="text-xs-right">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              color="primary"
                              class="px-2"
                              @click="edit(elem)"
                              v-on="on"
                            >
                              {{ $t('actions.edit') }}
                            </v-btn>
                          </template>
                          <span>{{ $t('actions.edit') }}</span>
                        </v-tooltip>
                      </div>
                    </v-card>
                  </div>
                  <!-- {{ elem }} -->
                  <!-- <component :is="cardCmpnt" :value="elem"></component> -->
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>

        <!--  <div v-for="item in list" :key="item.id">
          <slot name="line" :item="item"></slot>
          ---------
        </div> -->

        <!--         <v-list two-line>
          <template v-for="elem in list">
            <v-list-tile :key="elem.id" avatar @click="show(elem)">
              <slot name="line" :item="elem"></slot>
              <slot
                name="actions"
                :item="elem"
                :removeElem="removeElem"
                :show="show"
                :edit="edit"
              ></slot>
            </v-list-tile>
          </template>
        </v-list> -->

        <!--  showForm
         -->
      </div>
      <!-- <template slot="list"> </template>    -->

      <!--  -->
    </i-list>
  </div>
</template>

<script>
import IList from '~/components/Library/List/IList'
export default {
  components: {
    IList
  },
  props: {
    model: { required: true, type: String },
    method: { required: true, type: String },
    formCmpnt: { required: true, type: Object },
    cardCmpnt: { required: true, type: Object }
    // dense: { required: false, type: Boolean, default: true }
  },
  data() {
    return {
      test: null
    }
  },
  methods: {
    chhh(ee) {
      console.log(ee)
      this.showCard = 123
    }
  }
}
</script>
