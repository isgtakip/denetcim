<template>
    <div>
        <AuditCards :items="audit_form" :colLength="12" :searchShow="false" class="pb-2"/>
    <Modals
    :mdlText="MdlText"
    :showbtn="false"
    ref="modals"
    @clicked-save="clickedSave">
     <v-form v-model="sectionvalid" ref="sectionForm">
                <v-container fluid>
                  <v-row>
                    <v-col
                      cols="12"
                      md="12"
                    >
                      <v-text-field
                        v-model="sectionName"
                        :rules="textRules"
                        :counter="50"
                        label="Şablon Bölüm Adı"
                        required
                        dense
                        class="mb-8"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
    </Modals>
    <v-row>
       <v-col
       cols="12"
        md="3"
        sm="12"
        lg="3"
        class="pt-7">
        <v-card
    elevation="0"
    outlined
    >
     <v-card-title class="white--text primary " style="font-size:16px;">
     Şablon Bölümleri
      <v-spacer></v-spacer>
      <v-btn
        color="white"
        class="text--primary"
        fab
        small
        dense
        @click="showModal"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>
        <v-divider></v-divider>
         <Container
    @drop="onDrop"
    lock-axis="y"
    :drop-placeholder="dropPlaceholderOptions"
     drag-handle-selector=".column-drag-handle"
    ><Draggable v-for="section in sectionslarim" :key="section.section_id">
        <div class="draggable-item pt-5 pb-5" @click="activate(section)" :class="{ active : active_el == section.section_id }">
          <span class="column-drag-handle" style="float:left; padding:0 10px;"><v-icon color="red" class="handle mt-0">mdi-cursor-move</v-icon></span>
          <span>{{section.section_name}}</span>
          <span style="float:right;padding-right:10px;">
            <v-icon color="gray" class="handle mt-0" @click="editSection(section)">mdi-pencil</v-icon>
            <v-icon color="gray" class="handle mt-0" @click="deleteSection(section)">mdi-delete</v-icon></span>
        </div>
          </Draggable>
        </Container> </v-card></v-col>
        <v-col
       cols="12"
        md="9"
        sm="12"
        lg="9"
        class="pt-7">
       <QuestionSets
       ref="questionsets"
       :sectionID="this.sectionID"
       v-show="this.sectionID!=0"
       :baslikTXT="this.baslikTXT"
       @change-baslik="changeBaslik"/>
        </v-col>
    </v-row>
    </div>
</template>
<script>
/*eslint-disable*/
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag, generateItems } from '../../src/utils'
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
export default {
       middleware({ $gates, redirect }) {
        // If the user is not an admin
        if (!$gates.hasAllPermissions('audit-access')) {
          return redirect('/login')
        }
      },
      
     async asyncData({env,params,$axios}) {
      $axios.defaults.withCredentials = true
      const audit_form = await $axios.$get(env.apiURL+`/audit_forms/${params.id}`)
      return { audit_form }
    },
    computed:{
       sectionslarim: {
        get() {
          return this.$store.state.sections.sections
        },
        set(value) {
          this.$store.commit('sections/SET_SECTIONS', value)
        }
    },
      ...mapState({
        sections : state=> state.sections.sections,
      }),      
    },
    async created() {
       await this.getSections(this.$route.params.id).then(()=>{
         this.audit_sections=this.sections;
       });
    },
    components: { Container, Draggable },
    data(){
        return{
            baslikTXT:'',
            status:null,
            sectionName:'',
            sectionID:0,
            sectionvalid:false,
            audit_sections:[],
            textRules: [
              v => !!v || 'Bu alan Gereklidir',
              v => (v && v.length >= 3) || 'İlgili alan 3 karakterden fazla olmalıdır.',
              v => (v && v.length <= 50) || 'İlgili alan en fazla 50 karakter olmalıdır.',
            ],
                dropPlaceholderOptions: {
                className: 'drop-preview',
                animationDuration: '150',
                showOnTop: true,
            },
              active_el:0,
              MdlText:"Şablon Bölüm Ekle",
        }
    },
     methods: {  
       ...mapActions(
        {
        getSections:'sections/getSections',
        updateSectionsOrder:'sections/updateSectionsOrder',
        saveSections:'sections/saveSections',
        editSections:'sections/editSections',
        deleteSections:'sections/deleteSections',
        }),
    onDrop(dropResult) {
      this.sectionslarim = applyDrag(this.sectionslarim, dropResult);
      let obj ={id:this.$route.params.id,sections:this.sectionslarim}
      this.updateSectionsOrder(obj).then(()=>{
        console.log("Başarılı");
      })

    },
    activate: function(section) {
      this.active_el=section.section_id;
      this.sectionID=section.section_id;
      this.baslikTXT=section.section_name;
   
      //id ye göre soruları getir
       this.$refs.questionsets.getQuestions(section.section_id).then(()=>{
         
      })

    },
    changeBaslik(question){
      this.baslikTXT=question;
    },
    showModal(){
       this.$refs.modals.dialog = true;
       this.status='new';
       console.log(this.status)
    },
    clickedSave(){
      this.$refs.sectionForm.validate();
      if(this.status=='new' && this.sectionvalid){
        //section veritabanına kaydet
        let obj = {audit_form_id: this.$route.params.id,section_name:this.sectionName}
        this.saveSections(obj).then(()=>{
          this.status=null
          this.$refs.modals.dialog = false
          this.sectionName=""
        })
      }
      if(this.status=='edit' && this.sectionvalid){
        let obj = {section_id: this.section_id,section_name:this.sectionName}
        this.editSections(obj).then(()=>{
          this.status=null
          this.$refs.modals.dialog=false
          this.sectionName=''
        })
      }
    },
    clickedNew(){
      this.status='new';
    },
    editSection(val){
      this.status='edit'
      this.sectionName=val.section_name
      this.section_id=val.section_id
      this.$refs.modals.dialog = true;
        
    },
    deleteSection(val){
        this.deleteSections(val.section_id).then(()=>{
            console.log("silindi")
         })
    },
     }
}
</script>
<style>
.draggable-item{
    border-bottom:1px solid #efefef;
    cursor:pointer;
}
.column-drag-handle{
    cursor:move;
}
.active{
    background-color: #efefef;
}
</style>