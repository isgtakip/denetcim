/*eslint-disable*/
import Vue from 'vue';
export const state = () => ({
    customers:[],
    messagge:[],
})

export const getters = {
    getAllCustomers(state){
        return state.customers.data
    },
    getCustomersCount(state){
        return state.customers.total
    },
    getCustomersPerPage(state){
        return state.customers.per_page
    },
}

export const mutations = {
    SET_CUSTOMERS_WITH_PAGES_SEARCH(state,data){
        state.customers=data;
    },
    SET_CUSTOMERS_MESSAGGE(state,data){
        state.messagge = data;
    },
}

export const actions = {
    async getCustomers({commit}, request) {

        
        var params = new URLSearchParams();
        params.append("page", request.page);
        params.append("search", request.arama);
        params.append("per_page",request.per_page);
        

        var gidecek = {
        params: params
        };

    let res = await this.$denetcimApi.$get('customers', gidecek);
    commit('SET_CUSTOMERS_WITH_PAGES_SEARCH', res);
    },

    async saveCustomer({commit}, request){

        var params = new URLSearchParams;
        params.append ("customer_name", request.customer_name);
        params.append ("customer_domain", request.customer_domain);

        var gidecek = {
            params: params
        };
          
        let res=await this.$denetcimApi.post("customers",null, gidecek);
        commit('SET_CUSTOMERS_MESSAGGE',res.data);
       },

       async editCustomer({commit},request){

        var params = new URLSearchParams;

        params.append ("customer_name", request.customer_name);
        params.append ("customer_domain", request.customer_domain);


        var gidecek = {
            params: params
        };

        let res=await this.$denetcimApi.put("customers/"+request.id,null, gidecek);
        commit('SET_CUSTOMERS_MESSAGGE',res.data);
        },

        async customerDelete({commit}, request){
            let res = await this.$denetcimApi.$delete('customers/'+request).then(() => {      
            commit('SET_CUSTOMERS_MESSAGGE',res);
             
        });

        },

   
}