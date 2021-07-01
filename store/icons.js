/*eslint-disable*/
export const getters = {}
export const state = () => ({
    icons:[],
})
export const mutations = {
    SET_ICONS(state,data){
        state.icons= data;
    },
    ADD_ICON(state,icon){
        state.icons.push(icon);
    }
}
export const actions = {
    async getIcons({commit}){
        const icons = await this.$denetcimApi.$get('/icons');
        commit('SET_ICONS',icons); 
        
    },
    async addIcon({commit},payload){
        commit('ADD_ICON',payload)
    }
}