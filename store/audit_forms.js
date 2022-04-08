/*eslint-disable*/
export const getters = {
    filterByKeyword: (state) => (search) => {
    const a = search.trim().toLowerCase()
    if (!a.length) return state.audit_forms
    return state.audit_forms.filter(item => item.audit_form_name.toLowerCase().indexOf(a) > -1)
    },
    getAuditFormsWithPages(state){
        return state.audit_forms_with_page.data
    },
    getAuditFormsCount(state){
        return state.audit_forms_with_page.total
    },
    getAuditFormsPerPage(state){
        return state.audit_forms_with_page.per_page
    },
}
export const state = () => ({
    audit_forms : [],
    audit_forms_with_page:[]
})
export const mutations = {
    SET_AUDITS_FORMS(state,data){
        state.audit_forms= data;
    },
    ADD_AUDITS_FORMS(state,data){
        state.audit_forms.push(data)
    },
    DELETE_AUDITS(state,data){
        const index = state.audit_forms.findIndex(p => p.audit_form_id === data)
        state.audit_forms.splice(index, 1)
    },
    SET_AUDIT_FORMS_WITH_PAGES_SEARCH(state,data){
        state.audit_forms_with_page=data;
    },

}

export const actions = {

    async getAuditFormsWithPage({commit}, request) {
        var params = new URLSearchParams();
        params.append("page", request.page);
        params.append("search", request.arama);
        params.append("per_page",request.per_page);
        
        var gidecek = {
        params: params
        };

            let res = await this.$denetcimApi.$get('getAllAuditForms', gidecek);
            commit('SET_AUDIT_FORMS_WITH_PAGES_SEARCH', res);
    },


    async getAuditForms({commit}){
        const depolar = await this.$denetcimApi.$get('/audit_forms');
        commit('SET_AUDITS_FORMS',depolar); 
    },

    async saveAuditForms({commit},request){

        var params= new URLSearchParams;
        params.append("audit_form_name",request.audit_form_name)
        params.append("audit_form_no",request.audit_form_no)
        params.append("audit_form_icon_id",request.audit_icon_id)

        var gidecek = {
            params: params
        };

        let res=await this.$denetcimApi.post("/audit_forms",null, gidecek);
        commit('ADD_AUDITS_FORMS',res.data[0]);
    },
    async deleteAudit({commit},request){
        let res = await this.$denetcimApi.delete("/audit_forms/"+request); 
        commit('DELETE_AUDITS',request) 
    }


}

