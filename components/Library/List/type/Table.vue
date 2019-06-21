<template>
  <div class="ITable">
    <!-- <pre><span class="m-5">formCmpnt</span> :: {{ formCmpnt }}</pre> -->
    <!-- <pre><span class="m-5">loads</span> :: {{ loads }}</pre> -->
    <!-- <pre><span class="m-5">value</span> :: {{ value }}</pre> -->
    <!-- <pre><span class="m-5">selection</span> :: {{ selection }}</pre> -->
    <!-- <pre><span class="m-5">multiple</span> :: {{ multiple }}</pre> -->
    <!-- <pre><span class="m-5">value</span> :: {{ value }}</pre> -->

    <!-- <pre class="mt-5"><b>cardCmpnt :</b> {{cardCmpnt}}</pre> -->
    <i-list
      v-model="value"
      :selection="selection"
      :multiple="multiple"
      :model="model"
      :method="method"
      :form-cmpnt="formCmpnt"
      :loads="loads"
      :filters="filters"
      :editable="editable"
    >
      <div
        v-if="ready"
        slot-scope="{
          loading,
          list,
          toggleForm,
          closeCard,
          showForm,
          showCard,
          selected,
          isItemSelected,
          permissions,
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
        <!-- <pre><span class="m-5">selected</span> :: {{ selected }}</pre> -->
        <!-- <pre><span class="m-5">showForm</span> :: {{ showForm }}</pre> -->
        <!--  <pre><span class="m-5">list</span> :: {{ list }}</pre> -->
        <!--  removeButtonEvents, inputProps, inputEvents, addElem -->

        <v-layout v-show="editable && showSearch">
          <v-flex xs6>
            <v-text-field
              v-show="showSearch"
              :value="search"
              append-icon="search"
              box
              :label="$t('actions.search')"
              @input="e => updateSearch(e)"
            ></v-text-field>

            <v-progress-circular
              v-show="loading"
              :value="20"
            ></v-progress-circular>
          </v-flex>

          <v-flex xs6 class="text-xs-right">
            <slot name="globalActions"></slot>
            <!-- <pre class="mt-5"><b>editable :</b> {{editable}}</pre> -->
            <slot v-if="editable" name="addButton">
              <v-btn v-show="true" color="success" @click="toggleForm">
                <v-icon>mdi-plus</v-icon> {{ $t('actions.add') }}
              </v-btn>
            </slot>
          </v-flex>
        </v-layout>

        <slot name="filters" :filters="filters"></slot>

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

        <!-- <pre class="mt-5"><b>showSearch :</b> {{showSearch}}</pre> -->

        <table class="table" style="width:100%">
          <thead>
            <tr>
              <th v-for="col in filteredCols" :key="col.field">
                {{ col.name }}
              </th>
              <th v-if="!!$scopedSlots['actions']">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="elem in list"
              :key="elem.id"
              @click="cardCmpnt ? (selection ? select(elem) : show(elem)) : ''"
            >
              <!--  -->
              <td v-for="col in filteredCols" :key="col.field">
                <slot :name="col.field" :item="elem" :col="col">
                  <!-- <template slot="name" slot-scope="{ item: grade, col }"> -->
                  <!--  #{{ grade.product_state_id }}
      {{ col.updateField }} -->
                  <!-- <pre><span class="m-5">col.is_editing</span> :: {{ col.is_editing }}</pre> -->
                  <span @click.stop="">
                    <v-menu
                      v-if="col.is_editing === elem.id"
                      v-model="col.is_editing"
                      :close-on-content-click="false"
                      offset-y
                    >
                      <span slot="activator" @click="col.is_editing = elem.id">
                        {{
                          elem.getNodeValue(col.field)
                            ? elem.getNodeValue(col.field)
                            : 'vide'
                        }}
                      </span>

                      <v-card class="pa-2">
                        <component
                          :is="formCmpnt"
                          :value="elem"
                          :loads="loads"
                          :only="[col.updateField]"
                          @cancel="col.is_editing = false"
                          @updated="
                            e => {
                              ;(col.is_editing = false), elem.hydrateObject(e)
                            }
                          "
                        ></component>
                      </v-card>
                    </v-menu>
                    <span
                      v-else
                      style="cursor:pointer"
                      @click="col.is_editing = elem.id"
                    >
                      {{
                        elem.getNodeValue(col.field)
                          ? elem.getNodeValue(col.field)
                          : 'vide'
                      }}
                    </span>
                  </span>
                  <!--</template>-->
                </slot>
              </td>
              <td v-if="!!$scopedSlots['actions']">
                <slot
                  name="actions"
                  :item="elem"
                  :removeElem="removeElem"
                  :show="show"
                  :edit="edit"
                ></slot>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- <pre><span class="m-5">$slots</span> :: {{ $slots }}</pre> -->

        <!--  <v-list two-line :dense="dense">
          <template v-for="elem in list">
            <v-list-tile
              :key="elem.id"
              avatar
              @click="selection ? select(elem) : show(elem)"
            >
              <v-list-tile-action v-if="selection && multiple">
                <v-checkbox
                  :input-value="isItemSelected(elem)"
                  @input="e => select(e)"
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
        </v-list> -->
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
            <!-- <pre><span class="m-5">loads</span> :: {{ loads }}</pre> -->
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
    cols: { required: true, type: Array, default: () => [] },
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
  computed: {
    filteredCols() {
      return this.cols.filter(e => {
        if (!e.hasOwnProperty('visible')) {
          return true
        }
        return e.visible
      })
    }
  },
  created() {
    // console.log('slot', this)
    // console.log('slot', this.$slots)
  },
  methods: {
    test(a) {
      alert(test)
      console.log('a', a)
    }
  }
}
</script>

<style>
.ITable .table {
  border-spacing: 0;
  border-collapse: collapse;
}
.ITable .table tr {
  line-height: 36px;
  background: white;
  border-bottom: 1px solid black !important;
}
.ITable .table tbody tr:hover {
  background: grey;
  color: white;
}
.ITable .table th {
  text-align: left;
  padding: 5px;
  line-height: 52px;
  background: transparent;
  border-bottom: 1px solid black !important;
}
.ITable .table td {
  padding: 5px;
}
</style>
