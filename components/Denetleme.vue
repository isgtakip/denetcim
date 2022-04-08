<template>
<div class="">
  <v-stepper
    v-model="e6"
    vertical
    class="ml-2 mr-2 pl-0"
  >
    <v-stepper-step
      :complete="e6 > 1"
      step="1"
      editable
    >
      Denetleme Bilgileri
      <small>Denetleme Bilgilerini Giriniz</small>
    </v-stepper-step>
    <v-stepper-content step="1">
      <v-card
        class="mb-3 abc"
        outlined
      >
      <v-form v-model="denetlemevalid" ref="denetleme_form" >
<v-list-item class="pb-0 mb-0 pb-0 mt-0" >
            <v-list-item-content class="pl-1 mb-0 pb-0">
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
      v-model="denetleme_title"
      :counter="255"
      label="Denetleme Başlığı"
      outlined
      dense
      small
      :rules="selectRules"
      required
    ></v-text-field></v-col>
     <v-col
       cols="12"
        md="6"
        sm="12"
        lg="6"
         class="pl-0 mb-0 pb-0"
       >
       <DatePicker
        :date="startDate"
        @update="(v) => (startDate = v)"
        title="Başlangıç Tarihi"
        @changed-date="changedStartDate"
       />
       </v-col>
       <v-col
       cols="12"
        md="6"
        sm="12"
        lg="6"
         class="pl-0 mb-0 pb-0"
       >
       <DatePicker
        :date="endDate"
        @update="(v) => (endDate = v)"
        title="Bitiş Tarihi"
        @changed-date="changedEndDate"
       />
       </v-col>
       <v-col
       cols="12"
        md="12"
        sm="12"
        lg="12"
         class="pl-0 mb-0 pb-0"
       >
       <v-autocomplete
            v-model="denetleme_periyot"
            :items="denetleme_periyotlari"
            item-text="periyot"
            item-value="value"
            :rules="selectRules"
            outlined
            dense
            label="Denetleme Periyodu"
          ></v-autocomplete>
       </v-col>
     </v-row>
    </v-container>
    </v-list-item-content>
     </v-list-item>
      </v-form>
      </v-card>
      <v-btn
        color="primary"
        @click.native="e6 = 2"
        :disabled="!(this.denetlemevalid)"
      >
        Devam
      </v-btn>
    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 2"
      step="2"
      editable
    >
      Lokasyon Seçimi
    </v-stepper-step>
    <v-stepper-content
    step="2"
    >
      <v-card
       class="mb-3 abc"
        outlined
      >
     <v-data-table
      :headers="locations_headers"
      :items="locations"
      >
       <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>
         <Modals
        ref="locationmodal"
        @clicked-save="clickedLocationSave"
        mdlText="Lokasyon Seç"
        :mdlBtnText="mdlLocationBtnText"
        :fullscreen="true"
        :showbtn="true">
        <Locations class="pl-2 pr-2 pt-5" ref="locationselect"/>
        </Modals>
        </v-list>
        </Modals>
        </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
      <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            small
            @click="deleteItem(item,locations)">mdi-delete</v-icon>
      </template></v-data-table>
      </v-card>
      <v-btn
        color="primary"
        @click.native="e6 = 3"
        :disabled="!(this.locations.length>0)"
      >
        Devam
      </v-btn>
    </v-stepper-content>
    <v-stepper-step
      :complete="e6 > 3"
      step="3"
      editable
    >
     Uzman Seçimi
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card
       class="mb-3 abc"
        outlined
      >
     <v-data-table
      :headers="uzman_headers"
      :items="uzmanlar"
      >
       <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>
         <Modals
        ref="uzmanmodal"
        @clicked-save="clickedUzmanSave"
        mdlText="Uzman Seç"
        :mdlBtnText="mdlUzmanText"
        :fullscreen="true"
        :showbtn="true">
        <Users class="pl-2 pr-2 pt-5" ref="userselect"/>
        </Modals>
           </v-form>
        </v-list>
        </Modals>
        </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
      <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            small
            @click="deleteItem(item,uzmanlar)">mdi-delete</v-icon>
      </template></v-data-table>
      </v-card>
      <v-btn
        color="primary"
        @click.native="e6 = 4"
        :disabled="!(this.uzmanlar.length>0)"
      >
        Devam
      </v-btn>
    </v-stepper-content>

    <v-stepper-step
    step="4"
    editable>
    Soru Şablon Seçimi
    </v-stepper-step>
    <v-stepper-content step="4">
     <v-card
       class="mb-3 abc"
        outlined
      >
       <v-data-table
      :headers="sablon_headers"
      :items="sablonlar"
      >
       <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>
         <Modals
        ref="sablonmodal"
        @clicked-save="clickedSablonSave"
        mdlText="Şablon Seç"
        :mdlBtnText="mdlSablonText"
        :fullscreen="true"
        :showbtn="true">
        <Sablonlar class="pl-2 pr-2 pt-5" ref="sablonselect"/>
        </Modals>
           </v-form>
        </v-list>
        </Modals>
        </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
      <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            small
            @click="deleteItem(item,sablonlar)">mdi-delete</v-icon>
      </template></v-data-table>
    </v-card>
      <v-btn
        color="primary"
         @click.native="denetleme_kaydet()"
        :disabled="!(this.sablonlar.length>0 && this.uzmanlar.length>0 && this.denetlemevalid && this.uzmanlar.length>0)"
      >
        Bitir
      </v-btn>
      <v-btn
      text>
        Cancel
      </v-btn>
    </v-stepper-content>
  </v-stepper>
