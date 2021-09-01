<template>
<div>
  <Modals
    :mdlText="MdlText"
    :showbtn="false"
    ref="modals"
    @clicked-save="clickedSave">
      <Question ref="question" :modal="this.$refs.modals"/>
        </Modals>
  <v-card
    elevation="0"
    outlined
    :loading="this.loading"
    >
 <v-card-title class="black--text white " style="font-size:16px;">
     {{baslikTXT}}
      <v-spacer></v-spacer>
      <v-btn
        color="white"
        class="text--primary"
        fab
        small
        dense
        @click="showModal"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <div align="center" class="mt-10" v-if="questions.length==0">Kayıt bulunamadı.</div>
    <Container
    @drop="onDrop"
    lock-axis="y"
    :drop-placeholder="dropPlaceholderOptions"
     drag-handle-selector=".column-drag-handle"
    ><Draggable v-for="question in myquestions" :key="question.question_id">
     <div class="draggable-item pt-5 pb-5">
          <span class="column-drag-handle" style="float:left; padding:0 10px;"><v-icon color="red" class="handle mt-0">mdi-cursor-move</v-icon></span>
          <span @click="getSubQuestionss(question)">{{question.question}}</span>
          <span style="float:right;padding-right:10px;">
            <v-icon color="gray" class="handle mt-0" @click="EditQuestion(question)">mdi-pencil</v-icon>
            <v-icon color="gray" class="handle mt-0" @click="DeleteQuestion(question)">mdi-delete</v-icon></span>
        </div></Draggable>
        </Container>
    </v-card>
     </div>
</template>
<script>
/*eslint-disable*/
import { mapState,mapGetters,mapActions,mapMutations } from "vuex";
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag, generateItems } from '../src/utils'
export default {
components: { Container, Draggable },
props:{
  sectionID:{
    type:Number,
    default:0
  },
  baslikTXT:{
    type:String,
    default:""
  }
},
data(){
  return{
    status:null,
    MdlText:"Yeni Soru Ekle",
    dropPlaceholderOptions: {
                className: 'drop-preview',
                animationDuration: '150',
                showOnTop: true,
    },
    loading:false,
    up_question_id:0,
  }
},
computed:{
  myquestions: {
        get() {
          return this.$store.state.questions.questions
        },
        set(value) {
          this.$store.commit('questions/SET_QUESTIONS', value)
        },
  },
   ...mapState({
        questions : state=> state.questions.questions,
        
      }),   
},

methods:{
  ...mapActions(
        {
        getQuestionsbySection:'questions/getQuestionsbySection',
        updateQuestionsOrder:'questions/updateQuestionsOrder',
        getSubQuestions:'questions/getSubQuestions'
        }),
    async getQuestions(section_id){
      this.loading=true;
      await this.getQuestionsbySection(section_id).then(()=>{
        this.loading=false;
        this.up_question_id=0;
      }); 
    },
    getSubQuestionss(question){
      this.loading=true;
       this.getSubQuestions(question.question_id).then(()=>{
         this.$emit("change-baslik",question.question)
         this.up_question_id=question.question_id
         this.loading=false;
       })
    },
    showModal(){
       this.$refs.question.clearAllData();
       this.$refs.modals.dialog = true;
       this.status='new';

    },
    EditQuestion(question){
        this.$refs.modals.dialog = true
        this.status='edit'
        this.$refs.question.question_edit(question)
    },
    clickedSave(){
     this.$refs.question.question_kaydet(this.status,this.sectionID,this.up_question_id)
    },   
    DeleteQuestion(question){
      console.log(question)
      this.$refs.question.question_delete(question)
    },
    onDrop(dropResult) {
       this.myquestions = applyDrag(this.myquestions, dropResult);
       let obj ={id:this.sectionID,questions:this.myquestions}
       this.updateQuestionsOrder(obj).then(()=>{
        console.log("Başarılı");
      })
    }
}
}
</script>
<style>
.draggable-item{
    border-bottom:1px solid #efefef;
    cursor:pointer;
}
.column-drag-handle{
    cursor:move;
}
.active{
    background-color: #efefef;
}
</style>