<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          :md="calculateColumn"
          sm="12"
          :lg="calculateColumn"
          class="pl-0 mb-0 pb-0 pt-3 mt-0 pr-3"
        >
          <v-autocomplete
            v-model="ana_firma"
            :items="ana_firmalar"
            item-text="firma_tam_unvan"
            item-value="firma_id"
            :rules="selectRules"
            outlined
            dense
            small
            label="Firma Seçiniz"
            @change="ana_firma_change"
            return-object
          ></v-autocomplete>
        </v-col>
        <v-col
          cols="12"
          md="3"
          sm="12"
          lg="3"
          class="pl-0 mb-3 pb-3 pt-3 mt-0 pr-3"
          v-can="'location-create'"
        >
          <v-btn
            color="primary"
            class="text--white"
            block
            dense
            @click="clickedNew"
            :disabled="this.ana_firma.firma_id == 0"
            v-can="'location-create'"
          >
            Yeni Lokasyon Ekle
          </v-btn></v-col
        >
      </v-row>
    </v-container>
    <Modals
      ref="modals"
      @clicked-save="clickedSave"
      @clicked-new="clickedNew"
      :mdlText="MdlText"
      :mdlBtnText="mdlBtnText"
      :showbtn="false"
    >
      <v-list class="pl-0 mb-0">
        <v-form v-model="firmavalid" ref="firma_form">
          <v-list-item class="pb-0 mb-0 pb-0 mt-0">
            <v-list-item-content class="pl-1 mb-0 pb-0">
              <v-list-item-title>Lokasyon Kayıt</v-list-item-title>
              <v-list-item-subtitle
                >Lokasyon Temel Bilgilerini Giriniz</v-list-item-subtitle
              >
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
                      v-model="firma_tam_unvan"
                      :counter="255"
                      :rules="selectRules"
                      label="Lokasyon Adı"
                      outlined
                      dense
                      required
                    ></v-text-field
                  ></v-col>
                  <v-col
                    cols="12"
                    md="12"
                    sm="12"
                    lg="12"
                    class="pl-0 mb-0 pb-0"
                  >
                    <v-text-field
                      v-model="firma_sgk"
                      label="Sgk Numarası"
                      outlined
                      dense
                    ></v-text-field
                  ></v-col>
                  <v-col
                    cols="12"
                    md="12"
                    sm="12"
                    lg="12"
                    class="pl-0 mb-0 pb-0 custom"
                  >
                    <v-autocomplete
                      v-model="nace"
                      :items="naceler"
                      item-text="nace_kodu"
                      item-value="nace_kod_id"
                      class="combobox"
                      outlined
                      dense
                      label="Nace Kodu Seçiniz..."
                      readonly
                      disabled
                      :return-object="false"
                    >
                      <template v-slot:append class="nace">
                        <v-btn
                          class="searchBtn"
                          height="auto"
                          text
                          @click="showNace"
                        >
                          <v-icon>mdi-magnify</v-icon>
                          ARA
                        </v-btn>
                      </template>
                    </v-autocomplete></v-col
                  >
                  <v-col cols="12" md="6" sm="12" lg="6" class="pl-0 mb-0 pb-0">
                    <v-autocomplete
                      v-model="il"
                      :items="iller"
                      item-text="title"
                      item-value="id"
                      outlined
                      dense
                      label="İl Seçiniz"
                      @change="ilChange"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="6" sm="12" lg="6" class="pl-0 mb-0 pb-0">
                    <v-autocomplete
                      v-model="ilce"
                      :items="ilceler"
                      item-text="name"
                      item-value="id"
                      outlined
                      dense
                      label="İlçe Seçiniz"
                    ></v-autocomplete>
                  </v-col>
                  <v-col
                    cols="12"
                    md="12"
                    sm="12"
                    lg="12"
                    class="pl-0 mb-0 pb-0"
                  >
                    <v-textarea
                      v-model="adres"
                      outlined
                      name="input-7-4"
                      label="Adres"
                      value=""
                    ></v-textarea
                  ></v-col>
                </v-row>
              </v-container>
            </v-list-item-content>
          </v-list-item>
          <Modals
            ref="nacesmodal"
            @clicked-save="clickedNaceSave"
            mdlText="Nace Kodu Seç"
            :mdlBtnText="mdlBtnText"
            :fullscreen="true"
            :showbtn="false"
          >
            <NaceKodlari class="pl-2 pr-2 pt-5" ref="naceKod" />
          </Modals>
        </v-form>
      </v-list>
    </Modals>
    <Datatable
      :headers="tableHeaders"
      :items="getAllFirmalar"
      :loading="loading"
      :items-length="getFirmalarCount"
      @handle-options="handleOptions"
      :title="datatitle"
      @clicked-delete="clickedDelete"
      @clicked-edit="clickedEdit"
      ref="dt"
      class="mr-3 ml-0"
      :slots="slots"
      :keyOfItem="keyItem"
      :showDeleteBtn="this.$gates.hasPermission('location-delete')"
      :showEditBtn="this.$gates.hasPermission('location-edit')"
    >
      <template v-slot:tehlike_sinifi="{ degisken }">
        <v-chip :color="getColor(degisken.tehlike_sinifi)" small dark label>
          {{ degisken.tehlike_sinifi }}
        </v-chip>
      </template>
    </Datatable>
  </div>
