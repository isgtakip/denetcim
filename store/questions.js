
/*eslint-disable*/
import Vue from 'vue';
export const state = () => ({
    questions : [],
})
export const mutations = {
    SET_QUESTIONS(state,data){
        state.questions= data;
    },
    ADD_QUESTION(state,data){
        state.questions.push(data)
    },
    EDIT_QUESTION(state,data){
        const ogIndex = state.questions.findIndex(t => t.question_id === data.question_id)
        Vue.set(state.questions, ogIndex, data);
    },
    DELETE_QUESTION(state,data){
        const index = state.questions.findIndex(p => p.question_id === data)
        state.questions.splice(index, 1)
    }
}

export const actions = {

   /* async getQuestionByID({ commit },request) {
        try {
            const question =await this.$denetcimApi.$get(`questions/${request.id}`)
            //commit('setUser', currentUser)
            return question
        } catch (err) {
            //commit('setUser', null)
            throw 'Unable to fetch current user'
        }
    },
  */

    async getQuestionsbySection({commit},request){
        const res =await this.$denetcimApi.$get(`/sections/${request}/questions`)
        commit('SET_QUESTIONS',res); 
    },

    async updateQuestionsOrder({commit},request){

        var params= new URLSearchParams;
        params.append("questions",JSON.stringify(request.questions))

        var gidecek = {
            params: params
        };
        await this.$denetcimApi.$post(`/sections/${request.id}/questions`,null, gidecek)

    },


    async saveQuestion({commit},request){


        var params= new URLSearchParams;
        params.append("question",request.question)
        params.append("answer_type",request.answer_type)
        params.append("yanit_seti",request.yanit_seti)
        params.append("up_question_id",request.up_question_id)
        params.append("is_required",request.is_required)
        params.append("options",request.options)
        params.append("section_id",request.section_id)

        var gidecek = {
            params: params
        };

        const res = await this.$denetcimApi.post(`/addQuestion`,null, gidecek)
        commit('ADD_QUESTION',res.data[0])
    },

    async editQuestions({commit},request){


        var params= new URLSearchParams;

        params.append("question",request.question)
        params.append("answer_type",request.answer_type)
        params.append("yanit_seti",request.yanit_seti)
        params.append("up_question_id",request.up_question_id)
        params.append("is_required",request.is_required)
        params.append("options",request.options)
        params.append("section_id",request.section_id)

        var gidecek = {
            params: params
        };

        const res = await this.$denetcimApi.put(`/questions/${request.question_id}`,null, gidecek)
        commit('EDIT_QUESTION',res.data[0])
    },

    async deleteQuestions({commit},request){
        let res = await this.$denetcimApi.delete(`/questions/${request}`); 
        commit('DELETE_QUESTION',request) 
    },

    async getSubQuestions({commit},request){
        let res = await this.$denetcimApi.get(`/questions/${request}`);
        commit('SET_QUESTIONS',res.data)
    }
}