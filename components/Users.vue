<template>
<div>
  <Datatable
        :headers="headers"
        :items="getAllUsers"
        :loading="loading"
        :items-length="getUsersCount"
        @handle-options="handleOptions"
        :title="datatitle"
        ref="dt"
        :keyOfItem="keyItem"
        :showSelect="true"
        @clicked-row="clickedRow"
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
        }),
        ...mapGetters({  // you won't need to destructure if 
        getUsersCount: 'users/getUsersCount',
        getUsersPerPage :'users/getUsersPerPage',
        getAllUsers:'users/getAllUsers',
        }),   
        },
         methods:{
          ...mapActions(
            {
            getUsers:'users/getUsers',
            }),
                    handleOptions(options,search){
                    let obj ={arama:search,page:options.page,per_page:options.itemsPerPage}
                    this.loading=true
                    this.getUsers(obj).then(result => {
                        this.loading = false
                    })
                    },
                    clickedRow(val){
                         this.secilen_user=val
                        }
         },
          data () {
             return {
                headers: [
                {text: 'User Name', value: 'name', sortable: false},
                {text: 'User Email', value: 'email', sortable: false},
                ],
                loading:true,
                datatitle:'Kullanıcılar',
                keyItem:'id',
                userName:'',
                email:'',
                roles:[],
                userId:0,
                secilen_user:[],


          }
}
}
</script>