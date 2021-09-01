/*eslint-disable*/
import Vue from 'vue';

export const state = () => ({
    roles:[],
})

export const getters = {
    getAllRoles(state){
        return state.roles.data
    },
    getRolesCount(state){
        return state.roles.total
    },
    getRolesPerPage(state){
        return state.roles.per_page
    },
}

export const mutations = {
    SET_ROLES_WITH_PAGES_SEARCH(state,data){
        state.roles=data;
    },
}

export const actions = {
    async getRoles({commit}, request) {

        
        var params = new URLSearchParams();
        params.append("page", request.page);
        params.append("search", request.arama);
        params.append("per_page",request.per_page);
        

        var gidecek = {
        params: params
        };
    

    let res = await this.$denetcimApi.$get('roles', gidecek);
    commit('SET_ROLES_WITH_PAGES_SEARCH', res);
 

},
}