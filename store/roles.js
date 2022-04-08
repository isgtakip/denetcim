/*eslint-disable*/
import Vue from 'vue';

export const state = () => ({
    roles:[],
    permissions:[],
    messagge:[],
    rolepermissions:[],
    allroles:[],
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
    SET_PERMISSIONS(state,data){
        state.permissions=data;
    },
    SET_ROLE_MESSAGGE(state,data){
        state.messagge = data;
    },
    SET_ROLE_PERMISSIONS(state,data){
        state.rolepermissions=data;
    },
    SET_ALL_ROLES(state,data){
        state.allroles=data;
    }
}

export const actions = {

    async getAllRoles({commit}){
        let res = await this.$denetcimApi.$get('getAllRoles');
        commit('SET_ALL_ROLES', res);
    },

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
   async getPermissions({commit},request){
    let res = await this.$denetcimApi.$get('roles/create');
    commit('SET_PERMISSIONS', res);
   },

   async saveRole({commit}, request){

    var params = new URLSearchParams;
    params.append ("name", request.name);
    params.append ("permission", request.permission);
   

    var gidecek = {
        params: params
    };
      
    let res=await this.$denetcimApi.post("roles",null, gidecek);
    commit('SET_ROLE_MESSAGGE',res.data);
   },

   async getPermissionsById({commit},request){

    let res = await this.$denetcimApi.get("roles/"+request)
    commit('SET_ROLE_PERMISSIONS',res.data);
   },

   async editRole({commit},request){

            var params = new URLSearchParams;
            params.append ("name", request.name);
            params.append ("permission", request.permission);

            var gidecek = {
                params: params
            };

            let res=await this.$denetcimApi.put("roles/"+request.id,null, gidecek);
            commit('SET_ROLE_MESSAGGE',res.data);
   },

   async roleDelete({commit}, request){
    let res = await this.$denetcimApi.$delete('roles/'+request).then(() => {      
    commit('SET_ROLE_MESSAGGE',res);
     
    });

    
}
}