<template>
  <div>
    <v-expansion-panel v-model="SeeCollectionPanel">
      <v-expansion-panel-content
        v-for="collectionName in usedCollections"
        :key="collectionName"
      >
        <div slot="header">
          <v-icon class="orange--text">attach_file</v-icon>
          <!-- {{collections.default[collectionName] ? collections.default[collectionName] : collectionName | capitalize}}  -->
          {{
            mediaImages(collectionName).length +
              mediaFiles(collectionName).length
          }}
          {{ collectionName === 'default' ? 'Documents' : collectionName }}
        </div>
        <v-card>
          <v-card-text>
            <h3 v-show="showFileTitle(collectionName)" class="mt-5">
              Fichiers
            </h3>

            <v-list dense>
              <v-list-tile
                v-for="media in mediaFiles(collectionName)"
                :key="media.id"
                avatar
                @click="download(media)"
              >
                <!-- <v-list-tile-avatar> -->
                <img
                  style="height:35px"
                  :src="getThumnail(media)"
                  class="tw-cursor-pointer mr-1"
                  @click="download(media)"
                />
                <!-- </v-list-tile-avatar> -->
                <v-list-tile-content>
                  {{ media.file_name }}
                </v-list-tile-content>

                <!--                 <pre class="mt-5"><b>media :</b> {{media.collectionName}}</pre> -->
                <v-list-tile-action v-if="coll.length">
                  <v-menu @click.native.stop>
                    <v-btn
                      slot="activator"
                      class="orange--text text--lighten-1"
                      icon
                    >
                      <v-icon>arrow_drop_down</v-icon>
                    </v-btn>
                    <v-card>
                      <v-list>
                        <v-list-tile
                          v-for="colle in coll"
                          :key="colle.id"
                          @click="movetoCollection(media, colle.name)"
                        >
                          <v-list-tile-avatar>
                            <v-icon
                              v-show="colle.name === media.collectionName"
                              class="primary--text"
                              >check</v-icon
                            >
                          </v-list-tile-avatar>
                          <v-list-tile-title>{{
                            colle.name
                          }}</v-list-tile-title>
                        </v-list-tile>
                        <!-- <v-list-tile @click="showEditCustumCollectionName=true, tempMedia=media">
                                          <v-list-tile-avatar><v-icon>add</v-icon></v-list-tile-avatar>
                                          <v-list-tile-title>Personnaliser</v-list-tile-title>
                                        </v-list-tile> -->
                      </v-list>
                    </v-card>
                  </v-menu>
                </v-list-tile-action>

                <v-list-tile-action>
                  <v-tooltip bottom>
                    <v-btn
                      slot="activator"
                      icon
                      ripple
                      @click.native.stop="download(media)"
                    >
                      <v-icon class="orange--text text--lighten-1"
                        >cloud_download</v-icon
                      >
                    </v-btn>
                    {{ $t('actions.download') }}
                  </v-tooltip>
                </v-list-tile-action>

                <v-list-tile-action v-if="deletable">
                  <v-tooltip bottom>
                    <v-btn
                      slot="activator"
                      icon
                      ripple
                      @click.native.stop="clickRemove(media)"
                    >
                      <v-icon class="orange--text text--lighten-1"
                        >clear</v-icon
                      >
                    </v-btn>
                    {{ $t('actions.delete.title') }}
                  </v-tooltip>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>

            <h3 v-show="showImageTitle(collectionName)" class="mt-5">
              Photos
            </h3>
            <viewer :images="mediaImages(collectionName)">
              <v-layout row wrap>
                <v-flex
                  v-for="media in mediaImages(collectionName)"
                  :key="media.id"
                  xs3
                >
                  <v-card class="ma-2">
                    <v-responsive v-if="mode != 'liste'" max-height="100px">
                      <img
                        :src="getThumnail(media)"
                        class="tw-cursor-pointer"
                      />
                    </v-responsive>

                    <v-card-actions class="white">
                      <img
                        v-show="mode == 'liste'"
                        style="width:100%"
                        :src="getThumnail(media)"
                        class="tw-cursor-pointer mr-1"
                      />

                      <!-- <span class="caption">{{media.file_name}}</span> -->

                      <v-spacer></v-spacer>

                      <v-menu v-if="coll.length">
                        <v-btn
                          slot="activator"
                          class="grey--text text--lighten-1"
                          icon
                        >
                          <v-icon>arrow_drop_down</v-icon>
                        </v-btn>
                        <v-card>
                          <v-list>
                            <v-list-tile
                              v-for="colle in coll"
                              :key="colle.id"
                              @click.native.stop="
                                movetoCollection(media, colle.name)
                              "
                            >
                              <v-list-tile-title>{{
                                colle.name
                              }}</v-list-tile-title>
                            </v-list-tile>
                            <!-- <v-list-tile @click="showEditCustumCollectionName=true, tempMedia=media">
                                          <v-list-tile-avatar><v-icon>add</v-icon></v-list-tile-avatar>
                                          <v-list-tile-title>Personnaliser</v-list-tile-title>
                                        </v-list-tile> -->
                          </v-list>
                        </v-card>
                      </v-menu>

                      <v-tooltip bottom>
                        <v-btn
                          v-if="deletable"
                          slot="activator"
                          icon
                          ripple
                          @click.native.stop="clickRemove(media)"
                        >
                          <v-icon class="orange--text text--lighten-1"
                            >clear</v-icon
                          >
                        </v-btn>
                        {{ $t('actions.delete.title') }}
                      </v-tooltip>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </viewer>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
