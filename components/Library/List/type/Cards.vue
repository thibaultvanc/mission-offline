<template>
  <div>
    <!-- <pre><span class="m-5">formCmpnt</span> :: {{ formCmpnt }}</pre> -->
    <!-- <pre><span class="m-5">givenList</span> :: {{ givenList }}</pre> -->
    <i-list
      :model="model"
      :method="method"
      :form-cmpnt="formCmpnt"
      :given-list="givenList"
    >
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
              v-if="!givenList.length"
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

        <!--  <div v-for="item in list" :key="item.id">
          <slot name="line" :item="item"></slot>
          ---------
        </div> -->

        <v-layout wrap>
          <v-flex v-for="elem in list" :key="elem.id" xs12 md6>
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                flat
                class="ma-2 pa-2"
                :class="`elevation-${hover ? 12 : 1}`"
                @click="show(elem)"
              >
                <slot
                  name="actions"
                  :item="elem"
                  :removeElem="removeElem"
                  :show="show"
                  :edit="edit"
                ></slot>
                <slot name="line" :item="elem"></slot>
              </v-card>
            </v-hover>
          </v-flex>
        </v-layout>

        <!--   <v-list two-line :dense="dense">
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

        <!-- FORM -->
        <v-dialog
          :value="showForm"
          persistent
          max-width="1000px"
          transition="dialog-transition"
        >
          <!-- v-if="showForm" -->
          <v-card v-if="showForm" class="pa-3">
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
          </v-card>
        </v-dialog>

        <!-- show Card -->
        <v-dialog
          :value="!!Object.keys(showCard).length"
          persistent
          max-width="1000px"
          transition="dialog-transition"
        >
          <v-card v-if="!!Object.keys(showCard).length" class="pa-3">
            <!-- <pre><span class="m-5">showCard</span> :: {{ showCard }}</pre> -->

            <component :is="cardCmpnt" :value="showCard"></component>

            <div class="text-xs-right">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    color="primary"
                    icon
                    flat
                    class="mr-3"
                    @click="closeCard"
                    v-on="on"
                  >
                    {{ $t('actions.cancel') }}
                  </v-btn>
                </template>
                <span>{{ $t('actions.cancel') }}</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" class="px-2" @click="edit" v-on="on">
                    {{ $t('actions.edit') }}
                  </v-btn>
                </template>
                <span>{{ $t('actions.edit') }}</span>
              </v-tooltip>
            </div>
          </v-card>
        </v-dialog>
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
    cardCmpnt: { required: true, type: Object },
    dense: { required: false, type: Boolean, default: true },
    givenList: { required: false, type: Array, default: () => [] }
  },
  methods: {}
}
</script>
