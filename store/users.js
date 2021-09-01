/*eslint-disable*/
import Vue from 'vue';
export const state = () => ({
    users:[],
})

export const getters = {
    getAllUsers(state){
        return state.users.data
    },
    getUsersCount(state){
        return state.users.total
    },
    getUsersPerPage(state){
        return state.users.per_page
    },
}

export const mutations = {
    SET_USERS_WITH_PAGES_SEARCH(state,data){
        state.users=data;
    },
}

export const actions = {
    async getUsers({commit}, request) {

        
        var params = new URLSearchParams();
        params.append("page", request.page);
        params.append("search", request.arama);
        params.append("per_page",request.per_page);
        

        var gidecek = {
        params: params
        };
    

    let res = await this.$denetcimApi.$get('users', gidecek);
    commit('SET_USERS_WITH_PAGES_SEARCH', res);
 

},
}