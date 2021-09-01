/*eslint-disable*/
import Vue from 'vue';
export const state = () => ({
    iller : [],
})
export const getters = {
    getIlById: (state) => (id) => {
        return state.iller.find(il => il.id === id);
     },
}
export const mutations = {

    SET_ILLER(state,data){
        state.iller=data
    },
   
 
}
export const actions = {

    async getIller({commit}){
     return await this.$denetcimApi.$get('il').then(res=>{
        commit('SET_ILLER', res)
        return res;
     })
},

  
}