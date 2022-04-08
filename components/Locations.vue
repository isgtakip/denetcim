<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          md="12"
          sm="12"
          lg="12"
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
      </v-row>
    </v-container>
    <Datatable
      :headers="headers"
      :items="getAllFirmalar"
      :loading="loading"
      :items-length="getFirmalarCount"
      @handle-options="handleOptions"
      :title="datatitle"
      ref="dt"
      class="mr-3 ml-0"
      :slots="slots"
      :keyOfItem="keyItem"
      :showSelect="true"
      @clicked-row="clickedRow"
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
    ...mapState({
      firmalar: (state) => state.firms.firmalar,
      firma_tipleri: (state) => state.firms.firmaFormsData,
      ana_firmalar: (state) => state.firms.ana_firmalar,
    }),
    ...mapGetters({
      // you won't need to destructure if
      getFirmalarCount: "firms/getFirmalarCount",
      getFirmalarPerPage: "firms/getFirmalarPerPage",
      getAllFirmalar: "firms/getAllFirmalar",
    }),
  },
  created() {
    this.getFirmaFormsData();
    this.getAnaFirmalar();
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

    clickedRow(val) {
      this.secilen_lokasyon = val;
    },
  },
  data() {
    return {
      headers: [
        { text: "Lokasyon Adı", value: "firma_tam_unvan", sortable: false },
        { text: "Sgk Numarası", value: "firma_sgk", sortable: false },
        { text: "Nace Kodu", value: "nace_kodu", sortable: false },
        { text: "Tehlike Sınıfı", value: "tehlike_sinifi", sortable: false },
      ],
      slots: [
        {
          Id: 1,
          slotName: "tehlike_sinifi",
        },
      ],
      loading: true,
      datatitle: "Lokasyonlar",
      selectRules: [(v) => !!v || "Bu alan Gerekli"],
      status: null,
      firma_id: 0,
      ana_firma: {
        firma_id: 0,
      },
      keyItem: "firma_id",
      secilen_lokasyon: [],
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
  color: black;
}
</style>