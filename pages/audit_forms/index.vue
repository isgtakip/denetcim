<template>
<div>
  <v-card class="pb-3 pl-3 pt-3 mb-1" outlined>
        <Modals :mdlText="MdlText" ref="modal" :mdlBtnText="btnText" @clicked-save="clickedSave" @clicked-new="clickedNew">
            <v-form v-model="sablonvalid" ref="sablonform">
                <v-container fluid>
                  <v-row>
                    <v-col
                      cols="12"
                      md="12"
                    >
                      <v-text-field
                        v-model="auditFormFields.audit_form_name"
                        :rules="textRules"
                        :counter="50"
                        label="Şablon Adı"
                        required
                        dense
                        class="mb-8"
                      ></v-text-field>

                      <v-text-field
                        v-model="auditFormFields.audit_form_no"
                        :rules="textRules"
                        :counter="50"
                        label="Şablon Form No"
                        required
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="12"
                    >
                       <SingleUpload :items="icons" ref="iupload"/>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
        </Modals>
       </v-card>
<AuditCards :items="todo" @searched="searched" @clicked-edit="clickedEdit" @clicked-delete="clickedDelete"/>
</div>
</template>
<script>
/*eslint-disable*/
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
export default {
   middleware({ $gates, redirect }) {
        // If the user is not an admin
        if (!$gates.hasAllPermissions('audit-access')) {
          return redirect('/login')
        }
      },
     layout:"default",
    computed:{
      ...mapState({
        audit_forms : state=> state.audit_forms.audit_forms,
        icons: state=>state.icons.icons
      }),
      ...mapGetters({  // you won't need to destructure if 
      filterByKeyword: 'audit_forms/filterByKeyword',
        // you have no plans of adding other computed
       }),
      
    },
     methods:{
      ...mapActions(
        {
        getAuditForms:'audit_forms/getAuditForms',
        saveAuditForms:'audit_forms/saveAuditForms',
        deleteAudit:'audit_forms/deleteAudit',
        getIcons: 'icons/getIcons', 
        }),
        searched(val){
         this.todo = this.filterByKeyword(val)
        },
        clickedSave(){
        //kaydetme işlemi
        this.auditFormFields.audit_icon_id=this.$refs.iupload.icon_id;
        this.saveAuditForms(this.auditFormFields).then(()=>{
          this.$refs.modal.dialog=false;
        })

        },
        clickedNew(){

        },
        clickedEdit(item){

        },
        clickedDelete(item){
          this.deleteAudit(item.audit_form_id).then(()=>{
            console.log("Silindi");
         });
        }

     },
    
    async created() {
      await this.getAuditForms().then(()=>{
         this.todo=this.audit_forms
       });
       await this.getIcons();
    
    },
  data(){
    return{
      todo:[],
      btnText:"Yeni Şablon Ekle",
      MdlText:"Yeni Şablon Ekle",
      textRules: [
          v => !!v || 'Bu alan Gereklidir',
          v => (v && v.length >= 3) || 'İlgili alan 3 karakterden fazla olmalıdır.',
          v => (v && v.length <= 50) || 'İlgili alan en fazla 160 karakter olmalıdır.',
        ],
      sablonvalid:false,
      auditFormFields:[{
        audit_form_name:'',
        audit_form_no:'',
        audit_icon_id:0,
      }
      ],

    }
  }
}
</script>