<template>
    <div>
        <v-row>
        <v-col
       cols="12"
        md="12"
        sm="12"
        lg="12"
        class="pt-7">
        <v-card
    elevation="0"
    v-for="item in quiz"
    :key="item.section_id"
    v-show="item.sorular.length"
    class="mb-3"
    >
    <v-card-title class="white--text primary pt-3 pb-3" style="font-size:16px;">{{item.section_name}}</v-card-title>
    <v-divider></v-divider>
    <v-expansion-panels
    elevation="0"
    outlined
    style="padding-right:1px;padding-left:1px;"
    class="pt-1"
    >
      <v-expansion-panel
      v-for="q in item.sorular"
      :key="q.question_id">
        <v-expansion-panel-header
        disable-icon-rotate>
          {{q.question}}
          <template v-slot:actions>
            <v-icon color="teal" v-if="q.answers.length">
              mdi-check
            </v-icon>
            <v-icon color="error" v-else>
              mdi-alert-circle
            </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-btn-toggle
          v-model="selectedOption[q.question_id]"
          class="mb-6"
          @change="resetSubQuestions(q.question_id)"
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
         <Subquestions @input="handleOptions" :node="q" :selectedOpt="selectedOption[q.question_id]" :questionID="q.question_id" :ref="'subquestions' + q.question_id"/>
          <v-btn
         block
         color="primary"
         outlined
         @click="cevapKaydet(q,selectedOption[q.question_id])"
         :disabled="selectedOption[q.question_id]==undefined"
         >
           SORUYU KAYDET
         </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    </v-card>
        </v-col>
        </v-row>
    </div>
</template>
<script>
/*eslint-disable*/
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
import Vue from 'vue';

export default {
    computed:{
      ...mapState({
      quiz: (state) => state.quiz.quiz,
    }),
    },
    async created() {
   // this.resetState();
    let obj ={
      id: this.$route.params.id,
      fid:this.$route.params.fid
    }
          //this.$nuxt.$loading.start()
          await this.getQuiz(obj).then(result => {
          //cevapları döndür
          this.quiz.map((item)=>{
                item.sorular.map((item)=>{
                    //answer type  eğer 1 ise option 
                    if (item.answer_type_id==1){
                         if (item.answers.length>0){
                              item.answers.map((item)=>{
                                  Vue.set(this.selectedOption, item.question_id, parseInt(item.answer_option_id))
                              });
                         }
                    }
                 });
          });
          })
    },
    data() {
        return {
            selectedOption:[],
        }
    },
    methods:{
      ...mapActions({
      getQuiz :"quiz/getQuiz",
     // resetState :"quiz/resetState",
      saveQuiz:'quiz/saveQuiz'
    }),
       resetSubQuestions(val){
         this.$refs['subquestions'+val][0].resetWindow();
       },
        handleOptions(qid,val){
            //console.log(val);
        },
      findSubQ(q,a,qid){
        //üst sorudaki seçilen cevabı alır 
        
           if (q.sub_questions.length>0){
           // var ise kaç subquestionu var bunları bul 
               q.sub_questions.map((item)=>{
                 console.log(q.question_id)
                 if (item.condition_question_id!==0){  
                 let itemFound = a.find(food => food.question_id === item.condition_question_id)
                 let c = itemFound && itemFound.answer_option_id
                 if (item.condition_type=="option" && item.value==c && item.condition_question_id==q.question_id){
                    a.push({
                      question_id: item.question_id,
                      answer_option_id: this.$refs['subquestions'+qid][0].inputValue[item.question_id],
                    });
                    }
                  }
                  else{
                     a.push({
                      question_id: item.question_id,
                      answer_option_id: this.$refs['subquestions'+qid][0].inputValue[item.question_id],
                    });
                  }
                    return this.findSubQ(item,a,qid)
               });
          
        } 
      },
      async cevapKaydet(q,selectedOpt){
       //console.log(selectedOpt)
       let qoptions=[
         {
           question_id:q.question_id,
           answer_option_id:selectedOpt,
         }
       ];
      this.findSubQ(q,qoptions,q.question_id)
      let obj={
        id: this.$route.params.id,
        fid:this.$route.params.fid,
        qid:q.question_id,
        section_id:q.section_id,
        qoptions:JSON.stringify(qoptions), 
      }

      console.log(qoptions)
      await this.saveQuiz(obj).then(result => {

      })
      }
    }
}
</script>