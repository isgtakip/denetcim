/*eslint-disable*/
export const state = () => ({
    q_types : [],
})
export const mutations = {
    SET_Q_TYPES(state,data){
        state.q_types= data;
    },
}
export const actions = {

    async getQuestionTypes({commit},request){
        const res = await this.$denetcimApi.$get('/questiontypes')
        commit('SET_Q_TYPES',res); 
    },
}

