<template>
     <v-btn-toggle
          v-model="abc.question_id"
         >
          <v-btn
      outlined
      color="indigo"
      v-for="opt in questionoptions"
      :key="opt.options.option_id"
      :value="opt.options.option_id"
    >
      {{opt.options.option_name}}
    </v-btn>
          </v-btn-toggle>
</template>
<script>
/*eslint-disable*/
export default {
    props:{
        questionoptions:{
            type:Array,
        },
        question_id:{
            type:Number,
        }
    },
    data(){
        return{
            abc:{
                question_id:0,
            },
        }
    }
}
</script>