// import 'viewerjs/dist/viewer.css'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'
Vue.use(Viewer)

export default {
  // components: { Viewer },
  props: {
    list: {
      required: true,
      type: Array,
      default: () => []
    },
    deletable: {
      required: false,
      type: Boolean
    },
    deleteMedias: {
      required: false,
      type: Array,
      default: () => []
    },
    model: {
      required: false,
      type: String,
      default: ''
    },
    mode: {
      required: false,
      type: String,
      default: 'liste' // card
    }
  },

  data() {
    return {
      show: false,

      showFileDialog: false,
      SeeCollectionPanel: null,
      tempMedia: null,
      coll: [],
      List: null
    }
  },

  computed: {
    // chooseCollectionList(){

    //     let base = this.collections[this.module]
    //     let plus = Object.assign({}, this.usedCollections)
    //     let aa = Object.assign(base, plus)
    //    return Object.entries(aa)

    // },

    mediaList() {
      if (!this.List) {
        return []
      }
      const list = this.List.filter(media => {
        if (typeof this.deleteMedias !== 'undefined') {
          return !this.deleteMedias.includes(media.id)
        }
        return true
      })
      return list
    },

    usedCollections() {
      return [...new Set(this.List.map(media => media.collectionName))]
    }

    // images() {
    //   return this.mediaList .map(media=>{
    //     let image = ''

    //     image = this.getThumnail(media)
    //     return image
    //   })
    // },
  },

  watch: {
    list: {
      immediate: true,
      handler(val) {
        this.List = val.filter(e => {
          return typeof e !== 'string'
        })
      }
    }
  },

  created() {
    // alert('wip fetch media collection')
    /* this.$axios.get(route('Settings.media_collection.index')).then(response => {
      this.coll = response.data.data.filter(m => {
        const concernClassExt = this.snakeCase(
          m.concern_class.split('\\').reverse()[0]
        ).toLowerCase()
        // alert(concernClassExt)
        return concernClassExt === this.module
      })
      // console.log('response', response.data.data)//.filter(m=>m.concern_class === this.module)
    }) */
  },

  methods: {
    submitNewCollection() {
      this.movetoCollection(this.tempMedia, this.newCollectionName)
      this.newCollectionName = ''
      this.tempMedia = ''
      this.showEditCustumCollectionName = false
    },

    movetoCollection(media, collName) {
      alert('WIP in medias component (library)')
      /* 
      this.$axios
        .post(
          route('media.changeCollection', {
            id: media.id,
            collectionName: collName
          })
        )
        .then(response => {
          const found = this.List.find(m => m.id === media.id)
          found.collectionName = collName
          // this.$nextTick(()=>{
          this.List = this.List.filter(m => m.id !== media.id)
          this.List.push(found)
          // flash(response.data.message)
          // })

          // console.log('found', found)
          // found.collectionName = collName
        })
        .catch(error => {
          throw error
          // alert('error')
          // alert('#1a1# erreur lors du changement de collection')
        }) */
    },

    clickRemove(media) {
      this.deleteMedias.push(media.id)
    },

    isImage(media) {
      return ['image/jpeg', 'image/png'].includes(media.mime_type)
    },

    open(file) {
      // alert('1111')
      this.showFileDialog = true
    },

    getThumnail(media) {
      if (media.mime_type === 'image/jpeg' || media.mime_type === 'image/png') {
        return this.getUrl(media)
      } else if (media.mime_type === 'application/pdf') {
        return '/img/picto/pdf.png'
      } else {
        return '/img/picto/file.png'
      }
    },

    getUrl(media) {
      return media.url
      /* return (
        process.env.LARAVEL_ENDPOINT +
        '/' +
        media.disk +
        '/' +
        media.id +
        '/' +
        media.file_name
      ) */
    },

    download(media) {
      this.go(this.getUrl(media), true)
      // return "/" + media.disk + "/" + media.id + "/" + media.file_name;
    },

    mediaImages(collectionName) {
      return this.mediaList.filter(
        media => this.isImage(media) && media.collectionName === collectionName
      )
    },
    mediaFiles(collectionName) {
      return this.mediaList.filter(
        media => !this.isImage(media) && media.collectionName === collectionName
      )
    },

    showImageTitle(collectionName) {
      return (
        this.mediaFiles(collectionName).length &&
        this.mediaImages(collectionName).length
      )
    },
    showFileTitle(collectionName) {
      return (
        this.mediaImages(collectionName).length &&
        this.mediaFiles(collectionName).length
      )
    }
  },

  ready() {
    console.log('this.deletemedias', this.deletemedias)
  }
}
</script>
