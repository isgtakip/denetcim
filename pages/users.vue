<template>
<div>
 <v-card class="pb-3 pl-3 mb-5 pt-3" outlined>
        <Modals ref="modals" @clicked-save="clickedSave" @clicked-new="clickedNew" :mdlText="MdlText" :mdlBtnText="mdlBtnText">
          <v-list
          class="pl-0 mb-0"
        >
<v-form v-model="userValid" ref="user_form">
<v-list-item class="pb-0 mb-0 pb-0 mt-0" >
            <v-list-item-content class="pl-1 mb-0 pb-0">
              <v-list-item-title>Kullanıcı Tanımlama</v-list-item-title>
              <v-list-item-subtitle>Yeni Kullanıcı Bilgilerini Girin ve Rolünü Seçin</v-list-item-subtitle>
                <v-container fluid>
  <v-row>
  <v-col
       cols="12"
        md="12"
        sm="12"
        lg="6"
         class="pl-0 mb-0 pb-0"
       >
       <v-text-field
      v-model="userName"
      :counter="255"
      :rules="selectRules"
      label="Ad Soyad"
      outlined
      dense
      required
    ></v-text-field>
   </v-col>
    <v-col
       cols="12"
        md="12"
        sm="12"
        lg="6"
         class="pl-0 mb-0 pb-0"
       >
      <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
      outlined
      dense
    ></v-text-field>
   </v-col>
     <v-col
       cols="12"
        md="12"
        sm="12"
        lg="6"
         class="pl-0 mb-0 pb-0"
       >
     <v-text-field
        type="password"
        v-model="password"
         :rules="passwordRules"
        label="Şifre"
        required
        outlined
        dense
      ></v-text-field>
   </v-col>
    <v-col
       cols="12"
        md="12"
        sm="12"
        lg="6"
         class="pl-0 mb-0 pb-0"
       >
     <v-text-field
        type="password"
        v-model="confirm_password"
        :rules="[(password === confirm_password) || 'Şifreler Eşleşmeli']"
        label="Şifre Tekrar"
        required
        outlined
        dense
      ></v-text-field>
   </v-col>
   <v-col
       cols="12"
        md="12"
        sm="12"
        lg="12"
         class="pl-0 mb-0 pb-0"
       >
       <v-autocomplete
            v-model="roles"
            :items="allroles"
            item-text="name"
            item-value="id"
            :rules="selectRules"
            outlined
            dense
            label="Role Seçiniz"
          ></v-autocomplete>
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
        :items="getAllUsers"
        :loading="loading"
        :items-length="getUsersCount"
        @handle-options="handleOptions"
        :title="datatitle"
        @clicked-delete="clickedDelete"
        @clicked-edit="clickedEdit"
        ref="dt"
        :keyOfItem="keyItem"
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
        users : state=> state.users.users,
        allroles : state=> state.roles.allroles,  
        userrole  : state=> state.users.userrole,   
        }),
        ...mapGetters({  // you won't need to destructure if 
        getUsersCount: 'users/getUsersCount',
        getUsersPerPage :'users/getUsersPerPage',
        getAllUsers:'users/getAllUsers',
        }),   
        },
        created(){
            this.getAllRoles();
        },
         methods:{
          ...mapActions(
            {
            getUsers:'users/getUsers',
            getAllRoles:'roles/getAllRoles',
            saveUser:'users/saveUser',
            getRoleById:'users/getRoleById',
            editUser:'users/editUser',
            userDelete:'users/userDelete'
            }),
                    handleOptions(options,search){
                    let obj ={arama:search,page:options.page,per_page:options.itemsPerPage}
                    this.loading=true
                    this.getUsers(obj).then(result => {
                        this.loading = false
                    })
                    },
                   clickedEdit(val){
                     this.status='edit'
                     this.userId=val.id
                     this.email=val.email
                     this.userName=val.name
                     this.password=''
                     this.confirm_password=''

                      this.getRoleById(val.id).then(res=>{
                          this.roles=this.userrole
                           this.$refs.modals.dialog = true
                      })


                    

                   },
                   clickedDelete(val){
                    this.userDelete(val.id).then(()=>{
                        this.handleOptions(this.$refs.dt.options,'');
                    });
                   },
                   clickedNew(){
                      this.status='new'
                      this.email=''
                      this.password=''
                      this.confirm_password=''
                      this.userName=''

                    },
                    clickedSave(){
                      this.$refs.user_form.validate();
                      if(this.status=="new" && this.userValid){
                                  
                          let obj = {
                          name:this.userName,
                          email:this.email,
                          password:this.password,
                          confirm_password:this.confirm_password,
                          roles:this.roles,
                          }
                          
                          this.saveUser(obj).then(()=>{
                          this.$refs.modals.dialog=false
                          this.handleOptions(this.$refs.dt.options,'');
                          });

                      }

                      if(this.status=="edit" && this.userValid){

                           let obj = {
                          name:this.userName,
                          email:this.email,
                          password:this.password,
                          confirm_password:this.confirm_password,
                          roles:this.roles,
                          id:this.userId,
                          }

                          this.editUser(obj).then(()=>{
                          this.$refs.modals.dialog=false
                          this.handleOptions(this.$refs.dt.options,'');
                          });


                 }

                    }
         },
          data () {
             return {
                headers: [
                {text: 'User Name', value: 'name', sortable: false},
                {text: 'User Email', value: 'email', sortable: false},
                {text: 'User Roles', value: 'roles[0].name', sortable: false},
                {text: 'Actions', value: 'actions', sortable: false }
                ],
                loading:true,
                datatitle:'Kullanıcılar',
                keyItem:'id',
                emailRules: [ 
                    v => !!v || 'Email is required', 
                    v => /.+@.+/.test(v) || 'E-mail must be valid' 
                ],
                passwordRules: [ 
                    v => !!v || 'Password is required', 
                    v => (v && v.length >= 5) || 'Şifre 5 karakterden fazla olmalıdır',
                    v => /(?=.*[A-Z])/.test(v) || 'Şifre en az bir büyük harf içermelidir.', 
                    v => /(?=.*\d)/.test(v) || 'Şifre en az bir tane sayısal değer içermelidir', 
                   // v => /([!@$%])/.test(v) || 'Must have one special character [!@#$%]' 
                ],
                selectRules: [
                v => !!v || 'Bu alan Gerekli',
                ],
                userValid:false,
                userName:'',
                MdlText:'Yeni Kullanıcı Ekle',
                mdlBtnText:'Yeni Kullanıcı Ekle',
                email:'',
                password:'',
                confirm_password:null,
                roles:[],
                userId:0,


          }
}
}
</script>