/*eslint-disable*/
import Vue from 'vue';
export const state = () => ({
    users:[],
    messagge:[],
    userrole:[],
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
    SET_USER_MESSAGGE(state,data){
        state.messagge = data;
    },
    SET_USER_ROLE(state,data){
        state.userrole = data;
    }
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

    async saveUser({commit}, request){

        var params = new URLSearchParams;
        params.append ("name", request.name);
        params.append ("password", request.password);
        params.append ("email", request.email);
        params.append ("confirm_password", request.confirm_password);
        params.append ("roles",request.roles);
    
        var gidecek = {
            params: params
        };
          
        let res=await this.$denetcimApi.post("users",null, gidecek);
        commit('SET_USER_MESSAGGE',res.data);
       },

       async editUser({commit},request){

        var params = new URLSearchParams;

        params.append ("name", request.name);
        params.append ("password", request.password);
        params.append ("email", request.email);
        params.append ("confirm_password", request.confirm_password);
        params.append ("roles",request.roles);

        var gidecek = {
            params: params
        };

        let res=await this.$denetcimApi.put("users/"+request.id,null, gidecek);
        commit('SET_USER_MESSAGGE',res.data);
        },

        async userDelete({commit}, request){
            let res = await this.$denetcimApi.$delete('users/'+request).then(() => {      
            commit('SET_USER_MESSAGGE',res);
             
        });

        },

        async getRoleById({commit},request){

            let res = await this.$denetcimApi.get("users/"+request)
            commit('SET_USER_ROLE',res.data.role_id[0]);
           },

}