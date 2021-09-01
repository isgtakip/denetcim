/*eslint-disable*/
import Vue from 'vue';
export const state = () => ({
    nace_kodlari : [],
})
export const getters = {
    getallnaces(state){
        return state.nace_kodlari.data
    },
    getnacescount(state){
        return state.nace_kodlari.total
    },
    getnaceperpage(state){
        return state.nace_kodlari.per_page
    },
}
export const mutations = {

    SET_NACE_KODLARI_WITH_PAGES(state,data){
        state.nace_kodlari=data
    },

 
}
export const actions = {

    async getNaceKodlari({commit},request){
           
        var params = new URLSearchParams();
        params.append("page", request.page);
        params.append("per_page",request.per_page);
        params.append("search", request.arama);
    
        
        var gidecek = {
        params: params
        };
    
    
     return await this.$denetcimApi.$get('nace_kodlari', gidecek).then(res=>{
        commit('SET_NACE_KODLARI_WITH_PAGES', res)
        return res;
     })
     



},
}