</template>
<script>
/*eslint-disable*/
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import Vue from "vue";
export default {
  computed: {
    calculateColumn(){
       if (this.$gates.hasPermission('location-create')){
          return 9
       }
       else{
          return 12
        }
    },
    tableHeaders(){
       if (this.$gates.hasPermission('location-edit') || this.$gates.hasPermission('location-delete')){
         return [
        { text: "Lokasyon Adı", value: "firma_tam_unvan", sortable: false },
        { text: "Sgk Numarası", value: "firma_sgk", sortable: false },
        { text: "Nace Kodu", value: "nace_kodu", sortable: false },
        { text: "Tehlike Sınıfı", value: "tehlike_sinifi", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
        ];
       }
       else {
         return [
        { text: "Lokasyon Adı", value: "firma_tam_unvan", sortable: false },
        { text: "Sgk Numarası", value: "firma_sgk", sortable: false },
        { text: "Nace Kodu", value: "nace_kodu", sortable: false },
        { text: "Tehlike Sınıfı", value: "tehlike_sinifi", sortable: false },
        ];
       }

    },
    ...mapState({
      firmalar: (state) => state.firms.firmalar,
      firma_tipleri: (state) => state.firms.firmaFormsData,
      ana_firmalar: (state) => state.firms.ana_firmalar,
      iller: (state) => state.il_ilce.iller,
      selectedIl: (state) => state.il_ice.selectedIl,
    }),
    ...mapGetters({
      // you won't need to destructure if
      getFirmalarCount: "firms/getFirmalarCount",
      getFirmalarPerPage: "firms/getFirmalarPerPage",
      getAllFirmalar: "firms/getAllFirmalar",
      getIlById: "il_ilce/getIlById",
    }),
  },
  created() {
    this.getFirmaFormsData();
    this.getAnaFirmalar();
    this.getIller();
  },
  methods: {
    ...mapActions({
      getFirmalar: "firms/getFirmalar",
      getFirmaFormsData: "firms/getFirmaFormsData",
      yeniFirmaEkle: "firms/yeniFirmaEkle",
      firmaSil: "firms/firmaSil",
      firmaDuzelt: "firms/firmaDuzelt",
      getAnaFirmalar: "firms/getAnaFirmalar",
      getIller: "il_ilce/getIller",
    }),
    getColor(tehlike_sinifi) {
      if (tehlike_sinifi == "Az Tehlikeli") return "green";
      else if (tehlike_sinifi == "Tehlikeli") return "orange";
      else if (tehlike_sinifi == "Çok Tehlikeli") return "red";
    },
    ana_firma_change() {
      this.datatitle = this.ana_firma.firma_kisa_ad;
      this.handleOptions(this.$refs.dt.options, "");
    },
    clickedNaceSave() {
      if (this.$refs.naceKod.secilen_nace_kodu.length > 0)
        this.naceler.splice(0);
      this.naceler.push({
        nace_kodu: this.$refs.naceKod.secilen_nace_kodu.nace_kodu,
        nace_kod_id: this.$refs.naceKod.secilen_nace_kodu.nace_kod_id,
      });
      this.nace = this.$refs.naceKod.secilen_nace_kodu.nace_kod_id;
      this.$refs.nacesmodal.dialog = false;
    },
    ilChange() {
      let a = this.getIlById(this.il);
      if (a.ilce.length > 0) this.ilceler.splice(0);
      a.ilce.forEach((ilce) => {
        this.ilceler.push({
          name: ilce.name,
          id: ilce.id,
        });
      });
    },
    showNace() {
      this.$refs.nacesmodal.dialog = true;
    },

    handleOptions(options, search) {
      let obj = {
        arama: search,
        page: options.page,
        per_page: options.itemsPerPage,
        firma_tur: 1,
        ust_firma_id: this.ana_firma.firma_id,
      };
      this.loading = true;
      this.getFirmalar(obj).then((result) => {
        this.loading = false;
      });
    },
    clickedSave() {
      this.$refs.firma_form.validate();
      if (this.status == "new" && this.firmavalid) {
        let obj = {
          firma_tip_id: this.firma_tipi,
          firma_kisa_ad: this.firma_kisa_ad,
          firma_unvan: this.firma_tam_unvan,
          sahis_ad_soyad: this.sahis_ad_soyad,
          nace_kod_id: this.nace,
          firma_sgk: this.firma_sgk,
          firma_turu: 1,
          firma_il_id: this.il,
          firma_ilce_id: this.ilce,
          ust_firma_id: this.ana_firma.firma_id,
          firm_adres:this.adres,
          customer_id:this.ana_firma.customer_id,
        };

        this.yeniFirmaEkle(obj).then(() => {
          this.$refs.modals.dialog = false;
          this.handleOptions(this.$refs.dt.options, "");
        });
      }

      if (this.status == "edit" && this.firmavalid) {
        let obj = {
          firma_id: this.firma_id,
          firma_tip_id: this.firma_tipi,
          firma_kisa_ad: this.firma_kisa_ad,
          firma_unvan: this.firma_tam_unvan,
          sahis_ad_soyad: this.sahis_ad_soyad,
          nace_kod_id: this.nace,
          firma_sgk: this.firma_sgk,
          firma_turu: 1,
          firma_il_id: this.il,
          firma_ilce_id: this.ilce,
          ust_firma_id: this.ana_firma.firma_id,
          firm_adres:this.adres,
          customer_id:this.ana_firma.customer_id,
        };



        this.firmaDuzelt(obj).then(() => {
          this.$refs.modals.dialog = false;
          this.handleOptions(this.$refs.dt.options, "");
        });
      }
    },
    clickedEdit(val) {
      console.log(val);
      this.MdlText = "Lokasyon Düzelt";
      console.log(val);
      this.firma_id = val.firma_id;
      this.status = "edit";
      this.firma_tam_unvan = val.firma_tam_unvan;
      this.firma_kisa_ad = val.firma_kisa_ad;
      this.sahis_ad_soyad = val.sahis_ad_soyad;
      this.firma_tipi = val.firma_tip_id;
      this.firma_sgk = val.firma_sgk;
      this.adres=val.firm_adres;
      //naceler
      this.naceler.splice(0);
      this.naceler.push({
        nace_kodu: val.nace_kodu,
        nace_kod_id: val.nace_kod_id,
      });
      this.nace = val.nace_kod_id;
      this.il = val.firma_il_id;
      this.ilChange();
      this.ilce = val.firma_ilce_id;
      this.$refs.modals.dialog = true;
    },
    clickedDelete(val) {
      this.firmaSil(val.firma_id).then(() => {
        this.handleOptions(this.$refs.dt.options, "");
      });
    },
    clickedNew() {
      this.$refs.modals.dialog = true;
      this.MdlText = "Yeni Lokasyon Ekle";
      this.firma_tam_unvan = "";
      this.firma_kisa_ad = "";
      this.firma_tipi = 0;
      this.sahis_ad_soyad = "";
      this.status = "new";
      this.adres ="";
      this.firma_sgk="";
      this.il=0;
      this.ilce=0;
      this.nace=0;
    },
  },
  data() {
    return {
      slots: [
        {
          Id: 1,
          slotName: "tehlike_sinifi",
        },
      ],
      loading: true,
      datatitle: "Lokasyonlar",
      MdlText: "Yeni Lokasyon Ekle",
      mdlBtnText: "Yeni Lokasyon Ekle",
      selectRules: [(v) => !!v || "Bu alan Gerekli"],
      firmavalid: false,
      firma_tam_unvan: "",
      firma_kisa_ad: "",
      firma_tipi: 0,
      status: null,
      sahis_ad_soyad: "",
      firma_id: 0,
      ana_firma: {
        firma_id: 0,
      },
      firma_sgk: null,
      il: 0,
      ilce: 0,
      ilceler: [],
      adres: "",
      nace: 0,
      naceler: [],
      keyItem: "firma_id",
    };
  },
};
</script>
<style>
.searchBtn {
  background-color: blue;
  border-radius: 0 4px 4px 0;
  width: 100%;
}
.custom .v-input__append-inner {
  margin: 0 !important;
  padding: 0 !important;
  width: 20%;
  height: 100%;
}
.custom .v-input__slot {
  padding-right: 0 !important;
}
.theme--light.v-btn {
  color: white;
}
</style>