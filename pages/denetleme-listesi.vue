<template>
<div>
 <v-card class=" mb-5 pa-3" dense >
<div class="row">
 <div class="col-md-4" style="background-color:#fff;">
      <v-btn
      block
      color="primary"
      depressed
      class="custom_btn mb-3"
      @click="showModal()"
      >
    Yeni Denetleme Ekle
  </v-btn>
  <v-text-field
            label="Denetleme Ara"
            append-icon="mdi-magnify"
            outlined
            single-line
            dense
            small
            class="mb-2"
            hide-details="true"
          ></v-text-field>
  <v-tabs
  show-arrows
  class="mt-0 pt-0 mb-0"
  >
  <v-tab
  @click="getTab('All')">
        <v-icon left>
          mdi-account
        </v-icon>
        Hepsi
      </v-tab>
      <v-tab
      @click="getTab('Planlanan')">
        <v-icon left>
          mdi-lock
        </v-icon>
        Planlananlar
      </v-tab>
      <v-tab
      @click="getTab('Devam')">
        <v-icon left>
          mdi-account
        </v-icon>
        Devam Edenler
      </v-tab>
      <v-tab
       @click="getTab('Completed')">
        <v-icon left>
          mdi-access-point
        </v-icon>
        Gerçekleşenler
      </v-tab>
      <v-tab
       @click="getTab('Decline')">
        <v-icon left>
          mdi-access-point
        </v-icon>
        İptal Edilenler
      </v-tab>
    </v-tabs>
    <div class="col-md-12" style="background-color:#efefef;">
    <EventCard
    v-for="audit in getallaudits"
    :key="audit.audit_location_id"
    :tamamlanmaOrani="audit.tamamlanma_orani"
    :startDate="audit.start_date"
    :locationName="audit.firma_tam_unvan"
    :adres="audit.firm_adres"
    :il="audit.il"
    :ilce="audit.ilce"
    :link="audit.audit_location_id"
    class="mb-2"/>
    <div class="text-center">
    <v-pagination
      v-model="page"
      :length=1
      circle
    ></v-pagination>
  </div>
    </div>
<Modals
ref="modals"
@clicked-save="clickedSave"
:mdlText="MdlText"
:mdlBtnText="mdlBtnText"
:showbtn="false">
<Denetleme ref="denetleme" :stats="status" @modal-close="closeModal"/>
</Modals>
    </div>
    <div class="col-md-8">
    <Calendar/>
</div>
</div>
 </v-card>
</div>
</template>
<script>
/*eslint-disable*/
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
import Vue from 'vue';
export default {
      computed: {
          ...mapState({
            audits: (state) => state.audits.audits,
            }),
            ...mapGetters({
              // you won't need to destructure if
              getauditscount: "audits/getauditscount",
              getauditsperpage: "audits/getauditsperpage",
              getallaudits: "audits/getallaudits",
              getauditslastpage: "audits/getauditslastpage",
              getauditscurrentpage: "audits/getauditscurrentpage",
            }),
        },
       created() {
        // this.handleOptions(1,'');
      },
     data () {
             return {
                 mdlBtnText:'Yeni Denetleme Oluştur',
                 MdlText:'Denetleme Oluştur',
                  headers: [
                    {text: 'Denetleme Adı', value: 'name', sortable: false},
                    {text: 'Baş. Tarihi', value: 'email', sortable: false},
                  ],
                  status:null,
                  page:1
             }
     },
     methods:{
        ...mapActions({
            getAuditsWithPage: "audits/getAuditsWithPage",
        }),

        handleOptions(page, search,status) {

            let obj =
            {
            arama:search,
            page:page,
            status:status
            };


            this.getAuditsWithPage(obj).then(result => {
                  console.log(result)
            })
          },

         clickedSave(){
             
         },
         getTab(status){
           this.handleOptions(this.page,"",status)
         },
         //yeni denetleme ekle 
         showModal(){
             this.status='new'
             this.$refs.modals.dialog=true;
         },
         closeModal(){
            this.$refs.modals.dialog=false;
         }  
     }
}
</script>
<style>
.cstm_tabs{
    color:#efefef;
}
.custom_btn{
   padding-top: 0px;
    font-size: 10px !important;
    height: 31px !important;
}
#custom_tabs{
    font-size:8px !important;
}
.v-tab {
text-transform: none !important;
font-size:9px !important;
height: 40px;
max-width: 30px;
}


.v-slide-group.v-item-group > .v-slide-group__next, .v-slide-group.v-item-group > .v-slide-group__prev {
    cursor: pointer;
    background-color: white;
    height: 40px !important;
    width:10px !important;
    min-width: 20px !important;
    
}

.v-slide-group__wrapper{
    height: 40px !important;
}
.v-slide-group{
     height: 40px !important;
     background-color: #efefef;
}
.theme--light.v-tabs > .v-tabs-bar {
    background-color: #efefef;
}

</style>