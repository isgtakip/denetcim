/*eslint-disable*/
import Vue from 'vue';
export const state = () => ({
sections : [],
})
export const mutations = {
    SET_SECTIONS(state,data){
        state.sections= data;
    },
    ADD_SECTION(state,data){
        state.sections.push(data)
    },
    EDIT_SECTION(state,data){
        const ogIndex = state.sections.findIndex(t => t.section_id === data.section_id)
        Vue.set(state.sections, ogIndex, data);
        //state.malzemeler[ogIndex] = data;
    },
    DELETE_SECTION(state,data){
        const index = state.sections.findIndex(p => p.section_id === data)
        state.sections.splice(index, 1)
    }
}
export const actions = {

    async getSections({commit},request){
        const sections = await this.$denetcimApi.$get(`/audit_forms/${request}/sections`)
        commit('SET_SECTIONS',sections); 
    },

    async updateSectionsOrder({commit},request){

        var params= new URLSearchParams;
        params.append("sections",JSON.stringify(request.sections))

        var gidecek = {
            params: params
        };
        await this.$denetcimApi.$post(`/audit_forms/${request.id}/sections`,null, gidecek)
    },

    async saveSections({commit},request){

        var params= new URLSearchParams;
        params.append("section_name",request.section_name)
        params.append("audit_form_id",request.audit_form_id)

        var gidecek = {
            params: params
        };

        let res=await this.$denetcimApi.$post('/addSections',null, gidecek);
        commit('ADD_SECTION',res);
    },

    async editSections ({commit},request){

        var params = new URLSearchParams;
        params.append("section_id",request.section_id);
        params.append("section_name",request.section_name);

        var gidecek = {
            params:params
        }

        let res= await this.$denetcimApi.$put(`/sections/${request.section_id}`,null, gidecek);
        commit('EDIT_SECTION',res)


    },

    async deleteSections({commit},request){
       
        
        let res = await this.$denetcimApi.delete(`/sections/${request}`); 
        commit('DELETE_SECTION',request) 

    }
}