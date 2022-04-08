/*eslint-disable*/
import Vue from 'vue';

export const state = () => ({
    audits : [],
    messagge:[],
})

export const getters = {
    getallaudits(state){
        return state.audits.data
    },
    getauditscount(state){
        return state.audits.total
    },
    getauditsperpage(state){
        return state.audits.per_page
    },
    getauditslastpage(state){
        return state.audits.last_page
    },
    getauditscurrentpage(state){
        return state.audits.current_page
    },
}

export const mutations = {

    SET_AUDIT_WITH_PAGES_SEARCH(state,data){
        state.audits=data
    },
    SET_FIRMA_MESSAGGE(state,data){
        state.messagge = data;
    },
}

export const actions = {
    
    

    async denetlemeEkle({commit}, request){

        var params = new URLSearchParams;
        params.append ("title", request.denetleme_title);
        params.append ("start_date", request.startDate);
        params.append ("end_date", request.endDate);
        params.append ("period", request.period);
        params.append ("location_ids", request.locations);
        params.append ("sablon_ids", request.sablonlar);
        params.append ("user_ids", request.uzmanlar);
       
        var gidecek = {
            params: params
        };

        let res=await this.$denetcimApi.$post("audits",null, gidecek);
        commit('SET_FIRMA_MESSAGGE',res.data);
    },


    

    async getAuditsWithPage({commit}, request) {

        var params = new URLSearchParams;
        params.append("page", request.page);
        params.append("search", request.arama);
        params.append("status", request.status);

        var gidecek = {
        params: params
        };

       
        await this.$denetcimApi.$get('audits',gidecek).then(res=>{
            commit('SET_AUDIT_WITH_PAGES_SEARCH', res);
         });
        
    },
}
