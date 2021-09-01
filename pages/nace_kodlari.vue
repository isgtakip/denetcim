<template>
 <div>
        <Datatable
        :headers="headers"
        :items="getallnaces"
        :loading="loading"
        :items-length="getnacescount"
        @handle-options="handleOptions"
        :title="datatitle"
        :slots="slots">
         <template v-slot:tehlike_sinifi="{ degisken }">
                  <v-chip
                  :color="getColor(degisken.tehlike_sinifi)"
                  small
                  dark
                  label
                >
                {{degisken.tehlike_sinifi}}
                </v-chip>
            </template>
        </Datatable></div></template>
<script>
/*eslint-disable*/
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
import Vue from 'vue';
export default {
    computed:{
      ...mapState({
        nace_kodlari : state=> state.nace_kodlari.nace_kodlari,
      }),
      ...mapGetters({  // you won't need to destructure if 
      getnacescount: 'nace_kodlari/getnacescount',
      getnaceperpage :'nace_kodlari/getnaceperpage',
      getallnaces:'nace_kodlari/getallnaces'
    }),
    },
    
     methods:{
     ...mapActions(
        {
        getNaceKodlari:'nace_kodlari/getNaceKodlari',
        }),
        handleOptions(options,search){
          let obj ={arama:search,page:options.page,per_page:options.itemsPerPage}
          this.loading=true
          this.getNaceKodlari(obj).then(result => {
            this.loading = false
          })
        },
        getColor (tehlike_sinifi) {
        if (tehlike_sinifi == 'Az Tehlikeli') return 'green'
        else if (tehlike_sinifi == 'Tehlikeli') return 'orange'
        else if (tehlike_sinifi == 'Çok Tehlikeli') return 'red'
        },
     
       clickedEdit(val){
       },
       clickedDelete(val){

       },
 },
 data () {
      return {
          arama:'',
          headers: [
          {text: 'Nace Kodu', value: 'nace_kodu', sortable: false},
          {text: 'Faaliyet', value: 'faaliyet' , sortable: false},
          {text: 'Tehlike Sınıfı', value: 'tehlike_sinifi' , sortable: false},
          ],
          datatitle:'Nace Kodları', 
          loading:true,
          slots:[{ 
          Id: 1, slotName: 'tehlike_sinifi'
          }],

      }
}
}
</script>