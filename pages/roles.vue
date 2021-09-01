<template>
<div>
 <v-card class="pb-3 pl-3 mb-5 pt-3" outlined>
        <Modals ref="modals" @clicked-save="clickedSave" @clicked-new="clickedNew" :mdlText="MdlText" :mdlBtnText="mdlBtnText">
          <v-list
          class="pl-0 mb-0"
        >
<v-form v-model="roleValid" ref="role_form">
<v-list-item class="pb-0 mb-0 pb-0 mt-0" >
            <v-list-item-content class="pl-1 mb-0 pb-0">
              <v-list-item-title>Firma Kayıt</v-list-item-title>
              <v-list-item-subtitle>Firma Temel Bilgilerini Giriniz</v-list-item-subtitle>
                <v-container fluid>
  <v-row>
  <v-col
       cols="12"
        md="12"
        sm="12"
        lg="12"
         class="pl-0 mb-0 pb-0"
       >
   </v-col>
     </v-row>
    </v-container>
    </v-list-item-content>
     </v-list-item>
           </v-form>
        </v-list>
        </Modals>
       </v-card>
  <Datatable
        :headers="headers"
        :items="getAllRoles"
        :loading="loading"
        :items-length="getRolesCount"
        @handle-options="handleOptions"
        :title="datatitle"
        @clicked-delete="clickedDelete"
        @clicked-edit="clickedEdit"
        ref="dt"
        />
</div>
</template>
<script>
/*eslint-disable*/
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
import Vue from 'vue';
export default {
      computed:{
      ...mapState({
        roles : state=> state.roles.roles     
        }),
        ...mapGetters({  // you won't need to destructure if 
        getRolesCount: 'roles/getRolesCount',
        getRolesPerPage :'roles/getRolesPerPage',
        getAllRoles:'roles/getAllRoles'
        }),   
        },
         methods:{
          ...mapActions(
            {
            getRoles:'roles/getRoles',
            }),
            clickedNew(){

            },
            clickedSave(){

            },
                    handleOptions(options,search){
                    let obj ={arama:search,page:options.page,per_page:options.itemsPerPage}
                    this.loading=true
                    this.getRoles(obj).then(result => {
                        this.loading = false
                    })
                    },
                   clickedEdit(val){
                   },
                   clickedDelete(val){

                   },
         },
          data () {
             return {
                headers: [
                {text: 'Role Id', value: 'id', sortable: false},
                {text: 'Role Name', value: 'name', sortable: false},
                {text: 'Created At', value: 'created_at', sortable: false},
                {text: 'Updated At', value: 'updated_at', sortable: false},
                {text: 'Actions', value: 'actions', sortable: false }
                ],
                loading:true,
                datatitle:'Roller',
                roleValid:false,
                MdlText:'Yeni Rol Ekle',
                mdlBtnText:'Rol Tanımla'
          }
}
}
</script>