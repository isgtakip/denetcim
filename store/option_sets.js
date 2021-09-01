
/*eslint-disable*/
import Vue from 'vue';
export const state = () => ({
    option_sets : [],
    optionsBySet:[],
})
export const mutations = {
    SET_OSETS(state,data){
        state.option_sets= data;
    },
    SET_OPT(state,data){
        state.optionsBySet= data;
    },
}
export const actions = {
    async getOptionSets({commit},request){
        const option_sets =await this.$denetcimApi.$get("/optionsets")
        commit('SET_OSETS',option_sets); 
    },
    async getOptionsBySet({commit},request){
        const optionsBySet = await this.$denetcimApi.$get(`optionsets/${request}/options`)
        commit('SET_OPT',optionsBySet); 
    }
}
