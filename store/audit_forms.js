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
}

export const actions = {
    async getAuditForms({commit}){
        const depolar = await this.$denetcimApi.$get('/audit_forms');
        commit('SET_AUDITS_FORMS',depolar); 
    },
}

