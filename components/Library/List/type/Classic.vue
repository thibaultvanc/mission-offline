<template>
  <div>
    <!-- <pre><span class="m-5">formCmpnt</span> :: {{ formCmpnt }}</pre> -->
    <!-- <pre><span class="m-5">loads</span> :: {{ loads }}</pre> -->
    <!-- <pre><span class="m-5">value in classinc</span> :: {{ value.map(e=>e.id) }}</pre> -->
    <!-- <pre><span class="m-5">selection</span> :: {{ selection }}</pre> -->
    <!-- <pre><span class="m-5">multiple</span> :: {{ multiple }}</pre> -->
    <!-- <pre><span class="m-5">value</span> :: {{ value }}</pre> -->
    <i-list
      :value="value"
      :selection="selection"
      :multiple="multiple"
      :model="model"
      :method="method"
      :form-cmpnt="formCmpnt"
      :loads="loads"
      :filters="filters"
      @input="e => $emit('input', e)"
    >
      <div
        v-if="ready"
        slot-scope="{
          list,
          toggleForm,
          closeCard,
          showForm,
          showCard,
          selected,
          isItemSelected,
          searchProps,
          search,
          updateSearch,
          ready,
          removeElem,
          edit,
          select,
          show,
          formUpdated,
          formCreated
        }"
      >
        <!-- <pre><span class="m-5">showForm</span> :: {{ showForm }}</pre> -->
        <!--  <pre><span class="m-5">list</span> :: {{ list }}</pre> -->
        <!--  removeButtonEvents, inputProps, inputEvents, addElem -->
        <v-layout row wrap vi>
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
            <v-btn v-if="editable" color="success" @click="toggleForm">
              <v-icon>mdi-plus</v-icon> {{ $t('actions.add') }}
            </v-btn>
          </v-flex>
        </v-layout>

        <!-- <pre class="mt-5"><b>hideFilters :</b> {{hideFilters}}</pre> -->

        <slot v-if="!hideFilters" name="filters" :filters="filters"></slot>

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

        <!-- <pre class="mt-5"><b>line-actions :</b> {{lineActions}}</pre> -->

        <v-list two-line :dense="dense">
          <template v-for="elem in list">
            <v-list-tile
              :key="elem.id"
              avatar
              @click="selection ? select(elem) : show(elem)"
            >
              <v-list-tile-action v-if="selection && multiple">
                <v-checkbox
                  :input-value="isItemSelected(elem)"
                  @input="
                    e => {
                      select(e)
                    }
                  "
                ></v-checkbox>
              </v-list-tile-action>

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
        </v-list>
        <!-- 
        <component
          :is="formCmpnt"
          :value="showCard ? showCard : null"
          @cancel="toggleForm"
          @stored="formCreated"
          @updated="formUpdated"
        ></component> -->

        <!-- FORM -->
        <v-dialog
          v-if="showForm"
          :value="showForm"
          max-width="1000px"
          transition="dialog-transition"
          @input="e => toggleForm()"
        >
          <v-card class="pa-3">
            <component
              :is="formCmpnt"
              :value="showCard ? showCard : null"
              :loads="loads"
              @cancel="toggleForm"
              @stored="formCreated"
              @updated="formUpdated"
            ></component>

            <!--  <v-btn color="primary" flat @click="toggleForm">
              {{ $t('actions.cancel') }}
            </v-btn> -->
          </v-card>
        </v-dialog>

        <!-- show Card -->
        <v-dialog
          :value="!!Object.keys(showCard).length"
          max-width="1000px"
          transition="dialog-transition"
          @input="e => closeCard()"
        >
          <v-card v-if="!!Object.keys(showCard).length" class="pa-3">
            <!-- <pre><span class="m-5">showCard</span> :: {{ showCard }}</pre> -->
            <!-- <pre><span class="m-5">loads in class</span> :: {{ loads }}</pre> -->
            <div class="text-xs-right">
              <v-btn
                v-show="showCard.metaPermissions.update"
                color="white"
                icon
                @click="edit"
              >
                <v-icon class="primary--text">edit</v-icon>
              </v-btn>
              <v-btn color="white" icon @click="closeCard">
                <v-icon class="primary--text">clear</v-icon>
              </v-btn>
            </div>

            <component
              :is="cardCmpnt"
              :value="showCard"
              :loads="loads"
            ></component>

            <!-- <div class="text-xs-right">
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
            </div> -->
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
import listModelMixin from '@/mixins/listModelMixin'
export default {
  components: {
    IList
  },
  mixins: [listModelMixin],
  props: {
    /* value: {
      required: false,
      type: [Object, Number, Array],
      default: null
    },
    selection: { required: false, type: Boolean, default: false },
    multiple: { required: false, type: Boolean, default: false }, */

    model: { required: true, type: String },
    method: { required: true, type: String },
    formCmpnt: { required: true, type: Object },
    cardCmpnt: { required: true, type: Object },
    dense: { required: false, type: Boolean, default: true },
    loads: { required: false, type: Array, default: () => [] },
    filters: { required: false, type: Object, default: () => {} }
  },
  methods: {
    test(a) {
      alert(test)
      console.log('a', a)
    }
  }
}
</script>
