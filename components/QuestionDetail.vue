<template>
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
                  @change="changedInput(selectedOption[q.question_id])"
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
                hint="Soru cevabına ait açıklamayı giriniz"
                outlined
                @input="changedInput($event)"
                ></v-textarea>
            </div>
            <div class="col-md-12" style="font-size:12px;" v-if="q.answer_type_id==3">
              <SingleUpload ref="iupload" :showAciklama="false" @handle-file="changedInput" class="mb-6"/>
            </div>
          </div>
    </div>
</template>
<script>
/*eslint-disable*/
export default {
    props:{
        q:{
            type:Object,
        }
    },
    data(){
      return{
        abc:'',
        selectedOption:[],
        bce:[],
      }
    },
    methods:{
     changedInput(val){
      this.abc=val
      this.$emit('inputa',this.q.question_id,val)
      }
    }
}
</script>