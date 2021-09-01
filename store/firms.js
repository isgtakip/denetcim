/*eslint-disable*/
import Vue from 'vue';

export const state = () => ({
    firmalar : [],
    firmaFormsData:[],
    messagge:[],
    firmaDetails:[],
    allFirms:[],
    ana_firmalar:[],
})

export const getters = {
    getAllFirmalar(state){
        return state.firmalar.data
    },
    getFirmalarCount(state){
        return state.firmalar.total
    },
    getFirmalarPerPage(state){
        return state.firmalar.per_page
    },
    getFirmaFormDatas(state){
        return state.firmaFormsData
    },
    getAlertMessagges(state){
        return state.messagge
    },
    getFirmaSingleRecord(state){
        return state.firmaDetails
    },
    getFirmaById: (state) => (id) => {
        return state.firmalar.data.find(firma => firma.firma_id === id)
    },
    getAllFirms(state){
        return state.allFirms
    }
}

export const mutations = {
    SET_FIRMALAR_WITH_PAGES_SEARCH(state,data){
        state.firmalar=data;
    },
    SET_FIRMA_FORMS_DATA(state,data){

        state.firmaFormsData=data;
    },
    SET_FIRMA_MESSAGGE(state,data){
        state.messagge = data;
    },
    SET_SINGLE_FIRMA(state,data){
        state.firmaDetails=data;
    },
    DELETE_FIRMA(state,id){
       const  index = state.firmalar.data.findIndex(firma => firma.firma_id === id);
       state.firmalar.data.splice(index, 1);
    },
    SET_ALL_FIRMS_DATA(state,data){
        state.allFirms=data;
    },
    SET_ANA_FIRMALAR(state,data){
        state.ana_firmalar=data;
    }
  
}
export const actions = {


    //tüm firma kayıtları combobox için
    async getAllFirmsData({commit}){
        let res = await this.$denetcimApi.$get('getFirmsAllData');
        commit('SET_ALL_FIRMS_DATA',res.data);

    },


    //verileri sayfalayarak alır 
    async getFirmalar({commit}, request) {

        
            var params = new URLSearchParams();
            params.append("page", request.page);
            params.append("search", request.arama);
            params.append("per_page",request.per_page);
            params.append("firma_tur",request.firma_tur);
            params.append("ust_firma_id",request.ust_firma_id)
            

            var gidecek = {
            params: params
            };
        

        let res = await this.$denetcimApi.$get('firmalar', gidecek);
        commit('SET_FIRMALAR_WITH_PAGES_SEARCH', res);
     
    
    },

    //firma tipleri combobox
    async getFirmaFormsData({commit}){
        let res = await this.$denetcimApi.$get('firma_form_data');
        commit('SET_FIRMA_FORMS_DATA',res);
    },

    async getAnaFirmalar({commit}){
        let res = await this.$denetcimApi.$get('ana_firmalar');
        commit('SET_ANA_FIRMALAR',res);
    },

    //add işlemi
    async yeniFirmaEkle({commit}, request){

        var params = new URLSearchParams;
        params.append ("firma_tip_id", request.firma_tip_id);
        params.append ("firma_kisa_ad", request.firma_kisa_ad);
        params.append ("firma_unvan", request.firma_unvan);
        params.append ("sahis_ad_soyad", request.sahis_ad_soyad);
        params.append ("firma_turu", request.firma_turu);
        params.append ("ust_firma_id", request.ust_firma_id);
        params.append ("nace_kod_id", request.nace_kod_id);
        params.append ("firma_sgk",request.firma_sgk);
        params.append ("firma_il_id", request.firma_il_id);
        params.append ("firma_ilce_id", request.firma_ilce_id);

        var gidecek = {
            params: params
        };
          
        let res=await this.$denetcimApi.$post("firmalar",null, gidecek);
        commit('SET_FIRMA_MESSAGGE',res.data);

    },

    //one firm record show
    async firmaShow({commit},request){

        let res = await this.$denetcimApi.$get("firmalar/"+request)
        commit('SET_SINGLE_FIRMA',res.data);

    },

    //edit
    async firmaDuzelt({commit}, request){
            


            var params = new URLSearchParams;
            
            params.append ("firma_tip_id", request.firma_tip_id);
            params.append ("firma_kisa_ad", request.firma_kisa_ad);
            params.append ("firma_unvan", request.firma_unvan);
            params.append ("sahis_ad_soyad", request.sahis_ad_soyad);
            params.append ("firma_turu", request.firma_turu);
            params.append ("ust_firma_id", request.ust_firma_id);
            params.append ("nace_kod_id", request.nace_kod_id);
            params.append ("firma_sgk",request.firma_sgk);
            params.append ("firma_il_id", request.firma_il_id);
            params.append ("firma_ilce_id", request.firma_ilce_id);

       
            var gidecek = {
                params: params
            };

      
            let res = await this.$denetcimApi.$put("firmalar/"+request.firma_id,null,gidecek);
            //o firmanın bilgileri geri dönsün 
            //state de sadece o firmanın bilgilerini güncelle 
            commit("SET_FIRMA_MESSAGGE",res.data)
    },

    //delete
    async firmaSil({commit}, request){

           
            let res = await this.$denetcimApi.$delete('firmalar/'+request).then(() => {      
            commit('SET_FIRMA_MESSAGGE',res);
                //state de o firmanın bilgilerini sil 
              
            });

            
    }





}