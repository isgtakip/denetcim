<template>
<div>
 <v-card class="pb-3 pl-3 mb-5 pt-3" outlined>
        <Modals ref="modals" @clicked-save="clickedSave" @clicked-new="clickedNew" :mdlText="MdlText" :mdlBtnText="mdlBtnText">
          <v-list
          class="pl-0 mb-0"
        >
<v-form v-model="customerValid" ref="customer_form">
<v-list-item class="pb-0 mb-0 pb-0 mt-0" >
            <v-list-item-content class="pl-1 mb-0 pb-0">
              <v-list-item-title>Müşteri Tanımlama</v-list-item-title>
              <v-list-item-subtitle>Yeni Müşteri Tanımlayın</v-list-item-subtitle>
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
      v-model="customer_name"
      :counter="255"
      :rules="selectRules"
      label="Müşteri Adı"
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
      v-model="customer_domain"
      :rules="selectRules"
      :counter="255"
      label="Müşteri Domain"
      required
      outlined
      dense
    ></v-text-field>
   </v-col>
     </v-row>
    </v-container>
    </v-list-item-content>
     </v-list-item>
           </v-form>
        </v-list>
        </Modals>
       </v-card>
       {{this.$gates.hasAllPermissions('location-list')}}
  <Datatable
        :headers="headers"
        :items="getAllCustomers"
        :loading="loading"
        :items-length="getCustomersCount"
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
    middleware({ $gates, redirect }) {
        // If the user is not an admin
        if (!$gates.hasAllPermissions('customer-access')) {
          return redirect('/login')
        }
      },
      computed:{
      ...mapState({
        customers : state=> state.customers.customers,
        }),
        ...mapGetters({  // you won't need to destructure if 
        getCustomersCount: 'customers/getCustomersCount',
        getCustomersPerPage :'customers/getCustomersPerPage',
        getAllCustomers:'customers/getAllCustomers',
        }),   
        },
        created(){
            //this.getAllRoles();
        },
         methods:{
          ...mapActions(
            {
            getCustomers:'customers/getCustomers',
            saveCustomer:'customers/saveCustomer',
            editCustomer:'customers/editCustomer',
            customerDelete:'customers/customerDelete'
            }),
                    handleOptions(options,search){
                    let obj ={arama:search,page:options.page,per_page:options.itemsPerPage}
                    this.loading=true
                    this.getCustomers(obj).then(result => {
                        this.loading = false
                    })
                    },
                   clickedEdit(val){
                     this.status='edit'
                     this.customer_id=val.customer_id
                     this.customer_domain=val.customer_domain
                     this.customer_name=val.customer_name 
                     this.$refs.modals.dialog = true                  

                   },
                   clickedDelete(val){
                    this.customerDelete(val.customer_id).then(()=>{
                        this.handleOptions(this.$refs.dt.options,'');
                    });
                   },
                   clickedNew(){
                      this.status='new'
                      this.customer_domain=''
                      this.customer_name=''  

                    },
                    clickedSave(){
                      this.$refs.customer_form.validate();
                      if(this.status=="new" && this.customerValid){
                                  
                          let obj = {
                          customer_name:this.customer_name,
                          customer_domain:this.customer_domain,
                          }
                          
                          this.saveCustomer(obj).then(()=>{
                          this.$refs.modals.dialog=false
                          this.handleOptions(this.$refs.dt.options,'');
                          });

                      }

                      if(this.status=="edit" && this.customerValid){

                          let obj = {
                          customer_name:this.customer_name,
                          customer_domain:this.customer_domain,
                          id:this.customer_id,
                          }

                          this.editCustomer(obj).then(()=>{
                          this.$refs.modals.dialog=false
                          this.handleOptions(this.$refs.dt.options,'');
                          });


                 }

                    }
         },
          data () {
             return {
                headers: [
                {text: 'Müşteri Adı', value: 'customer_name', sortable: false},
                {text: 'Müşteri Domain', value: 'customer_domain', sortable: false},
                {text: 'Actions', value: 'actions', sortable: false }
                ],
                loading:true,
                datatitle:'Müşteriler',
                keyItem:'customer_id',
                selectRules: [
                v => !!v || 'Bu alan Gerekli',
                ],
                customerValid:false,
                customer_name:'',
                customer_domain:'',
                MdlText:'Yeni Müşteri Ekle',
                mdlBtnText:'Yeni Müşteri Ekle',
                email:'',
                password:'',
                confirm_password:null,
                customer_id:0,


          }
}
}
</script>