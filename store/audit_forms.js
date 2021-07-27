/*eslint-disable*/
export const getters = {
    filterByKeyword: (state) => (search) => {
    const a = search.trim().toLowerCase()
    if (!a.length) return state.audit_forms
    return state.audit_forms.filter(item => item.audit_form_name.toLowerCase().indexOf(a) > -1)
    }
}
export const state = () => ({
    audit_forms : [],
})
export const mutations = {
    SET_AUDITS_FORMS(state,data){
        state.audit_forms= data;
    },
    ADD_AUDITS_FORMS(state,data){
        state.audit_forms.push(data)
    }
}

export const actions = {
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
    }


}

