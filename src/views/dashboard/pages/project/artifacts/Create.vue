<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <base-material-card icon="mdi mdi-clipboard-file" color="primary">
          <section class="mb-12 text-center">
            <h1 class="font-weight-light mb-2 headline">Creador de Artefactos del Proyecto</h1>
            <span class="font-weight-light subtitle-1">
              Debes tener una cuenta de Google para poder utilizar esta
              herramienta
            </span>
          </section>

          <ValidationObserver ref="odescbs">
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="6" md="6">
                    <VTextFieldWithValidation
                      label="Nombre de del artefacto"
                      color="secondary"
                      prepend-icon="mdi mdi-card-text-outline"
                      v-model="inputs.nombre"
                      rules="required"
                      class="purple-input"
                    />
                  </v-col>
                  <v-col cols="6" md="6">
                    <v-select
                      color="secondary"
                      item-color="secondary"
                      label="Tipo de Artefacto"
                      :items="type"
                      item-text="name"
                      item-value="id"
                      v-model="inputs.tipo"
                    >
                      <template v-slot:item="{ attrs, item, on }">
                        <v-list-item
                          v-bind="attrs"
                          active-class="secondary elevation-4 white--text"
                          class="mx-3 mb-3 v-sheet"
                          elevation="0"
                          v-on="on"
                        >
                          <v-list-item-content>
                            <v-list-item-title v-text="item.name" />
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12">
                    <VTextFieldWithValidation
                      label="Versión del Artefacto"
                      color="secondary"
                      v-model="inputs.version"
                      type="number"
                      validate-on-blur
                      min="0"
                      class="ml-3"
                    />
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-textarea
                      name="input-7-1"
                      label="Descripción"
                      hint="Indica en qué consiste tu Artefacto"
                      v-model="inputs.desc"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" class="text-right">
                    <v-btn
                      color="primary"
                      float="right"
                      margin-left="6px"
                      :to="{ name: 'ArtifactsList' }"
                    >Artefactos</v-btn>
                    <v-btn
                      v-if="!show"
                      color="Secondary"
                      float="right"
                      margin-left="6px"
                      @click="login()"
                    >Inicia Sesión en tu Cuenta de Google</v-btn>
                    <v-btn
                      v-if="show"
                      color="secondary"
                      float="right"
                      margin-left="6px"
                      @click="create()"
                    >Crear Artefacto</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </ValidationObserver>
        </base-material-card>
      </v-col>
    </v-row>
    <ErrorMessage />
    <SuccessMessage />
  </v-container>
</template>

<script>
/* eslint-disable */
import { ValidationObserver } from 'vee-validate'
import VTextFieldWithValidation from '@/components/inputs/VTextFieldWithValidation'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      show: false,
      show2: false,
      type: [
        { name: 'Inicio', id: '1' },
        { name: 'Planificación', id: '2' },
        { name: 'Desarrollo', id: '3' },
        { name: 'Control', id: '4' },
        { name: 'Cierre', id: '5' },
      ],
    
      inputs: {
        nombre: '',
        tipo: '',
        desc:'',
        descripcion:'',
        version:'',
        enlace:'',
        projectId: this.$route.params.id_project,
        estado: 'A',
      },
      CLIENT_ID:
        '1038154514425-t7uob4112vsfds1jpgkl5r99adppb0ab.apps.googleusercontent.com',
      DISCOVERY_DOCS: [
        'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
        'https://www.googleapis.com/discovery/v1/apis/docs/v1/rest',
      ],
      SCOPES:
        'https://www.googleapis.com/auth/drive.appdata' +
        ' ' +
        'https://www.googleapis.com/auth/drive' +
        ' ' +
        'https://www.googleapis.com/auth/drive.file' +
        ' ' +
        'https://www.googleapis.com/auth/drive.appdata' +
        ' ' +
        'https://www.googleapis.com/auth/documents',
      originFileId: '1avazRMxhIi3RNFiwdZksOY1JlK_VAjLIXT6RIVuimKo',
    }
  },
  components: {
    ValidationObserver,
    VTextFieldWithValidation,
  },
  created() {
    this.projectId = this.$route.params.id
    this.createDocument()
    const  auth2 = gapi.auth2.getAuthInstance()
    if (auth2.isSignedIn.get()){
      console.log(auth2.isSignedIn.get())
      console.log("esta en sesion")
      this.show=true;
    }else{
      console.log("no esta en sesion")
      this.show=false;
    }
  },
  computed: {


  },
  methods: {
    ...mapActions('artifacts', ['createArtifact']),
    async createDocument() {
      await gapi.load("client", () => {
          console.log("Auth2 Loaded");
          gapi.client.init({
              apiKey: this.API_KEY,
              clientId: this.CLIENT_ID,
              discoveryDocs: this.DISCOVERY_DOCS,
              scope: this.SCOPES
          });
          gapi.client.load("drive", "v3", () => console.log("loaded drive"));
          gapi.client.load("docs", "v1", () => console.log("loaded doc"));
      });
    },
    
    async login() {
      const googleAuth = gapi.auth2.getAuthInstance();
      const googleUser = await googleAuth.signIn();
      const token = googleUser.getAuthResponse().id_token;
      console.log(googleUser);
      console.log(googleUser.getAuthResponse());
      console.log(token);
      this.show=true
    },
    async create() {
        
        const body = {name: this.inputs.nombre};
        const request = await gapi.client.drive.files.copy({
            fileId: this.originFileId,
            resource: body
        });
        const id = request.result.id;
        console.log(id);
        this.inputs.enlace = `https://docs.google.com/document/d/${id}/edit`;
        console.log(this.inputs.enlace)
       
        this.createArtifact({
          nombre: this.inputs.nombre,
          descripcion: this.inputs.desc+'\n\nVersión: '+this.inputs.version,
          enlace:this.inputs.enlace,
          projectId: this.$route.params.id_project,
          estado: 'A',
        })
        this.$router.push(`/artifact/list/${this.$route.params.id_project}`)
    },
    async logout() {
      gapi.auth2.getAuthInstance().signOut();
      this.show=false
    },
  },
}
</script>
