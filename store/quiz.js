/*eslint-disable*/
import Vue from 'vue';

const getDefaultState = () => {
    return {
      quiz: [],
      messagge:[],
    }
  }
  
// initial state
export const state = getDefaultState()
  

export const mutations = {
    RESET_STATE(state) {
        Object.assign(state, getDefaultState())
    },
    SET_QUIZ(state,data){
        state.quiz= data;
    },
    SET_ONE_QUESTION(state,data){
        const sectionindex = state.quiz.findIndex(quiz => quiz.section_id === data.section_id)
        const soru_index = state.quiz[sectionindex].sorular.findIndex(s=>s.question_id===data.question_id)
        Vue.set(state.quiz[sectionindex].sorular, soru_index, data);
    },
}

export const actions = {
    
    async getQuiz({commit},request){

        const res =await this.$denetcimApi.$get(`/audits/${request.id}/forms/${request.fid}`)
        commit('SET_QUIZ',res); 
    },

    async saveQuiz({commit},request){

        var params = new URLSearchParams;

        params.append ("qoptions", request.qoptions);
        params.append ("ana_question_id", request.qid);
        params.append ("section_id" ,request.section_id);

        var gidecek = {
            params: params
        };

        let res=await this.$denetcimApi.put(`/audits/${request.id}/forms/${request.fid}`,null, gidecek);
        commit('SET_ONE_QUESTION',res.data);
    },

    resetState({ commit }) {
        commit('RESET_STATE')
    },
}