</div>
</template>
<script>
/*eslint-disable*/
 import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
  export default {
    props:{
      stats:{
        type: String,
        default:null,
      }
    },
    data () {
      return {
         e6: 1,
         denetlemevalid:false,
         startDate:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
         endDate:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
         denetleme_periyot:0,
         denetleme_title:'',
         denetleme_periyotlari:[
              {
                 periyot:'3 AY',
                 value:3
             },
              {
                 periyot:'6 AY',
                 value:6
             },
              {
                 periyot:'12 AY',
                 value:12
             }
         ],
          selectRules: [
          v => !!v || 'Bu alan Gerekli',
          ],
          locations_headers:[
          {text: 'Ana Firma', value: 'ana_firma' , sortable: false},
          {text: 'Lokasyon', value: 'lokasyon_adi' , sortable: false},
          {text: 'Sgk Numarası', value: 'firma_sgk' , sortable: false},
          {text: 'Nace Kodu', value: 'nace_kodu' , sortable: false},
          {text: 'Tehlike Sınıfı', value: 'tehlike_sinifi' , sortable: false},
          {text: 'Actions', value: 'actions', sortable: false },
          ],
          uzman_headers:[
               {text: 'Kullanıcı Adı Soyadı', value: 'user_name' , sortable: false},
               {text: 'Email', value: 'email' , sortable: false},
               {text: 'Actions', value: 'actions', sortable: false },
          ],
          sablon_headers:[
              {text: 'Şablon Adı', value: 'audit_form_name' , sortable: false},
              {text: 'Şablon Form No', value: 'audit_form_no' , sortable: false},
              {text: 'Actions', value: 'actions', sortable: false },
          ],
          locations:[],
          mdlLocationBtnText:'Lokasyon Seç',
          mdlUzmanText:'Uzman Seç',
          mdlSablonText:'Şablon Seç',
          uzmanlar:[],
          sablonlar:[],
      }
    },
    methods: {
        ...mapActions({
            denetlemeEkle: "audits/denetlemeEkle",
          }),
         deleteItem(val,obj){
          obj.splice(obj.indexOf(val), 1);
         },
        clickedLocationSave(){ 
                //eğer lokasyon seçildi ise 
                console.log(Object.keys(this.$refs.locationselect.secilen_lokasyon).length)
                if (Object.keys(this.$refs.locationselect.secilen_lokasyon).length) {
                var exists = this.locations.some(o => o.location_id === this.$refs.locationselect.secilen_lokasyon.firma_id);
                if(exists==false){
                this.locations = [];
                this.locations.push({
                location_id:this.$refs.locationselect.secilen_lokasyon.firma_id,
                ana_firma:this.$refs.locationselect.ana_firma.firma_kisa_ad,
                lokasyon_adi:this.$refs.locationselect.secilen_lokasyon.firma_tam_unvan,
                firma_sgk:this.$refs.locationselect.secilen_lokasyon.firma_sgk,
                nace_kodu:this.$refs.locationselect.secilen_lokasyon.nace_kodu,
                tehlike_sinifi:this.$refs.locationselect.secilen_lokasyon.tehlike_sinifi,
                })
                }
                }
                this.$refs.locationmodal.dialog=false;
        },
        clickedUzmanSave(){
                 if (Object.keys(this.$refs.userselect.secilen_user).length) {
                    var exists = this.uzmanlar.some(o => o.id === this.$refs.userselect.secilen_user.id);
                    
                     if(exists==false){
                      this.uzmanlar.push({
                      id:this.$refs.userselect.secilen_user.id,
                      user_name:this.$refs.userselect.secilen_user.name,
                      email:this.$refs.userselect.secilen_user.email,
                })
                }
                }
                this.$refs.uzmanmodal.dialog=false;
        },
        clickedSablonSave(){
                    if (Object.keys(this.$refs.sablonselect.secilen_sablon).length) {
                    var exists = this.sablonlar.some(o => o.audit_form_id === this.$refs.sablonselect.secilen_sablon.audit_form_id);
                    
                     if(exists==false){
                      this.sablonlar.push({
                      audit_form_id:this.$refs.sablonselect.secilen_sablon.audit_form_id,
                      audit_form_name:this.$refs.sablonselect.secilen_sablon.audit_form_name,
                      audit_form_no:this.$refs.sablonselect.secilen_sablon.audit_form_no,
                })
                }
                }
                this.$refs.sablonmodal.dialog=false;
        },
        changedStartDate(val){
          this.startDate=val
        },
        changedEndDate(val){
          this.endDate=val
        },
        denetleme_kaydet(){
            // yeni kayıt
            if (this.stats='new') {
                      let obj = {
                             denetleme_title:this.denetleme_title,
                             startDate:this.startDate,
                             endDate:this.endDate,
                             period:this.denetleme_periyot,
                             locations:JSON.stringify(this.locations),
                             uzmanlar:JSON.stringify(this.uzmanlar),
                             sablonlar:JSON.stringify(this.sablonlar)
                         }
                 this.denetlemeEkle(obj).then(()=>{
                 this.$emit('modal-close')
                // this.$refs.modals.dialog=false
                 //denetleme listesi populate edilecek
             });
            }
         },
    }
  }
</script>
<style>
.v-sheet.v-card.abc {
  border: 1px dashed #ccc;
}
.v-stepper--vertical .v-stepper__step {
    padding-top: 10px !important;
    padding-bottom: 10px !important;
}
.v-stepper__wrapper{
  margin-bottom:2px !important;
}
.v-stepper--is-booted.v-stepper--vertical.v-sheet{
  padding-bottom:3px !important;
}
</style>