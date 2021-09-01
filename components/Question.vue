<template>
<div>
       <v-list
          class="pl-0 mb-0"
        >
<v-form v-model="questionvalid" ref="question_form">
<v-list-item class="pb-0 mb-0 pb-0 mt-0" >
            <v-list-item-content class="pl-1 mb-0 pb-0">
              <v-list-item-title>Soru Griniz</v-list-item-title>
              <v-list-item-subtitle>Soruyu Giriniz ve Cevap Tipini Seçiniz</v-list-item-subtitle>
                <v-container fluid>
  <v-row>
  <v-col
       cols="12"
        md="9"
        sm="12"
        lg="9"
         class="pl-0 mb-0 pb-0"
       >
    <v-text-field
       v-model="question"
      :counter="255"
      :rules="selectRules"
      label="Soru"
      outlined
      dense
      required
    ></v-text-field></v-col>
    <v-col
       cols="12"
        md="3"
        sm="12"
        lg="3"
         class="pl-0 mb-0 pb-0"
        >
        <v-autocomplete
            v-model="qtypes"
            :items="q_types"
            item-text="answer_type"
            item-value="answer_type_id"
            :rules="selectRules"
            outlined
            dense
            label="Cevap Tipi"
          ></v-autocomplete>
        </v-col>
    </v-row>
    </v-container>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="pl-3 pt-0 mb-0 mt-0"  v-if="this.qtypes==1">
            <v-list-item-content class="pl-3 pt-0 mb-0 mt-0">
             <v-container fluid>
            <v-row>
            <v-col
       cols="12"
        md="12"
        sm="12"
        lg="12"
         class="pl-0 mb-0 pb-0 pt-0 mt-0"
       >
            <v-switch
             v-model="switch1"
             label="Yanıt Seti olarak Kaydet"
             class="mb-0 pb-0 mt-3"
            ></v-switch>
            </v-col>
             <v-col
       cols="12"
        md="12"
        sm="12"
        lg="12"
         class="pl-0 mb-0 pb-0"
       ><Sheet v-if="switch1!=1"  @option-sets="yanitSetiSec"/>
       </v-col></v-row></v-container>
            </v-list-item-content>
           </v-list-item>
          <v-list-item class="pb-0 mb-0 mt-0 pt-0" v-if="this.qtypes==1">
            <v-list-item-content class="pl-2 mb-0 pt-0 mt-0">
              <v-list-item-title>Şıkları Griniz</v-list-item-title>
              <v-list-item-subtitle>Şıkları giriniz 1 puan doğru cevap anlamına gelir</v-list-item-subtitle>
                <v-container fluid>
  <v-row  v-for="(option,k) in options" :key="k">
  <v-col
       cols="7"
        md="7"
        sm="7"
        lg="7"
         class="pl-0 mb-0 pb-0"
       >
    <v-text-field
      v-model="option.option_name"
      :rules="selectRules"
      label="Şık"
      outlined
      dense
      required
    ></v-text-field></v-col>
    <v-col
       cols="3"
        md="3"
        sm="3"
        lg="3"
        class="pl-0 mb-0 pb-0"
        >
        <v-autocomplete
            v-model="option.score"
            :items="option_scores"
            item-text="score_text"
            item-value="score_id"
            :rules="selectRules"
            outlined
            dense
            label="Skor"
          ></v-autocomplete>
        </v-col>
        <v-col
                      cols="2"
                      md="2"
                       class="pl-0 mb-0 pb-0 pr-2"
                    >
                    <v-btn
      depressed
      disabled
      block
      v-show="(k<1)"
    >
      SİL
      <v-icon
          dark
          right
        >
          mdi-delete
        </v-icon>
    </v-btn>
              <v-btn
        color="red"
        dark
        block
        @click="remove(k)"
         v-show="k || ( !k && options.length >= 2 && k>2)"
      >
        SİL
        <v-icon
          dark
          right
        >
          mdi-delete
        </v-icon>
      </v-btn>
                     </v-col>
    </v-row>
    </v-container>
            </v-list-item-content>
          </v-list-item>
        </v-form>
        </v-list>
        <div class="pl-5 pr-3" v-if="this.qtypes==1">
               <v-btn
          color="primary"
          dark
          @click="add(k)"
          block
          class="pl-0 ml-1"
        >
          Yeni Satır Ekle
        </v-btn>
        </div>
