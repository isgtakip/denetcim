<template>
<div>
  <div v-for="q in node.sub_questions" :key="q.question_id">
        <div v-if="q.condition_question_id==0">
           <div>
          <v-divider
          class="mt-3 mb-6"
          ></v-divider>
          <div class="row">
            <div class="col-md-12" style="font-size:12px;">
              {{ q.question }}
            </div>
            <div class="col-md-12" style="font-size:12px;" v-if="q.answer_type_id==1">
            <v-btn-toggle
                  v-model="selectedOption[q.question_id]"
                  class="mb-6"
                  @change="changedInput(q.question_id,selectedOption[q.question_id])"
                >
                  <v-btn
              outlined
              color="indigo"
              v-for="opt in q.questionoptions"
              :key="opt.options.option_id"
              :value="opt.options.option_id"
            >
              {{opt.options.option_name}}
            </v-btn>
          </v-btn-toggle>
            </div>
            <div class="col-md-12" style="font-size:12px;" v-if="q.answer_type_id==2">
            <v-textarea
                v-model="selectedOption[q.question_id]"
                hint="Soru cevabına ait açıklamayı giriniz"
                outlined
                @input="changedInput(q.question_id,$event)"
                ></v-textarea>
            </div>
            <div class="col-md-12" style="font-size:12px;" v-if="q.answer_type_id==3">
              <SingleUpload ref="iupload" :showAciklama="false" @handle-file="changedInput" class="mb-6" :qid="q.question_id"/>
            </div>
          </div>
        </div>
          </div>
          <div v-else-if="q.condition_type=='option' && q.value==selectedOpt && q.condition_question_id==questionID">
          <div>
          <v-divider
          class="mt-3 mb-6"
          ></v-divider>
          <div class="row">
            <div class="col-md-12" style="font-size:12px;">
              {{ q.question }}
            </div>
            <div class="col-md-12" style="font-size:12px;" v-if="q.answer_type_id==1">
            <v-btn-toggle
                  v-model="selectedOption[q.question_id]"
                  class="mb-6"
                  @change="changedInput(q.question_id,selectedOption[q.question_id])"
                >
                  <v-btn
              outlined
              color="indigo"
              v-for="opt in q.questionoptions"
              :key="opt.options.option_id"
              :value="opt.options.option_id"
            >
              {{opt.options.option_name}}
            </v-btn>
          </v-btn-toggle>
            </div>
            <div class="col-md-12" style="font-size:12px;" v-if="q.answer_type_id==2">
            <v-textarea
                v-model="selectedOption[q.question_id]"
                hint="Soru cevabına ait açıklamayı giriniz"
                outlined
                @input="changedInput(q.question_id,$event)"
                ></v-textarea>
            </div>
            <div class="col-md-12" style="font-size:12px;" v-if="q.answer_type_id==3">
              <SingleUpload
              ref="iupload"
              :showAciklama="false"
              @handle-file="changedInput"
              class="mb-6"
              :qid="q.question_id"
              :items="icon"/>
            </div>
          </div>
         </div>
          </div>
          <div v-if="q.sub_questions && q.sub_questions.length">
            {{q.question_id}}
          <node :node="q" :ref="'subquestion' + q.question_id" :selectedOpt="selectedSubOpt[q.question_id]" :questionID="q.question_id" @input="changedInput"></node>
          </div>
  </div>
</div>
</template>
<script>
/*eslint-disable*/
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
function initialState (){
  return {
     form:{},
      inputValue:[],
      optionValue:0,
      selectedSubOpt:[],
      qqID:0,
      selectedOption:[],
      icon:[],
  }
}
import Vue from 'vue';
export default {
  name: "node",
  props: {
    node:{
      type: Object,
    },
    selectedOpt:{
    },
    questionID:{
      type:Number,
    }
  },
  data: function (){
    return initialState();
},
computed:{
 ...mapState({
        icons : state=> state.icons.icons,
  }),   
},
created(){
this.resetWindow();
},
methods:{
  ...mapActions(
        {
        getIconById:'icons/getIconById',
    }),
    resetWindow(){
        Object.assign(this.$data, initialState());
        this.node.sub_questions.map((item)=>{
          if (item.answers.length>0){
          if(item.answer_type_id==1 || item.answer_type_id==2) this.selectedOption[item.question_id]=item.answers[0].answer_option_id
          if(item.answer_type_id==3) {
            this.getIconById(item.answers[0].answer_option_id).then(()=>{
            this.icon=this.icons;
            })
          }
            }
        });
    },
    changedInput(qid,val){
     if (this.$refs['subquestion'+qid]) this.resetWindow();
     Vue.set(this.inputValue, qid, val)
     this.selectedSubOpt[qid]=val;
     this.$emit('input',qid,val)
    }
  }
};
</script>