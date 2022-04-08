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
              <v-list-item-title>Role Tanımlama</v-list-item-title>
              <v-list-item-subtitle>Kullanıcı Rol ve Yetkilerini Tanımlama</v-list-item-subtitle>
                <v-container fluid>
  <v-row>
  <v-col
       cols="12"
        md="12"
        sm="12"
        lg="12"
         class="pl-0 mb-0 pb-0"
       >
       <v-text-field
      v-model="roleName"
      :counter="255"
      :rules="selectRules"
      label="Role Adı"
      outlined
      dense
      required
    ></v-text-field>
   </v-col>
   <v-col
       cols="6"
        md="2"
        sm="6"
        lg="2"
        class="pl-3 mb-0 pb-0 mt-0 pt-0"
        v-for="(item, index) in permissions"
        :key="index"
       >
     <v-checkbox
      v-model="myroles"
      :label="item.name"
      :value="item.name"
    ></v-checkbox>
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
        :keyOfItem="keyItem"
        ref="dt"
        />
</div>
</template>
<script>
/*eslint-disable*/
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
import Vue from 'vue';
export default {
      middleware({ $gates, redirect }) {
        // If the user is not an admin
        if (!$gates.hasAllPermissions('role-access')) {
          return redirect('/login')
        }
      },
      computed:{
      ...mapState({
        roles : state=> state.roles.roles,
        permissions: state=>state.roles.permissions,  
        rolepermissions : state=>state.roles.rolepermissions,
        }),
        ...mapGetters({  // you won't need to destructure if 
        getRolesCount: 'roles/getRolesCount',
        getRolesPerPage :'roles/getRolesPerPage',
        getAllRoles:'roles/getAllRoles',
        }),   
        },
        created(){
            this.getPermissions();
        },
         methods:{
          ...mapActions(
            {
            getRoles:'roles/getRoles',
            getPermissions:'roles/getPermissions',
            saveRole:'roles/saveRole',
            getPermissionsById:'roles/getPermissionsById',
            editRole:'roles/editRole',
            roleDelete:'roles/roleDelete'
            }),
            clickedNew(){
                this.status='new'

            },
            clickedSave(){
                 this.$refs.role_form.validate();
                 if(this.status=="new" && this.roleValid){
                            
                    let obj = {
                    name:this.roleName,
                    permission:JSON.stringify(this.myroles),
                    }
                
                    this.saveRole(obj).then(()=>{
                    this.$refs.modals.dialog=false
                    this.handleOptions(this.$refs.dt.options,'');
                    });

                 }

                 if(this.status=="edit" && this.roleValid){

                    let obj = {
                    name:this.roleName,
                    permission:JSON.stringify(this.myroles),
                    id:this.roleId,
                    }

                    this.editRole(obj).then(()=>{
                    this.$refs.modals.dialog=false
                    this.handleOptions(this.$refs.dt.options,'');
                    });


                 }

                    },
                    handleOptions(options,search){
                    let obj ={arama:search,page:options.page,per_page:options.itemsPerPage}
                    this.loading=true
                    this.getRoles(obj).then(result => {
                        this.loading = false
                    })
                    },
                   clickedEdit(val){
                       this.status='edit'
                       this.roleName=val.name;
                       this.roleId=val.id;
                        //rolleri al
                        this.getPermissionsById(val.id).then(res=>{
                            this.$refs.modals.dialog = true

                            this.myroles.splice(0);

                            this.rolepermissions.forEach(permission => {
                                 this.myroles.push(permission.name)                      
                            });
                        })
                   },
                   clickedDelete(val){
                    
                    this.roleDelete(val.id).then(()=>{
                        this.handleOptions(this.$refs.dt.options,'');
                    });
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
                mdlBtnText:'Rol Tanımla',
                roleName:'',
                selectRules: [
                v => !!v || 'Bu alan Gerekli',
                ],
                myroles:[],
                roleId:0,
                keyItem:'id',
          }
}
}
</script>
<style>
.role_table{
    border:1px solid;
    width:100%;
    text-align:left;
}
</style>