</div>
</template>
<script>
/*eslint-disable*/
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";

function initialState() {
  return { 
   selectRules: [
          v => !!v || 'Bu alan Gerekli',
    ],
    k:null,
    qtypes:'',
    question:'',
    question_id:0,
    switch1:false,
    questionvalid:false,
    option_scores:[
        {score_id:"0",score_text:'0'},
        {score_id:"1",score_text:'1'},
        {score_id:"N/A",score_text:'N/A'}
    ],
    options: [
      {
        option_id:0,
        option_name:'',
        score:'',
      }
    ]
  }
}

export default {
props:{
  modal:{
    type:Object,
    default:null
  }
},
data(){
  return initialState();
},
computed:{
 ...mapState({
        q_types : state=> state.question_types.q_types,
        optionsBySet : state=> state.option_sets.optionsBySet
   }),
},
async created() {
       await this.getQuestionTypes();
       await this.getOptionsBySet();
},
methods:{
...mapActions(
        {
        getQuestionTypes:'question_types/getQuestionTypes',
        saveQuestion:'questions/saveQuestion',
        getOptionsBySet:'option_sets/getOptionsBySet',
        getQuestionByID:'questions/getQuestionByID',
        editQuestions : 'questions/editQuestions',
        deleteQuestions : 'questions/deleteQuestions'
  }),
  
  yanitSetiSec(option_set){
    console.log(option_set.set_id)
    //burda state yap bir tane optionsları çeksin
      this.getOptionsBySet(option_set.set_id).then(()=>{
      this.options.splice(0);
      this.optionsBySet.forEach(option => {
        this.options.push({
                option_id:option.option_id,
                option_name: option.option_name,
                score:option.score,
      })
    })

     })
  },
  add(index) {
            this.options.push({
                option_id:0,
                option_name: '',
                score:'',
            });
        },
  remove(index) {
      this.options.splice(index, 1);

  },
    question_kaydet(status,section_id,up_question_id){
        this.$refs.question_form.validate();
        if(status=="new" && this.questionvalid){
            let obj = {
                question:this.question,
                answer_type:this.qtypes,
                yanit_seti:this.switch1,
                up_question_id:up_question_id,
                is_required:1,
                section_id:section_id,
                options:JSON.stringify(this.options),
            }

             this.saveQuestion(obj).then(()=>{
             this.clearAllData();
             this.modal.dialog=false
             });

        }

        if(status=="edit" && this.questionvalid){
             let obj = {
                question_id:this.question_id,
                question:this.question,
                answer_type:this.qtypes,
                yanit_seti:this.switch1,
                up_question_id:0,
                is_required:1,
                section_id:section_id,
                options:JSON.stringify(this.options),
               
            }
            console.log(obj);
           this.editQuestions(obj).then(()=>{
           //console.log("düzenlendi")
           })
           this.clearAllData();
           this.modal.dialog=false
        }
    },
   question_edit(question){

    if (question.question_options.length>0) this.options.splice(0)
    this.question_id=question.question_id
    this.question=question.question
    this.qtypes=question.answer_type
    this.yanit_seti=false
    
    question.question_options.forEach(option => {
        this.options.push({
                option_id:option.option.option_id,
                option_name: option.option.option_name,
                score:option.option.score,
                question_option_id:option.question_option_id
      })
    })

   },

   question_delete(question){
      this.deleteQuestions(question.question_id).then(()=>{
        console.log("silindi");
      })
   },

   clearAllData() {
    Object.assign(this.$data, initialState());
  },
    
}
}
</script>