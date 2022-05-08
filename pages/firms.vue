<template>
  <div>
    <v-card class="pb-3 pl-3 mb-5 pt-3" outlined>
      <Modals
        ref="modals"
        @clicked-save="clickedSave"
        @clicked-new="clickedNew"
        :mdlText="MdlText"
        :mdlBtnText="mdlBtnText"
      >
        <v-list class="pl-0 mb-0">
          <v-form v-model="firmavalid" ref="firma_form">
            <v-list-item class="pb-0 mb-0 pb-0 mt-0">
              <v-list-item-content class="pl-1 mb-0 pb-0">
                <v-list-item-title>Firma Kayıt</v-list-item-title>
                <v-list-item-subtitle
                  >Firma Temel Bilgilerini Giriniz</v-list-item-subtitle
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
                        label="Firma Tam Ünvan"
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
                        v-model="firma_kisa_ad"
                        :counter="255"
                        :rules="selectRules"
                        label="Firma Kısa Ad"
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
                      <v-autocomplete
                        v-model="firma_tipi"
                        :items="firma_tipleri"
                        item-text="firma_tip"
                        item-value="firma_tip_id"
                        :rules="selectRules"
                        outlined
                        dense
                        label="Firma Tipi"
                      ></v-autocomplete>
                    </v-col>
                    <v-col
                      cols="12"
                      md="12"
                      sm="12"
                      lg="12"
                      class="pl-0 mb-0 pb-0"
                      v-if="this.firma_tipi == 2"
                    >
                      <v-text-field
                        v-model="sahis_ad_soyad"
                        :counter="255"
                        :rules="selectRules"
                        label="Şahıs Ad Soyad"
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
                      v-if="this.$auth.user.customer_id==null || this.$auth.user.customer_id==0"
                    >
                     <v-autocomplete
                        v-model="customer_id"
                        :items="customers"
                        item-text="customer_name"
                        item-value="customer_id"
                        :rules="selectRules"
                        outlined
                        dense
                        label="Müşteri Seçiniz"
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
      :items="getAllFirmalar"
      :loading="loading"
      :items-length="getFirmalarCount"
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
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import Vue from "vue";
export default {
  computed: {
    ...mapState({
      firmalar: (state) => state.firms.firmalar,
      firma_tipleri: (state) => state.firms.firmaFormsData,
      customers:  (state) => state.customers.customers,
    }),
    ...mapGetters({
      getFirmalarCount: "firms/getFirmalarCount",
      getFirmalarPerPage: "firms/getFirmalarPerPage",
      getAllFirmalar: "firms/getAllFirmalar",
    }),
  },
  async created() {
    await this.getFirmaFormsData();
    await this.getAllCustomersWithoutPage();
  },
  methods: {
    ...mapActions({
      getFirmalar: "firms/getFirmalar",
      getFirmaFormsData: "firms/getFirmaFormsData",
      yeniFirmaEkle: "firms/yeniFirmaEkle",
      firmaSil: "firms/firmaSil",
      firmaDuzelt: "firms/firmaDuzelt",
      getAllCustomersWithoutPage: "customers/getAllCustomersWithoutPage"
    }),
    handleOptions(options, search) {
      let obj = {
        arama: search,
        page: options.page,
        per_page: options.itemsPerPage,
        firma_tur: 0,
        ust_firma_id: 0,
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
          firma_turu: 0,
          ust_firma_id: 0,
          nace_kod_id: 0,
          firma_sgk: 0,
          firma_il_id: 0,
          firma_ilce_id: 0,
          adres:"",
          customer_id:this.customer_id
        };
        console.log(this.customer_id)
        this.yeniFirmaEkle(obj).then(() => {
          this.$refs.modals.dialog = false;
          this.handleOptions(this.$refs.dt.options, "");
        });
      }

      if (this.status == "edit" && this.firmavalid) {
        let obj = {
          firma_tip_id: this.firma_tipi,
          firma_kisa_ad: this.firma_kisa_ad,
          firma_unvan: this.firma_tam_unvan,
          sahis_ad_soyad: this.sahis_ad_soyad,
          firma_id: this.firma_id,
          firma_turu: 0,
          ust_firma_id: 0,
          nace_kod_id: 0,
          firma_sgk: 0,
          firma_il_id: 0,
          firma_ilce_id: 0,
          adres:"",
          customer_id:this.customer_id
        };
        this.firmaDuzelt(obj).then(() => {
          this.$refs.modals.dialog = false;
          this.handleOptions(this.$refs.dt.options, "");
        });
      }
    },
    clickedEdit(val) {
      this.MdlText = "Firma Düzelt";
      console.log(val);
      this.firma_id = val.firma_id;
      this.status = "edit";
      this.firma_tam_unvan = val.firma_tam_unvan;
      this.firma_kisa_ad = val.firma_kisa_ad;
      this.sahis_ad_soyad = val.sahis_ad_soyad;
      this.firma_tipi = val.firma_tip_id;
      this.$refs.modals.dialog = true;
      this.customer_id=val.customer_id;
    },
    clickedDelete(val) {
      this.firmaSil(val.firma_id).then(() => {
        this.handleOptions(this.$refs.dt.options, "");
      });
    },
    clickedNew() {
      this.MdlText = "Yeni Firma Ekle";
      this.firma_tam_unvan = "";
      this.firma_kisa_ad = "";
      this.firma_tipi = 0;
      this.sahis_ad_soyad = "";
      this.status = "new";
      this.customer_id = this.$auth.user.customer_id;
    },
  },
  data() {
    return {
      headers: [
        { text: "Firma Ünvan", value: "firma_tam_unvan", sortable: false },
        { text: "Firma Kısa Ad", value: "firma_kisa_ad", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      loading: true,
      datatitle: "Ana Firmalar",
      MdlText: "Yeni Firma Ekle",
      mdlBtnText: "Yeni Firma Ekle",
      selectRules: [(v) => !!v || "Bu alan Gerekli"],
      firmavalid: false,
      firma_tam_unvan: "",
      firma_kisa_ad: "",
      firma_tipi: 0,
      status: null,
      sahis_ad_soyad: "",
      firma_id: 0,
      keyItem: "firma_id",
      customer_id:this.$auth.user.customer_id,
    };
  },
};
</script>